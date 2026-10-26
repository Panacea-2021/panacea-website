"use client";

/**
 * Futuristic chibi robot built from Three.js primitives.
 * Idle dance: arm swing, body sway, subtle bounce. Left hand holds a welcome card.
 */

import { useMemo, useRef, type Ref } from "react";
import { useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { CanvasTexture, type Group, type Mesh } from "three";

type RobotProps = {
  scale?: number;
  reducedMotion?: boolean;
  welcomeText?: string;
};

const WHITE = "#eef6ff";
const BLUE = "#3aa8e4";
const BLUE_DEEP = "#155a8a";
const JOINT = "#2b93d6";
const VISOR = "#041828";
const GLOW = "#7dd3fc";
const GLOW_HOT = "#22d3ee";
const MAGENTA = "#c084fc";

function useRobotMaterials() {
  return useMemo(
    () => ({
      shell: {
        color: WHITE,
        metalness: 0.88,
        roughness: 0.14,
        envMapIntensity: 1.35,
      },
      accent: {
        color: BLUE,
        metalness: 0.82,
        roughness: 0.18,
        envMapIntensity: 1.15,
      },
      joint: {
        color: JOINT,
        metalness: 0.9,
        roughness: 0.12,
      },
      visor: {
        color: VISOR,
        metalness: 0.72,
        roughness: 0.08,
        envMapIntensity: 1.4,
      },
      palm: {
        color: BLUE_DEEP,
        metalness: 0.7,
        roughness: 0.22,
      },
      glow: {
        color: GLOW,
        emissive: GLOW_HOT,
        emissiveIntensity: 2.8,
        metalness: 0.12,
        roughness: 0.14,
      },
      halo: {
        color: MAGENTA,
        emissive: MAGENTA,
        emissiveIntensity: 1.6,
        metalness: 0.2,
        roughness: 0.2,
      },
    }),
    [],
  );
}

function useWelcomeTexture(text: string) {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 768;
    canvas.height = 384;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.fillStyle = "#f4fbff";
    const r = 36;
    ctx.beginPath();
    ctx.moveTo(r, 12);
    ctx.arcTo(756, 12, 756, 372, r);
    ctx.arcTo(756, 372, 12, 372, r);
    ctx.arcTo(12, 372, 12, 12, r);
    ctx.arcTo(12, 12, 756, 12, r);
    ctx.closePath();
    ctx.fill();
    ctx.lineWidth = 10;
    ctx.strokeStyle = "#38bdf8";
    ctx.stroke();

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#0284c7";
    ctx.font = "700 34px ui-sans-serif, system-ui, sans-serif";
    ctx.fillText("HELLO", 384, 92);
    ctx.fillStyle = "#0c2740";
    ctx.font = "800 58px ui-sans-serif, system-ui, sans-serif";
    const words = text.split(" ");
    if (words.length > 2) {
      ctx.fillText(words.slice(0, 2).join(" "), 384, 188);
      ctx.fillText(words.slice(2).join(" "), 384, 268);
    } else {
      ctx.fillText(text, 384, 220);
    }

    const texture = new CanvasTexture(canvas);
    texture.anisotropy = 8;
    texture.needsUpdate = true;
    return texture;
  }, [text]);
}

function WelcomeSign({ text }: { text: string }) {
  const texture = useWelcomeTexture(text);
  const mats = useRobotMaterials();
  return (
    <group position={[0.06, -0.04, 0.16]} rotation={[-0.28, 0.92, 0.18]}>
      <mesh>
        <boxGeometry args={[0.98, 0.52, 0.045]} />
        <meshStandardMaterial color="#d9eefc" metalness={0.35} roughness={0.28} />
      </mesh>
      <mesh position={[0, 0, -0.012]}>
        <boxGeometry args={[1.04, 0.58, 0.02]} />
        <meshStandardMaterial {...mats.glow} toneMapped={false} />
      </mesh>
      {texture && (
        <mesh position={[0, 0, 0.026]}>
          <planeGeometry args={[0.9, 0.45]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      )}
    </group>
  );
}

function Eye({ position }: { position: [number, number, number] }) {
  const lid = useRef<Mesh>(null);
  const reduced = useReducedMotion() === true;

  useFrame(({ clock }) => {
    if (!lid.current || reduced) return;
    const t = clock.getElapsedTime();
    const blink = (Math.sin(t * 0.7) + 1) / 2;
    const closed = blink > 0.965 ? 0.12 : 1;
    lid.current.scale.y += (closed - lid.current.scale.y) * 0.35;
  });

  return (
    <group position={position}>
      <mesh position={[0, 0, -0.02]}>
        <sphereGeometry args={[0.13, 24, 24]} />
        <meshStandardMaterial color="#021018" metalness={0.5} roughness={0.25} />
      </mesh>
      <mesh ref={lid}>
        <sphereGeometry args={[0.11, 24, 24]} />
        <meshStandardMaterial
          color={GLOW}
          emissive={GLOW_HOT}
          emissiveIntensity={3.6}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[-0.03, 0.035, 0.08]}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.9} />
      </mesh>
    </group>
  );
}

