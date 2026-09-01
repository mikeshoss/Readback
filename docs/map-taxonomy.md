# Map taxonomy — camera categories & default visibility

Decision (Mike, 2026-09-01): the map distinguishes ALPRs by *purpose and
consent context*, not just location. Toll and border scanners are real ALPRs
and belong on the map — but they are not what the site is about, so they
ship **toggled off by default** with an explanatory note. Lumping them in
would inflate the count and weaken the argument; excluding them would look
like hiding data. A layered map with honest categories does both jobs.

## Categories

| Category | Examples | Default | Rationale note shown on toggle |
|---|---|---|---|
| **Police surveillance ALPR** (the subject of this site) | TPS vehicle fleet, Brampton/Sudbury/Napanee fixed cams, York RTOC feeds, Peel portable unit | **ON** | Generalized scanning of everyday movement; retention/sharing settings vary by service |
| **Toll / paid service** | Highway 407 ETR gantries | OFF | You entered a paid service that bills by plate — scanning is the product you signed up for. Still worth knowing where it is. |
| **Border crossing** | CBSA primary inspection lanes (and US CBP side), land crossings, bridges | OFF | Coming and going from the country — a defined checkpoint everyone understands, not ambient surveillance. Included for completeness. |
| **Government CCTV** (non-ALPR) | Municipal traffic/CCTV cams (panopti.ca's second layer) | OFF | Context layer; not plate readers. |
| **Private/commercial ALPR** (future) | Parking operators, malls, repo/insurance scanners | OFF (when we have data) | Private collection often feeds police via request/subpoena — different pipeline, worth mapping separately. |

## Data notes (verified against live OSM/panopti data, 2026-09-01)

- **panopti.ca does NOT actually label 407 or border cameras.** Checked its
  live cameras-ca.json (1,592 rows): no operator "407 ETR", no CBSA/border
  rows. Apparent "407" sightings are false positives (digits in refs/IDs)
  or untagged nodes. If some 407/border readers appear on its map, they're
  indistinguishable from police ALPRs — which is exactly the problem our
  taxonomy fixes.
- **407 gantries live in a different OSM tag family**: `highway=toll_gantry`
  + `toll_method=transponder;license_plate` (verified: 80 nodes in the 407
  corridor bbox 43.6,-80.1,44.1,-78.9). Toll layer = separate Overpass query
  on `highway=toll_gantry`, not `man_made=surveillance`. This is a real
  capability gap vs panopti.ca.
- **Border**: crossing points tagged `barrier=border_control` in OSM; the
  CBSA-side readers themselves (Perceptics hardware — see vendor report)
  are mostly unmapped. Render crossings as points with a note that every
  land crossing runs plate readers (CBSA + US CBP), rather than pretending
  to know individual camera positions.
- panopti.ca dataset composition for reference: 967 "Government CCTVs",
  244 RTX Corporation (MTO highway cams), 201 Genetec, 18 Flock, 16 Axis,
  11 Neology, 5 Axon; top operators Ville de Montréal (427), MTO (301),
  City of Brampton (101), York Regional Police (47).
- The category is OUR classification layer on top of OSM data — keep it in
  our pipeline (query source + osmId → category mapping), don't rely on
  OSM tags alone.
- UI: legend explains each category in one line; the off-by-default layers
  get a short "why is this off?" note (text above). The distinction itself
  is part of the site's thesis: **consent and context matter — a toll you
  pay and a border you cross are not the same as a dragnet on your commute.**
