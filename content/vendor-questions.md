# Asking the companies — levers on ALPR vendors

Private companies aren't subject to FOI. These are the channels that work
anyway, roughly in order of enforceability.

## 1. PIPEDA access requests (legally binding — the real lever)

Under PIPEDA s. 8, any individual can demand a private organization
disclose what personal information it holds about them, how it's used, and
who it's been shared with. 30-day deadline, complaints go to the OPC.

- **407 ETR** (privately operated) — the flagship demo: "I asked the 407
  what they know about my car." Request: all plate images/reads, trip
  records, retention period applied, and any disclosures to law
  enforcement including count and legal basis. They must answer.
- **Genetec** (Montreal) — also subject to Quebec's Law 25 (stricter:
  privacy officer, PIAs, breach notice). As a processor for police they'll
  likely say "ask the police service" — that answer itself documents the
  controller/processor chain.
- **Axon Canada** — same processor caveat, same value in the answer.

### Template (407 ETR)
> Under PIPEDA, I request access to all personal information your
> organization holds about me, including: all licence-plate images and
> reads associated with plate [X]; trip and location records; the
> retention period applied to each category; all uses made of this
> information; and all disclosures to third parties including law
> enforcement — for each disclosure, the date, recipient, and lawful
> basis. Please also confirm whether my information has been used for any
> purpose other than toll billing. I look forward to your response within
> 30 days as required.

## 2. FOI the contracts out of the cities (binding, indirect)

The vendor's obligations live in municipal contracts: MSAs, data-processing
terms, security questionnaires answered during tenders, configuration
guides. All MFIPPA-able from the municipality. Vendors will claim the
third-party commercial exemption (s. 10); the IPC has repeatedly ordered
police-tech contracts disclosed. Our five letters already ask for sharing
agreements — contract requests are the natural follow-up round.

## 3. On-the-record press questions (silence is publishable)

Written questions, stated deadline, published verbatim with the response —
or the absence of one. "Axon did not respond" is a finding. This is also
libel hygiene: always seek comment before publishing claims about a vendor.

### Questions drafted
**Axon (Toronto's vendor):**
1. Is Axon's ALPR Sharing feature enabled for any Canadian agency? Which?
2. Your default retention is 30 days; Toronto sets 7. Does Axon report to
   customers' oversight boards when an admin changes retention?
3. Your documentation notes the sharing audit report contains hardcoded
   placeholder fields. When will audit logs capture what changed, not just
   that a change occurred?
4. Axon committed against face matching in 2019 and is field-testing
   facial recognition with Edmonton Police in 2025-26. What is the current
   commitment, specifically for Canadian deployments?
5. Axon Outpost contains a Bluetooth radio. Will Axon commit in writing
   that no current or future software will capture wireless-device
   identifiers from the public?
6. Will Axon publish per-agency transparency pages for Canadian customers?

**Genetec (Canada's most-deployed vendor):**
1. Confirm: no vendor-operated cross-agency search network exists for
   AutoVu — correct? Will you commit to never operating one?
2. Which Canadian deployments use Cloudrunner (cloud) vs on-prem SharpV?
3. Cloudrunner units for Canadian customers are hosted in Canada — does
   any Canadian ALPR data ever transit or rest outside Canada?
4. Will you publish Canadian deployment counts by service?

**Motorola Solutions:**
1. Do Vigilant LEARN or DRN commercial plate-collection operate in Canada
   in any form?
2. Has any Canadian agency's data ever been accessible via LEARN?

**Flock Safety:**
1. You state you have no Canadian police partnerships. Any Canadian
   pilots, trials, or sales conversations underway? HOA/private sales?

**407 ETR (corporate, beyond the PIPEDA request):**
1. How many law-enforcement requests for toll/plate data did you receive
   in each of the last 5 years, and how many were fulfilled? Under what
   legal instruments?
2. Will you publish a transparency report?

## 4. Public-company channels (Axon: NASDAQ AXON; Motorola: NYSE MSI)

Investor relations must answer shareholders; securities filings and ESG
reports contain risk disclosures about surveillance controversies;
shareholder questions at AGMs get minuted. Flock is private (a16z) — no
such channel.

## 5. Regulatory certification databases (already public)

Radio capabilities are discoverable without asking: FCC ID filings (done —
see device-signal research) and Canada's ISED Radio Equipment List for
Canadian-certified hardware. The hardware can't hide what's inside it.

## Site integration

Treat vendor questions like the FOI tracker: publish each question set,
the date sent, and the response or "no response after N days." The
asymmetry is the content — police answer because they must; we document
whether companies answer when they don't have to.
