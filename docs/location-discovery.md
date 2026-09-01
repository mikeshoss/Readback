# Location discovery — every stone left to turn

Roadmap of techniques for finding ALPR locations beyond what's already in OSM.
Ordered roughly by effort-to-payoff.

## Low effort, high payoff

1. **Procurement & tender portals.** Municipal contracts are public:
   bids&tenders (most Ontario cities), MERX, city SAP Ariba portals. Search
   "ALPR", "licence plate", "Genetec", "AutoVu", "Axon Fleet", "Fusus".
   Contract award notices often include camera counts and sometimes site
   lists. Genetec's own press releases already gave us Brampton (200 cams).
2. **Police services board agendas/minutes.** Fixed-camera programs need
   board approval; agenda packages often attach the PIA, site-selection
   criteria, and sometimes maps. Targets: TPSB, Peel PSB, York PSB, Waterloo
   PSB, Sudbury PSB (their 16 fixed sites will be in a report somewhere).
3. **Provincial grant announcements.** Ontario's Guns, Gangs and Violence
   Reduction Strategy funding announcements name recipient municipalities
   and program scope — an early-warning feed for *future* installs.
4. **Vendor case studies & press releases.** Genetec/Axon/Motorola publish
   named-customer case studies with deployment details.
5. **CBSA port-of-entry list** (open data) — all land crossings are known
   points; every one runs plate readers (Perceptics). No discovery needed,
   just render the official list.
6. **407 ETR + toll bridges** — gantries already in OSM (`highway=toll_gantry`);
   add Blue Water/Ambassador/Peace Bridge toll plazas.

## Medium effort, clever

7. **WiGLE wardriving database.** Flock cameras broadcast Wi-Fi SSIDs
   (patterns like "Flock-...") — the DeFlock community uses WiGLE to
   geolocate unmapped Flock cameras in the US. Worth checking what SSIDs
   Genetec SharpV / Axon Outpost units broadcast and querying WiGLE's API
   over Ontario. Nobody has done this for Canada.
8. **Mapillary / street-level imagery.** Crowdsourced street imagery +
   an object-detection pass finds pole cameras; DeFlock contributors use
   Mapillary manually. Automatable with a small vision model over
   intersection imagery in target cities.
9. **Google Street View spot checks** at named intersections (Brampton's
   "key intersections", Sudbury's 16 sites) once council docs narrow the
   candidates.
10. **Electrical/pole-attachment permits.** Municipal permits for camera
    installs on hydro poles are public records in some cities.

## Formal / slower

11. **MFIPPA requests** — the authoritative route. Queue: Toronto PSB
    (fixed deployment locations + PIA), Halton (any ALPR at all), Peel
    (fixed sites + portable-unit deployment log), York (camera locations),
    Waterloo (site list). Ask for: site addresses/coordinates, vendor,
    contract, retention config, sharing agreements, audit reports.
12. **Our own crowdsourcing pipeline** — report form → validated → OSM
    (upstream, so panopti/DeFlock benefit too; good-citizen move that also
    makes us the best-maintained Canadian layer).

## Already exhausted
- OSM/Overpass (`surveillance:type=ALPR`) — the base layer, in pipeline.
- panopti.ca cameras-ca.json — same OSM data, analyzed.
- EFF Atlas of Surveillance — agency-level (US), in data/raw/.
- Flock transparency portals / Eyes on Flock — US only; no Canadian Flock.
