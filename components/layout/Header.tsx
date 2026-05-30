/**
 * Wobedi Bi Lotto — site header.
 *
 * Editorial direction: a frameless bar that floats ON the content. At the
 * top of the page it is fully transparent — the hero's dark glow (and each
 * inner page's header mesh) reads straight through it. The moment the user
 * scrolls away from the hero it fades into frosted glass: a translucent
 * rich-black tint + backdrop blur + a single white hairline. No pill, no
 * rounded chrome — a flat sheet of glass, not an object.
 *
 * The overlap is achieved page-side: the Hero and PageHeader sections use a
 * negative top margin (= header height) with matching top padding, so their
 * backgrounds slide up behind the transparent bar while their content stays
 * put.
 *
 * Logo (left) + wordmark · Primary nav (centre) · NLA badge (right desktop)
 * + mobile drawer.
 *
 * Active-nav indicator: a tiny square block beneath the active item — not
 * an underline, not a pill. Framer Motion's layoutId slides the same block
 * between items as the route changes.
 *
 * Returns null inside /admin so the admin chrome owns its own layout.
 */
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { Menu, X, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NLA_LICENCE_NUMBER,
  NLA_REGISTER_URL,
  NLA_REGISTERED_LABEL,
} from "@/lib/regulatory";

// Nav follows the site structure from the company brief:
//   Home · About · Products (Games) · Media · Draw Results · How To ·
//   Responsible Gaming · Support (Contact).
const NAV = [
  { label: "About", href: "/about" },
  { label: "Products", href: "/games" },
  { label: "Media", href: "/media" },
  { label: "Results", href: "/results" },
  { label: "How to", href: "/how-to-play" },
  { label: "Responsible", href: "/responsible-play" },
  { label: "Support", href: "/contact" },
];

const isActive = (pathname: string | null, href: string) => {
  if (href === "/") return pathname === "/";
  return pathname === href || (pathname !== null && pathname.startsWith(href));
};

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  // Transparent at the very top, frosted glass once the hero scrolls away.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll(); // honour a page that loads already scrolled (deep links, back-nav)
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  // The bar takes its solid/glass skin when scrolled OR when the mobile
  // drawer is open (the drawer needs an opaque-ish surface behind it).
  const glass = scrolled || open;

  return (
    <LazyMotion features={domAnimation}>
      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-300 ease-out",
          glass
            ? "bg-brand-paper-sunken/70 backdrop-blur-xl backdrop-saturate-150 border-b border-white/10 shadow-soft"
            : "bg-transparent border-b border-transparent",
        )}
      >
        <div className="mx-auto max-w-[1240px] px-5 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20 gap-6">
            {/* ───── Logo block ─────
                Logo + typographic wordmark. The wordmark renders as TEXT
                (not an image) so screen readers announce the brand name
                immediately and the typeface stays under our control. */}
            <Link
              href="/"
              className="flex items-center gap-2.5 shrink-0 group"
              aria-label="Wobedi Bi Lotto — home"
            >
              <Image
                src="/brand/wobedibi-logo.png"
                alt=""
                width={400}
                height={400}
                priority
                /* Logo art is dark navy — invert to white so it reads on
                   the dark "Blue Hour" header bar. */
                className="w-auto h-9 md:h-10 brightness-0 invert"
              />
              <span className="hidden sm:flex flex-col leading-none">
                <span className="font-display font-extrabold text-base md:text-lg tracking-tight text-brand-ink">
                  Wobedi&nbsp;Bi
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-ink-muted mt-1">
                  Lotto
                </span>
              </span>
            </Link>

            {/* ───── Primary nav (desktop) ─────
                Plain text links separated by tracking, with a tiny square
                indicator beneath the active item. Framer Motion glides
                the square between items. */}
            <nav
              aria-label="Primary"
              className="hidden lg:flex items-center gap-7"
            >
              {NAV.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative py-2 text-sm font-semibold tracking-tight transition-colors duration-200",
                      active
                        ? "text-brand-primary"
                        : "text-brand-ink hover:text-brand-primary",
                    )}
                  >
                    {item.label}
                    {active && (
                      <m.span
                        layoutId="nav-indicator"
                        className="absolute left-1/2 -translate-x-1/2 -bottom-[3px] w-5 h-[2px] bg-brand-primary"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* ───── Right side: NLA badge + mobile toggle ─────
                Desktop: a small NLA verification chip rather than a generic
                "Get started" CTA — the brand promise is trust, so we lead
                with the licence credential. */}
            <div className="flex items-center gap-3">
              <a
                href={NLA_REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-2 px-3 py-2 border border-brand-border hover:border-brand-primary hover:text-brand-primary text-xs font-bold uppercase tracking-wider text-brand-ink-muted transition-colors"
              >
                <ShieldCheck size={14} strokeWidth={2.25} />
                {NLA_LICENCE_NUMBER
                  ? `NLA #${NLA_LICENCE_NUMBER}`
                  : NLA_REGISTERED_LABEL}
              </a>

              {/* Mobile menu toggle */}
              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="lg:hidden inline-flex items-center justify-center w-12 h-12 -mr-2 text-brand-ink hover:text-brand-primary transition-colors"
              >
                {open ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
              </button>
            </div>
          </div>
        </div>

        {/* ───── Mobile drawer ─────
            Slides below the bar when open. Flat surface (no glass), the same
            paper background as the bar itself. */}
        {open && (
          <div className="lg:hidden border-t border-white/10 bg-brand-paper-sunken/90 backdrop-blur-xl">
            <nav aria-label="Mobile" className="px-5 py-5 flex flex-col">
              {NAV.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "py-3 text-base font-semibold border-b border-brand-border last:border-b-0 transition-colors",
                      active
                        ? "text-brand-primary"
                        : "text-brand-ink hover:text-brand-primary",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <a
                href={NLA_REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-ink-muted hover:text-brand-primary"
              >
                <ShieldCheck size={13} strokeWidth={2.25} />
                {NLA_LICENCE_NUMBER
                  ? `NLA licence #${NLA_LICENCE_NUMBER}`
                  : `${NLA_REGISTERED_LABEL} →`}
              </a>
            </nav>
          </div>
        )}
      </header>
    </LazyMotion>
  );
}
