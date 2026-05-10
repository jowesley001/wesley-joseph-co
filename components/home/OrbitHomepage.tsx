"use client";

import Link from "next/link";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
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
  // Pointer-driven parallax — gentle multi-layer drift on mouse move.
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      px.set(x);
      py.set(y);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py]);

  return (
    <div className="relative h-[100svh] w-full overflow-hidden bg-bg text-ink">
      <StarField px={px} py={py} />
      <AmbientField />
      <OrbitalSystem active={active} />
      <Headline active={active} />
      <BottomStatus active={active} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Ambient field — soft halo gradients centered on the orbit anchor.           */
/* -------------------------------------------------------------------------- */

function AmbientField() {
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 54% 50%, rgba(255,255,255,0.09), rgba(0,0,0,0) 65%)",
          backgroundSize: "120% 120%",
          animation: "wjcAmbientGradient 24s ease-in-out infinite"
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 54% 50%, rgba(255,255,255,0.05), rgba(0,0,0,0) 55%)"
        }}
      />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Star field — three depth layers with parallax + a few bright stars.         */
/* -------------------------------------------------------------------------- */

type Star = {
  id: number;
  x: number; // %
  y: number; // %
  size: number;
  opacity: number;
  driftX: number;
  driftY: number;
  duration: number;
  delay: number;
};

function makeStars(count: number, seed: number, opts: {
  sizeMin: number;
  sizeMax: number;
  opacityMin: number;
  opacityMax: number;
  driftMin: number;
  driftMax: number;
  durMin: number;
  durMax: number;
}): Star[] {
  // Deterministic seeded PRNG so SSR + client agree.
  return Array.from({ length: count }, (_, i) => {
    const s = (i + 1) * 13 * seed;
    const r = (n: number) => {
      const x = Math.sin(s * n) * 10000;
      return x - Math.floor(x);
    };
    return {
      id: i,
      x: r(2.1) * 100,
      y: r(3.7) * 100,
      size:
        opts.sizeMin + r(7.3) * (opts.sizeMax - opts.sizeMin),
      opacity:
        opts.opacityMin + r(11.1) * (opts.opacityMax - opts.opacityMin),
      driftX: (r(13.3) * 2 - 1) * opts.driftMax + opts.driftMin,
      driftY: (r(17.7) * 2 - 1) * opts.driftMax + opts.driftMin,
      duration: opts.durMin + r(19.3) * (opts.durMax - opts.durMin),
      delay: r(23.5) * 8
    };
  });
}

function StarField({
  px,
  py
}: {
  px: ReturnType<typeof useMotionValue<number>>;
  py: ReturnType<typeof useMotionValue<number>>;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Three depth layers — far / mid / near. Far moves least with parallax.
  const farStars = useMemo(
    () =>
      makeStars(110, 7, {
        sizeMin: 0.6,
        sizeMax: 1.4,
        opacityMin: 0.18,
        opacityMax: 0.45,
        driftMin: 0,
        driftMax: 6,
        durMin: 22,
        durMax: 38
      }),
    []
  );
  const midStars = useMemo(
    () =>
      makeStars(48, 11, {
        sizeMin: 1.0,
        sizeMax: 1.8,
        opacityMin: 0.32,
        opacityMax: 0.6,
        driftMin: 0,
        driftMax: 12,
        durMin: 18,
        durMax: 30
      }),
    []
  );
  const nearStars = useMemo(
    () =>
      makeStars(20, 19, {
        sizeMin: 1.4,
        sizeMax: 2.4,
        opacityMin: 0.48,
        opacityMax: 0.85,
        driftMin: 0,
        driftMax: 22,
        durMin: 14,
        durMax: 24
      }),
    []
  );

  // A handful of bright "lighthouse" stars that twinkle — anchored at
  // chosen positions so the composition has consistent focal points.
  const brightStars = useMemo(
    () => [
      { x: 8, y: 14, size: 2.6 },
      { x: 22, y: 78, size: 3.0 },
      { x: 36, y: 36, size: 2.4 },
      { x: 76, y: 18, size: 2.8 },
      { x: 92, y: 64, size: 3.2 },
      { x: 64, y: 88, size: 2.4 },
      { x: 14, y: 52, size: 2.6 }
    ],
    []
  );

  // Parallax transforms — far drifts least, near drifts most.
  const farX = useTransform(px, (v) => v * -4);
  const farY = useTransform(py, (v) => v * -4);
  const midX = useTransform(px, (v) => v * -10);
  const midY = useTransform(py, (v) => v * -10);
  const nearX = useTransform(px, (v) => v * -22);
  const nearY = useTransform(py, (v) => v * -22);

  if (!mounted) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <motion.div className="absolute inset-0" style={{ x: farX, y: farY }}>
        {farStars.map((s) => (
          <StarDot key={s.id} star={s} />
        ))}
      </motion.div>
      <motion.div className="absolute inset-0" style={{ x: midX, y: midY }}>
        {midStars.map((s) => (
          <StarDot key={s.id} star={s} />
        ))}
      </motion.div>
      <motion.div className="absolute inset-0" style={{ x: nearX, y: nearY }}>
        {nearStars.map((s) => (
          <StarDot key={s.id} star={s} glow />
        ))}
        {brightStars.map((s, i) => (
          <BrightStar key={`b-${i}`} {...s} delay={i * 0.6} />
        ))}
      </motion.div>
    </div>
  );
}

