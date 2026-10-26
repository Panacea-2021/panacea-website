"use client";

import { useCallback, useRef, type MouseEvent } from "react";
import { MotionValue, useMotionValue, useSpring } from "framer-motion";

const SPRING = { stiffness: 160, damping: 22, mass: 0.4 } as const;

export function usePointerParallax(enabled: boolean): {
  px: MotionValue<number>;
  py: MotionValue<number>;
  onMove: (event: MouseEvent<HTMLElement>) => void;
  onLeave: () => void;
} {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const px = useSpring(rawX, SPRING);
  const py = useSpring(rawY, SPRING);
  const frame = useRef<HTMLElement | null>(null);

  const onMove = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (!enabled) return;
      const node = event.currentTarget;
      frame.current = node;
      const rect = node.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;
      rawX.set(nx);
      rawY.set(ny);
    },
    [enabled, rawX, rawY]
  );

  const onLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return { px, py, onMove, onLeave };
}
