/**
 * robots.txt — allow the public marketing site, keep crawlers out of the
 * admin console and API routes. Points to the sitemap.
 */
import type { MetadataRoute } from "next";

const BASE = "https://wobedibilotto.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api"],
    },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
