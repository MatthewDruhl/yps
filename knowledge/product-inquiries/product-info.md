# Product Information — YPS Catalog
Last updated: 2026-03-23

Reference data for drafting accurate customer responses.
Only include information verified by business owners.

---

## ECM / ECU / PCM — Operational Notes

**Price range:** [TBD — tracked in state/todo.md]
**Brands covered:** [TBD — tracked in state/todo.md]

**Dodge/Chrysler/Jeep ECM part number matching:** Only the 8-digit number matters (e.g. 68064938). The part number may appear with a "P" prefix (P68064938) and/or two letter suffix (68064938AH or P68064938AH) — ignore the prefix and suffix, match on the 8 digits only.

**eBay listing links:** Construct as `https://www.ebay.com/itm/{eBay Item Id}` using the "eBay Item Id" column from the inventory CSV (not the internal "Item Id" column).

---

## Part Number Not in Inventory

When a customer provides a part number and it is not in stock:

> Hello and thank you for your interest.
>
> We did check our inventory for your part number, {PART_NUMBER}. Unfortunately we do not have one in stock at this time. We do receive inventory weekly but we never know what items will be coming in. We would suggest searching by your part number only to avoid any fitment issues that could arise if you do not.
>
> Sorry we couldn't be of service but thanks for your interest! Message us with any questions.
>
> YPS

**If R&R is available for that product type** (check `knowledge/product-types.md`) — use the "DON'T HAVE ITEM BUT MAYBE A REPAIR" pattern instead: let them know we don't have a replacement but we do have a repair service, and direct them to the R&R listing. Then follow rnr-inquiry info-gathering rules from `knowledge/rnr-inquiries/rnr-info.md`.

---

## General Info

**Pricing:** Never include pricing in any reply — prices change too quickly. If a customer asks for pricing, direct them to check the listing directly.
**Warranty:** 90 days on most items — only share if the customer asks
**Return policy:** 30-day return period — only share if the customer asks
**Shipping:** [TBD — tracked in state/todo.md]
**eBay store:** yourpartsourceyps
