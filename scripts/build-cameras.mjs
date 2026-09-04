#!/usr/bin/env node
// Pulls Canadian ALPR cameras, toll gantries, and border crossings from
// OpenStreetMap (Overpass API) and writes a classified static dataset to
// public/data/cameras.json. Run on a schedule (GitHub Action) — never at
// page runtime. Data © OpenStreetMap contributors, ODbL.

import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Mirrors are tried in order. Overpass instances time out and rate-limit
// routinely; one failing is normal, all failing is a real outage.
const OVERPASS_MIRRORS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.osm.ch/api/interpreter',
];

// Sanity gate. A partial Overpass response can be structurally valid but
// wildly incomplete — committing it would wipe the map and emit a bogus
// "N cameras removed" change event. Refuse anything that looks truncated.
const MIN_PLAUSIBLE_TOTAL = 500;   // hard floor; Canada sits ~1,357
const MAX_SHRINK_RATIO = 0.10;     // abort if >10% smaller than last run
const force = process.argv.includes('--force');

const QUERY = `[out:json][timeout:300];
area["ISO3166-1"="CA"][admin_level=2]->.ca;
(
  node["man_made"="surveillance"]["surveillance:type"="ALPR"](area.ca);
  node["highway"="toll_gantry"](area.ca);
  node["barrier"="border_control"](area.ca);
);
out body;`;

// Which OSM tag put a node in the dataset, recorded per camera. This is the
// denominator behind the toll-vs-surveillance finding: "N of the nodes tagged
// as ALPR surveillance are actually tolling infrastructure" is only checkable
// if we say which nodes were ALPR-tagged in the first place. Derived from the
// node's own tags, so it is reproducible from the raw Overpass result.
function sourceTag(t) {
  if (t['surveillance:type'] === 'ALPR' && t.man_made === 'surveillance') return 'alpr_tagged';
  if (t.highway === 'toll_gantry') return 'toll_gantry';
  if (t.barrier === 'border_control') return 'border_control';
  return 'other';
}

// Categories are OUR classification layer — see docs/map-taxonomy.md.
function classify(tags) {
  if (tags.highway === 'toll_gantry') return 'toll';
  if (tags.barrier === 'border_control') return 'border';
  const op = (tags.operator || '').toLowerCase();
  const mfr = (tags.manufacturer || tags.brand || '').toLowerCase();
  // RTX (Raytheon) built the 407's tolling system; MTO-operated RTX ALPRs
  // trace the 407 corridor exactly (verified 2026-09: all 244 within its
  // bbox). Revisit if Ontario deploys RTX highway ALPR elsewhere.
  if (/407|toll/.test(op) || tags['surveillance:zone'] === 'toll' || /rtx|raytheon/.test(mfr)) return 'toll';
  if (/cbsa|border|customs/.test(op)) return 'border';
  // Private/institutional: parking and property scanning, not policing.
  if (/university|ubc|college|mall|home depot|walmart|canadian tire|plaza|property|parking/.test(op)) return 'private';
  return 'police_alpr';
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Every mirror, three rounds, with backoff. Returns elements, or null if the
// whole thing failed — callers decide whether that is fatal.
async function overpass(query, { label, attempts = 3, timeoutMs = 300_000 } = {}) {
  let lastErr;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    for (const endpoint of OVERPASS_MIRRORS) {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Readback/1.0 (readback.ca; ALPR transparency project)',
          },
          body: 'data=' + encodeURIComponent(query),
          signal: AbortSignal.timeout(timeoutMs),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const { elements } = await res.json();
        console.log(`  ✓ ${label}: ${endpoint} returned ${elements.length} elements`);
        return elements;
      } catch (err) {
        lastErr = err;
        console.warn(`  ✗ ${label}: ${endpoint}: ${err.message}`);
      }
    }
    if (attempt < attempts) {
      const backoff = attempt * 30;
      console.log(`  all mirrors failed; retrying in ${backoff}s…`);
      await sleep(backoff * 1000);
    }
  }
  console.warn(`  ${label}: every mirror failed. Last error: ${lastErr?.message}`);
  return null;
}

// Optional: node scripts/build-cameras.mjs <path-to-overpass-json> to reuse a
// previously downloaded result instead of hitting the API.
let elements;
const localFile = process.argv[2];
if (localFile) {
  console.log('Using local Overpass result:', localFile);
  ({ elements } = JSON.parse(await import('node:fs/promises').then((fs) => fs.readFile(localFile, 'utf8'))));
} else {
  console.log('Querying Overpass (Canada: ALPR + toll gantries + border controls)…');
  elements = await overpass(QUERY, { label: 'canada' });
  if (!elements) {
    console.error('FAILED: every Overpass mirror failed.');
    console.error('Nothing written — existing data left untouched.');
    process.exit(1);
  }
}

