# Readback (readback.ofrecord.ca)

*In aviation, a readback is repeating a transmission back to prove you
received it. This site reads back to the public what the state collects
about them.*

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

## How we source things

Every user-facing claim traces to a primary source, and `data/research/`
is where that base lives. Two rules govern it:

- **Claims** need a primary source before they reach a page. Inference and
  reported-but-unverified material stays in `data/research/` with a flag.
- **Entries** — the camera locations themselves — currently come from
  OpenStreetMap, which means somebody mapped them, not that anyone verified
  them. A node link is provenance for the record, not proof of the fact. The
  goal is that every entry traces to a citable document (an FOI response, a
  board minute, a budget line, a vendor filing); we are not there yet, and
  the site says so rather than implying otherwise.

We also publish [what this site collects about its own
readers](https://readback.ofrecord.ca/tracking), to the same standard.

## Stack

- **Astro** static site + **MapLibre GL** map (dark theme), deployed to
  Cloudflare Pages. Content pages ship no JavaScript.
- Data pipeline: `npm run data` → Overpass API (OSM) → classified static
  `public/data/cameras.json`. No runtime API calls, no database.
  - Layers: `surveillance:type=ALPR` (police), `highway=toll_gantry` (toll),
    `barrier=border_control` (border) — the toll layer is data no existing
    ALPR map surfaces.
  - Province is assigned from OSM administrative boundaries in the same run,
    so location grouping has the same provenance as the cameras.
  - Pass a saved Overpass JSON as an argument to skip the API:
    `node scripts/build-cameras.mjs path/to/overpass.json`
- Mobile fleets: hand-curated `src/data/fleets.json` (sourced in
  `data/research/`), rendered as capacity circles — most Canadian ALPR is
  vehicle-mounted and invisible to dot maps.

## Run it

```
npm install
npm run dev      # live reload at localhost:4321
```

Refresh the data from OpenStreetMap and the news feeds:

```
npm run data     # cameras + province assignment (hits Overpass; takes a few minutes)
npm run news     # RSS sweep into public/data/news.json + a review queue
npm run og       # regenerate the share card and favicons
```

Publishing (see [docs/deploy.md](docs/deploy.md)):

```
npm run stage    # staging.readback-bpq.pages.dev — never touches production
npm run deploy   # readback.ofrecord.ca
```

Deployment is direct upload, so **pushing to GitHub does not deploy.** Only
`npm run deploy` does.

## Repository layout

- `src/pages/` — map (index), `alpr/` (per-province and per-operator pages
  generated from the camera data), tech (vendor hub + per-provider pages),
  rules, evidence, news, foi, tracking, what-is-alpr, about
- `src/lib/alpr.ts` — shared loaders and the quality floor for generated pages
- `src/data/` — curated datasets: vendors, fleets, hardware, retention, FOI
  requests, tracking disclosures
- `scripts/` — `build-cameras.mjs` (OSM pipeline), `fetch-news.mjs` (RSS),
  `make-og.mjs` (share card)
- `data/research/` — sourced research base (every site claim traces here)
- `data/raw/` — third-party datasets
- `docs/` — deploy guide, pipeline design, map taxonomy, location discovery
- `content/` — draft content pieces, not published
- `archive/` — the retired Docker setup, kept for reference

## Data and licensing

- Camera locations © OpenStreetMap contributors, licensed
  [ODbL 1.0](https://opendatacommons.org/licenses/odbl/), re-published under
  the same licence.
- `data/raw/atlas-of-surveillance-*.csv` is the Electronic Frontier
  Foundation's [Atlas of Surveillance](https://atlasofsurveillance.org/),
  licensed [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) and
  redistributed here with attribution.
- Map tiles from [OpenFreeMap](https://openfreemap.org/) (© OpenMapTiles,
  data from OpenStreetMap).
- Site code is in this repository; research files carry their own citations.

## Corrections

If something here is wrong, send the citation and it gets fixed and logged:
themiltonrecord@gmail.com
