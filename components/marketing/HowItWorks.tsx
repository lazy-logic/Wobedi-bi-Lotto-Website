/**
 * HowItWorks — three-step explainer section.
 *
 * Pattern adapted from a third-party Bootstrap component the owner shared:
 * STEP_01 eyebrow + icon + giant ghost number behind + bold uppercase title +
 * short body, repeated three times in a row with a dashed connector linking
 * the icons.
 *
 * Content adapted to our model:
 *   1. PICK YOUR GAME       — NLA-licensed draws to choose from
 *   2. VISIT AN APPROVED POS — Walk into an approved agent and play on
 *                              their NLA-licensed POS terminal.
 *   3. WATCH FOR THE DRAW   — Results land within minutes; per-game archive
 *                              is one click away.
 *
 * Reusable: drop into any page that needs a quick mechanics explainer.
 * Currently used on /how-to-play.
 */
import Link from "next/link";
import {
  Ticket,
  MapPin,
  Trophy,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { games } from "@/lib/games";

type Step = {
  number: string;
  numberShadow: string;
  icon: LucideIcon;
  title: string;
  body: string;
};

const STEPS: Step[] = [
  {
    number: "01",
    numberShadow: "1",
    icon: Ticket,
    title: "Pick your game",
    body: "Browse our NLA-licensed draws across mid-week and weekend slots. Pick what fits the day.",
  },
  {
    number: "02",
    numberShadow: "2",
    icon: MapPin,
    title: "Visit an approved POS",
    body: "Walk into any approved agent and play on their NLA-licensed POS terminal.",
  },
  {
    number: "03",
    numberShadow: "3",
    icon: Trophy,
    title: "Watch for the draw",
    body: "Results stream here within minutes of the official NLA draw.",
  },
];

export function HowItWorks() {
  return (
    <section className="section-light relative py-24 md:py-32 bg-white overflow-hidden">
      <Container className="relative z-10">
        {/* No header here — the PageHeader on /how-to-play already carries
            the eyebrow + title + subtitle for this section. Adding another
            header would duplicate the message. */}
        <ol aria-label="How to play" className="relative grid gap-12 md:gap-8 lg:gap-12 md:grid-cols-3">
          {/* Dashed connector line — runs horizontally through the icon row */}
          <div
            aria-hidden
            className="hidden md:block absolute top-[136px] left-[20%] right-[20%] border-t-2 border-dashed border-brand-border -z-10"
          />

          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <li
                key={step.number}
                className="group relative text-center"
              >
                {/* Eyebrow */}
                <p className="eyebrow text-brand-ink mb-6">
                  Step <span className="text-brand-signal-deep">_{step.number}</span>
                </p>

                {/* Icon block — ghost number sits behind */}
                <div className="relative inline-flex items-center justify-center w-24 h-24 mb-8">
                  {/* Giant ghost number */}
                  <span
                    aria-hidden
                    className="absolute inset-0 flex items-center justify-center font-display font-black text-[10rem] leading-none text-brand-primary/[0.06] select-none pointer-events-none -z-10"
                  >
                    {step.numberShadow}
                  </span>
                  {/* Icon on top — gradient fill, lifts on hover */}
                  <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-primary-deep text-white transition-all duration-300 group-hover:-translate-y-1">
                    <Icon size={28} strokeWidth={1.75} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display font-extrabold uppercase text-xl md:text-2xl tracking-[-0.01em] text-brand-ink">
                  {step.title}
                </h3>

                {/* Body */}
                <p className="mt-3 text-base text-brand-ink-muted leading-relaxed max-w-xs mx-auto">
                  {step.body}
                </p>
              </li>
            );
          })}
        </ol>

        {/* Footer link */}
        <div className="mt-16 text-center">
          <Link
            href="/games"
            className="group inline-flex items-center gap-2 h-12 px-7 rounded-full bg-brand-primary text-white text-base font-semibold hover:bg-brand-primary-deep transition-all"
          >
            Browse all {games.length} games
            <ArrowRight
              size={18}
              strokeWidth={2}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </Container>
    </section>
  );
}
