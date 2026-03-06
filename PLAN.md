# YPS Email Response System — Updated Plan

## Context

Matt is helping friends set up an automated email response system for their business, YPS. The system drafts responses to customer product inquiry emails using AI, with mandatory human review before sending. Matt runs it initially, hands off to business owners later.

## Decisions Made

- **Gmail**: YPS business Gmail (Google Workspace)
- **Operator**: Matt runs it first, trains owners for handoff later
- **v1 Scope**: Single replies only (no multi-message threads)
- **Feedback**: Option A — just log edits to feedback.md. No auto-learning in v1.
- **Example emails**: Not yet received from business owners (blocker for testing)
- **Business details**: Still needed from owners (products, pricing, policies)

## What's Blocking

1. **Example emails + responses** from owners — can't test drafting without these
2. **Business context** — product names, specs, pricing, policies needed for CLAUDE.md and product-info.md
3. **YPS Gmail OAuth credentials** — needed to connect Gmail MCP

**We CAN build the full scaffold (structure, commands, skills, state files) without these. Testing requires them.**

---

## Updated Project Structure

```
~/yps/
├── CLAUDE.md                         # Core instructions
├── PLAN.md                           # This plan (reference)
├── SETUP.md                          # Non-technical usage guide (post-v1)
├── .env                              # OAuth secrets (not in git)
├── .env.example                      # Template for .env
├── .gitignore
├── .claude/
│   ├── settings.local.json           # MCP permissions (Gmail access)
│   └── commands/
│       ├── yps.md                    # /yps - Start session, scan inbox, show status
│       ├── scan.md                   # /scan - Scan for new product inquiries
│       ├── draft.md                  # /draft - Draft response to a queued email
│       ├── review.md                 # /review - Review pending drafts
│       ├── send.md                   # /send - Send approved drafts
│       └── end.md                    # /end - End session, save log
├── knowledge/
│   ├── product-inquiries/
│   │   ├── examples.md              # Example customer emails + ideal responses
│   │   └── product-info.md          # Product catalog, specs, pricing
│   └── _template/
│       └── examples-template.md     # Template for adding new categories
├── skills/
│   ├── inbox-scanner/
│   │   └── SKILL.md                 # Classify incoming emails by category
│   └── response-drafter/
│       └── SKILL.md                 # Draft responses using examples + product info
├── state/
│   ├── queue.md                     # Emails awaiting response
│   ├── drafts.md                    # Drafted responses awaiting review
│   ├── sent.md                      # Log of sent responses
│   └── feedback.md                  # Original vs edited drafts (Option A log)
└── sessions/
    └── {YYYY-MM-DD}.md              # Daily session logs
```

**Changes from original:**
- Removed `skills/feedback-learner/` — deferred to post-v1
- Added `PLAN.md` to project root
- SETUP.md deprioritized (Matt runs it first, handoff guide comes later)

---

## Gap Fixes Incorporated

### Gmail Labels for Deduplication
`/scan` applies Gmail labels to track email state:
- `YPS/Queued` — email added to queue.md
- `YPS/Drafted` — draft generated
- `YPS/Sent` — response sent
- `/scan` searches with `-label:YPS/Queued -label:YPS/Drafted -label:YPS/Sent` to avoid reprocessing

