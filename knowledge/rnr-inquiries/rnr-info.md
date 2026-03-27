# Repair and Return — Reference Info
Last updated: 2026-03-27

Reference data for drafting responses to R&R inquiries.
Only include information verified by business owners.

---

## How It Works

**When to offer:** Only when the customer explicitly asks about sending their unit in for repair. Do NOT proactively offer R&R to customers asking about a replacement unit.

**Process:** Customer ships their broken unit to YPS → YPS rebuilds it → ships it back.
**Eligibility by product type:** See `knowledge/product-types.md` — each product type lists R&R availability.
**Turnaround time:** Approximately 1 week total — 1-2 days shipping to YPS, 1-2 days for the repair, 1-2 days shipping back. Only share if the customer asks.
**Shipping instructions:** [TBD — tracked in state/todo.md]
**Diagnostic fee:** $94.99 — refunded down to this amount if the unit tests good or is unrepairable (YPS will not want the unit sent in unless there is a good chance of successful repair)

> **Note:** Closing paragraphs below use `{DIAGNOSTIC_FEE}` as a token. When drafting, substitute it with the fee amount defined above. If the fee changes, update only this line.

---

## ECU/PCM R&R — Required Info Before Sending

Do NOT ask for VIN or mileage — not needed for R&R.
Collect the following before customer ships:
1. Vehicle Year / Make / Model / Engine
2. Part number on the unit — follow the same part number guidance as product-inquiries (sticker location and image attachment rules per `knowledge/product-types.md`)
3. Short description of the issue
4. All diagnostics completed to determine the unit is faulty
5. All diagnostic trouble codes currently set and which modules they are in
6. Any parts already tested, replaced, or repaired

**Important:** Not all units are repairable. Collect full info upfront so YPS can assess repairability before the customer ships.

**Diagnostic fee closing paragraph** — include after the numbered info-gathering list in all R&R replies:

> Unfortunately not all of these units are repairable. This is the reason we ask for so much information up front as we do have a diagnostic fee of {DIAGNOSTIC_FEE} that we would refund you down to if the unit comes in and either tests good or winds up being unrepairable. We do not want you to send it to us unless we have a good shot at a successful repair.
>
> We will await your reply and have our techs review the information. Let us know if you have any questions — we are here to help!

---

## Ford ECM R&R — P0443 / P0403 Repair Pattern

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

## Dodge/Chrysler/Jeep ECM R&R — Alternator Charging Repair Pattern

**If the listing title includes "alternator charging repair":**
- YPS has a 90–95% success rate with this repair
- **Prerequisite:** Customer must have already replaced both the alternator AND the battery
- If both have been replaced → skip the info-gathering list. Tell them directly they are a good candidate and direct them to purchase the service. Use this closing:

> Based on the information you submitted and our history of repairing these units, there is a 90-95% chance it can be repaired.
>
> You are welcome to purchase the service if you like. Just be aware that we do not give 100% guarantees as we never know the true condition of the circuit board until it comes in and our techs start working on it. Please be aware that per our listing we do have a diagnostic fee of {DIAGNOSTIC_FEE} that we would refund you down to in the event we attempt to repair your item but the unit is unrepairable OR if the part successfully passes our diagnostics test. We'll refund you down to that amount from your original purchase price if either of these situations occur. Once the purchase is made we will message you shortly after on where to send the unit and how to tag the package. Please refer to our listing for additional information, as we do believe you'll find it helpful.
>
> Email us with any further questions. Thanks again!

- If alternator and/or battery have NOT been replaced → ask them to replace both first before sending the ECM in

**If the listing title does NOT include "alternator charging repair"** but the customer's issue sounds like an alternator charging problem:
- Verify they have replaced both the alternator and the battery
- If both have been replaced → redirect them to the alternator charging repair listing to purchase the service
- If not yet replaced → ask them to replace both first, then come back

---

## R&R Disqualifying Conditions

If the customer mentions any of the following, R&R is NOT possible — decline R&R and pivot to offering a replacement unit instead:
- **P06xx trouble codes** (any make) — indicates processor/internal ECM failure; not repairable
- If pivoting to replacement and part number has not already been asked for, ask the customer for their part number sticker photo so YPS can check inventory

---

## Mercedes-Benz ECM R&R — Restrictions

- **Years covered:** 2006–2011 only — do NOT offer R&R for any other years
- **Issue covered:** Coil/Injector issues ONLY — do NOT offer R&R for any other type of issue
- **Prerequisite:** Customer must have already replaced coils, injectors, and spark plugs AND checked wiring for issues before sending in — if they have not done this, do NOT accept the unit
- **All other Mercedes ECM issues:** Decline R&R and pivot to offering a replacement unit instead
- **Order of offer:** Always check for a replacement unit first. Only offer R&R if no replacement is available. When offering R&R, disclose: not all units can be repaired and some will test good — these are refunded down to the diagnostic fee of {DIAGNOSTIC_FEE}
