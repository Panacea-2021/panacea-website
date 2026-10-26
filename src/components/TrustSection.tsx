"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Shield, Cpu, Activity, Globe, type LucideIcon } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import styles from "./TrustSection.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

type Feature = {
  key: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  side: "left" | "right";
  pos: "tl" | "bl" | "tr" | "br";
  accent: "blue" | "violet" | "pink" | "cyan";
};

const FEATURES: Feature[] = [
  {
    key: "iso",
    icon: Shield,
    title: "ISO & Compliance",
    desc: "Global security standards.",
    side: "left",
    pos: "tl",
    accent: "blue",
  },
  {
    key: "scale",
    icon: Cpu,
    title: "Scalable Architecture",
    desc: "Enterprise-ready growth.",
    side: "left",
    pos: "bl",
    accent: "violet",
  },
  {
    key: "perf",
    icon: Activity,
    title: "High Performance",
    desc: "Uptime & speed-focused.",
    side: "right",
    pos: "tr",
    accent: "pink",
  },
  {
    key: "partner",
    icon: Globe,
    title: "Digital Partner",
    desc: "Global 24/7 support.",
    side: "right",
    pos: "br",
    accent: "cyan",
  },
];

const METRICS = [
  { value: "99.9%", label: "Platform Reliability" },
  { value: "24/7", label: "Global Support" },
  { value: "10K+", label: "Users & Businesses" },
  { value: "Enterprise", label: "Ready Infrastructure" },
] as const;

const PARTICLES = [
  { top: "16%", left: "8%", size: 5, delay: "0s", dur: "18s", dx: "7px", dy: "-12px", color: "rgba(56,189,248,0.55)" },
  { top: "22%", left: "86%", size: 4, delay: "1.2s", dur: "21s", dx: "-8px", dy: "-10px", color: "rgba(129,140,248,0.5)" },
  { top: "64%", left: "6%", size: 3, delay: "0.7s", dur: "16s", dx: "6px", dy: "-14px", color: "rgba(251,113,133,0.45)" },
  { top: "72%", left: "90%", size: 6, delay: "2s", dur: "23s", dx: "-5px", dy: "-11px", color: "rgba(34,211,238,0.45)" },
  { top: "40%", left: "14%", size: 3, delay: "1.6s", dur: "19s", dx: "9px", dy: "-8px", color: "rgba(56,189,248,0.4)" },
  { top: "36%", left: "78%", size: 4, delay: "2.4s", dur: "17s", dx: "-7px", dy: "-13px", color: "rgba(129,140,248,0.4)" },
] as const;

const POS_CLASS: Record<Feature["pos"], string> = {
  tl: styles.cardTl,
  bl: styles.cardBl,
  tr: styles.cardTr,
  br: styles.cardBr,
};

const ACCENT_CLASS: Record<Feature["accent"], string> = {
  blue: styles.cardBlue,
  violet: styles.cardViolet,
  pink: styles.cardPink,
  cyan: styles.cardCyan,
};