// Normalize messy crowdsourced manufacturer tags to canonical names so the
// hardware-profile lookup (src/data/hardware.json) can key off them.
const MFR_ALIASES = {
  genetech: 'Genetec',
  genetec: 'Genetec',
  'rtx corporation': 'RTX Corporation',
  rtx: 'RTX Corporation',
  raytheon: 'RTX Corporation',
  'flock safety': 'Flock Safety',
  flock: 'Flock Safety',
  'axon enterprise': 'Axon',
  axon: 'Axon',
  'axis communications': 'Axis Communications',
  axis: 'Axis Communications',
  'neology, inc.': 'Neology',
  neology: 'Neology',
  'motorola solutions': 'Motorola Solutions',
  motorola: 'Motorola Solutions',
  'dahua technology': 'Dahua',
  dahua: 'Dahua',
  leonardo: 'Leonardo ELSAG',
  elsag: 'Leonardo ELSAG',
  verkada: 'Verkada',
  'the bosch group': 'Bosch',
  bosch: 'Bosch',
};
const normMfr = (raw) => {
  if (!raw) return null;
  return MFR_ALIASES[raw.trim().toLowerCase()] ?? raw.trim();
};

// Operator names are free-text in OSM ("YRP", "York Region Police", three
// spellings of CBSA). We are the standardization layer: canonical names on
// the map, the raw tag preserved for provenance.
const OP_ALIASES = {
  'yrp': 'York Regional Police',
  'york region police': 'York Regional Police',
  'cbsa': 'Canada Border Services Agency',
  'canadian border services agency': 'Canada Border Services Agency',
  'tps': 'Toronto Police Service',
  'opp': 'Ontario Provincial Police',
};
const normOp = (raw) => {
  if (!raw) return null;
  return OP_ALIASES[raw.trim().toLowerCase()] ?? raw.trim();
};

const POLICE_RE = /police|polizei|gendarmerie|rcmp|opp\b|sûreté/i;

// --- Province assignment ---------------------------------------------------
// Which province a camera sits in comes from OSM's own administrative
// boundaries rather than a bundled shapefile or a geocoding API: same source
// as the cameras, so the provenance story stays "it's all OSM, go check the
// node." One ids-only query per province — small payloads, run sequentially
// because Overpass rate-limits parallel clients.
const PROVINCES = {
  'CA-AB': 'Alberta',                    'CA-BC': 'British Columbia',
  'CA-MB': 'Manitoba',                   'CA-NB': 'New Brunswick',
  'CA-NL': 'Newfoundland and Labrador',  'CA-NS': 'Nova Scotia',
  'CA-NT': 'Northwest Territories',      'CA-NU': 'Nunavut',
  'CA-ON': 'Ontario',                    'CA-PE': 'Prince Edward Island',
  'CA-QC': 'Quebec',                     'CA-SK': 'Saskatchewan',
  'CA-YT': 'Yukon',
};

// A failed province query must not silently blank out that province's pages,
// so fall back to whatever the last successful run recorded.
const prevPath = join(root, 'public/data/cameras.json');
const prevData = existsSync(prevPath) ? JSON.parse(readFileSync(prevPath, 'utf8')) : { cameras: [] };
const prevProvince = new Map((prevData.cameras || []).filter((c) => c.province).map((c) => [c.id, c.province]));

const provinceOf = new Map();
if (localFile) {
  console.log('Local Overpass result: reusing previously recorded provinces.');
  for (const [id, p] of prevProvince) provinceOf.set(id, p);
} else {
  console.log('Assigning provinces from OSM administrative boundaries…');
  for (const [iso, name] of Object.entries(PROVINCES)) {
    const q = `[out:json][timeout:180];
area["ISO3166-2"="${iso}"]->.p;
(
  node["man_made"="surveillance"]["surveillance:type"="ALPR"](area.p);
  node["highway"="toll_gantry"](area.p);
  node["barrier"="border_control"](area.p);
);
out ids;`;
    const ids = await overpass(q, { label: iso, attempts: 2, timeoutMs: 180_000 });
    if (!ids) {
      console.warn(`  ${name}: query failed — keeping previously recorded assignments.`);
      continue;
    }
    for (const e of ids) provinceOf.set(e.id, name);
    await sleep(1000);
  }
  // Restore anything a failed query would otherwise have dropped.
  for (const [id, p] of prevProvince) if (!provinceOf.has(id)) provinceOf.set(id, p);
}

const cameras = elements.map((e) => {
  const t = e.tags || {};
  const operator = normOp(t.operator || null);
  const manufacturer = normMfr(t.manufacturer || t.brand || null);
  return {
    id: e.id,
    lat: e.lat,
    lon: e.lon,
    province: provinceOf.get(e.id) ?? null,
    source: sourceTag(t),
    category: classify(t),
    operator,
    rawOperator: t.operator && operator !== t.operator.trim() ? t.operator.trim() : null,
    // Flock states it has no Canadian police contracts; a crowd tag saying a
    // Canadian police service runs Flock hardware is a disputed claim
    // ("Flock" is often used generically for any pole ALPR).
    vendorDisputed: manufacturer === 'Flock Safety' && !!operator && POLICE_RE.test(operator),
    manufacturer,
    zone: t['surveillance:zone'] || null,
    cameraType: t['camera:type'] || null,
    // Community photo: direct image URL, or a Wikimedia Commons file
    // rendered via Special:FilePath (hotlink-safe thumbnail redirect).
    photo: /^https?:\/\//.test(t.image || '')
      ? t.image
      : t.wikimedia_commons?.startsWith('File:')
        ? `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(t.wikimedia_commons.slice(5))}?width=480`
        : null,
    direction: t.direction ? Number(t.direction) || null : null,
    tollMethod: t.toll_method || null,
  };
});

