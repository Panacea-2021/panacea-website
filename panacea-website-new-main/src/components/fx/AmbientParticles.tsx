"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  r: number;
  tone: number;
};

type Props = {
  className?: string;
};

/**
 * Lightweight 2.5D particle field. Depth is projected in software so this
 * can sit beside a single Three.js canvas without a second WebGL context.
 */
export default function AmbientParticles({ className }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inView = useInView(wrapRef, { margin: "80px" });
  const reduced = useReducedMotion() === true;

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let w = 0;
    let h = 0;
    let particles: Particle[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const focal = 430;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const seed = () => {
      const area = w * h;
      const count = Math.max(24, Math.min(72, Math.floor(area / 16000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 260 - 30,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.12,
        vz: (Math.random() - 0.5) * 0.18,
        r: 0.7 + Math.random() * 1.7,
        tone: Math.random(),
      }));
    };

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        if (!reduced && inView) {
          p.x += p.vx;
          p.y += p.vy;
          p.z += p.vz;
          if (p.x < -18) p.x = w + 18;
          if (p.x > w + 18) p.x = -18;
          if (p.y < -18) p.y = h + 18;
          if (p.y > h + 18) p.y = -18;
          if (p.z < -70 || p.z > 260) p.vz *= -1;
        }

        const scale = focal / (focal + p.z);
        const px = (p.x - w / 2) * scale + w / 2;
        const py = (p.y - h / 2) * scale + h / 2;
        const radius = Math.max(0.35, p.r * scale);
        const alpha = Math.max(0.07, Math.min(0.5, 0.46 * scale));
        const color =
          p.tone < 0.33
            ? `rgba(167, 139, 250, ${alpha})`
            : p.tone < 0.66
              ? `rgba(34, 211, 238, ${alpha})`
              : `rgba(248, 250, 252, ${alpha})`;

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle =
          p.tone < 0.5
            ? `rgba(196, 181, 253, ${alpha * 0.32})`
            : `rgba(165, 243, 252, ${alpha * 0.28})`;
        ctx.arc(px, py, radius * 3.1, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = window.requestAnimationFrame(draw);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const onVisibility = () => {
      running = document.visibilityState === "visible";
      if (running) {
        cancelAnimationFrame(raf);
        raf = window.requestAnimationFrame(draw);
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    raf = window.requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [inView, reduced]);

  return (
    <div ref={wrapRef} className={className} aria-hidden>
      <canvas ref={canvasRef} />
    </div>
  );
}
