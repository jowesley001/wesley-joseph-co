"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MovingParticles } from "@/components/ui/MovingParticles";
import { ventures } from "@/content/ventures";

type Props = {
  active: boolean;
};

const EASE = [0.22, 1, 0.36, 1] as const;

export function OrbitHomepage({ active }: Props) {
  return (
    <div className="relative h-[100svh] w-full overflow-hidden bg-bg text-ink">
      <AmbientField />
      <OrbitalSystem active={active} />
      <AtmosphericLabels active={active} />
      <VentureNodes active={active} />
      <BottomStatement active={active} />
      <BottomStatus active={active} />
    </div>
  );
}

function AmbientField() {
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,255,255,0.07), rgba(0,0,0,0) 65%)",
          backgroundSize: "120% 120%",
          animation: "wjcAmbientGradient 22s ease-in-out infinite"
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 18% 28%, rgba(255,255,255,0.05), rgba(0,0,0,0) 40%)",
          animation: "wjcLeakA 24s ease-in-out infinite"
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 82% 76%, rgba(255,255,255,0.045), rgba(0,0,0,0) 42%)",
          animation: "wjcLeakB 28s ease-in-out infinite"
        }}
      />
      <div className="pointer-events-none absolute inset-0">
        <MovingParticles count={42} intensity="low" seed={5} />
      </div>
    </>
  );
}

function OrbitalSystem({ active }: { active: boolean }) {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, scale: 0.94 }}
      animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
      transition={{ duration: 2.4, ease: EASE }}
      className="pointer-events-none absolute inset-0"
      style={{ perspective: "1400px", perspectiveOrigin: "50% 50%" }}
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Outer orbital ring — slowest */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.045]"
          style={{
            width: "min(140vmin, 1500px)",
            height: "min(140vmin, 1500px)",
            transformStyle: "preserve-3d",
            animation: "wjcOrbitRingA 200s linear infinite"
          }}
        />
        {/* Mid-outer ring */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]"
          style={{
            width: "min(108vmin, 1180px)",
            height: "min(108vmin, 1180px)",
            transformStyle: "preserve-3d",
            animation: "wjcOrbitRingB 150s linear infinite reverse"
          }}
        />
        {/* Mid-inner ring */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.075]"
          style={{
            width: "min(78vmin, 880px)",
            height: "min(78vmin, 880px)",
            transformStyle: "preserve-3d",
            animation: "wjcOrbitRingC 110s linear infinite"
          }}
        />
        {/* Inner ring */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.10]"
          style={{
            width: "min(54vmin, 620px)",
            height: "min(54vmin, 620px)",
            transformStyle: "preserve-3d",
            animation: "wjcOrbitRingD 80s linear infinite reverse"
          }}
        />

        {/* Eclipse core: outer glow + crescent + dark disc */}
        <div className="relative" style={{ width: "min(28vmin, 320px)", height: "min(28vmin, 320px)" }}>
          {/* Soft outer glow halo */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: "260%",
              height: "260%",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 28%, rgba(0,0,0,0) 60%)",
              animation: "wjcGlowPulse 7s ease-in-out infinite",
              filter: "blur(8px)"
            }}
          />
          {/* Crescent edge sweep */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, rgba(255,255,255,0) 0deg, rgba(255,255,255,0.55) 32deg, rgba(255,255,255,0.95) 56deg, rgba(255,255,255,0.55) 80deg, rgba(255,255,255,0) 130deg, rgba(255,255,255,0) 360deg)",
              animation: "wjcCrescentSweep 28s linear infinite",
              filter: "blur(0.6px)"
            }}
          />
          {/* Dark disc — the eclipse body */}
          <div
            className="absolute rounded-full bg-bg"
            style={{
              inset: "6%",
              boxShadow:
                "0 0 80px 8px rgba(0,0,0,0.85) inset, 0 0 60px 4px rgba(255,255,255,0.06)"
            }}
          />
          {/* Subtle inner sheen */}
          <div
            className="absolute rounded-full"
            style={{
              inset: "12%",
              background:
                "radial-gradient(circle at 35% 32%, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0) 55%)"
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

function AtmosphericLabels({ active }: { active: boolean }) {
  const labels = [
    { text: "Media", top: "16%", left: "12%" },
    { text: "Wealth", top: "22%", right: "14%" },
    { text: "Influence", bottom: "30%", left: "50%", translateX: "-50%" }
  ];

  return (
    <>
      {labels.map((l, i) => (
        <motion.span
          key={l.text}
          initial={{ opacity: 0, letterSpacing: "0.6em" }}
          animate={
            active
              ? { opacity: 0.42, letterSpacing: "0.42em" }
              : { opacity: 0, letterSpacing: "0.6em" }
          }
          transition={{ duration: 2.2, delay: 0.4 + i * 0.25, ease: EASE }}
          className="pointer-events-none absolute font-mono text-[10px] uppercase tracking-[0.42em] text-ink-soft md:text-[11px]"
          style={{
            top: l.top,
            left: l.left,
            right: l.right,
            bottom: l.bottom,
            transform: l.translateX ? `translateX(${l.translateX})` : undefined
          }}
        >
          {l.text}
        </motion.span>
      ))}
    </>
  );
}

function VentureNodes({ active }: { active: boolean }) {
  // Three ventures positioned around the orbital system at distinct angles.
  // Each node drifts subtly along its arc to feel alive without being busy.
  const nodes = [
    {
      v: ventures[0], // Lumina Media
      angle: -120,
      radius: 38,
      drift: { x: [-6, 4, -6], y: [-3, 5, -3], duration: 22 }
    },
    {
      v: ventures[1], // Wesley Insider Network
      angle: 30,
      radius: 36,
      drift: { x: [4, -5, 4], y: [3, -4, 3], duration: 26 }
    },
    {
      v: ventures[2], // Wesley Insider
      angle: 150,
      radius: 40,
      drift: { x: [-3, 6, -3], y: [4, -2, 4], duration: 24 }
    }
  ];

  return (
    <>
      {nodes.map((n, i) => {
        const rad = (n.angle * Math.PI) / 180;
        const x = 50 + Math.cos(rad) * n.radius;
        const y = 50 + Math.sin(rad) * n.radius;
        return (
          <motion.div
            key={n.v.id}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={
              active
                ? {
                    opacity: 1,
                    scale: 1,
                    x: n.drift.x,
                    y: n.drift.y
                  }
                : { opacity: 0, scale: 0.92 }
            }
            transition={{
              opacity: { duration: 1.6, delay: 0.8 + i * 0.2, ease: EASE },
              scale: { duration: 1.6, delay: 0.8 + i * 0.2, ease: EASE },
              x: {
                duration: n.drift.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.4 + i * 0.4
              },
              y: {
                duration: n.drift.duration * 1.1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.4 + i * 0.4
              }
            }}
            className="absolute"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: "translate(-50%, -50%)"
            }}
          >
            <VentureNode venture={n.v} />
          </motion.div>
        );
      })}
    </>
  );
}

