# /redraft — Re-Draft Email(s)

Discard existing Gmail draft(s) and generate new ones from the live queue.

## Usage
```
/redraft                     → discard and re-draft ALL drafted emails
/redraft 19ce3892a86cd7a8   → discard and re-draft one specific email
```

## Steps

### If no argument — Re-draft ALL

1. **Read state files:**
   - `state/queue.md` — collect all emails with status `drafted`
   - `state/drafts.md` — full file will be replaced

2. **Delete each Gmail draft** — for each draft block in `state/drafts.md`:
   - If a `**Gmail Message ID:**` field exists, call `gmail_modify` with `addLabelIds: ["TRASH"]` on that message ID
   - If only `**Gmail Draft ID:**` is present (no message ID), log that it cannot be auto-deleted and notify operator
   - Continue even if deletion fails — log the error and proceed

3. **Clear `state/drafts.md`** — reset to empty schema (header only). Keep the file, remove all draft blocks.

4. **Reset all `drafted` entries** in `state/queue.md` to status `new`.

5. **Read knowledge files** once (reuse for all emails):
   - `knowledge/product-inquiries/examples.md`
   - `knowledge/product-inquiries/product-info.md`
   - Warn if either is empty or placeholder-only, but continue

6. **For each email (oldest first),** repeat steps 7–11 below.

---

### If email ID provided — Re-draft one

1. **Read state files:**
   - `state/queue.md` — confirm the email exists with status `drafted`
   - `state/drafts.md` — locate the draft block to remove
   - If not found or status is not `drafted`, stop and tell the operator

2. **Delete the Gmail draft:**
   - If `**Gmail Message ID:**` field exists in the draft block, call `gmail_modify` with `addLabelIds: ["TRASH"]` on that message ID
   - If only `**Gmail Draft ID:**` is present, log that it cannot be auto-deleted and notify operator
   - Continue even if deletion fails

3. **Delete the draft block** from `state/drafts.md`:
   - Remove the entire `## Draft: {Email ID}` block (header through closing `---`)
   - Never modify any other drafts in the file

4. **Reset queue status** to `new` in `state/queue.md`.

5. **Read knowledge files:**
   - `knowledge/product-inquiries/examples.md`
   - `knowledge/product-inquiries/product-info.md`

6. **Process the single email** using steps 7–11 below.

---

### Per-email draft steps (7–11)

7. **Fetch the original email** from Gmail using `gmail_get` with the Email ID. Extract:
   - Customer email address (From)
   - Subject line
   - Email body
   - Thread ID

8. **Set queue status to `drafting`** in `state/queue.md`.

9. **Generate the new draft response:**
   - Match voice/tone from examples.md
   - Only include information from product-info.md or the original email
   - Follow all Response Guardrails from CLAUDE.md
   - Never include: pricing (unless from product-info.md), commitments, other customer info, internal details, legal language

10. **Save the draft to Gmail** using `gmail_createDraft`:
    - To: customer email address
    - Subject: Re: {original subject}
    - Body: draft text only (no quoted original)

11. **Append the new draft** to `state/drafts.md`:
    ```
    ## Draft: {Email ID}
    **To:** {customer email}
    **Subject:** Re: {original subject}
    **Status:** pending
    **Generated:** {YYYY-MM-DD}
    **Thread ID:** {thread_id}
    **Gmail Draft ID:** {draft_id from createDraft response}
    **Gmail Message ID:** {message.id from createDraft response}

    ---
    {draft text}
    ---
    ```
    Then **set queue status to `drafted`** in `state/queue.md`.

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
- If Gmail fetch fails for an email, mark as `skipped` in queue.md and move on
- Follow all Response Guardrails from CLAUDE.md

## Note on Gmail Message ID vs Draft ID
- `Gmail Draft ID` (r-...) — used for sending via `gmail_sendDraft`
- `Gmail Message ID` (hex) — used for label modification and deletion via `gmail_modify`
- Both are returned by `gmail_createDraft` — always store both in drafts.md
