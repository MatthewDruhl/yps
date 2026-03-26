# /ebay-draft — Draft Response to Queued eBay Message

Pick the next eBay message from the queue, generate a response draft, and save it to drafts.md.

eBay messages are identified by a numeric MessageID (e.g. `1000000001`) rather than a Gmail hex ID. The email body is read from `temp_ebay_messages.xml` — not from Gmail.

## Steps

1. **Read state files:**
   - `state/queue.md` — find eBay emails with status `new`. eBay messages have numeric MessageIDs (all digits). Skip any hex-format IDs — those belong to `/draft`.
   - `state/drafts.md` — check for existing drafts to avoid duplicates.

2. **Select the next eBay email** — pick the oldest `new` eBay message from queue.md. If none exist, tell the operator and stop.

3. **Read knowledge files:**
   - `knowledge/product-types.md` — authoritative product line reference (R&R eligibility, install questions, sticker images, draft rules)
   - `knowledge/product-inquiries/examples.md` — example emails and ideal responses
   - `knowledge/product-inquiries/product-info.md` — product catalog and specs
   - `knowledge/order-issues/order-info.md` — order-issue templates and guidelines
   - If any file is empty or has only placeholder content, warn the operator and continue with a note.

4. **Read the original message from `temp_ebay_messages.xml`** — find the `<Message>` block where `<MessageID>` matches the Email ID. Extract:
   - `<Sender>` — eBay username
   - `<Subject>` — message subject
   - `<Text>` — message body
   - `<Item><ItemID>` — eBay listing ID
   - `<Item><Title>` — listing title (use as context for drafting)

   If `temp_ebay_messages.xml` is missing or the MessageID is not found, mark the email as `skipped` in queue.md with a reason and stop.

5. **Update queue status** — set the email's status to `drafting` in `state/queue.md`.

6. **Generate the draft response:**
   - Match the voice/tone from examples.md for the email's category
   - Only include information from product-types.md, product-info.md, order-info.md, or the original message
   - Use `<Item><Title>` to infer part type when the message body is vague
   - If you don't have the answer to something the customer asked, say so honestly
   - Follow all Response Guardrails from CLAUDE.md
   - Never include: pricing (unless from product-info.md), commitments, other customer info, internal details, legal language

7. **Save the draft to `state/drafts.md`:**
   ```
   ## Draft: {MessageID}
   **To:** {sender}@members.ebay.com
   **Subject:** Re: {original subject}
   **Status:** pending
   **Generated:** {YYYY-MM-DD}
   **Thread ID:** N/A (eBay message)
   **eBay Item ID:** {ItemID}
   **eBay Reply:** Reply via eBay Messages — Item #{ItemID}, buyer: {sender}

   ---
   {draft text}
   ---
   ```

8. **Update queue status** — set the email's status to `drafted` in `state/queue.md`.

9. **Display the draft:**

```
── eBay Draft Generated ──

To:       {sender} (eBay)
Subject:  Re: {original subject}
Category: {category}
Item:     #{ItemID} — {Item Title}

---
{draft text}
---

Saved to state/drafts.md.
Reply via eBay Messages — do NOT reply via Gmail.
Run /review to approve or edit, or /ebay-draft for the next message.
```

10. **Log to session file** — record which message was drafted, category, item ID, any warnings.

## Rules
- Only draft one message at a time
- Never send — drafts only
- Only one recipient per draft (no CC/BCC)
- Never change the original subject line (only prepend "Re: " if not already present)
- Do NOT create a Gmail draft — eBay messages must be replied to via eBay's messaging system
- Do NOT apply Gmail labels — these messages are not in Gmail
- If the message body can't be retrieved from the XML, mark as `skipped` and move on
- Follow all Response Guardrails from CLAUDE.md
