/**
 * JSON-LD structured-data builders. Rendered into pages via a
 * <script type="application/ld+json"> tag so search engines can parse the
 * organisation, breadcrumbs, and game/draw entities.
 *
 * Keep these pure (no fetch) — callers pass the data they already have.
 */
import { NLA_ACT_LABEL, NLA_REGISTER_URL } from "@/lib/regulatory";
import type { Game } from "@/lib/games";
import type { Draw } from "@/lib/results";

const BASE = "https://wobedibilotto.com";

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Wobedi Bi Lotto",
    url: BASE,
    logo: `${BASE}/brand/wobedibi-logo.png`,
    description:
      "Trusted NLA-licensed lotto operator in Ghana. NLA 5/90 draws — VAG, Noon Rush, and Main Games — operating under the National Lotto Act 2006 (Act 722).",
    areaServed: { "@type": "Country", name: "Ghana" },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Adansi-Asokwa",
      addressRegion: "Ashanti Region",
      addressCountry: "GH",
    },
    sameAs: [NLA_REGISTER_URL],
    knowsAbout: ["NLA 5/90 lottery", "Responsible gaming", NLA_ACT_LABEL],
  };
}

export function generateBreadcrumbSchema(
  items: { label: string; href?: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${BASE}${item.href}` } : {}),
    })),
  };
}

export function generateGameSchema(game: Game, latest?: Draw) {
  return {
    "@context": "https://schema.org",
    "@type": "Game",
    name: game.name,
    url: `${BASE}/games/${game.slug}`,
    description: game.longDescription ?? game.hook,
    gameItem: { "@type": "Thing", name: "NLA 5/90" },
    provider: { "@type": "Organization", name: "Wobedi Bi Lotto", url: BASE },
    ...(latest
      ? {
          subjectOf: {
            "@type": "Event",
            name: `${game.name} draw #${latest.drawNumber}`,
            startDate: latest.drawDate,
            eventStatus: "https://schema.org/EventScheduled",
          },
        }
      : {}),
  };
}

/** Convenience: serialise a schema object for dangerouslySetInnerHTML. */
export function jsonLd(schema: unknown): string {
  return JSON.stringify(schema);
}
