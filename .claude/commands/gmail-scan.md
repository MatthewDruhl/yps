# /gmail-scan — Scan Gmail Inbox for Product Inquiries

Search Gmail for new customer emails, classify them, and update the queue.

## Steps

1. **Read state files** — load `state/queue.md` to check what's already queued. Do not reprocess emails already in the queue.

2. **Search Gmail** using `search_gmail_messages`:
   - Query: `is:unread -label:YPS/Queued -label:YPS/Drafted -label:YPS/Sent newer_than:7d`
   - Max results: 10 (batch limit)

3. **Ensure Gmail labels exist** — use `list_gmail_labels` to check. If any are missing, create them with `manage_gmail_label`:
   - `YPS/Queued`
   - `YPS/Drafted`
   - `YPS/Sent`

4. **Classify each email:**
   - Read the email subject first for quick filtering
   - Read the full body with `get_gmail_message_content` for any email that isn't obvious spam
   - Classify as one of:
     - `product-inquiry` — customer asking about a part (availability, compatibility, pricing)
     - `rnr-inquiry` — customer asking about repair and return service (sending their unit in for repair)
     - `order-issue` — buyer reporting a problem with an existing order (install failure, defect, return/refund request, cancel request, shipping issue, modification request on purchased item)
     - `flagged` — not in English, spam, or doesn't match any known category

5. **For each classified email, update `state/queue.md`:**
   - Add a row with: Email ID, From, Subject, Date Received, Category, Status
   - `product-inquiry` → status: `new`
   - `rnr-inquiry` → status: `new`
   - `order-issue` → status: `new`
   - Unclassifiable → status: `flagged` (with note in session log)

6. **Apply label** `YPS/Queued` to each processed email using `modify_gmail_message_labels`.

7. **Display scan results:**

```
── Gmail Scan Complete ──

Found: {n} new emails
  {x} product inquiries → queued
  {r} R&R inquiries → queued
  {y} order issues → queued
  {z} flagged → manual review needed

Queue now has {total} emails ({new} ready for /draft)
```

8. **Log to session file** — record scan time, query used, results count, any errors.

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

**Flag signals (mark as `flagged`):**
- Not in English
- Spam or promotional content
- General questions not related to auto parts
- Complaints or disputes (escalate to owners)
- Cannot determine intent

## Rules
- Max 10 emails per scan
- Never reprocess emails already in queue.md (check Email ID)
- Never reprocess emails with YPS/* labels
- If process fails, stop and report the error — do not retry
- If classification is uncertain, flag rather than guess
- Log everything to the session file
