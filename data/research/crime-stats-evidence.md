# ALPR effectiveness evidence + programmatic crime data sources

Research agent report, 2026-09-01. Verify before publishing.

## PART A — EVIDENCE

### A1. Academic studies on ALPR effectiveness

| Study | Design | Finding | Effect size |
|---|---|---|---|
| **Lum, Merola, Willis & Cave (2010/2011)** — George Mason CEBCP, "License Plate Reader (LPR) Police Patrols in Crime Hot Spots" (J. Experimental Criminology 2011) | RCT: 30 auto-crime hot spots in 2 VA jurisdictions, 15 treated with LPR "sweep-and-sit" patrols | **No statistically significant effect** on general crime, auto-related crime, vehicle-theft calls, or auto theft | Null across all outcomes |
| **Taylor, Koper & Woods (2012)** — Criminal Justice Review, Arizona RCT (Mesa PD) | Randomized experiment, LPR vs manual plate checks vs control | LPR checked 8–10x more plates, ~3x more stolen-vehicle hits, 2x more recoveries; **more recoveries/arrests but no decline in auto theft rates** | Productivity gains only; null deterrence |
| **Koper, Lum, Wu et al. (2021)** — J. Experimental Criminology | Quasi-randomized: 785 patrols at 33 hot spots, 4.5 months, LPR vs non-LPR patrol cars | LPR increased stolen-vehicle recoveries but not arrests; **no effect on likelihood, timing, or seriousness of next crime call**. "Little clear evidence for crime prevention efficacy of LPRs in general patrol" | Null deterrence |
| **Lum et al. 2010 (citywide clearance analysis)** | Observational | More stolen-vehicle recoveries but not arrests; **no citywide improvement in auto-theft clearance rates**; clearance improved only in high-camera-concentration areas | Localized clearance gain only |
| **RAND (2014)** — RR-467 | Literature review + case studies | Anecdotal effectiveness only (NYC GLA arrests +31% Q1 2011; Montgomery County MD: 4 stolen vehicles per 48,000 scans). RAND notes lack of rigorous outcome evidence | No causal estimate |
| **Mourtgos & Adams (2025, working paper)** — CrimRxiv | Sun-Abraham event study, staggered Flock deployment in 216 US agencies, NIBRS 2017–2023 | **Motor vehicle theft fell 11.0% after deployment (95% CI [−17.3, −4.2])**; strongest quasi-experimental pro-ALPR result to date | −11.0% MVT |
| **Shjarback & Sarkos (2025)** — Justice Evaluation Journal 8(2):225–242, Atlantic City NJ | Pre/post, fixed ALPRs on all city entrances/exits | **No reduction in violent crime overall; reductions in shootings, motor vehicle thefts, property crime**; use siloed in investigative units | Mixed |

**Bottom line:** all experimental evidence on mobile/patrol ALPR is null for deterrence; ALPRs reliably increase recoveries and hits, not crime reduction. Newer fixed-network studies find modest auto-theft reductions (~11%) but are quasi-experimental; clearance improvements weak/localized.

### A2. Displacement vs diffusion of benefits (CCTV literature, nearest proxy for fixed ALPR)

- **Welsh & Farrington (2008/2009)**, Campbell Systematic Review: CCTV → modest **16% overall crime decrease**, driven almost entirely by **car parks (51% decrease)**, mostly vehicle crime; effective when coverage high + combined with lighting. **No systematic evidence of spatial displacement; some diffusion of benefits.**
- **Farrington, Gill, Waples & Argomaniz (2007)**: English national 14-site quasi-experiment — effective in station car parks, not city centres/residential; vehicle crimes only.
- **Piza, Welsh, Farrington & Thomas (2019)**, Criminology & Public Policy 18(1): 40-year meta-analysis, 80 studies — significant modest overall decrease; largest effects in car parks; multi-intervention schemes outperform CCTV-alone. Displacement generally not found; diffusion of benefits about as common as displacement.
- Pattern: **vehicle crime in bounded areas responds; violent crime does not; displacement rarer than feared but diffusion is localized.**

### A3. Flock Safety's claims and critiques

