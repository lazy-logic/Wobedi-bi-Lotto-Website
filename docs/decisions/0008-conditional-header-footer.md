# 0008 — Conditional Header/Footer rather than route groups

**Status:** Accepted (2026-04-29)

## Context

The `/admin` route has its own chrome (sidebar nav + admin header) and shouldn't render the public-site Header / Footer above and below it. There are two standard Next.js App Router patterns:

1. **Route groups.** Move every public page into `app/(public)/...` with a `(public)/layout.tsx` that owns Header + Footer. The root `app/layout.tsx` becomes minimal (html / body / fonts only). `app/admin/...` lives outside the group with its own layout.
2. **Conditional render.** Keep the root layout as the source of Header + Footer. Make those components return `null` on `/admin` paths.

## Decision

Use option 2 — conditional render. Header and Footer both call `usePathname()` and early-return `null` when the pathname starts with `/admin`.

## Consequences

- Avoids the ~15-file move that route groups would require. Path-equivalent files would otherwise have changed import paths, broken any in-flight feature work, and obscured the "what changed" diff.
- Footer becomes a client component (it needed `usePathname`). Tiny cost — it has no server-only logic.
- Adding a third top-level surface (e.g. a dedicated marketing landing experience that *also* wants its own chrome) means another condition in Header/Footer rather than a new route group. If a third surface lands, refactor to route groups at that point — the cost-benefit flips.
- The conditional logic lives in two places (`Header.tsx`, `Footer.tsx`); if you add a third surface, add the check in both. Search for `pathname?.startsWith("/admin")` to find both check sites.
