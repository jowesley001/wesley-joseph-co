"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { INTRO_STORAGE_KEY } from "@/lib/constants";
import { OrbitHomepage } from "./OrbitHomepage";

// Cinematic intro → orbit homepage:
//   0.0 – 10.0s   Eclipse plays alone, full formation
//   10.0 – 12.0s  Eclipse dissolves; orbital homepage fades in beneath
//   12.0s+        Orbit homepage is live and ambient

const EASE = [0.22, 1, 0.36, 1] as const;
const ECLIPSE_PLAY_MS = 10_000;
const TRANSITION_MS = 2_000;
type Phase = "checking" | "intro" | "transition" | "homepage";

function hasSeenIntro() {
  try {
    return window.sessionStorage.getItem(INTRO_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function markIntroSeen() {
  try {
    window.sessionStorage.setItem(INTRO_STORAGE_KEY, "true");
  } catch {
    // If storage is unavailable, keep the page usable and fall back to replaying.
  }
}

const EclipseScene = dynamic(
  () => import("@/components/ui/EclipseScene").then((m) => m.EclipseScene),
  { ssr: false, loading: () => null }
);

export function CinematicHomepage() {
  // Phases: "intro" (eclipse playing) → "transition" (eclipse fading out)
  // → "homepage" (editorial homepage interactive)
  const [phase, setPhase] = useState<Phase>("checking");

  useEffect(() => {
    if (hasSeenIntro()) {
      setPhase("homepage");
      return;
    }

    // To replay the intro during testing:
    // sessionStorage.removeItem("wj:intro-seen")
    markIntroSeen();
    setPhase("intro");

    const t1 = window.setTimeout(() => setPhase("transition"), ECLIPSE_PLAY_MS);
    const t2 = window.setTimeout(
      () => setPhase("homepage"),
      ECLIPSE_PLAY_MS + TRANSITION_MS
    );
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  // Orbit homepage is a single fullscreen environment; lock scroll throughout.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const eclipseFading = phase === "transition";
  const homepageVisible = phase !== "intro";
  const homepageActive = phase === "homepage";

  if (phase === "checking") {
    return <div className="h-[100svh] bg-bg" aria-hidden />;
  }

  return (
    <>
      {/* Eclipse intro layer — fixed full-screen overlay. Once we enter
          the homepage phase the Spline canvas is fully unmounted so its
          render loop stops painting on top of the orbit composition. */}
      {phase === "intro" || phase === "transition" ? (
        <motion.div
          aria-hidden={phase !== "intro"}
          initial={{ opacity: 1, scale: 1 }}
          animate={{
            opacity: eclipseFading ? 0 : 1,
            scale: eclipseFading ? 1.08 : 1
          }}
          transition={{
            duration: TRANSITION_MS / 1000,
            ease: EASE
          }}
          className={`fixed inset-0 z-40 ${
            phase !== "intro" ? "pointer-events-none" : ""
          }`}
          style={{ willChange: "opacity, transform" }}
        >
          <EclipseScene />
        </motion.div>
      ) : null}

      {/* Orbit homepage — underneath, fades in as eclipse dissolves */}
      <motion.div
        initial={{ opacity: phase === "homepage" ? 1 : 0 }}
        animate={{ opacity: homepageVisible ? 1 : 0 }}
        transition={{
          duration: TRANSITION_MS / 1000,
          delay: 0,
          ease: EASE
        }}
      >
        <OrbitHomepage active={homepageActive} />
      </motion.div>
    </>
  );
}
