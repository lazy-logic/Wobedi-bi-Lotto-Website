# Content Inventory — Wobedi Bi Lotto website

**Status:** Discovery output. Source for the content load in deliverable §8 step 8 of `AccurateGiant_SuperPrompt.md`. Every entry below must be ready before launch — copy is owner-supplied unless marked "draftable from references".

**Conventions:**
- **(OWNER)** = copy or fact must be supplied by the project owner.
- **(NLA)** = needs verification or sourcing from the National Lottery Authority directly.
- **(DRAFT)** = drafted on placeholder copy that owner reviews and approves.

---

## 1. Game catalogue (seeds the `games` Supabase table)

Pulled from `public/inspiration/nla-products/extracted.md`. **Every "TBC" must be filled before content load.**

| Slug | Display name | Origin / hook | Schedule | Price (GHS) | Prize structure | Channel | Logo |
|------|--------------|---------------|----------|-------------|-----------------|---------|------|
| `national-week-lotto` | National Week Lotto | Flagship since Dec 1962. Most-patronised game. | TBC (NLA) | TBC (NLA) | TBC (NLA) | Standard | (OWNER) |
| `mid-week` | Mid Week | 5/90 fixed-odds, introduced Aug 2003. Second-most popular. | Wednesdays | TBC (NLA) | TBC (NLA) | Standard | (OWNER) |
| `monday-special` | Monday Special | Welcomes players from the weekend. 5/90 fixed odds. | Mondays | TBC (NLA) | 5/90 fixed odds | Standard | (OWNER) |
| `lucky-tuesday` | Lucky Tuesday | "For lucky people with lucky numbers." | Tuesdays | TBC (NLA) | TBC (NLA) | Standard | (OWNER) |
| `fortune-thursday` | Fortune Thursday | "Designed to turn fortunes around." 5/90 fixed odds. | Thursdays | TBC (NLA) | 5/90 fixed odds | Standard | (OWNER) |
| `friday-bonanza` | Friday Bonanza | "Positive energy for the weekend." | Fridays | TBC (NLA) | TBC (NLA) | Standard | (OWNER) |
| `sunday-aseda` | Sunday Aseda | 5/90 fixed odds since Jul 2022. *Aseda* = thanksgiving. | Sundays | TBC (NLA) | 5/90 fixed odds | Standard | (OWNER) |
| `vag-lotto` | VAG Lotto | Veterans Administration Ghana partnership. Launched Jul 2019. | TBC (NLA) | TBC (NLA) | TBC (NLA) | Standard | (OWNER) |
| `caritas-lottery` | Caritas Lottery | Conducted under National Lotto Act 722. | TBC (NLA) | TBC (NLA) | TBC (NLA) | Standard | (OWNER) |
| `atena` | Atena | "Ultimate game for lotto players and sports fans." | TBC (NLA) | TBC (NLA) | TBC (NLA) | Standard | (OWNER) |
| `lucky-3` | Lucky 3 | Mobile-phone game. Pick 3 numbers. | Daily | TBC (NLA) | TBC (NLA) | USSD `*987#` | (OWNER) |
| `787` | 787 | Simplifies the lottery experience. | TBC (NLA) | TBC (NLA) | TBC (NLA) | TBC (NLA) | (OWNER) |
| `daywa-5-39-direct` | Daywa 5/39 Direct | "Best odds in Ghana." Direct 1–5, Perm, Banker. | TBC (NLA) | TBC (NLA) | Direct/Perm/Banker | USSD `*446#` | (OWNER) |
| `super-6` | Super 6 | Daily fixed-odds, Mon–Sat. **POS terminals only.** | Mon–Sat | TBC (NLA) | Fixed odds | POS | (OWNER) |
| `noon-rush` | Noon Rush | (No description on source.) (OWNER) | TBC (NLA) | TBC (NLA) | TBC (NLA) | TBC (NLA) | (OWNER) |

> **Important:** the public `nla.com.gh/products` page does NOT publish prices, exact draw times, or prize structures. Every "TBC (NLA)" cell needs an authoritative source — official NLA documentation, per-game NLA detail pages if they exist, or written confirmation. The owner is the right person to chase this.

---

## 2. Per-page copy block list

Maps to the IA in §4 of the super prompt. Every line below is a content block that must exist before launch.

### `/` Home

- Hero headline (charity-first) — (OWNER) (DRAFT placeholder available)
- Hero sub-line — (OWNER) (DRAFT)
- Primary CTA label + target — proposed: "View latest results" → `/results`
- Secondary CTA — proposed: "Find an agent" → `/agents`
- Mission line (single sentence summarising the charity purpose) — (OWNER)
- Latest results widget — auto-populated from `winning_numbers` table, no static copy
- "Featured games" strip — three highest-volume games (per super prompt §4); pick which three with owner
- Trust strip: NLA license number · 18+ badge · Responsible Play link · "Licensed by the National Lottery Authority"
- Winners' stories teaser — 1–3 cards, links to `/news`
- Charity-impact teaser — proposed callout to "Audited annual giving" with link to `/about`
- Agent locator CTA — proposed: "Find a lotto agent near you" → `/agents`
- Newsletter / contact CTA — confirm with owner whether we collect emails

### `/games` (catalogue)

