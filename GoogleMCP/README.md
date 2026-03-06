# Google Workspace MCP Setup

This project uses the Google Workspace MCP server to access Gmail. Each collaborator needs to authenticate independently — credentials are never stored in the repo.

---

## What Goes in the Repo

`.claude/settings.json` (committed) declares the MCP server so everyone gets it automatically:

```json
{
  "mcpServers": {
    "google-workspace": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-google-workspace"],
      "env": {
        "GOOGLE_CLIENT_ID": "${GOOGLE_CLIENT_ID}",
        "GOOGLE_CLIENT_SECRET": "${GOOGLE_CLIENT_SECRET}"
      }
    }
  }
}
```

---

## What Each Person Does Locally

### 1. Get credentials

Ask Matt for the `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` from the Google Cloud project.

> Share securely — use 1Password, Signal, or similar. Never send credentials over email or Slack in plaintext.

### 2. Create your local `.env`

```bash
cp .env.example .env
```

Fill in your values:

```
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
GMAIL_USER_EMAIL=your_email@gmail.com
```

### 3. Authenticate on first run

Start a session:

```
/yps
```

Claude Code will trigger the Google OAuth flow, open a browser window, and store the token locally. This token is never committed to the repo.

---

## Credential Sharing Summary

| What | How |
|------|-----|
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Shared by Matt out-of-band (1Password, Signal) |
| `.env` file | Each person creates locally from `.env.example` |
| OAuth token | Generated locally on first run, stored on your machine |
| Anything in this repo | No secrets, ever |

---

## Troubleshooting

- **Auth fails** — verify your `.env` values match exactly what was shared
- **Wrong Gmail account** — check `GMAIL_USER_EMAIL` in your `.env`
- **MCP not loading** — make sure `.claude/settings.json` is present and `npx` is available
