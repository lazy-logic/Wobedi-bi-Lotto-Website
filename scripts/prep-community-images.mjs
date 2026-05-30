/**
 * One-shot encoder for community/impact-page photos.
 *
 * Reads source WhatsApp JPEGs from IMAGES/, produces AVIF + WebP at three
 * widths (1600, 1024, 768) under public/community/. Output naming:
 *   <slug>-<width>w.{avif,webp}
 *
 * Re-run safe: overwrites existing outputs.
 *
 * Usage: node scripts/prep-community-images.mjs
 */
import sharp from "sharp";
import { mkdir, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SRC = join(ROOT, "IMAGES");
const OUT = join(ROOT, "public", "community");

const WIDTHS = [1600, 1024, 768];

const PHOTOS = [
  {
    slug: "chief-applause-sunyani-2020",
    source: "WhatsApp Image 2026-05-08 at 07.25.26 (3).jpeg",
    description: "Chief in white traditional + Chairman AG and team applauding under the AG-gold tent at the Sunyani writers' rewards event, 2020. Anchor for the community band below the home Hero.",
  },
  {
    slug: "patmos-childrens-home-tewobaabi-2020",
    source: "WhatsApp Image 2026-05-08 at 07.25.27.jpeg",
    description: "Charity handover at Patmos Children's Home, Tewobaabi (near Adansi Asokwa) during Chairman AG's birthday, 2020.",
  },
  {
    slug: "agents-town-hall-sunyani-2020",
    source: "WhatsApp Image 2026-05-08 at 07.25.24 (1).jpeg",
    description: "Chairman AG's engagement with writers at Sunyani, 2020 — auditorium of agents.",
  },
  {
    slug: "tv-handover-bechem-2020",
    source: "WhatsApp Image 2026-05-08 at 07.25.22 (1).jpeg",
    description: "CEO Dr Collins Amoah presenting home appliances (Tamashi 42-inch TV) to a deserving writer at Bechem, 2020.",
  },
  {
    slug: "ag-lotteries-launch-obuasi",
    source: "WhatsApp Image 2026-05-08 at 07.25.21.jpeg",
    description: "Launch of AG Lotteries at Obuasi, with team seated under the LOVE:AG backdrop.",
  },
  {
    slug: "nla-license-presentation-2020",
    source: "WhatsApp Image 2026-05-08 at 07.25.20 (6).jpeg",
    description: "Former NLA Board Chairman Gary Nimako Marfo presenting the NLA Operating License to MD Alex Kwofie, with NLA Good Causes Foundation + Caritas Lottery Platform backdrop.",
  },
];

async function ensureDir(path) {
  await mkdir(path, { recursive: true });
}

async function encode(photo) {
  const src = join(SRC, photo.source);
  // Sanity: ensure the source exists before launching encode jobs.
  await stat(src);

  const meta = await sharp(src).metadata();
  console.log(`\n# ${photo.slug}`);
  console.log(`  src: ${photo.source} (${meta.width}x${meta.height})`);

  // Clamp every target width to the source's max — WhatsApp masters are
  // 1280px wide at best, NLA license shot is only 464px. Dedupe so we don't
  // emit two identical files when multiple targets clamp to the same value.
  const targets = [...new Set(WIDTHS.map((w) => Math.min(w, meta.width ?? w)))];

  for (const width of targets) {
    const base = sharp(src).rotate().resize({ width, withoutEnlargement: true });

    const avifOut = join(OUT, `${photo.slug}-${width}w.avif`);
    const webpOut = join(OUT, `${photo.slug}-${width}w.webp`);

    // AVIF: aggressive but quality 60 keeps faces clean. effort 4 = speed/size compromise.
    await base.clone().avif({ quality: 60, effort: 4 }).toFile(avifOut);
    // WebP: quality 75 with default smart_subsample.
    await base.clone().webp({ quality: 75 }).toFile(webpOut);

    const [aS, wS] = await Promise.all([stat(avifOut), stat(webpOut)]);
    console.log(`  ${width}w  avif ${(aS.size / 1024).toFixed(0)}KB  webp ${(wS.size / 1024).toFixed(0)}KB`);
  }
}

async function main() {
  await ensureDir(OUT);
  console.log(`Encoding ${PHOTOS.length} photos → ${OUT}`);
  for (const p of PHOTOS) {
    await encode(p);
  }
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
