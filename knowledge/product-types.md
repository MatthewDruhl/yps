# YPS Product Types
Last updated: 2026-03-23

This is the authoritative reference for all YPS product lines. Use this file when drafting emails, classifying inquiries, and applying install/R&R rules.

---

## ECM / PCM / ECU — Engine Control Module

**Also called:** Engine computer, engine control unit
**Terminology:** Default to **ECM**. If the customer uses "ECU", match their language.
**Makes served:** Most makes (Chrysler/Dodge, Ford, GM, Honda/Acura, Mercedes, Nissan, and others)
**Descriptor:** Use **"tested"** — never "rebuilt" unless the customer explicitly asks if we rebuild them
**Part number:** Part number specific, not vehicle specific

**Finding the part number:**
- Ford ECMs: sticker with **"12A650"** in the middle
- Chrysler/Dodge/Jeep ECMs: attach `knowledge/images/mopar_ecm_pn_sticker.png` to replies when asking the customer for their part number. Do NOT attach if we already have their exact part number in stock — in that case, direct them to the listing instead.
- All others: sticker(s) on the unit

**Programming:**
- "We can program some of these units"
- Always get part number first to confirm if their unit is programmable
- If programmable: customer enters VIN and mileage in the **"Add note to seller"** box at checkout

**R&R (Repair and Return):**
- Available for: some Ford ECMs, some Chrysler/Dodge/Jeep ECMs
- NOT available for: GM ECMs or any other makes not listed above
- Diagnostic fee: **$94.99** (refunded down to this amount if unit tests good or is unrepairable)
- Turnaround time: approximately 1 week total — 1-2 days shipping to YPS, 1-2 days for the repair, 1-2 days shipping back. **Only share if the customer asks.**
- **P0600 / P060B** (processor failure codes) = R&R not possible → pivot to replacement offering
- Info needed for R&R: vehicle year/make/model/engine, part number, description of issues, DTCs, diagnostics completed, parts already replaced

**Order-issue install questions:**
- TBD

---

## TIPM — Totally Integrated Power Module

**Also called:** Fuse box, power module
**Makes served:** Chrysler/Dodge
**Descriptor:** Use **"tested"**
**Part number:** Part number specific, not vehicle specific

**Part number sticker image:** Attach `knowledge/images/tipm_part_number.png` when asking the customer for their TIPM part number. Do NOT use for PDC inquiries. Do NOT attach if we already have their exact part number in stock.

**R&R:** Not available for TIPMs

**Order-issue install questions:** Use TIPM-specific template in `knowledge/order-issues/order-info.md`. Key differences from default:
- Item 5: OEM scan tool required for TIPM codes — basic scanners cannot read the TIPM
- Items 8–10: install instructions, fuse/relay match, connectors seated (always include all three)

**Note:** YPS sends install instructions with TIPM orders. "Lost communication codes" after install is typically a sync issue, not a defective unit.

---

## PDC — Power Distribution Center

**Also called:** Fuse box, power distribution center
**Makes served:** Chrysler/Dodge (distinct from TIPM despite similar appearance)
**Descriptor:** Use **"tested"**
**Part number:** Part number specific, not vehicle specific

**R&R:** Not available for PDCs

**Order-issue install questions:** Use PDC-specific template in `knowledge/order-issues/order-info.md`. Key differences from default:
- Item 5: Pull trouble codes from any module in the vehicle (not just the PDC)
- Items 8–9: battery disconnected during install, fuse/relay setup matched

**Note:** YPS does **not** send install instructions for PDCs. PDC and TIPM are different products — do not mix their install questions.

**How to identify:** Listing title will say "Power Distribution Center" or "PDC". TIPM listings say "Totally Integrated Power Module" or "TIPM".

---

## GEM — Generic Electronic Module

**Also called:** Multifunction module, GEM module
**Makes served:** Ford
**Descriptor:** Use **"tested"**
**Part number:** Part number specific, not vehicle specific

**Finding the part number:** Sticker on the unit with **"14B205"** in the middle

