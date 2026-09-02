# Deploying Readback

Live: **https://readback.ofrecord.ca** (Cloudflare Pages, project `readback`)
Also reachable at the project URL: https://readback-bpq.pages.dev

## Deploy a change (current method: direct upload)

```bash
npm run build && npx wrangler pages deploy dist --project-name readback
```

That's it — no Docker, no tunnel involved. Wrangler is authenticated via
`wrangler login` (OAuth, stored in ~/Library/Preferences/.wrangler/).

## Known gap: no Git connection yet

The Pages project was created by direct upload, so it has **no Git
provider attached**. Consequence: pushing to GitHub does *not* deploy, and
the weekly data-refresh Action commits new camera data that will sit
undeployed until someone runs the command above.

Two ways to close it:

**A. Connect the repo (dashboard only — Cloudflare has no API for this).**
Pages → `readback` → Settings → Builds & deployments → Connect to Git →
authorize the Cloudflare GitHub app → pick `mikeshoss/Readback` →
build command `npm run build`, output directory `dist`.
Then every push deploys, including the weekly data commit.

**B. Deploy from the Action.** Create a Cloudflare API token (Pages:Edit),
add it to the repo as secrets `CLOUDFLARE_API_TOKEN` and
`CLOUDFLARE_ACCOUNT_ID`, then append a deploy step to
`.github/workflows/refresh-data.yml`.

A is less machinery; B keeps everything in the repo.

## Local preview (Docker)

Still useful for checking things before shipping; unrelated to production:

```bash
npm run build && docker compose up -d --build   # http://localhost:4321
```
