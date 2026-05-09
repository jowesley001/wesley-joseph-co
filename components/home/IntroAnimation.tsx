"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { OrbitalSystem } from "@/components/ui/OrbitalSystem";
import { MovingParticles } from "@/components/ui/MovingParticles";
import { INTRO_DURATION_MS, INTRO_STORAGE_KEY } from "@/lib/constants";

export function IntroAnimation() {
  const [mounted, setMounted] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    setMounted(true);
    let seen = false;
    try {
      seen = window.localStorage.getItem(INTRO_STORAGE_KEY) === "1";
    } catch {
      seen = false;
    }
    if (seen) return;
    setShouldShow(true);
    const timer = window.setTimeout(() => {
      try {
        window.localStorage.setItem(INTRO_STORAGE_KEY, "1");
      } catch {
        // ignore
      }
      setIsExiting(true);
      window.setTimeout(() => setShouldShow(false), 900);
    }, INTRO_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, []);

  function handleSkip() {
    if (isExiting) return;
    try {
      window.localStorage.setItem(INTRO_STORAGE_KEY, "1");
    } catch {
      // ignore
    }
    setIsExiting(true);
    window.setTimeout(() => setShouldShow(false), 900);
  }

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {shouldShow ? (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } }}
          animate={{ opacity: isExiting ? 0 : 1 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] overflow-hidden bg-bg text-ink"
        >
          <MovingParticles count={42} intensity="med" seed={2} />

          <motion.div
            aria-hidden
            className="absolute inset-0"
            animate={{
              background: [
                "radial-gradient(circle at 50% 45%, rgba(255,255,255,0.10), transparent 35%)",
                "radial-gradient(circle at 52% 48%, rgba(255,255,255,0.14), transparent 38%)",
                "radial-gradient(circle at 50% 45%, rgba(255,255,255,0.10), transparent 35%)"
              ]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            initial={{ scale: 0.18, opacity: 0, rotateX: 58, rotateZ: -20 }}
            animate={{
              scale: [0.18, 1, 1.06],
              opacity: [0, 1, 1],
              rotateX: [58, 62, 58],
              rotateZ: [-20, 0, 26]
            }}
            transition={{ duration: 3.1, ease: [0.65, 0, 0.35, 1] }}
            className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 md:h-[520px] md:w-[520px]"
          >
            <OrbitalSystem showLabels={false} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, filter: "blur(10px)", letterSpacing: "0.6em" }}
            animate={{
              opacity: [0, 1, 1],
              filter: ["blur(10px)", "blur(0px)", "blur(0px)"],
              letterSpacing: ["0.6em", "0.45em", "0.45em"]
            }}
            transition={{ duration: 2.6, delay: 0.65 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 font-mono text-[12px] uppercase text-ink"
          >
            Wesley Joseph Co.
          </motion.p>

          <button
            type="button"
            onClick={handleSkip}
            aria-label="Skip intro"
            className="absolute bottom-10 right-8 font-mono text-[11px] uppercase tracking-[0.32em] text-ink-subtle transition-colors duration-500 hover:text-ink"
          >
            Skip
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