- **"Reduces crime by up to 70%"** — sourced to San Marino, CA. Forbes (Farivar, Feb 29 2024): San Marino's own police chief John Incontro says the figure **isn't accurate**; Forbes found Flock "handpicked and oversimplified data" across San Marino, Fort Worth, Dayton, Lexington. Dayton: Flock claimed 46% violent-crime reduction in target area after 6 months; local reporting contradicted the framing.
- **"Instrumental in solving 10% of reported US crime"** (Feb 2024, Flock staff + academic overseer Johnny Nhan, TCU): 404 Media — Nhan later said he "would have done things much differently"; police data "too varied and incomplete… to do any type of meaningful statistical analysis."
- **2025 "Impact Census"** (~700 agencies, 43 states): self-reported customer survey; Flock calls methodology "a starting point"; selection bias; national crime-decline context omitted.
- **Accuracy**: IPVM (2021) found ~10% error rate in Flock Falcon output.

### A4. Hit rates (audited)

| Jurisdiction | Reads vs hits | Rate |
|---|---|---|
| LAPD (CA State Auditor 2019-118) | 99.9% of stored images not on any hotlist | **~0.1%** |
| Central Marin Police Authority, CA | ~4M plates → hotlist matches | **0.02%** |
| Piedmont, CA | 2M scans → 26 investigative leads | **0.0013%** |
| High Point PD, NC | — | 0.08% |
| Rhinebeck PD, NY | — | 0.01% |
| LAPD Inspector General hotlist audit | 161 of 498 alerts false (stale/incorrect hotlist) | **~1 in 3 alerts false** |

**Toronto**: no published hit-rate audit found. TPS discloses retention only (reads 7 days, **hits 365 days**; full ~560-vehicle fleet equipped as of ~2019): https://www.tps.ca/use-technology/automatic-licence-plate-reader/

### A5. False positives / wrongful stops

- **Institute for Justice**: at least **27 documented wrongful-stop cases since 2018**, majority since 2023.
- **Vallejo, CA randomized trials: 37% of stationary ALPR hits were misreads**; another study: 1-in-10 plate misreads.
- Settlements: **Aurora, CO (Gilliam family, children held at gunpoint, 2020) — $1.9M**; **Contra Costa (Brian Hofer, 2019, stale hotlist) — $49,500**.
- EFF "The Human Toll of ALPR Errors" (Nov 2024): https://www.eff.org/deeplinks/2024/11/human-toll-alpr-errors

## PART B — PROGRAMMATIC DATA SOURCES