function ConnectionLines({
  visible,
  reduced,
  cardRefs,
  imageRef,
}: {
  visible: boolean;
  reduced: boolean;
  cardRefs: React.MutableRefObject<(HTMLElement | null)[]>;
  imageRef: React.RefObject<HTMLDivElement | null>;
}) {
  const svgRef = useRef<SVGSVGElement>(null);

  const updatePaths = useCallback(() => {
    const svg = svgRef.current;
    const image = imageRef.current;
    if (!svg || !image) return;
    if (window.matchMedia("(max-width: 1023px)").matches) return;

    const container = svg.parentElement;
    if (!container) return;
    const cRect = container.getBoundingClientRect();
    const iRect = image.getBoundingClientRect();
    const iy = iRect.top + iRect.height / 2 - cRect.top;

    cardRefs.current.forEach((card, i) => {
      const path = svg.querySelector<SVGPathElement>(`#trust-path-${i}`);
      const nodeA = svg.querySelector<SVGCircleElement>(`#trust-node-a-${i}`);
      const nodeB = svg.querySelector<SVGCircleElement>(`#trust-node-b-${i}`);
      const motion = svg.querySelector<SVGElement>(`#trust-motion-${i}`);
      if (!card || !path) return;

      const aRect = card.getBoundingClientRect();
      const fromLeft = aRect.left + aRect.width / 2 < iRect.left + iRect.width / 2;
      const x1 = fromLeft
        ? aRect.right - cRect.left + 2
        : aRect.left - cRect.left - 2;
      const y1 = aRect.top + aRect.height / 2 - cRect.top;
      const x2 = fromLeft ? iRect.left - cRect.left - 2 : iRect.right - cRect.left + 2;
      const y2 = y1 * 0.62 + iy * 0.38;
      const isTop = y1 < iy;
      const bulgeX = fromLeft ? 18 : -18;
      const bulgeY = isTop ? -16 : 16;
      const d = `M ${x1.toFixed(1)} ${y1.toFixed(1)} C ${(x1 + bulgeX).toFixed(1)} ${(y1 + bulgeY).toFixed(1)}, ${(x2 - bulgeX).toFixed(1)} ${(y2 + bulgeY).toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}`;

      path.setAttribute("d", d);
      nodeA?.setAttribute("cx", String(x1));
      nodeA?.setAttribute("cy", String(y1));
      nodeB?.setAttribute("cx", String(x2));
      nodeB?.setAttribute("cy", String(y2));
      motion?.querySelector("mpath")?.setAttribute("href", `#trust-path-${i}`);
    });
  }, [cardRefs, imageRef]);

  useEffect(() => {
    updatePaths();
    const ro = new ResizeObserver(updatePaths);
    const container = svgRef.current?.parentElement;
    if (container) ro.observe(container);
    window.addEventListener("resize", updatePaths);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updatePaths);
    };
  }, [updatePaths, visible]);

  useEffect(() => {
    if (!visible) return;
    const t = window.setTimeout(updatePaths, 120);
    return () => window.clearTimeout(t);
  }, [visible, updatePaths]);

  return (
    <svg
      ref={svgRef}
      className={styles.connections}
      aria-hidden
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.7s ease" }}
    >
      <defs>
        <linearGradient id="trustConnGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(56,189,248,0.15)" />
          <stop offset="45%" stopColor="rgba(129,140,248,0.7)" />
          <stop offset="100%" stopColor="rgba(251,113,133,0.2)" />
        </linearGradient>
      </defs>
      {FEATURES.map((feature, i) => (
        <g key={feature.key}>
          <path
            id={`trust-path-${i}`}
            pathLength={1}
            className={`${styles.connectionPath} ${visible && !reduced ? styles.connectionPathReveal : ""}`}
            style={{ animationDelay: `${0.12 * i}s` }}
          />
          <circle id={`trust-node-a-${i}`} r="2.2" className={styles.endpoint} />
          <circle id={`trust-node-b-${i}`} r="2.2" className={styles.endpoint} />
          {!reduced && visible && (
            <circle r="2.4" className={styles.travelDot}>
              <animateMotion
                id={`trust-motion-${i}`}
                dur={`${6.4 + i * 0.55}s`}
                begin={`${i * 0.8}s`}
                repeatCount="indefinite"
              >
                <mpath href={`#trust-path-${i}`} />
              </animateMotion>
            </circle>
          )}
        </g>
      ))}
    </svg>
  );
}

