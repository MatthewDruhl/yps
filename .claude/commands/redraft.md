# /redraft — Re-Draft Email(s)

Discard existing draft(s) and generate new ones from the live queue.

Source is detected from the Email ID format:
- **Hex ID** → Gmail (has Gmail Draft ID / Message ID to delete)
- **Numeric ID** → eBay (body from `temp_ebay_messages.xml`)
- **Filename ID** → Mock (body from `mock_email/Inbox/{id}`)

## Usage
```
/redraft                     → discard and re-draft ALL pending/approved drafts
/redraft 19ce3892a86cd7a8   → discard and re-draft one specific email
```

## Steps

### If no argument — Re-draft ALL

1. **Read state files:**
   - `state/queue.md` — collect all emails with status `drafted`
   - `state/drafts.md` — full file will be replaced

2. **Delete Gmail drafts** — for each Gmail draft block (hex ID) in `state/drafts.md`:
   - If `**Gmail Message ID:**` exists, call `gmail_modify` with `addLabelIds: ["TRASH"]`
   - If only `**Gmail Draft ID:**` exists (no message ID), log that it cannot be auto-deleted and notify operator
   - Continue even if deletion fails

3. **Clear `state/drafts.md`** — reset to empty schema (header only). Keep the file, remove all draft blocks.

4. **Reset all `drafted` entries** in `state/queue.md` to status `new`.

5. **Read knowledge files** once per category present in the batch:
   - `product-inquiry`: `knowledge/product-types.md`, `knowledge/product-inquiries/examples.md`, `knowledge/product-inquiries/product-info.md`
   - `rnr-inquiry`: `knowledge/product-types.md`, `knowledge/rnr-inquiries/examples.md`, `knowledge/rnr-inquiries/rnr-info.md`
   - `order-issue`: `knowledge/order-issues/order-info.md`

6. **For each email (oldest first),** run steps 7–11 below.

---

### If email ID provided — Re-draft one

1. **Read state files:**
   - `state/queue.md` — confirm the email exists with status `drafted`
   - `state/drafts.md` — locate the draft block to remove
   - If not found or status is not `drafted`, stop and tell the operator

2. **Gmail only:** If `**Gmail Message ID:**` exists, call `gmail_modify` with `addLabelIds: ["TRASH"]`

3. **Remove the draft block** from `state/drafts.md` (header through closing `---`).

4. **Reset queue status** to `new` in `state/queue.md`.

5. **Read knowledge files** (only those needed for this email's category).

6. **Process the single email** using steps 7–11 below.

---

### Per-email draft steps (7–11)

7. **Read the original email** — based on source:
   - **Gmail:** use `gmail_get` with the Email ID. Extract: From, Subject, Body, Thread ID.
   - **eBay:** read `temp_ebay_messages.xml`, find matching `<Message>`. Extract: Sender, Subject, Text, ItemID, Title.
   - **Mock:** read `mock_email/Inbox/{Email ID}`. Extract: From, Subject, Body.
   - If not retrievable, mark as `skipped` in queue.md and move on.

8. **Set queue status to `drafting`** in `state/queue.md`.

9. **Generate the new draft response:**
   - Match voice/tone from examples.md
   - Only include information from product-types.md, product-info.md, order-info.md, or the original email
   - Follow all Response Guardrails from CLAUDE.md

10. **Save the draft** — based on source:
    - **Gmail:** use `gmail_createDraft`. Store both returned IDs.
    - **eBay / Mock:** save to `state/drafts.md` only.

11. **Append to `state/drafts.md`:**
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
    Then set queue status to `drafted` in `state/queue.md`.

---

### After all drafts are generated

12. **Display summary:**

```
── Re-Draft Complete ──

Re-drafted: {n} email(s)
  {list each: Email ID — Subject}

Gmail drafts deleted: {n}
Gmail drafts requiring manual deletion: {list any that had no message ID}

Run /review to approve or edit.
```

13. **Log to session file** — record which emails were re-drafted, which Gmail drafts were deleted, and any failures.

## Rules
- Always attempt to delete old Gmail draft before saving new one
- Never send — drafts only
- Only one recipient per draft (no CC/BCC)
- Never change the original subject line (only prepend "Re: " if not already present)
- eBay/Mock: no Gmail operations
- If source fetch fails for an email, mark as `skipped` in queue.md and move on
- Follow all Response Guardrails from CLAUDE.md
