# ALPR camera location data — sources, schemas, pipelines

Research agent report, 2026-09-01. This is the technical backbone for the map.

## 1. DeFlock (deflock.org)

**Confirmed: DeFlock is a thin client over OpenStreetMap.** All camera data lives in OSM; DeFlock pulls nodes tagged `surveillance:type=ALPR` via Overpass and renders them (MapLibre GL). No private camera database.

- Repo: https://github.com/FoggedLens/deflock (formerly frillweeman/DeFlock). MIT. Vue3/Vuetify/MapLibre frontend; TS Fastify backend; AWS Lambda + Cloudflare R2.
- Its API is NOT a camera API — just `/geocode` (Nominatim proxy), `/sponsors/github`, `/healthcheck`. Lambdas do region segmenting + counts.
- OSM wiki: https://wiki.openstreetmap.org/wiki/Deflock ; contribution via DeFlock mobile app (an OSM editor) or iD.

### OSM tagging scheme (de facto — https://wiki.openstreetmap.org/wiki/Tag:surveillance:type%3DALPR)

Core: `man_made=surveillance` (required), `surveillance=public|outdoor|traffic`, `surveillance:type=ALPR` (uppercase), `surveillance:zone=traffic|parking|entrance`.

Recommended: `camera:type=fixed`, `camera:mount=pole`, `direction=0–360`, `electricity=solar|grid` (solar ≈ Flock), `manufacturer=Flock Safety|Axis Communications|Leonardo|Motorola Solutions|Genetec|Unknown`, `manufacturer:wikidata` (Flock=Q108485435, Axis=Q2347731), `operator`/`operator:wikidata` (agency).

Normalize on ingest (deprecated synonyms still live): `camera:type=ALPR`, `surveillance=ANPR`, `operator=Flock Safety` (should be manufacturer). **Query on `surveillance:type=ALPR` only; treat everything else as messy attributes.**

### Overpass queries (tested 2026-09-01 vs overpass-api.de)

Bounding box (verified working):
```
[out:json][timeout:60];
node["man_made"="surveillance"]["surveillance:type"="ALPR"](33.6,-84.6,34.0,-84.2);
out body;
```
Area-based:
```
[out:json][timeout:25];
area[admin_level=6]["name"="Tarrant County"]->.a;
node["man_made"="surveillance"]["surveillance:type"="ALPR"](area.a);
out body qt meta;
```
**Worldwide single query times out** (60s/250s hit; kumi mirror 500'd). For global coverage: scheduled batch job sharding by region/bbox into static JSON (panopti.ca's approach), or process planet/Geofabrik extracts with `osmium tags-filter nwr/surveillance:type=ALPR`. Endpoint: `POST https://overpass-api.de/api/interpreter` with `data=<QL>`.

## 2. panopti.ca — what it adds

- Repo: https://github.com/resistanceisliberty/panopti.ca — Canadian fork of DeFlock. MIT. Live at https://maps.panopti.ca/.
- Same OSM source + a **government CCTV layer** (`surveillance:type=camera` filtered by gov-ish operators). Removes US-only features (route avoidance, density analysis, agency networks).
- **Architecture worth copying:** `scripts/build-cameras-ca.mjs` runs several times daily (GitHub Action + Cloudflare cron backup) → static `public/cameras-ca.json`. No live DB, no runtime Overpass.
- **Live endpoint: https://maps.panopti.ca/cameras-ca.json** — flat array: `{"osmId":26233200,"osmType":"node","lat":45.5087,"lon":-73.5648,"operator":"Ville de Montréal","surveillanceZone":"traffic","ref":"678","osmTimestamp":"...","osmVersion":10,"brand":"Government CCTVs"}`.
- Stack: Vue/Vite/TS/Tailwind, MapLibre GL + Protomaps PMTiles, Photon geocoding, Cloudflare Pages.

## 3. Other datasets

### EFF Atlas of Surveillance
- CSV (verified live): **https://www.atlasofsurveillance.org/download.csv** (per-place: `download.csv?location=City,+ST`). 15,210 rows as of 2026-09-01 (updated Aug 12, 2026); **4,146 ALPR rows**.
- Schema: `AOSNUMBER, NEWAOSNUMBER (ORI9), City, County, State, Agency, Type of LEA, Summary, Type of Juris, Technology, TECH ABV, Vendor, Link 1..3 (+snapshot/source/date), Other Links`.
- **Agency-level only, no camera coordinates.** Use for which-agency-has-what + vendor enrichment, not pins. License: CC BY. No API. Data library: https://www.atlasofsurveillance.org/data-library
- Sample downloaded to scratchpad: aos.csv

### Flock transparency portals
- transparency.flocksafety.com/<agency> — per-agency camera counts, policy, retention, sharing lists, 30-day search counts. No aggregate API.
- **Eyes On Flock** (https://eyesonflock.com, 403s bots) scrapes all portals — cameras, searches, sharing networks per agency. Ecosystem figures: "336,000 cameras / 113,000+ sharing connections" = OSM + this.
- **Have I Been Flocked** (https://haveibeenflocked.com) — searchable FOIA'd Flock audit logs.
- **private_eyes** (https://github.com/mcclatchy-southeast/private_eyes) — reusable portal-scraper code + captured audit data (2023–24).
- https://flockcameralocations.com — claims live map of 119,000+ Flock cameras.

### Vigilant/Motorola
- Effectively no public location data — NDA'd contracts; LEARN-NVLS (500+ agencies, 1.5B+ records) closed; ongoing CA class action (Gibbs Mura v. Motorola/Vigilant, amended July 2026). FOIA only.

### Municipal open data
- Essentially no city publishes fixed-ALPR coordinates as open data. Toronto PS ALPR is **vehicle-mounted** (all ~560 cars, Axon) — no fixed locations to map; same for Peel and most Canadian forces (fixed exceptions: Brampton/Sudbury/Napanee installs). Practical sources: OSM crowdsourcing + FOIA/MFIPPA + council procurement agendas.

## 4. Counts / coverage gap (2026-09-01, taginfo)

- OSM `surveillance:type=ALPR`: **148,490** features (148,347 nodes); ~127.9k in US.
- OSM `manufacturer=Flock Safety`: **110,579**.
- OSM `man_made=surveillance` (all types): 566,649.
- Reality: Flock claims **6,000+ communities, 49 states, 120,000+ camera locations** (Aug 2026). OSM Flock coverage ≈ order of claimed deployment but US-heavy, excludes most Motorola/Genetec/Leonardo/Jenoptik and nearly all mobile ALPR.
- Growth: ~138k (Aug 9, 2026) → 148.5k (Sep 1, 2026) ≈ **+10k in 3 weeks** — very active tagging.
- taginfo API: `https://taginfo.openstreetmap.org/api/4/tag/stats?key=surveillance:type&value=ALPR`

## 5. Licensing

- **OSM/Overpass: ODbL 1.0** — attribution "© OpenStreetMap contributors"; share-alike applies to derivative databases (our merged camera DB would be ODbL); produced works (tiles/images) need attribution only.
- **Atlas of Surveillance: CC BY** — merging CC BY into an ODbL derivative DB is fine (BY→ODbL direction OK).
- **DeFlock code: MIT; panopti.ca code: MIT.** Protomaps basemap needs its own attribution.
- Flock portal data: no stated license; scraped facts generally uncopyrightable, no explicit grant.
- **Naming caution:** Flock sent DeFlock's creator (Will Freeman) a trademark cease-and-desist over "Flock" in the name — avoid "Flock" in ours.
