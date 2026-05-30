/**
 * /contact — real contact page with form + office details.
 *
 * The form below is a static UI mock — the action POSTS to /api/contact
 * which doesn't exist yet. Wire it to an email service (Resend, Postmark,
 * Supabase Edge Function) before launch.
 *
 * Fields use React Hook Form-friendly naming so swapping in RHF + Zod is a
 * trivial follow-up.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, Building2, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { LightSection } from "@/components/layout/LightSection";
import { PageHeader } from "@/components/layout/PageHeader";
import { NLA_REGISTER_URL } from "@/lib/regulatory";

// Google Maps embed for the head-office location. Uses the `q=` query
// parameter so we don't have to compute a place_id / pb=…cid… URL — Maps
// resolves the search server-side. Loading is lazy so the iframe doesn't
// block first paint. The `z=14` query param locks an initial zoom; a
// transparent overlay blocks pointer events so visitors can't pan or
// scroll-zoom — the map reads as a static reference image.
const OFFICE_QUERY = "Wobedi Bi Lotto, Adansi-Asokwa, Adansi Asokwa District, Ashanti Region, Ghana";
const MAP_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(OFFICE_QUERY)}&z=14&output=embed`;

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach the Wobedi Bi Lotto office, compliance team, or send a general enquiry. Address, phone, email, and a contact form.",
};

const SUBJECTS = [
  { value: "general", label: "General enquiry" },
  { value: "agent", label: "Agent application" },
  { value: "winner", label: "Prize claim / winner" },
  { value: "compliance", label: "Compliance / responsible play" },
  { value: "press", label: "Press & partnerships" },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Reach the team."
        subtitle="Office details, contact form, and direct routes for compliance and press enquiries."
      />

      <LightSection className="py-16 md:py-20">
        <Container>
          <div className="grid gap-10 lg:gap-14 lg:grid-cols-12">
            {/* Form column */}
            <div className="lg:col-span-7">
              <h2 className="font-display font-extrabold text-2xl md:text-3xl text-brand-ink mb-2">
                Send us a message
              </h2>
              <p className="text-sm text-brand-ink-muted mb-8">
                We aim to respond within two working days. For urgent
                compliance matters, use the direct email below.
              </p>

              <form
                action="/api/contact"
                method="post"
                className="rounded-2xl border border-brand-border bg-brand-paper p-6 md:p-8 shadow-soft space-y-5"
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="block text-xs font-bold uppercase tracking-wider text-brand-ink-muted mb-1.5">
                      Your name
                    </span>
                    <input
                      type="text"
                      name="name"
                      required
                      autoComplete="name"
                      className="w-full h-11 px-3.5 rounded-md border border-brand-border-strong bg-white text-base focus:border-brand-primary focus:outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="block text-xs font-bold uppercase tracking-wider text-brand-ink-muted mb-1.5">
                      Email
                    </span>
                    <input
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      className="w-full h-11 px-3.5 rounded-md border border-brand-border-strong bg-white text-base focus:border-brand-primary focus:outline-none"
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="block text-xs font-bold uppercase tracking-wider text-brand-ink-muted mb-1.5">
                    Subject
                  </span>
                  <select
                    name="subject"
                    required
                    defaultValue="general"
                    className="w-full h-11 px-3 rounded-md border border-brand-border-strong bg-white text-base focus:border-brand-primary focus:outline-none"
                  >
                    {SUBJECTS.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="block text-xs font-bold uppercase tracking-wider text-brand-ink-muted mb-1.5">
                    Message
                  </span>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    className="w-full px-3.5 py-3 rounded-md border border-brand-border-strong bg-white text-base focus:border-brand-primary focus:outline-none resize-none"
                  />
                </label>

                <p className="text-xs text-brand-ink-muted">
                  By submitting you agree to the{" "}
                  <Link href="/legal/privacy" className="text-brand-primary hover:underline">
                    Privacy Policy
                  </Link>
                  . We use your details to respond to this enquiry only.
                </p>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center h-12 px-7 rounded-full bg-brand-primary text-white font-semibold hover:bg-brand-primary-deep transition-all"
                >
                  Send message
                </button>
              </form>
            </div>

            {/* Details column */}
            <aside className="lg:col-span-5 space-y-5">
              <div className="rounded-2xl border border-brand-border bg-brand-paper-muted p-6 md:p-7">
                <Building2 size={22} strokeWidth={1.75} className="text-brand-primary mb-3" />
                <h3 className="font-display font-extrabold text-lg text-brand-ink mb-4">
                  Head office
                </h3>
                <dl className="space-y-3.5 text-sm">
                  <div className="flex gap-3">
                    <MapPin size={16} strokeWidth={2} className="text-brand-ink-muted mt-0.5 flex-shrink-0" />
                    <dd className="text-brand-ink">
                      Wobedi Bi Lotto<br />
                      Adansi-Asokwa<br />
                      Adansi Asokwa District, Ashanti Region<br />
                      Ghana
                    </dd>
                  </div>
                  <div className="flex gap-3">
                    <Phone size={16} strokeWidth={2} className="text-brand-ink-muted mt-0.5 flex-shrink-0" />
                    <dd className="tnum text-brand-ink space-y-0.5">
                      <a href="tel:+233543030032" className="block hover:text-brand-primary">054 303 0032</a>
                      <a href="tel:+233553023181" className="block hover:text-brand-primary">055 302 3181</a>
                      <a href="tel:+233246084296" className="block hover:text-brand-primary">024 608 4296</a>
                    </dd>
                  </div>
                  <div className="flex gap-3">
                    <Mail size={16} strokeWidth={2} className="text-brand-ink-muted mt-0.5 flex-shrink-0" />
                    <a href="mailto:info@wobedibilotto.com" className="text-brand-primary hover:underline">
                      info@wobedibilotto.com
                    </a>
                  </div>
                  <div className="flex gap-3">
                    <Clock size={16} strokeWidth={2} className="text-brand-ink-muted mt-0.5 flex-shrink-0" />
                    <dd className="text-brand-ink">
                      Mon–Fri · 8am–6pm<br />
                      Sat · 9am–2pm
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-2xl border border-brand-border bg-brand-paper p-6 md:p-7">
                <ShieldCheck size={22} strokeWidth={1.75} className="text-brand-primary mb-3" />
                <h3 className="font-display font-extrabold text-lg text-brand-ink mb-2">
                  Compliance &amp; responsible play
                </h3>
                <p className="text-sm text-brand-ink-muted mb-3">
                  For underage-play reports, self-exclusion requests, or
                  compliance matters, write directly to:
                </p>
                <a
                  href="mailto:compliance@wobedibilotto.com"
                  className="block text-brand-primary font-semibold hover:underline mb-3"
                >
                  compliance@wobedibilotto.com
                </a>
                <Link
                  href="/responsible-play"
                  className="text-sm text-brand-ink-muted hover:text-brand-primary"
                >
                  Read our responsible-play guidance →
                </Link>
              </div>

              <div className="rounded-2xl border border-brand-border bg-brand-paper-sunken p-6 md:p-7 text-sm text-brand-ink-muted">
                Verify our NLA registration on the public register at{" "}
                <a
                  href={NLA_REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-primary font-semibold hover:underline"
                >
                  nla.com.gh
                </a>
                .
              </div>
            </aside>
          </div>
        </Container>
      </LightSection>

      {/* Map — heading inside Container, but the iframe itself breaks the
          Container width and runs full-bleed across the viewport. Half the
          previous height for a tighter strip. Lazy-loaded so it doesn't
          block initial render. */}
      <section className="section-light pt-16 md:pt-20 pb-20 md:pb-24" aria-labelledby="contact-map-heading">
        <Container>
          <div className="mb-5">
            <p className="eyebrow text-brand-primary mb-2">
              Find us
            </p>
            <h2
              id="contact-map-heading"
              className="font-display font-extrabold text-2xl md:text-3xl text-brand-ink"
            >
              Adansi-Asokwa, Ashanti Region.
            </h2>
          </div>
        </Container>

        {/* Full-bleed map strip — outside the Container so it edges the
            viewport. Top/bottom borders give it visual containment without
            losing the full-width feel. The transparent overlay sits on top
            of the iframe to absorb every pointer event — no panning, no
            scroll-zoom, no info-card clicks. The map reads as a static
            reference image. */}
        <div className="relative overflow-hidden border-y border-brand-border bg-brand-paper">
          <iframe
            title="Map showing the Wobedi Bi Lotto office in Adansi-Asokwa, Ashanti Region, Ghana"
            src={MAP_EMBED_SRC}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-[180px] md:h-[230px] block"
            allowFullScreen
          />
          <div aria-hidden className="absolute inset-0 pointer-events-auto bg-transparent" />
        </div>
      </section>
    </>
  );
}
