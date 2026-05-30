/**
 * /admin layout — auth-gated wrapper for every admin route.
 *
 * Per super prompt §5, /admin is locked to a single admin role behind Supabase
 * Auth. The actual auth check lives in middleware.ts (to add when wiring auth)
 * — this file just renders the admin chrome (sidebar nav, page header).
 *
 * The admin chrome deliberately does NOT extend the public site's Header /
 * Footer — admins should feel they're in a different surface, not a sub-page
 * of the marketing site.
 */
import Link from "next/link";
import { LogOut, Newspaper, Trophy, Layers } from "lucide-react";

const NAV = [
  { href: "/admin", label: "Overview", icon: Layers },
  { href: "/admin/draws", label: "Draws", icon: Trophy },
  { href: "/admin/posts", label: "Posts", icon: Newspaper },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-brand-paper-sunken">
      <aside className="fixed inset-y-0 left-0 w-60 bg-brand-ink text-white flex flex-col">
        <div className="px-5 py-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
            Admin
          </p>
          <p className="font-display text-xl mt-1">Wobedi Bi Lotto</p>
        </div>
        <nav className="flex-1 px-3">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            >
              <item.icon size={16} strokeWidth={1.75} />
              {item.label}
            </Link>
          ))}
        </nav>
        <form action="/api/admin/logout" method="post" className="px-3 pb-5">
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
          >
            <LogOut size={16} strokeWidth={1.75} />
            Sign out
          </button>
        </form>
      </aside>
      <div className="ml-60">
        <header className="bg-brand-paper border-b border-brand-border px-8 py-4">
          <p className="text-sm text-brand-ink-muted">
            Internal — single-admin role per super prompt §5
          </p>
        </header>
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