### Permissions (settings.local.json)
Full list needed (beyond marvin's read-only pattern):
- `mcp__google-workspace__search_gmail_messages`
- `mcp__google-workspace__get_gmail_message_content`
- `mcp__google-workspace__get_gmail_messages_content_batch`
- `mcp__google-workspace__get_gmail_thread_content`
- `mcp__google-workspace__send_gmail_message` ← NEW (marvin doesn't have this)
- `mcp__google-workspace__draft_gmail_message`
- `mcp__google-workspace__batch_modify_gmail_message_labels` ← for labeling
- `mcp__google-workspace__manage_gmail_label` ← to create YPS/* labels
- `mcp__google-workspace__list_gmail_labels`
- `mcp__google-workspace__start_google_auth`

### Reply Threading (v1: simple)
- v1 sends replies as threaded responses to the original email (not new messages)
- `/draft` reads the original email via `get_gmail_message_content` to get thread ID
- `/send` uses thread ID when sending so the reply appears in the customer's thread
- v1 does NOT handle follow-up replies from the customer (single reply only)

### State File Schemas

**queue.md:**
```markdown
# Email Queue
Last updated: YYYY-MM-DD

| Email ID | From | Subject | Date Received | Category | Status |
|----------|------|---------|---------------|----------|--------|
```
Status: `new` | `drafting` | `drafted` | `sent` | `skipped`

**drafts.md:**
```markdown
# Pending Drafts
Last updated: YYYY-MM-DD

## Draft: [Email ID]
**To:** customer@email.com
**Subject:** Re: [original subject]
**Status:** pending | approved | rejected
**Generated:** YYYY-MM-DD

---
[Draft text here]
---
```

**sent.md:**
```markdown
# Sent Responses
Last updated: YYYY-MM-DD

| Email ID | Sent Date | To | Subject | Was Edited |
|----------|-----------|-----|---------|------------|
```

**feedback.md:**
```markdown
# Edit Feedback Log
Last updated: YYYY-MM-DD

## YYYY-MM-DD | [Subject]
**Original draft:**
> [what Claude wrote]

**Owner's edit:**
> [what was actually sent]

**What changed:**
- [bullet list of differences]
```

### Commands vs Skills Relationship
- **Commands** = step-by-step procedures Claude follows (the "what to do")
- **Skills** = reusable logic with triggers and classification rules (the "how to do it")
- `/scan` command orchestrates: calls inbox-scanner skill for classification, then updates queue.md and applies Gmail labels
- `/draft` command orchestrates: picks from queue, calls response-drafter skill for text generation, saves to drafts.md

### Scan Search Criteria
Defined in inbox-scanner SKILL.md:
- Gmail query: `is:unread -label:YPS/* newer_than:7d`
- Classification: Claude reads subject + body, matches against known categories in knowledge/
- v1 categories: `product-inquiry` (match) or `other` (skip)
- `other` emails get logged but not queued — flagged for manual review

---

## Implementation Sequence (updated)

### Phase 1: Scaffold (can do now)
1. `git init ~/yps`
2. Write `.gitignore`, `.env.example`
3. Write `CLAUDE.md` (with placeholders for business details)
4. Write `.claude/settings.local.json`
5. Write all 6 slash commands
6. Write inbox-scanner and response-drafter skills
7. Write state files with empty schemas
8. Write `knowledge/product-inquiries/examples.md` with template format
9. Write `knowledge/product-inquiries/product-info.md` with placeholder structure
10. Write `knowledge/_template/examples-template.md`

### Phase 2: Connect (needs YPS Gmail credentials)
11. Set up Google Workspace MCP with YPS OAuth
12. Create Gmail labels (YPS/Queued, YPS/Drafted, YPS/Sent)
13. Test `/scan` against real inbox

### Phase 3: Tune (needs example emails from owners)
14. Populate examples.md with real customer emails + responses
15. Populate product-info.md with real product data
16. Test `/draft` quality against examples
17. End-to-end test: scan → draft → review → send

---

## Future: `/learn` Command (Post-v1)

When enough feedback accumulates (10-20 entries), a `/learn` command will:

1. Read `state/feedback.md` for all logged edits
2. Analyze patterns across edits:
   - Repeated tone corrections (e.g., always changing "Hi" → "Hello")
   - Factual corrections (wrong specs, prices, policies)
   - Missing information (owners consistently add the same details)
   - Phrasing preferences (specific words/phrases the business prefers)
3. Generate proposed updates:
   - New entries for `knowledge/product-inquiries/examples.md` (high-quality edited drafts become new examples)
   - Updates to the Voice & Tone Guide section
   - Corrections to `knowledge/product-inquiries/product-info.md`
4. Present each proposed change for approval (never auto-modify knowledge files)
5. Archive processed feedback entries to `state/feedback-archive.md`

This creates a learning loop: customer email → AI draft → human edit → feedback log → periodic learning → better knowledge files → better future drafts.

---

## Verification

- [ ] `cd ~/yps && claude` launches successfully
- [ ] `/yps` reads state files and shows session summary
- [ ] `/scan` searches Gmail, classifies emails, updates queue.md, applies labels
- [ ] `/draft` reads examples.md + product-info.md, generates response matching business voice
- [ ] `/review` shows drafts, captures edits, logs to feedback.md
- [ ] `/send` displays draft + recipient, requires explicit "yes", sends as threaded reply, logs to sent.md
- [ ] Gmail labels prevent duplicate processing across sessions
- [ ] State files update correctly after each action
