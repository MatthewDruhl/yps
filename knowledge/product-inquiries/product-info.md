# Product Information — YPS Catalog
Last updated: 2026-03-23

Reference data for drafting accurate customer responses.
Only include information verified by business owners.

---

## ECM / ECU / PCM — Operational Notes

**Price range:** [TBD — tracked in state/todo.md]
**Brands covered:** [TBD — tracked in state/todo.md]

**Dodge/Chrysler/Jeep ECM part number matching:** Only the 8-digit number matters (e.g. 68064938). The part number may appear with a "P" prefix (P68064938) and/or two-letter suffix (68064938AH or P68064938AH) — ignore the prefix and suffix, match on the 8 digits only.

**Hardware numbers vs. part numbers:** Some Mopar ECM numbers are hardware numbers (also called calibration/flash numbers) that map to multiple software/part numbers — they are NOT usable for matching. When a customer provides a hardware number, use the 2nd Sticker response: direct them to the "Authorized Software Update" sticker on the PCM, which contains the actual part number.

**Detecting hardware numbers:** Check the `Family` column in `temp_inventory.csv`. If the customer's 8-digit number (after stripping P prefix and 2-letter suffix) appears in the `Family` column of any row, it is a hardware number → send the 2nd Sticker Mopar response. If it matches a part number in the inventory instead, it is a valid part number.

Count how many rows share that Family value — use that count in the 2nd Sticker response instead of the generic "10+". For example, if 4 rows match, the response says "goes to over 4+ part numbers or software numbers".

**If the number is not found in either the Family column or the part numbers:** The inventory may not have that unit. Treat the number as a part number (not a hardware number) and proceed with a standard not-in-inventory response — do NOT send the 2nd Sticker response without a confirmed Family column match.

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

**If the buyer has an active order:** When sending the 2nd Sticker Mopar response and the buyer has an active order, always add "We will hold off on shipping the item until we hear back from you." before the closing line. Close with "Thanks again for your help with this." — not bare "Thanks again."

**If R&R is available for that product type** (check `knowledge/product-types.md`) — use the "DON'T HAVE ITEM BUT MAYBE A REPAIR" pattern instead: let them know we don't have a replacement but we do have a repair service, and direct them to the R&R listing. Then follow rnr-inquiry info-gathering rules from `knowledge/rnr-inquiries/rnr-info.md`.

---

## Failed Image Send (Empty Message Body)

When a customer's message has no body, or contains only a mobile app signature (e.g. "Get Outlook for Android"), treat it as a failed attempt to send an image.

**Do not flag.** Use the image-resend template below.

**Template:**

Hello and thank you for reaching out!

It looks like your message may not have come through — we didn't receive any content. If you were trying to send a photo, eBay messages can sometimes have trouble with attachments. Feel free to reply with the image or any details you'd like to share and we'll be happy to help!

YPS

**Validation note:** Validate as `order-issue` category to bypass the fitment warning check — the fitment warning is not applicable when there is no customer content to respond to.

---

## General Info

**Pricing:** Never include pricing in any reply — prices change too quickly. If a customer asks for pricing, direct them to check the listing directly.
**Warranty:** 90 days on most items — only share if the customer asks
**Return policy:** 30-day return period — only share if the customer asks
**Shipping:** [TBD — tracked in state/todo.md]
**eBay store:** yourpartsourceyps
