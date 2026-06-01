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
 * Returns null inside /admin so the admin chrome owns its own layout.
 */
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="bg-brand-paper-sunken text-white border-t border-brand-border">
      <Container>
        {/* ───── Top: brand block + three nav columns ───── */}
        <div className="grid gap-10 md:gap-12 md:grid-cols-12 py-14 md:py-20">
          {/* Brand block */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="flex items-center gap-2.5">
              {/* Logo shown AS-IS (original navy art) on a white chip so it
                  reads on the dark footer without recolouring. */}
              <span className="inline-flex items-center justify-center rounded-xl bg-white p-1.5 ring-1 ring-black/5">
                <Image
                  src="/brand/wobedibi-logo.png"
                  alt="Wobedi Bi Lotto"
                  width={257}
                  height={257}
                  className="h-9 w-9 object-contain"
                />
              </span>
              <span className="flex flex-col leading-none">
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

          {/* Contact column */}
          <div className="md:col-span-7 lg:col-span-2">
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

        {/* ───── Bottom strip: legal name + 18+ + Act 722 ───── */}
        <div className="border-t border-white/15 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-white/65">
          <p>
            © {new Date().getFullYear()} Wobedi Bi Lotto · NLA-licensed
            <span className="hidden md:inline"> · Operating under National Lotto Act 2006 (Act 722)</span>
          </p>
          <div className="flex items-center gap-4">
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
