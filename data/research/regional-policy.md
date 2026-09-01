# ALPR regulation & deployment policy — region-by-region

Research agent report, 2026-09-01. Caveats at bottom; verify flagged items before publishing.

## 1. CANADA

### Legal framework / oversight model
- No ALPR-specific statute anywhere in Canada. Governance = general privacy law + privacy-commissioner guidance:
  - Federal public sector (RCMP): Privacy Act, overseen by OPC.
  - Private sector: PIPEDA; Quebec (Law 25), BC, Alberta have substantially similar laws.
  - Provincial/municipal police: Ontario MFIPPA/FIPPA (amended by Bill 97), BC FIPPA, Quebec public-sector Act (overseen by CAI).
- Structural difference from US: proactive commissioner oversight (PIAs, investigation reports, guidance) rather than statutes with hard retention numbers; commissioner recommendations quasi-binding. Academic survey: "Automated Licence Plate Recognition in Canadian Policing" (Canadian Public Policy, 2024) — ALPR in use in ON, BC, AB, SK, QC, NS, PEI. https://utppublishing.com/doi/10.3138/cpp.2024-056

### BC — the foundational ruling
- **OIPC BC Investigation Report F12-04** (Nov 15, 2012, Commissioner Elizabeth Denham) on Victoria PD: retaining/sharing "non-hit" data violated BC FIPPA; ordered non-hit data deleted immediately; barred disclosure of non-hit data to RCMP. https://www.oipc.bc.ca/documents/investigation-reports/1410
- RCMP (running the BC ALPR program) changed practice to delete non-hit data. https://www.cbc.ca/news/canada/british-columbia/rcmp-to-change-licence-plate-scanning-amid-privacy-fears-1.1304171

### Ontario — IPC guidance + Toronto
- **IPC Ontario ALPR guidance** — first 2017, updated 2024 (consultation incl. TPS) for AI-capable systems; recommends minimal non-hit retention, PIAs, audits, transparency. https://www.ipc.on.ca/en/resources-and-decisions/guidance-use-automated-licence-plate-recognition-systems-police-services
- **Toronto Police Service:** Board approved July 2023; by Feb 2025 entire marked fleet (~560–600+ vehicles) ALPR-equipped — capacity 1.25M+ scans/day, reads at up to 225 km/h. Retention: **reads 7 days; hits 365 days**, then purged; PIA completed. Sources: https://www.blueline.ca/tps-fleet-now-fully-equipped-with-automatic-licence-plate-recognition/ ; https://www.cbc.ca/news/canada/toronto/technology-scans-licence-plates-toronto-polite-1.7451495 ; https://www.tps.ca/use-technology/automatic-licence-plate-reader/
- **AI expansion (2025–2026):** funded in TPSB-approved 2026 operating budget (Dec 2025). AI use governed by TPSB "Use of Artificial Intelligence Technology" policy (Feb 28, 2022 — first in Canada; risk-tiered review). https://www.tps.ca/media-centre/news-releases/toronto-police-service-board-approves-2026-operati-1/ ; https://tpsb.ca/home/about/policies-by-laws/board-policies/use-of-artificial-intelligence-technology/
- Fixed ALPR spreading in Ontario: Greater Sudbury Police (16 locations), Brampton (50 intersection cameras). **Flock Safety says it has no Canadian municipal/police partnerships; OPP says it does not use Flock.** https://www.theepochtimes.com/world/use-of-licence-plate-reading-cameras-expanding-in-canada-as-flock-related-privacy-concerns-grow-in-us-6075207

### Quebec
- SPVM (Montreal): SRPI on ~30 patrol vehicles; only 2 SPVM officers can query stored data; officers cannot search historical captures. https://spvm.qc.ca/en/Fiches/Details/User-process-on-the-automated-licence-plate-reader-ALPR-system
- **Sûreté du Québec discontinued its ALPR system** (SAAQ stopped funding). https://journalmetro.com/actualites/national/2947991/la-sq-met-fin-au-systeme-de-reconnaissance-des-plaques-dimmatriculation/
- Oversight: CAI; Law 25 raised private-sector obligations. Critics (COBP) accuse SPVM/CAI of opacity.

### RCMP
- ALPR in "several divisions" for traffic/public safety; post-2012 BC ruling, deletes non-hit data. https://www.rcmp.ca/en/bc/traffic-services/automatic-license-plate-recognition-technology

### Canada vs US summary
- Canada: commissioner-led, PIA-driven, non-hit minimization doctrine, short read-retention (immediate–7 days typical), no vendor-networked national search (no Flock).
- US: patchwork of ~16 state statutes, no federal law, Fourth Amendment litigation + AG enforcement as backstops, massive privately-networked cross-jurisdiction search (Flock ~5,000+ agencies).

## 2. UNITED STATES — state statutes

