"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useInView, useReducedMotion } from "framer-motion";
import { useMemo, useRef } from "react";
import type { Group, Mesh } from "three";
import { AdditiveBlending, Color, DoubleSide } from "three";

const WAVE_VERT = /* glsl */ `
uniform float uTime;
varying vec2 vUv;
varying float vElev;

void main() {
  vUv = uv;
  vec3 p = position;
  float e =
    sin(p.x * 1.35 + uTime * 0.55) * 0.14 +
    cos(p.y * 1.05 + uTime * 0.38) * 0.09 +
    sin((p.x + p.y) * 0.72 + uTime * 0.28) * 0.05;
  p.z += e;
  vElev = e;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
`;

const WAVE_FRAG = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
varying vec2 vUv;
varying float vElev;

void main() {
  float wash = clamp(vUv.x * 0.65 + vElev * 1.8 + 0.2, 0.0, 1.0);
  vec3 col = mix(uColorA, uColorB, wash);
  float fade = 1.0 - abs(vUv.y - 0.48) * 1.55;
  float alpha = clamp(fade * 0.28, 0.03, 0.3);
  gl_FragColor = vec4(col, alpha);
}
`;

function WaveField({
  reduced,
  lite,
}: {
  reduced: boolean;
  lite: boolean;
}) {
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new Color("#c4b5fd") },
      uColorB: { value: new Color("#67e8f9") },
    }),
    []
  );

  useFrame((_, delta) => {
    if (reduced) return;
    uniforms.uTime.value += delta;
  });

  const segs = lite ? 18 : 36;

  return (
    <mesh rotation={[-Math.PI / 2.35, 0, 0]} position={[0, -1.42, 0]}>
      <planeGeometry args={[9.2, 5.4, segs, Math.max(12, segs - 8)]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        side={DoubleSide}
        uniforms={uniforms}
        vertexShader={WAVE_VERT}
        fragmentShader={WAVE_FRAG}
        wireframe
      />
    </mesh>
  );
}

function OrbitRig({ reduced, lite }: { reduced: boolean; lite: boolean }) {
  const group = useRef<Group>(null);
  const inner = useRef<Mesh>(null);
  const spark = useRef<Group>(null);

  useFrame((_, delta) => {
    if (reduced) return;
    if (group.current) {
      group.current.rotation.y += delta * 0.18;
      group.current.rotation.x += delta * 0.045;
    }
    if (inner.current) {
      inner.current.rotation.y -= delta * 0.12;
      inner.current.rotation.z += delta * 0.03;
    }
    if (spark.current) {
      spark.current.rotation.y += delta * 0.42;
    }
  });

  const colors = useMemo(
    () => ({
      aqua: new Color("#22d3ee"),
      violet: new Color("#a78bfa"),
      pearl: new Color("#f8fafc"),
      silver: new Color("#cbd5e1"),
    }),
    []
  );

  const ringSeg = lite ? 64 : 96;

  return (
    <group ref={group} scale={lite ? 0.92 : 1.08} position={[0, 0.08, 0]}>
      <mesh rotation={[0.38, 0.12, 0.18]}>
        <torusGeometry args={[1.58, 0.014, 8, ringSeg]} />
        <meshBasicMaterial
          color={colors.aqua}
          transparent
          opacity={0.7}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh rotation={[1.12, 0.52, -0.28]}>
        <torusGeometry args={[1.58, 0.011, 8, ringSeg]} />
        <meshBasicMaterial
          color={colors.violet}
          transparent
          opacity={0.58}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh rotation={[0.68, -0.82, 0.42]}>
        <torusGeometry args={[1.14, 0.009, 8, lite ? 48 : 72]} />
        <meshBasicMaterial
          color={colors.pearl}
          transparent
          opacity={0.32}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={inner}>
        <icosahedronGeometry args={[0.82, lite ? 1 : 2]} />
        <meshBasicMaterial
          color={colors.silver}
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.74, lite ? 16 : 24, lite ? 16 : 24]} />
        <meshBasicMaterial
          color={colors.pearl}
          transparent
          opacity={0.06}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <group ref={spark}>
        {[0, 2.1, 4.2].map((angle) => (
          <mesh
            key={angle}
            position={[Math.cos(angle) * 1.58, Math.sin(angle * 0.4) * 0.28, Math.sin(angle) * 1.58]}
          >
            <sphereGeometry args={[0.028, 8, 8]} />
            <meshBasicMaterial
              color={angle < 3 ? colors.aqua : colors.violet}
              transparent
              opacity={0.9}
              blending={AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function SceneContent({ reduced, lite }: { reduced: boolean; lite: boolean }) {
  return (
    <>
      <WaveField reduced={reduced} lite={lite} />
      <OrbitRig reduced={reduced} lite={lite} />
    </>
  );
}

type Props = {
  className?: string;
  /** Lower segment counts for smaller stages / mobile. */
  lite?: boolean;
};

/**
 * Transparent WebGL stage: undulating mesh, holographic globe, and rotating rings.
 * Pauses off-screen and when the user prefers reduced motion.
 */
export default function HoloScene({ className, lite = false }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() === true;
  const inView = useInView(wrapRef, { margin: "120px" });
  const active = inView && !reduced;

  return (
    <div ref={wrapRef} className={className} aria-hidden>
      <Canvas
        gl={{
          alpha: true,
          antialias: !lite,
          powerPreference: "high-performance",
          stencil: false,
        }}
        dpr={lite ? [1, 1.15] : [1, 1.35]}
        camera={{ position: [0, 0.15, 4.35], fov: 36 }}
        frameloop={active ? "always" : "demand"}
        style={{ width: "100%", height: "100%", background: "transparent" }}
      >
        <SceneContent reduced={reduced || !inView} lite={lite} />
      </Canvas>
    </div>
  );
}
