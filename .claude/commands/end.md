# /end — End Session

Summarize the session, save the log, and update state.

## Steps

1. **Read all state files** to get current counts:
   - `state/queue.md`
   - `state/drafts.md`
   - `state/archive.md`
   - `state/feedback.md`

2. **Display session summary:**

```
── Session Summary: {YYYY-MM-DD} ──

Actions this session:
  Scanned:  {n} emails
  Drafted:  {n} responses
  Reviewed: {n} drafts ({x} approved, {y} edited, {z} rejected)
  Sent:     {n} emails

Current state:
  Queue:    {n} emails ({breakdown by status})
  Drafts:   {n} pending review
  Archive:  {n} total completed

Feedback entries this session: {n}
```

3. **Finalize session log** — append closing block to `sessions/{YYYY-MM-DD}.md`:
```
## Session ended: {HH:MM}
### Summary
- Scanned: {n}
- Drafted: {n}
- Reviewed: {n}
- Sent: {n}
- Errors: {n}

### Open items
- {list any emails still in new/drafting/pending status}

### Notes
- {any flagged emails, errors, or issues encountered}
---
```

4. **Clean up eBay message images** — run the cleanup script:
   ```
   powershell -File scripts/cleanup-images.ps1
   ```
   Log the output (folders removed or "nothing to clean up"). If the script fails, log the error but continue — do not stop the session.

5. **Update `state/drafts.md` timestamp** — set "Last updated" to today.

6. **Confirm end:**
```
Session saved to sessions/{YYYY-MM-DD}.md
State files are up to date. See you next time.
```

## Rules
- Do NOT modify queue.md or archive.md — just read for summary
- Update the "Last updated" timestamp on drafts.md only
- If the session log doesn't exist yet (operator ran /end without /yps), create it with just the summary
- Be accurate in counts — read state files, don't estimate