- **New Hampshire — RSA 261:75-b:** strictest — reads purged **within 3 minutes** unless hit led to arrest/citation/protective custody or matched a broadcast; no occupant imaging; LPR registration required. NOTE: slated for repeal effective Jan 1, 2027 — watch. https://law.justia.com/codes/new-hampshire/title-xxi/chapter-261/section-261-75-b/
- **Maine — 29-A M.R.S. §2117-A:** prohibited by default, narrow exceptions; retention max **21 days**. https://www.mainelegislature.org/legis/statutes/29-a/title29-Asec2117-A.html
- **California — SB 34 (2015), Civil Code §§1798.90.5+:** public usage/privacy policies required; CHP retention **60 days**; sharing only with CA "public agencies." AG Bonta Oct 2023 bulletin (2023-DLE-06): out-of-state/federal sharing unlawful. https://oag.ca.gov/system/files/media/2023-dle-06.pdf
- **Virginia — 2025 law (HB 2724):** LE retention capped at **21 days**; regulates permissible uses. (Verify status/effective dates on LIS Virginia.) https://virginiamercury.com/briefs/license-plate-reader-bill-clears-the-house-but-privacy-concerns-persist/
- **Illinois:** 2023 law bars ALPR data use for immigration enforcement or out-of-state abortion prosecutions.
- **Colorado — C.R.S. §24-72-113 (2014):** passive surveillance records destroyed by 3rd anniversary; access after year 1 only if tied to claim/incident. Pending SB 26-70 (2026): warrant for searches >3 days post-crime, 31-day cap. https://coloradonewsline.com/2026/02/24/colorado-bill-limit-license-plate-reader-data/
- **Other caps:** Minnesota 60d; Vermont 18mo (23 V.S.A. §1607); Georgia 30mo; Tennessee 90d; Utah 9mo; Arkansas 150d; Montana regulates LE use. ~16 states regulate; ~8 with retention limits.
- **New Jersey (AG directive):** 2010-5 set 5yr; **Directive 2022-12 cut to 3yr**. https://www.njoag.gov/resources/ag-directives/ag-directives-2010/

### Courts — Schmidt v. City of Norfolk (the Fourth Amendment test case)
- Oct 2024: Institute for Justice sued Norfolk VA over 176-camera Flock network. MTD denied (Chief Judge Mark Davis, E.D. Va.). **Jan 27, 2026: district court ruled network constitutional as operated** — 21-day retention + coverage gaps don't capture "the whole of a person's movements" under Carpenter. On appeal to Fourth Circuit (fully briefed June 2026; ACLU/EFF/Cato amici for plaintiffs; DOJ backed rejection). https://www.courthousenews.com/judge-holds-norfolks-license-plate-reader-use-constitutional/

### Cities that banned/removed ALPR
- **Austin, TX — ended Flock contract June 2025** (organizer pressure + APD audit; ICE-sharing revelations central). Then: Texas DPS installed its own LPRs in Austin (Feb 2026) over city objections; APD found a "loophole" to access data; Austin adopted a TRUST Act. https://www.eff.org/deeplinks/2025/06/victory-austin-organizers-cancel-citys-flock-alpr-contract
- **San Marcos TX, Hays County TX, Pflugerville TX** ended/declined Flock contracts.
- **Evanston, Oak Park IL** ended contracts amid the Illinois investigation. https://abc7chicago.com/post/evanston-oak-park-end-contracts-flock-safety-license-plate-reader-company-investigation-illinois/17678137/
- Since Feb 2025, **~23 communities** rejected/cancelled/terminated Flock contracts. https://stateofsurveillance.org/articles/surveillance/communities-winning-against-alpr-flock-safety-2025/

### Sanctuary-state conflicts over ICE/federal access
- **California:** Oct 3, 2025 — **Bonta sued El Cajon** for sharing ALPR data with 100+ out-of-state agencies; ongoing. SF Standard (July 2025) found continued violations statewide. https://www.oag.ca.gov/news/press-releases/attorney-general-bonta-sues-el-cajon-illegally-sharing-license-plate-data-out
- **Illinois:** Aug 25, 2025 — SoS Giannoulias audit: **Flock violated IL law by letting CBP access Illinois cameras**; trigger was May 2025 Johnson County TX deputy's nationwide search for a woman who self-administered an abortion, hitting Mount Prospect IL cameras. Flock then blocked search terms "abortion"/"immigration"/"ICE" (late June 2025), paused federal/CBP pilot. Sept 5, 2025 follow-up caught Forest Park PD sharing with CBP. https://www.ilsos.gov/news/2025/august-25-2025-giannoulias-audit-finds-license-plate-reader-company-in-violation-of-state-law.html
- Flock added auditing/accountability controls (Aug 2026). https://www.cnn.com/2026/08/13/tech/flock-cameras-police-auditing-controls
- **Colorado:** SB 26-70 explicitly aimed at ICE access via warrant requirement.

## 3. RETENTION COMPARISON TABLE (headline exhibit)

