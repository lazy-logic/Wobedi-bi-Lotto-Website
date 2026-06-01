/**
 * MessageActions — per-message controls for the /admin/messages inbox.
 *
 * A read/unread toggle and a delete button (confirm-gated), each a tiny form
 * bound to its server action with the message id baked in. Kept as a client
 * component only for the window.confirm gate and the toggle label.
 */
"use client";

import { Trash2, MailOpen, Mail } from "lucide-react";
import { setMessageRead, deleteMessage } from "./actions";

export function MessageActions({ id, read }: { id: string; read: boolean }) {
  return (
    <div className="inline-flex items-center gap-2">
      <form
        action={async () => {
          await setMessageRead(id, !read);
        }}
      >
        <button
          type="submit"
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold text-brand-signal hover:bg-brand-primary/10 transition-colors"
        >
          {read ? <Mail size={12} strokeWidth={2} /> : <MailOpen size={12} strokeWidth={2} />}
          {read ? "Mark unread" : "Mark read"}
        </button>
      </form>
      <form
        action={async () => {
          await deleteMessage(id);
        }}
        onSubmit={(e) => {
          if (!window.confirm("Delete this message? This can't be undone.")) {
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
    </div>
  );
}
