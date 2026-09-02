# Readback — session handoff (2026-09-01, end of day 1)

One day: empty folder → site built at readback.ofrecord.ca, research base
assembled, 3 FOI requests filed. This file is the pick-up-where-we-left-off.

## What exists

**Site** (Astro + MapLibre, github.com/mikeshoss/Readback, deploys nowhere
yet — runs locally via `npm run dev`, dev preview on port 4321):
- **/** Map: 1,357 OSM-sourced cameras in 5 layers (police 317 — shown as
  204 verified-operator solid dots + 113 unverified hollow; toll 519 incl.
  the 407's RTX gantries; border 464; private 57) + 12 police-fleet
  capacity circles. Popups: photo (when community-shot), operator
  (normalized, raw preserved), vendor (with disputed flags on 7
  Flock-tagged police pins), type, facing + 60° view cones, hardware
  profile, link to vendor tech page, link to the OSM record.
- **/tech**: hub (documented software use-case table, each row cited) →
  12 provider pages (Canada-first) each with company info, platform
  features, and model-by-model hardware specs — every claim carries inline
  source links (FCC/ISED filings, datasheets, teardowns).
- **/rules**: retention table (3 minutes NH → indefinite), oversight
  models, Ontario spread. **/evidence**: studies/hit rates/wrongful stops,
  fully cited. **/news**: 12 linked stories. **/foi**: public tracker.
  **/about**: methodology, contact. SEO/OG/sitemap/robots done.

**Research base** (data/research/ — every site claim traces here):
map-data-sources, vendor-capabilities, regional-policy, crime-stats,
news-sweep, device-signal-tracking (the antenna problem), hardware-certs
(all 4 clusters), misuse-cases, ai-systems-layer, foi-contacts,
user-provided-ontario.

**Pipeline**: `npm run data` → Overpass → classify (incl. RTX→toll rule,
operator aliases, disputed-vendor flags) → cameras.json + changes.json
diff feed. Basemap: OpenFreeMap (no key, production-safe).

## FOI status (the clock is running)
- **Sent Sept 1** (due ~Nov 5, 45 business days): Halton (ref
  2026-09-01-005), Peel (payment ref [redacted]; sent letter published
  as-sent), York (payment ref [redacted]).
- **Waterloo**: online form done; must MAIL printed request + ID copy + $5
  (payee unconfirmed — money order to WRPS or call first). Address on
  /foi page.
- **Toronto**: not filed — in person at 40 College St (debit OK, closed
  Wed) or mail with $5 cheque.
- When acknowledgments arrive: give Claude the file numbers → foi.json
  status updates (statuses: sent→acknowledged→extended/refused→answered).

## Open threads / next actions
1. **Deploy**: Cloudflare Pages + readback.ofrecord.ca DNS + GitHub Action cron for
   `npm run data`. Set up themiltonrecord@gmail.com email routing (Cloudflare).
2. **Launch plan**: docs/launch-plan.md — findings-led press strategy
   (CBC Tyler Cheese exclusive → 404 Media/EFF → Show HN). Claim-audit
   gate listed there must pass first (Toronto-Axon attribution, Brampton
   50 vs 200, Hikvision wind-up verification).
3. **OG share image + JSON-LD** (SEO leftovers).
4. **News automation** (lane 3 of docs/pipeline.md; RSS list in research).
5. **Leads funnel** (docs/location-discovery.md): procurement portals,
   board agendas, WiGLE, Mapillary. leads.json not built yet.
6. **Vendor accountability round**: PIPEDA request to 407 ETR (template in
   content/vendor-questions.md) + press questions to Axon/Genetec/etc.
7. **Trends page** + monthly snapshots (pipeline lane 4).
8. **Contact panopti/DeFlock** before launch (upstream-ally positioning).
9. Interesting leads on the record: photographed fixed TPS Cloudrunners at
   Spadina/Bloor + Armoury/University (Toronto FOI will confirm); 7
   disputed "Flock" police pins; Waterloo's mail-only $5 (content!).

## Standing rules (in Claude's memory too)
- **Facts only** — every user-facing claim needs a primary source;
  inference stays flagged in data/research/. Analysis sections are marked
  and extrapolate only from vendor-documented capabilities.
- Community data is the source; Readback is the standardization layer on
  top — normalize visibly, never silently.
- No "Flock" in branding (trademark C&D precedent). Toll/border layers
  stay off-by-default with the consent-context note.

## How to resume
Open this folder in Claude Code and say "pick up Readback — read
HANDOFF.md". Dev: `npm install && npm run dev`. Data refresh:
`npm run data`. Everything is committed and pushed through commit 364c6ba.