| Jurisdiction | Non-hit/read retention | Authority |
|---|---|---|
| New Hampshire | **3 minutes** | RSA 261:75-b |
| BC, Canada (police) | Immediate deletion of non-hits | OIPC BC F12-04 (2012) |
| Peel Regional Police (ON) | 24 hours (matches 30 days) | user-provided; verify |
| Toronto Police | 7 days (reads) / 365 days (hits) | TPS policy + PIA |
| Maine | 21 days | 29-A §2117-A |
| Virginia | 21 days | HB 2724 (2025) |
| Flock default (US) | 30 days | vendor default |
| Minnesota | 60 days | statute |
| California (CHP) | 60 days | SB 34 |
| Tennessee | 90 days | statute |
| Arkansas | 150 days | statute |
| Utah | 9 months | statute |
| UK (National ANPR Service) | 12 months (auto-delete at 9mo unless hotlisted) | NPCC standards/DPIA |
| Vermont | 18 months | 23 V.S.A. §1607 |
| Georgia | 30 months | statute |
| Colorado | 3 years max | C.R.S. 24-72-113 |
| New Jersey | 3 years (was 5) | AG Directive 2022-12 |
| No-statute US states (~34) | agency discretion, up to indefinite (LAPD held 320M images) | — |

## 4. EU / UK CONTRAST

### UK
- **National ANPR Service (NAS):** ~12,076 fixed camera sets + 1,878 mobile (≈14,000), **100M+ reads/day** (~36.5B/yr); former Surveillance Camera Commissioner: possibly "one of the largest data gatherers of its citizens in the world," "limited democratic oversight," **no specific statutory basis**. Retention 12 months (auto-delete at 9 unless hotlisted). Home Office DPIA: https://www.gov.uk/government/publications/national-anpr-service-data-protection-impact-assessment/national-anpr-service-data-protection-impact-assessment-accessible
- NOTE: the old "2-year retention" figure is outdated — current standard is 12 months.
- Oversight churn: Biometrics & Surveillance Camera Commissioner abolished (functions split to ICO + IPCO); Surveillance Camera Code duty removed; ANPR Independent Advisory Group "neither a governance nor an oversight body."
- Scotland: 233 cameras (locations secret), ~1.2M images/day, 442M stored.

### EU
- Plate data = personal data under GDPR (private use) and Law Enforcement Directive 2016/680 (police). DPIA required for systematic public monitoring; purpose limitation; minimum-necessary retention; signage. National rules vary.
- Contrast: EU has no US-style vendor-networked national search; deployments state-run, statute-bounded, DPIA-gated.

## 5. OVERSIGHT BODIES & AUDIT FINDINGS

| Body | Jurisdiction | Key finding |
|---|---|---|
| California State Auditor (2019-118, Feb 2020) | CA | LAPD/Fresno/Marin/Sacramento: **none fully SB 34 compliant**; LAPD had **no usage policy**, 320M images, only ~0.1% hits; all retained ≥1yr though searches rarely exceeded 6mo. https://www.auditor.ca.gov/reports/2019-118/index.html |
| California AG | CA | 2023 sharing ban bulletin; 2025 El Cajon lawsuit |
| Illinois SoS | IL | Aug–Sep 2025 audits: Flock enabled CBP access; abortion-related search hit IL cameras |
| OIPC BC | BC | F12-04: non-hit retention/sharing unlawful — template ruling for Canada |
| IPC Ontario | ON | 2017/2024 ALPR guidance |
| OPC Canada | Federal | RCMP (Privacy Act) + private sector (PIPEDA) |
| CAI Québec | QC | SPVM/public bodies + Law 25; criticized as permissive/opaque |
| UK ICO + (abolished) BSCC | UK | "Limited democratic oversight," no statutory basis for NAS; oversight gap after abolition |
| TPSB | Toronto | PIA + AI policy (2022); 2026 budget expands ALPR |
| Austin city audit | TX | Preceded June 2025 Flock cancellation |

## Cross-cutting narratives for the site
1. **Retention spans 5+ orders of magnitude**: 3 minutes (NH) to indefinite (unregulated US states) — single best comparison metric.
2. Canada's doctrine: delete non-hits fast (minutes–7 days). US: caps on everything retained. UK: retain everything 12 months on a national database with no statute.
3. **2025 = US inflection year**: ICE/CBP/abortion-search revelations → AG/SoS enforcement (CA, IL), ~23 community Flock cancellations, Norfolk Fourth Amendment case at 4th Circuit.
4. **Flock's absence from Canada and the EU is itself a structural regulatory outcome.**

## Caveats to verify before publishing
- Colorado SB 26-70 and NH repeal (eff. Jan 1, 2027) in flux.
- UK retention is 12 months, not 2 years.
- Virginia HB 2724 status/effective dates: check LIS Virginia.
- Peel 24h retention: user-provided, needs primary source.
