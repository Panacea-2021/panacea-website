"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import styles from "./OurStory.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

export type MetricAccent = "blue" | "violet" | "pink" | "teal" | "orange";
export type MetricId = "years" | "projects" | "iso" | "offices";

export type StoryMetric = {
  id: MetricId;
  icon: LucideIcon;
  value?: number;
  suffix?: string;
  display?: string;
  label: string;
  accent: MetricAccent;
};

const accentClass: Record<MetricAccent, string> = {
  blue: styles.metricBlue,
  violet: styles.metricViolet,
  pink: styles.metricPink,
  teal: styles.metricTeal,
  orange: styles.metricOrange,
};

function CountValue({
  value,
  suffix,
  display,
  visible,
  reduced,
}: {
  value?: number;
  suffix?: string;
  display?: string;
  visible: boolean;
  reduced: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: value && value > 200 ? 52 : 70,
    damping: 22,
    mass: 0.6,
  });

  useEffect(() => {
    if (display != null || value == null) return;
    const formatted = (n: number) =>
      `${Math.round(n).toLocaleString("en-US")}${suffix ?? ""}`;

    if (reduced) {
      motionValue.set(value);
      if (ref.current) ref.current.textContent = formatted(value);
      return;
    }
    if (visible) motionValue.set(value);
  }, [display, motionValue, reduced, suffix, value, visible]);

  useEffect(() => {
    if (display != null || value == null) return;
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${Math.round(latest).toLocaleString("en-US")}${suffix ?? ""}`;
      }
    });
  }, [display, springValue, suffix, value]);

  if (display) return <span className={styles.metricValue}>{display}</span>;

  const finalLabel = `${value?.toLocaleString("en-US") ?? 0}${suffix ?? ""}`;

  return (
    <span className={styles.metricValue} aria-label={finalLabel}>
      <span ref={ref} aria-hidden>
        {reduced ? finalLabel : `0${suffix ?? ""}`}
      </span>
    </span>
  );
}

type StoryMetricCardProps = {
  metric: StoryMetric;
  index: number;
  visible: boolean;
  reduced: boolean;
  active: boolean;
  onSelect: () => void;
};

export default function StoryMetricCard({
  metric,
  index,
  visible,
  reduced,
  active,
  onSelect,
}: StoryMetricCardProps) {
  const Icon = metric.icon;

  return (
    <motion.li
      className={`${styles.metric} ${accentClass[metric.accent]} ${active ? styles.metricActive : ""}`}
      initial={reduced ? false : { opacity: 0, y: 12, filter: "blur(6px)" }}
      animate={
        visible || reduced
          ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
          : { opacity: 0, y: 12, scale: 1, filter: "blur(6px)" }
      }
      whileHover={reduced ? undefined : { scale: 1.025 }}
      whileFocus={reduced ? undefined : { scale: 1.025 }}
      transition={{
        duration: 0.42,
        delay: reduced ? 0 : 0.32 + index * 0.08,
        ease,
        scale: { duration: 0.24, delay: 0, ease },
      }}
      role="button"
      aria-pressed={active}
      aria-label={`${metric.display ?? `${metric.value?.toLocaleString("en-US") ?? ""}${metric.suffix ?? ""}`} ${metric.label}`}
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      }}
    >
      <span className={styles.metricIcon} aria-hidden>
        <Icon size={13} strokeWidth={1.85} />
      </span>
      <CountValue
        value={metric.value}
        suffix={metric.suffix}
        display={metric.display}
        visible={visible}
        reduced={reduced}
      />
      <span className={styles.metricLabel}>{metric.label}</span>
    </motion.li>
  );
}
