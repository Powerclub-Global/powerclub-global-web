# Self-Hosting powerclubglobal.com

The marketing site runs as a Docker container on PCG's own hardware. Cloudflare
is **edge only** — TLS termination, CDN, and the tunnel. There is no Vercel, no
external build step, and no third-party runtime.

```
Internet ──TLS──> Cloudflare edge ──tunnel──> pcg-cloudflared ──docker net──> pcg-website:3000
```

`pcg-cloudflared` and `pcg-website` share the pre-existing docker network
`pcg-cc-mcp_app-network`, so the tunnel reaches the site by container name. No
host port needs to be exposed to the internet.

---

## 1. Prerequisites

- Docker with the Compose plugin.
- The runtime env file at `/home/pythia/pcg-website/.env` (see below).
- The external network `pcg-cc-mcp_app-network` must already exist — it is
  created by the `pcg-cc-mcp` stack. **This project never creates or modifies
  it**; `docker-compose.yml` declares it `external: true`.

## 2. Runtime environment

Secrets live on the host, outside the repo, and are injected via `env_file`.
Nothing is baked into the image and nothing is committed.

Create `/home/pythia/pcg-website/.env`, owner-only:

```bash
mkdir -p /home/pythia/pcg-website
install -m 600 /dev/null /home/pythia/pcg-website/.env
$EDITOR /home/pythia/pcg-website/.env
chmod 600 /home/pythia/pcg-website/.env
```

Required variable **names** (values are not recorded here):

| Variable | Purpose |
| --- | --- |
| `PCG_BACKEND_URL` | Dashboard backend the server-side API routes proxy to. `https://dashboard.powerclubglobal.com` |
| `FOUNDER_CALL_ADMIN_KEY` | Backend-to-backend key for the founder-call bookings endpoint. **Must match the value in the backend's own `.env`** or `/api/sovereign-stack/admin` returns 401. Server-side only. |
| `ADMIN_SESSION_SECRET` | AES-256-GCM key for the encrypted `pcg_admin_session` cookie. Generate with `openssl rand -base64 32`. Minimum 16 chars. Rotating it invalidates all existing admin sessions. |

Optional / not currently set:

| Variable | Effect when absent |
| --- | --- |
| `NOTION_API_KEY`, `NOTION_DATABASE_ID` | Notion is no longer used. `/press` renders a clean empty state, `/press/[id]` 404s, and `/api/posts` returns `[]`. Nothing else is affected. |
| `NEXT_PUBLIC_APPWRITE_ENDPOINT`, `NEXT_PUBLIC_APPWRITE_PROJECT_ID`, `NEXT_PUBLIC_APPWRITE_DATABASE_ID`, `NEXT_PUBLIC_APPWRITE_COLLECTION_ID` | Legacy contact-form dual-write is disabled. The contact form writes to the CRM only, via `/api/lead`. |

> `FOUNDER_CALL_ADMIN_KEY` must be kept in sync with the backend. If the backend
> key is rotated, update this file and restart the container.

## 3. Build and run

```bash
cd /home/pythia/powerclub-global-website          # or your checkout
docker compose -p pcg-website up -d --build
```

Always pass `-p pcg-website`. Never run compose commands from this directory
against another project.

- Container name: `pcg-website`
- Listens on `3000` inside the container, as a non-root `nextjs` user.
- Published to the host as `127.0.0.1:3005` for smoke testing only — it is bound
  to loopback and is not the public path.
- `restart: unless-stopped`, plus a healthcheck that polls `/` every 30s.

Useful commands:

```bash
docker compose -p pcg-website ps
docker compose -p pcg-website logs -f
docker compose -p pcg-website restart
docker compose -p pcg-website down          # stop (does NOT touch other stacks)
docker stats --no-stream pcg-website
```

## 4. Redeploying after a git push

```bash
cd /home/pythia/powerclub-global-website
git pull origin main
docker compose -p pcg-website up -d --build
```

The rebuild takes roughly a minute. The old container keeps serving until the
new image is ready, so downtime is the few seconds of container replacement.

To roll back, check out the previous commit and rebuild.

## 5. Cloudflare Zero Trust — manual steps (owner only)

Tunnel ingress is **remote-managed**, so the public hostnames cannot be added
from this host. In the Cloudflare dashboard:

> **Zero Trust → Networks → Tunnels → the PCG tunnel → Public Hostnames → Add a
> public hostname**
>
> - Hostname: `powerclubglobal.com` — Service: **HTTP** → `http://pcg-website:3000`
> - Add a second entry for `www.powerclubglobal.com` — Service: **HTTP** →
>   `http://pcg-website:3000`

Notes:

- Adding these hostnames **automatically repoints the apex and `www` DNS records
  at the tunnel**. That is the cutover — the site goes live the moment it saves.
- Service must be **HTTP**, not HTTPS: the hop from cloudflared to the container
  is inside the docker network. TLS is terminated at Cloudflare's edge.
- Do not disturb the existing `dashboard.powerclubglobal.com → http://nginx:80`
  or `marketplace.alphaprotocol.network` entries.
- If you want `www` to redirect to the apex rather than serve a duplicate, add a
  Cloudflare Redirect Rule; the tunnel itself will happily serve both.

### After the hostname is added

The admin session cookie is set with `Secure`, so `/admin` sign-in only works
over HTTPS. It will not work over the plain `http://localhost:3005` test port —
that is expected, not a bug.

## 6. Architecture notes

- `next.config.ts` sets `output: "standalone"`, so the runtime image ships a
  self-contained `server.js` instead of the full `node_modules` tree.
- `sharp` is installed in the runtime stage because `next/image` optimisation
  requires it and the standalone bundle does not include it.
- `middleware.ts` guards `/admin/*`, `/api/admin/*`, and
  `/api/sovereign-stack/admin`. Pages get a 302 to `/admin/login`; API routes get
  a 401 JSON body. It uses Web Crypto only, so it runs fine on Node.
- The top-level `api/` directory (outside `app/`) is **dead code** — it is not a
  route in the App Router. It is still type-checked by `tsc`, so it must keep
  compiling, but it never executes.

## 7. Smoke test

```bash
B=http://localhost:3005
for p in / /about /services /events /contact /discovery-call /sovereign-stack /press; do
  printf '%-20s %s\n' "$p" "$(curl -s -o /dev/null -w '%{http_code}' $B$p)"
done
curl -s -o /dev/null -w 'admin      %{http_code} -> %{redirect_url}\n' $B/admin
curl -s -o /dev/null -w 'auth/me    %{http_code}\n' $B/api/admin/auth/me   # expect 401
curl -s $B/api/discovery-call/availability | head -c 200                    # expect slots[]
```

`/api/discovery-call/availability` returning a non-empty `slots` array is the
best single proof that the container can reach the backend.
