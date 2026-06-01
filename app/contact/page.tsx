/**
 * /contact — modern contact page.
 *
 * Layout:
 *   1. PageHeader (dark band).
 *   2. Framed map card (top) with an address chip overlaid on it.
 *   3. Quick-contact row — three tappable action cards (Call · Email · Visit).
 *   4. Two-panel band: the message form (light card) beside a dark "contact
 *      rail" with office details, compliance route, and NLA verification.
 *
 * The form (components-local ContactForm) is fully wired: it calls the
 * submitContactMessage server action (app/contact/actions.ts), which validates
 * and inserts into the contact_messages Postgres table. Submissions land in the
 * /admin/messages inbox. No email service or third-party form handler.
 */
import type { Metadata } from "next";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { LightSection } from "@/components/layout/LightSection";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactForm } from "./ContactForm";
import { NLA_REGISTER_URL } from "@/lib/regulatory";

// Google Maps embed centred on Adansi-Asokwa via LAT/LNG coordinates (not a
// `q=` place search) — coordinates render a clean map with NO place info-card,
// rating box, or POI popup. Lazy-loaded; a transparent overlay absorbs pointer
// events so the map reads as a static reference image.
const OFFICE_LAT = 6.2547;
const OFFICE_LNG = -1.4699;
const MAP_EMBED_SRC = `https://maps.google.com/maps?ll=${OFFICE_LAT},${OFFICE_LNG}&z=13&output=embed`;

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach the Wobedi Bi Lotto office, compliance team, or send a general enquiry. Address, phone, email, and a contact form.",
};

