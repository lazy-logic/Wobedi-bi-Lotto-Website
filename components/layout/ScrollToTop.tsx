/**
 * ScrollToTop — floating button that appears once the user scrolls past
 * 400px and smoothly scrolls back to the top on click.
 *
 * Mounted in the root layout so it's available on every public page.
 * Auto-hides on /admin (admin chrome owns its own UI) and respects
 * `prefers-reduced-motion` by jumping instead of smooth-scrolling.
 *
 * Sits fixed at the bottom-right with a comfortable distance from any
 * footer content. Pointer-events go through when hidden so it never
 * blocks clicks on content beneath.
 */
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

const SHOW_AFTER_PX = 400;

export function ScrollToTop() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  function scrollToTop() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      className={cn(
        "fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-primary text-white shadow-lifted transition-all duration-300 hover:bg-brand-primary-deep hover:-translate-y-0.5",
        visible
          ? "opacity-100 pointer-events-auto translate-y-0"
          : "opacity-0 pointer-events-none translate-y-2",
      )}
    >
      <ArrowUp size={20} strokeWidth={2.5} />
    </button>
  );
}
