# How to push an update live

Live site: **https://readback.ofrecord.ca**

## The short version

```bash
npm run deploy
```

That builds the site and pushes it to Cloudflare Pages. Live in ~30
seconds. That's the whole thing.

## The three kinds of update

**1. You changed content or code** — edited a page, added an FOI status,
fixed a vendor detail:

```bash
npm run deploy
```

**2. You want fresh camera data from OpenStreetMap** — pulls Overpass,
re-classifies, then builds and deploys in one go:

```bash
npm run refresh
```

(This also runs automatically every Monday via GitHub Actions — see the
Git gap below.)

**3. You just want to look at it locally before shipping:**

```bash
npm run dev          # live-reload dev server at localhost:4321
```

## Commit your work too

Deploying and committing are separate. `npm run deploy` ships the site
but doesn't touch git. Keep the repo in sync so the research base and
history stay accurate:

```bash
git add -A && git commit -m "what changed" && git push
```

Habit: **commit, then deploy.**

## The Git gap (why pushing doesn't deploy)

The Pages project uses direct upload, so it has no Git provider attached.
Pushing to GitHub does *not* trigger a deploy — only `npm run deploy`
does. The weekly data Action commits new camera data but can't publish it
on its own.

To close it, pick one:

**A. Connect the repo** (dashboard only — no API exists for this):
Pages → `readback` → Settings → Builds & deployments → Connect to Git →
authorize the Cloudflare GitHub app → pick `mikeshoss/Readback` → build
command `npm run build`, output `dist`. Then every push deploys itself.

**B. Deploy from the Action**: create a Cloudflare API token (Pages:Edit),
add `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` as repo secrets, and
append a wrangler deploy step to `.github/workflows/refresh-data.yml`.

## Rollback

Every deploy is kept. To revert:
Pages → `readback` → Deployments → find a previous one → **Rollback**.
Or `npx wrangler pages deployment list --project-name readback`.

## Local Docker preview (optional)

Unrelated to production; useful for checking on other devices:

```bash
npm run build && docker compose up -d --build   # http://<your-ip>:4321
```
