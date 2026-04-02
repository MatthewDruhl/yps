# /draft — Draft Response to Next Queued Email

Pick the next email from the queue, generate a response draft, and save it.

Email source is detected from the Email ID format:
- **Hex ID** (e.g. `19ce3892a86cd7a8`) → Gmail
- **Numeric ID** (e.g. `1000000003`) → eBay (body from `temp_ebay_messages.xml`)
- **Filename ID** (e.g. `mock_product_inquiry_1.md`) → Mock (body from `mock_email/Inbox/{id}`)

## Steps

1. **Read state files:**
   - `state/queue.md` — find emails with status `new` (any source). Pick the oldest.
   - `state/drafts.md` — check for existing drafts to avoid duplicates.

2. **If no `new` emails exist**, tell the operator and stop.

3. **Read knowledge files** based on category:
   - Always: `knowledge/voice.md`
   - `product-inquiry`: `knowledge/product-types.md`, `knowledge/product-inquiries/examples.md`, `knowledge/product-inquiries/product-info.md`
   - `rnr-inquiry`: `knowledge/product-types.md`, `knowledge/rnr-inquiries/examples.md`, `knowledge/rnr-inquiries/rnr-info.md`
   - `order-issue`: `knowledge/order-issues/order-info.md`
   - Warn if any file is empty or placeholder-only, but continue.

4. **Read the original email** — based on source:
   - **Gmail:** use `gmail_get` with the Email ID. Extract: From, Subject, Body, Thread ID.
   - **eBay:** read `temp_ebay_messages.xml`, find `<Message>` where `<MessageID>` matches. Extract: Sender, Subject, Text, ItemID, Item Title.
   - **Mock:** read `mock_email/Inbox/{Email ID}`. Extract: From, Subject, Body.
   - If the source file/message can't be retrieved, mark as `skipped` in queue.md with a reason and stop.

5. **Update queue status** — set to `drafting` in `state/queue.md`.

6. **Pre-draft context check** — before generating, verify the following. If any check fails, resolve it before continuing:

   - [ ] **Product type identifiable?** — confirm product type from the listing title or email body. If ambiguous (e.g. email mentions "computer" with no listing context), flag to operator and stop.
   - [ ] **Part number present?** — note whether the customer provided a part number. Determines whether to check inventory now or ask for it. Set `hasPartNumber` accordingly for the validation script.
   - [ ] **Mopar hardware number?** (Chrysler/Dodge/Jeep ECM only, when customer provided a number) — strip P prefix and 2-letter suffix, search the `Family` column in `temp_inventory.csv`. If found → hardware number → use 2nd Sticker Mopar response with the match count. If not found in Family → proceed normally. Never send the 2nd Sticker response without a confirmed Family column match.
   - [ ] **P06xx codes mentioned?** (`rnr-inquiry` only) — if the customer mentions any P06xx trouble code, R&R is disqualified. Re-classify as `product-inquiry`, update queue.md, and draft a replacement offer instead.
   - [ ] **R&R eligibility confirmed?** (`rnr-inquiry` only) — check `knowledge/product-types.md` to confirm R&R is available for this product type. If not (TIPM, PDC, BCM, TCM, Climate/HVAC), decline R&R and pivot to product-inquiry rules.

7. **Generate the draft response:**
   - Match voice/tone from examples.md for the email's category
   - Only include information from product-types.md, product-info.md, order-info.md, or the original email
   - If you don't have the answer, say so honestly
   - Follow all Response Guardrails from CLAUDE.md
   - Never include: pricing (unless from product-info.md), commitments, other customer info, internal details, legal language

