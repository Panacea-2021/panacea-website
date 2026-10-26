"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  ox: number;
  oy: number;
  r: number;
  phase: number;
  speed: number;
};

type Props = {
  /** Particle / wave stroke color */
  color?: string;
  className?: string;
};

/**
 * Lightweight canvas background inspired by plexus / neural-wave hero cards:
 * flowing horizontal wave lines + glowing particle mesh.
 */
export default function ParticleWaveBackground({
  color = "rgba(255,255,255,0.85)",
  className = "",
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
    let particles: Particle[] = [];
    let w = 0;
    let h = 0;
    let t = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

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

    /** Head-profile-ish density + left wave field */
    const inHeadProfile = (x: number, y: number) => {
      const cx = w * 0.42;
      const cy = h * 0.48;
      const nx = (x - cx) / (w * 0.22);
      const ny = (y - cy) / (h * 0.38);
      // ellipse facing right
      const ellipse = nx * nx * 1.15 + ny * ny;
      // soften right edge to suggest face
      const faceCut = x > cx + w * 0.08 ? (x - (cx + w * 0.08)) / (w * 0.12) : 0;
      return ellipse < 1 - faceCut * 0.35;
    };

    const seed = () => {
      particles = [];
      const count = Math.min(140, Math.floor((w * h) / 4200));
      let attempts = 0;
      while (particles.length < count && attempts < count * 4) {
        attempts++;
        const x = Math.random() * w;
        const y = Math.random() * h;
        const bias = inHeadProfile(x, y) || Math.random() < 0.3;
        if (!bias && Math.random() > 0.4) continue;
        particles.push({
          x,
          y,
          ox: x,
          oy: y,
          r: Math.random() * 1.6 + 0.6,
          phase: Math.random() * Math.PI * 2,
          speed: 0.4 + Math.random() * 0.8,
        });
      }
    };

    const drawWaves = () => {
      const lines = 7;
      for (let i = 0; i < lines; i++) {
        const baseY = h * (0.22 + i * 0.08);
        const amp = 10 + i * 2.2;
        const freq = 0.012 + i * 0.0015;
        ctx.beginPath();
        for (let x = 0; x <= w * 0.55; x += 3) {
          const fade = 1 - x / (w * 0.55);
          const y =
            baseY +
            Math.sin(x * freq + t * 0.045 + i * 0.7) * amp * fade +
            Math.sin(x * freq * 1.7 - t * 0.03 + i) * (amp * 0.35) * fade;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.18 + i * 0.03;
        ctx.lineWidth = 1.2;
        ctx.shadowColor = color;
        ctx.shadowBlur = 8;
        ctx.stroke();
      }
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    };

    const drawParticles = () => {
      // update + dots
      for (const p of particles) {
        p.x = p.ox + Math.sin(t * 0.02 * p.speed + p.phase) * 6;
        p.y = p.oy + Math.cos(t * 0.016 * p.speed + p.phase) * 5;
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.globalAlpha = inHeadProfile(p.ox, p.oy) ? 0.75 : 0.35;
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // connections (plexus) — limited neighbors for performance
      const maxDist = Math.min(80, w * 0.07);
      ctx.lineWidth = 0.7;
      ctx.strokeStyle = color;
      for (let i = 0; i < particles.length; i++) {
        let links = 0;
        for (let j = i + 1; j < particles.length && links < 4; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < maxDist * maxDist) {
            const d = Math.sqrt(d2);
            ctx.globalAlpha = (1 - d / maxDist) * 0.28;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            links++;
          }
        }
      }
      ctx.globalAlpha = 1;
    };

    const tick = () => {
      if (!running) return;
      t += 1;
      ctx.clearRect(0, 0, w, h);
      drawWaves();
      drawParticles();
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
  }, [color]);

  return (
    <div
      ref={wrapRef}
      className={`pointer-events-none absolute inset-0 z-[1] overflow-hidden ${className}`}
      aria-hidden
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/* soft vignette so content stays readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/15" />
    </div>
  );
}
