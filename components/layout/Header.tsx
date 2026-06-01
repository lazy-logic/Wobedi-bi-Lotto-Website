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
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Primary nav. (Media dropped from the top bar — still reachable via the
// footer.) Home · About · Products (Games) · Results · How To ·
// Responsible Gaming · Support (Contact).
const NAV = [
  { label: "About", href: "/about" },
  { label: "Products", href: "/games" },
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

  // Transparent at the very top, solid brand bar the moment the user scrolls.
  // Read from documentElement/body too (some browsers report 0 on window).
  useEffect(() => {
    const onScroll = () => {
      const y =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      setScrolled(y > 4);
    };
    onScroll(); // honour a page that loads already scrolled (deep links, back-nav)
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  // The bar takes its solid/glass skin when scrolled OR when the mobile
  // drawer is open (the drawer needs an opaque-ish surface behind it).
  const glass = scrolled || open;

  // Text colour: white everywhere EXCEPT when the bar is transparent over the
  // home page's WHITE hero — there it must be dark. Inner pages have a dark
  // PageHeader band behind the transparent bar, so they stay white.
  const onWhiteHero = pathname === "/" && !glass;

  return (
    <LazyMotion features={domAnimation}>
      <header
        className={cn(
          "sticky top-0 z-40 transition-colors duration-300 ease-out",
          glass
            ? "backdrop-blur-md border-b border-white/10"
            : "bg-transparent border-b border-transparent",
        )}
        style={
          glass
            ? {
                // Scrolled: solid-ish BRAND navy (matches the #0D337D band),
                // never the washed-out grey the old paper-sunken/blur produced.
                background:
                  "linear-gradient(180deg, rgba(13,51,125,0.96), rgba(10,39,95,0.96))",
              }
            : undefined
        }
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
              aria-label="Wobedi Bi Lotto, home"
            >
              {/* Logo shown AS-IS (original navy art, never recoloured). On
                  the dark header it sits on a white chip so the navy roundel
                  reads cleanly. */}
              <span className="inline-flex items-center justify-center rounded-xl bg-white p-1.5 ring-1 ring-black/5">
                <Image
                  src="/brand/wobedibi-logo.png"
                  alt="Wobedi Bi Lotto"
                  width={257}
                  height={257}
                  priority
                  className="h-11 w-11 md:h-12 md:w-12 object-contain"
                />
              </span>
              <span className="hidden sm:flex flex-col leading-none">
                <span
                  className={cn(
                    "font-display font-extrabold text-xl md:text-2xl tracking-tight transition-colors",
                    onWhiteHero ? "text-[#0c1c30]" : "text-white",
                  )}
                >
                  Wobedi&nbsp;Bi
                </span>
                <span className="text-xs md:text-sm font-bold uppercase tracking-[0.22em] text-brand-signal -mt-0.5">
                  Lottery
                </span>
              </span>
            </Link>

            {/* ───── Primary nav (desktop) ─────
                Plain white text links; a thin white underline slides beneath
                the active item (Framer Motion layoutId). */}
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
                      "relative py-2 text-[15px] font-semibold tracking-tight transition-colors duration-200",
                      active
                        ? onWhiteHero
                          ? "text-brand-primary"
                          : "text-white"
                        : onWhiteHero
                          ? "text-[#475569] hover:text-brand-primary"
                          : "text-white/75 hover:text-white",
                    )}
                  >
                    {item.label}
                    {active && (
                      <m.span
                        layoutId="nav-underline"
                        className={cn(
                          "absolute left-0 right-0 -bottom-[3px] h-[2px] rounded-full",
                          onWhiteHero ? "bg-brand-primary" : "bg-white",
                        )}
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* ───── Right side: Get started CTA + mobile toggle ───── */}
            <div className="flex items-center gap-3">
              <Link
                href="/how-to-play"
                className={cn(
                  "hidden md:inline-flex items-center gap-2 h-10 px-5 rounded-full text-sm font-bold transition-colors",
                  onWhiteHero
                    ? "bg-brand-primary text-white hover:bg-brand-primary-deep"
                    : "bg-white text-brand-primary hover:bg-brand-signal hover:text-white",
                )}
              >
                Get started
                <ArrowRight size={16} strokeWidth={2.5} />
              </Link>

              {/* Mobile menu toggle */}
              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className={cn(
                  "lg:hidden inline-flex items-center justify-center w-12 h-12 -mr-2 transition-colors",
                  onWhiteHero ? "text-[#0c1c30] hover:text-brand-primary" : "text-white hover:text-brand-signal",
                )}
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
                      "py-3 text-base font-semibold border-b border-white/10 last:border-b-0 transition-colors",
                      active ? "text-brand-signal" : "text-white hover:text-brand-signal",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/how-to-play"
                className="mt-5 inline-flex items-center justify-center gap-2 h-12 rounded-full bg-white text-brand-primary text-sm font-bold hover:bg-brand-signal hover:text-white transition-colors"
              >
                Get started
                <ArrowRight size={16} strokeWidth={2.5} />
              </Link>
            </nav>
          </div>
        )}
      </header>
    </LazyMotion>
  );
}
