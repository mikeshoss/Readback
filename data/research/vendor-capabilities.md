# ALPR vendor capability comparison

Research agent report, 2026-09-01. Confidence noted where inferred. Neutral baseline sources: DHS S&T ALPR Market Survey (June 2025, 16 providers): https://www.dhs.gov/sites/default/files/2025-06/25_0606_st_lprmsr.pdf ; ACLU vendor roundup: https://www.aclu.org/news/privacy-technology/other-alpr-vendors ; EFF SLS ALPR page: https://sls.eff.org/technologies/automated-license-plate-readers-alprs

## 1. Summary matrix

| Vendor | Plate reads | Vehicle fingerprint | People/gait | Audio/gunshot | Facial recognition | AI/NL search | Cross-agency network | Fed/ICE exposure | Retention default | Form factors | Pricing |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Flock Safety | Yes | Yes — flagship (make, type, color, bumper stickers, roof racks, damage) | No gait; Oct 2025 "human distress" audio detection | Yes — Raven (native) | Claims none | Yes (attribute + Nova) | Largest: TALON nationwide lookup, ~5,000 agencies | NCIC incl. ICE Immigration Violator File; documented "side-door" ICE searches | 30 days (5-yr paid SKU) | Fixed solar (Falcon), mobile, trailers, PTZ, drones | ~$3,000/cam/yr |
| Motorola (Vigilant + DRN; Avigilon/BriefCam) | Yes | Yes (make/model/color, accessories/damage) | Via BriefCam/Avigilon (person/appearance search, separate products) | No | Yes — BriefCam includes FR (portfolio, not LPR product) | Yes ("plain-language AI search") | LEARN-NVLS: 500+ agencies, 1.5B LE + 5B+ commercial (DRN repo fleet) | Direct: ICE via Thomson Reuters $6.8M contract | Agency-set; indefinite allowed (NYPD 5 yr) | Fixed (ReaperHD), in-car, L6Q portable | Not public |
| Genetec AutoVu | Yes | Yes (Cloudrunner: type, color, direction, speed, no-plate vehicles) | No | No | No | Attribute search (partial/no-plate) | Agency-controlled; **no vendor-run national pool** | None documented | Customer-controlled | Fixed SharpV, in-car SharpZ3, Cloudrunner solar | Not public |
| Axon (Fusus) | Yes | Yes (vehicle intelligence attribute search) | No (bodycam FR ruled out by ethics board) | No native; Fusus ingests ShotSpotter | No (committed against face matching 2019 — but see Edmonton bodycam FR testing 2025, user notes) | Attribute search | Dept-by-dept agreements; Fusus community/private camera registry | NCIC incl. ICE immigration violator list | Customer-set, no vendor limit | In-car Fleet 3 (4K, 3 lanes), fixed Outpost, streetlight Lightpost | Fleet3 ALPR ≈$83/cam license; prior fixed $208/cam/mo |
| Rekor (OpenALPR) | Yes | Yes (make/model/color/body, partial-plate) | No | No (partner via SoundThinking) | No | Attribute search | Rekor Public Safety Network (opt-in, smaller) | CBP access per ACLU; ICE unclear | Configurable; on-prem possible | Software on any IP cam + Edge fixed/mobile | Scout from $12/cam/mo |
| Leonardo ELSAG | Yes | Plate-centric | **SignalTrace: tracks phone/watch Bluetooth/Wi-Fi emissions** | No | No | No | Agency-controlled (EOC); on-prem | NCIC/state hotlists standard | Agency-set | In-car (Plate Hunter), fixed, covert barrel/pole, radar trailers | Not public |
| Jenoptik | Yes | Vehicle class differentiation | No | No | No | Pattern analysis (TraffiData) | UK National ANPR Service ecosystem (state-run) | UK/CBP border projects | Agency/national policy (UK NAS) | Fixed VECTOR (3 lanes), mobile | Not public |
| Neology (PIPS) | Yes | AI classification (neoForce), incl. plateless | No | No | No | No | Agency-controlled | Tolling + enforcement; no ICE controversy | Agency-set (**BC: non-hit deleted end of shift**) | Fixed, in-car (PIPS: 50k systems, 100+ countries) | Not public |
| Perceptics | Yes (border-grade, driver imaging) | Border inspection focus | No | No | Handled CBP facial-pilot images | No | CBP/CBSA border infrastructure | Prime border LPR supplier CBP + CBSA | Government-set | Fixed border lanes | Not public |
| SoundThinking PlateRanger | Yes (powered by Rekor) | Yes (Rekor) | CrimeTracer person search (records) | Yes — ShotSpotter native in SafetySmart | No | Cross-incident vehicle analytics | SafetySmart integrations | No ALPR-ICE reporting found | Not published | Fixed + mobile | Not public |
| PlateSmart (independent) | Yes (software) | Plate + state + make + color; circling/loitering behavior | No | No | No | Attribute filter | VMS integrations (Milestone, Verint) | None found | Agency-set | Software on existing cams | Not public |

