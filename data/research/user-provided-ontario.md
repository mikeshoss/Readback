# Ontario ALPR deployment facts (user-provided, 2026-09-01)

Seed data fed by Mike. Verify/source each claim before publishing on the site.

## Toronto

- Vendor: **Axon Fusus** (NOT Flock Safety) — fixed cameras with ALPR + vehicle
  attribute recognition (colour/make/model) + livestream capability.
- Retention: non-matching plate reads kept **7 days** (police-stated).
- Police claims vs Axon's own docs:
  - "Reads deleted after 7 days" → retention is a dropdown under Agency
    Settings; Axon default is 30 days; changing it is an admin permission,
    not a board vote.
  - "Never sold to third parties" → Axon ALPR Sharing lets partner agencies
    search the data. Sharing ≠ selling.
  - "No facial recognition" → software setting, not hardware limit. Axon
    paused FR in 2019, resumed evaluating 2025, field-testing on body cams
    with Edmonton Police.
  - "Only limited trained members can search" → permissions are
    agency-configured by whoever holds ALPR System Administration.
  - "Audit logs stored indefinitely" → Axon docs flag a known limitation in
    the sharing audit report: two key fields are hardcoded placeholders; it
    logs THAT a sharing config changed, not WHAT changed.
- Core thesis: **every safeguard is a setting, and no one outside the service
  checks what the settings are.**

## Mapped-camera counts (crowdsourced, incomplete)

- panopti.ca / OSM: ~**360** cameras mapped in the Toronto area, ~**560**
  nationally. Advocacy-run, treat as incomplete.
- Authoritative route: MFIPPA request to Toronto Police Services Board for
  fixed-camera deployment locations + the PIA.

## Other Ontario regions (mostly provincial money — Guns, Gangs and Violence Reduction Strategy)

- **Brampton (Peel Regional Police)**: 50 cameras with ALPR at key
  intersections.
- **York Regional Police**: $255,000 to expand camera program; every camera
  has ALPR, feeds their real-time operations centre. Deputy Chief Paulo
  Da Silva: areas within 1 km of a CCTV camera saw 6%+ crime reduction vs
  2024. (Claim to scrutinize — displacement question.)
- **Waterloo Region**: combined CCTV + ALPR live **June 23, 2026**;
  Kitchener, Cambridge, North Dumfries to follow.
- **Peel**: also runs a portable unit combining acoustic detection, PTZ
  cameras, ALPR, and a loudspeaker.
- **Ontario (provincial)**: assessing highway ALPR. VERIFIED 2026-09-02:
  this is a commitment in the government's *announcement* accompanying
  Bill 119 (Protecting Ontario's Streets and Communities Act, 2026) — the
  full bill text on ola.org contains no occurrence of "plate", "licence
  plate recognition" or ALPR. Do not cite the bill as the ALPR authority.
  Bill: https://www.ola.org/en/legislative-business/bills/parliament-44/session-1/bill-119
  Release: https://news.ontario.ca/en/release/1007500/ontario-introduces-legislation-to-protect-communities-and-keep-streets-safe
  Status: introduced, 44th Parliament 1st Session; second reading debated
  2026-05-28; Royal Assent unconfirmed.
- **Halton**: nothing found on fixed ALPR — MFIPPA request candidate.

## Retention comparison (the "setting, not a standard" exhibit)

| Service | Non-matching reads | Matches |
|---|---|---|
| Peel Regional Police | 24 hours | 30 days |
| Toronto Police | 7 days | ? |

Two neighbouring services, same province, same technology, an order of
magnitude apart.

## Advocacy landscape (Ontario)

- No ALPR-specific campaign exists in Ontario — itself notable.
- **CCLA** — active surveillance/tech file, loudest voice during Clearview.
  Best single contact.
- **Citizen Lab** (Munk School, U of T) — research, not advocacy; credible
  technical work.
- **OpenMedia** — national digital rights, currently focused on Bill C-22.
- **panopti.ca** — the mapping project; closest thing to an ALPR-specific
  effort.
