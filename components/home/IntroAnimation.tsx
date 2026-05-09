"use client";

import { motion } from "framer-motion";
import { MovingParticles } from "@/components/ui/MovingParticles";

type Props = {
  onSkip: () => void;
};

// Eclipse welcome sequence. The orbital sphere underneath shows through
// the transparent area, so the orb appears to bridge intro and homepage
// without a hard cut. To replay during testing:
//   localStorage.removeItem("wjc:intro:v1:seen")

const STATUS_WORDS = ["Media", "Wealth", "Influence"];

export function IntroAnimation({ onSkip }: Props) {
  return (
    <motion.div
      key="intro"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] } }}
      className="pointer-events-auto fixed inset-0 z-[100] overflow-hidden"
    >
      {/* Atmospheric particles — drift in slowly so the screen reads black at first */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <MovingParticles count={48} intensity="med" seed={2} />
      </motion.div>

      {/* Soft radial highlight that breathes behind the eclipse */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          background: [
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08), transparent 38%)",
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.12), transparent 42%)",
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08), transparent 38%)"
          ]
        }}
        transition={{
          opacity: { duration: 2, delay: 0.4, ease: [0.22, 1, 0.36, 1] },
          background: { duration: 6.4, repeat: Infinity, ease: "easeInOut" }
        }}
      />

      {/* WESLEY JOSEPH CO. — main identity */}
      <motion.h1
        initial={{ opacity: 0, y: 18, filter: "blur(14px)", letterSpacing: "0.55em" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)", letterSpacing: "0.28em" }}
        transition={{ duration: 1.7, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 top-[66%] w-[88vw] max-w-[640px] -translate-x-1/2 text-center font-mono text-[clamp(0.95rem,2.6vw,1.85rem)] uppercase text-ink md:tracking-[0.32em]"
      >
        Wesley Joseph Co.
      </motion.h1>

      {/* ENTER THE SYSTEM — welcome line */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 0.95, y: 0 }}
        transition={{ duration: 1.4, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 top-[74%] w-[88vw] -translate-x-1/2 text-center font-mono text-[clamp(0.7rem,0.95vw,0.85rem)] uppercase tracking-[0.32em] text-ink-soft md:tracking-[0.5em]"
      >
        Enter the System
      </motion.p>

      {/* MEDIA · WEALTH · INFLUENCE — status line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 2.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-12 left-1/2 flex -translate-x-1/2 items-center gap-4 whitespace-nowrap font-mono text-[clamp(0.7rem,0.9vw,0.78rem)] uppercase tracking-[0.4em] text-ink-soft md:bottom-14"
      >
        {STATUS_WORDS.map((word, i) => (
          <span key={word} className="flex items-center gap-4">
            <motion.span
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{
                duration: 3.4,
                delay: i * 0.6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {word}
            </motion.span>
            {i < STATUS_WORDS.length - 1 ? (
              <span aria-hidden className="opacity-40">/</span>
            ) : null}
          </span>
        ))}
      </motion.div>

      <motion.button
        type="button"
        onClick={onSkip}
        aria-label="Skip intro"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 1.2, delay: 1.6 }}
        className="absolute bottom-10 right-6 font-mono text-[11px] uppercase tracking-[0.32em] text-ink-soft transition-colors duration-500 hover:text-ink md:bottom-12 md:right-12"
      >
        Skip
      </motion.button>
    </motion.div>
  );
}
