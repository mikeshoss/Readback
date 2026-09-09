#!/usr/bin/env node
// Pulls camera datasets that the OPERATORS publish themselves, and writes them
// to data/authoritative/. These are the entries the README promises: a camera
// that traces to a document the institution stands behind, not a crowd pin.
//
// Everything here was found by asking. York's portal surfaced while answering
// the force's own clarification letter on FOI 26-1898 — see
// data/research/york-cctv-alpr.md. Each source records the FOI file that led
// to it so the map can say where a pin came from.
//
// Run: npm run authoritative   (fetch + merge into public/data/cameras.json)

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'data/authoritative');

// Operator-published sources. `terms` is not decoration: York's open data is
// explicitly non-commercial and disclaims accuracy, so it cannot be swept into
// our ODbL re-publication — /data says so, and so does the dataset.
export const SOURCES = [
  {
    id: 'york-cctv',
    operator: 'York Regional Police',
    province: 'Ontario',
    sourceName: 'York Regional Police Community Safety Data Portal',
    sourcePage: 'https://community-safety-portal-datayrp.hub.arcgis.com/pages/cctv',
    dataUrl:
      'https://services8.arcgis.com/lYI034SQcOoxRCR7/arcgis/rest/services/YRP_CCTV_Cameras/FeatureServer/0/query' +
      '?where=1%3D1&outFields=*&outSR=4326&f=geojson&resultRecordCount=2000',
    attribution: '© 2024 York Regional Police BI',
    termsUrl: 'https://www.yrp.ca/en/crime-prevention/cctv-community-cameras.asp',
    licence: 'York Regional Police open data terms — non-commercial use only, no warranty of accuracy or completeness.',
    // The force publishes this as its full camera list ("all York Regional
    // Police CCTV Cameras"), so a crowd pin attributed to YRP that matches
    // nothing here is a discrepancy worth showing, not a mapping gap.
    complete: true,
    // Why this camera is on the map, in one line, shown in the popup.
    foi: {
      requestId: 'york',
      file: '26-1898',
      found: '2026-09-09',
      note: 'Found while answering York Regional Police’s clarification letter on our MFIPPA request.',
    },
    // ALPR status is a claim, and it is not YRP's data portal making it: the
    // Board approved ALPR "at all current and newly proposed CCTV locations."
    // Per-site confirmation is item 1 of the narrowed FOI. Say exactly that.
    alprBasis: {
      claim: 'ALPR at every location',
      source: 'York Regional Police Services Board, June 25, 2025 — Report of the Chief of Police, CCTV Cameras Annual Report and Program Expansion',
      url: 'https://pub-yrpsb.escribemeetings.com/filestream.ashx?DocumentId=11119',
      confirmed: false,
    },
    // GeoJSON feature -> our shape. Keep the operator's own identifiers.
    normalize: (f) => {
      const p = f.properties ?? {};
      const [lon, lat] = f.geometry?.coordinates ?? [];
      const day = (ms) => (ms ? new Date(ms).toISOString().slice(0, 10) : null);
      const clean = (s) => (typeof s === 'string' ? s.replace(/\s+/g, ' ').trim() : null) || null;
      return {
        // OBJECTID, not the site ID: YRP ships CCTV42-08 twice, on two
        // different corners of Vaughan.
        key: String(p.OBJECTID),
        siteId: clean(p.ID),
        lat, lon,
        label: clean(p.Intersection),
        area: clean(p.Municipality),
        sector: clean(p.Sector),
        status: clean(p.Status),
        activeDate: day(p.ActiveDate),
        retireDate: day(p.RetireDate),
        note: clean(p.Notes),
      };
    },
  },
];

const only = process.argv[2];

for (const src of SOURCES) {
  if (only && only !== src.id) continue;
  process.stdout.write(`${src.id}: fetching… `);
  const res = await fetch(src.dataUrl, {
    headers: { 'User-Agent': 'Readback/1.0 (readback.ofrecord.ca; ALPR transparency project)' },
  });
  if (!res.ok) {
    console.error(`FAILED ${res.status} ${res.statusText}`);
    process.exitCode = 1;
    continue;
  }
  const raw = await res.json();
  const features = raw.features ?? [];
  const sites = features.map(src.normalize).filter((s) => Number.isFinite(s.lat) && Number.isFinite(s.lon));

  // An empty or truncated response must not silently empty the map.
  if (!sites.length) {
    console.error('FAILED — no usable features returned. Nothing written.');
    process.exitCode = 1;
    continue;
  }

  const { normalize, ...meta } = src;
  const out = {
    generated: new Date().toISOString(),
    source: meta,
    counts: {
      total: sites.length,
      active: sites.filter((s) => (s.status ?? '').toLowerCase() === 'active').length,
    },
    sites,
  };
  mkdirSync(outDir, { recursive: true });
  const dest = join(outDir, `${src.id}.json`);
  writeFileSync(dest, JSON.stringify(out, null, 2) + '\n');
  console.log(`${sites.length} sites (${out.counts.active} active) → ${dest.replace(root + '/', '')}`);
}
