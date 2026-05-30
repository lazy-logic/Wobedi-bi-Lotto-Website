# Wobedi Bi Lotto — website

Marketing and information site for **Wobedi Bi Lotto**, an NLA-licensed
private lotto operator in Ghana. NLA 5/90 draws across the week, a network
of approved agents and writers, and the regulatory disclosures required
under the National Lotto Act 2006 (Act 722).

---

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> First time after `git clone`? Run `npm install` once. Until you do, your IDE will flag "Cannot find module 'next/link'" everywhere — it's just unresolved imports.

## Scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Local dev server (http://localhost:3000) |
| `npm run build` | Production build |
| `npm run start` | Run the production build locally |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` — should run clean before any PR |

## Stack

- **Framework:** Next.js 15 (App Router) + React 19 + TypeScript (strict)
- **Styling:** Tailwind CSS v4 with `--brand-*` custom properties (CSS-first config in [app/globals.css](app/globals.css))
- **Animation:** Framer Motion (`layoutId` for nav + card morph transitions)
- **Icons:** Lucide React
- **Fonts:** `next/font/google` — Outfit (display + body) + Montserrat (eyebrows/ticker/numerals), see [ADR 0010](docs/decisions/0010-outfit-montserrat-type-pair.md)
- **Map:** Mapbox GL JS for the agents locator
- **Data:** Supabase (with in-memory mock fallback)

## Project layout

```
app/                            # Next.js App Router
├── layout.tsx                  # Fonts, Header, Footer, ScrollToTop
├── globals.css                 # Tailwind v4 + design tokens
├── page.tsx                    # Home
├── games/                      # Catalogue + per-game detail
├── results/                    # Results page + per-game archive
├── agents/                     # Mapbox locator
├── how-to-play/
├── about/                      # Minimal — mission + license card + CTA
├── contact/                    # Form + office details
├── responsible-play/
├── legal/{terms,privacy,license,cookies}/
├── admin/                      # Sidebar shell behind Supabase auth
└── api/admin/{login,logout}    # Auth route handlers
components/
├── layout/                     # Header, Footer, PageHeader, Container, …
├── agents/                     # AgentMap, AgentLocator
├── games/                      # GameTile, GameLogo (3D ball)
├── home/                       # Hero, WeekSchedule, ResultsWidget, …
├── marketing/                  # PhoneFrame, TypewriterRotate, HowItWorks
├── results/                    # NumberChip, NumberRow, LatestDrawCard
└── ui/                         # Button, Badge
lib/
├── data.ts                     # Async fetchers (Supabase or mock fallback)
├── games.ts                    # Game catalogue (11 games)
├── results.ts                  # Mock winning numbers w/ DOW math
├── agents.ts                   # Mock Accra agent locations
├── regulatory.ts               # NLA register URL + licence-number constant
├── supabase.ts / supabase-server.ts  # Supabase clients (anon + SSR)
└── utils.ts                    # cn(), date helpers, daysUntilNextDraw()
supabase/
├── migrations/                 # 0001 schema, 0002 RLS
└── seed.sql                    # Idempotent seed (DOW-based draw dates)
docs/                           # Discovery + design + ADRs
public/games/                   # 11 game logos + 1 ball-cradle decorative asset
public/brand/                   # Wobedi Bi Lotto logo
public/app-screenshot/          # Mobile-app screenshots used in marketing
```

## How to read the codebase

Every file has a header comment. Key conventions:

- **Design tokens** are the `@theme` block in [app/globals.css](app/globals.css). Components reference `bg-brand-primary`, `font-display`, etc. — never hardcode hex/font/radius values.
- **`cn()`** in [lib/utils.ts](lib/utils.ts) merges Tailwind classes. `clsx` + `tailwind-merge`.
- **Game data** flows from [lib/games.ts](lib/games.ts). Each game has a `ballColor` (hex) for the per-card top stripe in `LatestDrawCard`.
- **Results data** flows from [lib/results.ts](lib/results.ts). Mock dates use day-of-week math so each game's most-recent draw lands on its scheduled weekday.
- **Async fetchers** in [lib/data.ts](lib/data.ts) auto-detect Supabase via env vars and fall back to mocks. Helper signatures match across both modes — no call-site changes when toggling.
- **Compliance disclosures** (NLA-registered badge, 18+, Responsible play link) render in the global `Footer` via `lib/regulatory.ts` constants. The badge links to the public NLA register; once you supply `NLA_LICENCE_NUMBER`, every badge swaps to the formal number automatically.

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Where it's used | Notes |
|----------|-----------------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Public + admin reads/writes | `https://<ref>.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public reads (RLS-bound) | `eyJ...` JWT or new `sb_publishable_...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only writes (results pipeline, admin actions) | Bypasses RLS — never expose to the browser |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Agents map | Public token (`pk.`); restrict to your domains in the Mapbox dashboard |

