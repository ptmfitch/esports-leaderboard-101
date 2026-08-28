---
name: dev-startup
description: >-
  Bootstraps Fix-Swiss / esports-leaderboard-101 local development: checks Node
  and sqlite3, npm install if needed, writes .env secrets, keeps a persistent
  SQLite file, runs Prisma migrate, seeds only a new or empty database, and
  starts Next.js if it is not already running. Use when getting started, first
  clone, start the app, setup, bootstrapping, missing database, or checking
  whether install / SQLite / the dev server are ready.
---

# Dev startup

Bring this repo to a runnable local state without repeating install or seed when they already succeeded.

SQLite is a **file**, not a server. Persistence means keeping `prisma/database.db` on disk (gitignored). Do not delete it between sessions. There is nothing to "start" for SQLite besides having that file with schema applied.

Default admin from `prisma/seed.ts`: username `admin`, password `admin`.

## Do this

1. Run the helper from the **repository root** (not from the skill directory):

```bash
bash .cursor/skills/dev-startup/scripts/ensure-dev.sh
```

2. Read the script summary. If `ENSURE_DEV_RUNNING=0` (or it says Next.js is not listening), start the app in the background from the repo root:

```bash
npm run dev
```

Wait until the process is listening on port 3000 (Next default; `hbci` in `lsof`). Do **not** start a second `next dev` if port 3000 is already taken.

3. Tell the user:
   - App URL: `http://localhost:3000`
   - Login: `admin` / `admin`
   - DB path: `prisma/database.db` (survives restarts; seed skipped if `User` already has rows)

## Rules

- **Install**: skip `npm install` when `node_modules/.bin/next` exists. The helper already does this.
- **`.env`**: required keys are `DATABASE_URL="file:./database.db"`, `HMAC_SALT`, `TOTP_SECRET`. If the file is missing or a key is a README placeholder (`// set to some random string`), generate hex secrets with `openssl rand -hex 32`. Never overwrite secrets that already look real. Never print secret values. Never commit `.env`.
- **SQLite CLI**: `sqlite3` must be on `PATH` (often `/usr/bin/sqlite3`). Prisma does not need a SQLite daemon.
- **New database**: `prisma/database.db` missing, or `User` count is 0 → `npx prisma migrate deploy` then `npx prisma db seed`.
- **Existing database**: apply migrations only; **do not** re-seed. Re-seeding fails on unique `username` and would reset local tournament data.
- **HMAC_SALT**: changing it after seed breaks login hashes. If you must rotate it, wipe the DB file and seed again (destructive; ask first).
- Do not run `npx prisma migrate dev` in this flow (it is interactive). Use `migrate deploy`.

## If the helper is missing

Same order as the script: toolchain → `npm install` if needed → `.env` → `npx prisma generate` → `npx prisma migrate deploy` → seed only if new/empty → `npm run dev` if port 3000 is free.

Details also live in [README.md](../../../README.md) (`DATABASE_URL`, generate, migrate, `npm run dev`). Seed is configured in `package.json` (`prisma.seed`) even though the README omits `npx prisma db seed`.
