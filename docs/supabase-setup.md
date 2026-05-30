# Supabase Setup

End-to-end walkthrough: create the Supabase project, apply the schema, seed it, point the Next.js app at it, and create the single admin user.

> **Status check:** if `node_modules/@supabase/supabase-js` and `node_modules/@supabase/ssr` exist, the app is ready for Supabase. The site already works **without** Supabase (everything falls back to the in-memory mocks in [lib/games.ts](../lib/games.ts) / [lib/results.ts](../lib/results.ts)). Setting env vars switches it over automatically.

---

## Option A — Hosted Supabase project (production / staging path)

### 1. Create the project

1. Sign in at [supabase.com/dashboard](https://supabase.com/dashboard).
2. New Project → name it `accurate-giant` (or whatever you prefer) → choose a Ghana-relevant region (e.g. `eu-west-1` or the closest available).
3. Set and **save** the database password — you'll need it for the CLI link.
4. Wait for provisioning (~2 min).

### 2. Get the keys

Project Settings → API. Copy these into `.env.local` at the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>
SUPABASE_SERVICE_ROLE_KEY=<service role key>
```

> **The `URL` field must be the `https://...supabase.co` URL.** It is NOT a key. The two keys (anon + service role) go in the two key fields below it. Mixing them up is the most common setup error.

### 3. Apply migrations

Install the [Supabase CLI](https://supabase.com/docs/guides/cli) once:

```bash
npm install -g supabase
# or: brew install supabase/tap/supabase
```

Then from the project root:

```bash
supabase link --project-ref <project-ref>
supabase db push        # applies supabase/migrations/*.sql in order
```

Verify in Supabase Studio → Table Editor that `games`, `draws`, `winning_numbers`, `agents`, `posts` exist.

### 4. Seed the database (optional — only for staging / dev)

```bash
psql "postgresql://postgres:<password>@db.<ref>.supabase.co:5432/postgres" -f supabase/seed.sql
```

Or paste the contents of [supabase/seed.sql](../supabase/seed.sql) into Supabase Studio → SQL Editor and Run.

> **Don't seed production.** Real data flows in via the results pipeline (super prompt §8 step 7) and the admin UI.

### 5. Create the admin user

The seed file does not create users (auth lives in a separate schema). Either:

- **Studio path:** Authentication → Users → Add User → enter the admin email + password. Make sure "Auto Confirm User" is on.
- **CLI path:** `supabase auth users invite admin@wobedibilotto.com` and finish via the email link.

Sign-ups are disabled in [supabase/config.toml](../supabase/config.toml) and [auth] policy — only manually-created users can sign in.

### 6. Restart the Next.js dev server

```bash
# Ctrl-C the running dev server
npm run dev
```

Visit [http://localhost:3000/admin/login](http://localhost:3000/admin/login). Sign in with the admin user. You'll be redirected to `/admin`. Public pages (`/`, `/games`, `/results`, etc.) now read from Supabase.

If you don't sign in but visit `/admin`, middleware will redirect you to `/admin/login?from=/admin`. After sign-in, you land back on `/admin`.

---

## Option B — Local Supabase (offline / dev path)

Useful when iterating without a network round-trip on every query.

### 1. Install Docker

Required by the Supabase CLI. https://www.docker.com/products/docker-desktop/

### 2. Boot the local stack

```bash
supabase start
```

The CLI prints local URLs and keys when ready:

```
API URL: http://127.0.0.1:54321
DB URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres
Studio URL: http://127.0.0.1:54323
anon key: <local anon key>
service_role key: <local service key>
```

### 3. Apply migrations + seed

```bash
supabase db reset
```

This wipes the local DB, applies every migration in `supabase/migrations/`, and runs `supabase/seed.sql`.

### 4. Point the app at local Supabase

`.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<local anon key from step 2>
SUPABASE_SERVICE_ROLE_KEY=<local service key from step 2>
```

### 5. Create a local admin user

```bash
# Inbucket is the local email catcher at http://127.0.0.1:54324
# Invitation links land there.
supabase auth users invite admin@local.test
```

Open Inbucket, click the invitation link, set a password.

### 6. Develop

```bash
npm run dev
```

Stop the local stack when done:

```bash
supabase stop
```

---

## How the app behaves with / without Supabase

| State | Result |
|-------|--------|
| Env vars unset | Falls back to in-memory mocks. `/admin` is **not** auth-gated (middleware skips). Suitable for local exploration only. |
| Env vars set | Supabase is the source of truth. `/admin` requires a valid session. Public pages read live data with RLS applied. |

Both modes share the same data shape — switching between them is a single env-var toggle.

The fallback is implemented in [lib/data.ts](../lib/data.ts) via `isSupabaseConfigured()` — see [lib/supabase-server.ts](../lib/supabase-server.ts). On a Supabase fetch failure, it logs and falls back to mocks rather than crashing the page; production should monitor those logs.

---

## Day-2 operations

### Generate fresh TypeScript types after a schema change

```bash
supabase gen types typescript --linked > lib/database.types.ts
# or for local:
supabase gen types typescript --local > lib/database.types.ts
```

### Roll a new migration

```bash
supabase migration new <name>
# edit the generated SQL file
supabase db push        # remote
# or
supabase db reset       # local — wipes and re-applies everything
```

### Audit RLS

Studio → Authentication → Policies. Compare against [`supabase/migrations/0002_row_level_security.sql`](../supabase/migrations/0002_row_level_security.sql). The defaults are:

- Public **read** on `published = true` rows of `draws`, `posts`; on `approved = true` rows of `agents`; on every row of `games`.
- Authenticated **write** on every table. When multi-editor support is needed, narrow the `authenticated` policies to a role check (e.g. `auth.jwt() ->> 'role' = 'admin'`).

### Inspect the live schema

```bash
supabase db dump --schema public --data-only=false
```

---

## Common errors

**"Cannot find module '@supabase/supabase-js'"**
The package isn't installed. `npm install @supabase/supabase-js @supabase/ssr`.

**"Missing env var NEXT_PUBLIC_SUPABASE_URL"**
Restart the dev server after editing `.env.local`. Next reads env at boot, not on every request.

**Login form reports "Invalid login credentials"**
Either the user doesn't exist (create via Studio or `supabase auth users invite`), or the password is wrong, or the user isn't auto-confirmed.

**Public pages return empty arrays where mocks would render rows**
Check Supabase Studio: `select count(*) from draws where published = true`. If it's 0, run `supabase/seed.sql` or publish via `/admin`.

**Middleware redirects in an infinite loop**
Usually because `additional_redirect_urls` in `supabase/config.toml` doesn't include `http://localhost:3000/admin`. Update, restart `supabase start` (local) or update the same setting in Studio → Authentication → URL Configuration (hosted).
