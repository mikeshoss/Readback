# Seeing changes, and putting them live

Two URLs, one command each. Nothing else to keep in sync.

| | URL | Command |
|---|---|---|
| **Staging** — check your changes | https://staging.readback-bpq.pages.dev | `npm run stage` |
| **Live** — the public site | https://readback.ofrecord.ca | `npm run deploy` |

## The normal loop

```bash
npm run dev      # edit with live reload at localhost:4321
npm run stage    # push it to the staging URL and look at it properly
npm run deploy   # happy with it? put it live
```

`npm run stage` is safe — it never touches the live site. The staging URL
is stable, so it's also the link to send someone for a second opinion.

## Refresh the data and publish in one go

```bash
npm run refresh   # pull OSM cameras + news feeds, build, deploy live
```

Stop before publishing if you'd rather eyeball it first:

```bash
npm run data && npm run news && npm run stage
```

## Rolling back

Cloudflare keeps every deployment. Pages → `readback` → Deployments →
pick an earlier one → **Rollback**. Or:

```bash
npx wrangler pages deployment list --project-name readback
```

## Why Docker is gone

The old setup served a copy of `dist/` baked into a container image at
`192.168.2.226:4321`. It only changed when the image was rebuilt, so it
silently served hours-old content while the live site was current — which
is exactly how a change can look "missing" when it shipped fine. Staging
replaces it: same purpose, always current, no second thing to remember.
The files are kept in `archive/` if that setup is ever wanted back.

## The Git gap (unchanged)

The Pages project uses direct upload, so pushing to GitHub does **not**
deploy. Only `npm run deploy` does. The weekly data workflow commits fresh
data but can't publish it — run `npm run deploy` afterwards, or close the
gap by connecting the repo in the Pages dashboard (Settings → Builds &
deployments → Connect to Git, build command `npm run build`, output `dist`).
