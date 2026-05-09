"use client";

import { useEffect, useState } from "react";
import { CinematicHomepage } from "@/components/home/CinematicHomepage";
import { INTRO_STORAGE_KEY } from "@/lib/constants";

export default function HomePage() {
  // null = pre-hydration (don't render); true = skip; false = full sequence
  const [skipIntro, setSkipIntro] = useState<boolean | null>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = window.localStorage.getItem(INTRO_STORAGE_KEY) === "1";
    } catch {
      seen = false;
    }
    setSkipIntro(seen);

    if (!seen) {
      const timer = window.setTimeout(() => {
        try {
          window.localStorage.setItem(INTRO_STORAGE_KEY, "1");
        } catch {
          // ignore
        }
      }, 6000);
      return () => window.clearTimeout(timer);
    }
  }, []);

  if (skipIntro === null) {
    return <div className="h-[100svh] w-full bg-bg" aria-hidden />;
  }

  return <CinematicHomepage skipIntro={skipIntro} />;
}
