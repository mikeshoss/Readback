#!/usr/bin/env node
// Merges operator-published camera lists (data/authoritative/) into the
// OSM-derived dataset. The operator's own record wins: it owns the pin, keeps
// its own site ID and activation date, and carries the source that produced
// it. A crowd node at the same corner is absorbed and kept as a cross
// reference, not drawn twice.
//
// Two things this deliberately surfaces rather than smooths over:
//   - a published site with no crowd node — nobody had mapped it;
//   - a crowd node attributed to a force whose own complete list does not
//     contain it (notInOperatorList). That is a question for the force, and
//     it is exactly what the narrowed FOI asks.
//
// Imported by build-cameras.mjs (applied BEFORE the change diff, so the feed
// never reports the merge itself as cameras appearing and disappearing), and
// runnable standalone against the committed dataset:
//     node scripts/merge-authoritative.mjs

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const AUTH_DIR = join(root, 'data/authoritative');

// A published camera and a crowd pin for the same camera are never at exactly
// the same coordinates — the mapper eyeballs it off aerial imagery. 150m is
// wide enough to survive that and narrow enough not to swallow the camera on
// the far corner of a large intersection (checked against York: every match
// landed within 33m, the next-nearest candidate was streets away).
const MATCH_METRES = 150;

const haversine = (aLat, aLon, bLat, bLon) => {
  const R = 6371000, rad = (d) => (d * Math.PI) / 180;
  const dLat = rad(bLat - aLat), dLon = rad(bLon - aLon);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(aLat)) * Math.cos(rad(bLat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};

export function loadAuthoritative() {
  if (!existsSync(AUTH_DIR)) return [];
  return readdirSync(AUTH_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(readFileSync(join(AUTH_DIR, f), 'utf8')));
}

export function mergeAuthoritative(cameras, { verbose = true } = {}) {
  const datasets = loadAuthoritative();
  // Re-running drops what a previous merge added before redoing it — but a
  // node absorbed by an earlier run is no longer in the input to be matched
  // again, and without the binding below a second run would hand that site a
  // DIFFERENT nearby node (the next-nearest orphan) and quietly swallow it.
  // So carry each site's existing pairing forward: a site that already found
  // its crowd node keeps it and sits out the matching round.
  const prior = new Map(
    cameras.filter((c) => c.provenance === 'operator').map((c) => [c.id, c]),
  );
  const osm = cameras.filter((c) => c.provenance !== 'operator');
  const merged = [];
  const sources = {};
  const stats = [];

  for (const ds of datasets) {
    const src = ds.source;
    sources[src.id] = src;
    const available = osm.filter(
      (c) => c.category === 'police_alpr' && (c.operator === src.operator || c.operator === null),
    );
    const absorbed = new Set();
    let matched = 0;

    for (const site of ds.sites) {
      if ((site.status ?? 'Active').toLowerCase() !== 'active') continue;
      const id = `${src.id}-${site.key}`;
      const before = prior.get(id);
      let hit = null;
      if (before?.osmId) {
        // Already paired on an earlier run; its node is gone from the input.
        matched++;
      } else {
        let best = null, bestD = Infinity;
        for (const c of available) {
          if (absorbed.has(c.id)) continue;
          const d = haversine(site.lat, site.lon, c.lat, c.lon);
          if (d < bestD) { bestD = d; best = c; }
        }
        hit = best && bestD <= MATCH_METRES ? best : null;
        if (hit) { absorbed.add(hit.id); matched++; }
      }

      merged.push({
        id,
        lat: site.lat,
        lon: site.lon,
        province: src.province ?? null,
        // Keep the OSM tag that put the crowd node in the dataset when there
        // is one: `source` is the denominator behind the tolling finding on
        // /findings, and adopting a better record for a camera must not
        // quietly shrink it. Only a camera OSM never had is operator_published.
        source: hit?.source ?? before?.source ?? 'operator_published',
        category: 'police_alpr',
        operator: src.operator,
        rawOperator: null,
        vendorDisputed: false,
        manufacturer: hit?.manufacturer ?? before?.manufacturer ?? null,
        zone: hit?.zone ?? before?.zone ?? null,
        cameraType: hit?.cameraType ?? before?.cameraType ?? 'fixed',
        photo: hit?.photo ?? before?.photo ?? null,
        direction: hit?.direction ?? before?.direction ?? null,
        tollMethod: null,
        // --- provenance ---
        provenance: 'operator',
        sourceId: src.id,
        siteId: site.siteId,
        siteLabel: site.label,
        siteArea: site.area,
        siteActive: site.activeDate,
        siteNote: site.note,
        // The crowd pin for the same camera, kept so the OSM record stays
        // one click away and the ODbL contribution is still credited.
        osmId: hit?.id ?? before?.osmId ?? null,
      });
    }

    // Crowd pins attributed to this force that its own complete list does not
    // contain. Not an error — a discrepancy, and it stays on the map saying so.
    let orphans = 0;
    for (const c of osm) {
      if (absorbed.has(c.id)) continue;
      if (c.operator !== src.operator || !src.complete) continue;
      c.notInOperatorList = src.id;
      orphans++;
    }

    const kept = ds.sites.filter((s) => (s.status ?? 'Active').toLowerCase() === 'active').length;
    stats.push({ id: src.id, sites: kept, matched, new: kept - matched, absorbed: absorbed.size, orphans });
    for (const c of osm) if (absorbed.has(c.id)) c.__absorbed = true;
  }

  const survivors = osm.filter((c) => !c.__absorbed).map(({ __absorbed, ...c }) => ({ provenance: 'osm', ...c }));
  const out = [...survivors, ...merged];

  if (verbose) {
    for (const s of stats) {
      console.log(
        `${s.id}: ${s.sites} published sites — ${s.matched} already crowd-mapped (absorbed), ` +
        `${s.new} not on the map before, ${s.orphans} crowd pin(s) the operator does not list`,
      );
    }
  }
  return { cameras: out, sources, stats };
}

// --- CLI: apply to the committed dataset in place --------------------------
if (import.meta.url === `file://${process.argv[1]}`) {
  const dest = join(root, 'public/data/cameras.json');
  const data = JSON.parse(readFileSync(dest, 'utf8'));
  const before = data.cameras.length;
  const { cameras, sources } = mergeAuthoritative(data.cameras);

  const counts = {};
  for (const c of cameras) counts[c.category] = (counts[c.category] || 0) + 1;
  const provinceCounts = {};
  for (const c of cameras) if (c.province) provinceCounts[c.province] = (provinceCounts[c.province] || 0) + 1;
  const sourceCounts = {};
  for (const c of cameras) sourceCounts[c.source] = (sourceCounts[c.source] || 0) + 1;

  writeFileSync(dest, JSON.stringify({
    ...data,
    attribution: attributionFor(sources),
    counts,
    provinceCounts,
    sourceCounts,
    sources,
    cameras,
  }));
  console.log(`cameras.json: ${before} → ${cameras.length}`, counts);
}

// Attribution is not one line any more. OSM is ODbL; an operator's own release
// carries the operator's terms, and York's forbid commercial use — so the
// dataset says whose rules apply to which rows instead of flattening them.
export function attributionFor(sources) {
  const parts = ['© OpenStreetMap contributors (ODbL)'];
  for (const s of Object.values(sources)) if (s.attribution) parts.push(s.attribution);
  return parts.join(' · ');
}
