"use client";

import { motion } from "framer-motion";
import { useEffect, useState, type CSSProperties } from "react";
import { Eclipse } from "@/components/ui/Eclipse";
import { MovingParticles } from "@/components/ui/MovingParticles";

// Cinematic intro-to-homepage sequence (9s, runs every refresh).
//
//   Scene 1   0.0–1.5s   The Void
//                        Black + grain. Tiny dim eclipse fades in at left.
//   Scene 2   1.5–3.0s   The Presence
//                        Eclipse drifts horizontally toward center; the
//                        brand mark is uncovered behind it via a CSS
//                        mask-image gradient that matches the drift.
//   Scene 3   3.0–5.2s   The Distortion
//                        As the eclipse passes the typography, letters
//                        warp subtly: blur up to 2px, very slight
//                        horizontal stretch, looser tracking.
//   Scene 4   5.2–6.8s   The Alignment
//                        Eclipse stops between JOSEPH and CO. Distortion
//                        clears, tracking tightens, glow stabilizes.
//   Scene 5   6.8–9.0s   The Identity Emerges
//                        Eclipse recedes (opacity, scale, blur). Brand
//                        mark grows to hero. Tagline + header arrive.
//   9.0s+              Ambient loop forever.
//
// `introComplete` is set true at 9.0s. After that, each layer runs its
// own ambient cycle and never settles into stasis.

const HEADLINE = ["Wesley", "Joseph", "Co.com"];

// Times normalized to the 9s intro:
//   0.0s = 0
//   1.5s = 0.167   Scene 1 → 2
//   3.0s = 0.333   Scene 2 → 3 (text revealed)
//   4.0s = 0.444   Distortion peak
//   5.2s = 0.578   Scene 3 → 4
//   6.8s = 0.756   Scene 4 → 5
//   9.0s = 1.000   Final state
const TIMES = [0, 0.167, 0.333, 0.444, 0.578, 0.756, 1] as const;
const EASE = [0.22, 1, 0.36, 1] as const;

export function CinematicHomepage() {
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setIntroComplete(true), 9000);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-bg text-ink">
      {/* Atmospheric ground — always shifting */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: EASE }}
        style={{
          background:
            "radial-gradient(ellipse 70% 64% at 50% 50%, rgba(255,255,255,0.08), rgba(0,0,0,0) 60%)",
          backgroundSize: "180% 180%",
          animation: "wjcAmbientGradient 18s ease-in-out infinite"
        }}
      />

      {/* Drifting dust */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.4, ease: EASE }}
        className="pointer-events-none absolute inset-0"
      >
        <MovingParticles count={32} intensity="low" seed={3} />
      </motion.div>

      {/* Light leaks */}
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

      {/* Brand mark — z higher so once unmasked it sits in front of eclipse */}
      <BrandTypography introComplete={introComplete} />

      {/* Eclipse — drifts across the brand mark and settles between JOSEPH and CO */}
      <EclipseInScene introComplete={introComplete} />

      {/* Tagline — emerges with the homepage in Scene 5 */}
      <Tagline introComplete={introComplete} />
    </section>
  );
}

function EclipseInScene({ introComplete }: { introComplete: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
      <motion.div
        // Carrier handles all entry choreography across the 5 scenes.
        initial={{ x: "-30vw", opacity: 0, scale: 0.55, filter: "blur(0px)" }}
        animate={{
          x: ["-30vw", "-22vw", "-2vw", "5vw", "8vw", "8vw", "5vw"],
          opacity: [0, 0.45, 0.95, 1.0, 1.0, 1.0, 0.32],
          scale: [0.55, 0.78, 0.95, 1.0, 1.0, 1.0, 0.86],
          filter: [
            "blur(0px)",
            "blur(0px)",
            "blur(0px)",
            "blur(0px)",
            "blur(0px)",
            "blur(0px)",
            "blur(3px)"
          ]
        }}
        transition={{ duration: 9.0, times: [...TIMES], ease: EASE }}
      >
        {/* Eclipse runs its own ambient drift internally after 9s */}
        <Eclipse ambientDelay={9.0} />
      </motion.div>

      {/* After intro completes, give the eclipse a tiny continuous x drift on
          top of its settled position so it never freezes in place. */}
      {introComplete ? (
        <motion.div
          aria-hidden
          className="absolute inset-0"
          animate={{ x: [0, 0] }}
          transition={{ duration: 0 }}
        />
      ) : null}
    </div>
  );
}

function BrandTypography({ introComplete }: { introComplete: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6">
      <motion.div
        // Single keyframe carrier: drives the mask-image reveal, the distortion
        // blur, the lock-in tracking, and the Scene 5 hero scale-up.
        initial={{ "--reveal": "0%" } as never}
        animate={
          {
            "--reveal": ["0%", "0%", "110%", "110%", "110%", "110%", "110%"],
            scale: [0.92, 0.92, 1.0, 1.012, 1.0, 1.0, 1.06],
            letterSpacing: [
              "0.45em",
              "0.45em",
              "0.45em",
              "0.4em",
              "0.18em",
              "0.18em",
              "0.18em"
            ],
            filter: [
              "blur(0px)",
              "blur(0px)",
              "blur(0px)",
              "blur(2px)",
              "blur(0.4px)",
              "blur(0px)",
              "blur(0px)"
            ]
          } as never
        }
        transition={{ duration: 9.0, times: [...TIMES], ease: EASE }}
        style={{
          maskImage:
            "linear-gradient(to right, black 0%, black calc(var(--reveal) - 8%), transparent var(--reveal), transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, black 0%, black calc(var(--reveal) - 8%), transparent var(--reveal), transparent 100%)"
        } as CSSProperties}
        className="text-center"
      >
        {/* After intro, ambient breathing on opacity + y. Runs forever. */}
        <motion.div
          animate={
            introComplete
              ? { opacity: [0.92, 1, 0.92], y: [-2, 2, -2] }
              : { opacity: 1, y: 0 }
          }
          transition={
            introComplete
              ? {
                  opacity: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                  y: { duration: 10, repeat: Infinity, ease: "easeInOut" }
                }
              : { duration: 0 }
          }
        >
          <h1>
            <span className="sr-only">Wesley Joseph Co.com</span>
            <span
              aria-hidden
              className="flex flex-col items-center gap-2 font-display text-[clamp(2.5rem,11vw,5.5rem)] font-light uppercase leading-[0.95] text-ink md:flex-row md:gap-[0.4em] md:whitespace-nowrap"
            >
              {HEADLINE.map((word) => (
                <span key={word} className="inline-block">
                  {word}
                </span>
              ))}
            </span>
          </h1>
        </motion.div>
      </motion.div>
    </div>
  );
}

function Tagline({ introComplete }: { introComplete: boolean }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
      animate={{ opacity: 0.9, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1.4, delay: 7.0, ease: EASE }}
      className="pointer-events-none absolute bottom-12 left-0 right-0 z-30 px-6 text-center md:bottom-16"
    >
      <motion.span
        className="inline-block font-mono text-[clamp(0.7rem,0.95vw,0.85rem)] uppercase tracking-[0.45em] text-ink-soft"
        animate={introComplete ? { opacity: [0.85, 1, 0.85] } : { opacity: 1 }}
        transition={
          introComplete
            ? { duration: 8, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0 }
        }
      >
        Financial intelligence · Media power · Cultural influence
      </motion.span>
    </motion.p>
  );
}
