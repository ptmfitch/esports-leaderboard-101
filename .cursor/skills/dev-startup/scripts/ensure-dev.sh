#!/usr/bin/env bash
# Idempotent local setup for Fix-Swiss: toolchain, .env, persistent SQLite, seed if new.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
cd "$ROOT"

ENV_FILE="$ROOT/.env"
DB_FILE="$ROOT/prisma/database.db"
PORT="${PORT:-3000}"

NEW_DB=0
DID_INSTALL=0
DID_ENV=0
DID_SEED=0

is_placeholder() {
  local value="${1:-}"
  local trimmed
  trimmed="$(printf '%s' "$value" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//' -e 's/^["'\'']//' -e 's/["'\'']$//')"
  if [[ -z "$trimmed" ]]; then
    return 0
  fi
  if [[ "$trimmed" == *"//"* ]] || [[ "$trimmed" == *"set to some random"* ]] || [[ "$trimmed" == *"TODO"* ]]; then
    return 0
  fi
  return 1
}

env_get() {
  local key="$1"
  [[ -f "$ENV_FILE" ]] || return 0
  local line
  line="$(grep -E "^[[:space:]]*${key}[[:space:]]*=" "$ENV_FILE" | tail -n 1 || true)"
  [[ -n "$line" ]] || return 0
  printf '%s' "${line#*=}"
}

upsert_env() {
  local key="$1"
  local value="$2"
  if [[ ! -f "$ENV_FILE" ]]; then
    printf '%s="%s"\n' "$key" "$value" >>"$ENV_FILE"
    return
  fi
  if grep -qE "^[[:space:]]*${key}[[:space:]]*=" "$ENV_FILE"; then
    local tmp
    tmp="$(mktemp)"
    awk -v k="$key" -v v="$value" '
      BEGIN { done=0 }
      $0 ~ "^[[:space:]]*" k "[[:space:]]*=" {
        if (!done) { print k "=\"" v "\""; done=1 }
        next
      }
      { print }
      END { if (!done) print k "=\"" v "\"" }
    ' "$ENV_FILE" >"$tmp"
    mv "$tmp" "$ENV_FILE"
  else
    printf '%s="%s"\n' "$key" "$value" >>"$ENV_FILE"
  fi
}

echo "==> Checking toolchain"

if ! command -v node >/dev/null 2>&1; then
  echo "node is not installed. Install Node.js 20+ and re-run." >&2
  exit 1
fi
if ! command -v npm >/dev/null 2>&1; then
  echo "npm is not installed. Install Node.js (includes npm) and re-run." >&2
  exit 1
fi
if ! command -v sqlite3 >/dev/null 2>&1; then
  echo "sqlite3 CLI not found on PATH. Prisma still works, but install sqlite3 (e.g. /usr/bin/sqlite3) for local inspection." >&2
  exit 1
fi

echo "    node $(node -v)"
echo "    npm $(npm -v)"
echo "    sqlite3 $(sqlite3 --version | awk '{print $1}')"

if [[ ! -d "$ROOT/node_modules" ]] || [[ ! -x "$ROOT/node_modules/.bin/next" ]]; then
  echo "==> Installing npm dependencies"
  npm install
  DID_INSTALL=1
else
  echo "==> npm dependencies already present (skipping install)"
fi

echo "==> Ensuring .env"
mkdir -p "$(dirname "$ENV_FILE")"
if [[ ! -f "$ENV_FILE" ]]; then
  : >"$ENV_FILE"
  DID_ENV=1
fi

if is_placeholder "$(env_get DATABASE_URL)"; then
  upsert_env DATABASE_URL "file:./database.db"
  DID_ENV=1
fi
if is_placeholder "$(env_get HMAC_SALT)"; then
  upsert_env HMAC_SALT "$(openssl rand -hex 32)"
  DID_ENV=1
fi
if is_placeholder "$(env_get TOTP_SECRET)"; then
  upsert_env TOTP_SECRET "$(openssl rand -hex 32)"
  DID_ENV=1
fi
if [[ "$DID_ENV" -eq 1 ]]; then
  echo "    wrote missing or placeholder keys in .env (HMAC_SALT / TOTP_SECRET are not printed)"
else
  echo "    .env already has real DATABASE_URL, HMAC_SALT, TOTP_SECRET"
fi

echo "==> Prisma client"
npx prisma generate

if [[ ! -f "$DB_FILE" ]]; then
  NEW_DB=1
  echo "==> No SQLite file at prisma/database.db (new database)"
else
  echo "==> SQLite file exists at prisma/database.db (keeping it; do not delete between sessions)"
fi

echo "==> Applying migrations (prisma/database.db is the persistent store)"
npx prisma migrate deploy

user_count="0"
if [[ -f "$DB_FILE" ]]; then
  user_count="$(sqlite3 "$DB_FILE" "SELECT COUNT(*) FROM User;" 2>/dev/null || echo 0)"
fi

if [[ "$NEW_DB" -eq 1 ]] || [[ "${user_count:-0}" -eq 0 ]]; then
  echo "==> Seeding (new or empty database)"
  npx prisma db seed
  DID_SEED=1
else
  echo "==> Skipping seed (User rows already present: ${user_count})"
fi

if lsof -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  echo "==> Next.js already listening on port ${PORT}"
  DEV_RUNNING=1
else
  echo "==> Next.js is not listening on port ${PORT} (start with: npm run dev)"
  DEV_RUNNING=0
fi

echo
echo "Summary:"
echo "  install: $([ "$DID_INSTALL" -eq 1 ] && echo ran || echo skipped)"
echo "  .env:    $([ "$DID_ENV" -eq 1 ] && echo updated || echo unchanged)"
echo "  sqlite:  $DB_FILE"
echo "  seed:    $([ "$DID_SEED" -eq 1 ] && echo ran || echo skipped)"
echo "  dev:     $([ "$DEV_RUNNING" -eq 1 ] && echo running || echo not running)"
echo "  login:   admin / admin (from prisma/seed.ts)"
echo "ENSURE_DEV_RUNNING=${DEV_RUNNING}"
