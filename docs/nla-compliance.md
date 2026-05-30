# NLA & Regulatory Compliance — Wobedi Bi Lotto website

**Status:** Discovery output. Source for the pre-launch compliance pass in deliverable §8 step 9 of `AccurateGiant_SuperPrompt.md`. **Site cannot deploy to production until every checklist item below is signed off.**

**Caveats up front:**
- This document is built from the public-facing material on `nla.com.gh` (homepage, `/products`, `/responsible-gaming`) and the super prompt's regulatory list (§7). It is **not legal advice** and does **not substitute for sign-off by counsel** familiar with Ghana's gaming and data-protection law.
- The owner must confirm with NLA and (where relevant) the Gaming Commission of Ghana that this checklist captures every required disclosure for an NLA-licensed charity operator.
- Any item below marked **(LEGAL)** needs counsel review before launch.

---

## 1. Statutes and frameworks referenced

| Reference | What it covers | Where it touches the site |
|-----------|----------------|---------------------------|
| **National Lotto Act 2006 (Act 722)** | Establishes the NLA; governs lotto operation in Ghana. Linked as PDF in NLA's footer. | Footer reference + License page citation |
| **WLA Responsible Gaming Principles (2006)** | Industry framework NLA aligns to. | Cited on `/responsible-play` |
| **WLA Level 2 Responsible Gaming Framework (NLA cert. June 2023)** | The certification level NLA has reached. | Cited on `/responsible-play` and `/about` |
| **Ghana Data Protection Act 2012 (Act 843)** | Personal-data handling, consent, data-subject rights. | Privacy policy + cookie banner + every form |
| **NLA license terms** | Specific to Wobedi Bi Lotto — license number, scope (Accra), renewal date. | Footer (license number) + License page |

---

## 2. Mandatory site-wide disclosures (every page)

Every public page of the site MUST surface these in the footer (or other consistently visible region):

- [ ] **NLA license number** — owner to supply exact number to display.
- [ ] **"18+ only" badge** — visible without scrolling on game and results pages; in footer everywhere else.
- [ ] **"Play responsibly" link** → `/responsible-play`.
- [ ] **Charity-status disclosure** — short line identifying Wobedi Bi Lotto as a licensed charity.
- [ ] **Operator legal name** — "Wobedi Bi Lotto" in copyright line.

> Implementation: place these in the global `<Footer>` component plus the trust strip on Home and every `/games/[slug]` page (per `content-inventory.md` §3).

---

## 3. Page-level mandatory requirements

### `/responsible-play` — MANDATORY existence

Required content (minimum):

