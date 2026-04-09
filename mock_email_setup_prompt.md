# Mock Email Setup — Prompt & Instructions

## What This Does

Creates a local `mock_email/` folder that simulates a Gmail inbox so the business owners (John & Kirk) can practice the YPS workflow **without needing Gmail OAuth credentials**. The existing slash commands (`/scan`, `/draft`, `/review`) get adjusted to read from and write to `mock_email/` instead of the Gmail API.

This unblocks **Phase 3 (Dry Run)** and parts of **Phase 4** by removing the Gmail dependency.

---

## How to Use

1. Open Claude Code in the `~/yps` directory
2. Paste the prompt below
3. Claude will enter `/plan` mode and present the plan
4. Claude will ask clarifying questions via `AskUserQuestion` before executing
5. Review and approve

---

## Prompt

```
/plan

I need to create a mock email system so the business owners can practice the YPS workflow without Gmail OAuth.

## Goal
Create a `mock_email/` folder at ~/yps/mock_email/ that simulates a Gmail account locally using files. Then adjust the existing slash commands to work against this mock folder instead of the Gmail MCP.

## Requirements

### 1. mock_email/ Folder Structure
Create the following folder structure to mirror Gmail:

```
mock_email/
├── README.md              # Instructions for the owners on how this works
├── inbox/                 # Incoming emails (simulates Gmail inbox)
│   ├── email_001.md       # Pre-loaded with the 5 test emails from test/data/
│   ├── email_002.md
│   ├── email_003.md
│   ├── email_004.md
│   └── email_005.md
├── drafts/                # AI-generated draft responses land here
├── sent/                  # Approved drafts move here after "sending"
├── archive/               # Completed/skipped emails move here
└── labels/                # Label tracking
    └── labels.md          # Tracks which emails have which YPS labels
```

### 2. Mock Email Format
Each email file in inbox/ should be a markdown file with this structure:

```markdown
# Email: [unique_id]

| Field     | Value                          |
|-----------|--------------------------------|
| From      | sender@example.com             |
| To        | yourpartsource1@gmail.com      |
| Subject   | [subject line]                 |
| Date      | [date received]                |
| Thread ID | [unique_thread_id]             |
| Status    | unread                         |
| Labels    | INBOX                          |

## Body

[Full email body text here]
```

### 3. Pre-load Test Emails
Convert the 5 existing test emails from `test/data/` (email1.txt through email5.txt) into the mock email format and place them in `mock_email/inbox/`.

### 4. Adjust Slash Commands
Create **new versions** of the slash commands that work with mock_email/ instead of Gmail MCP. Do NOT overwrite the originals — create a parallel set:

- `.claude/commands/mock-scan.md` — Reads from mock_email/inbox/, classifies, updates queue.md
- `.claude/commands/mock-draft.md` — Picks from queue, generates draft, saves to mock_email/drafts/
- `.claude/commands/mock-review.md` — Presents drafts from mock_email/drafts/ for approval/edit
- `.claude/commands/mock-send.md` — Moves approved drafts from drafts/ to sent/, updates archive
- `.claude/commands/mock-yps.md` — Start session using mock email state

Each mock command should:
- Use Read/Write/Edit tools on mock_email/ files instead of Gmail MCP calls
- Follow the same workflow logic as the original commands
- Update the same state files (queue.md, drafts.md, archive.md, feedback.md)
- Mark emails as read/labeled by updating the email file's Status and Labels fields

### 5. README for Owners
Create `mock_email/README.md` with:
- What this folder is and why it exists
- How to add new test emails (copy the template, fill in details)
- How to run the mock workflow: `/mock-yps` → `/mock-scan` → `/mock-draft` → `/mock-review`
- What each folder contains
- How to provide feedback (edit drafts, note what changed)
- Blank email template they can copy

### 6. Important Constraints
- Do NOT modify the original slash commands in .claude/commands/
- Do NOT touch Gmail MCP settings or credentials
- Do NOT modify CLAUDE.md or PLAN.md
- Keep the mock system self-contained in mock_email/ and the mock-* commands
- State files (queue.md, drafts.md, etc.) should work the same way

## After Creating the Plan

Use AskUserQuestion to confirm with me:
1. Should the mock commands update the SAME state files (state/queue.md, etc.) or create separate mock state files at mock_email/state/?
2. Should I add more than the 5 test emails? If so, what types of inquiries should I include?
3. Any specific instructions the owners need in the README beyond what's listed?
4. Should mock-send actually "send" (move to sent/) or just mark as approved?

Wait for my answers before implementing.
```

---

## What Gets Created

| Item | Location | Purpose |
|------|----------|---------|
| Mock inbox | `mock_email/inbox/` | 5+ test emails in markdown format |
| Mock drafts | `mock_email/drafts/` | Where AI responses land |
| Mock sent | `mock_email/sent/` | "Sent" emails after approval |
| Mock archive | `mock_email/archive/` | Completed/skipped emails |
| Label tracker | `mock_email/labels/labels.md` | Simulates Gmail labels |
| Owner README | `mock_email/README.md` | Instructions for John & Kirk |
| `/mock-yps` | `.claude/commands/mock-yps.md` | Start mock session |
| `/mock-scan` | `.claude/commands/mock-scan.md` | Scan mock inbox |
| `/mock-draft` | `.claude/commands/mock-draft.md` | Draft responses from mock |
| `/mock-review` | `.claude/commands/mock-review.md` | Review mock drafts |
| `/mock-send` | `.claude/commands/mock-send.md` | "Send" approved mock drafts |

---

## Phases This Covers

- **Phase 3 (Dry Run):** Owners can test with mock emails, provide example responses, build out knowledge files — all without Gmail
- **Phase 4 (partial):** Simulates the full email lifecycle (scan → draft → review → send) without OAuth dependency
- **Phase 4 (excluded):** Actual Gmail OAuth setup, real inbox connection — still requires credentials

---

## Notes

- The original commands remain untouched — when Gmail OAuth is ready, just switch back to `/scan`, `/draft`, etc.
- Owners can add their own test emails to `mock_email/inbox/` using the template in the README
- All feedback captured in `state/feedback.md` still works — useful for Phase 5 knowledge building
