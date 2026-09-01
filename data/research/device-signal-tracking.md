# Device-signal tracking bundled with ALPR ("the antenna problem")

Research agent report, 2026-09-01. Mike's framing: "'it's just plates' goes
out the window." Three questions answered with sources.

## Q1. Who has TALKED about it (marketed device-signal capture)

### Jenoptik — TraffiCatch (the earliest ALPR+signal product)
- Made by **Jenoptik** (major ALPR vendor — Vector cameras, UK ANPR).
  Coverage: **NOTUS** (Byron Tau, Apr 30 2024) and **EFF** (May 2024) — NOT
  404 Media (they covered SignalTrace in 2026).
- Jenoptik marketing: "ability to detect in-vehicle wireless signals [and]
  merge such signals with the vehicle license plate."
- Detects Bluetooth Device Addresses from smartphones, smartwatches,
  earbuds, car entertainment systems, combined with ALPR.
- EFF (Nov 2025): at least two border jurisdictions equipped Jenoptik
  Vector ALPR trailers with TraffiCatch.
- NOTUS: https://www.notus.org/technology/war-zone-surveillance-border-us
- EFF: https://www.eff.org/deeplinks/2024/05/add-bluetooth-long-list-border-surveillance-technologies
- EFF border ID guide: https://www.eff.org/deeplinks/2025/11/how-identify-automated-license-plate-readers-us-mexico-border

### Leonardo ELSAG — EOC Plus (2024) → SignalTrace (2026)
- First marketed as **ELSAG EOC Plus** — Forbes (Brewster), May 14 2024:
  claims to detect phones down to model, pet microchips, Wi-Fi/BT devices,
  fitness trackers, in-car infotainment, **tire pressure sensors**, RFID
  library books. Leonardo then had **no paying customers** (one tester).
  https://www.forbes.com/sites/thomasbrewster/2024/05/14/police-car-surveillance-tech-uncovers-phones-pet-trackers-and-library-books/
