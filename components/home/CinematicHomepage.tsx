"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { OrbitHomepage } from "./OrbitHomepage";

// Cinematic intro → orbit homepage:
//   0.0 – 10.0s   Eclipse plays alone, full formation
//   10.0 – 12.0s  Eclipse dissolves; orbital homepage fades in beneath
//   12.0s+        Orbit homepage is live and ambient

const EASE = [0.22, 1, 0.36, 1] as const;
const ECLIPSE_PLAY_MS = 10_000;
const TRANSITION_MS = 2_000;

const EclipseScene = dynamic(
  () => import("@/components/ui/EclipseScene").then((m) => m.EclipseScene),
  { ssr: false, loading: () => null }
);

export function CinematicHomepage() {
  // Phases: "intro" (eclipse playing) → "transition" (eclipse fading out)
  // → "homepage" (editorial homepage interactive)
  const [phase, setPhase] = useState<"intro" | "transition" | "homepage">(
    "intro"
  );

  useEffect(() => {
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

  const eclipseFading = phase !== "intro";
  const homepageVisible = phase !== "intro";

  return (
    <>
      {/* Eclipse intro layer — fixed full-screen overlay */}
      <motion.div
        aria-hidden={phase === "homepage"}
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
          phase === "homepage" ? "pointer-events-none" : ""
        }`}
        style={{
          willChange: "opacity, transform",
          visibility: phase === "homepage" ? "hidden" : "visible"
        }}
      >
        <EclipseScene />
      </motion.div>

      {/* Orbit homepage — underneath, fades in as eclipse dissolves */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: homepageVisible ? 1 : 0 }}
        transition={{
          duration: TRANSITION_MS / 1000,
          delay: 0,
          ease: EASE
        }}
      >
        <OrbitHomepage active={phase === "homepage"} />
      </motion.div>
    </>
  );
}
