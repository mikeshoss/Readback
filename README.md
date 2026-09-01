# ALPRMap

Mapping automated licence plate readers in Canada — where they are, what they
can do, and what the settings say. A better panopti.ca / DeFlock: layered by
purpose (police surveillance vs. toll vs. border), plus the mobile-fleet
capacity no dot map shows, retention comparisons, vendor capabilities, and
the actual evidence on crime reduction.

## Core thesis

**Every safeguard is a setting.** Retention on the same technology spans
3 minutes (New Hampshire) to indefinite (34 US states); Peel keeps reads
24 hours while neighbouring Toronto keeps them 7 days. Consent and context
matter: a toll you pay (407) and a border you cross are not the same as a
dragnet on your commute — so those layers exist, toggled off, with notes.

## Stack

- **Astro** static site + **MapLibre GL** map (dark theme)
- Data pipeline: `npm run data` → Overpass API (OSM) → classified static
  `public/data/cameras.json`. No runtime API calls, no database.
  - Layers: `surveillance:type=ALPR` (police), `highway=toll_gantry` (toll),
    `barrier=border_control` (border) — the toll layer is data no existing
    ALPR map surfaces.
  - Pass a saved Overpass JSON as an argument to skip the API:
    `node scripts/build-cameras.mjs path/to/overpass.json`
- Mobile fleets: hand-curated `src/data/fleets.json` (sourced in
  `data/research/`), rendered as capacity circles — most Canadian ALPR is
  vehicle-mounted and invisible to dot maps.

## Develop

```
npm install
npm run data   # refresh camera data from OSM
npm run dev
```

## Repository layout

- `src/pages/` — map (index), regions, vendors, evidence, news
- `scripts/build-cameras.mjs` — OSM data pipeline
- `data/research/` — sourced research base (every site claim traces here)
- `data/raw/` — third-party datasets (EFF Atlas of Surveillance CSV)
- `docs/` — design decisions (map taxonomy, location-discovery roadmap)
- `content/` — draft content pieces

Camera data © OpenStreetMap contributors (ODbL).
