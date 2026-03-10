# /mock-draft — Draft Response to Queued Mock Email

Pick the next email from the mock queue, generate a response draft, and save it.

## Steps

1. **Read state files:**
   - `state/mock_queue.md` — find emails with status `new`
   - `state/mock_drafts.md` — check for existing drafts

2. **Select the next email** — pick the oldest `new` email from mock_queue.md. If no `new` emails exist, tell the operator and stop.

3. **Read knowledge files:**
   - `knowledge/product-inquiries/examples.md` — example emails and ideal responses
   - `knowledge/product-inquiries/product-info.md` — product catalog and specs
   - If either file is empty or has only placeholder content, warn the operator: "Knowledge files don't have real data yet — draft quality will be limited." Continue drafting but note the limitation.

4. **Read the original email** — Read the file with the Read tool with the Email ID from mock_queue.md. Extract:
   - Customer email address (From)
   - Subject line
   - Email body
   - Thread ID (for reply threading later)

5. **Update queue status** — set the email's status to `drafting` in `state/mock_queue.md`.

6. **Generate the draft response:**
   - Match the voice/tone from examples.md for the email's category
   - Only include information from product-info.md or the original email
   - If you don't have the answer to something the customer asked, say so honestly
   - Follow all Response Guardrails from CLAUDE.md
   - Never include: pricing (unless from product-info.md), commitments, other customer info, internal details, legal language

7. **Save the draft** to `state/mock_drafts.md`:
   ```
   ## Draft: {Email ID}
   **To:** {customer email}
   **Subject:** Re: {original subject}
   **Status:** pending
   **Generated:** {YYYY-MM-DD}
   **Thread ID:** {thread_id}

   ---
   {draft text}
   ---
   ```

8. **Save draft to Gmail** — create a mock_draft:
   - To: customer email address
   - Subject: Re: {original subject}
   - Body: the draft text
   - Thread ID: from the original email (for reply threading)

9. **Update mock_queue status** — set the email's status to `drafted` in `state/mock_queue.md`.

10. **Apply Mock label** `YPS/Mock_Drafted` to the original email.

11. **Display the draft:**

```
── Draft Generated ──

To: {customer email}
Subject: Re: {original subject}
Category: {category}

---
{draft text}
---

Saved to Gmail drafts and state/drafts.md.
Run /review to approve or edit, or /draft for the next email.
```

12. **Log to session file** — record which email was drafted, category, any warnings.

## Rules
- Only draft one email at a time
- Never send — drafts only
- Only one recipient per draft (no CC/BCC)
- Never change the original subject line (only prepend "Re: " if not already present)
- If the original email can't be retrieved, mark as `skipped` in queue.md and move on
- If Gmail draft creation fails, still save to drafts.md and report the error
- Follow all Response Guardrails from CLAUDE.md
