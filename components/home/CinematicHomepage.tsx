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
// Once the Identity State is reached, every layer continues to breathe at
// its own cadence. Nothing should ever go fully static.
//
// To replay during testing: localStorage.removeItem("wjc:intro:v1:seen")

type Props = {
  skipIntro: boolean;
};

const HEADLINE = ["Wesley", "Joseph", "Co."];

export function CinematicHomepage({ skipIntro }: Props) {
  const d = (t: number) => (skipIntro ? 0 : t);
  const dur = (t: number) => (skipIntro ? Math.min(t, 1.2) : t);
  const ambientStart = skipIntro ? 1 : 5.6;

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-bg text-ink">
      {/* Slow-drifting atmospheric gradient — the breath of the room */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          background: [
            "radial-gradient(ellipse 62% 58% at 50% 48%, rgba(255,255,255,0.05), rgba(0,0,0,0) 60%)",
            "radial-gradient(ellipse 68% 62% at 53% 51%, rgba(255,255,255,0.07), rgba(0,0,0,0) 64%)",
            "radial-gradient(ellipse 64% 60% at 47% 50%, rgba(255,255,255,0.06), rgba(0,0,0,0) 62%)",
            "radial-gradient(ellipse 66% 60% at 50% 47%, rgba(255,255,255,0.055), rgba(0,0,0,0) 60%)",
            "radial-gradient(ellipse 62% 58% at 50% 48%, rgba(255,255,255,0.05), rgba(0,0,0,0) 60%)"
          ]
        }}
        transition={{
          opacity: { duration: dur(2.4), delay: d(0.2), ease: [0.22, 1, 0.36, 1] },
          background: { duration: 42, repeat: Infinity, ease: "easeInOut" }
        }}
      />

      {/* Faint floating light leak — occasionally swells from top right */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 35% 35% at 78% 18%, rgba(255,255,255,0.16), transparent 55%)"
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.16, 0.04, 0.18, 0] }}
        transition={{
          duration: 32,
          delay: d(3.4),
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.32, 0.5, 0.68, 1]
        }}
      />

      {/* Lower secondary leak from bottom-left, out of phase with the first */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 38% 32% at 18% 82%, rgba(255,255,255,0.10), transparent 55%)"
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.08, 0.14, 0.05, 0] }}
        transition={{
          duration: 38,
          delay: d(5),
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.3, 0.5, 0.7, 1]
        }}
      />

      {/* Drifting dust particles */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: dur(2), delay: d(0.2), ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-0"
      >
        <MovingParticles count={34} intensity="low" seed={3} />
      </motion.div>

      {/* Animated grain shimmer — film texture in motion */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[55] mix-blend-overlay"
        animate={{ opacity: [0.04, 0.08, 0.05, 0.07, 0.04] }}
        transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="absolute inset-[-2%]"
          animate={{ x: [-2, 2, -1, 2, -2], y: [1, -2, 1, -1, 1] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.92' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.65'/%3E%3C/svg%3E\")"
          }}
        />
      </motion.div>

      {/* Scene parallax wrapper — entire composition drifts subliminally */}
      <motion.div
        className="absolute inset-0"
        animate={{
          x: [0, 1.5, 0, -1.2, 0],
          y: [0, -0.9, 0, 1.1, 0]
        }}
        transition={{
          x: { duration: 46, delay: ambientStart, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 54, delay: ambientStart, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        {/* Typography — sits BEHIND the eclipse */}
        <BrandTypography skipIntro={skipIntro} d={d} dur={dur} ambientStart={ambientStart} />

        {/* Eclipse */}
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
          <Eclipse delay={d(0.8)} skipIntro={skipIntro} />
        </div>
      </motion.div>

      {/* Tagline — quiet, breathing in opacity, last to arrive */}
      <motion.p
        initial={{ opacity: 0, y: 14, letterSpacing: "0.6em" }}
        animate={{
          opacity: skipIntro ? [0.7, 0.92, 0.78, 0.88, 0.7] : 0.85,
          y: 0,
          letterSpacing: "0.45em"
        }}
        transition={{
          opacity: skipIntro
            ? { duration: 16, delay: ambientStart + 1, repeat: Infinity, ease: "easeInOut" }
            : { duration: dur(2), delay: d(5.4), ease: [0.22, 1, 0.36, 1] },
          y: { duration: dur(2), delay: d(5.4), ease: [0.22, 1, 0.36, 1] },
          letterSpacing: { duration: dur(2), delay: d(5.4), ease: [0.22, 1, 0.36, 1] }
        }}
        className="pointer-events-none absolute bottom-12 left-0 right-0 z-30 px-6 text-center font-mono text-[clamp(0.7rem,0.95vw,0.85rem)] uppercase text-ink-soft md:bottom-16"
      >
        <motion.span
          className="inline-block"
          animate={
            skipIntro
              ? { opacity: 1 }
              : { opacity: [1, 1, 0.78, 0.92, 0.78, 0.92, 0.78] }
          }
          transition={{
            duration: 16,
            delay: ambientStart + 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Financial intelligence · Media power · Cultural influence
        </motion.span>
      </motion.p>
    </section>
  );
}

function BrandTypography({
  skipIntro,
  d,
  dur,
  ambientStart
}: {
  skipIntro: boolean;
  d: (t: number) => number;
  dur: (t: number) => number;
  ambientStart: number;
}) {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6">
        {/* Outer wrapper handles the entry reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{
            opacity: { duration: dur(2.2), delay: d(2.4), ease: [0.22, 1, 0.36, 1] },
            scale: { duration: dur(3.2), delay: d(2.4), ease: [0.22, 1, 0.36, 1] },
            filter: { duration: dur(2.6), delay: d(2.4), ease: [0.22, 1, 0.36, 1] }
          }}
          className="text-center"
        >
          {/* Inner wrapper handles continuous ambient breathing — runs
              independently of the entry, lives forever after the reveal lands */}
          <motion.div
            animate={{
              filter: ["blur(0px)", "blur(0.5px)", "blur(0px)", "blur(0.3px)", "blur(0px)"],
              opacity: [1, 0.92, 0.98, 0.9, 1]
            }}
            transition={{
              filter: {
                duration: 14,
                delay: ambientStart,
                repeat: Infinity,
                ease: "easeInOut"
              },
              opacity: {
                duration: 17,
                delay: ambientStart,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            <h1>
              <span className="sr-only">Wesley Joseph Co.</span>
              <motion.span
                aria-hidden
                initial={{ letterSpacing: "0.45em" }}
                animate={{
                  letterSpacing: skipIntro
                    ? ["0.18em", "0.19em", "0.18em", "0.175em", "0.18em"]
                    : "0.18em"
                }}
                transition={
                  skipIntro
                    ? {
                        letterSpacing: {
                          duration: 24,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }
                      }
                    : {
                        letterSpacing: {
                          duration: dur(3.6),
                          delay: d(2.4),
                          ease: [0.22, 1, 0.36, 1]
                        }
                      }
                }
                className="flex flex-col items-center gap-2 font-display text-[clamp(3.5rem,17vw,7.5rem)] font-light uppercase leading-[0.92] tracking-[0.04em] text-ink md:gap-[0.4em] md:tracking-[0.18em] md:flex-row md:whitespace-nowrap"
              >
                {HEADLINE.map((word, i) => (
                  <motion.span
                    key={word}
                    initial={{ y: 28, opacity: 0 }}
                    animate={{
                      y: skipIntro ? [0, -1.5, 0, 1, 0] : 0,
                      opacity: 1
                    }}
                    transition={{
                      y: skipIntro
                        ? {
                            duration: 19 + i * 1.4,
                            delay: ambientStart + i * 0.6,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }
                        : {
                            duration: dur(1.8),
                            delay: d(2.6 + i * 0.18),
                            ease: [0.22, 1, 0.36, 1]
                          },
                      opacity: {
                        duration: dur(1.8),
                        delay: d(2.6 + i * 0.18),
                        ease: [0.22, 1, 0.36, 1]
                      }
                    }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.span>
            </h1>
          </motion.div>
        </motion.div>
      </div>

      {/* Phase 05 — Subtle stretch/sharpen impact (first visit only) */}
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
