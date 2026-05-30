#!/bin/bash
# Wobedi Bi Lotto Next.js production wrapper.
# Paths still reference /home/admin/accurate-giant/ — see README "rebrand
# transition" note before renaming.
# Loads env from shared/.env (kept outside the release dir so it survives
# deploys), then exec's the Next standalone server. Supervisor runs this.
set -euo pipefail

# Bash already sets $HOSTNAME to the machine's hostname (often a link-local
# IPv6 address on cloud VMs), which would make Next 15 try to listen on
# something other than loopback. Force the bind address unconditionally —
# nginx is the only thing that needs to reach this port.
export NODE_ENV="${NODE_ENV:-production}"
export PORT="${PORT:-3002}"
export HOSTNAME="127.0.0.1"

ENV_FILE=/home/admin/accurate-giant/shared/.env
if [ -f "$ENV_FILE" ]; then
  set -a
  # shellcheck disable=SC1090
  source "$ENV_FILE"
  set +a
fi
cd /home/admin/accurate-giant/current
exec /usr/bin/node server.js
