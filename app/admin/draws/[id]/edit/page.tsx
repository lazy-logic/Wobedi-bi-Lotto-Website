/**
 * /admin/draws/[id]/edit — edit an existing draw.
 *
 * Loads the draw + the games list, prefills DrawForm. Server action is
 * `updateDraw` curried with the draw id so the client form passes only the
 * formData.
 */
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { fetchDrawByIdForAdmin, fetchGamesForAdmin } from "@/lib/data";
import { isSupabaseConfigured } from "@/lib/supabase-server";
import { DrawForm } from "../../DrawForm";
import { updateDraw, type DrawActionResult } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditDrawPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const configured = isSupabaseConfigured();

  if (!configured) {
    return (
      <>
        <h1 className="text-4xl mb-4">Edit draw</h1>
        <div className="rounded-lg border border-brand-warning/40 bg-brand-warning/5 p-5 text-sm text-brand-ink max-w-2xl">
          Supabase isn't configured — see <code className="code">docs/supabase-setup.md</code>.
        </div>
      </>
    );
  }

  const [draw, games] = await Promise.all([
    fetchDrawByIdForAdmin(id),
    fetchGamesForAdmin(),
  ]);

  if (!draw) notFound();

  // Bind the draw id to the action so the form's signature matches DrawForm's
  // expected (prev, formData) shape.
  const boundUpdate = async (
    prev: DrawActionResult | null,
    formData: FormData,
  ): Promise<DrawActionResult> => {
    "use server";
    return updateDraw(id, prev, formData);
  };

  return (
    <>
      <Link
        href="/admin/draws"
        className="inline-flex items-center gap-1.5 text-xs text-brand-ink-muted hover:text-brand-primary mb-2"
      >
        <ArrowLeft size={14} strokeWidth={2} />
        All draws
      </Link>
      <h1 className="text-4xl mb-2">Edit draw #{draw.drawNumber}</h1>
      <p className="text-sm text-brand-ink-muted mb-8">
        Changes are reflected on public results pages immediately on save.
      </p>

      <DrawForm
        action={boundUpdate}
        games={games}
        initial={{
          gameId: draw.gameId,
          drawNumber: draw.drawNumber,
          drawDate: draw.drawDate,
          drawnAt: draw.drawnAt,
          numbers: draw.numbers,
          bonusNumbers: draw.bonusNumbers,
          source: draw.source,
          published: draw.published,
        }}
        submitLabel="Save changes"
      />
    </>
  );
}
