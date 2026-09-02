# The AI/software layer — what the systems do with the reads

Compiled 2026-09-01. The cameras are collection; these platforms are
inference. Facts below are sourced; analysis is marked as analysis and
extrapolates ONLY from vendor-documented capabilities.

## Documented analytical features (the inference products)

### Flock — FlockOS / TALON / Convoy / Multi-Geo / Nova / Insights
- **Convoy Analysis**: enter a plate → find vehicles that frequently
  travel with it; flags vehicles as potential associates even if they
  merely share a commute. Sources: https://www.maryvilleprivacy.org/maryville-residents-for-privacy/flocks-multi-geo-and-convoy-tools/ ;
  https://cdt.org/insights/ai-in-policing-automatic-license-plate-readers/
- **Abuse case on record**: Grand Prairie TX PD searched a slur six times
  using the Convoy feature — targeting a traveling community with no
  specified crime. https://www.eff.org/deeplinks/2025/12/effs-investigations-expose-flock-safetys-surveillance-abuses-2025-review
- **Multi-Geo Search**: follow vehicles between cities/states; case
  summaries describe building "patterns of life." (Maryville doc above.)
- **TALON**: cross-agency national lookup, ~5,000 agencies (see
  vendor-capabilities.md).
- **Nova**: "jump from LPR to person" via data brokers/breach data (404
  Media; see news-sweep). Early access with agencies.
- **Drone dispatch**: Aerodome drones auto-dispatched to LPR hits
  (documented product line).
- **Audit logs**: per-search reason logging — the mechanism that exposed
  both the abortion search and the Kansas stalking chief; also the
  mechanism with trivially fake reasons ("hehehe", "missing child").

### Motorola Vigilant — LEARN (PlateSearch) + DRN commercial pool
- **Stakeout**: "who was at a political rally, at an abortion clinic, or
  at a gay bar" — ACLU's characterization from NYPD records.
  https://www.aclu.org/news/privacy-technology/documents-uncover-nypds-vast-license-plate-reader-database
- **Associate Analysis**: flags "possible associates" of a target —
  family members, friends, lovers get swept in (ACLU, same source).
- **Locate Analysis**: "most likely and least likely location(s) to
  locate your suspect vehicle" — predictive location from historical
  reads. Vendor materials: https://www.ra-comm.com/vigilant-solutions/learn.htm ;
  user guide: https://learnfl.vigilantsolutions.com/learn/Vigilant_PlateSearch_User_Guide.pdf
- **DRN**: 5B+ commercial scans from repo fleets in the same ecosystem;
  sold to insurers/lenders too.
- Portfolio adjacency: BriefCam (video synopsis + FR), Avigilon
  appearance search.

### Axon — Fusus real-time crime centre + Evidence.com
- Fusus ingests live video from community/private camera registries,
  any-vendor ALPR, CAD, drones — cross-jurisdictional fusion (see
  vendor-capabilities.md, acquisition Feb 2024).
- ALPR Sharing: partner agencies search each other's data;
  audit-report limitation (hardcoded placeholder fields) documented in
  Axon's own docs (user-provided, in toronto-claims file).
- Edmonton FR bodycam trial Dec 2025 (VERIFIED — see regional-policy).

### Genetec — Security Center / AutoVu (the structural contrast)
- Agency-controlled; no vendor-run cross-agency pool; customer-owned
  data; partial/no-plate attribute search (Cloudrunner ML Core).

### SoundThinking — SafetySmart (PlateRanger + ShotSpotter + CrimeTracer)
- Native fusion of gunshot detection, ALPR, and a person-records search
  engine in one platform (April 2025 integration; see
  vendor-capabilities.md).

### Leonardo — EOC + SignalTrace
- SignalTrace marketing (vendor's own page): "identify groups of consumer
  electronic devices that routinely travel together," "electronic
  fingerprints," works "with or without license plate readers."
  https://www.leonardocompany-us.com/lpr/elsag-signaltrace
- Receive-only → invisible to radio certification (hardware-certs.md).

## Documented use cases (facts, each sourced above or in research base)
1. Co-travel/association mapping on plates — Flock Convoy, Vigilant
   Associate Analysis. Shipping today.
2. Presence at sensitive locations — Vigilant Stakeout (ACLU/NYPD).
3. Predictive location — Vigilant Locate Analysis.
4. Cross-state pattern-of-life — Flock Multi-Geo (TX abortion search:
   83,000 cameras).
5. Plate → person identity — Flock Nova (data brokers + breach data).
6. Immigration screening via hotlist ingestion — NCIC Immigration
   Violator File (vendor-capabilities.md).
7. Personal stalking — Kansas chief, 164 searches; ~50 documented
   Flock-stalking cases (misuse-cases.md).

## ANALYSIS — what the documented capabilities enable (label as analysis)
Ground rule: every item anchors to a capability the vendor documents.
1. **Borrowed-car re-identification.** Anchor: SignalTrace works "with or
   without license plate readers" and fingerprints device groups. If your
   devices are the identifier, driving a different car changes nothing —
   the vendor's own framing, extended one honest step.
2. **Device co-travel pairing.** Anchor: Leonardo's "devices that
   routinely travel together" (their words) = Convoy Analysis for
   Bluetooth. Four BLE devices that always move together are a household,
   a crew, a carpool — association inference without a single plate.
3. **Sensor-fusion escalation.** Anchor: Flock already dispatches drones
   to LPR hits and integrates Raven audio; SoundThinking fuses gunshot +
   plate + person-records. The pipeline from "sensor event" to "person
   file" is a product roadmap, not a hypothesis.
4. **Passive-collection blind spot.** Anchor: receive-only sensors carry
   no certification trail (hardware-certs.md) and no retention statute
   mentions device signals (regional-policy.md) — the fastest-growing
   capability sits in the least-regulated gap.

## Credibility framing for the site
Analysis sections are marked as analysis, written from professional
experience building AI systems (Mike), and extrapolate only from
capabilities vendors document themselves. Facts and analysis are visually
separated on the page.