Grouping correction: PlateSmart is independent (Tampa) — not Motorola/L3Harris. Motorola owns Vigilant (via VaaS, Jan 2019) + DRN. L3Harris has no mainstream police ALPR line.

## 2. Key vendor details

### Flock Safety
- Vehicle Fingerprint; ~75,000 US cameras, 5,000+ agencies, 6,000+ communities (2026). Raven gunshot detection (claimed 90% acc, <45s; Oct 2025 added "human distress"/screaming detection); Condor video (30-day); Aerodome drones dispatched to LPR hits; Nova investigative platform; FlockOS.
- Claims no facial recognition. https://www.flocksafety.com/industries/hoas
- NCIC hotlists include ICE-populated Immigration Violator File → local Flock alerts can screen for ICE administrative warrants. https://www.eff.org/deeplinks/2026/06/are-your-local-police-using-flock-safety-alprs-scan-immigrants
- Retention 30 days default (MSA); paid 5-year SKU.
- TALON opt-in national lookup (700+ cities); private customers (HOAs, Lowe's, Home Depot, **Simon malls**) pipe data to police. https://www.forbes.com/sites/thomasbrewster/2024/05/06/simon-property-and-flock-safety-feed-ai-surveillance-feeds-to-the-cops/
- Controversies: ICE side-door searches (IL: reach into 5,000+ cameras; Dayton: 7,100 immigration searches violating policy); TX abortion search (83,000+ cameras); keyword blocks trivially circumventable ("hehehe" as search reason); ACLU: misrepresentations to city councils; 50+ security vulnerabilities, congressional inquiry (Krishnamoorthi/Garcia).
- Pricing ~$3,000/cam/yr incl. install/maintenance/hosting/cellular.

### Motorola (Vigilant + DRN)
- VehicleManager cloud analytics; L6Q portable reads at 100 mph. LEARN-NVLS: 500+ agencies, ~1.5B LE records + 5B+ commercial DRN scans (repo/fleet vehicles, ~500M reads/month). DRN markets risk scoring to insurers/lenders.
- ICE query access via Thomson Reuters West ($6.8M, 2017; CLEAR integration 2010–2022).
- Portfolio (not LPR product) includes BriefCam FR + Avigilon appearance search.
- NYPD retention: 5 years; indefinite permitted.

### Genetec AutoVu (Montreal)
- SharpZ3 in-car, SharpV fixed, Cloudrunner solar; ML Core: color/type/speed/direction, partial/no-plate search. No FR/people/audio marketed.
- Agencies control hotlists and sharing; customers "retain full ownership and control of their data"; **no vendor-run national pool** — the structural contrast with Flock.
- Cloudrunner hosted in Canada for Canadian customers. **Brampton ON: 200 AutoVu SharpV at intersections** (auto-theft focus): https://www.genetec.com/press-center/press-releases/2025/03/city-of-brampton-selects-genetec-solutions-to-enhance-public-safety-and-combat-vehicle-theft (note: user-provided figure was 50 — Genetec PR says 200; reconcile)
- panopti.ca shows Genetec as most common ALPR vendor in Canada.

### Axon (Fusus)
- Fleet 3 in-car: 4K ALPR across 3 lanes; claims 8.1B plates read via Fleet 3. 2025: fixed ALPR — Outpost + Lightpost (streetlight-mounted, w/ Ubicquia). Fusus (acq. Feb 2024): real-time crime center aggregating live video/sensors incl. community & private camera registries, any-vendor ALPR, CAD.
- AI Ethics Board (2019): committed not to develop face-matching. (User data: resumed evaluating FR 2025, Edmonton bodycam field tests — reconcile with this stance for the site.)
- NCIC hotlists incl. ICE immigration violator list; customer-set retention, no vendor limit.
- Axon–Flock partnership ended early 2025 → direct competitors; Axon is the beneficiary of Flock backlash (Denver, Longmont CO switches).

### Leonardo ELSAG
- Plate Hunter mobile/fixed/covert; radar/message-board trailers. **SignalTrace**: tracks Bluetooth/Wi-Fi emissions from phones/watches/vehicles alongside plate reads — the device-signal outlier, flagged by ACLU.

### Perceptics (border)
- Prime LPR supplier to US CBP land crossings; used by CBSA. **2019 breach**: copied CBP plate images + ~184,000 traveler face images to own network without authorization; hacked; data on dark web; CBP suspended then reinstated. CBSA investigated. https://www.cbc.ca/news/politics/cbsa-perceptics-licence-plate-breach-1.5172152

### SoundThinking PlateRanger
- Rekor-powered ALPR in SafetySmart platform w/ ShotSpotter — only native gunshot+ALPR combo. Company context: Chicago ended ~$49M ShotSpotter contract 2024; ~70% of covered residents Black or Latino.

## 3. Canadian deployments snapshot

| Agency | Vendor/system | Notes |
|---|---|---|
| Toronto Police | ALPR in new in-car camera system, full fleet ~560 vehicles (May 2024); hotlist from Ontario MTO, updated daily; reads 7d / hits 365d. In-car vendor likely **Axon Fleet** (medium confidence — confirm via procurement records) | https://www.tps.ca/use-technology/automatic-licence-plate-reader/ |
| OPP | ALPR + in-car cameras on all frontline vehicles (2023). Vendor not publicly named | https://globalnews.ca/news/9598098/ |
| BC (RCMP-run) | **Neology/PIPS** via Sigma Safety (exclusive BC LE provider). Daily hotlist from ICBC + **CPIC**; non-hit deleted end of shift | https://www2.gov.bc.ca/gov/content/justice/criminal-justice/policing-in-bc/road-safety-auto-crime/auto-licence-place-recognition |
| CBSA (border) | **Perceptics** readers at crossings | see 2019 breach |
| Brampton ON | **Genetec** — 200 AutoVu SharpV at intersections | Genetec PR Mar 2025 |
| Windsor PS / Essex OPP | Cruiser-mounted ALPR (~50 vehicles Essex County) | https://windsorpolice.ca/services/traffic/alpr |

## 4. Cross-cutting notes

- **NCIC/ICE structural issue**: any vendor syncing NCIC hotlists (Flock, Axon, Vigilant, ELSAG) implicitly ingests ICE's Immigration Violator File — ICE sole populator, includes administrative (non-judicial) warrants, renewable indefinitely.
- **Wrong-plate exemplar**: Aurora CO 2020 — Brittney Gilliam + four Black children held at gunpoint after ALPR matched her SUV plate to a stolen Montana **motorcycle**; $1.9M settlement. System-level (hotlist/verification) failure, not vendor-attributed.
- **Retention spectrum graphic**: BC non-hit end-of-shift → Peel 24h → Toronto 7d → Flock 30d default → NYPD/Vigilant 5yr → DRN commercial indefinite.
- Only Flock and SoundThinking couple ALPR with audio natively; no vendor markets gait analytics; ELSAG SignalTrace is the device-signal outlier; Motorola's broader portfolio is the only one with FR.
- **Private-to-police pipelines**: strongest at Flock (HOAs, retailers, malls) and Axon Fusus (camera registries); Vigilant/DRN is the commercial-collection outlier (repo fleets → police + insurers).

## Gaps to verify
- OPP hardware vendor; Toronto's exact in-car vendor (likely Axon Fleet 3 — procurement records).
- Brampton 50 vs 200 cameras (user data vs Genetec PR).
- Genetec/ELSAG/Jenoptik/Neology/Perceptics pricing; PlateRanger retention.
- Axon FR stance: 2019 commitment vs 2025 Edmonton bodycam FR testing (user-provided) — need primary source.
