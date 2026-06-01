/**
 * Wobedi Bi Lotto — site footer.
 *
 * Editorial layout: four-column footer on lg+, stacked on mobile. Brand
 * block (logo + tagline + NLA badge) + three navigation columns (Play /
 * Company / Legal) + a bottom strip with operator legal name, 18+ badge,
 * and compliance disclosures.
 *
 * Surface: dark navy (--brand-primary-deep) on white text. Tells the
 * visitor the page ends — and gives the regulatory disclosures the
 * weight they need to be unmissable per docs/nla-compliance.md §2.
 *
 * Pure server component: all markup is static, so nothing here hydrates on the
 * client. The /admin path check that hides it lives in the tiny client wrapper
 * FooterGate (imported by the root layout) so this whole tree stays server-only.
 */
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { Container } from "./Container";
import {
  NLA_LICENCE_NUMBER,
  NLA_REGISTER_URL,
  NLA_REGISTERED_LABEL,
} from "@/lib/regulatory";

// Sitemap follows the site structure from the company brief:
//   Home · About · Products · Media · Draw Results · How To ·
//   Responsible Gaming · Support.
const PRODUCTS_LINKS = [
  { label: "All games", href: "/games" },
  { label: "Draw results", href: "/results" },
  { label: "How to play", href: "/how-to-play" },
];

const COMPANY_LINKS = [
  { label: "About us", href: "/about" },
  { label: "Media", href: "/media" },
  { label: "Support", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Responsible gaming", href: "/responsible-play" },
  { label: "Terms", href: "/legal/terms" },
  { label: "Privacy", href: "/legal/privacy" },
];

export function Footer() {
  return (
    <footer className="bg-brand-paper-sunken text-white border-t border-brand-border">
      <Container>
        {/* ───── Top: centred brand block, then a balanced 2-column nav grid
            on mobile (left-aligned link lists read cleaner than a long centred
            stack); the familiar 12-column row on md+. ───── */}
        <div className="grid gap-10 md:gap-12 md:grid-cols-12 py-10 md:py-12">
          {/* Brand block — centred on mobile, left-aligned on md+ */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left md:col-span-5 lg:col-span-4">
            <div className="flex items-center gap-2.5">
              {/* Logo shown AS-IS (original navy art) on a white chip so it
                  reads on the dark footer without recolouring. */}
              <span className="inline-flex items-center justify-center rounded-xl bg-white p-1.5 ring-1 ring-black/5">
                <Image
                  src="/brand/wobedibi-logo.png"
                  alt="Wobedi Bi Lotto"
                  width={36}
                  height={36}
                  className="h-9 w-9 object-contain"
                />
              </span>
              <span className="flex flex-col leading-none text-left">
                <span className="font-display font-extrabold text-lg tracking-tight">
                  Wobedi&nbsp;Bi
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/60 mt-1">
                  Lotto
                </span>
              </span>
            </div>
            <p className="mt-5 text-sm text-white/70 leading-relaxed max-w-xs">
              A trusted Ghanaian lotto operator. NLA 5/90 draws every day, a
              growing agent network, and a commitment to responsible play.
            </p>
            <a
              href={NLA_REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-3 py-2 border border-white/25 hover:border-white text-xs font-bold uppercase tracking-wider text-white transition-colors"
            >
              <ShieldCheck size={14} strokeWidth={2.25} />
              {NLA_LICENCE_NUMBER
                ? `NLA licence #${NLA_LICENCE_NUMBER}`
                : NLA_REGISTERED_LABEL}
            </a>
          </div>

          {/* Nav + contact — 2-column left-aligned grid on mobile, dissolves
              (display:contents) into the parent 12-column row on md+. */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 text-left md:contents">
          {/* Products column */}
          <nav
            aria-label="Products"
            className="md:col-span-3 lg:col-span-2"
          >
            <h2 className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 mb-4">
              Products
            </h2>
            <ul className="space-y-2.5">
              {PRODUCTS_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/85 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company column */}
          <nav
            aria-label="Company"
            className="md:col-span-4 lg:col-span-2"
          >
            <h2 className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 mb-4">
              Company
            </h2>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/85 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal column */}
          <nav
            aria-label="Legal"
            className="md:col-span-5 lg:col-span-2"
          >
            <h2 className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 mb-4">
              Legal
            </h2>
            <ul className="space-y-2.5">
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/85 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact column — spans both mobile columns so the address line
              isn't cramped; one column on md+. */}
          <div className="col-span-2 md:col-span-7 lg:col-span-2">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 mb-4">
              Contact
            </h2>
            <ul className="space-y-3 text-sm text-white/85">
              <li className="flex items-start gap-2">
                <MapPin
                  size={14}
                  strokeWidth={2}
                  className="mt-0.5 text-white/60 flex-shrink-0"
                />
                <span>
                  Adansi-Asokwa,
                  <br />
                  Ashanti Region, Ghana
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Phone
                  size={14}
                  strokeWidth={2}
                  className="mt-0.5 text-white/60 flex-shrink-0"
                />
                <a
                  href="tel:+233543030032"
                  className="tnum hover:text-white"
                >
                  054 303 0032
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail
                  size={14}
                  strokeWidth={2}
                  className="mt-0.5 text-white/60 flex-shrink-0"
                />
                <a
                  href="mailto:info@wobedibi.com"
                  className="break-words hover:text-white"
                >
                  info@wobedibi.com
                </a>
              </li>
            </ul>
          </div>
          </div>
        </div>

        {/* ───── Bottom strip: legal name + 18+ + Act 722 ─────
            Centred + stacked on mobile, spread on a single row on md+. */}
        <div className="border-t border-white/15 py-4 flex flex-col items-center text-center gap-4 text-xs text-white/65 md:flex-row md:items-center md:justify-between md:text-left">
          <p>
            © {new Date().getFullYear()} Wobedi Bi Lotto · NLA-licensed
            <span className="hidden md:inline"> · Operating under National Lotto Act 2006 (Act 722)</span>
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            <span className="inline-flex items-center gap-1.5 text-white/85">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-brand-danger text-white text-[10px] font-bold">
                18+
              </span>
              <span className="font-semibold">Strictly 18 and over</span>
            </span>
            <Link
              href="/responsible-play"
              className="hover:text-white transition-colors font-semibold"
            >
              Play responsibly →
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
