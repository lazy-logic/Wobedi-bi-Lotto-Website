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
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Primary nav. (Media dropped from the top bar — still reachable via the
// footer.) Home · About · Products (Games) · Results · How To ·
// Responsible Gaming · Support (Contact).
const NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Games", href: "/games" },
  { label: "Results", href: "/results" },
  { label: "How to play", href: "/how-to-play" },
  { label: "Contact", href: "/contact" },
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
              aria-label="Wobedibi Lotto, home"
            >
              {/* Logo shown AS-IS (original navy art, never recoloured). On
                  the dark header it sits on a white chip so the navy roundel
                  reads cleanly. */}
              <span className="inline-flex items-center justify-center rounded-lg bg-white p-1 ring-1 ring-black/5">
                <Image
                  src="/brand/wobedibi-logo.png"
                  alt="Wobedibi Lotto"
                  width={36}
                  height={36}
                  className="h-8 w-8 md:h-9 md:w-9 object-contain"
                />
              </span>
              <span className="flex flex-col leading-none">
                <span
                  className={cn(
                    "font-display font-extrabold text-base sm:text-lg md:text-xl tracking-tight transition-colors",
                    onWhiteHero ? "text-[#0c1c30]" : "text-white",
                  )}
                >
                  Wobedibi
                </span>
                <span className="text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-[0.22em] text-brand-signal -mt-0.5">
                  Lotto
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

              {/* Mobile menu toggle — a bordered chip with three bars that
                  morph into an X (the top + bottom bars rotate to cross, the
                  middle fades) for a polished open/close transition. */}
              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className={cn(
                  "lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl border transition-colors",
                  open
                    ? "border-white/25 bg-white/10 text-white"
                    : onWhiteHero
                      ? "border-black/10 bg-white text-[#0c1c30] hover:border-brand-primary/40"
                      : "border-white/20 text-white hover:bg-white/10",
                )}
              >
                <span className="relative block h-3.5 w-5" aria-hidden>
                  <m.span
                    className="absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current"
                    animate={open ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.25, ease: [0.3, 0, 0, 1] }}
                  />
                  <m.span
                    className="absolute left-0 top-[6.5px] h-0.5 w-5 rounded-full bg-current"
                    animate={open ? { opacity: 0, x: -6 } : { opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                  <m.span
                    className="absolute left-0 bottom-0 h-0.5 w-5 rounded-full bg-current"
                    animate={open ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.25, ease: [0.3, 0, 0, 1] }}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* ───── Mobile drawer ─────
            Reveals with a smooth height + fade; each link rises in a short
            stagger. Brand-navy surface (matches the scrolled bar). A full-page
            backdrop sits behind it so a tap outside closes the menu. */}
        <AnimatePresence>
          {open && (
            <m.div
              key="mobile-drawer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.3, 0, 0, 1] }}
              className="lg:hidden overflow-hidden border-t border-white/10"
              style={{
                background:
                  "linear-gradient(180deg, rgba(13,51,125,0.98), rgba(10,39,95,0.98))",
              }}
            >
              <nav aria-label="Mobile" className="px-5 pt-3 pb-6 flex flex-col">
                {NAV.map((item, i) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <m.div
                      key={item.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 + i * 0.04, duration: 0.25, ease: "easeOut" }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "block py-3.5 text-base font-semibold border-b border-white/10 transition-colors",
                          active ? "text-brand-signal" : "text-white hover:text-brand-signal",
                        )}
                      >
                        {item.label}
                      </Link>
                    </m.div>
                  );
                })}
                <m.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + NAV.length * 0.04, duration: 0.25, ease: "easeOut" }}
                >
                  <Link
                    href="/how-to-play"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 h-12 rounded-xl bg-white text-brand-primary text-sm font-bold hover:bg-brand-signal hover:text-white transition-colors"
                  >
                    Get started
                    <ArrowRight size={16} strokeWidth={2.5} />
                  </Link>
                </m.div>
              </nav>
            </m.div>
          )}
        </AnimatePresence>
      </header>

      {/* Tap-outside backdrop — closes the drawer; fades with it. Below the
          header (z-30 < header z-40) so the bar + drawer stay interactive. */}
      <AnimatePresence>
        {open && (
          <m.button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed inset-0 z-30 bg-black/40 backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
