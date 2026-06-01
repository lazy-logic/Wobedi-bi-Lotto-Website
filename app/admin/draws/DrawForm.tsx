/**
 * DrawForm — shared create/edit form for /admin/draws.
 *
 * Client component because it uses React 19's `useActionState` to surface
 * server-action validation errors inline without a redirect roundtrip.
 *
 * The action prop is one of `createDraw` or `updateDraw` (curried with the
 * draw id). Both share the same DrawActionResult shape.
 */
"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { DrawActionResult } from "./actions";

type GameOption = { id: string; name: string };

type Props = {
  action: (prev: DrawActionResult | null, formData: FormData) => Promise<DrawActionResult>;
  games: GameOption[];
  initial?: {
    gameId: string;
    drawNumber: number;
    drawDate: string;
    drawnAt: string | null;
    numbers: number[];
    bonusNumbers: number[];
    source: string;
    published: boolean;
  };
  submitLabel: string;
};

export function DrawForm({ action, games, initial, submitLabel }: Props) {
  const [state, formAction, pending] = useActionState<DrawActionResult | null, FormData>(
    action,
    null,
  );

  const error = state && !state.ok ? state.error : null;
  const drawnAtValue = initial?.drawnAt
    ? new Date(initial.drawnAt).toISOString().slice(0, 16)
    : "";

  return (
    <form action={formAction} className="space-y-6 max-w-2xl">
      {error && (
        <div
          role="alert"
          className="rounded-md border border-brand-danger/40 bg-brand-danger/5 px-4 py-3 text-sm text-brand-danger"
        >
          {error}
        </div>
      )}

      <Field label="Game" htmlFor="gameId" required>
        <select
          id="gameId"
          name="gameId"
          defaultValue={initial?.gameId ?? ""}
          required
          className="mt-1 w-full h-11 px-3 rounded-md border border-brand-border bg-brand-paper text-base focus:border-brand-primary"
        >
          <option value="" disabled>
            Pick a game
          </option>
          {games.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Draw number" htmlFor="drawNumber" required>
          <input
            id="drawNumber"
            name="drawNumber"
            type="number"
            min={1}
            step={1}
            required
            defaultValue={initial?.drawNumber ?? ""}
            className="mt-1 w-full h-11 px-3 rounded-md border border-brand-border bg-brand-paper text-base focus:border-brand-primary tnum"
          />
        </Field>
        <Field label="Draw date" htmlFor="drawDate" required>
          <input
            id="drawDate"
            name="drawDate"
            type="date"
            required
            defaultValue={initial?.drawDate ?? ""}
            className="mt-1 w-full h-11 px-3 rounded-md border border-brand-border bg-brand-paper text-base focus:border-brand-primary"
          />
        </Field>
      </div>

      <Field label="Drawn at" htmlFor="drawnAt" hint="Optional, exact timestamp the draw was held.">
        <input
          id="drawnAt"
          name="drawnAt"
          type="datetime-local"
          defaultValue={drawnAtValue}
          className="mt-1 w-full h-11 px-3 rounded-md border border-brand-border bg-brand-paper text-base focus:border-brand-primary"
        />
      </Field>

      <Field
        label="Winning numbers"
        htmlFor="numbers"
        required
        hint="Comma- or space-separated, between 1 and 90. e.g. 12, 27, 34, 56, 78"
      >
        <input
          id="numbers"
          name="numbers"
          type="text"
          required
          inputMode="numeric"
          defaultValue={initial?.numbers.join(", ") ?? ""}
          className="mt-1 w-full h-11 px-3 rounded-md border border-brand-border bg-brand-paper text-base font-mono tnum focus:border-brand-primary"
        />
      </Field>

      <Field
        label="Bonus numbers"
        htmlFor="bonusNumbers"
        hint="Optional. Same format as winning numbers."
      >
        <input
          id="bonusNumbers"
          name="bonusNumbers"
          type="text"
          inputMode="numeric"
          defaultValue={initial?.bonusNumbers.join(", ") ?? ""}
          className="mt-1 w-full h-11 px-3 rounded-md border border-brand-border bg-brand-paper text-base font-mono tnum focus:border-brand-primary"
        />
      </Field>

      <Field label="Source" htmlFor="source">
        <select
          id="source"
          name="source"
          defaultValue={initial?.source ?? "manual"}
          className="mt-1 w-full h-11 px-3 rounded-md border border-brand-border bg-brand-paper text-base focus:border-brand-primary"
        >
          <option value="nla">NLA feed</option>
          <option value="manual">Manual entry</option>
          <option value="admin">Admin override</option>
        </select>
      </Field>

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          name="published"
          defaultChecked={initial?.published ?? true}
          className="w-5 h-5 rounded border-brand-border accent-brand-primary"
        />
        <span className="text-sm text-brand-ink">
          <span className="font-semibold">Published</span>
          <span className="block text-xs text-brand-ink-muted">
            When unchecked, the draw stays hidden from public results pages.
          </span>
        </span>
      </label>

      <div className="flex items-center gap-3 pt-4 border-t border-brand-border">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center h-11 px-6 rounded-md bg-brand-primary text-white font-semibold text-sm hover:bg-brand-primary-deep disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {pending ? "Saving…" : submitLabel}
        </button>
        <Link
          href="/admin/draws"
          className="inline-flex items-center justify-center h-11 px-5 rounded-md border border-brand-border text-brand-ink font-medium text-sm hover:bg-brand-paper-muted transition-colors"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  hint,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block">
        <span className="text-xs font-semibold text-brand-ink-muted uppercase tracking-wider">
          {label}
          {required && <span className="text-brand-danger ml-1">*</span>}
        </span>
        {children}
      </label>
      {hint && <p className="mt-1.5 text-xs text-brand-ink-muted">{hint}</p>}
    </div>
  );
}
