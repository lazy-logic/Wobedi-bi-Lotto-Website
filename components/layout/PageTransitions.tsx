/**
 * Wraps the app in a Framer Motion LazyMotion + AnimatePresence container.
 *
 * AnimatePresence enables enter/exit animations on client components that use
 * `motion.*`. LazyMotion + domAnimation cuts the bundle (~12KB savings vs the
 * full motion bundle).
 *
 * The `mode="wait"` prop ensures the previous page finishes its exit before
 * the next page mounts, which is what makes shared-element transitions
 * (LatestDrawCard layoutId morph) actually morph rather than fade between
 * disjoint cards. The `key` is the pathname, so React unmounts and re-mounts
 * the children when the route changes.
 */
"use client";

import { AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import { usePathname } from "next/navigation";

export function PageTransitions({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence mode="wait" initial={false}>
        <div key={pathname}>{children}</div>
      </AnimatePresence>
    </LazyMotion>
  );
}
