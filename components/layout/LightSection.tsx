/**
 * LightSection — a light content band that sits on the dark base theme.
 *
 * Wraps content in the scoped `.section-light` surface (white background, dark
 * text — see globals.css; it remaps the brand tokens so token-based content
 * flips to dark-on-white automatically).
 *
 * Usage: replace a page's `<section className="…"><Container>…</Container>
 * </section>` with `<LightSection className="…"><Container>…</Container>
 * </LightSection>` — drop any dark `bg-*` from the className.
 *
 * `wave` is retained as a no-op prop so existing call sites keep compiling.
 */
import { cn } from "@/lib/utils";

export function LightSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  /** Retained for call-site compatibility; no longer renders any decoration. */
  wave?: "right" | "left";
}) {
  return (
    <section className={cn("section-light relative overflow-hidden", className)}>
      {children}
    </section>
  );
}
