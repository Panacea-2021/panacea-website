"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** Node / line color */
  color?: string;
  /** Soft triangle fill tint */
  fill?: string;
};

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  pulse: number;
  glow: boolean;
};

/**
 * Dreamstime-style abstract geometric network / plexus background.
 * Full-card animation for product card 03.
 */
export default function GeometricNetworkBackground({
  color = "rgba(180, 255, 230, 0.9)",
  fill = "rgba(80, 220, 180, 0.08)",
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
    let nodes: Node[] = [];
    let bokeh: { x: number; y: number; r: number; a: number; s: number }[] = [];

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
      const count = Math.max(48, Math.floor((w * h) / 14000));
      nodes = Array.from({ length: count }, (_, i) => {
        // denser on the right like the reference
        const biasRight = Math.random() > 0.35;
        const x = biasRight
          ? w * (0.35 + Math.random() * 0.65)
          : Math.random() * w;
        return {
          x,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: 1.2 + Math.random() * 2.2,
          pulse: Math.random() * Math.PI * 2,
          glow: i % 7 === 0 || Math.random() > 0.82,
        };
      });

      bokeh = Array.from({ length: 18 }, () => ({
        x: w * (0.4 + Math.random() * 0.6),
        y: Math.random() * h,
        r: 8 + Math.random() * 28,
        a: 0.06 + Math.random() * 0.12,
        s: 0.008 + Math.random() * 0.015,
      }));
    };

    const withAlpha = (rgba: string, a: number) => {
      const m = rgba.match(
        /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)/
      );
      if (!m) return rgba;
      return `rgba(${m[1]}, ${m[2]}, ${m[3]}, ${a})`;
    };

    const tick = () => {
      if (!running) return;
      t += 1;
      ctx.clearRect(0, 0, w, h);

      // soft bokeh orbs
      for (const b of bokeh) {
        b.y += Math.sin(t * b.s + b.x) * 0.15;
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        g.addColorStop(0, withAlpha(color, b.a));
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // move nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.03;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      const linkDist = Math.min(160, Math.max(110, w * 0.12));
      const linkDist2 = linkDist * linkDist;

      // connections + triangle fills (sampled)
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const near: number[] = [];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < linkDist2) {
            near.push(j);
            const d = Math.sqrt(d2);
            ctx.strokeStyle = color;
            ctx.globalAlpha = (1 - d / linkDist) * 0.45;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        // occasional translucent triangle
        if (near.length >= 2 && i % 5 === 0) {
          const b = nodes[near[0]];
          const c = nodes[near[1]];
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.lineTo(c.x, c.y);
          ctx.closePath();
          ctx.fillStyle = fill;
          ctx.globalAlpha = 0.55 + Math.sin(t * 0.02 + i) * 0.15;
          ctx.fill();
        }
      }

      // nodes
      for (const n of nodes) {
        const pulse = 1 + Math.sin(n.pulse) * 0.25;
        if (n.glow) {
          const glowR = n.r * 8 * pulse;
          const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR);
          g.addColorStop(0, withAlpha(color, 0.35));
          g.addColorStop(0.4, withAlpha(color, 0.12));
          g.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = g;
          ctx.globalAlpha = 1;
          ctx.beginPath();
          ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
          ctx.fill();

          // concentric rings
          ctx.strokeStyle = color;
          ctx.globalAlpha = 0.25;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 4.5 * pulse, 0, Math.PI * 2);
          ctx.stroke();
          ctx.globalAlpha = 0.15;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 7 * pulse, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.85;
        ctx.shadowColor = color;
        ctx.shadowBlur = n.glow ? 12 : 4;
        ctx.arc(n.x, n.y, n.r * pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;

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
  }, [color, fill]);

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
