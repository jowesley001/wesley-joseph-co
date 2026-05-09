"use client";

import { motion } from "framer-motion";
import { Eclipse } from "@/components/ui/Eclipse";
import { MovingParticles } from "@/components/ui/MovingParticles";

// Cinematic phase pacing (first-visit). Returning visitors collapse all
// delays so the homepage settles immediately into the Identity State.
//
// 01 The Void           ~0.0s   black + grain
// 02 The Presence       ~0.8s   eclipse fades in with corona
// 03 The Alignment      ~2.4s   typography emerges, blurred and wide-spaced
// 04 The Reveal         ~3.2s   typography settles into place
// 05 The Impact         ~4.4s   subtle stretch / sharpen
// 06 Identity State     ~5.4s+  tagline arrives, motion stays quiet
//
// To replay during testing: localStorage.removeItem("wjc:intro:v1:seen")

type Props = {
  skipIntro: boolean;
};

const HEADLINE = ["Wesley", "Joseph", "Co."];

export function CinematicHomepage({ skipIntro }: Props) {
  const d = (t: number) => (skipIntro ? 0 : t);
  const dur = (t: number) => (skipIntro ? Math.min(t, 1.2) : t);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-bg text-ink">
      {/* The Void — atmospheric layer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: dur(2), delay: d(0.2), ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-0"
      >
        <MovingParticles count={26} intensity="low" seed={3} />
      </motion.div>

      {/* The Reveal — typography sits BEHIND the eclipse so the eclipse partially obscures it */}
      <BrandTypography skipIntro={skipIntro} d={d} dur={dur} />

      {/* The Presence — eclipse anchored center, in front of the typography */}
      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
        <Eclipse delay={d(0.8)} skipIntro={skipIntro} />
      </div>

      {/* Identity State — quiet tagline, last to arrive */}
      <motion.p
        initial={{ opacity: 0, y: 14, letterSpacing: "0.6em" }}
        animate={{ opacity: 0.85, y: 0, letterSpacing: "0.45em" }}
        transition={{ duration: dur(2), delay: d(5.4), ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute bottom-12 left-0 right-0 z-30 px-6 text-center font-mono text-[clamp(0.7rem,0.95vw,0.85rem)] uppercase text-ink-soft md:bottom-16"
      >
        Financial intelligence · Media power · Cultural influence
      </motion.p>
    </section>
  );
}

function BrandTypography({
  skipIntro,
  d,
  dur
}: {
  skipIntro: boolean;
  d: (t: number) => number;
  dur: (t: number) => number;
}) {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6">
        <motion.h1
          initial={{ opacity: 0, scale: 0.96, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{
            opacity: { duration: dur(2.2), delay: d(2.4), ease: [0.22, 1, 0.36, 1] },
            scale: { duration: dur(3.2), delay: d(2.4), ease: [0.22, 1, 0.36, 1] },
            filter: { duration: dur(2.6), delay: d(2.4), ease: [0.22, 1, 0.36, 1] }
          }}
          className="text-center"
        >
          <span className="sr-only">Wesley Joseph Co.</span>
          <motion.span
            aria-hidden
            initial={{ letterSpacing: "0.45em" }}
            animate={{ letterSpacing: "0.18em" }}
            transition={{ duration: dur(3.6), delay: d(2.4), ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-2 font-display text-[clamp(3.5rem,17vw,7.5rem)] font-light uppercase leading-[0.92] tracking-[0.04em] text-ink md:gap-[0.4em] md:tracking-[0.18em] md:flex-row md:whitespace-nowrap"
          >
            {HEADLINE.map((word, i) => (
              <motion.span
                key={word}
                initial={{ y: 28, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: dur(1.8),
                  delay: d(2.6 + i * 0.18),
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </motion.span>
        </motion.h1>
      </div>

      {/* Subtle stretch/shift impact on the brand mark — Phase 05 */}
      {!skipIntro ? (
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{
            times: [0, 0.5, 1],
            duration: 0.9,
            delay: 4.4,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="pointer-events-none absolute inset-0 z-25"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,255,255,0.16), transparent 38%)"
          }}
        />
      ) : null}
    </>
  );
}
