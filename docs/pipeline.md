# The intake pipeline — how new cameras, news, and trends reach the site

Everything is a scheduled job writing static JSON; the site rebuilds when
data changes. No servers, no database. Target runtime: GitHub Actions cron.

## The four intake lanes

### Lane 1 — Newly MAPPED cameras (running today)
`npm run data` (scripts/build-cameras.mjs), daily via cron.
- Pulls OSM via Overpass (ALPR + toll gantries + border), classifies,
  writes `public/data/cameras.json`.
- **Diffs against the previous run** → `public/data/changes.json`: every
  newly mapped or removed camera, with category/operator, last 100 change
  events. This powers a "New this week" panel and lets new dots glow on
  the map.
- Honest caveat surfaced in UI: OSM additions = newly *mapped*, not
  necessarily newly *installed*. (Context: OSM ALPR tagging is growing
  ~10k nodes per 3 weeks globally — the mapping wave is itself a trend.)

### Lane 2 — Cameras coming ONLINE (early warning, before they exist)
Sources that announce installs months ahead, monitored weekly:
- **Ontario grant announcements** (Guns, Gangs & Violence Reduction
  Strategy newsroom RSS) — names recipient cities before procurement.
- **Procurement portals** (bids&tenders, MERX) — tender → award = vendor,
  count, sometimes sites. Scraper searches: ALPR, licence plate, AutoVu,
  Fusus, Vector.
- **Police services board agendas** (CivicWeb/eScribe platforms) — approval
  reports carry PIAs, site criteria, retention configs.
Output: `data/leads.json` — the funnel (lead → candidate → confirmed →
mapped-in-OSM). Confirmed sites get tagged in OSM (upstream contribution),
after which Lane 1 picks them up automatically. Unconfirmed leads can render
as hollow markers + a "Coming soon to..." list.

### Lane 3 — News & trends (feed + timeline)
Weekly job merging:
- Curated RSS: 404 Media, EFF Deeplinks, IJ, The Record, Stateline,
  Evanston RoundTable, CBC Toronto, Blue Line, IPC Ontario news.
- Google News RSS queries (see data/research/news-sweep-2025-2026.md for
  the exact query strings, incl. Canadian-spelling variants).
- Cancellation trackers (deflocktheusa.com, findingflock.com) — scraped.
Pipeline: fetch → dedupe by URL/title → tag (region, vendor, adopt/cancel/
legal/security) → append `public/data/news.json` → /news page renders it,
newest first, with the curated timeline as the archive.
Tagging can start keyword-based; an LLM pass later for summaries.

### Lane 4 — Trend metrics (monthly)
Monthly snapshot job appends to `data/snapshots.jsonl`:
- Camera counts by category/region (from Lane 1)
- OSM global ALPR count (taginfo API)
- Cancellation count (Lane 3 trackers)
- Fleet counts as they update (manual, from research)
Output: growth charts on a /trends page — adoption curve vs cancellation
curve is the headline visual (both are rising; that IS the story).

## Flow

```
OSM/Overpass ──daily──> classify ──> cameras.json ──> map layers
     └────────────────> diff ─────> changes.json ──> "New this week"
grants/tenders/boards ──weekly──> leads.json ──> "Coming soon" + MFIPPA queue
RSS/GNews/trackers ──weekly──> tag+dedupe ──> news.json ──> /news feed
all of the above ──monthly──> snapshots.jsonl ──> /trends charts
```

## Build order
1. ✅ Lane 1 diffing (done — in build-cameras.mjs)
2. Lane 3 news fetcher (highest visible value; sources already researched)
3. "New this week" panel on map + recent-camera styling
4. Lane 2 monitors (grants RSS first — trivial; then board agendas)
5. Lane 4 snapshots + /trends page

---

## Implemented: weekly refresh (2026-09-02)

`.github/workflows/refresh-data.yml` runs the pipeline on a schedule and
on demand.

**Schedule:** Mondays 09:00 UTC (~5am ET).

**Manual republish:** GitHub → **Actions** → *Refresh camera data* →
**Run workflow**. Works from the GitHub mobile app too, so a republish is
available from anywhere. The button offers a `force` checkbox that
bypasses the sanity gate — only tick it when a large change is genuinely
real.

**What a run does:** query Overpass (3 mirrors, 3 attempts, 30s backoff)
→ classify → sanity-gate → diff against committed data → `npm run build`
to prove the site still compiles → commit only if data actually changed →
push, which triggers the Cloudflare Pages deploy.

**Sanity gate** (in `scripts/build-cameras.mjs`, runs before any write):
- Hard floor: refuse anything under 500 features (Canada sits ~1,357).
- Shrink guard: refuse a drop of more than 10% vs the committed data.
- Both bypassable with `--force`. Tested against truncated fixtures: a
  20-feature response and a 19% shrink are both refused with exit 1 and
  the existing data left untouched.

The point of the gate: a *partial* Overpass response is structurally
valid but quietly wrong. Committing one would wipe the map and emit a
bogus "N cameras removed" event. A loud failure is always better.

**Staleness is visible on the site.** The map panel prints "camera data
updated N days ago" and, past 10 days, adds "refresh may be stalled" in
amber — so a silently broken cron shows up to visitors rather than
letting the site quietly serve stale claims.

**"New this week"** reads `changes.json` and lists newly mapped cameras
(clicking one flies the map to it). Labelled *newly mapped, not
necessarily newly installed* — the honest framing.
