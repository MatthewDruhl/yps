# GitHub Setup Guide

---

## Option A: CLI Setup (recommended)

### 1. Initialize & push

```bash
cd ~/yps
git init
git add PLAN.md
git commit -m "Initial commit: YPS project plan"
gh repo create yps --private --source=. --push
```

### 2. Set branch protection on main

```bash
gh api repos/{owner}/yps/branches/main/protection \
  --method PUT \
  --input - <<'EOF'
{
  "required_status_checks": {
    "strict": true,
    "contexts": ["ai-review"]
  },
  "enforce_admins": true,
  "required_pull_request_reviews": {
    "required_approving_review_count": 2,
    "dismiss_stale_reviews": true
  },
  "restrictions": null,
  "allow_force_pushes": false,
  "allow_deletions": false
}
EOF
```

Replace `{owner}` with your GitHub username:

```bash
gh api user --jq '.login'
```

### 3. Verify

```bash
# Check repo exists
gh repo view yps

# Check protection is active (should output: 2)
gh api repos/{owner}/yps/branches/main/protection \
  --jq '.required_pull_request_reviews.required_approving_review_count'
```

### 4. Test the protection

```bash
# Try pushing directly to main — should be rejected
echo "test" >> test.txt
git add test.txt
git commit -m "test direct push"
git push origin main
# Expected: rejected

# Clean up
git reset --hard HEAD~1
```

> **Note:** The `ai-review` status check won't resolve until you create the GitHub Action workflow at `.github/workflows/ai-review.yml`. To set up protection now without the AI check, remove the `required_status_checks` block and add it back when the action is ready.

---

## Option B: GitHub Console Setup

### 1. Create the repo

- Go to **github.com/new**
- Name: `yps` | Visibility: **Private**
- Do NOT add README, .gitignore, or license
- Click **Create repository**

### 2. Push your local code

```bash
cd ~/yps
git init
git add PLAN.md
git commit -m "Initial commit: YPS project plan"
git remote add origin git@github.com:YOUR_USERNAME/yps.git
git push -u origin main
```

### 3. Set branch protection

- Go to **Settings > Branches**
- Click **Add branch protection rule**
- Branch name pattern: `main`
- Check the following:
  - Require a pull request before merging
    - Required approvals: **2**
    - Dismiss stale pull request approvals when new commits are pushed
  - Require status checks to pass before merging *(add `ai-review` later)*
  - Do not allow bypassing the above settings
  - Block force pushes
  - Block deletions
- Click **Create**

### 4. Add collaborators

- Go to **Settings > Collaborators**
- Click **Add people** and enter GitHub usernames

### 5. Add API key for automated review (later)

- Go to **Settings > Secrets and variables > Actions**
- Click **New repository secret**
- Name: `ANTHROPIC_API_KEY` | Value: your key

---

## Local Commit Review Enforcement

Three layers that work together:

| Layer | What it does | Who it catches |
|-------|-------------|----------------|
| CLAUDE.md rules | Claude self-reviews before committing | Claude |
| Git pre-commit hook | Blocks commits to main branch | Everyone |
| Claude Code hook | Warns before any `git commit` call | Claude |

### Layer 1: CLAUDE.md rules

Add to `CLAUDE.md`:

```markdown
## Git Workflow
- Before EVERY commit, review ALL staged changes for:
  - Security issues (hardcoded secrets, SQL injection, XSS)
  - Code quality (unused imports, dead code, unclear naming)
  - Correctness (logic errors, missing edge cases)
- Show the review summary and ask for approval before committing
- NEVER commit directly to main — always use a feature branch
```

### Layer 2: Git pre-commit hook

Create `.git/hooks/pre-commit`:

```bash
#!/bin/bash
branch=$(git rev-parse --abbrev-ref HEAD)
if [ "$branch" = "main" ]; then
  echo "Direct commits to main are not allowed. Use a feature branch."
  exit 1
fi
```

Make it executable:

```bash
chmod +x .git/hooks/pre-commit
```

### Layer 3: Claude Code hook

Add to `.claude/settings.local.json`:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash(git commit*)",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'REVIEW REQUIRED: Run /review-commit before committing'"
          }
        ]
      }
    ]
  }
}
```