function StarDot({ star, glow = false }: { star: Star; glow?: boolean }) {
  return (
    <motion.span
      className="absolute rounded-full bg-white"
      style={{
        left: `${star.x}%`,
        top: `${star.y}%`,
        width: star.size,
        height: star.size,
        opacity: star.opacity,
        boxShadow: glow ? "0 0 6px rgba(255,255,255,0.4)" : undefined
      }}
      animate={{
        x: [-star.driftX, star.driftX, -star.driftX],
        y: [-star.driftY, star.driftY, -star.driftY],
        opacity: [
          star.opacity,
          star.opacity * 0.4,
          star.opacity
        ]
      }}
      transition={{
        duration: star.duration,
        delay: star.delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}

function BrightStar({
  x,
  y,
  size,
  delay
}: {
  x: number;
  y: number;
  size: number;
  delay: number;
}) {
  return (
    <motion.span
      className="absolute rounded-full bg-white"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        boxShadow:
          "0 0 12px rgba(255,255,255,0.85), 0 0 24px rgba(255,255,255,0.35)"
      }}
      initial={{ opacity: 0.7 }}
      animate={{ opacity: [0.55, 1, 0.55], scale: [1, 1.15, 1] }}
      transition={{
        duration: 5.2,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Orbital system — rings, satellites, eclipse, ventures, labels.              */
/* -------------------------------------------------------------------------- */

// Ring sizes are expressed in vmin so the system scales uniformly.
// Durations are tuned so rotation is visible within the first 5s without
// feeling fast: outer slow CW, second-out slower CCW, inner subtle.
const RINGS = [
  {
    size: 92,
    opacity: 0.34,
    duration: 90,
    reverse: false, // CW
    satellites: [
      { angle: 18, size: 2.4 },
      { angle: 152, size: 1.8 },
      { angle: 244, size: 2.2 }
    ]
  },
  {
    size: 76,
    opacity: 0.40,
    duration: 130,
    reverse: true, // CCW
    satellites: [
      { angle: 78, size: 3.2 },
      { angle: 208, size: 2.0 }
    ]
  },
  {
    size: 60,
    opacity: 0.46,
    duration: 75,
    reverse: false, // CW
    satellites: [
      { angle: 50, size: 2.4 },
      { angle: 220, size: 1.8 },
      { angle: 312, size: 2.0 }
    ]
  },
  {
    size: 44,
    opacity: 0.52,
    duration: 60,
    reverse: true, // CCW
    satellites: [
      { angle: 130, size: 2.0 },
      { angle: 296, size: 2.6 }
    ]
  }
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
        <AtmosphericLabels />
        <EclipseCore />
        <VentureNodes />
      </div>
    </motion.div>
  );
}

function Rings() {
  // Each ring is a circle that rotates as a single rigid body — its
  // satellites are positioned on the ring's perimeter and ride along
  // with it. Rotating a perfect circle alone is invisible; the dots
  // give the rotation something the eye can track.
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
              className="relative h-full w-full rounded-full"
              style={{
                border: `1px solid rgba(255, 255, 255, ${r.opacity})`,
                animation: `${keyframe} ${r.duration}s linear infinite${r.reverse ? " reverse" : ""}`
              }}
            >
              {r.satellites.map((s, si) => {
                const rad = (s.angle * Math.PI) / 180;
                const cx = 50 + Math.cos(rad) * 50;
                const cy = 50 + Math.sin(rad) * 50;
                return (
                  <span
                    key={si}
                    aria-hidden
                    className="absolute rounded-full bg-white"
                    style={{
                      left: `${cx}%`,
                      top: `${cy}%`,
                      width: s.size,
                      height: s.size,
                      transform: "translate(-50%, -50%)",
                      boxShadow:
                        "0 0 6px rgba(255,255,255,0.65), 0 0 12px rgba(255,255,255,0.25)"
                    }}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}

function EclipseCore() {
  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        width: "24vmin",
        height: "24vmin",
        transform: `translate(-50%, -50%) translate(${ECLIPSE_OFFSET.x}vmin, ${ECLIPSE_OFFSET.y}vmin)`
      }}
    >
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 rounded-full"
        style={{
          width: "260%",
          height: "260%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.07) 32%, rgba(0,0,0,0) 60%)",
          animation: "wjcGlowPulse 7s ease-in-out infinite",
          filter: "blur(10px)"
        }}
      />
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
  // Three ventures ride the orbital rings and drift gently along the
  // tangent of their orbit so they feel alive without leaving position.
  //   01 LUMINA MEDIA            → 258° (top, slightly left of vertical)
  //   02 WESLEY INSIDER NETWORK  → 340° (upper-right, above eclipse)
  //   03 WESLEY INSIDER          → 100° (bottom, slightly right of vertical)
  const nodes = [
    {
      v: ventures[0],
      angle: 258,
      ring: 76,
      labelPlacement: "below" as const,
      driftPx: 12,
      driftDuration: 32
    },
    {
      v: ventures[1],
      angle: 340,
      ring: 60,
      labelPlacement: "right" as const,
      driftPx: 10,
      driftDuration: 38
    },
    {
      v: ventures[2],
      angle: 100,
      ring: 76,
      labelPlacement: "below" as const,
      driftPx: 12,
      driftDuration: 36
    }
  ];

  return (
    <>
      {nodes.map((n, i) => {
        const rad = (n.angle * Math.PI) / 180;
        const dx = ((Math.cos(rad) * n.ring) / 2).toFixed(3);
        const dy = ((Math.sin(rad) * n.ring) / 2).toFixed(3);
        // Tangent vector to the orbit at this angle — the venture drifts
        // along this so it gently slides along the orbital arc.
        const tx = -Math.sin(rad);
        const ty = Math.cos(rad);
        const driftA = { x: tx * -n.driftPx, y: ty * -n.driftPx };
        const driftB = { x: tx * n.driftPx, y: ty * n.driftPx };
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
              animate={{
                opacity: 1,
                y: 0,
                x: [driftA.x, driftB.x, driftA.x]
              }}
              transition={{
                opacity: { duration: 1.4, delay: 0.8 + i * 0.18, ease: EASE },
                y: { duration: 1.4, delay: 0.8 + i * 0.18, ease: EASE },
                x: {
                  duration: n.driftDuration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.6 + i * 0.4
                }
              }}
            >
              <motion.div
                animate={{
                  y: [driftA.y, driftB.y, driftA.y]
                }}
                transition={{
                  duration: n.driftDuration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.6 + i * 0.4
                }}
              >
                <VentureNode
                  venture={n.v}
                  number={number}
                  placement={n.labelPlacement}
                />
              </motion.div>
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
      ? "flex-col items-center text-center gap-3.5"
      : "flex-row items-center gap-4";
  const labelLayout = placement === "below" ? "text-center" : "text-left";

  return (
    <Link href={venture.href} {...linkProps} className={`group flex ${layout}`}>
      <span className="relative flex h-3.5 w-3.5 shrink-0 items-center justify-center">
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full bg-white/20"
          animate={{ scale: [1, 2.4, 1], opacity: [0.55, 0, 0.55] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeOut" }}
        />
        <span className="relative h-2 w-2 rounded-full bg-ink shadow-[0_0_12px_rgba(255,255,255,0.7)]" />
      </span>

      <span className={`flex flex-col gap-1.5 ${labelLayout}`}>
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.42em] text-ink-soft md:text-[12px]">
          {number}
        </span>
        <span className="font-mono text-[12px] font-medium uppercase tracking-[0.34em] text-ink leading-tight transition-colors duration-500 group-hover:text-white md:text-[14px]">
          {venture.name}
        </span>
      </span>
    </Link>
  );
}

function AtmosphericLabels() {
  // Ambient labels sit on the outer perimeter, between the venture nodes.
  // Slightly brighter than before so they remain legible without
  // competing with the venture names for attention.
  const labels = [
    { text: "Media", angle: 315, ring: 100 },
    { text: "Wealth", angle: 195, ring: 100 },
    { text: "Influence", angle: 35, ring: 86 }
  ];

  return (
    <>
      {labels.map((l, i) => {
        const rad = (l.angle * Math.PI) / 180;
        const dx = ((Math.cos(rad) * l.ring) / 2).toFixed(3);
        const dy = ((Math.sin(rad) * l.ring) / 2).toFixed(3);
        return (
          <motion.span
            key={l.text}
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            animate={{ opacity: 0.62, letterSpacing: "0.42em" }}
            transition={{ duration: 2.0, delay: 0.6 + i * 0.2, ease: EASE }}
            className="absolute left-1/2 top-1/2 font-mono text-[11px] uppercase tracking-[0.42em] text-ink-soft md:text-[12px]"
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
      className="absolute bottom-12 left-6 z-10 max-w-[26rem] font-display text-[clamp(2.5rem,5vw,5.25rem)] font-light leading-[0.98] text-white md:bottom-16 md:left-12 md:max-w-[32rem]"
      style={{ textShadow: "0 1px 18px rgba(0,0,0,0.55)" }}
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
      className="absolute bottom-8 right-6 z-10 flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.32em] text-white md:bottom-12 md:right-12 md:text-[12px]"
    >
      <motion.span
        aria-hidden
        className="block h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <span>Online</span>
      <span aria-hidden className="text-ink-subtle">
        ·
      </span>
      <span>Multi-state</span>
      <span aria-hidden className="text-ink-subtle">
        ·
      </span>
      <span suppressHydrationWarning>{time || "——:——:——"}</span>
    </motion.div>
  );
}