function Hand({ side }: { side: 1 | -1 }) {
  const mats = useRobotMaterials();
  return (
    <group rotation={[0.15, 0, side * 0.15]}>
      <mesh>
        <sphereGeometry args={[0.12, 20, 20]} />
        <meshStandardMaterial {...mats.palm} />
      </mesh>
      {[-0.07, -0.025, 0.025, 0.07].map((x, i) => (
        <mesh key={i} position={[x, -0.12, 0.02]} rotation={[0.4, 0, 0]}>
          <capsuleGeometry args={[0.022, 0.07, 4, 8]} />
          <meshStandardMaterial {...mats.shell} />
        </mesh>
      ))}
    </group>
  );
}

function Arm({
  side,
  armRef,
  welcomeText,
}: {
  side: 1 | -1;
  armRef?: Ref<Group>;
  welcomeText?: string;
}) {
  const mats = useRobotMaterials();
  const holding = side === -1;
  const restZ = holding ? 0.58 : -0.82;
  const restX = holding ? 0.58 : 0.12;
  return (
    <group ref={armRef} position={[side * 0.58, 0.22, 0.08]} rotation={[restX, holding ? 0.2 : 0, restZ]}>
      <mesh>
        <sphereGeometry args={[0.14, 20, 20]} />
        <meshStandardMaterial {...mats.joint} />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshStandardMaterial {...mats.glow} toneMapped={false} />
      </mesh>
      <mesh position={[0, -0.22, 0]}>
        <capsuleGeometry args={[0.09, 0.22, 6, 12]} />
        <meshStandardMaterial {...mats.shell} />
      </mesh>
      <mesh position={[0, -0.42, 0]}>
        <sphereGeometry args={[0.1, 18, 18]} />
        <meshStandardMaterial {...mats.joint} />
      </mesh>
      <mesh position={[0, -0.62, 0]}>
        <capsuleGeometry args={[0.08, 0.2, 6, 12]} />
        <meshStandardMaterial {...mats.shell} />
      </mesh>
      <group position={[0, -0.82, 0]}>
        <Hand side={side} />
        {holding && welcomeText ? <WelcomeSign text={welcomeText} /> : null}
      </group>
    </group>
  );
}

function Leg({
  side,
  legRef,
}: {
  side: 1 | -1;
  legRef?: Ref<Group>;
}) {
  const mats = useRobotMaterials();
  return (
    <group ref={legRef} position={[side * 0.2, -0.72, 0.02]} rotation={[0.06, 0, side * 0.04]}>
      <mesh>
        <sphereGeometry args={[0.11, 18, 18]} />
        <meshStandardMaterial {...mats.joint} />
      </mesh>
      <mesh position={[0, -0.2, 0]}>
        <capsuleGeometry args={[0.09, 0.16, 6, 12]} />
        <meshStandardMaterial {...mats.shell} />
      </mesh>
      <mesh position={[0, -0.36, 0]}>
        <sphereGeometry args={[0.1, 18, 18]} />
        <meshStandardMaterial {...mats.joint} />
      </mesh>
      <mesh position={[0, -0.54, 0]}>
        <capsuleGeometry args={[0.085, 0.16, 6, 12]} />
        <meshStandardMaterial {...mats.shell} />
      </mesh>
      <mesh position={[0, -0.72, 0.04]} rotation={[0.12, 0, 0]}>
        <capsuleGeometry args={[0.12, 0.08, 6, 12]} />
        <meshStandardMaterial {...mats.accent} />
      </mesh>
      <mesh position={[0, -0.72, 0.12]}>
        <sphereGeometry args={[0.035, 10, 10]} />
        <meshStandardMaterial {...mats.glow} toneMapped={false} />
      </mesh>
    </group>
  );
}

