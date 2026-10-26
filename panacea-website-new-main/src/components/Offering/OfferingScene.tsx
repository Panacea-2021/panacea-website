"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useInView, useReducedMotion } from "framer-motion";
import { useMemo, useRef } from "react";
import type { Group } from "three";
import { AdditiveBlending, Color } from "three";

function OrbitRig({ reduced }: { reduced: boolean }) {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (reduced || !group.current) return;
    group.current.rotation.y += delta * 0.22;
    group.current.rotation.x += delta * 0.07;
    group.current.rotation.z += delta * 0.04;
  });

  const colors = useMemo(
    () => ({
      aqua: new Color("#22d3ee"),
      violet: new Color("#a78bfa"),
      silver: new Color("#e2e8f0"),
    }),
    [],
  );

  return (
    <group ref={group} scale={1.12}>
      <mesh rotation={[0.35, 0.1, 0.2]}>
        <torusGeometry args={[1.62, 0.016, 10, 96]} />
        <meshBasicMaterial
          color={colors.aqua}
          transparent
          opacity={0.72}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh rotation={[1.15, 0.55, -0.25]}>
        <torusGeometry args={[1.62, 0.012, 10, 96]} />
        <meshBasicMaterial
          color={colors.violet}
          transparent
          opacity={0.62}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh rotation={[0.7, -0.8, 0.4]}>
        <torusGeometry args={[1.18, 0.01, 8, 72]} />
        <meshBasicMaterial
          color={colors.silver}
          transparent
          opacity={0.38}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.78, 20, 20]} />
        <meshBasicMaterial
          color={colors.silver}
          wireframe
          transparent
          opacity={0.16}
        />
      </mesh>
    </group>
  );
}

/**
 * Decorative rotating ring + wireframe sphere behind the offering cards.
 * Transparent canvas, paused when reduced-motion is requested.
 */
export default function OfferingScene() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { margin: "120px" });
  const reduced = useReducedMotion() === true;

  return (
    <div ref={wrapRef} style={{ width: "100%", height: "100%" }} aria-hidden>
      <Canvas
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
          stencil: false,
        }}
        dpr={[1, 1.4]}
        camera={{ position: [0, 0, 4.2], fov: 36 }}
        frameloop={reduced || !inView ? "demand" : "always"}
        style={{ width: "100%", height: "100%", background: "transparent" }}
      >
        <OrbitRig reduced={reduced} />
      </Canvas>
    </div>
  );
}