const counts = {};
for (const c of cameras) counts[c.category] = (counts[c.category] || 0) + 1;

const provinceCounts = {};
for (const c of cameras) if (c.province) provinceCounts[c.province] = (provinceCounts[c.province] || 0) + 1;
const unplaced = cameras.filter((c) => !c.province).length;
console.log(`Provinces: ${Object.keys(provinceCounts).length} with data, ${unplaced} cameras unplaced`);

// The toll-vs-surveillance finding, recomputed every run so the published
// number can never drift from the data behind it.
const sourceCounts = {};
for (const c of cameras) sourceCounts[c.source] = (sourceCounts[c.source] || 0) + 1;
const alprTagged = cameras.filter((c) => c.source === 'alpr_tagged');
const alprTaggedToll = alprTagged.filter((c) => c.category === 'toll');
const finding = {
  alprTagged: alprTagged.length,
  reclassifiedAsToll: alprTaggedToll.length,
  pct: alprTagged.length ? Math.round((alprTaggedToll.length / alprTagged.length) * 100) : 0,
  rtxMto: cameras.filter((c) =>
    c.operator === 'Ministry of Transportation of Ontario' &&
    /RTX|Raytheon/i.test(c.manufacturer || '')).length,
};
console.log(`Toll finding: ${finding.reclassifiedAsToll} of ${finding.alprTagged} ALPR-tagged nodes (${finding.pct}%) are tolling infrastructure; ${finding.rtxMto} are RTX/MTO 407 cameras`);

const out = {
  generated: new Date().toISOString(),
  attribution: '© OpenStreetMap contributors (ODbL)',
  counts,
  provinceCounts,
  sourceCounts,
  finding,
  cameras,
};

const dest = join(root, 'public/data/cameras.json');
mkdirSync(dirname(dest), { recursive: true });

// Diff against the previous run: newly mapped / removed cameras become the
// change feed ("new cameras coming online" — strictly, newly *mapped*).
const changesDest = join(root, 'public/data/changes.json');

// --- Sanity gate -----------------------------------------------------------
// Runs BEFORE anything is written. A truncated Overpass response is the
// dangerous failure: structurally valid, quietly wrong. Refuse it.
if (cameras.length < MIN_PLAUSIBLE_TOTAL && !force) {
  console.error(`REFUSED: only ${cameras.length} features returned (floor is ${MIN_PLAUSIBLE_TOTAL}).`);
  console.error('This looks like a truncated Overpass response. Nothing written.');
  console.error('If this shrink is real, re-run with --force.');
  process.exit(1);
}
if (existsSync(dest)) {
  const prevTotal = JSON.parse(readFileSync(dest, 'utf8')).cameras.length;
  const shrink = (prevTotal - cameras.length) / prevTotal;
  if (shrink > MAX_SHRINK_RATIO && !force) {
    console.error(`REFUSED: dataset shrank ${(shrink * 100).toFixed(1)}% (${prevTotal} → ${cameras.length}).`);
    console.error('Above the 10% guard rail — treating as a bad response. Nothing written.');
    console.error('If this drop is real, re-run with --force.');
    process.exit(1);
  }
}
if (force) console.warn('--force: sanity gate bypassed.');
// ---------------------------------------------------------------------------

if (existsSync(dest)) {
  const prev = JSON.parse(readFileSync(dest, 'utf8'));
  const prevIds = new Set(prev.cameras.map((c) => c.id));
  const currIds = new Set(cameras.map((c) => c.id));
  const added = cameras.filter((c) => !prevIds.has(c.id));
  const removed = prev.cameras.filter((c) => !currIds.has(c.id));
  const history = existsSync(changesDest) ? JSON.parse(readFileSync(changesDest, 'utf8')).history ?? [] : [];
  if (added.length || removed.length) {
    history.unshift({
      date: out.generated,
      added: added.map(({ id, lat, lon, category, operator, manufacturer }) => ({ id, lat, lon, category, operator, manufacturer })),
      removedIds: removed.map((c) => c.id),
      prevCounts: prev.counts,
      counts,
    });
  }
  writeFileSync(changesDest, JSON.stringify({ generated: out.generated, history: history.slice(0, 100) }));
  console.log(`Diff vs previous run: +${added.length} new, -${removed.length} removed`);
}

writeFileSync(dest, JSON.stringify(out));
console.log('Wrote', dest, counts);