function VentureNode({ venture }: { venture: (typeof ventures)[number] }) {
  const linkProps = venture.external
    ? { target: "_blank" as const, rel: "noreferrer noopener" }
    : {};

  return (
    <Link
      href={venture.href}
      {...linkProps}
      className="group relative flex flex-col items-center gap-3"
    >
      {/* Pulsing dot anchor */}
      <span className="relative flex h-3 w-3 items-center justify-center">
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full bg-white/20"
          animate={{ scale: [1, 2.4, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeOut" }}
        />
        <span className="relative h-1.5 w-1.5 rounded-full bg-ink shadow-[0_0_12px_rgba(255,255,255,0.5)]" />
      </span>

      <div className="flex flex-col items-center gap-1.5">
        <span className="font-mono text-[9px] uppercase tracking-[0.42em] text-ink-soft transition-colors duration-500 group-hover:text-ink-muted md:text-[10px]">
          {venture.category}
        </span>
        <span className="font-display text-[clamp(1rem,1.4vw,1.4rem)] font-light leading-none text-ink transition-opacity duration-500 group-hover:opacity-80">
          {venture.name}
        </span>
        <span className="mt-2 font-mono text-[9px] uppercase tracking-[0.32em] text-ink-muted opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:text-[10px]">
          Enter →
        </span>
      </div>
    </Link>
  );
}

function BottomStatement({ active }: { active: boolean }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 12 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 1.6, delay: 1.4, ease: EASE }}
      className="absolute bottom-8 left-6 max-w-[20rem] font-display text-[clamp(0.95rem,1.1vw,1.15rem)] font-light leading-snug text-ink-soft md:bottom-12 md:left-12"
    >
      The infrastructure for modern influence.
    </motion.p>
  );
}

function BottomStatus({ active }: { active: boolean }) {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      });
      setTime(formatter.format(now));
    };
    update();
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 1.6, delay: 1.6, ease: EASE }}
      className="absolute bottom-8 right-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.32em] text-ink-soft md:bottom-12 md:right-12 md:text-[11px]"
    >
      <motion.span
        aria-hidden
        className="block h-1.5 w-1.5 rounded-full bg-white"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <span>Online</span>
      <span aria-hidden className="text-ink-faint">
        ·
      </span>
      <span>Multi-state</span>
      <span aria-hidden className="text-ink-faint">
        ·
      </span>
      <span suppressHydrationWarning>{time ? `NY ${time}` : "NY ——:——"}</span>
    </motion.div>
  );
}
