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
  - **If the customer provides a number:** strip P prefix and 2-letter suffix, then search the `Family` column in `temp_inventory.csv`. If found → hardware number → send 2nd Sticker Mopar response (use match count, not "10+"). If not found in Family but found as a part number → valid. If not found in either → treat as part number, use not-in-inventory response. Never send the 2nd Sticker response without a confirmed Family column match.
- GM ECMs: **one sticker** on the unit (not two)
- All others: sticker(s) on the unit

**Programming:**
- "We can program some of these units"
- Always get part number first to confirm if their unit is programmable
- If programmable: customer enters VIN and mileage in the **"Add note to seller"** box at checkout

**Mopar ECM — VIN/mileage reply (post-purchase):**
When a Chrysler/Dodge/Jeep ECM buyer sends their VIN and/or mileage for programming, use the **MOPAR1** template from `knowledge/yps_files/Customer Service.md`:
- Use the full template including the "Over 33%..." fitment warning block
- **Exception:** If the buyer also includes a photo of their ECM part number sticker AND it matches what they purchased → use only the opening line ("Hello again and thank you for the information. We will get the unit programmed and scheduled for shipping promptly.") — omit everything from "Over 33%..." through "Please email with any questions." The part number match makes the fitment warning unnecessary.

**R&R (Repair and Return):**
- Available for: some Ford ECMs, some Chrysler/Dodge/Jeep ECMs
- NOT available for: GM ECMs or any other makes not listed above
- Info needed for R&R: vehicle year/make/model/engine, part number, description of issues, DTCs, diagnostics completed, parts already replaced
- See **Repair and Return Service** in `knowledge/product-inquiries/product-info.md` for diagnostic fee, turnaround time, disqualifying conditions, closing paragraphs, and repair patterns

**Ford ECM — PATS key requirements:**
- Ford requires **two keys** when replacing the PCM and updating PATS
- Recommend a second **non-cloned key cut by a locksmith** — cloned keys will not work for PATS
- If a customer asks about one-key installs pre-purchase: answer the PATS question first, then pivot to the standard part number ask
- **PATS delete requests:** Use the modification decline template in `knowledge/order-issues/order-info.md` — "We do not offer PATS delete. We just ship the units with OE software."

**Order-issue install questions:**
- Default: use the standard 7-item template in `knowledge/order-issues/order-info.md`
- **GM ECM — key relearn failure:** if buyer reports key not recognized or security light won't clear after install, do NOT use the full 7-item template. Use the GM ECM key relearn template in `knowledge/order-issues/order-info.md` — ask only for ignition type (key start or push button), trouble codes, and part number confirmation. Follow up with more specific guidance once those are confirmed.

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

**Follow-up order-issue — use judgment on template scope:**
- **Unit never worked after install, or issues appeared quickly (days/week):** Use the full 10-item template including install instructions confirmation and fuse/relay match.
- **Unit worked for an extended period, then new symptoms appeared:** Do NOT use the full template. Ask only for: (1) original TIPM part number to rule out fitment, and (2) TIPM trouble codes via OE scan tool. Skip install/fuse questions — if the unit ran fine for months, install is not the issue. Acknowledge any unfamiliar symptoms ("We have not seen [X] before") without dismissing.

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
- See **Repair and Return Service** in `knowledge/product-inquiries/product-info.md` for diagnostic fee, turnaround time, and closing paragraphs
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
**Descriptor:** Use **"tested"** — exception: GM ABS modules 2000–2006, use **"rebuilt"**
**Part number:** Part number specific, not vehicle specific

**Finding the part number:**
- **GM ABS:** Located under the driver door on the vehicle. Crawl under the vehicle under the driver door, look up over where the brake lines go into the pump — the part number sticker is on the front of the module.
- **Ford ABS:** Location varies — do NOT include location guidance; rely on the attached image (`ford_abs_pn.png`) to help the customer identify the sticker.
- **Dodge ABS:** Rely on the attached image (`mopar_abs_pn.png`) to help the customer identify the sticker.

**Part number sticker images:**
- GM ABS (2000–2006): attach `knowledge/images/gm_abs_part_number_stickers.png`
- Dodge ABS: attach `knowledge/images/mopar_abs_pn.png`
- Ford ABS: attach `knowledge/images/ford_abs_pn.png`
- In the email body reference as: "We've attached a picture of what the sticker should look like to help."
- Do NOT attach if we already have their exact part number in stock.

**R&R:** Available for Ford, GM, and Dodge ABS modules only

**R&R follow-up (module already shipped, no codes/part number):** Do NOT re-ask for part number or trouble codes. Acknowledge the module is on its way, note that repairability is uncertain without that info, and commit to evaluating it on arrival. Skip the diagnostic fee paragraph — it was already communicated; no need to repeat at this stage.

**Order-issue install questions:** Use default template in `knowledge/order-issues/order-info.md`

**Same trouble code across multiple modules (GM 136 series):** If a customer reports the same trouble code appearing across multiple replacement modules with the same part number, there is likely an issue in the vehicle and their original unit may have been good. Do not defer to techs — recommend further diagnostics to determine what is going on in the vehicle. A return can be offered at this stage.

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

## General Rules (All Product Types)

- **Never use "rebuilt"** as a descriptor in early-stage replies — use "tested" (exception: GM ABS 2000–2006, use "rebuilt")
- **Part number always comes first** — do not confirm availability, compatibility, or R&R eligibility without the part number
- **DO NOT RELY ON EBAY'S FITMENT GUIDE OR THE GUARANTEED TO FIT PROGRAM** — include this warning in all product inquiry replies
- **Inventory check:** Always check `temp_inventory.csv` before drafting. If exact part number is in stock, offer replacement as a faster alternative to R&R.
- **Warranty, return policy, pricing, and R&R process details** — see `knowledge/product-inquiries/product-info.md`
