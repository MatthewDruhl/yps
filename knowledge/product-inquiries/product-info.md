# Product Information — YPS Catalog

Reference data for drafting accurate customer responses.
Only include information verified by business owners.

> **Status:** Partially verified — R&R eligibility confirmed by owners. Price, warranty, turnaround still TBD.

---

## ECM / ECU / PCM Engine Computers

**Description:** Rebuilt engine control units for many makes and models.
**Brands covered:** [TBD]
**Price range:** [TBD]
**Turnaround time:** [TBD]
**Repair and Return:** Available for some Ford ECMs and some Chrysler/Dodge/Jeep ECMs only. NOT available for GM ECMs or any other makes.
**Notes:**
- Ford ECM part numbers: located on a sticker on the unit; look for "12A650" in the middle of the sticker — that sticker contains the part number
- Ford GEM module part numbers: located on a sticker on the unit; look for "14B205" in the middle of the sticker — that sticker contains the part number
- Ford GEM R&R: ask the buyer to remove the circuit board from the case and send photos of both sides of the board before sending in
- Dodge/Chrysler/Jeep ECM part number matching: only the 8-digit number matters (e.g. 68064938). The part number may appear with a "P" prefix (P68064938) and/or two letter suffix (68064938AH or P68064938AH) — ignore the prefix and suffix, match on the 8 digits only
- Dodge/Chrysler/Jeep ECM sticker image: attach `knowledge/images/mopar_ecm_pn_sticker.png` when asking the customer for their part number. Do NOT attach if we already have their exact part number in stock — direct them to the listing instead.
- eBay listing links: construct as https://www.ebay.com/itm/{eBay Item Id} using the "eBay Item Id" column from the inventory CSV (not the internal "Item Id" column)

---

## Body Control Modules (BCM)

**Description:** Remanufactured body control modules.
**Brands covered:** [TBD]
**Price range:** [TBD]
**Turnaround time:** [TBD]
**Notes:** [TBD]

---

## TIPM Modules

**Description:** Rebuilt Totally Integrated Power Modules (Chrysler/Dodge/Jeep).
**Brands covered:** Chrysler, Dodge
**Price range:** [TBD]
**Turnaround time:** [TBD]
**Repair and Return:** NOT available for TIPMs
**Notes:** Part number required — not vehicle specific. Part number sticker is on the unit itself.
- TIPM sticker image: attach `knowledge/images/tipm_part_number.png` when asking for part number. Do NOT use for PDC inquiries. Do NOT attach if exact part number already in stock.

---

## ABS Control Modules

**Description:** Anti-lock brake system control units.
**Brands covered:** [TBD]
**Price range:** [TBD]
**Turnaround time:** [TBD]
**Repair and Return:** Available for Ford, GM, and Dodge ABS modules only
**Notes:**
- GM ABS modules 2000–2006: rebuilt and tested — use "rebuilt" in replies for these years
- GM ABS modules 2000–2006 part number location: "These are located under the driver door under the vehicle. If you crawl under the vehicle under the driver door and look up over where the brake lines go into the pump you normally can see the front of the module where the part number sticker is located. Once you have located that let us know the part number."
- GM ABS modules 2000–2006 sticker image: attach `knowledge/images/gm_abs_part_number_stickers.png`
- Dodge ABS sticker image: attach `knowledge/images/mopar_abs_pn.png`
- Ford ABS sticker image: attach `knowledge/images/ford_abs_pn.png`
- Reference in email body as: "We've attached a picture of what the sticker should look like to help."
- Do NOT attach if exact part number already in stock.

---

## Transmission Control Units (TCM)

**Description:** Rebuilt transmission control modules.
**Brands covered:** [TBD]
**Price range:** [TBD]
**Turnaround time:** [TBD]
**Notes:** [TBD]

---

## Speedometer Clusters

**Description:** Instrument cluster repair and replacement.
**Brands covered:** [TBD]
**Price range:** [TBD]
**Turnaround time:** [TBD]
**Repair and Return:** Available for GM
**Notes:** [TBD]

---

## Climate / Heater Controls

**Description:** HVAC control modules.
**Brands covered:** [TBD]
**Price range:** [TBD]
**Turnaround time:** [TBD]
**Notes:** [TBD]

---

## Repair and Return Service

**When to offer:** Only offer R&R if the customer explicitly asks about sending their unit in for repair. Do NOT proactively offer R&R to customers asking about a replacement unit.

**How it works:** Customer ships their broken unit to YPS → YPS rebuilds it → ships it back.
**Available for:**
- ECM/ECU/PCM: some Ford, some Chrysler/Dodge/Jeep — NOT GM or any other makes
- ABS modules: Ford, GM, Dodge
- Speedometer/Instrument clusters: some GM
**Not available for:** TIPM modules, PDC modules, GM ECMs, BCMs, TCMs, Climate/HVAC controls
**Turnaround time:** Approximately 1 week total — 1-2 days shipping to YPS, 1-2 days for the repair, 1-2 days shipping back. Only share if the customer asks.
**Shipping instructions:** [TBD]
**Diagnostic fee:** $94.99 — refunded down to this amount if the unit tests good or is unrepairable (YPS will not want the unit sent in unless there is a good chance of successful repair)

