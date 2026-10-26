"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";
import { Suspense, useLayoutEffect } from "react";
import { useReducedMotion } from "framer-motion";
import Robot from "./Robot";

type RobotSceneProps = {
  className?: string;
  decorative?: boolean;
  scale?: number;
  welcomeText?: string;
};

/** Keep head-to-feet in frame across canvas sizes and browser zoom. */
function FullBodyFraming() {
  const { camera, size } = useThree();

  useLayoutEffect(() => {
    const aspect = size.width / Math.max(size.height, 1);
    camera.position.set(0.48, 0.12, 5.35);
    camera.lookAt(-0.08, 0.12, 0);
    if ("fov" in camera) {
      camera.fov = aspect < 0.82 ? 34 : 30;
      camera.updateProjectionMatrix();
    }
  }, [camera, size.height, size.width]);

  return null;
}

/**
 * Drop-in 3D robot scene.
 * Transparent canvas, so it composites over existing UI.
 */
export default function RobotScene({
  className,
  decorative = true,
  scale = 0.9,
  welcomeText = "Welcome to Panacea",
}: RobotSceneProps) {
  const reduced = useReducedMotion() === true;

  return (
    <div className={className} aria-hidden={decorative || undefined}>
      <Canvas
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 1.75]}
        camera={{ position: [0.48, 0.12, 5.35], fov: 30 }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
        frameloop={reduced ? "demand" : "always"}
      >
        <FullBodyFraming />
        <ambientLight intensity={0.62} color="#dbeafe" />
        <directionalLight
          position={[3.2, 4.5, 3.8]}
          intensity={1.65}
          color="#ffffff"
          castShadow={false}
        />
        <directionalLight position={[-2.8, 1.4, 1.2]} intensity={0.55} color="#7dd3fc" />
        <pointLight position={[0.2, 1.2, 1.8]} intensity={1.25} color="#22d3ee" distance={6} />
        <pointLight position={[-1.2, 0.4, 1.4]} intensity={0.55} color="#c084fc" distance={5} />

        <Suspense fallback={null}>
          <Environment preset="city" environmentIntensity={0.7} />
          <Robot scale={scale} reducedMotion={reduced} welcomeText={welcomeText} />
          <ContactShadows
            position={[0, -1.18, 0]}
            opacity={0.28}
            scale={4.4}
            blur={2.6}
            far={2.4}
            color="#0b2740"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
