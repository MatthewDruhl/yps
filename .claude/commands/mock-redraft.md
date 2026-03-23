# /mock-redraft — Re-Draft Mock Email(s)

Discard existing draft(s) and generate new ones.

## Usage
```
/mock-redraft                  → discard ALL drafts, re-draft every drafted email
/mock-redraft mock_email2.md   → discard and re-draft one specific email
```

## Steps

### If no argument — Re-draft ALL

1. **Read state files:**
   - `state/mock_queue.md` — collect all emails with status `drafted`
   - `state/mock_drafts.md` — full file will be replaced

2. **Clear `state/mock_drafts.md`** — reset to empty schema (header only). Keep the file, remove all draft blocks.

3. **Reset all `drafted` entries** in `state/mock_queue.md` to status `new`.

4. **Read knowledge files** once (reuse for all emails):
   - `knowledge/product-types.md`
   - `knowledge/product-inquiries/examples.md`
   - `knowledge/product-inquiries/product-info.md`
   - `knowledge/order-issues/order-info.md`
   - Warn if any is empty or placeholder-only, but continue

5. **For each email (oldest first),** repeat steps 6–9 below.

---

### If email ID provided — Re-draft one

1. **Read state files:**
   - `state/mock_queue.md` — confirm the email exists with status `drafted`
   - `state/mock_drafts.md` — locate the draft block to remove
   - If not found or status is not `drafted`, stop and tell the operator

2. **Delete the existing draft block** from `state/mock_drafts.md`:
   - Remove the entire `## Draft: {Email ID}` block (header through closing `---`)
   - Never modify any other drafts in the file

3. **Reset queue status** to `new` in `state/mock_queue.md`.

4. **Read knowledge files:**
   - `knowledge/product-inquiries/examples.md`
   - `knowledge/product-inquiries/product-info.md`

5. **Process the single email** using steps 6–9 below.

---

### Per-email draft steps (6–9)

6. **Read the original email** from `mock_email/Inbox/{Email ID}`. Extract:
   - Customer email address (From)
   - Subject line
   - Email body

7. **Set queue status to `drafting`** in `state/mock_queue.md`.

8. **Generate the new draft response:**
   - Match voice/tone from examples.md
   - Only include information from product-info.md or the original email
   - Follow all Response Guardrails from CLAUDE.md
   - Never include: pricing (unless from product-info.md), commitments, other customer info, internal details, legal language

9. **Append the new draft** to `state/mock_drafts.md`:
   ```
   ## Draft: {Email ID}
   **To:** {customer email}
   **Subject:** Re: {original subject}
   **Status:** pending
   **Generated:** {YYYY-MM-DD}
   **Thread ID:** N/A (mock)

   ---
   {draft text}
   ---
   ```
   Then **set queue status to `drafted`** in `state/mock_queue.md`.

---

### After all drafts are generated

10. **Display summary:**

```
── Re-Draft Complete ──

Re-drafted: {n} email(s)
  {list each: Email ID — Subject}

Run /mock-review to approve or edit.
```

11. **Log to session file** — record which emails were re-drafted.

## Rules
- Always delete old draft(s) before saving new ones
- Never send — drafts only
- Only one recipient per draft (no CC/BCC)
- Never change the original subject line (only prepend "Re: " if not already present)
- Follow all Response Guardrails from CLAUDE.md
