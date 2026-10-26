"use client";

import {
  MotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/** Snappy follow — live scroll in, spring only smooths the output */
const SPRING = { stiffness: 300, damping: 32, mass: 0.35 } as const;

/** Hold content at rest until this fraction of the receding segment */
const HOLD_UNTIL = 0.75;

export type CardTransformValues = {
  y: MotionValue<string>;
  scale: MotionValue<number>;
  opacity: MotionValue<number>;
  zIndex: number;
  activeStrength: MotionValue<number>;
};

type RawTransform = {
  yPercent: number;
  scale: number;
  opacity: number;
  activeStrength: number;
};

/**
 * Maps scroll progress → card transform.
 *
 * activeFloat = progress × (totalCards − 1)
 * relative    = activeFloat − index
 *
 * Waiting  (relative ≤ −1): parked at y 100% (fully below the stage)
 * Incoming (−1 → 0):        y 100% → 0% — slides up and covers the previous card
 * Active   (relative ≈ 0):  y 0, scale 1, content at rest
 * Receding (0 → 1):         stays at y 0; content holds until ~75%, then dims
 *                           as the next card's entrance covers it
 * Buried   (relative ≥ 1):  stays underneath (lower z-index by index)
 */
function computeTransform(relative: number, reduceMotion: boolean): RawTransform {
  if (reduceMotion) {
    const visible = Math.abs(relative) < 0.5;
    return {
      yPercent: visible ? 0 : relative < 0 ? 100 : 0,
      scale: 1,
      opacity: visible ? 1 : 0,
      activeStrength: visible ? 1 : 0,
    };
  }

  if (relative <= -1) {
    return { yPercent: 100, scale: 1, opacity: 1, activeStrength: 1 };
  }

  if (relative < 0) {
    const t = relative + 1;
    return {
      yPercent: (1 - t) * 100,
      scale: 0.985 + t * 0.015,
      opacity: 1,
      activeStrength: 1,
    };
  }

  if (relative < 1) {
    const outT = relative <= HOLD_UNTIL ? 0 : (relative - HOLD_UNTIL) / (1 - HOLD_UNTIL);
    return {
      yPercent: 0,
      scale: 1 - relative * 0.02,
      opacity: 1,
      activeStrength: 1 - outT * 0.35,
    };
  }

  return { yPercent: 0, scale: 0.98, opacity: 1, activeStrength: 0 };
}

export function useCardTransform(
  scrollProgress: MotionValue<number>,
  index: number,
  totalCards: number
): CardTransformValues {
  const reduceMotion = useReducedMotion() ?? false;

  const compute = (p: number): RawTransform => {
    const activeFloat = p * Math.max(totalCards - 1, 1);
    return computeTransform(activeFloat - index, reduceMotion);
  };

  const rawYPercent = useTransform(scrollProgress, (p) => compute(p).yPercent);
  const rawScale = useTransform(scrollProgress, (p) => compute(p).scale);
  const opacity = useTransform(scrollProgress, (p) => compute(p).opacity);
  const activeStrength = useTransform(scrollProgress, (p) => compute(p).activeStrength);

  const yPercent = useSpring(rawYPercent, SPRING);
  const scale = useSpring(rawScale, SPRING);
  const y = useTransform(yPercent, (v) => `${v}%`);

  return { y, scale, opacity, zIndex: 10 + index, activeStrength };
}

export function useActiveFloat(
  scrollProgress: MotionValue<number>,
  totalCards: number
): MotionValue<number> {
  return useTransform(scrollProgress, (p) => p * Math.max(totalCards - 1, 1));
}

export function useActiveIndex(
  scrollProgress: MotionValue<number>,
  totalCards: number
): MotionValue<number> {
  return useTransform(scrollProgress, (p) => {
    const activeFloat = p * Math.max(totalCards - 1, 1);
    return Math.min(Math.max(Math.round(activeFloat), 0), totalCards - 1);
  });
}
