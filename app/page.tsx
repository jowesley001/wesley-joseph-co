"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { IntroAnimation } from "@/components/home/IntroAnimation";
import { OrbitalHomepage } from "@/components/home/OrbitalHomepage";
import { INTRO_DURATION_MS, INTRO_STORAGE_KEY } from "@/lib/constants";

type Phase = "loading" | "intro" | "revealed";

export default function HomePage() {
  const [phase, setPhase] = useState<Phase>("loading");

  useEffect(() => {
    let seen = false;
    try {
      seen = window.localStorage.getItem(INTRO_STORAGE_KEY) === "1";
    } catch {
      seen = false;
    }

    if (seen) {
      setPhase("revealed");
      return;
    }

    setPhase("intro");

    const timer = window.setTimeout(() => {
      try {
        window.localStorage.setItem(INTRO_STORAGE_KEY, "1");
      } catch {
        // ignore
      }
      setPhase("revealed");
    }, INTRO_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, []);

  function handleSkip() {
    try {
      window.localStorage.setItem(INTRO_STORAGE_KEY, "1");
    } catch {
      // ignore
    }
    setPhase("revealed");
  }

  return (
    <>
      <OrbitalHomepage revealed={phase === "revealed"} />
      <AnimatePresence>
        {phase === "intro" ? <IntroAnimation key="intro" onSkip={handleSkip} /> : null}
      </AnimatePresence>
    </>
  );
}
