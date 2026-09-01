# ALPR news sweep: 2025 – September 2026

Research agent report, 2026-09-01. Dates marked "~" not fully verified.

## 1. CANADA

### Toronto Police fleet fully equipped with AI-powered ALPR
- ~2025-02 (CBC), follow-ups through 2026 — CBC / Blue Line / Yahoo (CP)
- TPS completed ALPR rollout integrated into the Axon in-car camera system across the full fleet — 560 vehicles at first report, now 600+. Reads plates at up to 225 km/h; capacity 1.25M+ scans/day; AI also identifies vehicle make/model. Reads retained 7 days, hits 365 days. Police: "game-changer"; privacy experts: "constant eyes." TPS 2026 capital budget adds **$5.6M for "AI Operationalization"** and $1.1M for CCTV expansion/integration.
- https://www.cbc.ca/news/canada/toronto/technology-scans-licence-plates-toronto-polite-1.7451495 ; https://www.blueline.ca/tps-fleet-now-fully-equipped-with-automatic-licence-plate-recognition/ ; https://www.tps.ca/use-technology/automatic-licence-plate-reader/

### ALPR quietly expanding across Canada; no Flock in Canada
- 2026-08-14 (upd. 08-26) — The Epoch Times
- Ottawa Police: 5 → 65 ALPR-equipped patrol vehicles. Greater Sudbury: 31 equipped vehicles + fixed ALPRs at 16 locations (provincially funded). Brampton: 50 **Genetec** intersection cameras feeding Peel Regional Police. Napanee ON: 4 fixed cameras. York Regional Police: CCTV/ALPR on **Axon Fusus**. Toronto, Peel, Waterloo, Winnipeg, Vancouver PD, RCMP, Highway 407 all operate ALPR. **Flock confirmed no Canadian partnerships; OPP has no plans to use Flock.** Privacy-commissioner regime credited as the check on US-style dragnet growth.
- https://www.theepochtimes.com/world/use-of-licence-plate-reading-cameras-expanding-in-canada-as-flock-related-privacy-concerns-grow-in-us-6075207
- Note: no confirmed Vancouver/Calgary fixed-network adoption found; BC mostly vehicle-mounted RCMP/ICBC.

## 2. UNITED STATES

### ICE/CBP data-sharing scandal ("side door" searches)
- 2025-05 onward — 404 Media (original reporting)
- Local police ran ~4,000 Flock network lookups for ICE despite ICE having no Flock contract; a Texas officer searched 83,000+ cameras nationwide for a woman who self-administered an abortion. CBP had near-unfettered access to 80,000+ cameras via an undisclosed "pilot program" Flock leadership claimed not to know about. Flock responded by blocking out-of-state searches into IL/CA/VA and adding immigration-search controls. **Proximate driver of most 2025-26 cancellations.**
- https://www.404media.co/flock-removes-states-from-national-lookup-tool-after-ice-and-abortion-searches-revealed/ ; https://jsis.washington.edu/humanrights/2025/10/21/leaving-the-door-wide-open/

### Austin cancels Flock (June 2025)
- Contract lapsed end of June 2025 after organizing (EFF, local coalitions); template for the wave. https://www.eff.org/deeplinks/2025/06/victory-austin-organizers-cancel-citys-flock-alpr-contract

### Evanston IL terminates Flock after state audit
- Terminated eff. Sept 26, 2025 (19 cameras) after IL SoS audit found Flock let CBP access IL cameras via the secret pilot, violating IL's law banning ALPR sharing for immigration/reproductive-health investigations. Flock contested; last two cameras not removed until **March 2026** after a RoundTable inquiry.
- https://evanstonroundtable.com/2025/08/26/evanston-shuts-down-license-plate-cameras-terminates-contract-with-flock-safety/

### The cancellation wave — 50+ cities drop Flock
- NPR overview 2026-02-17; ~56 cancellations by mid-2026. Denver: all 110 cameras removed at contract expiry 2026-03-31, **replaced with a smaller 50-camera Axon network** over ACLU objections. Eugene OR terminated Dec 2025 after a camera was reactivated without authorization. San Marcos/Pflugerville TX; Flagstaff/Sedona/South Tucson AZ; OR/WA cities citing security-exposure findings. Meanwhile **Flock crossed 100,000 cameras mid-2026** — adoption and backlash growing simultaneously.
- https://www.npr.org/2026/02/17/nx-s1-5612825/flock-contracts-canceled-immigration-survillance-concerns ; https://denverite.com/2026/02/24/denver-ends-flock-contract-axon-alpr/ ; trackers: https://deflocktheusa.com/cancellations/ ; https://www.findingflock.com/learn/flock-contract-cancellations

