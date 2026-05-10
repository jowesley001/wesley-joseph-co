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

// The orbital ring system is anchored slightly right of viewport center
// so the big editorial headline on the left can breathe. The eclipse is
// then offset *within* the rings into the lower-right quadrant — it
// sits inside the orbital field rather than at its mathematical center,
// matching the planetary-diagram composition of the reference.
const ORBIT_ANCHOR = { left: "54%", top: "50%" } as const;
// Eclipse offset from the ring-system center, expressed in vmin so it
// scales uniformly with the rings.
const ECLIPSE_OFFSET = { x: 14, y: 12 } as const;

export function OrbitHomepage({ active }: Props) {
  return (
    <div className="relative h-[100svh] w-full overflow-hidden bg-bg text-ink">
      <AmbientField />
      <OrbitalSystem active={active} />
      <Headline active={active} />
      <BottomStatus active={active} />
    </div>
  );
}

function AmbientField() {
  // The ambient halo is centered on the orbit anchor so the rings catch
  // even illumination on every side rather than glowing only where the
  // light leak hits.
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 54% 50%, rgba(255,255,255,0.08), rgba(0,0,0,0) 65%)",
          backgroundSize: "120% 120%",
          animation: "wjcAmbientGradient 24s ease-in-out infinite"
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 54% 50%, rgba(255,255,255,0.04), rgba(0,0,0,0) 55%)"
        }}
      />
      <div className="pointer-events-none absolute inset-0">
        <MovingParticles count={36} intensity="low" seed={5} />
      </div>
    </>
  );
}

// Ring sizes are expressed in vmin so the system scales uniformly.
// Opacities step up slightly toward the inner rings so the eclipse
// reads as the gravitational anchor of the system.
const RINGS = [
  { size: 92, opacity: 0.32, duration: 260, reverse: false },
  { size: 76, opacity: 0.38, duration: 220, reverse: true },
  { size: 60, opacity: 0.44, duration: 180, reverse: false },
  { size: 44, opacity: 0.50, duration: 140, reverse: true }
];

// Static "satellite" dots placed at specific angles and rings.
// Angles are in degrees: 0 = right (3 o'clock), 90 = bottom, 180 = left,
// 270 = top. Satellites avoid the venture node positions to keep the
// orbital triangle clean.
const SATELLITES = [
  { ring: 92, angle: 205, size: 3 },
  { ring: 76, angle: 332, size: 4 },
  { ring: 60, angle: 158, size: 3 },
  { ring: 60, angle: 220, size: 2 },
  { ring: 44, angle: 295, size: 3 },
  { ring: 44, angle: 165, size: 2 }
];

function OrbitalSystem({ active }: { active: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
      transition={{ duration: 2.4, ease: EASE }}
      className="pointer-events-none absolute inset-0"
    >
      <div
        className="absolute"
        style={{
          left: ORBIT_ANCHOR.left,
          top: ORBIT_ANCHOR.top,
          transform: "translate(-50%, -50%)"
        }}
      >
        <Rings />
        <Satellites />
        <AtmosphericLabels />
        <EclipseCore />
        <VentureNodes />
      </div>
    </motion.div>
  );
}

function Rings() {
  // Each ring has its rotation animation on the inner element so the
  // outer wrapper can own the centering translate. Putting both the
  // rotate animation and the centering translate on the same element
  // would cause one to overwrite the other.
  return (
    <>
      {RINGS.map((r, i) => {
        const keyframe = ["wjcOrbitRingA", "wjcOrbitRingB", "wjcOrbitRingC", "wjcOrbitRingD"][i % 4];
        return (
          <div
            key={i}
            className="absolute left-1/2 top-1/2"
            style={{
              width: `${r.size}vmin`,
              height: `${r.size}vmin`,
              transform: "translate(-50%, -50%)"
            }}
          >
            <div
              className="h-full w-full rounded-full"
              style={{
                border: `1px solid rgba(255, 255, 255, ${r.opacity})`,
                animation: `${keyframe} ${r.duration}s linear infinite${r.reverse ? " reverse" : ""}`
              }}
            />
          </div>
        );
      })}
    </>
  );
}

