/**
 * ContactForm — the interactive /contact message form.
 *
 * Client component so it can use React 19's `useActionState` to call the
 * submitContactMessage server action and surface inline success / error /
 * pending states without a full page reload. On success the form is replaced
 * by a confirmation panel; on error an alert sits above the fields and the
 * user's input is preserved (the form isn't reset).
 *
 * The visible fields match the original static markup; the hidden "company"
 * input is a honeypot the server action checks for spam.
 */
"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Send, CheckCircle2 } from "lucide-react";
import { submitContactMessage, type ContactResult } from "./actions";

const SUBJECTS = [
  { value: "general", label: "General enquiry" },
  { value: "agent", label: "Agent application" },
  { value: "winner", label: "Prize claim / winner" },
  { value: "compliance", label: "Compliance / responsible play" },
  { value: "press", label: "Press & partnerships" },
];

const FIELD =
  "w-full rounded-xl border border-brand-border-strong bg-white px-4 text-base text-brand-ink placeholder:text-brand-ink-muted/60 transition-colors focus:border-brand-primary focus:outline-none";

export function ContactForm() {
  const [state, formAction, pending] = useActionState<ContactResult | null, FormData>(
    submitContactMessage,
    null,
  );

  if (state?.ok) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-brand-success/30 bg-brand-success/5 px-6 py-12 text-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-success/15 text-brand-success">
          <CheckCircle2 size={30} strokeWidth={2} />
        </span>
        <h3 className="mt-5 font-display font-extrabold text-xl md:text-2xl text-brand-ink">
          Message sent.
        </h3>
        <p className="mt-2 max-w-sm text-sm text-brand-ink-muted">
          Thanks for reaching out. We've received your message and will reply
          within two working days.
        </p>
      </div>
    );
  }

  const error = state && !state.ok ? state.error : null;

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {error && (
        <div
          role="alert"
          className="rounded-xl border border-brand-danger/40 bg-brand-danger/5 px-4 py-3 text-sm font-medium text-brand-danger"
        >
          {error}
        </div>
      )}

      {/* Honeypot — visually hidden, off the tab order, ignored by humans. */}
      <div aria-hidden className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden" >
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-brand-ink-muted">
            Your name
          </span>
          <input
            type="text"
            name="name"
            required
            maxLength={120}
            autoComplete="name"
            placeholder="Kwame Mensah"
            className={`${FIELD} h-12`}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-brand-ink-muted">
            Email
          </span>
          <input
            type="email"
            name="email"
            required
            maxLength={200}
            autoComplete="email"
            placeholder="you@example.com"
            className={`${FIELD} h-12`}
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-brand-ink-muted">
          Subject
        </span>
        <select name="subject" required defaultValue="general" className={`${FIELD} h-12`}>
          {SUBJECTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-brand-ink-muted">
          Message
        </span>
        <textarea
          name="message"
          required
          rows={6}
          maxLength={4000}
          placeholder="How can we help?"
          className={`${FIELD} resize-none py-3`}
        />
      </label>

      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-brand-ink-muted">
          By submitting you agree to the{" "}
          <Link href="/legal/privacy" className="text-brand-primary hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl bg-brand-primary text-white font-semibold transition-colors hover:bg-brand-primary-deep disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send message"}
          <Send
            size={16}
            strokeWidth={2.25}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </button>
      </div>
    </form>
  );
}
