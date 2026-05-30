/**
 * Homepage — Wobedi Bi Lotto.
 *
 * Six editorial sections, numbered 01 → 06, each carrying content lifted
 * directly from the company brief. No archive imagery, no agent-recruit
 * push, no charity manifesto — only the material the brief explicitly
 * authorises.
 *
 *   01. Hero            — statement headline + 7 colour balls (NLA 5/90)
 *   02. WhoWeAre        — "Who We Are" + "What Our Business Is"
 *   03. WhatWeDo        — six commitments grid (doc verbatim)
 *   04. GamesShowcase   — VAG · Noon Rush · Main Games (doc catalogue)
 *   05. VisionMission   — vision + mission, both doc verbatim
 *   06. ResponsibleHook — entrypoint into /responsible-play
 */
import { Hero } from "@/components/home/Hero";
import { WhoWeAre } from "@/components/home/WhoWeAre";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { GamesShowcase } from "@/components/home/GamesShowcase";
import { VisionMission } from "@/components/home/VisionMission";
import { ResponsibleHook } from "@/components/home/ResponsibleHook";
import { generateOrganizationSchema, jsonLd } from "@/lib/structured-data";

export default function HomePage() {
  return (
    <>
      {/* Organization JSON-LD — lets search engines render the brand
          knowledge panel (name, logo, NLA framework, area served). */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(generateOrganizationSchema()) }}
      />
      <Hero />
      <WhoWeAre />
      <WhatWeDo />
      <GamesShowcase />
      <VisionMission />
      <ResponsibleHook />
    </>
  );
}
