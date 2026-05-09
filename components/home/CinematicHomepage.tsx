"use client";

import { motion } from "framer-motion";
import { Eclipse } from "@/components/ui/Eclipse";
import { MovingParticles } from "@/components/ui/MovingParticles";

// Cinematic phase pacing — runs on every refresh by design.
//
// Phase 1   0.0–1.2s   void: black + grain + particles fade in;
//                       eclipse appears blurred, slightly larger, below center
// Phase 2   1.2–2.4s   eclipse drifts up to center, scale 1.08 → 1.0
// Phase 3   2.4–3.6s   "WESLEY JOSEPH CO." reveals letter-by-letter, blur
//                       sharpens, letter-spacing tightens
// Phase 4   3.6–4.4s   tagline rises 8px and sharpens; header fades in last
// Phase 5   4.4s +    ambient loop forever (drift, breathe, pulse, sweep)
//
// To see again during testing, just refresh.

const WORDS = [
  { word: "Wesley", letterStart: 0 },
  { word: "Joseph", letterStart: 6 },
  { word: "Co.", letterStart: 12 }
];

export function CinematicHomepage() {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-bg text-ink">
      {/* PHASE 1 — atmospheric ground: gradient with continuous CSS drift */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, delay: 0.0, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background:
            "radial-gradient(ellipse 70% 64% at 50% 50%, rgba(255,255,255,0.08), rgba(0,0,0,0) 60%)",
          backgroundSize: "180% 180%",
          animation: "wjcAmbientGradient 18s ease-in-out infinite"
        }}
      />

      {/* PHASE 1 — drifting dust particles */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-0"
      >
        <MovingParticles count={32} intensity="low" seed={3} />
      </motion.div>

      {/* AMBIENT — floating light leaks (CSS keyframes, infinite) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 32% 32% at 78% 18%, rgba(255,255,255,0.18), transparent 55%)",
          animation: "wjcLeakA 24s ease-in-out infinite -6s"
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 36% 30% at 18% 82%, rgba(255,255,255,0.12), transparent 55%)",
          animation: "wjcLeakB 28s ease-in-out infinite -10s"
        }}
      />

      {/* PHASE 3 — typography sits BEHIND the eclipse */}
      <BrandTypography />

      {/* PHASE 2 — eclipse (in front of typography) */}
      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
        <Eclipse />
      </div>

      {/* PHASE 4 — tagline rises 8px and sharpens, then breathes */}
      <motion.p
        initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
        animate={{ opacity: 0.9, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.9, delay: 3.6, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute bottom-12 left-0 right-0 z-30 px-6 text-center md:bottom-16"
      >
        <motion.span
          className="inline-block font-mono text-[clamp(0.7rem,0.95vw,0.85rem)] uppercase tracking-[0.45em] text-ink-soft"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 8, delay: 4.4, repeat: Infinity, ease: "easeInOut" }}
        >
          Financial intelligence · Media power · Cultural influence
        </motion.span>
      </motion.p>
    </section>
  );
}

function BrandTypography() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6">
      {/* Continuous breathing wrapper — opacity 0.88↔1 over 8s, y ±2 over 10s */}
      <motion.div
        className="text-center"
        animate={{
          opacity: [0.88, 1, 0.88],
          y: [-2, 2, -2]
        }}
        transition={{
          opacity: { duration: 8, delay: 4.4, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 10, delay: 4.4, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <h1>
          <span className="sr-only">Wesley Joseph Co.</span>
          <motion.span
            aria-hidden
            // Letter-spacing tightens during Phase 3
            initial={{ letterSpacing: "0.4em" }}
            animate={{ letterSpacing: "0.18em" }}
            transition={{ duration: 1.0, delay: 2.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-2 font-display text-[clamp(3.5rem,17vw,7.5rem)] font-light uppercase leading-[0.92] text-ink md:flex-row md:gap-[0.4em] md:whitespace-nowrap"
          >
            {WORDS.map(({ word, letterStart }) => (
              <span key={letterStart} className="inline-block">
                {word.split("").map((letter, letterIdx) => {
                  const globalIdx = letterStart + letterIdx;
                  const delay = 2.4 + globalIdx * 0.045;
                  return (
                    <motion.span
                      key={letterIdx}
                      initial={{ opacity: 0, y: 14, filter: "blur(14px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{
                        duration: 0.6,
                        delay,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                      className="inline-block"
                    >
                      {letter}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </motion.span>
        </h1>
      </motion.div>
    </div>
  );
}
