"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, Stars } from "@react-three/drei";
import { motion } from "framer-motion";
import { AdditiveBlending, MathUtils } from "three";
import type { Group, Points } from "three";
import { useMemo, useRef } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

function seededNoise(index: number, seed: number) {
  const x = Math.sin(index * 999 + seed * 101) * 10000;
  return x - Math.floor(x);
}

function StarDust({ count = 520 }: { count?: number }) {
  const points = useRef<Points>(null);
  const positions = useMemo(() => {
    const data = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      data[i * 3] = (seededNoise(i, 2) - 0.5) * 12;
      data[i * 3 + 1] = (seededNoise(i, 5) - 0.5) * 6.6;
      data[i * 3 + 2] = -2.4 - seededNoise(i, 8) * 7.5;
    }

    return data;
  }, [count]);

  useFrame(({ clock }) => {
    if (!points.current) return;
    const t = clock.getElapsedTime();
    points.current.rotation.z = t * 0.012;
    points.current.position.x = Math.sin(t * 0.13) * 0.05;
    points.current.position.y = Math.cos(t * 0.11) * 0.035;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.014}
        transparent
        opacity={0.42}
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}

function NebulaMist() {
  const mist = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!mist.current) return;
    const t = clock.getElapsedTime();
    mist.current.rotation.z = Math.sin(t * 0.08) * 0.035;
    mist.current.position.x = Math.sin(t * 0.1) * 0.08;
  });

  return (
    <group ref={mist} position={[0.4, -0.05, -5.8]}>
      <mesh scale={[6.6, 2.1, 1]}>
        <planeGeometry args={[1, 1, 1, 1]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.055}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[1.7, -0.35, 0.1]} scale={[3.4, 1.1, 1]}>
        <planeGeometry args={[1, 1, 1, 1]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.045}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function OrbitLine({
  radius,
  tube,
  opacity,
  rotation,
  speed
}: {
  radius: number;
  tube: number;
  opacity: number;
  rotation: [number, number, number];
  speed: number;
}) {
  const ring = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!ring.current) return;
    ring.current.rotation.z = rotation[2] + clock.getElapsedTime() * speed;
  });

  return (
    <group ref={ring} rotation={rotation} scale={[1.74, 0.43, 1]}>
      <mesh>
        <torusGeometry args={[radius, tube, 8, 220]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={opacity}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function EclipseBody() {
  const body = useRef<Group>(null);
  const halo = useRef<Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const reveal = MathUtils.smoothstep(Math.min(t / 5.4, 1), 0, 1);

    if (body.current) {
      body.current.scale.setScalar(MathUtils.lerp(0.78, 1, reveal));
      body.current.position.x = MathUtils.lerp(0.45, 0.76, reveal);
      body.current.position.y = MathUtils.lerp(0.1, -0.03, reveal);
      body.current.rotation.y = t * 0.045;
    }

    if (halo.current) {
      const pulse = 1 + Math.sin(t * 0.65) * 0.018;
      halo.current.scale.setScalar(MathUtils.lerp(0.86, pulse, reveal));
      halo.current.rotation.z = t * 0.018;
    }
  });

  return (
    <group ref={body} position={[0.45, 0.1, 0]}>
      <group ref={halo}>
        <mesh scale={[1.46, 1.46, 1]}>
          <ringGeometry args={[1.0, 1.34, 160]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.032}
            depthWrite={false}
            blending={AdditiveBlending}
          />
        </mesh>
        <mesh scale={[1.26, 1.26, 1]}>
          <ringGeometry args={[1.02, 1.14, 160]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.085}
            depthWrite={false}
            blending={AdditiveBlending}
          />
        </mesh>
      </group>

      <mesh position={[0.12, -0.03, 0.05]} scale={[0.18, 1.06, 0.12]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.56}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[1, 96, 96]} />
        <meshStandardMaterial color="#010101" roughness={0.9} metalness={0} />
      </mesh>

      <mesh scale={[1.006, 1.006, 1.006]}>
        <sphereGeometry args={[1, 96, 96]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.72}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function EclipseWorld() {
  const system = useRef<Group>(null);

  useFrame(({ clock, mouse }) => {
    if (!system.current) return;
    const t = clock.getElapsedTime();
    const reveal = MathUtils.smoothstep(Math.min(t / 6.2, 1), 0, 1);

    system.current.position.x = MathUtils.lerp(0.28, 0, reveal) + mouse.x * 0.05;
    system.current.position.y = mouse.y * 0.025;
    system.current.rotation.y = mouse.x * 0.035;
    system.current.rotation.x = -mouse.y * 0.025;
  });

  return (
    <>
      <fog attach="fog" args={["#000000", 5.5, 14]} />
      <ambientLight intensity={0.16} />
      <pointLight position={[3.2, 0.3, 3.6]} intensity={9.5} color="#ffffff" />
      <pointLight position={[-3.5, 1.2, -2.2]} intensity={1.2} color="#ffffff" />

      <Stars radius={95} depth={42} count={1300} factor={3.4} saturation={0} fade speed={0.24} />
      <Sparkles count={82} scale={[8.4, 3.8, 4.6]} size={1.35} speed={0.2} opacity={0.34} color="#ffffff" />
      <StarDust />
      <NebulaMist />

      <group ref={system} position={[0.28, 0, 0]}>
        <OrbitLine radius={1.72} tube={0.0035} opacity={0.16} rotation={[0.42, 0.28, 0.08]} speed={0.018} />
        <OrbitLine radius={2.06} tube={0.0028} opacity={0.12} rotation={[0.53, -0.2, -0.32]} speed={-0.013} />
        <OrbitLine radius={2.36} tube={0.0022} opacity={0.09} rotation={[0.5, 0.08, 0.38]} speed={0.009} />
        <EclipseBody />
      </group>
    </>
  );
}

export function EclipseScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.08, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 3.8, ease: EASE }}
      >
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 6.8], fov: 42 }}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        >
          <color attach="background" args={["#000000"]} />
          <EclipseWorld />
        </Canvas>
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-black"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 2.2, delay: 0.35, ease: EASE }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 60% 48%, rgba(255,255,255,0.12), rgba(255,255,255,0.035) 18%, rgba(0,0,0,0) 44%), radial-gradient(ellipse at center, rgba(0,0,0,0) 45%, rgba(0,0,0,0.82) 100%)"
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.09] mix-blend-screen"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px)",
          backgroundSize: "100% 3px, 4px 100%"
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[-4%] opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 260 260' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.88' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E\")",
          animation: "wjcGrain 7s steps(9) infinite"
        }}
      />

      <motion.div
        className="pointer-events-none absolute bottom-10 left-8 right-8 flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.34em] text-white/55 md:left-12 md:right-12"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 2.1, ease: EASE }}
      >
        <span>Wesley Joseph</span>
        <span className="hidden md:inline">The Infrastructure For Modern Influence</span>
      </motion.div>
    </div>
  );
}