7. **Validate the draft** — run the automated checks first, then the AI checks. Fix any failures before saving.

   **Step 7a — Automated checks (run script):**
   Pipe a JSON object to `node test/validate-draft.js` with these fields:
   ```
   draft         — the full draft text
   category      — product-inquiry | rnr-inquiry | order-issue
   productType   — from the original email (e.g. TIPM, ABS, ECM, GEM)
   make          — vehicle make from customer email
   modelYear     — vehicle model year (if known)
   username      — customer's eBay username
   to            — recipient address
   cc            — [] (should always be empty)
   bcc           — [] (should always be empty)
   customerText  — original customer email body
   attachment    — attachment filename set in draft metadata (or "" if none)
   hasPartNumber — true if customer provided a part number, false otherwise
   ```
   Script exits with code 1 if any check fails. Fix all failures, then re-run until exit code 0.
   Automated checks cover: greeting, filler openers, YPS sign-off, quoted email, CC/BCC, pricing, fitment warning, "rebuilt" usage, Dodge part number format, eBay link format, diagnostic fee closing, VIN/mileage in rnr-inquiry, warranty/return volunteered, terminology mismatch, attachment present.

   **Step 7b — AI checks (review manually):**

   **Voice & structure**
   - [ ] Greeting starts with "Hello" — not "Hi", "Hey", or customer's username
   - [ ] No filler openers — "Great question!", "Absolutely!", "So you've come to the right place", "Happy to help"
   - [ ] Signs off with "YPS"
   - [ ] No redundant sign-off (last sentence already says "let us know" → don't add another)
   - [ ] Multiple response points → numbered list used
   - [ ] No quoted original email at the bottom
   - [ ] Single recipient only — no CC, no BCC

   **Content rules**
   - [ ] No pricing included anywhere in the draft
   - [ ] Fitment warning present for `product-inquiry` and `rnr-inquiry` — exact phrasing, ALL CAPS
   - [ ] Correct descriptor — "tested" for all product types; "rebuilt" only for GM ABS 2000–2006
   - [ ] No R&R commitment — never "yes we can repair"; only "yes" when a replacement unit is confirmed in stock
   - [ ] One-liner "do you have X?" emails → part number asked first, no yes/no answer given

   **Inventory & part numbers**
   - [ ] `product-inquiry`: inventory CSV was searched before drafting — general product statements ("we carry tested ECUs") are fine; no specific part availability confirmed without a lookup
   - [ ] Dodge/Chrysler/Jeep part numbers: only the 8-digit number used for matching — prefix and suffix ignored
   - [ ] If customer provided no part number and product type requires a sticker photo (per `knowledge/product-types.md`) → customer was asked for a photo
   - [ ] If a listing link is included → uses `https://www.ebay.com/itm/{eBay Item Id}` format (eBay Item Id column, not internal Item Id)

   **Category completeness**
   - [ ] `rnr-inquiry`: all required info items present — 6 default, 8 for GEM (items 7–8 added)
   - [ ] `order-issue`: all required questions present — 7 default, with product-specific additions for PDC (items 8–9), TIPM (items 8–10), or GEM (item 5 replaced)
   - [ ] `rnr-inquiry`: diagnostic fee closing paragraph present
   - [ ] `order-issue`: no return committed in first reply

8. **Save the draft** — based on source:
   - **Gmail:** use `gmail_createDraft` (To: customer, Subject: Re: {original}, Body: draft text). Store both returned IDs.
   - **eBay:** save to `state/drafts.md` only — do NOT create a Gmail draft, do NOT apply Gmail labels.
   - **Mock:** save to `state/drafts.md` only.

9. **Append to `state/drafts.md`:**
   ```
   ## Draft: {Email ID}
   **To:** {customer email}
   **Subject:** Re: {original subject}
   **Status:** pending
   **Generated:** {YYYY-MM-DD}
   **Thread ID:** {thread_id or "N/A (eBay message)" or "N/A (mock)"}
   [Gmail only: **Gmail Draft ID:** {id}]
   [Gmail only: **Gmail Message ID:** {message.id}]
   [eBay only: **eBay Item ID:** {ItemID}]
   [eBay only: **eBay Reply:** Reply via eBay Messages — Item #{ItemID}, buyer: {sender}]

   ---
   {draft text}
   ---
   ```

10. **Update queue status** — set to `drafted` in `state/queue.md`.

11. **Gmail only:** Apply label `YPS/Drafted` to the original email.

12. **Display the draft:**

```
── Draft Generated ──

To:      {customer email}
Subject: Re: {original subject}
Source:  {Gmail | eBay | Mock}
Category: {category}

---
{draft text}
---

Saved to state/drafts.md.
Run /review to approve or edit, or /draft for the next email.
```

13. **Log to session file** — record which email was drafted, source, category, any corrections made during validation.

## Rules
- Only draft one email at a time
- Never send — drafts only
- Only one recipient per draft (no CC/BCC)
- Never change the original subject line (only prepend "Re: " if not already present)
- eBay and Mock drafts: save to state/drafts.md only — no Gmail draft, no Gmail labels
- If Gmail draft creation fails, still save to drafts.md and report the error
- Follow all Response Guardrails from CLAUDE.md