### FBI Crime Data Explorer API
- Base: `https://api.usa.gov/crime/fbi/cde/` (free key from https://api.data.gov/signup/).
- Patterns: `/summarized/agency/{ORI}/{offense}?from=MM-YYYY&to=MM-YYYY&API_KEY=`; estimates by state/national; NIBRS by agency. Granularity: **agency (ORI) × month (SRS); agency × year (NIBRS)** — no incident-level lat/lon.
- Docs: https://github.com/fbi-cde/crime-data-api ; BJS NIBRS estimates API: https://bjs.ojp.gov/national-incident-based-reporting-system-nibrs-national-estimates-api

### Toronto Police Service Public Safety Data Portal (best fit for ALPRMap)
- Portal: https://data.torontopolice.on.ca / ArcGIS Hub: https://opendata-torontops.opendata.arcgis.com
- ArcGIS REST root: `https://services.arcgis.com/S9th0jAJ7bqgIRjw/arcgis/rest/services` — query any layer via `/{ServiceName}/FeatureServer/0/query?where=1=1&outFields=*&f=geojson` (supports `resultOffset` paging, `where` on OCC_YEAR, NEIGHBOURHOOD_158).
- Verified services: `Auto_Theft_Open_Data`, `Break_and_Enter_Open_Data`, `Major_Crime_Indicators_Open_Data`, `Theft_From_Motor_Vehicle_Open_Data`, `Shooting_and_Firearm_Discharges_Open_Data`, `Neighbourhood_Crime_Rates_Open_Data` (158 neighbourhoods × year). Incident-level records: occurrence date/time, offence, nearest-intersection geocoding. Current-year data lags until year-end.

### Statistics Canada — Web Data Service (WDS)
- Base: `https://www150.statcan.gc.ca/t1/wds/rest/` (JSON, no key).
- Methods: `getCubeMetadata`, `getDataFromCubePidCoordAndLatestNPeriods`, `getDataFromVectorsAndLatestNPeriods`, `getBulkVectorDataByRange`, `getFullTableDownloadCSV/{pid}/en`.
- Crime Severity Index: table **35-10-0026** (PID `35100026`), annual, Canada/province/CMA. Full CSV: `https://www150.statcan.gc.ca/t1/wds/rest/getFullTableDownloadCSV/35100026/en`. Also 35-10-0177 (incident-based crime by detailed violation, police-service level — Toronto auto theft counts).

### US city open data (Socrata SODA)
- **Chicago**: `https://data.cityofchicago.org/resource/ijzp-q8t2.json` (2001–present, incident-level, lat/lon)
- **NYC**: `https://data.cityofnewyork.us/resource/5uac-w243.json` (YTD) + historic `qgea-i56i`
- **LA**: `https://data.lacity.org/resource/2nrs-mtv8.json` (2020–present; quality issues post-2024 NIBRS transition)
- Same SODA pattern for Austin, Seattle, SF, Dallas.

### ALPR install-date / location datasets
- **DeFlock.me** — crowdsourced global ALPR map with per-camera submission dates; community API/data pulls exist (used by ATAK map layer). Install dates approximate (first-reported).
- **EFF Atlas of Surveillance** — agency-level tech adoption CSV: https://www.atlasofsurveillance.org/pages/data-library
- **EFF ALPR FOIA datasets** (historical scan/hit data): https://www.eff.org/pages/automated-license-plate-reader-dataset
- **No public dataset directly links verified install dates to local crime series** — Mourtgos & Adams built theirs from Flock deployment records + NIBRS (unpublished); replication path: pair Atlas of Surveillance/DeFlock dates with FBI CDE agency-month series.

## Source links

Lum et al. NIJ: https://nij.ojp.gov/library/publications/license-plate-reader-lpr-police-patrols-crime-hot-spots-experimental
Lum et al. JEC 2011: https://link.springer.com/article/10.1007/s11292-011-9133-9
CEBCP LPR brief: https://cebcp.org/wp-content/evidence-based-policing/LPR_FINAL.pdf
Taylor Koper Woods 2012: https://doi.org/10.1177/0734016811425858
Koper et al. 2021: https://link.springer.com/article/10.1007/s11292-021-09473-y
RAND RR-467: https://www.rand.org/pubs/research_reports/RR467.html
Mourtgos & Adams: https://www.crimrxiv.com/pub/zleg04q3/release/1
Shjarback & Sarkos 2025: https://www.tandfonline.com/doi/full/10.1080/24751979.2025.2473363
Welsh & Farrington: https://dx.doi.org/10.4073/csr.2008.17
Piza et al. 2019: https://onlinelibrary.wiley.com/doi/abs/10.1111/1745-9133.12419
Forbes on Flock: https://www.forbes.com/sites/cyrusfarivar/2024/02/29/flock-ai-cameras-may-not-reduce-crime/
404 Media on Flock study: https://www.404media.co/researcher-who-oversaw-flock-surveillance-study-now-has-concerns-about-it/
Flock Impact Census: https://www.flocksafety.com/blog/how-effective-is-flock
CA State Auditor 2019-118: https://information.auditor.ca.gov/reports/2019-118/summary.html
EFF ALPR errors: https://www.eff.org/deeplinks/2024/11/human-toll-alpr-errors
IJ wrongful stops: https://ij.org/dozens-of-innocent-motorists-have-been-pulled-over-detained-at-gunpoint-or-jailed-due-to-ai-license-plate-camera-errors/
FBI crime-data-api: https://github.com/fbi-cde/crime-data-api
TPS portal: https://data.torontopolice.on.ca/
StatCan WDS: https://www.statcan.gc.ca/en/developers/wds/user-guide
TPS ALPR page: https://www.tps.ca/use-technology/automatic-licence-plate-reader/