The site falls back to in-memory mocks if Supabase env vars are missing — `/admin` auth gate also softens out, so the rest of the site stays browseable.

---

## Deploy to Vercel

### 1. Push to a Git remote

The repo is initialised with a `main` branch. Create a remote and push:

```bash
gh repo create wobedibi --private --source=. --push
# or
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. Import into Vercel

- [vercel.com/new](https://vercel.com/new) → Import the repo
- Framework preset: **Next.js** (auto-detected)
- Build Command: `npm run build` (default)
- Output: `.next` (default)
- Install Command: `npm install` (default)
- Root Directory: `./` (default)

### 3. Set environment variables in Vercel

Project Settings → Environment Variables. Add the four from the table above for **Production, Preview, Development**.

| Variable | Visibility |
|----------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | All envs |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | All envs |
| `SUPABASE_SERVICE_ROLE_KEY` | All envs (server-only — Vercel keeps `NEXT_PUBLIC_*` separate) |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | All envs |

### 4. Restrict the Mapbox token

Before going live, lock the token down in [account.mapbox.com/access-tokens](https://account.mapbox.com/access-tokens):

- Add URL restrictions for your Vercel preview + production domains
- Restrict scopes to `styles:read`, `fonts:read`, `tilesets:read`

Otherwise anyone who views the site can scrape the token and bill it against your account.

### 5. Wire Supabase to Vercel

If you haven't already applied the schema:

```bash
supabase link --project-ref <ref>
supabase db push                # applies supabase/migrations/0001 + 0002
psql "<connection string>" -f supabase/seed.sql   # optional dev data
```

### 6. Deploy

Push to `main` → Vercel auto-builds and deploys. PR branches get preview URLs.

---

## Outstanding owner-supplied items

Marked as `[OWNER]` / `[TBC]` in the codebase. Tracked in [docs/content-inventory.md §4](docs/content-inventory.md):

1. Formal NLA licence number — populates `NLA_LICENCE_NUMBER` in `lib/regulatory.ts`; every badge auto-updates
2. Real Accra agent list — replaces `lib/agents.ts` mock
3. Per-game ticket prices, exact draw times, prize structures (NLA-sourced)
4. Self-exclusion mechanism — confirm in-house vs. NLA referral
5. Ghana-specific support helplines (responsible-play page)
6. Real winners' stories + photography (homepage strip)
7. Final office phone number
8. Privacy / Terms / License / Cookies — counsel review of the drafts in `app/legal/*`

## Pre-launch compliance gate

See [docs/nla-compliance.md §9](docs/nla-compliance.md) for the full checklist. Short version:

- ✅ NLA-registered badge + 18+ badge + Responsible play link in the global footer
- ✅ `/responsible-play` exists and is keyboard / screen-reader accessible
- ✅ NLA register linked from footer / TrustStrip / About / License pages
- ⏳ NLA logo permission (must not appear until permission documented)
- ⏳ Results-data permission + refresh cadence
- ⏳ Privacy / Terms / License / Cookies reviewed by counsel
