/**
 * /admin/draws/new — create a new draw.
 */
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { fetchGamesForAdmin } from "@/lib/data";
import { isSupabaseConfigured } from "@/lib/supabase-server";
import { DrawForm } from "../DrawForm";
import { createDraw } from "../actions";

export const dynamic = "force-dynamic";

export default async function NewDrawPage() {
  const configured = isSupabaseConfigured();
  const games = configured ? await fetchGamesForAdmin() : [];

  return (
    <>
      <Link
        href="/admin/draws"
        className="inline-flex items-center gap-1.5 text-xs text-brand-ink-muted hover:text-brand-primary mb-2"
      >
        <ArrowLeft size={14} strokeWidth={2} />
        All draws
      </Link>
      <h1 className="text-4xl mb-2">New draw</h1>
      <p className="text-sm text-brand-ink-muted mb-8">
        Pick a game, enter the winning numbers, set the draw date. The result
        appears on public results pages immediately if Published is on.
      </p>

      {!configured ? (
        <div className="rounded-lg border border-brand-warning/40 bg-brand-warning/5 p-5 text-sm text-brand-ink max-w-2xl">
          Supabase isn't configured — see <code className="code">docs/supabase-setup.md</code>.
        </div>
      ) : games.length === 0 ? (
        <div className="rounded-lg border border-brand-warning/40 bg-brand-warning/5 p-5 text-sm text-brand-ink max-w-2xl">
          No games found in Supabase. Apply the migrations and run{" "}
          <code className="code">supabase/seed.sql</code> first.
        </div>
      ) : (
        <DrawForm action={createDraw} games={games} submitLabel="Create draw" />
      )}
    </>
  );
}