- Page intro — 1–2 sentence framing of "every NLA-licensed game we operate" — (DRAFT)
- Filter UI: Day of week · Channel (Standard / USSD / POS) — labels only
- Per-tile fields drawn from §1 above
- Empty-state copy if filters return nothing — (DRAFT)

### `/games/[slug]` (per game)

For each of the 15 games:

- Hero: name, origin/hook, ticket price, schedule, channel
- "How to play" — 3-step explanation — (NLA / DRAFT per game)
- Prize structure summary — (NLA)
- Recent results for this game — auto-populated
- "Find an agent" CTA → `/agents`
- "Play responsibly · 18+" badge

### `/results`

- Page intro — 1 sentence — (DRAFT)
- "Latest draw" hero card per game (most recent draw)
- Filter row: Game (dropdown) · Start date · End date (mirroring NLA's pattern, modernised)
- Archive table (paginated)
- "How fresh is this data?" disclosure — proposed: "Updated within minutes of each official NLA draw. Source: National Lottery Authority." — (NLA confirms wording)
- Empty-state copy — (DRAFT)

### `/about`

- Mission statement — (OWNER)
- Founding story — (OWNER)
- Leadership / board names + photos + short bios — (OWNER)
- NLA license number + license display — (OWNER) **MANDATORY**
- Audited annual giving figure(s) — (OWNER) — required for charity-status credibility per §7
- Charity registration / regulator references — (OWNER)
- "How we operate" — agent network model summary
- Contact + office address — (OWNER)

### `/how-to-play`

- 3-step or 5-step illustrated explainer — (DRAFT)
- Channel breakdown: Online (information only) · USSD · POS · Agent
- Agent network model summary — (DRAFT)
- FAQ — (DRAFT) covering: ticket validity, prize claim process, age limit, what to do if you win
- Responsible play callout

### `/agents`

- Page intro — 1 sentence — (DRAFT)
- Locator: search by area / list view — needs agent list data
- Per-agent record: name, address, phone, opening hours, area — (OWNER) — **data source TBC**
- Empty / "no agents in this area" copy — (DRAFT)
- "Become an agent" enquiry CTA — confirm with owner whether to include

### `/responsible-play`

- Page intro — (DRAFT, modelled on nla.com.gh/responsible-gaming wording)
- 18+ statement
- "Play within your means" guidance — (DRAFT)
- Self-exclusion mechanism — (OWNER) — **must confirm if Wobedi Bi Lotto operates one or refers out**
- Support resources / helplines — (OWNER) — Ghana-specific contacts
- Reference to WLA principles + Act 722
- "Report underage play" contact route — (OWNER)

### `/news`

- Page intro — (DRAFT)
- Post tile: title, date, excerpt, hero image
- Categories — proposed: Charity outcomes · Winners' stories · Company news
- Empty-state copy — (DRAFT)
- First 3–5 launch posts — (OWNER) — at minimum one charity-outcome story and one winner story

### `/contact`

- Page intro — (DRAFT)
- Contact form fields: name, email, subject, message — confirm with owner
- Office address — (OWNER)
- Phone number(s) — (OWNER)
- Email — (OWNER)
- License number footer
- Social links — (OWNER)
- Map embed — confirm yes/no

### `/legal/*`

- Terms of Service — (OWNER) — likely needs legal review
- Privacy Policy — (OWNER) — must comply with Ghana Data Protection Act (Act 843), see `nla-compliance.md`
- License & Regulation — (OWNER) — display NLA license, regulator references
- Cookie Policy — (OWNER) — paired with consent banner

---

## 3. Recurring components / global content

### Header

- Logo (placeholder until brand kit) → `/`
- Primary nav: Games · Results · How to play · Agents · About · News
- Mobile drawer mirrors above

### Footer (every page)

- Logo + one-line mission
- Nav columns: Play (Games / Results / How to play / Agents) · Company (About / News / Contact / Careers if applicable) · Legal (Terms / Privacy / License / Cookies / Responsible play)
- **NLA license number — MANDATORY on every page** (from `nla-compliance.md`)
- "18+" badge — MANDATORY
- "Play responsibly" link to `/responsible-play` — MANDATORY
- Charity disclosure line — (OWNER)
- Social links — (OWNER)
- Copyright line — © 2026 Wobedi Bi Lotto (DRAFT)

### Trust strip (used on Home + every game detail page)

- NLA license number
- "18+ only"
- "Play responsibly" → `/responsible-play`
- "Licensed charity"

### Cookie consent banner

- Plain-language explanation — (DRAFT)
- "Accept all" / "Reject non-essential" / "Manage preferences"
- Link to `/legal/cookies`

---

## 4. Open content questions (block content load)

1. License number to display? (OWNER)
2. Audited annual-giving figure for the current period? (OWNER)
3. Leadership / board list with photos and bios? (OWNER)
4. List of approved Accra agents (name, address, phone, hours)? (OWNER)
5. Per-game ticket prices, exact draw times, and prize structures? (NLA)
6. Three "featured games" choice for the homepage? (OWNER)
7. Self-exclusion mechanism — operated by Wobedi Bi Lotto or referred to NLA / external service? (OWNER)
8. Photography — commission Ghanaian photography or licence stock? (OWNER)
9. Initial 3–5 news posts (at least one charity outcome, one winner)? (OWNER)
10. Newsletter — collect emails or not in this phase? (OWNER)
