# Publishing Readback with a Cloudflare Tunnel

Puts the site on the internet at readback.ofrecord.ca without opening a single
router port and without publishing your home IP address — Cloudflare's
edge is the only thing the public sees. The tunnel dials *out* from the
container, so there's no inbound firewall rule to configure.

## Before you start

- `ofrecord.ca` must be active in your Cloudflare account (the tunnel
  creates the `readback` DNS record for you).
- The `readback` container should be running (`docker compose up -d`).

## 1. Create the tunnel (dashboard, ~2 minutes)

1. Go to **one.dash.cloudflare.com** → **Networks → Tunnels** →
   **Create a tunnel**.
2. Connector: **Cloudflared**. Name it `readback`.
3. On the install screen, choose the **Docker** tab. You only need the
   **token** — the long `eyJ...` string in the sample command. Copy it.
   *(Ignore the rest of their docker command; compose handles that.)*

## 2. Give the token to compose

```bash
cp .env.example .env
```

Open `.env`, replace the placeholder with your token:

```
TUNNEL_TOKEN=eyJhIjoi...
```

`.env` is gitignored — the token must never land in the public repo. If
it ever leaks, delete the tunnel in the dashboard and make a new one;
the token alone is enough for anyone to run a connector as you.

## 3. Point the hostname at the container

Back in the dashboard, on the tunnel's **Public Hostname** tab, add:

| Field | Value |
|---|---|
| Subdomain | `readback` |
| Domain | `ofrecord.ca` |
| Path | *(leave empty)* |
| Service type | `HTTP` |
| URL | `readback:80` |

`readback:80` works because cloudflared runs in the same compose project
and resolves the container by name — no host IP, no `host.docker.internal`.

Cloudflare creates the DNS records automatically. No manual CNAME needed.

## 4. Start it

```bash
docker compose up -d
```

Check it connected:

```bash
docker compose logs -f tunnel      # look for "Registered tunnel connection"
```

Then load **https://readback.ofrecord.ca** — TLS is handled by Cloudflare, nothing
to configure.

## Day-to-day

Publishing a change is the same two-step as before; the tunnel keeps
serving throughout:

```bash
npm run build && docker compose up -d --build
```

Both containers are `restart: unless-stopped`, so they come back after a
reboot as long as Docker Desktop starts on login.

## Worth knowing before launch

**This serves the public site from your Mac.** The tunnel hides your IP,
which matters for a site like this — but the site is only up when that
machine is on, awake, and online. Sleep the laptop and readback.ofrecord.ca goes
down.

**For launch day, consider Cloudflare Pages instead.** Readback is a
fully static site, so Pages is arguably the better fit: it's free, serves
from Cloudflare's global edge (fast for press traffic spikes), involves
no home hardware at all, and deploys straight from the GitHub repo on
every push. The tunnel is excellent for previewing the real domain now
and for anything dynamic later — but if the goal is "survives a Hacker
News front page while my laptop is closed," Pages is the answer.

You can run both: tunnel for a staging hostname (e.g.
`dev.readback.ofrecord.ca`), Pages on the apex for production.
