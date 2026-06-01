/**
 * /admin/messages — contact-form inbox.
 *
 * Lists every submission from the public /contact form, newest first, with the
 * sender, subject, full message, and timestamp. Unread messages are highlighted
 * and can be toggled read/unread or deleted.
 *
 * Reads run under the admin session (RLS gates the table to authenticated), so
 * when Supabase isn't configured the page shows the same setup hint as the
 * other admin surfaces rather than falling back to mocks.
 */
import Link from "next/link";
import { ArrowLeft, Inbox } from "lucide-react";
import { fetchContactMessages } from "@/lib/data";
import { isSupabaseConfigured } from "@/lib/supabase-server";
import { MessageActions } from "./MessageActions";

export const dynamic = "force-dynamic";

const SUBJECT_LABELS: Record<string, string> = {
  general: "General enquiry",
  agent: "Agent application",
  winner: "Prize claim / winner",
  compliance: "Compliance / responsible play",
  press: "Press & partnerships",
};

function formatStamp(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminMessagesPage() {
  const configured = isSupabaseConfigured();
  const messages = configured ? await fetchContactMessages(500) : [];
  const unread = messages.filter((m) => !m.read).length;

  return (
    <>
      <div className="mb-6">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-xs text-brand-ink-muted hover:text-brand-signal mb-2"
        >
          <ArrowLeft size={14} strokeWidth={2} />
          Overview
        </Link>
        <h1 className="text-4xl">Messages</h1>
        <p className="text-sm text-brand-ink-muted mt-1">
          {configured
            ? `${messages.length} message${messages.length === 1 ? "" : "s"}${unread ? ` · ${unread} unread` : ""} from the contact form.`
            : "Contact-form inbox, Supabase not configured yet."}
        </p>
      </div>

      {!configured && (
        <div className="rounded-lg border border-brand-warning/40 bg-brand-warning/5 p-5 text-sm text-brand-ink">
          <p className="font-semibold mb-1">Supabase isn't configured.</p>
          <p className="text-brand-ink-muted">
            Set <code className="code">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
            <code className="code">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in{" "}
            <code className="code">.env.local</code>, then run the migrations in{" "}
            <code className="code">supabase/migrations/</code> (including{" "}
            <code className="code">0004_contact_messages.sql</code>). See{" "}
            <code className="code">docs/supabase-setup.md</code>.
          </p>
        </div>
      )}

      {configured && messages.length === 0 && (
        <div className="rounded-lg border border-brand-border bg-brand-paper p-10 text-center">
          <Inbox size={28} strokeWidth={1.5} className="mx-auto text-brand-ink-muted/60" />
          <p className="mt-3 text-brand-ink-muted">
            No messages yet. Submissions from the{" "}
            <Link href="/contact" className="text-brand-signal font-semibold">
              contact form
            </Link>{" "}
            will appear here.
          </p>
        </div>
      )}

      {configured && messages.length > 0 && (
        <ul className="space-y-4">
          {messages.map((m) => (
            <li
              key={m.id}
              className={`rounded-lg border bg-brand-paper p-5 ${
                m.read ? "border-brand-border" : "border-brand-signal/50 bg-brand-primary/[0.04]"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    {!m.read && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-brand-signal/15 text-brand-signal text-[10px] font-bold uppercase tracking-wider">
                        New
                      </span>
                    )}
                    <span className="font-semibold text-brand-ink">{m.name}</span>
                    <a
                      href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(SUBJECT_LABELS[m.subject] ?? m.subject)}`}
                      className="text-sm text-brand-signal hover:underline"
                    >
                      {m.email}
                    </a>
                  </div>
                  <p className="mt-1 text-xs uppercase tracking-wider text-brand-ink-muted">
                    {SUBJECT_LABELS[m.subject] ?? m.subject} · {formatStamp(m.createdAt)}
                  </p>
                </div>
                <MessageActions id={m.id} read={m.read} />
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-brand-ink">
                {m.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
