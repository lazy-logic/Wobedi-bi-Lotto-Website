/**
 * /admin — dashboard overview.
 *
 * Auth-gated by middleware.ts (redirects unauthed visitors to /admin/login).
 * Counts come from lib/data.ts so they reflect Supabase when configured,
 * mocks otherwise.
 *
 * /admin/draws is the live winning-numbers editor. /admin/posts is still
 * pending.
 */
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fetchGames, fetchAllDrawsSorted } from "@/lib/data";

export default async function AdminDashboardPage() {
  const [games, draws] = await Promise.all([
    fetchGames(),
    fetchAllDrawsSorted(500),
  ]);

  const TILES = [
    { href: "/admin/draws", label: "Draws", count: draws.length, action: "Publish a result" },
    { href: "/admin/posts", label: "Posts", count: 0, action: "Write a post" },
  ];

  return (
    <>
      <h1 className="text-4xl mb-2">
        Overview
      </h1>
      <p className="text-sm text-brand-ink-muted mb-8">
        Manage results and posts. {games.length} games configured.
      </p>

      <section className="grid gap-4 sm:grid-cols-2">
        {TILES.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="group rounded-lg border border-brand-border bg-brand-paper p-6 hover:border-brand-border-strong hover:-translate-y-0.5 transition-all"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-ink-muted">
              {t.label}
            </p>
            <p className="font-display font-extrabold text-6xl tnum mt-2 text-brand-ink leading-none">{t.count}</p>
            <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-signal group-hover:gap-2.5 transition-all">
              {t.action}
              <ArrowRight size={14} strokeWidth={1.75} />
            </p>
          </Link>
        ))}
      </section>

      <section className="mt-10 rounded-lg border border-brand-warning/40 bg-brand-warning/5 p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-warning mb-2">
          Not yet implemented
        </p>
        <ul className="text-sm text-brand-ink space-y-1.5">
          <li>• CRUD on /admin/posts</li>
          <li>• Audit logging on every write</li>
          <li>• Results-pipeline trigger (automatic NLA ingest)</li>
          <li>• Multi-editor role narrowing on RLS policies</li>
        </ul>
      </section>
    </>
  );
}
