/**
 * /admin/draws — winning-numbers editor.
 *
 * Lists every draw across every game, newest first, regardless of published
 * state. Each row links to an edit screen and carries a delete-confirmation
 * form. New draws are added via /admin/draws/new.
 *
 * When Supabase isn't configured the table renders empty with a setup hint —
 * no point falling back to mocks here because there's nothing to edit on a
 * read-only mock store.
 */
import Link from "next/link";
import { ArrowLeft, Plus, Pencil } from "lucide-react";
import { fetchAllDrawsForAdmin } from "@/lib/data";
import { isSupabaseConfigured } from "@/lib/supabase-server";
import { formatDate } from "@/lib/utils";
import { DeleteDrawButton } from "./DeleteDrawButton";

export const dynamic = "force-dynamic";

export default async function AdminDrawsPage() {
  const configured = isSupabaseConfigured();
  const draws = configured ? await fetchAllDrawsForAdmin(500) : [];

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs text-brand-ink-muted hover:text-brand-primary mb-2"
          >
            <ArrowLeft size={14} strokeWidth={2} />
            Overview
          </Link>
          <h1 className="text-4xl">Draws</h1>
          <p className="text-sm text-brand-ink-muted mt-1">
            {configured
              ? `${draws.length} draws · publish or edit winning numbers below.`
              : "Winning-numbers editor — Supabase not configured yet."}
          </p>
        </div>
        <Link
          href="/admin/draws/new"
          className="inline-flex items-center gap-2 h-11 px-5 rounded-md bg-brand-primary text-white font-semibold text-sm hover:bg-brand-primary-deep transition-colors"
        >
          <Plus size={16} strokeWidth={2.25} />
          New draw
        </Link>
      </div>

      {!configured && (
        <div className="rounded-lg border border-brand-warning/40 bg-brand-warning/5 p-5 text-sm text-brand-ink">
          <p className="font-semibold mb-1">Supabase isn't configured.</p>
          <p className="text-brand-ink-muted">
            Set <code className="code">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
            <code className="code">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in{" "}
            <code className="code">.env.local</code>, then run the migrations
            in <code className="code">supabase/migrations/</code>. See{" "}
            <code className="code">docs/supabase-setup.md</code>.
          </p>
        </div>
      )}

      {configured && draws.length === 0 && (
        <div className="rounded-lg border border-brand-border bg-brand-paper p-10 text-center">
          <p className="text-brand-ink-muted">
            No draws yet. Add the first one with{" "}
            <Link href="/admin/draws/new" className="text-brand-primary font-semibold">
              New draw
            </Link>
            .
          </p>
        </div>
      )}

      {configured && draws.length > 0 && (
        <div className="rounded-lg border border-brand-border bg-brand-paper overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-brand-paper-muted text-xs uppercase tracking-wider text-brand-ink-muted">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Game</th>
                <th className="px-4 py-3 text-left font-semibold">Draw #</th>
                <th className="px-4 py-3 text-left font-semibold">Date</th>
                <th className="px-4 py-3 text-left font-semibold">Numbers</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {draws.map((d) => (
                <tr key={d.id} className="hover:bg-brand-paper-muted/40">
                  <td className="px-4 py-3 font-medium text-brand-ink">{d.gameName}</td>
                  <td className="px-4 py-3 tnum text-brand-ink-muted">#{d.drawNumber}</td>
                  <td className="px-4 py-3 tnum text-brand-ink-muted">
                    {formatDate(d.drawDate)}
                  </td>
                  <td className="px-4 py-3 font-mono tnum text-brand-ink">
                    {d.numbers.join(" · ")}
                    {d.bonusNumbers && d.bonusNumbers.length > 0 && (
                      <span className="text-brand-ink-muted ml-2">
                        + {d.bonusNumbers.join(" · ")}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {d.published ? (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-brand-success/15 text-brand-success text-xs font-semibold">
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-brand-warning/15 text-brand-warning text-xs font-semibold">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex items-center gap-2">
                      <Link
                        href={`/admin/draws/${d.id}/edit`}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold text-brand-primary hover:bg-brand-primary/10 transition-colors"
                      >
                        <Pencil size={12} strokeWidth={2} />
                        Edit
                      </Link>
                      <DeleteDrawButton id={d.id} drawNumber={d.drawNumber} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
