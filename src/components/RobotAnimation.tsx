"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./RobotAnimation.module.css";

const RobotScene = dynamic(() => import("./Robot/RobotScene"), { ssr: false });

const STARS = [
  { id: "s1", x: -240, y: -210, delay: 0.02, size: 18, color: "#fbbf24", spin: 170 },
  { id: "s2", x: 280, y: -180, delay: 0.06, size: 15, color: "#7dd3fc", spin: -210 },
  { id: "s3", x: -160, y: -280, delay: 0.1, size: 13, color: "#ffffff", spin: 120 },
  { id: "s4", x: 320, y: -90, delay: 0.08, size: 17, color: "#f59e0b", spin: -150 },
  { id: "s5", x: -300, y: -40, delay: 0.14, size: 14, color: "#38bdf8", spin: 220 },
  { id: "s6", x: 140, y: -260, delay: 0.18, size: 11, color: "#fde68a", spin: -90 },
  { id: "s7", x: -80, y: -200, delay: 0.04, size: 16, color: "#a5f3fc", spin: 190 },
  { id: "s8", x: 220, y: 70, delay: 0.2, size: 12, color: "#fff7ed", spin: -230 },
  { id: "s9", x: -210, y: 90, delay: 0.24, size: 13, color: "#fcd34d", spin: 110 },
  { id: "s10", x: 60, y: -300, delay: 0.12, size: 14, color: "#67e8f9", spin: -160 },
  { id: "s11", x: 360, y: -40, delay: 0.28, size: 12, color: "#c084fc", spin: 200 },
  { id: "s12", x: -340, y: -130, delay: 0.16, size: 15, color: "#22d3ee", spin: -180 },
  { id: "s13", x: 190, y: -220, delay: 0.32, size: 10, color: "#fef9c3", spin: 140 },
  { id: "s14", x: -120, y: 40, delay: 0.22, size: 11, color: "#fb7185", spin: -120 },
] as const;

type RobotAnimationProps = {
  className?: string;
  scale?: number;
  welcomeText?: string;
};

function StarMark({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path
        fill={color}
        d="M12 2.1 14.7 8.6 21.8 9.2 16.5 14 18.2 21.1 12 17.6 5.8 21.1 7.5 14 2.2 9.2 9.3 8.6Z"
      />
    </svg>
  );
}

function ScreenStarBurst({ origin }: { origin: { x: number; y: number } }) {
  return createPortal(
    <div className={styles.screenStars} aria-hidden>
      {STARS.map((star) => (
        <motion.span
          key={star.id}
          className={styles.star}
          style={{
            width: star.size,
            height: star.size,
            left: origin.x,
            top: origin.y,
          }}
          initial={{ opacity: 0, x: 0, y: 0, scale: 0.2, rotate: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: star.x,
            y: star.y,
            scale: [0.2, 1.2, 0.7],
            rotate: star.spin,
          }}
          transition={{
            duration: 1.7,
            delay: star.delay,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <StarMark color={star.color} />
        </motion.span>
      ))}
    </div>,
    document.body,
  );
}

/**
 * Dancing futuristic robot that holds a welcome card and throws stars on mount.
 */
export default function RobotAnimation({
  className,
  scale = 1.02,
  welcomeText = "Welcome to Panacea",
}: RobotAnimationProps) {
  const reduced = useReducedMotion() === true;
  const wrapRef = useRef<HTMLDivElement>(null);
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);

  useLayoutEffect(() => {
    const node = wrapRef.current;
    if (!node || reduced) return undefined;
    const box = node.getBoundingClientRect();
    setOrigin({ x: box.left + box.width * 0.58, y: box.top + box.height * 0.34 });
    return undefined;
  }, [reduced]);

  return (
    <div ref={wrapRef} className={`${styles.wrap} ${className ?? ""}`.trim()} aria-hidden>
      <span className={styles.glow} />
      {origin && !reduced ? <ScreenStarBurst origin={origin} /> : null}
      <div className={styles.bob}>
        <RobotScene className={styles.canvas} scale={scale} welcomeText={welcomeText} />
      </div>
    </div>
  );
}