- Rebranded **SignalTrace**; 404 Media June 2026 ("This Company Will Add
  Phone, AirPod, and Smartwatch Trackers to License Plate Readers"):
  https://www.404media.co/this-company-will-add-phone-airpod-and-smartwatch-trackers-to-license-plate-readers/
- Formal announcement Aug 4 2026; Leonardo patents granted 2024; still no
  confirmed paying customers.
  https://www.biometricupdate.com/202608/signaltrace-pairs-wireless-device-signals-with-license-plate-records
- Leonardo's own page: "identify groups of consumer electronic devices that
  routinely travel together," "electronic fingerprints," works "with or
  without license plate readers," "does not decrypt or read the contents":
  https://www.leonardocompany-us.com/lpr/elsag-signaltrace
- ACLU NorCal (Aug 2026): "License Plate Readers Were Already a Privacy
  Nightmare. Then Came SignalTrace."
  https://www.aclunorcal.org/news/license-plate-readers-were-already-a-privacy-nightmare-then-came-signaltrace/
- Academic (Bennett, The Conversation, Aug 2026): police could "begin with
  a nameless pattern... and only then attach identities."
  https://theconversation.com/new-tech-adds-phone-tracking-to-license-plate-readers-associating-devices-with-identifiable-cars-288876
- **Skeptical technical analysis** (The Drive + Ryan O'Horo): claims outrun
  visible hardware — two panel antennas can "likely only collect Wi-Fi,
  Bluetooth, and certain 915MHz RFID"; standard 315/433MHz TPMS likely out
  of reach of visible deployments.
  https://www.thedrive.com/news/license-plate-camera-companies-want-you-to-believe-they-can-track-everything-an-expert-explains-why-they-cant
  https://www.ryanohoro.com/post/thinking-critically-about-signaltrace

### Flock, Axon, Motorola, Genetec
- **No evidence** any of them market device-signal capture. Flock's radios
  transmit (telemetry, setup Wi-Fi) rather than sniff (per
  https://deflockilm.org/what-flock-cameras-can-actually-do/). The viral
  "Flock now tracks your phone" framing is WRONG — SignalTrace is
  Leonardo's. Keep the site accurate on this.

## Q2. Who actually DOES it (deployments)

### ALPR + signal-sniffing proper
- **Webb County, TX** (Laredo): TraffiCatch since **≥2019** (GovSpend
  procurement), bought with DHS **Operation Stonegarden** funds. Sheriff's
  captain described it as restricted pilot, no federal sharing.
- **Val Verde County, TX** (Del Rio): approved 2022, funded via Texas
  **Operation Lone Star**.
- **SignalTrace: no confirmed customers.** O'Horo spotted possible
  (unconfirmed) sensor installs in Oxon Hill and Solomons, MD.

### The adjacent industry — a decade of MAC tracking as "traffic analytics"
- **BlueTOAD** (TrafficCast → Iteris 2020): 1,000 units by 2012, **3,000+
  by 2014**; FDOT approved-products list; FL/CA/GA deployments.
  http://www.fdot.gov/statistics/symposium/2014/BlueTOAD.pdf
- **Acyclica** (→ FLIR → Teledyne): RoadTrend sensors in traffic cabinets
  vacuuming phone MACs; **Seattle, LA, Denver**. Privacy advocates'
  documented fear was law-enforcement handoff.
  https://www.seattletimes.com/seattle-news/times-watchdog/seattles-surveillance-contractor-has-history-of-illegal-sales-bribery-worrying-privacy-advocates/
- **Iteris Vantage Velocity**: "each reader sensing a device's unique MAC
  address as they pass," sold to DOTs continent-wide.
  https://www.iteris.com/system/files/content/resource/2017-07/Velocity_Rev2_Jun2017.pdf
- **Miovision**: roadside Wi-Fi MAC collection for travel time (own blog).
  https://miovision.com/blog/travel-time-match-rates-matter/
- **Police-handoff precedent — San Diego CityIQ streetlights** (GE): ~3,300
  nodes with cameras + BT/Wi-Fi radios sold as smart-city sensors; SDPD got
  direct access (2018), used footage 392+ times incl. minor crimes under
  self-set policies; mayor ordered shutdown 2020.
  https://spectrum.ieee.org/cops-smart-street-lights
- NOTE: could not verify any Forbes/ATF story about Vantage Velocity in an
  investigation — do not use without a primary source.

## Q3. Who has the HARDWARE today (radios physically present)

| Camera | Radios confirmed | Source |
|---|---|---|
| **Flock Falcon/Sparrow** | **Wi-Fi 802.11a/b/g/n/ac + Bluetooth 4.2 LE** (LiteOn WCBN3510A, FCC ID WCBN3510A) + LTE + GPS. Active "Flock-XXXX" hotspot (default pwd "security"); battery packs advertise over BT; **18,000+ identifiable on WiGLE**; GainSec demonstrated wireless RCE over Wi-Fi; runs Android Things 8.1 | CEHRP teardown https://www.cehrp.org/dissection-of-flock-safety-camera/ ; O'Horo https://www.ryanohoro.com/post/spotting-flock-safety-s-falcon-cameras ; GainSec https://gainsec.com/2025/06/19/grounded-flight-device-2-root-shell-on-flock-safetys-falcon-sparrow-automated-license-plate-reader/ |
| **Motorola L6Q** | LTE + **Wi-Fi + Bluetooth** + GPS (setup via phone app) | https://www.motorolasolutions.com/en_us/video-security-access-control/license-plate-recognition-camera-systems/l6q-quick-deploy-lpr/l6q-details.html |
| **Axon Outpost** | LTE + **Bluetooth** (pairing via Outpost Manager app) | https://apps.apple.com/us/app/axon-outpost-manager/id6746767495 |
| **Genetec Cloudrunner CR-H2** | LTE Cat-4 + GPS only — **no Wi-Fi, no BT** | Verizon device listing https://opendevelopment.verizonwireless.com/device-showcase/device/34928 |
| **Genetec SharpV** | PoE/Ethernet; no radios identified (not confirmed absent) | datasheet unavailable |

The point: on Flock, Motorola, and Axon hardware, the sniffing radio is
**already installed and powered** — device-signal capture is a software
update plus a legal decision. Genetec's fixed hardware is the outlier
(again, in the privacy-protective direction).

## Technical caveats (be honest on the site)

- **Wi-Fi MAC randomization** blunts phone tracking, but is unevenly
  implemented and defeatable (Martin et al. 2017 — timing-based probe
  fingerprinting ~99.9% effective vs vulnerable devices):
  https://arxiv.org/pdf/1703.02874
- **BLE**: address-carryover attacks track across randomization intervals;
  accessories (headphones, wearables, car head units) randomize poorly or
  not at all. A *combination* of devices — "an iPhone, an Audi radio, Bose
  headphones, a Garmin watch" — forms a unique signature even when each
  randomizes (O'Horo).
- **TPMS**: every tire sensor broadcasts a static unique ID, unencrypted
  (Rouf et al., USENIX Security 2010:
  https://www.usenix.org/conference/usenixsecurity10/security-and-privacy-vulnerabilities-car-wireless-networks-tire-pressure );
  granted US patent 9349287 covers traffic monitoring via TPMS IDs. But
  standard 315/433MHz TPMS likely needs antennas current SignalTrace
  installs lack; BLE-based TPMS (some Teslas, aftermarket) is realistic.
- **Physics**: single-point roadside capture struggles with channel
  hopping, ~1s transit windows, and blending across adjacent vehicles;
  useful correlation needs multiple sites/repeat passes (commute
  corridors) — which is exactly what a camera *network* provides.

## Site accuracy flags
1. Attribute TraffiCatch to **Jenoptik** (NOTUS/EFF coverage), not 404 Media.
2. Never say "Flock tracks your phone" — SignalTrace is Leonardo's; Flock's
   radios are provisioning/telemetry. The honest claim is hardware
   capability, not current behaviour.
3. The Iteris/ATF investigation anecdote is unverified — do not use.
4. Irony worth a line: Flock's own cameras are findable on WiGLE by their
   Wi-Fi emissions — the surveillance network is itself trackable by the
   method it could someday use on drivers.
