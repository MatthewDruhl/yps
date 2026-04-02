# /ebay-scan — Scan eBay XML Messages for Product Inquiries

Parse `temp_ebay_messages.json` (output from the C# eBay API service), classify each message, and update the queue.

## Steps

1. **Read state files** — load `state/queue.md` to check what's already queued. Do not reprocess messages already listed (check by MessageId).

2. **Read `temp_ebay_messages.json`** — use the Read tool. If the file is missing or empty, stop and report the error to the operator.

3. **Parse each message object** and extract:
   - `Email ID` — value of `MessageId`
   - `From` — value of `Sender` (format as `{sender}@members.ebay.com`)
   - `Subject` — value of `Subject`
   - `Date Received` — date portion of `ReceiveDateUtc` (YYYY-MM-DD)
   - `NewMessages` — array of the buyer's new message(s), in chronological order
   - `Thread` — array of prior messages `{From, Body}`; use YPS entries (`"From": "yps"`) for context on what has already been said
   - `ItemTitle` — use for classification context

4. **Reading `NewMessages` and `Thread`:**
   - **`NewMessages`** is the buyer's input — address all items in this array when drafting
   - **`Thread`** buyer entries may duplicate content already in `NewMessages` — ignore buyer entries in `Thread`; only use `Thread` for `"From": "yps"` entries to understand what YPS has already said

5. **Skip already-processed messages** — check both `state/queue.md` and `state/archive.md` for the `MessageId`. Skip if found in either. Log each skipped message.

6. **Classify each new message** using `NewMessages` content and `ItemTitle` as context:
   - `product-inquiry` — customer asking about a part (availability, compatibility, pricing)
   - `rnr-inquiry` — customer asking about repair and return service (sending their unit in for repair)
   - `order-issue` — buyer reporting a problem with an existing order (install failure, defect, return/refund request, cancel request, shipping issue, modification request on purchased item)
   - `flagged` — not in English, spam, or doesn't match any known category

7. **Update `state/queue.md`** — add a row for each new message:
   - `product-inquiry` → status: `new`
   - `rnr-inquiry` → status: `new`
   - `order-issue` → status: `new`
   - Unclassifiable → status: `flagged` (note reason in session log)

8. **Display scan results:**

```
── eBay Scan Complete ──

Source: temp_ebay_messages.xml
Parsed: {total} messages ({skipped} already queued)

New:
  {x} product inquiries → queued
  {r} R&R inquiries → queued
  {y} order issues → queued
  {z} flagged → manual review needed

Queue now has {total} emails ({new} ready for /draft)
```

9. **Log to session file** — record scan time, file used, messages parsed, results count, any errors.

## Classification Guidelines

**Product inquiry signals (queue as `product-inquiry`):**
- Asks about a specific part (ECM, BCM, TIPM, ABS module, TCM, cluster, etc.)
- Mentions a vehicle year/make/model and needs a part
- Asks about compatibility, fitment, or programming
- Asks about availability or pricing for a part

**R&R inquiry signals (queue as `rnr-inquiry`):**
- Customer explicitly asks about sending their unit in for repair
- `ItemTitle` includes "REPAIR SERVICE"
- Customer uses terms like "repair", "rebuild", "send in", "repair and return", "can you fix"
- Customer is asking about the repair service process, not buying a replacement

**Order issue signals (queue as `order-issue`):**
- Buyer reports install failure or part not working after install
- Requests a return, refund, or exchange on a purchased item
- Requests cancellation of an existing order
- Asks about modifying or unlocking a purchased item
- Shipping damage or wrong item received

**Flag signals (mark as `flagged`):**
- Not in English
- Spam or promotional content
- General questions not related to auto parts
- Cannot determine intent

## Rules
- Max 10 messages per scan (process first 10 unprocessed message objects)
- Never reprocess messages already in queue.md or archive.md (match by MessageId)
- Use `ItemTitle` as additional classification context — it often reveals part type
- If the file cannot be parsed, stop and report — do not guess or partially process
- If classification is uncertain, flag rather than guess
- Log everything to the session file
