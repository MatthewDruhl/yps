# YPS Email Response System — Updated Plan

## Context

Set up an automated email response system for the business YPS. The system drafts responses to customer product inquiry emails using AI, with mandatory human review before sending. Matt runs it initially, hands off to business owners later.

## Decisions Made

- **Gmail**: YPS business Gmail (Google Workspace)
- **Operator**: Matt runs it first, trains owners for handoff later
- **v1 Scope**: Single replies only (no multi-message threads)
- **Feedback**: Option A — just log edits to feedback.md. No auto-learning in v1.
- **Scan batch limit**: Max 10 emails per scan (Phase 1). Keeps token usage manageable.
- **No sent.md**: queue.md tracks all statuses. Completed emails archived to archive.md.
- **Classify at scan**: Read subject first for quick filtering, only read full email body for likely matches.
- **Example emails**: Not yet received from business owners (blocker for testing)
- **Business details**: Still needed from owners (products, pricing, policies)

## What's Blocking

1. **Example emails + responses** from owners — can't test drafting without these
2. **Business context** — product names, specs, pricing, policies needed for CLAUDE.md and product-info.md
3. **YPS Gmail OAuth credentials** — needed to connect Gmail MCP

**We CAN build the full scaffold (structure, commands, skills, state files) without these. Testing requires them.**

---

## Project Structure

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
├── state/
│   ├── queue.md                     # Emails awaiting response
│   ├── drafts.md                    # Drafted responses awaiting review
│   ├── archive.md                   # Completed emails (sent/skipped) moved from queue
│   └── feedback.md                  # Original vs edited drafts (Option A log)
└── sessions/
    └── {YYYY-MM-DD}.md              # Daily session logs
```

---

## Phases

### Phase 1: Scaffold
- [x] `git init ~/yps`
- [x] Write `.gitignore`, `.env.example`
- [x] Write `CLAUDE.md` (with placeholders for business details)
- [x] Write `.claude/settings.local.json`

### Phase 2: Build Commands
- [x] Write all 6 slash commands (each command contains its own classification/drafting logic)
- [x] Write state files with empty schemas
- [x] Write `knowledge/product-inquiries/examples.md` with template format
- [x] Write `knowledge/product-inquiries/product-info.md` with placeholder structure
- [x] Write `knowledge/_template/examples-template.md`
#### Phase 2 Verification (no real data - test actions)
- [x] `cd ~/yps && claude` launches successfully
- [x] `/yps` reads state files and shows session summary
- [x] `/scan` searches Gmail, classifies emails, updates queue.md, applies labels
- [x] `/draft` reads examples.md + product-info.md, generates response matching business voice
- [x] `/review` shows drafts, captures edits, logs to feedback.md

### Phase 3: Dry Run
- [ ] CC drafts a response
- [ ] User edits draft email
- [ ] CC updates feedback.md
- [ ] Repeat for 5-10 emails per category
- [ ] CC updates examples.md with best edited drafts
- [ ] Repeat for each category
#### Phase 3 Verification (real data - test actions)
- [ ] `cd ~/yps && claude` launches successfully
- [ ] `/yps` reads state files and shows session summary
- [ ] `/draft` reads examples.md + product-info.md, generates response matching business voice
- [ ] `/review` shows drafts, captures edits, logs to feedback.md
- [ ] Gmail labels prevent duplicate processing across sessions
- [ ] State files update correctly after each action

### Phase 4: Connect + Optimize
- [ ] User provides customer email
- [ ] Set up Google Workspace MCP with YPS OAuth
- [ ] Create Gmail labels (YPS/Queued, YPS/Drafted, YPS/Sent)
- [ ] Test `/scan` against real inbox
- [ ] live Gmail integration testing
#### Phase 4 Verification (real data - test actions)
- [ ] `cd ~/yps && claude` launches successfully
- [ ] `/yps` reads state files and shows session summary
- [ ] `/scan` searches Gmail, classifies emails, updates queue.md, applies labels

- [ ] `/review` shows drafts, captures edits, logs to feedback.md
- [ ] `/send` displays draft + recipient, requires explicit "yes", mock sends as threaded reply, updates queue.md and archive.md - does not send email
- [ ] Gmail labels prevent duplicate processing across sessions
- [ ] State files update correctly after each action

### Phase 5: Populate Knowledge (needs example emails from owners)

- [ ] Populate examples.md with real customer emails + responses
- [ ] Populate product-info.md with real product data
- [ ] Test `/draft` quality against examples
- [ ] End-to-end test: scan → draft → review → send
#### Phase 5 Verification (real data - test actions)
- [ ] Test all skills and commands - will list after Phase 4 completes



---

## Gap Fixes Incorporated

### Gmail Labels for Deduplication
`/scan` applies Gmail labels to track email state:
- `YPS/Queued` — email added to queue.md
- `YPS/Drafted` — draft generated
- `YPS/Sent` — response sent
- `/scan` searches with `-label:YPS/Queued -label:YPS/Drafted -label:YPS/Sent` to avoid reprocessing


### Reply Threading (v1: simple)
- v1 sends replies as threaded responses to the original email (not new messages)
- `/draft` reads the original email via `get_gmail_message_content` to get thread ID
- `/send` uses thread ID when sending so the reply appears in the customer's thread
- v1 does NOT handle follow-up replies from the customer (single reply only)

### State File Schemas
- See CLAUDE.md State File Schemas

### Commands
Each slash command is a self-contained prompt in `.claude/commands/`. Classification logic lives in `scan.md`, drafting logic lives in `draft.md` — no separate skill files.
- `/scan` — searches Gmail, classifies emails, updates queue.md, applies Gmail labels
- `/draft` — picks from queue, reads knowledge files, generates response, saves to drafts.md
- `/yps`
   - Start session, scan inbox, show status
   - reads state files(queue.md, drafts.md,
  archive.md, feedback.md) and shows session summary
- `/review`
   - present draft of response email for user to review
- `/end`
   - Summarize what we covered
   - Save everything to the session log
   - Update your current state

### Scan Search Criteria
Defined in `/scan` command (`scan.md`):
- Gmail query: `is:unread -label:YPS/* newer_than:7d`
- Classification: Claude reads subject + body, matches against known categories in knowledge/
- v1 categories: `product-inquiry` (match) or `other` (skip)
- `other` emails get logged but not queued — flagged for manual review


---
## Future: Python pre-filter
- Investigate Python pre-filter for Gmail (reduce token cost — pull metadata only via Gmail API, feed list to Claude for classification)

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

## Future: `/feature-request` Command (Post-handoff)

Guided command for business owners to request new capabilities. CC captures requirements, creates a feature branch, and documents the request for Matt to review.