const QUICK = [
  {
    icon: Phone,
    label: "Call us",
    value: "054 303 0032",
    href: "tel:+233543030032",
    note: "Mon-Fri · 8am-6pm",
  },
  {
    icon: Mail,
    label: "Email us",
    value: "info@wobedibi.com",
    href: "mailto:info@wobedibi.com",
    note: "Reply within 2 working days",
  },
  {
    icon: MapPin,
    label: "Visit us",
    value: "Adansi-Asokwa",
    href: "#contact-map",
    note: "Ashanti Region, Ghana",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="We're here to help."
        subtitle="Call us, send a message, or drop by the office, whatever's easiest. We answer within two working days."
      />

      {/* ── Full-bleed map (top, flush against the header) ────────────────
          Edge-to-edge, no gap below the PageHeader. Nothing is written over
          the map — it shows the location cleanly. A transparent overlay still
          absorbs pointer events so the embed's own rating/info popups and
          controls never appear; the map reads as a static reference image. */}
      <section
        id="contact-map"
        className="relative overflow-hidden scroll-mt-24"
        aria-label="Map showing the Wobedi Bi Lotto head office in Adansi-Asokwa, Ashanti Region, Ghana"
      >
        <iframe
          title="Map showing the Wobedi Bi Lotto office in Adansi-Asokwa, Ashanti Region, Ghana"
          src={MAP_EMBED_SRC}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block w-full h-[180px] md:h-[260px]"
          allowFullScreen
        />
        {/* Transparent overlay — blocks panning/zoom and the embed's info &
            rating popups so the map reads as a static reference image. */}
        <div aria-hidden className="absolute inset-0 pointer-events-auto" />

        {/* Soft inset edge framing so the full-bleed map meets the page
            cleanly (no text, purely visual). */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10"
          style={{
            boxShadow:
              "inset 0 14px 28px -18px rgba(13,51,125,0.45), inset 0 -14px 28px -18px rgba(13,51,125,0.45)",
          }}
        />
      </section>

      {/* ── Form + contact rail ───────────────────────────────────────── */}
      <LightSection className="pt-10 md:pt-14 pb-12 md:pb-16" wave="left">
        <Container>
          <div className="grid gap-6 lg:gap-8 lg:grid-cols-12">
            {/* Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-brand-border bg-white p-6 md:p-9">
                <h2 className="font-display font-extrabold text-2xl md:text-3xl text-brand-ink tracking-[-0.015em]">
                  Send us a message
                </h2>
                <p className="mt-2 text-sm text-brand-ink-muted">
                  Fill in the form and we'll get back to you. For urgent
                  compliance matters, use the direct route on the right.
                </p>

                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </div>

            {/* Contact rail — genuinely dark panel for contrast. Uses the
                brand-rail token (NOT remapped by .section-light) so the
                surrounding light scope can't wash it to pale blue. */}
            <aside className="lg:col-span-5">
              <div
                className="relative h-full overflow-hidden rounded-3xl p-6 md:p-9 text-white bg-brand-rail"
                style={{ colorScheme: "dark" }}
              >
                <div className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3b9bff]" />
                  <span className="eyebrow text-white/60">Head office</span>
                </div>

                <address className="mt-4 not-italic text-lg font-display font-bold leading-snug text-white">
                  Wobedi Bi Lotto<br />
                  Adansi-Asokwa, Ashanti Region<br />
                  Ghana
                </address>

                <dl className="mt-7 space-y-5 text-sm">
                  <div className="flex gap-3.5">
                    <Phone size={18} strokeWidth={2} className="mt-0.5 flex-shrink-0 text-[#3b9bff]" />
                    <dd className="tnum space-y-0.5 text-white/85">
                      <a href="tel:+233543030032" className="block hover:text-white">054 303 0032</a>
                      <a href="tel:+233553023181" className="block hover:text-white">055 302 3181</a>
                      <a href="tel:+233246084296" className="block hover:text-white">024 608 4296</a>
                    </dd>
                  </div>
                  <div className="flex gap-3.5">
                    <Clock size={18} strokeWidth={2} className="mt-0.5 flex-shrink-0 text-[#3b9bff]" />
                    <dd className="text-white/85">
                      Mon-Fri · 8am-6pm<br />
                      Sat · 9am-2pm
                    </dd>
                  </div>
                </dl>

                {/* Compliance route */}
                <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck size={18} strokeWidth={2} className="text-[#3b9bff]" />
                    <span className="text-sm font-bold text-white">Compliance &amp; responsible play</span>
                  </div>
                  <p className="mt-2 text-xs text-white/65 leading-relaxed">
                    Underage-play reports, self-exclusion, or compliance matters:
                  </p>
                  <a
                    href="mailto:compliance@wobedibilotto.com"
                    className="mt-2 block text-sm font-semibold text-[#3b9bff] hover:text-white break-words"
                  >
                    compliance@wobedibilotto.com
                  </a>
                  <Link
                    href="/responsible-play"
                    className="mt-3 inline-flex items-center gap-1 text-xs text-white/60 hover:text-white"
                  >
                    Read our responsible-play guidance
                    <ArrowUpRight size={13} strokeWidth={2} />
                  </Link>
                </div>

                <p className="mt-6 text-xs text-white/55">
                  Verify our NLA registration at{" "}
                  <a
                    href={NLA_REGISTER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#3b9bff] hover:text-white"
                  >
                    nla.com.gh
                  </a>
                  .
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </LightSection>

      {/* ── Quick-contact action row (bottom of page) ──────────────────── */}
      <LightSection className="pb-16 md:pb-24" wave="right">
        <Container>
          <div className="mb-6 flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
            <span className="eyebrow text-brand-ink-muted">Quick contact</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {QUICK.map((q) => (
              <a
                key={q.label}
                href={q.href}
                className="group relative flex items-center gap-4 rounded-2xl border border-brand-border bg-white p-5 pr-10 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/40"
              >
                {/* Icon — inline, to the left of the text */}
                <span className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brand-primary-soft text-brand-primary">
                  <q.icon size={20} strokeWidth={2} />
                </span>

                {/* Text block */}
                <div className="min-w-0">
                  <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-brand-ink-muted">
                    {q.label}
                  </span>
                  <span className="block font-display font-extrabold text-lg text-brand-ink leading-tight break-words">
                    {q.value}
                  </span>
                  <span className="block text-xs text-brand-ink-muted">{q.note}</span>
                </div>

                {/* Arrow — pinned top-right corner */}
                <ArrowUpRight
                  size={18}
                  strokeWidth={2}
                  className="absolute top-4 right-4 text-brand-ink-muted transition-all group-hover:text-brand-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            ))}
          </div>
        </Container>
      </LightSection>
    </>
  );
}