- [ ] 18+ age requirement statement.
- [ ] Plain-language "play within your means" guidance.
- [ ] Cite WLA principles and Act 722 (mirrors NLA's framing).
- [ ] **Self-exclusion mechanism** — confirm with owner whether Wobedi Bi Lotto operates its own, or refers users to an NLA / external programme.
- [ ] **Support resources / helplines** — Ghana-specific. Owner to supply contacts.
- [ ] Underage-play reporting route — at minimum a contact email/phone.
- [ ] Visible from every game page and the results page.

### `/about` — License & charity disclosure

- [ ] Full NLA license number with effective dates if applicable.
- [ ] License scope ("licensed to operate lotto in Accra" or per the actual license wording).
- [ ] Charity registration details (registry, number) — (OWNER).
- [ ] Audited annual giving figures — (OWNER).
- [ ] Leadership / board composition — (OWNER).

### `/legal/license` (or equivalent within `/about`)

- [ ] Display the NLA license details verbatim.
- [ ] Link to Act 722 (PDF — mirror or link to NLA's hosted copy with permission).
- [ ] Link to WLA framework reference page.

### `/legal/privacy`

- [ ] Compliant with Ghana Data Protection Act (Act 843). **(LEGAL)**
- [ ] Categories of data collected (contact form, cookies, any analytics).
- [ ] Lawful basis for each.
- [ ] Data-subject rights (access, correction, deletion).
- [ ] Data Controller identity + contact route.
- [ ] Retention periods.
- [ ] Third-party processors (Vercel, Supabase, analytics if used).
- [ ] Cross-border transfer disclosure (Vercel and Supabase are non-Ghana hosted — **(LEGAL)**).

### `/legal/terms`

- [ ] Drafted by counsel. **(LEGAL)**
- [ ] Cites Act 722 and the operator's NLA licence.
- [ ] Disclaims results-data accuracy if mirrored (proposed: "Official results are published by the National Lottery Authority. We mirror them as a convenience; in case of discrepancy, NLA's record is authoritative.").

### `/legal/cookies`

- [ ] Lists every cookie / local-storage entry used.
- [ ] Pairs with the consent banner (no non-essential cookies fire before consent).
- [ ] Manage-preferences re-entry point.

---

## 4. NLA logo and branding usage

Per super prompt §7:

- [ ] **DO NOT display the NLA logo anywhere** until written permission from NLA is on file.
- [ ] When permission is granted, restrict its appearance to the License & About pages only.
- [ ] Document the permission (correspondence, scope, expiry) under `docs/decisions/` as an ADR before deploy.
- [ ] Do NOT imply NLA endorsement beyond licensure. Suggested neutral phrasing: "Licensed by the National Lottery Authority of Ghana."

---

## 5. Results-data sourcing & disclosures

- [ ] **DO NOT scrape `nla.com.gh` on every page request** (super prompt §9).
- [ ] Mirror with documented permission and a documented refresh cadence (proposed: 5-minute polling for active draw windows, hourly otherwise — owner to confirm with NLA).
- [ ] Display freshness disclosure on `/results`: e.g. "Updated within minutes of each official NLA draw. Source: National Lottery Authority. Last updated <timestamp>." — exact wording (NLA / OWNER).
- [ ] Include a "in case of discrepancy, NLA's record is authoritative" disclaimer on `/results` and per-game results.
- [ ] If mirroring requires a written data-use agreement with NLA, store the agreement reference under `docs/decisions/`.

---

## 6. Forms & data collection

For every form on the site (contact, agent enquiry, admin login):

- [ ] Plain-language consent / privacy notice next to the submit button.
- [ ] Link to `/legal/privacy`.
- [ ] Server-side validation via Zod schemas (already in stack — `lib/schemas`).
- [ ] No PII written to client-side analytics.
- [ ] Admin login (Supabase Auth) restricted to allowlisted email(s); enforce 2FA if Supabase plan supports it. (OWNER)

---

## 7. Cookie consent

- [ ] Banner appears on first visit; non-essential cookies (analytics) blocked until accept.
- [ ] "Accept all" / "Reject non-essential" / "Manage preferences" — three explicit options.
- [ ] Re-entry point in footer ("Cookie preferences").
- [ ] Choice persists per Ghana DPA expectations. **(LEGAL)** to confirm retention period.

---

## 8. Accessibility (touches compliance even if not strictly required)

- [ ] WCAG 2.1 AA conformance per super prompt §10 acceptance criteria.
- [ ] axe-core automated check passes on every page.
- [ ] All age-gating / consent flows operable via keyboard and screen reader.

---

## 9. Pre-launch checklist (gate to production)

The site MUST NOT deploy to production until every box below is checked:

### Disclosures
- [ ] License number visible on every page footer.
- [ ] "18+" badge visible on every page footer + on game / results pages.
- [ ] "Play responsibly" link present on every page footer.
- [ ] Charity-status disclosure on Home and About.
- [ ] Operator legal name in copyright line.

### Pages
- [ ] `/responsible-play` exists and meets §3 requirements above.
- [ ] `/about` displays license and charity registration.
- [ ] `/legal/privacy`, `/legal/terms`, `/legal/license`, `/legal/cookies` reviewed by counsel. **(LEGAL)**

### NLA logo & data
- [ ] NLA logo NOT used unless written permission documented.
- [ ] Results-data sourcing agreement (or written confirmation) on file.
- [ ] Refresh cadence documented in `docs/decisions/`.

### Data protection
- [ ] Privacy policy approved by counsel. **(LEGAL)**
- [ ] Cookie consent banner functional, non-essential cookies blocked pre-consent.
- [ ] Forms display privacy notice and link.
- [ ] Cross-border transfer disclosure present (Vercel / Supabase). **(LEGAL)**

### Operational
- [ ] Admin route gated, single admin or allowlisted users only.
- [ ] Monitoring + alerting set up for the results pipeline.
- [ ] Admin runbook in `docs/`.

### Sign-off
- [ ] Project owner sign-off.
- [ ] Counsel sign-off on **(LEGAL)** items.
- [ ] (Recommended) NLA written acknowledgement of the site and the disclosures used.

---

## 10. Open items requiring owner / counsel input

1. Exact NLA license number to display — (OWNER).
2. Has NLA logo-use permission been requested? — (OWNER).
3. Has NLA results-data permission been requested? — (OWNER).
4. Self-exclusion: operate in-house or refer out? — (OWNER).
5. Ghana-specific support helplines for `/responsible-play` — (OWNER).
6. Counsel engaged for Privacy / Terms / Cookie review? — (OWNER).
7. Confirmation that Vercel + Supabase hosting (non-Ghana) is acceptable under Act 843 — **(LEGAL)**.
8. Is there a Gaming Commission of Ghana disclosure separate from NLA? — (OWNER / LEGAL) to confirm.
9. Who is the named Data Controller for Act 843 purposes? — (OWNER).
10. Charity registration body and number for the disclosure line — (OWNER).
