/**
 * Server action for the public /contact form.
 *
 * This is the "PHP handler" half of a classic PHP/MySQL contact form, done the
 * Next.js way: the form POSTs here, we validate the fields server-side, run a
 * couple of cheap spam checks, and INSERT one row into the contact_messages
 * Postgres table (Supabase). No email service, no third-party form endpoint.
 *
 * Auth: this runs for ANONYMOUS visitors, so it uses the cookie-aware route
 * client (anon key). The DB's RLS policy "public can submit contact messages"
 * (migration 0004) is what authorises the insert — and it ONLY allows insert,
 * so a visitor can send a message but can never read the inbox. The admin
 * inbox at /admin/messages reads with an authenticated session.
 */
"use server";

import { cookies, headers } from "next/headers";
import { createRouteClient, isSupabaseConfigured } from "@/lib/supabase-server";

const SUBJECTS = ["general", "agent", "winner", "compliance", "press"] as const;
const MAX = { name: 120, email: 200, message: 4000 } as const;

// Loose email shape check — deliberately permissive (the DB column is text);
// real deliverability is verified by replying, not by a regex.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactResult =
  | { ok: true }
  | { ok: false; error: string };

type Parsed = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function readForm(formData: FormData): Parsed | { error: string } {
  // Honeypot: a hidden field real users never fill. Bots that blindly fill
  // every input trip it. We return a fake-success upstream so the bot can't
  // tell it was caught.
  const trap = String(formData.get("company") ?? "").trim();
  if (trap) return { error: "__spam__" };

  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: "Please enter your name." };
  if (name.length > MAX.name) return { error: "That name is too long." };

  const email = String(formData.get("email") ?? "").trim();
  if (!email) return { error: "Please enter your email." };
  if (email.length > MAX.email || !EMAIL_RE.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  const subjectRaw = String(formData.get("subject") ?? "general").trim();
  const subject = (SUBJECTS as readonly string[]).includes(subjectRaw)
    ? subjectRaw
    : "general";

  const message = String(formData.get("message") ?? "").trim();
  if (!message) return { error: "Please enter a message." };
  if (message.length < 10) return { error: "Please add a little more detail (at least 10 characters)." };
  if (message.length > MAX.message) return { error: "That message is too long (max 4000 characters)." };

  return { name, email, subject, message };
}

export async function submitContactMessage(
  _prev: ContactResult | null,
  formData: FormData,
): Promise<ContactResult> {
  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      error: "The contact form isn't available right now. Please email info@wobedibi.com.",
    };
  }

  const parsed = readForm(formData);
  if ("error" in parsed) {
    // Honeypot hit → pretend it worked so the bot gets no signal.
    if (parsed.error === "__spam__") return { ok: true };
    return { ok: false, error: parsed.error };
  }

  // Capture lightweight request metadata for abuse triage (never shown publicly).
  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    null;
  const userAgent = h.get("user-agent");

  const cookieStore = await cookies();
  const supabase = createRouteClient({
    getAll: () => cookieStore.getAll(),
    set: (name, value, options) => cookieStore.set(name, value, options),
  });

  // Cast to never — the hand-written database.types.ts infers Insert payloads as
  // `never` in deep-generic positions, same caveat noted in app/admin/draws/actions.ts.
  const insertPayload = {
    name: parsed.name,
    email: parsed.email,
    subject: parsed.subject,
    message: parsed.message,
    ip,
    user_agent: userAgent ?? null,
  };

  const { error } = await supabase
    .from("contact_messages")
    .insert(insertPayload as never);

  if (error) {
    return {
      ok: false,
      error: "Something went wrong sending your message. Please try again, or email info@wobedibi.com.",
    };
  }

  return { ok: true };
}
