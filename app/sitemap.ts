/**
 * Dynamic sitemap — static marketing/legal routes + one entry per game
 * (catalogue + results archive). Next.js serves this at /sitemap.xml.
 *
 * Game slugs come from the in-memory catalogue (lib/games), which mirrors
 * the Supabase `games` table, so the sitemap stays accurate whether the
 * data layer is mock or live.
 */
import type { MetadataRoute } from "next";
import { games } from "@/lib/games";

const BASE = "https://wobedibilotto.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/results`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/games`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/how-to-play`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/responsible-play`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/media`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/legal/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/legal/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const gameRoutes: MetadataRoute.Sitemap = games.flatMap((g) => [
    {
      url: `${BASE}/games/${g.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
    {
      url: `${BASE}/results/${g.slug}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.7,
    },
  ]);

  return [...staticRoutes, ...gameRoutes];
}
