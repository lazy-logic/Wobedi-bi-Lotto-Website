/**
 * TypewriterRotate — types out a word, pauses, deletes, then types the next.
 *
 * Used in the Hero headline to cycle the closing keyword
 * (e.g. "Lotto played for [purpose / good / Ghana / community]") so the
 * headline reads as a moving statement rather than a static slogan.
 *
 * Implementation: pure setTimeout — no animation library, ~50 lines.
 * Honours `prefers-reduced-motion` by collapsing to a static cross-fade
 * between words on a long interval.
 *
 * Words are sized via the parent's font-size — this component is just an
 * inline-block that fills its content width. Reserve enough space in the
 * surrounding layout to avoid layout shift when the longest word lands.
 */
"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  words: string[];
  /** ms per character while typing */
  typeMs?: number;
  /** ms per character while deleting (usually faster than typing) */
  deleteMs?: number;
  /** ms to hold a fully-typed word before starting to delete */
  holdMs?: number;
  /** Optional className applied to the rotating word span (e.g. text colour) */
  className?: string;
};

export function TypewriterRotate({
  words,
  typeMs = 90,
  deleteMs = 45,
  holdMs = 1600,
  className,
}: Props) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing");
  const [reducedMotion, setReducedMotion] = useState(false);
  const longestWord = useRef(words.reduce((a, b) => (b.length > a.length ? b : a), ""));

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(m.matches);
    const onChange = () => setReducedMotion(m.matches);
    m.addEventListener("change", onChange);
    return () => m.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    // Guards against:
    //  1. Empty words array (no-op)
    //  2. Out-of-bounds index (Fast Refresh can leave stale state when the
    //     words array shrinks — e.g. went from 5 to 3 entries — and the
    //     stored index points past the new end. Snap it back to 0.)
    if (words.length === 0) return;
    if (index >= words.length) {
      setIndex(0);
      return;
    }

    if (reducedMotion) {
      // Cross-fade variant: just swap the full word every few seconds.
      setText(words[index]);
      const t = setTimeout(() => setIndex((i) => (i + 1) % words.length), 3500);
      return () => clearTimeout(t);
    }

    const target = words[index];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < target.length) {
        timeout = setTimeout(() => setText(target.slice(0, text.length + 1)), typeMs);
      } else {
        timeout = setTimeout(() => setPhase("holding"), holdMs);
      }
    } else if (phase === "holding") {
      timeout = setTimeout(() => setPhase("deleting"), 200);
    } else {
      // deleting
      if (text.length > 0) {
        timeout = setTimeout(() => setText(text.slice(0, -1)), deleteMs);
      } else {
        setIndex((i) => (i + 1) % words.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase, index, words, typeMs, deleteMs, holdMs, reducedMotion]);

  // Reserve width so the layout doesn't jump as the typed text grows/shrinks.
  // The hidden ghost sits in the same flow at the longest word's width;
  // the rendered text is absolutely positioned over it.
  return (
    <span className="relative inline-block align-baseline">
      <span aria-hidden className="invisible whitespace-pre">
        {longestWord.current}
      </span>
      <span
        aria-live="polite"
        className={cn("absolute inset-0 whitespace-pre", className)}
      >
        {text}
        <span
          aria-hidden
          className="ml-0.5 inline-block w-[0.05em] h-[0.85em] -mb-[0.1em] bg-current align-baseline animate-pulse"
        />
      </span>
    </span>
  );
}
