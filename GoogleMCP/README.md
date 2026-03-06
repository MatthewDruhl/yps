# Google Workspace MCP Setup for YPS

This project uses the Google Workspace MCP server to access Gmail. Each collaborator needs to authenticate independently — credentials are never stored in the repo.

---

## Step 1: Create a Google Cloud Project

Starting from your Gmail inbox:

1. Click your **profile icon** (top-right corner) → **Manage your Google Account**
2. You're now on `myaccount.google.com` — you don't need anything here, but you're signed in
3. Go to **[console.cloud.google.com](https://console.cloud.google.com)**
4. If this is your first time, accept the Terms of Service
5. Click the project dropdown (top-left, next to "Google Cloud") → **New Project**
6. Name it `YPS Email Assistant` → **Create**
7. Make sure your new project is selected in the top-left dropdown

---

## Step 2: Enable the Gmail API

1. In the Google Cloud Console, go to **APIs & Services** → **Library** (left sidebar)
   - Or navigate directly: `console.cloud.google.com/apis/library`
2. Search for **Gmail API**
3. Click **Gmail API** → **Enable**

---

## Step 3: Configure Google Auth Platform

Google now uses the **Google Auth platform** section (not the old "OAuth consent screen" wizard).

1. In the left sidebar, go to **Google Auth platform** → **Branding**
   - If you see a **Get Started** button, click it to begin the setup wizard
2. **App Information:**
   - **App name:** `YPS Email Assistant`
   - **User support email:** your Gmail address
   - Click **Next**
3. **Audience:**
   - Select **External**
   - Click **Next**
4. **Contact Information:**
   - Enter your Gmail address as the notification email
   - Click **Next**
5. **Finish:**
   - Check the box to agree to the Google API Services User Data Policy
   - Click **Create**

### Add Test Users

1. Go to **Google Auth platform** → **Audience** (left sidebar)
2. Under **Test users**, click **Add Users**
3. Enter your Gmail address → **Save**

> **Note:** While in "Testing" mode, only the test users you added can authenticate. This is fine for YPS.

### Add Scopes (Data Access)

1. Go to **Google Auth platform** → **Data Access** (left sidebar)
2. Click **Add or Remove Scopes**
3. In the filter/search box, search for and check each of these scopes:
   - `https://www.googleapis.com/auth/gmail.readonly`x
   - `https://www.googleapis.com/auth/gmail.compose`x
   - `https://www.googleapis.com/auth/gmail.modify`x
   - `https://www.googleapis.com/auth/gmail.labels`x
   - `https://www.googleapis.com/auth/gmail.send`x
   - `https://www.googleapis.com/auth/gmail.settings.basic`x
   - `https://www.googleapis.com/auth/userinfo.email`
   - `https://www.googleapis.com/auth/userinfo.profile`
   - `openid`x
4. Click **Update** → **Save**

---

## Step 4: Create OAuth Client Credentials

1. Go to **APIs & Services** → **Credentials** (left sidebar)
2. Click **+ Create Credentials** → **OAuth client ID**
3. **Application type:** `Web application`
4. **Name:** `YPS MCP`
5. Under **Authorized redirect URIs**, click **+ Add URI** and enter:
   ```
   http://localhost:8000/oauth2callback
   ```
6. Click **Create**
7. A dialog shows your **Client ID** and **Client Secret** — copy both now
   - You can also download the JSON, but you only need the two values

---

## Step 5: Store Credentials Locally

1. Copy the example env file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and fill in your values:
   ```
   GOOGLE_CLIENT_ID=your_client_id_here
   GOOGLE_CLIENT_SECRET=your_client_secret_here
   GMAIL_USER_EMAIL=your_email@gmail.com
   ```

> **Never commit `.env`** — it's already in `.gitignore`.

---

## Step 6: Configure the MCP Server

The project's `.claude/settings.json` declares the MCP server:

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

This file is committed to the repo. The `${...}` placeholders pull from your local `.env`.

---

## Step 7: Authenticate on First Run

1. Start a Claude Code session in the `yps` directory
2. Run `/yps` then `/scan`
3. Claude will trigger the Google OAuth flow and open a browser window
4. Sign in with the Gmail account you added as a test user
5. Click **Continue** on the "Google hasn't verified this app" warning
6. Grant all requested permissions
7. The OAuth token is stored locally on your machine — never committed

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

- **"Google hasn't verified this app"** — This is expected in Testing mode. Click **Continue** (or **Advanced** → **Go to YPS Email Assistant**)
- **Auth fails** — verify your `.env` values match the credentials from Step 4
- **Wrong Gmail account** — check `GMAIL_USER_EMAIL` in your `.env`
- **Port 8000 in use** — the OAuth callback needs `localhost:8000`. Kill any process using it: `lsof -i :8000`
- **MCP not loading** — make sure `.claude/settings.json` is present and `npx` is available
- **"Access blocked" error** — make sure your email is added as a test user in Step 3.8