function Satellites() {
  return (
    <>
      {SATELLITES.map((s, i) => {
        const rad = (s.angle * Math.PI) / 180;
        const dx = ((Math.cos(rad) * s.ring) / 2).toFixed(3);
        const dy = ((Math.sin(rad) * s.ring) / 2).toFixed(3);
        return (
          <motion.span
            key={i}
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.35, 0.85, 0.35] }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
            className="absolute left-1/2 top-1/2 rounded-full bg-white"
            style={{
              width: s.size,
              height: s.size,
              transform: `translate(-50%, -50%) translate(${dx}vmin, ${dy}vmin)`,
              boxShadow: "0 0 8px rgba(255,255,255,0.45)"
            }}
          />
        );
      })}
    </>
  );
}

function EclipseCore() {
  // The eclipse reads as a dark sphere with a bright sun rim on the
  // right — light source fixed at 2 o'clock, gentle breathing on the
  // outer halo, no rotation so the composition stays anchored. It sits
  // offset from the ring-system center into the lower-right quadrant,
  // matching the planetary-diagram composition of the reference.
  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        width: "24vmin",
        height: "24vmin",
        transform: `translate(-50%, -50%) translate(${ECLIPSE_OFFSET.x}vmin, ${ECLIPSE_OFFSET.y}vmin)`
      }}
    >
      {/* Wide soft halo — gives the eclipse a gravitational presence */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 rounded-full"
        style={{
          width: "260%",
          height: "260%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 32%, rgba(0,0,0,0) 60%)",
          animation: "wjcGlowPulse 7s ease-in-out infinite",
          filter: "blur(10px)"
        }}
      />
      {/* Bright rim — fixed on the right side, like a sun behind the moon.
          A second blurred copy adds the soft outer corona. */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 60deg, rgba(255,255,255,0) 0deg, rgba(255,255,255,0.85) 18deg, rgba(255,255,255,1) 30deg, rgba(255,255,255,0.85) 42deg, rgba(255,255,255,0) 70deg, rgba(255,255,255,0) 360deg)"
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 50deg, rgba(255,255,255,0) 0deg, rgba(255,255,255,0.4) 24deg, rgba(255,255,255,0.65) 40deg, rgba(255,255,255,0.4) 56deg, rgba(255,255,255,0) 90deg, rgba(255,255,255,0) 360deg)",
          filter: "blur(6px)",
          transform: "scale(1.08)"
        }}
      />
      {/* Dark sphere body — the moon disc */}
      <div
        aria-hidden
        className="absolute rounded-full"
        style={{
          inset: "4%",
          background:
            "radial-gradient(circle at 35% 30%, #1a1a1a 0%, #0a0a0a 45%, #000 75%)",
          boxShadow:
            "0 0 60px 4px rgba(0,0,0,0.9) inset, 0 12px 60px 8px rgba(0,0,0,0.8)"
        }}
      />
      {/* Subtle highlight on the upper-left of the disc — makes it read
          as a 3D sphere rather than a flat circle */}
      <div
        aria-hidden
        className="absolute rounded-full"
        style={{
          inset: "8%",
          background:
            "radial-gradient(circle at 30% 28%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 25%, rgba(0,0,0,0) 55%)"
        }}
      />
    </div>
  );
}

function VentureNodes() {
  // Three ventures ride the orbital rings at angular positions that
  // mirror the reference layout. Angles are around the *ring-system*
  // center (not the eclipse) so the venture triangle continues to read
  // as the orbital perimeter even though the eclipse is offset.
  //   01 LUMINA MEDIA            → 258° (top, slightly left of vertical)
  //   02 WESLEY INSIDER NETWORK  → 340° (upper-right, above eclipse)
  //   03 WESLEY INSIDER          → 100° (bottom, slightly right of vertical)
  const nodes = [
    {
      v: ventures[0], // Lumina Media
      angle: 258,
      ring: 76,
      labelPlacement: "below" as const
    },
    {
      v: ventures[1], // Wesley Insider Network
      angle: 340,
      ring: 60,
      labelPlacement: "right" as const
    },
    {
      v: ventures[2], // Wesley Insider
      angle: 100,
      ring: 76,
      labelPlacement: "below" as const
    }
  ];

  return (
    <>
      {nodes.map((n, i) => {
        const rad = (n.angle * Math.PI) / 180;
        const dx = ((Math.cos(rad) * n.ring) / 2).toFixed(3);
        const dy = ((Math.sin(rad) * n.ring) / 2).toFixed(3);
        const number = String(i + 1).padStart(2, "0");
        return (
          <div
            key={n.v.id}
            className="pointer-events-auto absolute left-1/2 top-1/2"
            style={{
              transform: `translate(-50%, -50%) translate(${dx}vmin, ${dy}vmin)`
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.8 + i * 0.18, ease: EASE }}
            >
              <VentureNode
                venture={n.v}
                number={number}
                placement={n.labelPlacement}
              />
            </motion.div>
          </div>
        );
      })}
    </>
  );
}

