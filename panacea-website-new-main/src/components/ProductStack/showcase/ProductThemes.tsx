"use client";

import { useEffect, useState, type ReactNode } from "react";
import { animate, useMotionValue, useTransform } from "framer-motion";
import type { ProductTheme } from "../productData";
import styles from "../showcase.module.css";

function Glass({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`rounded-xl bg-white/14 backdrop-blur-md border border-white/22 shadow-[0_10px_28px_rgba(0,0,0,0.22)] ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

function LiveNumber({
  to,
  active,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  to: number;
  active: boolean;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const value = useMotionValue(to * 0.86);
  const shown = useTransform(value, (v) => `${prefix}${v.toFixed(decimals)}${suffix}`);
  const [label, setLabel] = useState(`${prefix}${(to * 0.86).toFixed(decimals)}${suffix}`);

  useEffect(() => {
    const unsub = shown.on("change", setLabel);
    return unsub;
  }, [shown]);

  useEffect(() => {
    if (!active) return;
    const controls = animate(value, to, { duration: 3.2, ease: "easeOut" });
    return () => controls.stop();
  }, [active, to, value]);

  return <span>{label}</span>;
}

function Sparkline({
  color,
  className,
  active,
}: {
  color: string;
  className?: string;
  active?: boolean;
}) {
  return (
    <svg viewBox="0 0 120 36" className={className} fill="none" aria-hidden>
      <path
        className={active ? styles.drawLine : ""}
        d="M2 28 C18 26 22 10 38 14 C52 18 58 8 74 12 C88 16 96 6 118 8"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChildcareDevice({ active }: { active: boolean }) {
  return (
    <Glass className={`px-3 py-2.5 ${active ? styles.floatYSlow : ""}`}>
      <p className="text-[9px] uppercase tracking-[0.16em] text-white/65">Parent app</p>
      <p className="mt-0.5 text-[13px] font-semibold text-white leading-tight">
        Reading hour · 10:15
      </p>
      <div className="mt-2 flex items-center justify-between gap-3">
        <span className="text-[10px] text-white/70">Attendance</span>
        <span className="text-[12px] font-bold text-white">
          <LiveNumber to={98.4} active={active} suffix="%" decimals={1} />
        </span>
      </div>
    </Glass>
  );
}

function InfluencerDevice({ active }: { active: boolean }) {
  return (
    <div className="rounded-2xl bg-[#160c28]/82 backdrop-blur-xl border border-white/15 shadow-[0_18px_36px_rgba(0,0,0,0.38)] overflow-hidden">
      <div className="px-3 py-2 flex items-center justify-between border-b border-white/10">
        <span className="text-[9px] font-black tracking-[0.16em] text-violet-100">
          CREATORFLOW
        </span>
        <span className={`w-1.5 h-1.5 rounded-full bg-emerald-400 ${active ? styles.pulseSoft : ""}`} />
      </div>
      <div className="px-3 pt-2.5 pb-2 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-fuchsia-400 to-indigo-500 ring-2 ring-white/20" />
        <div>
          <p className="text-xs font-semibold text-white leading-tight">Maya Chen</p>
          <p className="text-[9px] text-white/60">Lifestyle · 12 campaigns</p>
        </div>
      </div>
      <div className="px-3 grid grid-cols-2 gap-1.5 pb-2">
        <div className="rounded-lg bg-white/8 px-2 py-1.5">
          <p className="text-[8px] uppercase tracking-wider text-white/55">Followers</p>
          <p className="text-xs font-bold text-white">
            <LiveNumber to={124.8} active={active} suffix="K" decimals={1} />
          </p>
        </div>
        <div className="rounded-lg bg-white/8 px-2 py-1.5">
          <p className="text-[8px] uppercase tracking-wider text-white/55">Engagement</p>
          <p className="text-xs font-bold text-emerald-300">
            <LiveNumber to={6.4} active={active} suffix="%" decimals={1} />
          </p>
        </div>
      </div>
      <div className="px-2.5 pb-2">
        <Sparkline color="#c4b5fd" className="w-full h-8" active={active} />
      </div>
    </div>
  );
}

function FundsDevice({ active }: { active: boolean }) {
  return (
    <Glass className={`px-3 py-2.5 ${active ? styles.floatY : ""}`}>
      <p className="text-[9px] uppercase tracking-[0.16em] text-white/65">Portfolio value</p>
      <p className="mt-0.5 text-[15px] font-bold text-white">
        $<LiveNumber to={4.82} active={active} suffix="L" decimals={2} />
      </p>
      <p className="mt-1 text-[11px] font-semibold text-emerald-200">
        SIP +<LiveNumber to={18.6} active={active} suffix="%" decimals={1} />
      </p>
    </Glass>
  );
}

function StocksDevice({ active }: { active: boolean }) {
  const tape = ["NIFTY 24,812", "RELIANCE +1.2%", "TCS +0.6%", "HDFC -0.3%"];
  return (
    <Glass className="overflow-hidden">
      <div className="overflow-hidden h-5 border-b border-white/10">
        <div
          className={`flex gap-4 px-2 text-[9px] font-semibold text-white/80 whitespace-nowrap ${active ? styles.ticker : ""}`}
        >
          {[...tape, ...tape].map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>
      <div className="px-3 py-2">
        <p className="text-[9px] uppercase tracking-[0.16em] text-white/65">NIFTY 50</p>
        <p className="text-sm font-bold text-emerald-200">+1.14%</p>
        <Sparkline color="#5eead4" className="w-full h-8 mt-1" active={active} />
      </div>
    </Glass>
  );
}

function CustomizeDevice({ active }: { active: boolean }) {
  return (
    <Glass className={`px-3 py-2.5 ${active ? styles.drift : ""}`}>
      <p className="text-[9px] uppercase tracking-[0.16em] text-white/65">Live preview</p>
      <p className="mt-0.5 text-[13px] font-semibold text-white">OMR · 100 questions</p>
      <div className="mt-2 flex gap-1.5">
        <span className={`w-3.5 h-3.5 rounded-full ring-1 ring-white/40 ${active ? styles.swatch : "bg-orange-400"}`} />
        <span className="w-3.5 h-3.5 rounded-full bg-sky-400 ring-1 ring-white/40" />
        <span className="w-3.5 h-3.5 rounded-full bg-violet-400 ring-1 ring-white/40" />
      </div>
    </Glass>
  );
}

export function ThemeDevice({
  theme,
  active,
}: {
  theme: ProductTheme;
  active: boolean;
}) {
  switch (theme) {
    case "childcare":
      return <ChildcareDevice active={active} />;
    case "influencer":
      return <InfluencerDevice active={active} />;
    case "funds":
      return <FundsDevice active={active} />;
    case "stocks":
      return <StocksDevice active={active} />;
    case "customize":
      return <CustomizeDevice active={active} />;
    default:
      return null;
  }
}
