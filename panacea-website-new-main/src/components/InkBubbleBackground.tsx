"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** Primary ink tint */
  ink?: string;
  /** Bubble highlight tint */
  bubble?: string;
};

type Blob = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  phase: number;
};

type Bubble = {
  x: number;
  y: number;
  r: number;
  speed: number;
  wobble: number;
  phase: number;
};

type Mote = {
  x: number;
  y: number;
  r: number;
  speed: number;
  drift: number;
};

/**
 * Coventic-style fluid ink plume + floating bubbles background.
 * Used behind the 2nd product card collage (text/images unchanged).
 */
export default function InkBubbleBackground({
  ink = "rgba(180, 140, 255, 0.55)",
  bubble = "rgba(210, 230, 255, 0.55)",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let w = 0;
    let h = 0;
    let t = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let blobs: Blob[] = [];
    let bubbles: Bubble[] = [];
    let motes: Mote[] = [];

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
      const base = Math.min(w, h);
      blobs = [
        { x: w * 0.35, y: h * 0.45, r: base * 0.32, vx: 0.15, vy: -0.08, phase: 0 },
        { x: w * 0.55, y: h * 0.4, r: base * 0.28, vx: -0.1, vy: 0.12, phase: 1.2 },
        { x: w * 0.7, y: h * 0.55, r: base * 0.24, vx: 0.08, vy: 0.1, phase: 2.1 },
        { x: w * 0.25, y: h * 0.6, r: base * 0.2, vx: -0.12, vy: -0.06, phase: 3.4 },
        { x: w * 0.48, y: h * 0.28, r: base * 0.18, vx: 0.05, vy: 0.14, phase: 4.5 },
        { x: w * 0.78, y: h * 0.35, r: base * 0.16, vx: -0.07, vy: 0.09, phase: 5.2 },
        { x: w * 0.18, y: h * 0.32, r: base * 0.15, vx: 0.09, vy: 0.07, phase: 6.1 },
      ];

      bubbles = Array.from({ length: 22 }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 6 + Math.random() * 26,
        speed: 0.25 + Math.random() * 0.55,
        wobble: 0.4 + Math.random() * 0.8,
        phase: Math.random() * Math.PI * 2 + i,
      }));

      motes = Array.from({ length: 80 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.6 + Math.random() * 1.6,
        speed: 0.15 + Math.random() * 0.35,
        drift: (Math.random() - 0.5) * 0.25,
      }));
    };

    const withAlpha = (rgba: string, a: number) => {
      const m = rgba.match(
        /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)/
      );
      if (!m) return rgba;
      return `rgba(${m[1]}, ${m[2]}, ${m[3]}, ${a})`;
    };

    const drawInk = () => {
      for (const b of blobs) {
        b.phase += 0.01;
        b.x += Math.sin(t * 0.012 + b.phase) * b.vx;
        b.y += Math.cos(t * 0.01 + b.phase) * b.vy;
        // soft drift toward a roaming center across full card
        const cx = w * (0.35 + 0.3 * Math.sin(t * 0.004 + b.phase));
        const cy = h * (0.4 + 0.2 * Math.cos(t * 0.003 + b.phase));
        b.x += (cx - b.x) * 0.003;
        b.y += (cy - b.y) * 0.003;

        const pulse = 1 + Math.sin(t * 0.02 + b.phase) * 0.08;
        const radius = b.r * pulse;
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, radius);
        g.addColorStop(0, ink);
        g.addColorStop(0.45, withAlpha(ink, 0.28));
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(b.x, b.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawBubble = (b: Bubble) => {
      b.y -= b.speed;
      b.x += Math.sin(t * 0.03 + b.phase) * b.wobble * 0.35;
      if (b.y + b.r < -10) {
        b.y = h + b.r + Math.random() * 40;
        b.x = Math.random() * w;
      }

      // glass sphere
      const g = ctx.createRadialGradient(
        b.x - b.r * 0.3,
        b.y - b.r * 0.35,
        b.r * 0.1,
        b.x,
        b.y,
        b.r
      );
      g.addColorStop(0, "rgba(255,255,255,0.55)");
      g.addColorStop(0.35, bubble);
      g.addColorStop(0.85, withAlpha(bubble, 0.12));
      g.addColorStop(1, "rgba(255,255,255,0.05)");

      ctx.beginPath();
      ctx.fillStyle = g;
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.strokeStyle = "rgba(255,255,255,0.35)";
      ctx.lineWidth = 1;
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.stroke();

      // highlight
      ctx.beginPath();
      ctx.fillStyle = "rgba(255,255,255,0.55)";
      ctx.ellipse(
        b.x - b.r * 0.28,
        b.y - b.r * 0.32,
        b.r * 0.22,
        b.r * 0.14,
        -0.5,
        0,
        Math.PI * 2
      );
      ctx.fill();
    };

    const drawMotes = () => {
      ctx.fillStyle = "rgba(255,255,255,0.45)";
      for (const m of motes) {
        m.y -= m.speed;
        m.x += m.drift;
        if (m.y < -4) {
          m.y = h + 4;
          m.x = Math.random() * w;
        }
        ctx.globalAlpha = 0.25 + (Math.sin(t * 0.04 + m.x) + 1) * 0.2;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const tick = () => {
      if (!running) return;
      t += 1;
      ctx.clearRect(0, 0, w, h);
      drawInk();
      drawMotes();
      for (const b of bubbles) drawBubble(b);
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
        if (running) {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.05 }
    );
    io.observe(wrap);

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();
    raf = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [ink, bubble]);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
