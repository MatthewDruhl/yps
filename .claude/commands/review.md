# /review — Review Pending Drafts

Present drafted responses for operator review. Handle approvals, edits, and rejections.

Source is detected from the Email ID in each draft block:
- **Hex ID** → Gmail draft (has Gmail Draft ID / Message ID)
- **Numeric ID** → eBay draft (reply via eBay Messages)
- **Filename ID** → Mock draft (local only)

## Steps

1. **Read state files:**
   - `state/drafts.md` — find drafts with status `pending`
   - `state/queue.md` — check for any `flagged` emails

2. **Check for flagged emails** — if any exist, notify the operator first:
   ```
   ⚠ Flagged emails need manual attention:
   - {Email ID}: {Subject} — {reason}
   ```

3. **If no pending drafts**, tell the operator and stop.

4. **Present each pending draft** one at a time:

```
── Review Draft ({n} of {total}) ──

To:       {customer email}
Subject:  Re: {original subject}
Source:   {Gmail | eBay | Mock}
Category: {category}
Generated: {date}

---
{draft text}
---

Options:
  approve  — mark as approved, ready to send
  edit     — provide edited version
  reject   — discard this draft
  skip     — review later
```

5. **Handle operator response:**

   **approve** — Update draft status to `approved` in drafts.md.
   - Gmail drafts: will be available to send via `/send`
   - eBay/Mock drafts: mark approved for reference — reply manually via eBay or mock channel

   **edit** — Operator provides edited text:
   - Replace the draft text in drafts.md with the edited version
   - Gmail only: delete the old Gmail draft and create a new one with edited text (update both IDs)
   - Update draft status to `approved`
   - Log the edit to `state/feedback.md`:
     ```
     ## {YYYY-MM-DD} | {Subject}
     **Original draft:**
     > {what Claude wrote}

     **Owner's edit:**
     > {what the operator changed it to}

     **What changed:**
     - {bullet list of differences}
     ```

   **reject** — Delete the draft block from drafts.md. Update queue.md status to `new` so it can be re-drafted.
   - Gmail only: delete the Gmail draft.

   **skip** — Leave as `pending`, move to the next draft.

6. **After all drafts reviewed, show summary:**

```
── Review Complete ──

Approved: {n}
Edited:   {n} (logged to feedback.md)
Rejected: {n} (returned to queue)
Skipped:  {n}
```

7. **Log to session file** — record each review action.

## Rules
- Present one draft at a time — never batch-approve
- When edits are made, always log to feedback.md (this powers future learning)
- When comparing original vs edit, identify specific changes (tone shifts, added info, removed content, phrasing changes)
- Gmail: never modify a Gmail draft — always delete and recreate
- eBay/Mock: no Gmail operations — only update drafts.md
- If an email was rejected, reset its queue status to `new` for re-drafting
