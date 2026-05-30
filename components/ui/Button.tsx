/**
 * Button primitive. Renders as an <a> when `href` is supplied, else a <button>.
 *
 * This is a minimal in-house primitive. The super prompt nominates shadcn/ui as
 * the component baseline (§5) — when shadcn is initialised in the project, swap
 * this for the shadcn `<Button>` and adapt variants to the brand-* tokens.
 * Until then, this gives us a consistent, on-brand button across every page.
 *
 * Hover/active use --brand-primary-deep (the deeper of the two navies).
 */
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "lg";
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const variantClasses = {
  primary:
    "bg-brand-primary text-white hover:bg-brand-primary-deep active:bg-brand-primary-deep",
  secondary:
    "bg-brand-paper text-brand-primary border border-brand-primary hover:bg-brand-paper-muted",
  ghost:
    "bg-transparent text-brand-primary hover:bg-brand-paper-muted",
};

const sizeClasses = {
  default: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

export function Button({
  href,
  variant = "primary",
  size = "default",
  className,
  children,
  ...rest
}: ButtonProps) {
  const cls = cn(
    "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-150 ease-[var(--ease-standard)] disabled:opacity-50 disabled:pointer-events-none",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
