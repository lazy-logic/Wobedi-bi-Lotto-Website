/**
 * Root layout. Wraps every route with the global Header and Footer.
 *
 * Fonts are loaded via next/font/google so they're self-hosted at build time
 * (no FOUT, no third-party request). The CSS variables --font-outfit and
 * --font-montserrat are then consumed by the @theme block in globals.css.
 *
 * Default metadata uses the title template "%s · Wobedi Bi Lotto" so per-page
 * titles read e.g. "Results · Wobedi Bi Lotto". Override in any page by exporting
 * `metadata` with a `title` field.
 *
 * The flex column on <body> + flex-1 on <main> is what pins the footer to the
 * bottom of short pages.
 */
import type { Metadata, Viewport } from "next";
import { Outfit, Montserrat } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { FooterGate } from "@/components/layout/FooterGate";
import { PageTransitions } from "@/components/layout/PageTransitions";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import "./globals.css";

// "Blue Hour" type system: Outfit leads as the single display + body face;
// Montserrat is a small accent for eyebrows / ticker / numerals. See
// docs/brand-tokens.md.
//
// Outfit — the single display + body face for the whole site. Geometric
// grotesque, confident at huge display sizes and clean at body sizes.
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

// Montserrat — the one accent to Outfit: the geometric "data-feed" voice for
// eyebrows, the results ticker, and tabular lotto numerals.
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Wobedi Bi Lotto, Trusted NLA-licensed lotto in Ghana",
    template: "%s · Wobedi Bi Lotto",
  },
  description:
    "Wobedi Bi Lotto is a trusted, NLA-licensed lotto operator in Ghana. Daily NLA 5/90 draws, VAG, Noon Rush, and Main Games. Reliable agents, transparent results, responsible play.",
  metadataBase: new URL("https://wobedibilotto.com"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GH",
    siteName: "Wobedi Bi Lotto",
    url: "/",
    title: "Wobedi Bi Lotto, Trusted NLA-licensed lotto in Ghana",
    description:
      "Trusted NLA 5/90 draws, VAG, Noon Rush, and Main Games. Transparent results, reliable agents, responsible play.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Wobedi Bi Lotto, lotto played for real.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wobedi Bi Lotto, Trusted NLA-licensed lotto in Ghana",
    description:
      "Trusted NLA 5/90 draws across Ghana. Transparent results, reliable agents, responsible play.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
  // Favicons live under /public/favicon/. The .ico + apple-icon.png at
  // app/ root are auto-emitted by Next; the entries below add the rest of
  // the size set + the Android web-app manifest. See public/favicon/ for
  // the source set.
  manifest: "/favicon/manifest.json",
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/android-icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/favicon/apple-icon-57x57.png", sizes: "57x57" },
      { url: "/favicon/apple-icon-60x60.png", sizes: "60x60" },
      { url: "/favicon/apple-icon-72x72.png", sizes: "72x72" },
      { url: "/favicon/apple-icon-76x76.png", sizes: "76x76" },
      { url: "/favicon/apple-icon-114x114.png", sizes: "114x114" },
      { url: "/favicon/apple-icon-120x120.png", sizes: "120x120" },
      { url: "/favicon/apple-icon-144x144.png", sizes: "144x144" },
      { url: "/favicon/apple-icon-152x152.png", sizes: "152x152" },
      { url: "/favicon/apple-icon-180x180.png", sizes: "180x180" },
    ],
    other: [
      {
        rel: "msapplication-TileImage",
        url: "/favicon/ms-icon-144x144.png",
      },
    ],
  },
  other: {
    "msapplication-TileColor": "#000919",
    "msapplication-config": "/favicon/browserconfig.xml",
  },
};

// Viewport for proper mobile scaling across the responsive layouts.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000919",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${montserrat.variable}`}>
      <body className="min-h-screen flex flex-col bg-brand-paper-sunken text-brand-ink">
        {/* Skip link — visually hidden until focused, lets keyboard users
            jump past the nav straight to the page content. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-brand-primary focus:text-white focus:font-semibold focus:shadow-lifted"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          <PageTransitions>{children}</PageTransitions>
        </main>
        <FooterGate />
        <ScrollToTop />
      </body>
    </html>
  );
}
