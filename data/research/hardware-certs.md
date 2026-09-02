# ALPR hardware certification research (FCC/ISED)

Agent report, 2026-09-01. Cluster: Axis / Dahua / Verkada / Jenoptik
(delivered; other clusters — Flock, Genetec/Axon, Motorola/ELSAG/Neology —
partially covered by earlier device-signal research in
device-signal-tracking.md). Confidence flags: [CERT] = certification filing,
[DATASHEET] = vendor doc, [INFERENCE] = reasoned from absence.

## Meta-finding

Every dedicated fixed ALPR camera in this cluster — Axis P1445-LE-3 and
Q1700-LE, Dahua ITC415/ITC215, Verkada CB62-TE, Jenoptik VECTOR — is
**wired-only with no transmit radios**, authorized under FCC Part 15
Subpart B (unintentional radiator, Supplier's Declaration of Conformity).
**No FCC ID exists for them by design** — the absence of a grant is itself
the evidence of no radio. Contrast: Flock/Motorola/Axon units carry
intentional-radiator grants (see device-signal-tracking.md).

## Axis Communications
- **P1445-LE-3** (License Plate Verifier Kit): PoE 802.3af/at, 1080p,
  OptimizedIR 850nm, 2.8–8.5mm varifocal, single-lane ≤30 km/h, IP66/67.
  Approvals: FCC 15B Class A + ICES-003 only. No radios.
  https://www.axis.com/dam/public/49/8c/0b/datasheet-axis-p1445-le-3-license-plate-verifier-kit-en-US-443262.pdf
- **Q1700-LE**: highway-grade (130 km/h edge / 250 km/h with server), 8x
  zoom 18–137mm, PoE or 20–28VDC. Same 15B-only approvals. Discontinued →
  Q1800-LE. No radios.

## Dahua
- **ITC415 (DHI-ITC415-PW6M-IZ-BH/-GN)**: 4MP, 2.7–12mm motorized, 6 IR
  illuminators, GbE RJ-45 + 2x RS-485 + RS-232 + alarm I/O (barrier
  control), PoE+/12VDC/24VAC, <20W, IP67, capture 3–6m ≤30 km/h. Cert row:
  "CE, FCC / RoHS" only — no wireless anywhere. No FCC ID found for the
  ITC line (15B SDoC). Datasheet also claims recognition of "features of
  driver and front-seat passenger."
- **ITC215**: 2MP sibling, same wired-only profile.

## Verkada
- "LPC" series **does not exist** — LPR runs on telephoto Bullets:
  CB61-TE (gen-1, discontinued), CB52-TE (5MP) / CB62-TE (4K) current.
- **CB62-TE**: 4K, Ambarella CV22S edge LPR up to 80 mph / 3 lanes,
  8–20mm, IR 50m, PoE+ (RJ-45 10/100 only). No radios; not in FCC grantee
  2AWUU's 31 grants → 15B SDoC. https://docs.verkada.com/docs/video-security-cb62-te-datasheet.pdf
- **CB61-TE (gen-1) — THE EXCEPTION**: contains Wi-Fi hardware, **disabled
  by default; enabling requires org-level action via Verkada Support**;
  camera must first onboard over Ethernet. Verkada help doc lists Wi-Fi
  enable for "CD61, CD61-E, CB61-E, CB61-TE, CM61, D50W."
  https://help.verkada.com/verkada-cameras/configuration/camera-network-settings/enable-wi-fi-on-select-verkada-cameras
  → The "dormant radio, vendor-enabled" pattern in the wild.
- **Outdoor Remote Deployment Camera — FCC ID 2AWUU68B66001 [CERT],
  granted 2026-01-12**: BLE (2402–2480 MHz DTS) + LTE + IR modules per
  filing schematics. Verkada's only FCC-certified camera; their direction
  for off-grid (ALPR-style solar pole) deployments. https://fccid.io/2AWUU68B66001

## Jenoptik
- Lineup: VECTOR/VECTOR2/VECTOR3 (fixed ALPR), VECTOR P2P (average speed),
  VECTOR SR (speed/red-light + ALPR), GardoVia. ("P2X" not a real model.)
- **VECTOR camera**: dual 3.2MP (mono ANPR + colour context), integrated
  IR, built-in **GPS (receive-only — no FCC ID needed)**, compass,
  accelerometer; wired LAN backhaul; trailer variant 2x330W solar. No
  transmit radios in the camera.
- **The transmitter is the companion radar**: 24 GHz K-band 3D tracking
  radar, FCC grantee **QJJ** (JENOPTIK Robot GmbH) — QJJ-590113 (2024),
  QJJ-590112 (2014), QJJ-590106/104 (2010). https://fccid.io/QJJ
- Border deployments pair VECTOR trailers with TraffiCatch (see
  device-signal-tracking.md).

## ISED caveat
The ISED Radio Equipment List (sms-sgs.ic.gc.ca) is a POST-form app not
reachable by static fetch — Canadian cert numbers unconfirmed. By design,
15B wired cameras have no REL entry; Jenoptik's 24 GHz radar would need an
ISED cert for Canadian enforcement use (not verified).

## Site implications
1. Radio presence cleaves the market: **networked-surveillance vendors
   (Flock, Motorola L6Q, Axon) ship transmit radios; traditional fixed-
   camera vendors (Axis, Dahua, Verkada current, Genetec SharpV, Jenoptik
   camera) are wired-silent.** The sniff-capability worry concentrates
   exactly where the cross-agency-network worry already lives.
2. Verkada CB61-TE documents the "dormant radio a vendor can switch on"
   pattern as fact, not hypothetical.
3. "No FCC ID" is not "unverified" — for 15B devices it's the proof.

## Flock Safety cluster (second surviving agent, same date)

- **Flock has no device-level certifications anywhere.** FCC grantee code
  2BKG8 (Flock Group, registered Aug 2024): ZERO applications filed.
  ISED Radio Equipment List live query for "Flock": no entries. Every
  device ships on third-party module certs. https://fccid.io/2BKG8
- **Falcon V1**: NimbeLink/Sierra HL7648 LTE (FCC N7NHL7648) + LiteOn
  WCBN3510A Wi-Fi/BT (FCC PPQ-WCBN3510A; ISED 4491A-WCBN3510A) + Taoglas
  GPS; solar + 205Wh Li-ion; Lantronix Snapdragon SOM; microphones present.
- **Falcon V2 (current)**: Sierra RC7611 LTE Cat 4 (FCC N7NRC76B; ISED
  2417C-RC76B; Aug 2026 grant update adds satellite "supplemental coverage
  from space") + same LiteOn Wi-Fi/BT; Android Things 8.1 on Open-Q 624A.
  Generations distinguishable by modem FCC ID on the label.
- **"Falcon V3": no cert trail exists** — treat as V2 platform.
- **Unlabeled radar**: reports (footnote4a.org + vuln assessments) that
  newer Falcons carry an external radar module with NO FCC ID label and no
  filing — potential Part 15 labeling gap. [reported, not cert-verified]
- **Sparrow**: same platform/BOM as Falcon (GainSec treats as one family).
- **Condor PTZ**: only Flock model with no verifiable radio BOM; LTE per
  vendor; ~60 Condors found streaming openly (Jan 2026).
- **Raven**: not a camera — acoustic sensor. ESP32-WROOM-32D (FCC
  2AC7Z-ESPWROOM32D): Wi-Fi 2.4GHz + BT/BLE, BLE-beaconing
  (fingerprintable), LTE fallback, Syntiant NDP120 ML audio processor,
  no secure boot / no flash encryption.
- Canadian angle: module-level ISED certs (4491A-, 2417C-) likely cover
  legality, but Flock-the-company has certified nothing in Canada — of a
  piece with zero Canadian police contracts.

## Genetec / Axon cluster (third surviving agent, same date)

### Structural findings [CERT]
- **Genetec holds zero radio certifications under its own name**: FCC OET
  applicant search "genetec" → no applications; ISED REL company search →
  no results (both queried directly). LTE products integrate pre-certified
  third-party modules; no-radio variants are Part 15B/ICES-003 only.
- **Axon**: FCC grantee X4G; ISED company number 8803A with 37 REL entries.

### Genetec models
- **SharpV G3**: optional LTE Cat-4 (PTCRB; AT&T/Verizon/FirstNet B14) +
  multi-GNSS; NO Wi-Fi/BT. ALPR sensor 1920x1200@30 mono global shutter +
  colour context; pulsed LED illuminator (940/850/740/590nm), 0-lux;
  PoE++ 802.3bt or 24VDC; IP66/67. Datasheet + Nemko cert summary.
- **SharpZ3 in-car**: NO radios of its own — Part 15B only; optional
  GNSS+IMU expansion (receive-only); backhaul via vehicle LTE router;
  1456x1088 sensors.
- **Cloudrunner CR-H2**: LTE Cat-4 (B2/4/5/13/66 + B14) + GNSS, no
  Wi-Fi/BT [Verizon ODI]; module identity not publicly disclosed
  (Telit/Quectel-class [INFERENCE]); solar + LiFePO4; straps to poles.

### Axon models
- **Outpost (AX1054)**: FCC **X4GS06009** granted 2025-12-10; ISED
  **8803A-S06009 approved 2026-01-29** — LTE 9 bands (incl. FirstNet
  B14) + Wi-Fi 2.4/5GHz + BLE, one cert for the whole unit. Solar/battery
  (~3 days without sun), 12-24VDC, ~sealed IP66, pole/building/trailer/
  vehicle/tree mounts. Imaging specs not published [gap].
  **Canadian significance: Outpost is ISED-certified — Axon's fixed ALPR
  is regulatory-ready for Canada as of Jan 2026.**
- **Lightpost**: no Axon FCC filing — radios+power from partner
  Ubicquia's streetlight hub (grantee 2AECK); camera is an **Axis
  Q1800-LE** (1080p WDR, ~155 mph capture, ~100m daylight).
- **Fleet 3** (Toronto-relevant in-car): dual-view camera X4GS00947C
  (Wi-Fi+BT), Fleet Hub X4GS01405/B (Wi-Fi+BLE, NO LTE), 900MHz FHSS
  wireless mic X4GS01351, charging base X4GS01358; ISED entries
  8803A-S01405/B, -S01351, -S01358. LTE via separate Cradlepoint IBR900.
  ALPR lens: 4K sensor, 60° FoV; recordings up to 1080p.
- Pattern corroboration: Axon separately certifies LTE modules for body
  cams (8803A-AB7610 Sierra WP7610/Body 3; 8803A-AB065 Quectel/Body 4).

### Gaps (not findings)
- Outpost imaging resolution/IR; exact LTE module inside SharpV-LTE and
  CR-H2; ISED REL entry for Fleet 3 dual-view camera S00947C.

## Motorola-Vigilant / ELSAG / Neology cluster (fourth agent, same date)

### Structural finding [CERT]
Almost no ALPR camera in this group carries its own FCC/ISED cert. Pattern:
(a) wired PoE cameras with no radios (ReaperHD, ELSAG cameras); (b) hosts
with pre-certified modules needing no host cert (L6Q — Part 15 SDoC per
manual); (c) cellular in a separate COTS router box (ELSAG Street Sentry).
Only two vendor radio certs exist across all three: ELSAG VTFADM3 (2009)
and Neology 2AKNFP500FAW (2021).

### Motorola / Vigilant
- **L6Q**: LTE (microSIM) + 802.11ac + BT5 LE + **embedded radar trigger**
  (to 100 mph; frequency undisclosed); 2.1MP starlight, 850nm pulsed IR;
  solar 45W/12Ah or 12VDC/120VAC; ~20,000 scans per charge; IP67. No host
  FCC ID [CERT: no L6Q or Motorola LPR filing exists].
- **ReaperHD**: zero radios — PoE+ only; dual-lens IR+colour, 60 img/s,
  capture to 150 mph; GPS antenna connects to the in-car VLP processor,
  not the camera. Vigilant Solutions never held any FCC authorization.

### Leonardo ELSAG
- **Only FCC cert in company history: VTFADM3** — 2009, 802.11b/g Wi-Fi AP
  in the ADM3 trunk processor (grantee "Remington Elsag"). Cameras
  radio-free (1280x1024, IR, reads to 150 mph closing).
- **Street Sentry**: solar pole unit; "cellular connectivity in a
  weatherproof utility box" = separate COTS router with its own cert.
- **Covert line** (own catalog): pole cameras disguised as weathered
  utility boxes, toolboxes, cargo carriers; radar/message-board trailers.
- **SignalTrace/EOC Plus**: receive-only — "captures device frequencies
  emitted into the air": phones, BT wearables, RFID tags/key fobs,
  tire-pressure sensors, infotainment/hotspots. As a passive receiver it
  needs NO transmitter authorization → no filing exists → **the
  device-signal harvester is legally invisible to radio certification.**

### Neology
- **neoForce**: integrated 4G/5G + GPS per vendor page; PoE; 4-lane edge
  AI. No own FCC/ISED cert (module-based) [CERT-negative].
- **P500 IRIS (P520/P525)**: FCC **2AKNFP500FAW** (granted 2021-05-05) —
  variant with internal 4G modem + Wi-Fi ("configure from the street") +
  optional GPS; 5MP IR + 5MP colour, motorized 12–50mm, 28-LED pulsed
  illuminator, 48VDC, IP67.
- **ISED Canada: Neology's only listed products are 3 RFID toll readers**
  (company 23567) — no LPR camera. BC's provincial ALPR camera vendor has
  no LPR camera in Canada's radio registry; connectivity rides module
  certs.
- Trivia [CERT]: the only "license plate"-described radio device in
  Canada's REL is a consumer backup camera (Winplus).

### Cluster-complete meta-conclusions (all four clusters now in)
1. Radio-stack vendors: **Flock, Axon Outpost, Motorola L6Q, Neology
   P500-FAW variant** (LTE+Wi-Fi±BT). Wired-silent: **Genetec, Axis,
   Dahua, Verkada current, Jenoptik camera, ELSAG cameras, ReaperHD**.
2. Certification is a weak lens for the scariest capability: passive
   receivers (SignalTrace) and receive-only GPS need no cert at all —
   absence of filings ≠ absence of capability for RECEIVERS, while for
   transmitters absence IS evidence. State this precisely on the site.
3. Canada's radio registry contains almost none of this equipment — 
   module-level certs make whole product lines invisible to ISED search.