function VentureNode({
  venture,
  number,
  placement
}: {
  venture: (typeof ventures)[number];
  number: string;
  placement: "below" | "right";
}) {
  const linkProps = venture.external
    ? { target: "_blank" as const, rel: "noreferrer noopener" }
    : {};

  const layout =
    placement === "below"
      ? "flex-col items-center text-center gap-3"
      : "flex-row items-center gap-4";
  const labelLayout = placement === "below" ? "text-center" : "text-left";

  return (
    <Link
      href={venture.href}
      {...linkProps}
      className={`group flex ${layout}`}
    >
      {/* Pulsing dot anchor */}
      <span className="relative flex h-3 w-3 shrink-0 items-center justify-center">
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full bg-white/15"
          animate={{ scale: [1, 2.4, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeOut" }}
        />
        <span className="relative h-1.5 w-1.5 rounded-full bg-ink shadow-[0_0_10px_rgba(255,255,255,0.55)]" />
      </span>

      <span className={`flex flex-col gap-1 ${labelLayout}`}>
        <span className="font-mono text-[10px] uppercase tracking-[0.42em] text-ink-soft md:text-[11px]">
          {number}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-ink leading-tight transition-colors duration-500 group-hover:text-ink-soft md:text-[13px]">
          {venture.name}
        </span>
      </span>
    </Link>
  );
}

function AtmosphericLabels() {
  // Three soft labels sit on the outer perimeter, between the venture
  // nodes. They float at a wider radius than the ventures so they read
  // as ambient atmosphere rather than primary navigation.
  //   MEDIA     → 315° (upper-right, between Lumina-top and WIN-right)
  //   WEALTH    → 195° (left side of orbit)
  //   INFLUENCE →  35° (lower-right, between WIN and Insider — pulled
  //               up slightly so it sits above the status footer)
  const RING = 100;
  const labels = [
    { text: "Media", angle: 315, ring: 100 },
    { text: "Wealth", angle: 195, ring: 100 },
    { text: "Influence", angle: 35, ring: 86 }
  ];

  return (
    <>
      {labels.map((l, i) => {
        const rad = (l.angle * Math.PI) / 180;
        const r = l.ring ?? RING;
        const dx = ((Math.cos(rad) * r) / 2).toFixed(3);
        const dy = ((Math.sin(rad) * r) / 2).toFixed(3);
        return (
          <motion.span
            key={l.text}
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            animate={{ opacity: 0.45, letterSpacing: "0.42em" }}
            transition={{ duration: 2.0, delay: 0.6 + i * 0.2, ease: EASE }}
            className="absolute left-1/2 top-1/2 font-mono text-[10px] uppercase tracking-[0.42em] text-ink-soft md:text-[11px]"
            style={{
              transform: `translate(-50%, -50%) translate(${dx}vmin, ${dy}vmin)`
            }}
          >
            {l.text}
          </motion.span>
        );
      })}
    </>
  );
}

function Headline({ active }: { active: boolean }) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
      animate={
        active
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: 16, filter: "blur(8px)" }
      }
      transition={{ duration: 1.8, delay: 0.4, ease: EASE }}
      className="absolute bottom-12 left-6 z-10 max-w-[26rem] font-display text-[clamp(2.5rem,5vw,5.25rem)] font-light leading-[0.98] text-ink md:bottom-16 md:left-12 md:max-w-[32rem]"
    >
      The infrastructure for modern influence.
    </motion.h1>
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
        second: "2-digit",
        hour12: false
      });
      setTime(formatter.format(now));
    };
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      transition={{ duration: 1.4, delay: 1.0, ease: EASE }}
      className="absolute bottom-8 right-6 z-10 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.32em] text-ink-soft md:bottom-12 md:right-12 md:text-[11px]"
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
      <span suppressHydrationWarning>{time || "——:——:——"}</span>
    </motion.div>
  );
}
