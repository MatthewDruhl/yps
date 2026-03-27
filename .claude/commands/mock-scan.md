# /mock-scan — Scan mock_email\Inbox for Product Inquiries

Search `mock_email/Inbox/` for new customer emails, classify them, and update the queue.

## Steps

1. **Read state files** — load `state/queue.md` to check what's already queued. Do not reprocess emails already listed (check by filename used as Email ID).

2. **List files in `mock_email/Inbox/`** — use the Glob tool with pattern `mock_email/Inbox/*.md`. Max 10 files per scan.

3. **For each file not already in queue.md:**
   - Read the file with the Read tool
   - Extract: From, Subject, Date, and Body from the file contents
   - Use the filename (e.g. `mock_product_inquiry_1.md`) as the Email ID

4. **Classify each email:**
   - `product-inquiry` — customer asking about a part (availability, compatibility, pricing)
   - `rnr-inquiry` — customer asking about repair and return service (sending their unit in for repair)
   - `order-issue` — buyer reporting a problem with an existing order (install failure, defect, return/refund request, cancel request, shipping issue, modification request on purchased item)
   - `flagged` — not in English, spam, or doesn't match any known category

5. **Update `state/queue.md`** — add a row for each email:
   - Email ID: filename (e.g. `mock_product_inquiry_1.md`)
   - From, Subject, Date Received, Category, Status
   - `product-inquiry` → status: `new`
   - `rnr-inquiry` → status: `new`
   - `order-issue` → status: `new`
   - Unclassifiable → status: `flagged` (note reason in session log)

6. **Display scan results:**

```
── Mock Scan Complete ──

Found: {n} new emails
  {x} product inquiries → queued
  {r} R&R inquiries → queued
  {y} order issues → queued
  {z} flagged → manual review needed

Queue now has {total} emails ({new} ready for /draft)
```

7. **Log to session file** — record scan time, files found, results count, any errors.

## Classification Guidelines

**Product inquiry signals (queue as `product-inquiry`):**
- Asks about a specific part (ECM, BCM, TIPM, ABS module, TCM, cluster, etc.)
- Mentions a vehicle year/make/model and needs a part
- Asks about compatibility or fitment
- Asks about availability or pricing for a part

**R&R inquiry signals (queue as `rnr-inquiry`):**
- Customer explicitly asks about sending their unit in for repair
- Listing title includes "REPAIR SERVICE"
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
- Max 10 emails per scan
- Never reprocess emails already in queue.md (match by Email ID / filename)
- If a file can't be read or parsed, log the error and skip — do not stop the whole scan
- If classification is uncertain, flag rather than guess
- Log everything to the session file
