"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  BarChart3,
  Users,
  Hourglass,
  TrendingUp,
  HandCoins,
} from "lucide-react";

type Props = {
  color?: string;
  /** When false, only the particle sphere renders (no hex icon overlays) */
  showHexIcons?: boolean;
};

type Point3 = { x: number; y: number; z: number; ox: number; oy: number; oz: number };

const hexIcons = [
  { Icon: BarChart3, label: "Analytics", x: "8%", y: "58%" },
  { Icon: Users, label: "Community", x: "28%", y: "68%" },
  { Icon: Hourglass, label: "Time", x: "46%", y: "74%" },
  { Icon: TrendingUp, label: "Growth", x: "62%", y: "62%" },
  { Icon: HandCoins, label: "Value", x: "78%", y: "52%" },
];

/**
 * PYTIA-style glowing particle sphere + floating hexagonal icons.
 * Used only on the first product card visual.
 */
export default function ParticleSphereShowcase({
  color = "rgba(200, 240, 255, 0.95)",
  showHexIcons = true,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;

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
    let points: Point3[] = [];
    let trails: { a: number; speed: number; amp: number; phase: number }[] = [];

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
      points = [];
      const n = 420;
      // Fibonacci sphere
      const golden = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < n; i++) {
        const y = 1 - (i / (n - 1)) * 2;
        const radius = Math.sqrt(1 - y * y);
        const theta = golden * i;
        const x = Math.cos(theta) * radius;
        const z = Math.sin(theta) * radius;
        points.push({ x, y, z, ox: x, oy: y, oz: z });
      }
      trails = Array.from({ length: 10 }, (_, i) => ({
        a: (i / 10) * Math.PI * 2,
        speed: 0.008 + (i % 3) * 0.003,
        amp: 0.55 + (i % 4) * 0.08,
        phase: i * 0.7,
      }));
    };

    const project = (p: Point3, rotY: number, rotX: number, scale: number) => {
      // rotate Y
      let x = p.x * Math.cos(rotY) - p.z * Math.sin(rotY);
      let z = p.x * Math.sin(rotY) + p.z * Math.cos(rotY);
      let y = p.y;
      // rotate X
      const y2 = y * Math.cos(rotX) - z * Math.sin(rotX);
      const z2 = y * Math.sin(rotX) + z * Math.cos(rotX);
      y = y2;
      z = z2;
      const depth = z + 2.2;
      const f = scale / depth;
      return {
        sx: w * 0.48 + x * f,
        sy: h * 0.42 + y * f,
        z,
        alpha: Math.max(0.15, Math.min(1, (z + 1.2) / 2.2)),
      };
    };

    const drawTrails = (rotY: number, scale: number) => {
      for (const tr of trails) {
        ctx.beginPath();
        let first = true;
        for (let s = 0; s < 36; s++) {
          const u = s / 35;
          const ang = tr.a + t * tr.speed + u * 1.4 + tr.phase;
          const r = tr.amp + Math.sin(t * 0.03 + tr.phase + u * 4) * 0.08;
          const y = -0.9 + u * 1.8 + Math.sin(ang * 2) * 0.12;
          const x = Math.cos(ang) * r * (0.7 + Math.abs(y) * 0.35);
          const z = Math.sin(ang) * r * (0.7 + Math.abs(y) * 0.35);
          const pr = project({ x, y, z, ox: x, oy: y, oz: z }, rotY, 0.25, scale);
          if (first) {
            ctx.moveTo(pr.sx, pr.sy);
            first = false;
          } else {
            ctx.lineTo(pr.sx, pr.sy);
          }
        }
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.22;
        ctx.lineWidth = 1.4;
        ctx.shadowColor = color;
        ctx.shadowBlur = 12;
        ctx.stroke();
      }
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    };

    const drawSphere = (rotY: number, rotX: number, scale: number) => {
      // soft core glow
      const g = ctx.createRadialGradient(
        w * 0.48,
        h * 0.42,
        scale * 0.05,
        w * 0.48,
        h * 0.42,
        scale * 0.85
      );
      g.addColorStop(0, "rgba(180, 230, 255, 0.28)");
      g.addColorStop(0.55, "rgba(120, 200, 255, 0.08)");
      g.addColorStop(1, "rgba(120, 200, 255, 0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(w * 0.48, h * 0.42, scale * 0.85, 0, Math.PI * 2);
      ctx.fill();

      const projected = points
        .map((p) => {
          // subtle breathe
          const breathe = 1 + Math.sin(t * 0.02 + p.oy * 3) * 0.03;
          return project(
            {
              x: p.ox * breathe,
              y: p.oy * breathe,
              z: p.oz * breathe,
              ox: p.ox,
              oy: p.oy,
              oz: p.oz,
            },
            rotY,
            rotX,
            scale
          );
        })
        .sort((a, b) => a.z - b.z);

      // connections for nearby points (sampled)
      ctx.lineWidth = 0.6;
      for (let i = 0; i < projected.length; i += 3) {
        let links = 0;
        for (let j = i + 1; j < projected.length && links < 3; j += 2) {
          const a = projected[i];
          const b = projected[j];
          const dx = a.sx - b.sx;
          const dy = a.sy - b.sy;
          const d2 = dx * dx + dy * dy;
          if (d2 < 900) {
            ctx.globalAlpha = (1 - Math.sqrt(d2) / 30) * 0.18 * a.alpha;
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.moveTo(a.sx, a.sy);
            ctx.lineTo(b.sx, b.sy);
            ctx.stroke();
            links++;
          }
        }
      }

      for (const p of projected) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.35 + p.alpha * 0.55;
        ctx.shadowColor = color;
        ctx.shadowBlur = 6;
        ctx.arc(p.sx, p.sy, 1.1 + p.alpha * 1.1, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    };

    const tick = () => {
      if (!running) return;
      t += reduceMotion ? 0 : 1;
      ctx.clearRect(0, 0, w, h);
      const scale = Math.min(w, h) * 0.38;
      const rotY = t * 0.008;
      const rotX = 0.35 + Math.sin(t * 0.01) * 0.08;
      drawTrails(rotY, scale);
      drawSphere(rotY, rotX, scale);
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
  }, [color, reduceMotion]);

  return (
    <div
      ref={wrapRef}
      className="relative w-full h-full min-h-[240px] md:min-h-0 overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Floating hexagonal icons */}
      {showHexIcons &&
        hexIcons.map(({ Icon, label, x, y }, i) => (
        <motion.div
          key={label}
          className="absolute z-10"
          style={{ left: x, top: y }}
          initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.85 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.25 + i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            animate={
              reduceMotion
                ? undefined
                : {
                    y: [0, -7 - (i % 3) * 2, 0],
                    rotate: [0, i % 2 === 0 ? 3 : -3, 0],
                  }
            }
            transition={{
              duration: 3.2 + i * 0.25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
            className="relative -translate-x-1/2 -translate-y-1/2"
            title={label}
          >
            <div
              className="w-11 h-12 md:w-12 md:h-[52px] flex items-center justify-center"
              style={{
                clipPath:
                  "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
                background: "rgba(255,255,255,0.12)",
                boxShadow: `0 0 18px ${color}`,
                border: "1px solid rgba(255,255,255,0.55)",
              }}
            >
              <div
                className="w-[calc(100%-3px)] h-[calc(100%-3px)] flex items-center justify-center"
                style={{
                  clipPath:
                    "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
                  background: "rgba(8, 30, 55, 0.35)",
                }}
              >
                <Icon className="w-4 h-4 md:w-[18px] md:h-[18px] text-white drop-shadow" strokeWidth={1.75} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
