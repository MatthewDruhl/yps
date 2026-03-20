# /yps — Start Session

Start a new YPS email session. Read current state and show a summary.

## Steps

1. **Get today's date** and create/open the session log at `sessions/{YYYY-MM-DD}.md`. If the file already exists, append a new session block (don't overwrite).

2. **Download inventory file** from Google Drive:
   - File ID: `1PHnY1AZZtZD1XYDRA5XJyzYY3UlHm38a` (LChecks.csv in the Inventory folder)
   - Save to: `temp_inventory.csv` in the yps workspace
   - If the download fails, log the error and continue — do not stop the session
   - Note the result (success or failure) in the session log

3. **Read all state files:**
   - `state/queue.md`
   - `state/drafts.md`
   - `state/mock_queue.md`
   - `state/mock_drafts.md`
   - `state/archive.md`
   - `state/feedback.md`

   If any state file is missing, recreate it using the empty schema from CLAUDE.md and note this in the session log.

4. **Display session summary:**

```
── YPS Session: {YYYY-MM-DD} ──

Queue:     {n} emails ({x} new, {y} drafting, {z} drafted, {w} flagged)
Drafts:    {n} pending review
Archive:   {n} completed
Feedback:  {n} logged edits

Ready. Commands: /scan /draft /redraft /review /send /end
```

5. **Log session start** to `sessions/{YYYY-MM-DD}.md`:
```
## Session started: {HH:MM}
- Queue: {summary}
- Drafts: {summary}
```

## Rules
- Do NOT scan the inbox automatically — wait for `/scan`
- Do NOT modify any state files — this is read-only
- If state files have parsing issues, report them to the operator (don't auto-fix)
