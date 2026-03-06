# /load-test — Load Test Emails into Gmail Inbox

Read all test email files from `test/data/` and send them to the YPS Gmail account as draft emails, then send each draft so they appear in the inbox.

## Steps

1. **Read all files** in `test/data/` (any `.txt` or `.eml` files).

2. **Parse each file** — extract the following fields:
   - `From:` — sender name/email (for the email body context, not the actual sender)
   - `Subject:` — email subject line
   - `Date:` — date from the file
   - Body — everything after the blank line following the headers

3. **For each test email, create a Gmail draft** using `draft_gmail_message`:
   - **To:** druhlmatthew@gmail.com
   - **Subject:** the subject from the file
   - **Body:** the full body text from the file
   - **from_name:** the name from the `From:` field (to simulate the customer)
   - **include_signature:** false

4. **Display results:**

```
── Test Emails Loaded ──

Loaded {n} test emails as drafts:
  {n}. {subject} (from {sender}) — Draft ID: {id}

⚠ Drafts need to be manually sent from Gmail to land in the inbox.
```

## File Format

Test email files should follow this format:
```
From: customer@email.com
Subject: Email subject line
Date: YYYY-MM-DD

Email body text here...
```

## Rules
- Only reads from `test/data/` — never touches real emails
- Creates drafts only — does not send
- Does not modify any state files (queue, drafts, archive, feedback)
- Does not apply any Gmail labels
- This is a testing utility only
