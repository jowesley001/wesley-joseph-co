"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ventures } from "@/content/ventures";

type Props = {
  active: boolean;
};

type ExitTarget = { href: string; external: boolean };

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

  // Exit-fade state — when a venture is activated, the whole composition
  // fades out before the navigation happens, so leaving never feels like
  // a hard cut.
  const [exitTo, setExitTo] = useState<ExitTarget | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!exitTo) return;
    const id = window.setTimeout(() => {
      if (exitTo.external) {
        window.location.href = exitTo.href;
      } else {
        router.push(exitTo.href);
      }
    }, 700);
    return () => window.clearTimeout(id);
  }, [exitTo, router]);

  const navigate = useCallback((target: ExitTarget) => {
    setExitTo((prev) => prev ?? target);
  }, []);

  return (
    <motion.div
      className="relative h-[100svh] w-full overflow-hidden bg-bg text-ink"
      animate={exitTo ? { opacity: 0, filter: "blur(4px)" } : { opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <DeepSpaceField px={px} py={py} />
      <NebulaClouds />
      <CosmicDust />
      <AmbientField />
      <OrbitalSystem active={active} px={px} py={py} onNavigate={navigate} />
      <AtmosphericHaze />
      <StreakLayer />
      <Headline active={active} />
      <BottomStatus active={active} />
    </motion.div>
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

function DeepSpaceField({
  px,
  py
}: {
  px: ReturnType<typeof useMotionValue<number>>;
  py: ReturnType<typeof useMotionValue<number>>;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Four depth layers — distant / far / mid / near. Each tier moves a
  // little more with the cursor parallax so the field reads as 3D.
  const distantStars = useMemo(
    () =>
      makeStars(180, 3, {
        sizeMin: 0.4,
        sizeMax: 0.9,
        opacityMin: 0.12,
        opacityMax: 0.32,
        driftMin: 0,
        driftMax: 4,
        durMin: 28,
        durMax: 46
      }),
    []
  );
  const farStars = useMemo(
    () =>
      makeStars(140, 7, {
        sizeMin: 0.7,
        sizeMax: 1.4,
        opacityMin: 0.22,
        opacityMax: 0.5,
        driftMin: 0,
        driftMax: 7,
        durMin: 22,
        durMax: 38
      }),
    []
  );
  const midStars = useMemo(
    () =>
      makeStars(70, 11, {
        sizeMin: 1.1,
        sizeMax: 1.9,
        opacityMin: 0.35,
        opacityMax: 0.65,
        driftMin: 0,
        driftMax: 12,
        durMin: 18,
        durMax: 30
      }),
    []
  );
  const nearStars = useMemo(
    () =>
      makeStars(30, 19, {
        sizeMin: 1.4,
        sizeMax: 2.6,
        opacityMin: 0.5,
        opacityMax: 0.9,
        driftMin: 0,
        driftMax: 22,
        durMin: 14,
        durMax: 24
      }),
    []
  );

  // Bright "lighthouse" stars that twinkle — anchored at chosen
  // positions so the composition has consistent focal points throughout
  // the viewport.
  const brightStars = useMemo(
    () => [
      { x: 8, y: 14, size: 2.6 },
      { x: 22, y: 78, size: 3.0 },
      { x: 36, y: 36, size: 2.4 },
      { x: 76, y: 18, size: 2.8 },
      { x: 92, y: 64, size: 3.2 },
      { x: 64, y: 88, size: 2.4 },
      { x: 14, y: 52, size: 2.6 },
      { x: 88, y: 32, size: 2.4 },
      { x: 4, y: 86, size: 2.8 },
      { x: 52, y: 8, size: 2.4 },
      { x: 96, y: 92, size: 2.6 }
    ],
    []
  );

  // Parallax transforms — distant drifts least, near drifts most.
  const distantX = useTransform(px, (v) => v * -2);
  const distantY = useTransform(py, (v) => v * -2);
  const farX = useTransform(px, (v) => v * -5);
  const farY = useTransform(py, (v) => v * -5);
  const midX = useTransform(px, (v) => v * -12);
  const midY = useTransform(py, (v) => v * -12);
  const nearX = useTransform(px, (v) => v * -24);
  const nearY = useTransform(py, (v) => v * -24);

  if (!mounted) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <motion.div className="absolute inset-0" style={{ x: distantX, y: distantY }}>
        {distantStars.map((s) => (
          <StarDot key={s.id} star={s} />
        ))}
      </motion.div>
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

/* -------------------------------------------------------------------------- */
/* Cosmic dust — fine drifting particles for atmosphere depth.                 */
/* -------------------------------------------------------------------------- */

function CosmicDust() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const dust = useMemo(
    () =>
      makeStars(70, 31, {
        sizeMin: 0.5,
        sizeMax: 1.2,
        opacityMin: 0.06,
        opacityMax: 0.22,
        driftMin: 8,
        driftMax: 26,
        durMin: 30,
        durMax: 60
      }),
    []
  );

  if (!mounted) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {dust.map((d) => (
        <StarDot key={d.id} star={d} />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Atmospheric haze — soft greyscale wash that drifts slowly.                  */
/* -------------------------------------------------------------------------- */

function AtmosphericHaze() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 90% 80% at 54% 50%, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.012) 35%, rgba(0,0,0,0) 70%)",
        mixBlendMode: "screen"
      }}
      animate={{ opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
    />
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

/* -------------------------------------------------------------------------- */
/* Nebula clouds — soft drifting greyscale gradient blobs for depth.           */
/* -------------------------------------------------------------------------- */

function NebulaClouds() {
  // Six soft greyscale gradient blobs at varied sizes, opacities, and
  // depths. Each drifts and scales on a unique long loop so the field
  // never settles into a static composition.
  const clouds = [
    {
      width: 78, left: "12%", top: "62%",
      g: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 35%, rgba(0,0,0,0) 70%)",
      blur: 30, dur: 60, delay: 0,
      x: [-20, 18, -20], y: [-12, 14, -12], scale: [1, 1.08, 1]
    },
    {
      width: 60, left: "82%", top: "20%",
      g: "radial-gradient(circle, rgba(255,255,255,0.042) 0%, rgba(255,255,255,0.014) 40%, rgba(0,0,0,0) 70%)",
      blur: 36, dur: 72, delay: 4,
      x: [12, -16, 12], y: [10, -8, 10], scale: [1.05, 1, 1.05]
    },
    {
      width: 52, left: "30%", top: "20%",
      g: "radial-gradient(circle, rgba(255,255,255,0.028) 0%, rgba(0,0,0,0) 65%)",
      blur: 42, dur: 88, delay: 12,
      x: [-10, 14, -10], y: [8, -10, 8], scale: [1, 1.06, 1]
    },
    {
      width: 88, left: "70%", top: "78%",
      g: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 40%, rgba(0,0,0,0) 72%)",
      blur: 44, dur: 96, delay: 6,
      x: [16, -10, 16], y: [-14, 12, -14], scale: [1.04, 1, 1.04]
    },
    {
      width: 40, left: "8%", top: "30%",
      g: "radial-gradient(circle, rgba(255,255,255,0.022) 0%, rgba(0,0,0,0) 65%)",
      blur: 32, dur: 64, delay: 18,
      x: [-8, 12, -8], y: [10, -6, 10], scale: [1, 1.05, 1]
    },
    {
      width: 36, left: "60%", top: "12%",
      g: "radial-gradient(circle, rgba(255,255,255,0.026) 0%, rgba(0,0,0,0) 65%)",
      blur: 30, dur: 78, delay: 22,
      x: [10, -10, 10], y: [-8, 10, -8], scale: [1.03, 1, 1.03]
    }
  ];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {clouds.map((c, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${c.width}vmin`,
            height: `${c.width}vmin`,
            left: c.left,
            top: c.top,
            background: c.g,
            filter: `blur(${c.blur}px)`,
            transform: "translate(-50%, -50%)"
          }}
          animate={{ x: c.x, y: c.y, scale: c.scale }}
          transition={{
            duration: c.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: c.delay
          }}
        />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Streak layer — occasional thin white streaks crossing the field.            */
/* -------------------------------------------------------------------------- */

function StreakLayer() {
  // Sparse streaks fire at offset intervals — atmospheric, not a
  // constant motion. Each line eases across the screen and fades.
  const STREAKS = [
    { y: "16%", angle: -8, duration: 3.0, delay: 0, gap: 16 },
    { y: "32%", angle: 4, duration: 3.4, delay: 9, gap: 22 },
    { y: "52%", angle: -3, duration: 2.8, delay: 4, gap: 28 },
    { y: "68%", angle: 7, duration: 3.6, delay: 18, gap: 24 },
    { y: "86%", angle: -5, duration: 3.2, delay: 12, gap: 30 }
  ];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {STREAKS.map((s, i) => (
        <motion.span
          key={i}
          className="absolute h-px"
          style={{
            left: 0,
            top: s.y,
            width: "22vw",
            background:
              "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 45%, rgba(255,255,255,0.85) 60%, rgba(255,255,255,0) 100%)",
            transformOrigin: "left center",
            transform: `rotate(${s.angle}deg)`
          }}
          initial={{ x: "-30vw", opacity: 0 }}
          animate={{
            x: ["-30vw", "120vw"],
            opacity: [0, 0.9, 0]
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            repeatDelay: s.gap,
            ease: "easeOut",
            times: [0, 0.5, 1]
          }}
        />
      ))}
    </div>
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

function OrbitalSystem({
  active,
  px,
  py,
  onNavigate
}: {
  active: boolean;
  px: ReturnType<typeof useMotionValue<number>>;
  py: ReturnType<typeof useMotionValue<number>>;
  onNavigate: (target: ExitTarget) => void;
}) {
  // Whole-system camera parallax — the orbit drifts opposite to the
  // pointer for a "floating in space" feel.
  const camX = useTransform(px, (v) => v * -16);
  const camY = useTransform(py, (v) => v * -12);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
      transition={{ duration: 2.4, ease: EASE }}
      className="pointer-events-none absolute inset-0"
    >
      {/* Camera-style parallax + slow continuous drift — the whole
          composition gently floats in space, responding to the cursor
          and oscillating on its own. */}
      <motion.div
        className="absolute inset-0"
        style={{ x: camX, y: camY }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{
            x: [-14, 12, -14],
            y: [-8, 10, -8]
          }}
          transition={{
            duration: 42,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div
            className="absolute"
            style={{
              left: ORBIT_ANCHOR.left,
              top: ORBIT_ANCHOR.top,
              transform: "translate(-50%, -50%)"
            }}
          >
            {/* Whole ring group slowly rotates as one — satellites
                ride the rotation as one celestial mechanism. */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 320,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ position: "relative", width: 0, height: 0 }}
            >
              <Rings />
            </motion.div>

            <AtmosphericLabels />
            <EclipseCore />
            <VentureNodes onNavigate={onNavigate} />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function Rings() {
  // Each ring is a circle that rotates as a single rigid body — its
  // satellites are positioned on the ring's perimeter and ride along
  // with it. Rotating a perfect circle alone is invisible; the dots
  // give the rotation something the eye can track. Each ring also
  // breathes opacity on a long cycle so the orbital field never feels
  // frozen.
  return (
    <>
      {RINGS.map((r, i) => {
        const keyframe = ["wjcOrbitRingA", "wjcOrbitRingB", "wjcOrbitRingC", "wjcOrbitRingD"][i % 4];
        const breatheLow = r.opacity * 0.7;
        const breatheHigh = Math.min(r.opacity * 1.15, 0.95);
        const breatheDur = 11 + i * 2.4;
        return (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2"
            style={{
              width: `${r.size}vmin`,
              height: `${r.size}vmin`,
              transform: "translate(-50%, -50%)"
            }}
            animate={{ opacity: [breatheLow / r.opacity, breatheHigh / r.opacity, breatheLow / r.opacity] }}
            transition={{
              duration: breatheDur,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.4
            }}
          >
            <div
              className="relative h-full w-full rounded-full"
              style={{
                border: `1px solid rgba(255, 255, 255, ${r.opacity})`,
                boxShadow: `0 0 ${24 + i * 6}px rgba(255,255,255,${0.04 + i * 0.012}) inset`,
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
                        "0 0 6px rgba(255,255,255,0.65), 0 0 14px rgba(255,255,255,0.3)"
                    }}
                  />
                );
              })}
            </div>
          </motion.div>
        );
      })}
    </>
  );
}

function EclipseCore() {
  // Eclipse is a living celestial body: it breathes, drifts inside the
  // orbital field, and the bright sun rim slowly sweeps around the disc
  // edge as if the moon is rotating in front of the sun.
  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{
        width: "24vmin",
        height: "24vmin",
        transform: `translate(-50%, -50%) translate(${ECLIPSE_OFFSET.x}vmin, ${ECLIPSE_OFFSET.y}vmin)`
      }}
      animate={{
        x: [-6, 5, -6],
        y: [-3, 4, -3],
        scale: [1, 1.04, 1]
      }}
      transition={{
        x: { duration: 38, repeat: Infinity, ease: "easeInOut" },
        y: { duration: 32, repeat: Infinity, ease: "easeInOut" },
        scale: { duration: 7, repeat: Infinity, ease: "easeInOut" }
      }}
    >
      {/* Wide soft halo — gravitational presence, breathes with the disc */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 rounded-full"
        style={{
          width: "260%",
          height: "260%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 32%, rgba(0,0,0,0) 60%)",
          animation: "wjcGlowPulse 7s ease-in-out infinite",
          filter: "blur(10px)"
        }}
      />
      {/* Bright rim — slowly sweeps around the disc as the moon rotates
          in front of the sun. Two layers: sharp inner + blurred corona. */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 60deg, rgba(255,255,255,0) 0deg, rgba(255,255,255,0.85) 18deg, rgba(255,255,255,1) 30deg, rgba(255,255,255,0.85) 42deg, rgba(255,255,255,0) 70deg, rgba(255,255,255,0) 360deg)",
          animation: "wjcCrescentSweep 90s linear infinite"
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 50deg, rgba(255,255,255,0) 0deg, rgba(255,255,255,0.42) 24deg, rgba(255,255,255,0.7) 40deg, rgba(255,255,255,0.42) 56deg, rgba(255,255,255,0) 90deg, rgba(255,255,255,0) 360deg)",
          filter: "blur(6px)",
          transform: "scale(1.08)",
          animation: "wjcCrescentSweep 90s linear infinite"
        }}
      />
      {/* Dark sphere body — slowly self-rotates so the surface
          highlight drifts slightly, reinforcing the celestial feel. */}
      <motion.div
        aria-hidden
        className="absolute rounded-full"
        style={{
          inset: "4%",
          background:
            "radial-gradient(circle at 35% 30%, #1c1c1c 0%, #0b0b0b 45%, #000 75%)",
          boxShadow:
            "0 0 60px 4px rgba(0,0,0,0.9) inset, 0 12px 60px 8px rgba(0,0,0,0.8)"
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 220, repeat: Infinity, ease: "linear" }}
      >
        {/* Subtle highlight on the upper-left of the disc — when the
            disc rotates, this highlight rotates with it. */}
        <div
          aria-hidden
          className="absolute rounded-full"
          style={{
            inset: "4%",
            background:
              "radial-gradient(circle at 30% 28%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 25%, rgba(0,0,0,0) 55%)"
          }}
        />
      </motion.div>
    </motion.div>
  );
}

function VentureNodes({
  onNavigate
}: {
  onNavigate: (target: ExitTarget) => void;
}) {
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
                  onNavigate={onNavigate}
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
  placement,
  onNavigate
}: {
  venture: (typeof ventures)[number];
  number: string;
  placement: "below" | "right";
  onNavigate: (target: ExitTarget) => void;
}) {
  const [hover, setHover] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Modifier-clicks let the browser handle them natively (new tab,
    // download, etc.) — we only intercept plain primary-button clicks.
    if (
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      e.button !== 0
    ) {
      return;
    }
    e.preventDefault();
    onNavigate({ href: venture.href, external: !!venture.external });
  };

  const layout =
    placement === "below"
      ? "flex-col items-center text-center gap-3.5"
      : "flex-row items-center gap-4";
  const labelLayout = placement === "below" ? "text-center" : "text-left";

  // Larger invisible tap target so the node stays easy to hit on mobile
  // and while it drifts. The ring is keyed off hover so it expands to
  // reveal a subtle focus halo.
  return (
    <Link
      href={venture.href}
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      aria-label={`${venture.name} — ${venture.category}`}
      className={`group relative flex cursor-pointer rounded-md p-2 outline-none focus-visible:ring-1 focus-visible:ring-white/60 ${layout}`}
    >
      {/* Soft focus halo behind the whole node — fades in on hover. */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -inset-3 rounded-2xl"
        animate={{
          opacity: hover ? 1 : 0,
          scale: hover ? 1 : 0.92
        }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 35%, rgba(0,0,0,0) 70%)"
        }}
      />

      {/* Pulsing dot anchor — scales and brightens on hover. */}
      <span className="relative flex h-3.5 w-3.5 shrink-0 items-center justify-center">
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full bg-white/20"
          animate={{
            scale: hover ? [1.2, 2.8, 1.2] : [1, 2.4, 1],
            opacity: hover ? [0.7, 0, 0.7] : [0.55, 0, 0.55]
          }}
          transition={{
            duration: hover ? 2.6 : 3.6,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
        <motion.span
          className="relative rounded-full bg-white"
          animate={{
            scale: hover ? 1.35 : 1,
            boxShadow: hover
              ? "0 0 18px rgba(255,255,255,0.95), 0 0 36px rgba(255,255,255,0.5)"
              : "0 0 12px rgba(255,255,255,0.7)"
          }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ width: 8, height: 8 }}
        />
      </span>

      <span className={`flex flex-col gap-1.5 ${labelLayout}`}>
        <motion.span
          className="font-mono text-[11px] font-medium uppercase tracking-[0.44em] text-white md:text-[12px]"
          animate={{
            opacity: hover ? 1 : 0.85,
            letterSpacing: hover ? "0.5em" : "0.44em"
          }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {number}
        </motion.span>
        <motion.span
          className="font-mono text-[13px] font-semibold uppercase tracking-[0.34em] text-white leading-tight md:text-[15px]"
          animate={{
            letterSpacing: hover ? "0.4em" : "0.34em",
            textShadow: hover
              ? "0 0 22px rgba(255,255,255,0.55)"
              : "0 0 0px rgba(255,255,255,0)"
          }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          {venture.name}
        </motion.span>
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
            animate={{ opacity: 0.78, letterSpacing: "0.42em" }}
            transition={{ duration: 2.0, delay: 0.6 + i * 0.2, ease: EASE }}
            className="absolute left-1/2 top-1/2 font-mono text-[11px] font-medium uppercase tracking-[0.42em] text-white md:text-[12px]"
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
  // Headline enters with blur fade, then breathes opacity subtly so it
  // feels like part of the living composition rather than a static
  // overlay.
  return (
    <motion.h1
      initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
      animate={
        active
          ? { opacity: [0.92, 1, 0.92], y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: 16, filter: "blur(8px)" }
      }
      transition={
        active
          ? {
              opacity: { duration: 9, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 1.8, delay: 0.4, ease: EASE },
              filter: { duration: 1.8, delay: 0.4, ease: EASE }
            }
          : { duration: 1.8, delay: 0.4, ease: EASE }
      }
      className="absolute bottom-12 left-6 z-30 max-w-[26rem] font-display text-[clamp(2.5rem,5vw,5.25rem)] font-normal leading-[0.98] text-white md:bottom-16 md:left-12 md:max-w-[32rem]"
      style={{ textShadow: "0 2px 24px rgba(0,0,0,0.7)" }}
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
