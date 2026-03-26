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

3. **Read knowledge files:**
   - `knowledge/product-types.md` — authoritative product line reference
   - `knowledge/product-inquiries/examples.md` — example emails and ideal responses
   - `knowledge/product-inquiries/product-info.md` — product catalog and specs
   - `knowledge/order-issues/order-info.md` — order-issue templates and guidelines
   - Warn if any file is empty or placeholder-only, but continue.

4. **Read the original email** — based on source:
   - **Gmail:** use `gmail_get` with the Email ID. Extract: From, Subject, Body, Thread ID.
   - **eBay:** read `temp_ebay_messages.xml`, find `<Message>` where `<MessageID>` matches. Extract: Sender, Subject, Text, ItemID, Item Title.
   - **Mock:** read `mock_email/Inbox/{Email ID}`. Extract: From, Subject, Body.
   - If the source file/message can't be retrieved, mark as `skipped` in queue.md with a reason and stop.

5. **Update queue status** — set to `drafting` in `state/queue.md`.

6. **Generate the draft response:**
   - Match voice/tone from examples.md for the email's category
   - Only include information from product-types.md, product-info.md, order-info.md, or the original email
   - If you don't have the answer, say so honestly
   - Follow all Response Guardrails from CLAUDE.md
   - Never include: pricing (unless from product-info.md), commitments, other customer info, internal details, legal language

7. **Save the draft** — based on source:
   - **Gmail:** use `gmail_createDraft` (To: customer, Subject: Re: {original}, Body: draft text). Store both returned IDs.
   - **eBay:** save to `state/drafts.md` only — do NOT create a Gmail draft, do NOT apply Gmail labels.
   - **Mock:** save to `state/drafts.md` only.

8. **Append to `state/drafts.md`:**
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

9. **Update queue status** — set to `drafted` in `state/queue.md`.

10. **Gmail only:** Apply label `YPS/Drafted` to the original email.

11. **Display the draft:**

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

12. **Log to session file** — record which email was drafted, source, category, any warnings.

## Rules
- Only draft one email at a time
- Never send — drafts only
- Only one recipient per draft (no CC/BCC)
- Never change the original subject line (only prepend "Re: " if not already present)
- eBay and Mock drafts: save to state/drafts.md only — no Gmail draft, no Gmail labels
- If Gmail draft creation fails, still save to drafts.md and report the error
- Follow all Response Guardrails from CLAUDE.md