export default function CompactTrustSection() {
  const prefersReducedMotion = useReducedMotion();
  const reduced = prefersReducedMotion === true;
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const inView = useInView(sectionRef, { once: true, amount: 0.22, margin: "-48px 0px" });
  const visible = inView || reduced;
  const [linesVisible, setLinesVisible] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const delay = reduced ? 80 : 720;
    const t = window.setTimeout(() => setLinesVisible(true), delay);
    return () => window.clearTimeout(t);
  }, [visible, reduced]);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="trust-heading"
    >
      <div className={styles.bg} aria-hidden>
        <span className={`${styles.orb} ${styles.orbCyan}`} />
        <span className={`${styles.orb} ${styles.orbViolet}`} />
        <span className={`${styles.orb} ${styles.orbPink}`} />
        <span className={styles.centerGlow} />
        <span className={styles.grid} />
        <span className={styles.dots} />
        <span className={styles.grain} />
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className={styles.particle}
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              ["--delay" as string]: p.delay,
              ["--dur" as string]: p.dur,
              ["--dx" as string]: p.dx,
              ["--dy" as string]: p.dy,
              ["--p" as string]: p.color,
            }}
          />
        ))}
      </div>
      <div className={styles.fadeTop} aria-hidden />
      <div className={styles.fadeBottom} aria-hidden />

      <div className={styles.wrap}>
        <header className={styles.header}>
          <div className={styles.headingGlow} aria-hidden />
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.65, ease }}
          >
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowDot} aria-hidden />
              Trusted by forward-thinking businesses
            </span>
            <div id="trust-heading">
              <SectionTitle>Why Businesses Trust Us</SectionTitle>
            </div>
            <motion.span
              className={styles.underline}
              aria-hidden
              initial={reduced ? false : { scaleX: 0, opacity: 0 }}
              animate={visible ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.7, delay: reduced ? 0 : 0.16, ease }}
            />
          </motion.div>
          <motion.p
            className={styles.lede}
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.6, delay: reduced ? 0 : 0.2, ease }}
          >
            Built for performance. Designed for scale. Trusted for results.
          </motion.p>
        </header>

        <div className={styles.stage}>
          <ConnectionLines
            visible={linesVisible}
            reduced={reduced}
            cardRefs={cardRefs}
            imageRef={imageRef}
          />

          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            const fromLeft = feature.side === "left";
            return (
              <motion.article
                key={feature.key}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={`${styles.card} ${POS_CLASS[feature.pos]} ${ACCENT_CLASS[feature.accent]}`}
                tabIndex={0}
                initial={reduced ? false : { opacity: 0, x: fromLeft ? -36 : 36 }}
                animate={
                  visible
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: fromLeft ? -36 : 36 }
                }
                transition={{
                  duration: 0.62,
                  delay: reduced ? 0 : 0.22 + index * 0.08,
                  ease,
                }}
              >
                <span className={styles.cardGlow} aria-hidden />
                <span className={styles.iconWrap} aria-hidden>
                  <Icon size={18} strokeWidth={2} />
                </span>
                <h3 className={styles.cardTitle}>{feature.title}</h3>
                <p className={styles.cardDesc}>{feature.desc}</p>
                <span className={styles.cardAccent} aria-hidden />
              </motion.article>
            );
          })}

          <div className={styles.imageSlot}>
            <span className={styles.imageGlow} aria-hidden />
            <span className={`${styles.speck} ${styles.speckA}`} aria-hidden />
            <span className={`${styles.speck} ${styles.speckB}`} aria-hidden />
            <span className={`${styles.speck} ${styles.speckC}`} aria-hidden />
            <span className={`${styles.speck} ${styles.speckD}`} aria-hidden />
            <motion.div
              ref={imageRef}
              className={styles.imageFrame}
              initial={reduced ? false : { opacity: 0, scale: 0.96 }}
              animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.75, delay: reduced ? 0 : 0.12, ease }}
            >
              <div className={styles.imageFloat}>
                <div className={styles.imageCrop}>
                  <Image
                    src="/whyBusinessTrustUs.png"
                    alt="Panacea IT Services team collaborating in a modern office, building secure and scalable software"
                    fill
                    sizes="(max-width: 720px) 92vw, (max-width: 1024px) 360px, 440px"
                    className={styles.image}
                  />
                  <span className={styles.imageOverlay} aria-hidden />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <ul className={styles.metrics}>
          {METRICS.map((metric, index) => (
            <motion.li
              key={metric.label}
              className={styles.metric}
              tabIndex={0}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{
                duration: 0.55,
                delay: reduced ? 0 : 0.42 + index * 0.08,
                ease,
              }}
            >
              <span className={styles.metricValue}>{metric.value}</span>
              <span className={styles.metricLabel}>{metric.label}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
