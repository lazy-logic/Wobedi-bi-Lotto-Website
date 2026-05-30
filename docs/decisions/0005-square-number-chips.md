# 0005 — Square (not rounded) number chips

**Status:** Accepted (2026-04-29)

## Context

The signature element on `/results` is the row of winning numbers. Conventional lottery sites (and even the modern reference, agentlotto.com) render numbers as circles or pill-shapes. The brand direction is "calm, premium, considered, regulator-credible".

## Decision

Render winning-number chips as **squares** (`radius-none`). White Inter numerals at weight 600, on a `--brand-primary` background. Bonus / supplementary balls use `--brand-secondary`.

## Consequences

- Reads as "official record" rather than "decoration" or "scratch-card."
- Aligns with the calm-fintech direction and the tone-of-voice rule "numbers are sacred — never decorate".
- Visually distinct from competitor lottery sites in the same market — quietly differentiated, not loudly.
- One small downside: square chips on a phone screen look slightly more rigid than circles. The size scaling (`md` size on mobile, `lg` on desktop) softens this.
- Bonus-ball cyan against white may feel slightly low-contrast — that's why bonus chips use the cyan as *background* with dark-ink numerals on top, not white.