export default function Robot({
  scale = 1,
  reducedMotion,
  welcomeText = "Welcome to Panacea",
}: RobotProps) {
  const prefersReduced = useReducedMotion() === true;
  const still = reducedMotion ?? prefersReduced;

  const root = useRef<Group>(null);
  const body = useRef<Group>(null);
  const head = useRef<Group>(null);
  const leftArm = useRef<Group>(null);
  const rightArm = useRef<Group>(null);
  const leftLeg = useRef<Group>(null);
  const rightLeg = useRef<Group>(null);
  const antenna = useRef<Group>(null);
  const core = useRef<Mesh>(null);
  const halo = useRef<Mesh>(null);

  const mats = useRobotMaterials();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!root.current) return;

    const restY = 0.08;
    if (still) {
      root.current.position.set(0, restY, 0);
      root.current.rotation.set(0.02, 0.18, 0);
      return;
    }

    const bounce = Math.abs(Math.sin(t * 1.85));
    const step = Math.sin(t * 1.85);
    const sway = Math.sin(t * 1.12);
    const slow = Math.sin(t * 0.62);
    const swing = Math.sin(t * 2.05);

    root.current.position.y = restY + bounce * 0.04 + slow * 0.01;
    root.current.position.x = sway * 0.05;
    root.current.rotation.y = 0.18 + sway * 0.1 + slow * 0.03;
    root.current.rotation.z = sway * 0.055;
    root.current.rotation.x = 0.02 + Math.sin(t * 1.28) * 0.02;

    if (body.current) {
      body.current.rotation.z = sway * 0.08;
      body.current.rotation.x = step * 0.03;
    }

    if (head.current) {
      head.current.rotation.y = Math.sin(t * 0.86) * 0.14;
      head.current.rotation.z = slow * 0.08 + sway * 0.04;
      head.current.rotation.x = Math.sin(t * 1.22) * 0.04;
    }

    // Right arm swings; left arm holds the welcome card with a tiny follow-through.
    if (rightArm.current) {
      rightArm.current.rotation.z = -0.82 + swing * 0.34;
      rightArm.current.rotation.x = 0.08 + swing * 0.48;
      rightArm.current.rotation.y = swing * 0.12;
    }
    if (leftArm.current) {
      leftArm.current.rotation.x = 0.58 + slow * 0.05;
      leftArm.current.rotation.z = 0.58 + sway * 0.045;
      leftArm.current.rotation.y = 0.2 + sway * 0.03;
    }

    if (leftLeg.current) {
      leftLeg.current.rotation.x = 0.06 + step * 0.09;
      leftLeg.current.rotation.z = 0.04 + sway * 0.05;
    }
    if (rightLeg.current) {
      rightLeg.current.rotation.x = 0.06 - step * 0.09;
      rightLeg.current.rotation.z = -0.04 + sway * 0.05;
    }

    if (antenna.current) {
      antenna.current.rotation.z = Math.sin(t * 0.9) * 0.12;
    }
    if (core.current) {
      core.current.scale.setScalar(1 + Math.sin(t * 2.4) * 0.08);
    }
    if (halo.current) {
      halo.current.rotation.z = t * 0.35;
    }
  });

  return (
    <group ref={root} scale={scale} position={[0, 0.08, 0]}>
      <group ref={body} position={[0, 0.05, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.58, 32, 32]} />
          <meshStandardMaterial {...mats.shell} />
        </mesh>
        <mesh scale={[1, 1.12, 0.92]} position={[0, -0.08, 0]} castShadow>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial {...mats.shell} />
        </mesh>

        <mesh position={[0.42, 0.12, 0.22]} rotation={[0, 0.5, 0.15]}>
          <boxGeometry args={[0.05, 0.2, 0.03]} />
          <meshStandardMaterial {...mats.glow} toneMapped={false} />
        </mesh>
        <mesh position={[-0.42, 0.12, 0.22]} rotation={[0, -0.5, -0.15]}>
          <boxGeometry args={[0.05, 0.2, 0.03]} />
          <meshStandardMaterial {...mats.glow} toneMapped={false} />
        </mesh>

        <mesh position={[0.46, 0.36, 0.04]} rotation={[0, 0, -0.55]} scale={[1, 0.55, 0.85]}>
          <sphereGeometry args={[0.2, 18, 18]} />
          <meshStandardMaterial {...mats.accent} />
        </mesh>
        <mesh position={[-0.46, 0.36, 0.04]} rotation={[0, 0, 0.55]} scale={[1, 0.55, 0.85]}>
          <sphereGeometry args={[0.2, 18, 18]} />
          <meshStandardMaterial {...mats.accent} />
        </mesh>

        <mesh position={[0, 0.08, 0.46]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.18, 0.025, 12, 28]} />
          <meshStandardMaterial {...mats.joint} />
        </mesh>
        <mesh position={[0, 0.08, 0.47]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.12, 0.016, 10, 24]} />
          <meshStandardMaterial {...mats.halo} toneMapped={false} />
        </mesh>
        <mesh ref={core} position={[0, 0.08, 0.5]}>
          <sphereGeometry args={[0.12, 24, 24]} />
          <meshStandardMaterial {...mats.glow} toneMapped={false} />
        </mesh>

        <mesh position={[0, 0.58, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.16, 0.03, 8, 20]} />
          <meshStandardMaterial {...mats.accent} />
        </mesh>

        <Arm side={-1} armRef={leftArm} welcomeText={welcomeText} />
        <Arm side={1} armRef={rightArm} />
        <Leg side={-1} legRef={leftLeg} />
        <Leg side={1} legRef={rightLeg} />
      </group>

      <group ref={head} position={[0, 0.92, 0.04]}>
        <mesh ref={halo} position={[0, 0.06, -0.06]} rotation={[1.15, 0, 0]}>
          <torusGeometry args={[0.56, 0.016, 8, 40]} />
          <meshStandardMaterial {...mats.halo} toneMapped={false} />
        </mesh>

        <mesh castShadow scale={[1.18, 1, 1]}>
          <sphereGeometry args={[0.48, 36, 36]} />
          <meshStandardMaterial {...mats.shell} />
        </mesh>

        <mesh position={[0, -0.02, 0.28]} scale={[0.9, 0.72, 0.42]}>
          <sphereGeometry args={[0.38, 28, 28]} />
          <meshStandardMaterial {...mats.visor} />
        </mesh>
        <mesh position={[0, 0.16, 0.43]} scale={[1.05, 0.12, 0.18]}>
          <boxGeometry args={[0.42, 0.08, 0.08]} />
          <meshStandardMaterial {...mats.glow} toneMapped={false} />
        </mesh>

        <Eye position={[-0.16, 0.04, 0.42]} />
        <Eye position={[0.16, 0.04, 0.42]} />

        <mesh position={[0, -0.14, 0.5]} rotation={[0.2, 0, Math.PI]}>
          <torusGeometry args={[0.11, 0.016, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#031422" roughness={0.4} />
        </mesh>

        <mesh position={[-0.5, 0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.12, 0.1, 6, 12]} />
          <meshStandardMaterial {...mats.accent} />
        </mesh>
        <mesh position={[0.5, 0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.12, 0.1, 6, 12]} />
          <meshStandardMaterial {...mats.accent} />
        </mesh>
        <mesh position={[-0.58, 0.02, 0.04]}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshStandardMaterial {...mats.glow} toneMapped={false} />
        </mesh>
        <mesh position={[0.58, 0.02, 0.04]}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshStandardMaterial {...mats.glow} toneMapped={false} />
        </mesh>

        <group ref={antenna} position={[0, 0.5, 0]}>
          <mesh>
            <cylinderGeometry args={[0.022, 0.032, 0.26, 12]} />
            <meshStandardMaterial {...mats.shell} />
          </mesh>
          <mesh position={[0, 0.18, 0]}>
            <sphereGeometry args={[0.075, 16, 16]} />
            <meshStandardMaterial {...mats.glow} toneMapped={false} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