**R&R (Repair and Return):**
- Available for some Ford GEM modules
- Diagnostic fee: **$94.99** (refunded down to this amount if unit tests good or is unrepairable)
- Turnaround time: approximately 1 week total — 1-2 days shipping to YPS, 1-2 days for the repair, 1-2 days shipping back. **Only share if the customer asks.**
- Info needed for R&R:
  1. Vehicle year / make / model / engine
  2. Part number (sticker with "14B205" in the middle)
  3. Description of issues
  4. If they have an OE level scan tool — did they run a self-test on the GEM? (Basic scanners cannot read the GEM)
  5. All diagnostics completed to determine the GEM is the problem
  6. Any parts already tested, replaced, or repaired
  7. Photos of both sides of the circuit board (removed from case)

---

## ABS — Anti-Lock Brake Control Module

**Also called:** ABS module, ABS control unit
**Makes served:** Most makes
**Descriptor:** Use **"tested"**
**Part number:** Part number specific, not vehicle specific

**Finding the part number:** Located under the driver door on the vehicle. Crawl under the vehicle under the driver door, look up over where the brake lines go into the pump — the part number sticker is on the front of the module.

**Part number sticker images:**
- GM ABS (2000–2006): attach `knowledge/images/gm_abs_part_number_stickers.png`
- Dodge ABS: attach `knowledge/images/mopar_abs_pn.png`
- Ford ABS: attach `knowledge/images/ford_abs_pn.png`
- In the email body reference as: "We've attached a picture of what the sticker should look like to help."
- Do NOT attach if we already have their exact part number in stock.

**R&R:** Available for Ford, GM, and Dodge ABS modules only

**Order-issue install questions:** Use GEM-specific template in `knowledge/order-issues/order-info.md`. Key difference: item 5 requires OE level scan tool for GEM codes — basic scanners cannot read the GEM.

---

## BCM — Body Control Module

**Also called:** Body computer
**Makes served:** Most makes
**Descriptor:** Use **"tested"**
**Part number:** Part number specific, not vehicle specific

**R&R:** Not available for BCMs

**Order-issue install questions:** Use default template in `knowledge/order-issues/order-info.md`

---

## TCM — Transmission Control Module

**Also called:** Transmission control unit, TCU
**Makes served:** Most makes
**Descriptor:** Use **"tested"**
**Part number:** Part number specific, not vehicle specific

**R&R:** Not available for TCMs

**Order-issue install questions:** Use default template in `knowledge/order-issues/order-info.md`

---

## Speedometer / Instrument Cluster

**Also called:** Cluster, instrument panel
**Makes served:** Most makes
**Part number:** Part number specific, not vehicle specific

**R&R:** Available for some GM speedometers/instrument panel clusters only

**Order-issue install questions:** Use default template in `knowledge/order-issues/order-info.md`

---

## Climate / HVAC Control Module


**Also called:** Heater control, climate control unit
**Makes served:** Most makes
**Part number:** Part number specific, not vehicle specific

**R&R:** Not available for climate/HVAC controls

**Order-issue install questions:** Use default template in `knowledge/order-issues/order-info.md`

---

## Warranty & Returns (All Product Types)

**Warranty:** 90 days on most items
**Return period:** 30 days
**Only share if the customer asks** — do not include in standard drafts unprompted.

---

## General Rules (All Product Types)

- **Never use "rebuilt"** as a descriptor in early-stage replies — use "tested"
- **Part number always comes first** — do not confirm availability, compatibility, or R&R eligibility without the part number
- **DO NOT RELY ON EBAY'S FITMENT GUIDE OR THE GUARANTEED TO FIT PROGRAM** — include this warning in all product inquiry replies
- **R&R diagnostic fee: $94.99** — always disclose upfront; refunded down to this if unit tests good or is unrepairable
- **Inventory check:** Always check `temp_inventory.csv` before drafting. If exact part number is in stock, offer replacement as a faster alternative to R&R.
