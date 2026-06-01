# Deploying to Vercel (team review)

This is the quickest path to a shareable preview URL. (For a self-hosted VM
deploy instead, see [README.md](./README.md) in this folder — that path uses
the `output: "standalone"` build, nginx, and supervisor. Vercel ignores the
`standalone` setting, so the same repo deploys both ways with no changes.)

## 1. Import the repo

1. Go to <https://vercel.com/new> and import
   `github.com/lazy-logic/Wobedi-bi-Lotto-Website`.
2. Framework preset: **Next.js** (auto-detected). Leave build/output settings
   at their defaults — `next build`, no overrides needed.
3. Don't deploy yet — add the environment variables first (next step), or the
   first build will succeed but the site will run in mock-data mode and the
   contact form / admin will be disabled.

## 2. Environment variables

Add these under **Project → Settings → Environment Variables** (set them for
Production **and** Preview so review deployments work too). Values come from
your existing `.env.local` — see [`.env.example`](../.env.example) for where
each one is sourced.

| Variable | Scope | Notes |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Public | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | **Server only** | Bypasses RLS — never prefix `NEXT_PUBLIC_` |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Public | Optional; the contact map still works without it |
| `LOTUS_API_BASE_URL` | Server only | Draw-results sync (cron); optional for review |
| `LOTUS_API_TOKEN` | Server only | Draw-results sync (cron); optional for review |
| `CRON_SECRET` | Server only | Only needed if the results cron runs |

The Lotus/cron vars are not needed just to review the site — results read from
whatever is already in Supabase. They only matter once the 15-minute sync runs.

## 3. Apply the contact-form migration (one-time, manual)

The contact form writes to a `contact_messages` table that must exist in the
live Supabase database before submissions can persist. Until it's applied, the
form shows a graceful "not available right now" message instead of erroring.

In the Supabase dashboard → **SQL Editor → New query**, paste and run the
contents of
[`supabase/migrations/0004_contact_messages.sql`](../supabase/migrations/0004_contact_messages.sql).

(All earlier migrations `0001`–`0003` are assumed already applied — they back
the games, draws, results, and admin auth that the rest of the site uses.)

## 4. Deploy

Click **Deploy**. Vercel gives:

- a **Production URL** on pushes to `main`, and
- a unique **Preview URL** for every branch / PR — share these with the team
  for review.

## Notes for reviewers

- **Contact form** (`/contact`): submits via a server action into Supabase; no
  email is sent — submissions appear in the admin inbox at `/admin/messages`.
- **Admin** (`/admin/*`): gated by Supabase Auth (middleware). Reviewers need an
  admin account to see the inbox; the public form works without one.
- **Secrets**: `.env.local` is git-ignored and never committed — all keys live
  only in Vercel's env settings.
