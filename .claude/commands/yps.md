# /yps — Start Session

Start a new YPS email session. Read current state and show a summary.

## Steps

1. **Get today's date** and create/open the session log at `sessions/{YYYY-MM-DD}.md`. If the file already exists, append a new session block (don't overwrite).

2. **Read all state files:**
   - `state/queue.md`
   - `state/drafts.md`
   - `state/archive.md`
   - `state/feedback.md`

   If any state file is missing, recreate it using the empty schema from CLAUDE.md and note this in the session log.

3. **Display session summary:**

```
── YPS Session: {YYYY-MM-DD} ──

Queue:     {n} emails ({x} new, {y} drafting, {z} drafted, {w} flagged)
Drafts:    {n} pending review
Archive:   {n} completed
Feedback:  {n} logged edits

Ready. Commands: /scan /draft /review /send /end
```

4. **Log session start** to `sessions/{YYYY-MM-DD}.md`:
```
## Session started: {HH:MM}
- Queue: {summary}
- Drafts: {summary}
```

## Rules
- Do NOT scan the inbox automatically — wait for `/scan`
- Do NOT modify any state files — this is read-only
- If state files have parsing issues, report them to the operator (don't auto-fix)
