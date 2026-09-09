# York Regional Police — CCTV + ALPR: the primary sources

Assembled 2026-09-09, prompted by YRP's clarification letter on FOI file
**26-1898**. Everything below is from YRP's own documents or its own data
portal. Analysis is marked as analysis.

Headline: **most of what our FOI asked for in items 1, 2 and 4 is already
public** — YRP publishes every active camera location as open data, the
board report that approved ALPR is online, and the "6% crime reduction"
figure traces to a specific board-report number (6.19%) built on 30 fewer
violent crimes. What is *not* public is the settings: plate-read retention,
audit practice, sharing state, and whether a PIA exists for ALPR.

## 1. The approval: YRPSB board report, June 25, 2025

The Regional Municipality of York Police Service Board, Public Board
Meeting, **June 25, 2025** — *Report of the Chief of Police: "Closed Circuit
Television Video (CCTV) Cameras Annual Report and Program Expansion"*, For
Decision, approved for submission by Chief Jim MacSween. 7 pages.
https://pub-yrpsb.escribemeetings.com/filestream.ashx?DocumentId=11119

Recommendation 2, verbatim: *"That the Board approve the expansion of the
CCTV program to include the integration of Automated Licence Plate
Recognition (ALPR) technology, in conjunction with the provincial stolen
vehicle hot list, to enhance the ability to identify, deter, and arrest
individuals involved in criminal activity."*

Also in the report:

- **ALPR goes on every camera.** YRP "partnered with **Axon Canada** to
  integrate the provincial stolen vehicle hot list with ALPR technology at
  both existing and new camera sites" — elsewhere, "at all current and newly
  proposed CCTV locations."
- **The pipeline.** A hot-list match "will alert the Real Time Operations
  Centre (RTOC) where confirmation of stolen vehicle will be verified
  through normal procedures and a response will be initiated."
- **22 new locations** (Appendix A, not in the 7-page body) "identified
  through our BI analysis as areas experiencing violent crime."
- **Money.** 2024 CCTV spending $533,610 — $333,610 Board, $200,000 Ontario
  CCTV Grant. 2025 capital budget: $400,000 for camera systems and
  equipment. **In April 2025 Ontario agreed to contribute $255,000 through
  the Ontario CCTV Grant** — a one-year term, contingent, with spending to
  be completed by a November 1, 2025 deadline.
- **Program history.** First taken to the Police Services Board
  **November 22, 2023**; media release and website page with FAQs and
  location information **February 29, 2024**; signage at each site;
  information cards in English, Simplified and Traditional Chinese from the
  week of March 4, 2024.
- **Privacy posture.** Compliance with MFIPPA and IPC guidelines is
  asserted, listing "lawful collection, notice of collection, lawful use and
  disclosure, access, retention, security, privacy impact assessments,
  public consultation, internal policies and procedures, staff training, and
  regular audits." The report **does not state that a PIA was completed for
  the ALPR integration**, and names no retention period at all.

## 2. The "6% crime reduction" claim, traced

**What was said in public:** *"compared to 2024, areas within 1 km of a CCTV
camera saw more than a six per cent reduction in crime"* — then-Deputy Chief
Paulo Da Silva (sworn in as **Chief** in June 2026), reported by David Yin,
Local Journalism Initiative, **Markham Review, November 16, 2025**,
covering the **September 22, 2025** announcement at which Aurora–Newmarket
MPP Dawn Gallagher Murphy presented the $255,000.
https://markhamreview.com/york-regional-police-receives-255000-to-expand-camera-surveillance-program/
Syndicated: https://www.pentictonherald.ca/spare_news/article_23ccd01d-9403-560f-ae37-e8e60f8ddedc.html

**Where the number comes from:** the June 25, 2025 board report, section 4:

> During the analysis period, there were **455** violent crimes recorded
> within a 1-kilometre radius of CCTV-equipped intersections, representing a
> **6.19% decrease** compared to **485** incidents during the same period in
> 2024.

Per-location results, 16 intersections, May 1 2024 – May 1 2025:

| Down | Up |
|---|---|
| Woodbine Ave & Hwy 7, Markham −46.4% | Yonge St & Wellington St E, Aurora +37.5% |
| Warden Ave & Steeles Ave E, Markham −23.8% | Hwy 27 & Oliver Emmerson Ave, King +20% |
| Jane St / Hwy 7, Vaughan −21.9% | Norman Bethune Ave / East Beaver Creek, Richmond Hill +13% |
| Wilkie Ave & Ballard Dr, King −40% | Warden Ave & Hwy 7, Markham +11.1% |
| Yonge St & Crosby Ave, Richmond Hill −10.7% | Yonge St & Davis Dr, Newmarket +2.4% |
| Yonge St & Carrville Rd, Richmond Hill −9.5% | |
| Norwood Ave & Jane St, Vaughan −6.6% | |
| Jane St & Avro Rd, Vaughan −3.2% | |
| Hwy 7 & East Beaver Creek, Richmond Hill −3% | |

**Internal inconsistency in the report itself:** the summary on page 2 gives
Woodbine & Hwy 7 as **46.93%**; the analysis on page 5 gives **46.4%**. Same
document, same intersection.

**ANALYSIS (ours, not YRP's).** The entire claim is **30 fewer violent
crimes** — 485 → 455 — spread across 16 intersections over a year. The
report presents no control area, no significance testing, and no baseline
trend for the Region as a whole, so a regional decline in violent crime
would produce the same number with no cameras involved. Section 2(b) of the
report commits the annual evaluation to "an evaluation of adjacent areas to
CCTV locations" — the displacement question — but the published text reports
no result from it. Five of 16 sites went up, one by 37.5%. This is the
analysis our FOI item 4 now asks for by name.

## 3. YRP publishes every camera location as open data

The CCTV page links to the Community Safety Data Portal:
https://community-safety-portal-datayrp.hub.arcgis.com/pages/cctv

Behind it is a public ArcGIS feature service, no key required:
`https://services8.arcgis.com/lYI034SQcOoxRCR7/arcgis/rest/services/YRP_CCTV_Cameras/FeatureServer/0`
Fields: Intersection, ID, Municipality, Notes, Sector, Status, ActiveDate,
RetireDate, plus point geometry.

Queried 2026-09-09: **58 features, all Status = Active**, none retired.

| Municipality | Sites |
|---|---|
| Richmond Hill | 18 |
| Vaughan | 17 |
| Newmarket | 8 |
| Markham | 7 |
| King | 3 |
| Georgina | 3 |
| Aurora | 2 |

Activation dates run 2024-05-01 (the original 11 of the first 16) through
2026-08-13. Four Vaughan-area sites activated 2026-08-04 are flagged
`Notes = "Temporary Location"` — Hwy 7 & Pine Valley Dr, Weston Rd &
Langstaff Rd, Clark Ave & York Hill Blvd, Bathurst St & Rutherford Rd.

**58 is well past the 38** (16 existing + 22 grant-funded) reported in
November 2025 — the program kept growing after the grant. Data-quality
notes: the ID `CCTV42-08` appears twice on different corners; `CCTV21-11` is
coded to the Richmond Hill sector but labelled Vaughan; one intersection is
spelled "David Dr & Longford Dr" (Davis Dr).

**This is the authoritative source for York camera locations** and should
replace OSM-derived York points on our map — an operator-published dataset,
which is exactly the provenance standard the README says we are not yet at.
Not yet wired into the pipeline.

## 4. Retention: what YRP publishes

YRP's CCTV Community Cameras page:
https://www.yrp.ca/en/crime-prevention/cctv-community-cameras.asp

> All video footage is retained for roughly 72 hours, unless records are
> sought to support an investigation.

That is **video**. The page says cameras are "equipped with technology that
automatically identifies license plates" but states **no retention period
for plate reads, hits, or audit logs** — the gap the FOI is for. Compare:
Peel 24 hours / 30 days, Toronto 7 days / 365 days.

## 5. Vendor

Axon: "Axon Canada" in the board report; **Axon Fusus** named in YRP's own
community blog, "YRP Expands CCTV Program and Enhances Public Safety
Measures", **May 5, 2026** —
https://www.yrp.ca/community-blog/yrp-expands-cctv-program-and-enhances-public-safety-measures
— "cameras are equipped with Axon Fusus Automated Licence Plate Recognition
(ALPR) technology, which helps notify frontline officers if a stolen vehicle
enters the region." Same platform as Toronto.

## 6. What is left for the FOI to answer

Public already: locations, vendor, board approval, funding, video retention,
the crime-reduction claim's headline number.

Still unpublished, and now the whole point of file 26-1898:
1. Which published sites have ALPR enabled, and whether any ALPR camera is
   off the public map.
2. Configured retention for non-hit reads, hits and ALPR audit logs, and who
   can change those values.
3. The hot-list agreement, and whether cross-agency ALPR search is enabled
   in the Axon platform.
4. The BI Unit's underlying analysis and the adjacent-area (displacement)
   evaluation.
5. Whether a PIA exists for the ALPR integration.
6. The Ontario CCTV Grant agreement terms and reporting obligations.
7. Aggregate misuse/audit statistics and the ALPR audit policy.

## 7. How we had this for weeks without knowing

Uncomfortable, and worth writing down precisely.

We did not miss the cameras. On 2026-09-09, before any of this, our map already
held **50 points tagged `operator=York Regional Police`**, and **46 of the 58
sites YRP publishes were already among them** — every one within 33 metres of
the published coordinate. What we missed was that they were *documented*. We
rendered them as crowd pins with the site's standard hedge ("somebody mapped
this, which is not that anyone verified it") while the force's own register of
the same cameras sat in the open.

The citation was inside the data we had already ingested. Querying the OSM
API for those 50 nodes: they arrived in **12 changesets**, and nine of them —
44 nodes, all on **2026-06-11**, by the mapper `ResistanceIsLiberty` — carry
this changeset tag:

    source = https://community-safety-portal-datayrp.hub.arcgis.com/pages/cctv
    source = https://community-safety-portal-datayrp.hub.arcgis.com/pages/cctv;https://www.yrp.ca/explore/our-work/cctv-program

with comments like "Added York Regional Police ALPR cameras in Vaughan."
Somebody found the portal in June, mapped it into OSM, and *wrote down where it
came from*. We consumed the nodes and threw the receipt away.

Three specific causes:

1. **Our Overpass query asks for `out body`** — node tags only. `source` on
   these edits lives on the *changeset*, one level up, which `out meta` and a
   changeset lookup would have surfaced. The provenance was one API call away
   the whole time.
2. **The pipeline had exactly one lane: OSM.** Nothing in it, and nothing in
   docs/location-discovery.md, asked the obvious question — *does the operator
   publish this itself?* The leads funnel listed procurement portals, board
   agendas, WiGLE and Mapillary. Not open-data portals, which is where a police
   service that wants credit for transparency puts things.
3. **Our York research came from news, not from York.** The seed file was
   media claims (the $255K, the 6% line); the FOI research pass read
   yrp.ca/en/about/freedom-of-information.asp and stopped. Nobody opened the
   force's own CCTV page, which links the portal in one click and states the
   72-hour video retention in plain text.

What changed as a result:

- `scripts/fetch-authoritative.mjs` + `data/authoritative/` — operator-published
  lists are a first-class source now, refreshed by `npm run authoritative`.
- `scripts/merge-authoritative.mjs` — the operator's record takes the point,
  keeps the crowd node as `osmId`, and flags crowd pins the operator's own
  complete list does not contain. Five York pins are in that state: one in
  Vaughan (Axis hardware, 43.8492/-79.5368) and four around East Gwillimbury
  (44.20–44.22 / -79.46), a municipality with zero published sites. Two of
  those four are a metre apart and are probably one camera mapped twice.
- Every camera on the map now carries `provenance`, and the map draws the
  difference: white ring = the force publishes this one itself.

The open follow-up: **mine OSM changeset `source` tags across the whole
dataset.** If one mapper cited an operator portal for York, others have done
the same for other forces, and those citations are sitting in data we already
pull.
