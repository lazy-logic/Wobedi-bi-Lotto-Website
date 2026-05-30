/**
 * DeleteDrawButton — small client component that wraps the deleteDraw server
 * action with a window.confirm gate.
 *
 * Kept tiny on purpose: the form posts to the action with the draw id baked
 * in, and confirm() blocks the submit if the editor backs out.
 */
"use client";

import { Trash2 } from "lucide-react";
import { deleteDraw } from "./actions";

export function DeleteDrawButton({ id, drawNumber }: { id: string; drawNumber: number }) {
  return (
    <form
      action={async () => {
        await deleteDraw(id);
      }}
      onSubmit={(e) => {
        if (!window.confirm(`Delete draw #${drawNumber}? This can't be undone.`)) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold text-brand-danger hover:bg-brand-danger/10 transition-colors"
      >
        <Trash2 size={12} strokeWidth={2} />
        Delete
      </button>
    </form>
  );
}
