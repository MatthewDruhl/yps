# /gmail-send — Send Approved Gmail Drafts

Send approved Gmail drafts as replies to customers. Requires explicit operator confirmation for each email.

## ⚠ PHASE CHECK
**This command is DISABLED until Phase 5.**
If the operator runs `/gmail-send` before Phase 5, respond:
```
/gmail-send is not available yet — we're still in Draft-Only Mode.
Approved drafts are saved in Gmail drafts for manual sending.
```
And stop. Do not proceed with the steps below.

---

## Steps (Phase 5+ only)

1. **Read state files:**
   - `state/drafts.md` — find drafts with status `approved`
   - `state/queue.md` — for updating after send

2. **If no approved drafts**, tell the operator and stop.

3. **Present each approved draft** one at a time for send confirmation:

```
── Ready to Send ({n} of {total}) ──

To:      {customer email}
Subject: Re: {original subject}

---
{draft text}
---

Type "yes" to send, or "skip" to hold.
```

4. **Wait for explicit "yes"** — only the word "yes" triggers a send. Anything else skips.

5. **On "yes":**
   - Send the email as a threaded reply using the stored Thread ID
   - Apply Gmail label `YPS/Sent` to the original email
   - Remove `YPS/Drafted` label
   - Update draft status to `sent` in drafts.md
   - Update queue.md status to `sent`
   - Move the row from queue.md to archive.md with Final Status: `sent`

6. **On "skip":** Leave the draft as `approved` for next time.

7. **After all drafts processed, show summary:**

```
── Gmail Send Complete ──

Sent:    {n}
Skipped: {n}
```

8. **Log to session file** — record each send action with timestamp, recipient, subject.

## Rules
- ONE email at a time — never batch-send
- Require explicit "yes" for each send — no shortcuts
- Never auto-send without human confirmation
- Keep the email thread intact (use Thread ID for reply)
- Only one recipient per email (no CC/BCC)
- If send fails, report the error and keep the draft as `approved`
- Log everything to the session file
