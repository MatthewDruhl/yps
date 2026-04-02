# YPS — Open TODOs
Last updated: 2026-03-23

## Knowledge Gaps — Needs Owner Input
- [ ] Programming eligibility — how do we determine if a specific unit is programmable? What is the response when it is vs. isn't? | Review: 2026-04-01
- [ ] Multi-question emails — no rule yet for how to handle customers who ask several unrelated questions in one email; defer until real example comes through | Review: 2026-04-01
- [ ] Return template trigger — when do we send the return template vs. continue gathering info? | Review: 2026-04-01
- [ ] Restocking fee — confirmed no restocking fee, but document officially once confirmed | Review: 2026-04-01
- [ ] Shipping instructions for R&R — how should the customer pack and ship their unit? | Review: 2026-04-01
- [ ] Warranty — confirm if 90 days applies to all product types or just most | Review: 2026-04-01
- [ ] Price range — document price ranges per product type in product-info.md | Review: 2026-04-01
- [ ] Brands covered — document supported makes/brands per product type in product-info.md | Review: 2026-04-01
- [ ] Shipping — general shipping details for replacement orders | Review: 2026-04-01

## Architecture — Needs Owner Input
- [ ] Order-issue sub-types — cancel requests, return requests, and install failures are different workflows; consider separate categories or routing logic as volume grows | Review: 2026-04-01

## Knowledge Files — To Build
- [ ] `knowledge/order-issues/examples.md` — created with ECM communication loss example (2026-04-02); add more examples as they come through | Review: 2026-04-09
- [ ] `knowledge/rnr-inquiries/examples.md` — add alternator charging and Mercedes R&R examples; currently only has Ford P0443 | Review: 2026-04-01

- [x] Mopar ECM hardware number detection — SOLVED: inventory CSV has a `Family` column containing the hardware number for each part; if customer's number matches a value in the Family column, it's a hardware number → 2nd Sticker response; if it matches a part number/SKU, it's valid | Resolved: 2026-04-02
- [ ] GM ECM VIN programming — customer asked "do you VIN program ECM to my vehicle" and "would there be any other additional programming needed for vehicle to start and function properly?" — need standard answer for GM ECM programming questions | Review: 2026-04-09
- [ ] VIN acknowledgment workflow — buyers reply to TIPM (and possibly ECM) purchase messages with just their VIN; no defined category or response template for this; currently flagging these manually | Review: 2026-04-09
- [ ] TIPM3 post-purchase workflow — map out full decision tree for TIPM3 message family: response varies based on what buyer provides (VIN only, part number only, both, neither, images); templates are in Customer Service.md under TIPM3 section; need to document triggers, logic, and integrate into /draft | Review: 2026-04-09

## Open Emails
- [ ] Real email `19cf903886628ea4` (andresc805 PDC) — needs draft | Review: 2026-04-01
