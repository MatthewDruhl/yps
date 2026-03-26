# /ebay-scan — Scan eBay XML Messages for Product Inquiries

Parse `temp_ebay_messages.xml` (GetMyMessages API output), classify each message, and update the queue.

## Steps

1. **Read state files** — load `state/queue.md` to check what's already queued. Do not reprocess messages already listed (check by MessageID).

2. **Read `temp_ebay_messages.xml`** — use the Read tool. If the file is missing or empty, stop and report the error to the operator.

3. **Parse each `<Message>` block** and extract:
   - `Email ID` — value of `<MessageID>`
   - `From` — value of `<Sender>` (treat as eBay username; format as `{sender}@members.ebay.com` if no `@` present)
   - `Subject` — value of `<Subject>`
   - `Date Received` — value of `<ReceiveDate>` (date portion only: YYYY-MM-DD)
   - `Body` — value of `<Text>`
   - `Item Title` — value of `<Item><Title>` (use for classification context)
   - `Read` — value of `<Read>` (note in session log if already read)

4. **Skip messages already in `state/queue.md`** — match by `Email ID` (MessageID). Log each skipped message.

5. **Classify each new message:**
   - `product-inquiry` — customer asking about a part (availability, compatibility, pricing, repair service)
   - `order-issue` — buyer reporting a problem with an existing order (install failure, defect, return/refund request, cancel request, shipping issue, modification request on purchased item)
   - `flagged` — not in English, spam, or doesn't match any known category

6. **Update `state/queue.md`** — add a row for each new message:
   - `product-inquiry` → status: `new`
   - `order-issue` → status: `new`
   - Unclassifiable → status: `flagged` (note reason in session log)

7. **Display scan results:**

```
── eBay Scan Complete ──

Source: temp_ebay_messages.xml
Parsed: {total} messages ({skipped} already queued)

New:
  {x} product inquiries → queued
  {y} order issues → queued
  {z} flagged → manual review needed

Queue now has {total} emails ({new} ready for /draft)
```

8. **Log to session file** — record scan time, file used, messages parsed, results count, any errors.

## Classification Guidelines

**Product inquiry signals (queue as `product-inquiry`):**
- Asks about a specific part (ECM, BCM, TIPM, ABS module, TCM, cluster, etc.)
- Mentions a vehicle year/make/model and needs a part
- Asks about repair-and-return service
- Asks about compatibility or fitment
- Asks about availability or pricing for a part

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
- Max 10 messages per scan (process first 10 unprocessed `<Message>` blocks)
- Never reprocess messages already in queue.md (match by MessageID)
- Use `<Item><Title>` as additional classification context — it often reveals part type
- If the XML cannot be parsed, stop and report — do not guess or partially process
- If classification is uncertain, flag rather than guess
- Log everything to the session file
