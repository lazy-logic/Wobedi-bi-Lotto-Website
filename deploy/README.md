# Production server runbook

Everything you need to safely operate the **Wobedi Bi Lotto** marketing-site
deployment on the shared EC2 box. Read this BEFORE touching anything on the
server — the same host runs production lotto infrastructure (real money,
queues, websockets) that is **not ours to modify**.

> **Rebrand transition note:** the project was rebranded from
> *Accurate Giant Company Ltd.* to **Wobedi Bi Lotto**. On-server paths
> (`/home/admin/accurate-giant/`, the supervisor program name, the
> Cloudflare Origin Cert filenames for `accurategiant.com`) still use the
> legacy slug because they're tied to the live deployment. When the
> cutover to the new domain (`wobedibilotto.com`) and a fresh deploy
> layout happens, rename the matching paths in lockstep and reissue the
> Cloudflare Origin Cert for the new hostname.

---

## SSH access

| Field | Value |
|---|---|
| Host | `3.128.240.158` |
| User | `admin` (Debian AMI — **not** `ubuntu`, `ec2-user`, or `root`) |
| Key | `Moovon Chatbot Keypair.pem` (kept at the repo root, gitignored) |
| Sudo | passwordless (`sudo -n` works) |

Recommended SSH options for stability through AWS networking blips:

```bash
ssh -i "Moovon Chatbot Keypair.pem" \
    -o StrictHostKeyChecking=no \
    -o ServerAliveInterval=15 \
    -o ServerAliveCountMax=20 \
    -o TCPKeepAlive=yes \
    admin@3.128.240.158
```

The keypair is named *"Moovon Chatbot"* but this box does **not** host a
chatbot — it runs the **Moovon Lotus** (Laravel) lotto stack, the
**Lotus IQ** Next.js site, plus our **Wobedi Bi Lotto** marketing site. The
keypair name is historical, ignore it.

---

## What is OURS — safe to modify

Everything below has the `accurate-giant` prefix, making it easy to grep for
and revert in one motion.

| Path | Purpose |
|---|---|
| `/home/admin/accurate-giant/` | App home — releases, current symlink, env, wrapper |
| `/home/admin/accurate-giant/releases/<ts>/` | Versioned release dirs (we keep last 2) |
| `/home/admin/accurate-giant/current` | Symlink → active release |
| `/home/admin/accurate-giant/shared/.env` | Production env (Supabase URL/anon key) — `0600`, owned by `admin` |
| `/home/admin/accurate-giant/start.sh` | Wrapper: loads `.env`, exec's `node server.js` |
| `/etc/supervisor/conf.d/accurate-giant.conf` | Supervisor program (runs `start.sh` as `admin`, port `3002`) |
| `/etc/nginx/sites-available/accurate-giant` | Nginx vhost (HTTP + HTTPS via Cloudflare Origin Cert) |
| `/etc/nginx/sites-enabled/accurate-giant` | Symlink → above |
| `/etc/ssl/cloudflare/accurategiant.com.pem` | Cloudflare Origin Cert (15-year, expires **2041-04-26**) |
| `/etc/ssl/cloudflare/accurategiant.com.key` | Private key (`0600`, root-owned) |
| `/var/log/supervisor/accurate-giant.{log,err.log}` | App logs |
| `/var/log/nginx/accurate-giant.{access,error}.log` | Nginx logs for our vhost |

---

## What is NOT OURS — DO NOT TOUCH

These belong to other production workloads on the same box. Modifying or
restarting any of them will affect the lotto operator's live business
(queues, deposits, withdrawals, websockets, the Laravel admin, the IQ site).

### Filesystem — never edit, delete, or move

- `/home/admin/lotus/` (Laravel — production Moovon Lotus app)
- `/home/admin/lotus-iq-website/` (Next.js 16 — production Lotus IQ site, `:3001`)
- `/home/admin/metabase/` (Metabase analytics, may be brought back up)
- `/home/admin/recovered_laravel*.log`, `data_dictionary.csv`, `test_backup.sql`
  (recovery artefacts — leave them)
- `/home/admin/.mariadb_history`, `.bash_history`
- `/var/lib/mysql`, `/var/lib/docker/`

### Nginx — never edit any of these files

- `/etc/nginx/sites-available/lotus` (serves `uat.ivoenora.com` + IP fallback)
- `/etc/nginx/sites-available/lotus-iq` (serves `lotus-iq.com`, `www.lotus-iq.com`)
- `/etc/nginx/sites-available/default` (catch-all)
- `/etc/nginx/nginx.conf` (global config)

When reloading nginx **always** use `nginx -s reload` (graceful), never
`nginx -s stop` or `systemctl restart nginx` — those drop existing
connections to lotus and lotus-iq.

### Supervisor — never `restart`, `stop`, `remove`, or edit these programs

| Program | What it does |
|---|---|
| `lotus-iq-web` | Lotus IQ Next.js server (`:3001`) |
| `lotus-worker` (×2) | Laravel queue worker — generic queue |
| `lotus-stakes-workers` (×2) | Laravel queue worker — `stakes` queue |
| `lotus-parent-transactions` | Laravel queue worker — `parent_transactions` |
| `lotus-pending-deposits` | Laravel queue worker — `pending_deposits` |
| `lotus-pending-withdrawals` | Laravel queue worker — `pending_withdrawals` |
| `reverb` | Laravel Reverb websocket server (`:8080`) |

Their config files live at `/etc/supervisor/conf.d/{lotus-*,reverb}.conf` —
do not read or modify.

### Listening ports — DO NOT take or rebind

