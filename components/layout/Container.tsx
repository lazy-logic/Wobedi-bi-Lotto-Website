/**
 * Page-width container. Use this anywhere you need consistent horizontal gutters
 * and a max content width. Specs in docs/design-system.md §2.3.
 *
 * Sizes:
 *  - "narrow"  — long-form prose (about page text columns)
 *  - "default" — every standard page section (1200px max)
 *  - "wide"    — only when a section needs to feel edge-to-edge (1320px max)
 */
import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
};

export function Container({ children, className, size = "default" }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto px-4 md:px-6 lg:px-8",
        size === "narrow" && "max-w-2xl",
        size === "default" && "max-w-[1200px]",
        size === "wide" && "max-w-[1320px]",
        className,
      )}
    >
      {children}
    </div>
  );
}
