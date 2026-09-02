# Running Readback in Docker

Fixes the "why is the server down" problem: the dev server I run in-session
dies whenever the session ends. A container with `restart: unless-stopped`
survives reboots, quitting Terminal, sleep — everything short of you
stopping it or Docker Desktop being off.

This serves the **built static site** via nginx (~25MB image), not the
live dev server — matches what actually ships to production, and there's
no dev-server flakiness to inherit.

## Start it

```bash
docker compose up -d --build
```

Visit **http://localhost:4321**. `--build` only needed the first time or
after a code change; plain `docker compose up -d` reuses the image.

## Stop / restart

```bash
docker compose down       # stop and remove the container
docker compose restart    # just restart it
docker compose logs -f    # tail nginx logs
```

## Updating camera data

`public/data/cameras.json` is committed to the repo (not generated at
container build time), so the image is fully reproducible from source —
no network access needed to build or run it. To ship fresh camera data:

```bash
npm run data               # regenerate public/data/cameras.json locally
git add public/data && git commit -m "Refresh camera data"
docker compose up -d --build   # rebuild the image with the new data
```

## LAN access (phone, other devices)

Compose already publishes on all interfaces. Find your Mac's LAN IP
(`ipconfig getifaddr en0`) and visit `http://<that-ip>:4321` from any
device on the same network — same as before, but now the container stays
up whether or not a Claude session is active.

## Auto-start on login (optional)

Docker Desktop's own "Start Docker Desktop when you log in" setting
(Settings → General) plus the container's `restart: unless-stopped`
policy means the site comes back automatically after a reboot, with no
extra scripting needed.
