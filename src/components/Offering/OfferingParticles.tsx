"use client";

import { useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";

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

/**
 * Lightweight 2.5D particle field (canvas). Depth is projected in software
 * so we avoid a second WebGL context alongside the Three.js ring.
 */
export default function OfferingParticles() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const kickRef = useRef<(() => void) | null>(null);
  const inView = useInView(wrapRef, { margin: "80px" });
  const reduced = useReducedMotion() === true;
  const inViewRef = useRef(inView);
  const reducedRef = useRef(reduced);
  inViewRef.current = inView;
  reducedRef.current = reduced;

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
    const focal = 420;

    const seed = () => {
      const area = w * h;
      const count = Math.max(28, Math.min(86, Math.floor(area / 14000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 280 - 40,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.14,
        vz: (Math.random() - 0.5) * 0.22,
        r: 0.8 + Math.random() * 1.8,
        tone: Math.random(),
      }));
    };

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

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      const animate = !reducedRef.current && inViewRef.current;

      for (const p of particles) {
        if (animate) {
          p.x += p.vx;
          p.y += p.vy;
          p.z += p.vz;
          if (p.x < -20) p.x = w + 20;
          if (p.x > w + 20) p.x = -20;
          if (p.y < -20) p.y = h + 20;
          if (p.y > h + 20) p.y = -20;
          if (p.z < -80 || p.z > 280) p.vz *= -1;
        }

        const scale = focal / (focal + p.z);
        const px = (p.x - w / 2) * scale + w / 2;
        const py = (p.y - h / 2) * scale + h / 2;
        const radius = Math.max(0.4, p.r * scale);
        const alpha = Math.max(0.08, Math.min(0.55, 0.5 * scale));
        const color =
          p.tone < 0.34
            ? `rgba(139, 92, 246, ${alpha})`
            : p.tone < 0.68
              ? `rgba(20, 184, 166, ${alpha})`
              : `rgba(226, 232, 240, ${alpha})`;

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle =
          p.tone < 0.5 ? `rgba(196, 181, 253, ${alpha * 0.35})` : `rgba(153, 246, 228, ${alpha * 0.3})`;
        ctx.arc(px, py, radius * 3.2, 0, Math.PI * 2);
        ctx.fill();
      }

      if (animate && document.visibilityState === "visible") {
        raf = window.requestAnimationFrame(draw);
      }
    };

    const kick = () => {
      cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(draw);
    };

    kickRef.current = kick;
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    document.addEventListener("visibilitychange", kick);
    kick();

    return () => {
      running = false;
      kickRef.current = null;
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", kick);
    };
  }, []);

  useEffect(() => {
    if (inView && !reduced) kickRef.current?.();
  }, [inView, reduced]);

  return (
    <div ref={wrapRef} style={{ width: "100%", height: "100%" }} aria-hidden>
      <canvas ref={canvasRef} />
    </div>
  );
}
