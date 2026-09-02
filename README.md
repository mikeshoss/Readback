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

## Run it

**Docker (recommended — stays up on its own):**

```
docker compose up -d --build
```

Then visit http://localhost:4321. Survives reboots and doesn't depend on
a dev session being open. See [docs/docker.md](docs/docker.md).

**Local dev (live-reload while editing):**

```
npm install
npm run data   # refresh camera data from OSM
npm run dev
```

## Repository layout

- `src/pages/` — map (index), tech (vendor hub + per-provider pages),
  rules, evidence, news, foi, about
- `scripts/build-cameras.mjs` — OSM data pipeline
- `data/research/` — sourced research base (every site claim traces here)
- `data/raw/` — third-party datasets (EFF Atlas of Surveillance CSV)
- `docs/` — design decisions, Docker guide, launch plan + emails
- `content/` — draft content pieces
- `Dockerfile` / `docker-compose.yml` / `nginx.conf` — static-site container

Camera data © OpenStreetMap contributors (ODbL).
