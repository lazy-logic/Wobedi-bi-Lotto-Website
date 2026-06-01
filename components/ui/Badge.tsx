/**
 * Inline status / metadata pill.
 *
 * Variants:
 *  - "default"   — neutral, used for schedule chips on game tiles
 *  - "primary"   — solid brand-primary on white text (for emphatic state)
 *  - "secondary" — tinted brand-primary-deep background, navy text.
 *  - "muted"     — sunken grey, used for ticket-price metadata
 */
import { cn } from "@/lib/utils";

type BadgeProps = {
  variant?: "default" | "primary" | "secondary" | "muted";
  className?: string;
  children: React.ReactNode;
};

const variantClasses = {
  default: "bg-brand-paper-muted text-brand-ink border border-brand-border",
  primary: "bg-brand-primary text-white",
  secondary: "bg-brand-primary-deep/10 text-brand-signal border border-brand-primary-deep/30",
  muted: "bg-brand-paper-sunken text-brand-ink-muted border border-brand-border",
};

export function Badge({ variant = "default", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
