#!/usr/bin/env node
// Pulls Canadian ALPR cameras, toll gantries, and border crossings from
// OpenStreetMap (Overpass API) and writes a classified static dataset to
// public/data/cameras.json. Run on a schedule (GitHub Action) — never at
// page runtime. Data © OpenStreetMap contributors, ODbL.

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OVERPASS = 'https://overpass-api.de/api/interpreter';

const QUERY = `[out:json][timeout:300];
area["ISO3166-1"="CA"][admin_level=2]->.ca;
(
  node["man_made"="surveillance"]["surveillance:type"="ALPR"](area.ca);
  node["highway"="toll_gantry"](area.ca);
  node["barrier"="border_control"](area.ca);
);
out body;`;

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

// Optional: node scripts/build-cameras.mjs <path-to-overpass-json> to reuse a
// previously downloaded result instead of hitting the API.
let elements;
const localFile = process.argv[2];
if (localFile) {
  console.log('Using local Overpass result:', localFile);
  ({ elements } = JSON.parse(await import('node:fs/promises').then((fs) => fs.readFile(localFile, 'utf8'))));
} else {
  console.log('Querying Overpass (Canada: ALPR + toll gantries + border controls)…');
  const res = await fetch(OVERPASS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'ALPRMap/0.1 (surveillance transparency project)',
    },
    body: 'data=' + encodeURIComponent(QUERY),
  });
  if (!res.ok) throw new Error(`Overpass ${res.status}`);
  ({ elements } = await res.json());
}

const cameras = elements.map((e) => {
  const t = e.tags || {};
  return {
    id: e.id,
    lat: e.lat,
    lon: e.lon,
    category: classify(t),
    operator: t.operator || null,
    manufacturer: t.manufacturer || t.brand || null,
    zone: t['surveillance:zone'] || null,
    direction: t.direction ? Number(t.direction) || null : null,
    tollMethod: t.toll_method || null,
  };
});

const counts = {};
for (const c of cameras) counts[c.category] = (counts[c.category] || 0) + 1;

const out = {
  generated: new Date().toISOString(),
  attribution: '© OpenStreetMap contributors (ODbL)',
  counts,
  cameras,
};

const dest = join(root, 'public/data/cameras.json');
mkdirSync(dirname(dest), { recursive: true });
writeFileSync(dest, JSON.stringify(out));
console.log('Wrote', dest, counts);
