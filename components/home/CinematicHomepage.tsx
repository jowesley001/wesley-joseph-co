"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState, type CSSProperties } from "react";
import { MovingParticles } from "@/components/ui/MovingParticles";

// Cinematic sequence:
//
//   0.0 – 4.0s   The eclipse plays full-screen (Spline scene runs its
//                own animation: moon drifts in front of the sun).
//   4.0 – 5.6s   "WESLEY JOSEPH CO.COM" slowly appears (mask reveal +
//                blur sharpen + letter-spacing tighten).
//   5.6 – 7.4s   Eclipse shrinks and moves toward the second "O"
//                (the O in "CO" of CO.COM). Brand mark grows to hero.
//   7.4s+        Eclipse settles as a small breathing detail inside
//                the O of CO; tagline + header arrive last.

const HEADLINE = ["Wesley", "Joseph", "Co.com"];

// Times normalized to a 9.0s timeline:
//   0.0s  → 0       eclipse playing alone
//   4.0s  → 0.444   text reveal begins
//   5.6s  → 0.622   text fully revealed
//   7.4s  → 0.822   eclipse settled inside the O
//   9.0s  → 1       homepage active
const TIMES = [0, 0.444, 0.555, 0.622, 0.756, 0.822, 1] as const;
const EASE = [0.22, 1, 0.36, 1] as const;

const EclipseScene = dynamic(
  () => import("@/components/ui/EclipseScene").then((m) => m.EclipseScene),
  { ssr: false, loading: () => null }
);

export function CinematicHomepage() {
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setIntroComplete(true), 9000);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-bg text-ink">
      {/* Spline eclipse — full-screen at first, then shrinks into the second O */}
      <motion.div
        initial={{ scale: 1, x: 0, y: 0 }}
        animate={{
          // 0-4.0s:   full-screen
          // 4.0-5.6s: still full-screen (text revealing on top)
          // 5.6-7.4s: shrink + translate to land inside the "O" of CO
          // 7.4-9.0s: settle, hold position
          // The translateX target is roughly the second O's center on a
          // wide viewport. On mobile it lands above the stacked text.
          scale: [1, 1, 1, 0.075, 0.075, 0.075],
          x: [0, 0, 0, 320, 320, 320],
          y: [0, 0, 0, -8, -8, -8]
        }}
        transition={{
          duration: 9.0,
          times: [0, 0.444, 0.622, 0.822, 0.91, 1],
          ease: EASE
        }}
        style={{ transformOrigin: "center", willChange: "transform" }}
        className="absolute inset-0 z-0"
      >
        <EclipseScene />
      </motion.div>

      {/* HTML particles supplement */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.4, ease: EASE }}
        className="pointer-events-none absolute inset-0 z-[1]"
      >
        <MovingParticles count={18} intensity="low" seed={3} />
      </motion.div>

      {/* Brand mark — reveals only after the eclipse plays */}
      <BrandTypography introComplete={introComplete} />

      {/* Tagline emerges last */}
      <motion.p
        initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
        animate={{ opacity: 0.9, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.2, delay: 7.4, ease: EASE }}
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

    </section>
  );
}

function BrandTypography({ introComplete }: { introComplete: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6">
      <motion.div
        initial={{ "--reveal": "0%" } as never}
        animate={
          {
            // Mask reveal during 4.0–5.6s
            "--reveal": ["0%", "0%", "0%", "110%", "110%", "110%", "110%"],
            // Scale: stays small while eclipse plays, grows to hero in 5.6–7.4s
            scale: [0.9, 0.9, 0.92, 0.96, 1.0, 1.06, 1.06],
            // Letter spacing: starts wide, tightens at lock-in
            letterSpacing: [
              "0.45em",
              "0.45em",
              "0.45em",
              "0.32em",
              "0.18em",
              "0.18em",
              "0.18em"
            ],
            // Blur sharpens during reveal, holds clear after
            filter: [
              "blur(0px)",
              "blur(0px)",
              "blur(14px)",
              "blur(2px)",
              "blur(0px)",
              "blur(0px)",
              "blur(0px)"
            ],
            // Opacity: hidden until reveal, then full
            opacity: [0, 0, 0, 1, 1, 1, 1]
          } as never
        }
        transition={{ duration: 9.0, times: [...TIMES], ease: EASE }}
        style={
          {
            maskImage:
              "linear-gradient(to right, black 0%, black calc(var(--reveal) - 8%), transparent var(--reveal), transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, black 0%, black calc(var(--reveal) - 8%), transparent var(--reveal), transparent 100%)"
          } as CSSProperties
        }
        className="text-center"
      >
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
              style={{ textShadow: "0 0 40px rgba(255,255,255,0.18)" }}
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