| Port | Owner |
|---|---|
| `22` | sshd |
| `25` (localhost) | exim4 (mail) |
| `80` / `443` | nginx (shared with lotus + lotus-iq) |
| `3001` (localhost) | `lotus-iq-web` |
| `3002` (localhost) | **`accurate-giant`** ← ours |
| `8080` | `reverb` (Laravel WebSocket) |
| `46167` (localhost) | containerd internal |

### Docker — leave the pulled images alone unless coordinated

- `metabase/metabase:latest` (864 MB) — installed but no container running;
  user may bring it up later
- `mysql:8` (785 MB) — same

Removing them frees ~1.6 GB but requires a re-pull if Metabase is restored.

---

## Redeploy procedure

End-to-end deploy is **build locally → upload → atomic symlink swap**.
Never build on the box: only ~1.0 GB RAM available, no swap, will OOM and
risk killing the lotto stack.

```bash
# 1. Local build (Windows side)
npm run build

# 2. Assemble standalone bundle
cp -r public .next/standalone/
mkdir -p .next/standalone/.next && cp -r .next/static .next/standalone/.next/
(cd .next && tar -czf /tmp/ag-bundle.tar.gz -C standalone .)

# 3. Upload as a new release
RELEASE=$(date +%Y%m%d-%H%M%S)
ssh -i "Moovon Chatbot Keypair.pem" admin@3.128.240.158 \
  "mkdir -p /home/admin/accurate-giant/releases/$RELEASE"
scp -i "Moovon Chatbot Keypair.pem" -o ServerAliveInterval=15 \
  /tmp/ag-bundle.tar.gz \
  admin@3.128.240.158:/home/admin/accurate-giant/releases/$RELEASE/bundle.tar.gz

# 4. Extract + atomic flip + restart (single SSH session)
ssh -i "Moovon Chatbot Keypair.pem" admin@3.128.240.158 "
  cd /home/admin/accurate-giant/releases/$RELEASE && tar -xzf bundle.tar.gz && rm bundle.tar.gz
  ln -sfn /home/admin/accurate-giant/releases/$RELEASE /home/admin/accurate-giant/current
  sudo -n supervisorctl restart accurate-giant
  ls -1t /home/admin/accurate-giant/releases | tail -n +3 | xargs -r -I {} rm -rf /home/admin/accurate-giant/releases/{}
"

# 5. Smoke-test
curl -sI https://accurategiant.com/ | head -1   # expect HTTP/2 200
```

**Rollback** = flip the symlink to the previous release dir and restart:

```bash
ssh -i "Moovon Chatbot Keypair.pem" admin@3.128.240.158 \
  "ln -sfn /home/admin/accurate-giant/releases/<previous-ts> /home/admin/accurate-giant/current && sudo -n supervisorctl restart accurate-giant"
```

---

## Cloudflare / DNS

| | |
|---|---|
| DNS | Cloudflare (zone owned by Logix). GoDaddy nameservers point at Cloudflare. |
| Records | `A accurategiant.com → 3.128.240.158` (Proxied) · `CNAME www → accurategiant.com` (Proxied) |
| SSL/TLS mode | **Full (strict)** |
| Edge cert | Cloudflare Universal SSL (free, auto-renew) |
| Origin cert | Cloudflare Origin Cert (RSA 2048, expires **2041-04-26**) installed at `/etc/ssl/cloudflare/` |
| HTTPS redirect | Cloudflare **Always Use HTTPS** is on |

If you ever regenerate the Origin Cert, replace both files at
`/etc/ssl/cloudflare/`, run `sudo nginx -t && sudo nginx -s reload`.

---

## Disk hygiene (as of 2026-05-01)

- Disk: `7.7 GB total · ~5.4 GB used · ~2.0 GB free (74%)`
- Inodes: 20% (no concern)
- **Safe one-shot cleanup**: `sudo journalctl --vacuum-size=200M` reclaims
  ~600 MB from `/var/log/journal` with zero service impact.
- Riskier (need owner OK): remove unused Docker images
  (`docker rmi metabase/metabase:latest mysql:8`) → +1.6 GB.

---

## Common one-liners

```bash
# Status of everything supervisor manages
sudo -n supervisorctl status

# Tail OUR app logs
sudo -n tail -f /var/log/supervisor/accurate-giant.log
sudo -n tail -f /var/log/nginx/accurate-giant.access.log

# What's currently bound to which port
sudo -n ss -tlnp

# Verify nginx config without applying
sudo -n nginx -t

# Disk + inodes
df -h /
df -hi /

# Verify our cert
sudo -n openssl x509 -in /etc/ssl/cloudflare/accurategiant.com.pem -noout -dates -subject
```

---

## Hard rules — never do these without explicit owner approval

1. Never `nginx -s stop` or `systemctl restart nginx` — graceful reload only.
2. Never edit any file under `/etc/nginx/sites-{available,enabled}/` whose
   name does not start with `accurate-giant`.
3. Never `supervisorctl restart`, `stop`, `remove`, or `reread` for any
   program other than `accurate-giant`.
4. Never `apt upgrade` / `apt-get upgrade` — could pull in package
   updates that restart nginx or php-fpm and disrupt lotus.
5. Never run `npm install` or `npm run build` on the box (RAM/disk).
6. Never write to `/home/admin/lotus`, `/home/admin/lotus-iq-website`,
   `/home/admin/metabase`, or any `/var/lib/{mysql,docker}` path.
7. Never delete files in `/home/admin/` you don't recognise — they may be
   recovery artefacts the lotto owner needs.
8. Always `nginx -t` before any reload affecting our vhost.
9. Always confirm `supervisorctl status` shows untouched PIDs/uptime for
   every other program after our work.