### ECU/PCM R&R — Required Info Before Sending
Do NOT ask for VIN or mileage — not needed for R&R.
Collect the following before customer ships:
1. Vehicle Year / Make / Model / Engine
2. Short description of the issue
3. All diagnostics completed to determine the unit is faulty
4. All diagnostic trouble codes currently set and which modules they are in
5. Any parts already tested, replaced, or repaired

**Important:** Not all units are repairable. Collect full info upfront so YPS can assess repairability before the customer ships.

**Diagnostic fee closing paragraph** — include after the numbered info-gathering list in all R&R replies:

> Unfortunately not all of these units are repairable. This is the reason we ask for so much information up front as we do have a diagnostic fee of $94.99 that we would refund you down to if the unit comes in and either tests good or winds up being unrepairable. We do not want you to send it to us unless we have a good shot at a successful repair.
>
> We will await your reply and have our techs review the information. Let us know if you have any questions — we are here to help!

### Ford ECM R&R — P0443 / P0403 Repair Pattern

When the listing title includes **P0443** or **P0403**, the full expected code set when the PCM is the root cause is:
- P0403 — EGR Solenoid Circuit
- P0443 — EVAP Canister Purge Solenoid Circuit
- P0135 — O2 Sensor Heater Circuit (Bank 1, Sensor 1)
- P0141 — O2 Sensor Heater Circuit (Bank 1, Sensor 2)
- P0155 — O2 Sensor Heater Circuit (Bank 2, Sensor 1)
- P0161 — O2 Sensor Heater Circuit (Bank 2, Sensor 2)

**When all 6 codes are present** → PCM is likely the issue. YPS has approximately a 90% success rate with this repair.

**When only some codes are present** → Ask the customer to confirm there are no additional codes set in the PCM. Phrase it as: "Usually when the PCM is the issue we will see a few additional trouble codes than what you have."

---

### Dodge/Chrysler/Jeep ECM R&R — Alternator Charging Repair Pattern

**If the listing title includes "alternator charging repair":**
- YPS has a 90–95% success rate with this repair
- **Prerequisite:** Customer must have already replaced both the alternator AND the battery
- If both have been replaced → skip the info-gathering list. Tell them directly they are a good candidate and direct them to purchase the service. Use this closing:

> Based on the information you submitted and our history of repairing these units, there is a 90-95% chance it can be repaired.
>
> You are welcome to purchase the service if you like. Just be aware that we do not give 100% guarantees as we never know the true condition of the circuit board until it comes in and our techs start working on it. Please be aware that per our listing we do have a diagnostic fee of $94.99 that we would refund you down to in the event we attempt to repair your item but the unit is unrepairable OR if the part successfully passes our diagnostics test. We'll refund you down to that amount from your original purchase price if either of these situations occur. Once the purchase is made we will message you shortly after on where to send the unit and how to tag the package. Please refer to our listing for additional information, as we do believe you'll find it helpful.
>
> Email us with any further questions. Thanks again!

- If alternator and/or battery have NOT been replaced → ask them to replace both first before sending the ECM in

**If the listing title does NOT include "alternator charging repair"** but the customer's issue sounds like an alternator charging problem:
- Verify they have replaced both the alternator and the battery
- If both have been replaced → redirect them to the alternator charging repair listing to purchase the service
- If not yet replaced → ask them to replace both first, then come back

---

### R&R Disqualifying Conditions
If the customer mentions any of the following, R&R is NOT possible — decline R&R and pivot to offering a replacement unit instead:
- **P06xx trouble codes** (any make) — indicates processor/internal ECM failure; not repairable
- If pivoting to replacement and part number has not already been asked for, ask the customer for their part number sticker photo so YPS can check inventory

### Mercedes-Benz ECM R&R — Restrictions
- **Years covered:** 2006–2011 only — do NOT offer R&R for any other years
- **Issue covered:** Coil/Injector issues ONLY — do NOT offer R&R for any other type of issue
- **Prerequisite:** Customer must have already replaced coils, injectors, and spark plugs AND checked wiring for issues before sending in — if they have not done this, do NOT accept the unit
- **All other Mercedes ECM issues:** Decline R&R and pivot to offering a replacement unit instead
- **Order of offer:** Always check for a replacement unit first. Only offer R&R if no replacement is available. When offering R&R, disclose: not all units can be repaired and some will test good — these are refunded down to the diagnostic fee of $94.99

---

## General Info

**Pricing:** Part number specific — cannot quote a price until the part number is known. If a customer asks for pricing, acknowledge the question and let them know pricing depends on the part number. Once we have the part number and confirm availability, we can provide the price.
**Warranty:** 90 days on most items — only share if the customer asks
**Return policy:** 30-day return period — only share if the customer asks
**Shipping:** [TBD]
**eBay store:** yourpartsourceyps
