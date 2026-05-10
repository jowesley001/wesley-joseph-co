"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

// Cinematic timeline (in seconds, from canvas mount):
//   0.0 – 1.5s   void
//   1.5 – 3.0s   eclipse emerges (opacity 0 → 1, scale 0.5 → 0.95, x −2 → −0.5)
//   3.0 – 6.4s   eclipse drifts horizontally, settles between JOSEPH and CO
//                (x −0.5 → 0.3, scale 0.95 → 1.0)
//   6.4 – 7.6s   lock-in (eclipse holds at x 0.3, scale 1.0)
//   7.6 – 9.0s   recede (opacity 1 → 0.42, scale 1.0 → 0.84)
//   9.0s+        ambient drift forever (sin/cos drift on x/y, breathing scale)

const ECLIPSE_REST_X = 0.3;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp(v: number, lo: number, hi: number) {
  return v < lo ? lo : v > hi ? hi : v;
}

function easeOutCubic(t: number) {
  const u = clamp(t, 0, 1);
  return 1 - Math.pow(1 - u, 3);
}

function makeRadialTexture() {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const grad = ctx.createRadialGradient(
    size / 2,
    size / 2,
    size * 0.05,
    size / 2,
    size / 2,
    size * 0.5
  );
  grad.addColorStop(0, "rgba(255,255,255,0.85)");
  grad.addColorStop(0.25, "rgba(255,255,255,0.32)");
  grad.addColorStop(0.55, "rgba(255,255,255,0.08)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeParticleTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const grad = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  grad.addColorStop(0, "rgba(255,255,255,0.95)");
  grad.addColorStop(0.5, "rgba(255,255,255,0.25)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

function CameraRig() {
  const { camera } = useThree();
  const start = useRef(performance.now());

  useFrame(() => {
    const t = (performance.now() - start.current) / 1000;
    // Subtle continuous camera drift — feels like a steadicam
    camera.position.x = Math.sin(t * 0.06) * 0.18;
    camera.position.y = Math.cos(t * 0.05) * 0.10;
    camera.position.z = 5 + Math.sin(t * 0.04) * 0.08;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function EclipseSphere() {
  const groupRef = useRef<THREE.Group>(null);
  const sphereMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const coronaMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const innerCoronaMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const start = useRef(performance.now());

  const coronaTex = useMemo(() => makeRadialTexture(), []);

  useFrame(() => {
    if (!groupRef.current) return;
    const t = (performance.now() - start.current) / 1000;
    const g = groupRef.current;

    let posX = -2;
    let scale = 0.5;
    let opacity = 0;

    if (t < 1.5) {
      // void
      opacity = 0;
      posX = -2;
      scale = 0.5;
    } else if (t < 3.0) {
      const p = easeOutCubic((t - 1.5) / 1.5);
      opacity = p;
      posX = lerp(-2, -0.5, p);
      scale = lerp(0.5, 0.95, p);
    } else if (t < 6.4) {
      const p = easeOutCubic((t - 3.0) / 3.4);
      posX = lerp(-0.5, ECLIPSE_REST_X, p);
      scale = lerp(0.95, 1.0, p);
      opacity = 1;
    } else if (t < 7.6) {
      // lock-in
      posX = ECLIPSE_REST_X;
      scale = 1.0;
      opacity = 1;
    } else if (t < 9.0) {
      const p = easeOutCubic((t - 7.6) / 1.4);
      opacity = lerp(1, 0.42, p);
      scale = lerp(1.0, 0.84, p);
      posX = ECLIPSE_REST_X;
    } else {
      // ambient
      const aT = t - 9.0;
      posX = ECLIPSE_REST_X + Math.sin(aT * 0.18) * 0.05;
      g.position.y = Math.sin(aT * 0.14) * 0.04;
      scale = 0.84 + Math.sin(aT * 0.32) * 0.012;
      opacity = 0.42;
    }

    g.position.x = posX;
    if (t < 9.0) g.position.y = 0;
    g.scale.setScalar(scale);

    if (sphereMatRef.current) sphereMatRef.current.opacity = opacity;
    if (coronaMatRef.current) {
      const pulse = 0.78 + Math.sin(t * 0.7) * 0.08;
      coronaMatRef.current.opacity = opacity * pulse;
    }
    if (innerCoronaMatRef.current) {
      const pulse = 0.85 + Math.sin(t * 0.5) * 0.1;
      innerCoronaMatRef.current.opacity = opacity * pulse;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Wide outer corona — soft falloff */}
      <mesh position={[0, 0, -0.06]}>
        <planeGeometry args={[5.0, 5.0]} />
        <meshBasicMaterial
          ref={coronaMatRef}
          map={coronaTex ?? undefined}
          color="#ffffff"
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Inner corona — concentrates the bright halo right at the eclipse rim */}
      <mesh position={[0, 0, -0.04]}>
        <planeGeometry args={[2.55, 2.55]} />
        <meshBasicMaterial
          ref={innerCoronaMatRef}
          map={coronaTex ?? undefined}
          color="#ffffff"
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* The eclipse — opaque dark sphere; backlighting via the point light
          behind it creates the natural crescent rim, no geometric ring needed */}
      <mesh>
        <sphereGeometry args={[1, 96, 96]} />
        <meshStandardMaterial
          ref={sphereMatRef}
          color="#000000"
          roughness={1}
          metalness={0}
          transparent
          opacity={0}
        />
      </mesh>
    </group>
  );
}

function Particles({ count = 90 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const start = useRef(performance.now());

  const tex = useMemo(() => makeParticleTexture(), []);
  const initialPositions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1;
    }
    return arr;
  }, [count]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const t = (performance.now() - start.current) / 1000;
    const positions = pointsRef.current.geometry.attributes.position
      .array as Float32Array;

    // Slow drift on each particle, phased by index
    for (let i = 0; i < count; i++) {
      const base = i * 3;
      positions[base + 1] =
        initialPositions[base + 1] + Math.sin(t * 0.18 + i * 0.7) * 0.18;
      positions[base] =
        initialPositions[base] + Math.cos(t * 0.14 + i * 0.5) * 0.12;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={initialPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        map={tex ?? undefined}
        color="#ffffff"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function AtmosphericBackdrop() {
  // Large soft gradient plane far behind the eclipse — adds depth and a
  // sense of light source bleeding around the sphere.
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  const tex = useMemo(() => {
    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    const grad = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );
    grad.addColorStop(0, "rgba(255,255,255,0.06)");
    grad.addColorStop(0.4, "rgba(255,255,255,0.02)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(canvas);
  }, []);

  const start = useRef(performance.now());
  useFrame(() => {
    if (!matRef.current) return;
    const t = (performance.now() - start.current) / 1000;
    matRef.current.opacity = 0.55 + Math.sin(t * 0.18) * 0.12;
  });

  return (
    <mesh position={[0, 0, -3]}>
      <planeGeometry args={[18, 12]} />
      <meshBasicMaterial
        ref={matRef}
        map={tex ?? undefined}
        color="#ffffff"
        transparent
        opacity={0.5}
        depthWrite={false}
      />
    </mesh>
  );
}

export function EclipseScene() {
  return (
    <Canvas
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 5], fov: 36 }}
      dpr={[1, 2]}
      className="!absolute inset-0"
    >
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#000000", 4.5, 11]} />

      <ambientLight intensity={0.04} />
      <pointLight position={[0, 0, -2.5]} intensity={4.5} color="#fff8ee" distance={9} decay={1.4} />
      <directionalLight position={[3.2, 1.6, 2.5]} intensity={0.4} color="#ffffff" />

      <CameraRig />
      <AtmosphericBackdrop />
      <Particles count={90} />
      <EclipseSphere />
    </Canvas>
  );
}