### Norfolk VA — Schmidt v. Norfolk (IJ Fourth Amendment challenge)
- Filed 2024-10; Jan 2026 summary judgment for Norfolk (network "not extensive enough"); appealed to Fourth Circuit; federal government filed for Norfolk. One plaintiff's plate logged **526 times in ~4 months**. Watch alongside **SCOTUS Chatrie v. United States (2026-06-29, 6-3: geofence data is a Fourth Amendment search)** — read as signaling ALPR dragnets are ripe for challenge.
- https://www.courthousenews.com/judge-holds-norfolks-license-plate-reader-use-constitutional/ ; https://theautowire.com/2026/07/06/the-supreme-court-just-handed-flocks-license-plate-cameras-a-legal-time-bomb/

### State legislation 2025–2026
- Virginia HB 2724 (2025): retention/purpose limits. California SB 274 passed but **vetoed by Newsom Oct 2025**. **Washington Driver Privacy Act (SB 6002, signed 2026-03-30): 21-day cap, immigration ban, no cameras near schools/worship/courts.** Oregon 2026: 30-day cap. NYU Law review: even top states (CT, OR, VA, WA) meet only 6 of 7 privacy criteria.
- https://stateline.org/2026/01/08/worried-about-surveillance-states-enact-privacy-laws-and-restrict-license-plate-readers/

## 3. FLOCK SAFETY COMPANY NEWS

- **Funding:** $275M led by a16z at $7.5B (Mar 2025); ~$300M ARR, 5,000+ communities; Apr 2026 secondary implies **$8.4B valuation** amid protests. https://builtin.com/articles/flock-safety-raises-275m-7b-valuation-20250318
- **Nova people-lookup tool:** leaked audio showed Flock building "Nova" to "jump from LPR to person" using data brokers + hacked datasets (incl. ParkMobile breach), no warrant. Internal ethics objections; Flock said it would exclude breach data; later code analysis disputed that. Early access with some agencies. https://www.404media.co/license-plate-reader-company-flock-is-building-a-massive-people-lookup-tool-leak-shows/
- **Drones:** Aerodome acquisition → drone-as-first-responder line (2025). https://sacra.com/c/flock-safety/
- **Security research (Dec 2025–Jan 2026):** 60–67 camera live feeds + debug interfaces exposed unauthenticated (live + 30-day archive; Cedar Rapids IA, Douglas County CO); 50+ vulnerabilities; ~35 customer accounts with stolen credentials on Russian forums. Cameras accessible days after claimed fixes; Flock published rebuttal. Cited in OR/WA cancellations. https://gainsec.com/2026/01/09/bird-hunting-season-finding-67-live-camera-feeds-and-debug-web-interfaces-accidentally-exposed-by-flock-safety/
- **Competitive shift:** Axon and Flock ended partnership early 2025, now direct competitors; **Axon is the beneficiary of Flock backlash** (Denver switch; Axon Fusus is Toronto/York's platform).

## 4. FEED SOURCES FOR AUTOMATED COVERAGE

RSS:
- 404 Media (best on Flock): https://www.404media.co/rss/ (filter Flock|license plate|ALPR; partially paywalled)
- EFF Deeplinks: https://www.eff.org/rss/updates.xml
- Ars Technica: https://feeds.arstechnica.com/arstechnica/index
- Institute for Justice: https://ij.org/feed/
- The Record: https://therecord.media/feed
- Evanston RoundTable: https://evanstonroundtable.com/feed/ (best local Flock accountability beat)
- Stateline: https://stateline.org/feed/
- State of Surveillance: https://stateofsurveillance.org/
- Canada: CBC Toronto https://www.cbc.ca/webfeed/rss/rss-canada-toronto (CBC blocks scrapers — use RSS); IPC Ontario https://www.ipc.on.ca/en/news ; Blue Line https://www.blueline.ca/feed/
- Trackers (scrape): https://deflock.me ; https://deflocktheusa.com/cancellations/ ; https://www.findingflock.com/learn/flock-contract-cancellations

Google News RSS (`https://news.google.com/rss/search?q=<QUERY>&hl=en-US&gl=US&ceid=US:en`):
- `"Flock Safety" (contract OR cancel OR council OR lawsuit)`
- `"license plate reader" (privacy OR surveillance OR ICE OR lawsuit)`
- `"licence plate" (police OR ALPR) when:30d` with `&hl=en-CA&gl=CA&ceid=CA:en` for Canadian coverage
- `ALPR (ordinance OR legislation OR retention)`
- `"automatic license plate" (Axon OR Motorola OR Genetec OR Flock)`
