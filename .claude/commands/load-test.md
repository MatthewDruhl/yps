# /load-test — Load Test Emails into Gmail Inbox

Read all test email files from a subfolder of `test/data/` and send them to the YPS Gmail account as draft emails, then send each draft so they appear in the inbox.

**Argument:** `$ARGUMENTS` — the subfolder name inside `test/data/` (e.g., `/load-test product_inquiries`). If no argument is provided, ask the operator which folder to use.

## Steps

1. **Read all files** in `test/data/$ARGUMENTS/` (any `.txt` or `.eml` files). If the folder doesn't exist or is empty, notify the operator and stop.

2. **Parse each file** — extract the following fields:
   - `From:` — sender name/email (for the email body context, not the actual sender)
   - `Subject:` — email subject line
   - `Date:` — date from the file
   - Body — everything after the blank line following the headers

3. **For each test email, create a Gmail draft** using `draft_gmail_message`:
   - **To:** yourpartsource1@gmail.com
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
- Only reads from subfolders of `test/data/` — never touches real emails
- Creates drafts only — does not send
- Does not modify any state files (queue, drafts, archive, feedback)
- Does not apply any Gmail labels
- This is a testing utility only
