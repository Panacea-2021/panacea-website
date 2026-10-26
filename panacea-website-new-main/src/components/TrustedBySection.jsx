"use client";

import React, {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/* =============================================================================
   Theme presets — `theme` prop: "blue" | "teal"
   ============================================================================= */
export const THEME_PRESETS = {
  blue: {
    "--accent": "#0B6FFF",
    "--accent-text": "#0B6FFF",
    "--neutral-900": "#0B1220",
    "--surface": "#F7FAFF",
    "--glass": "rgba(255, 255, 255, 0.62)",
    "--accent-soft": "rgba(11, 111, 255, 0.14)",
    "--radius": "16px",
    "--shadow": "0 8px 24px rgba(11, 18, 32, 0.08)",
    "--badge-accent": "#0B6FFF",
  },
  teal: {
    "--accent": "#00A99D",
    "--accent-text": "#0A7A74",
    "--neutral-900": "#08201E",
    "--surface": "#F3FBFA",
    "--glass": "rgba(255, 255, 255, 0.62)",
    "--accent-soft": "rgba(0, 169, 157, 0.16)",
    "--radius": "16px",
    "--shadow": "0 8px 24px rgba(11, 18, 32, 0.08)",
    "--badge-accent": "#00A99D",
  },
};

export function applyTheme(theme = "blue") {
  return THEME_PRESETS[theme] ?? THEME_PRESETS.blue;
}

const EASE = [0.22, 0.9, 0.32, 1];
const BADGE_VARIANTS = new Set(["glow", "solid", "outline"]);

export const DEFAULT_ITEMS = [
  {
    id: "iso",
    title: "ISO & Compliance",
    description: "Global security standards",
    pos: "tl",
    icon: "shield",
    href: "#iso-compliance",
  },
  {
    id: "scale",
    title: "Scalable Architecture",
    description: "Enterprise-ready growth",
    pos: "bl",
    icon: "layers",
    href: "#scalable-architecture",
  },
  {
    id: "perf",
    title: "High Performance",
    description: "Uptime & speed-focused",
    pos: "tr",
    icon: "bolt",
    href: "#high-performance",
  },
  {
    id: "partner",
    title: "Digital Partner",
    description: "Global 24/7 support",
    pos: "br",
    icon: "globe",
    href: "#digital-partner",
  },
];

const POS_CLASS = {
  tl: "tbs-card-tl",
  bl: "tbs-card-bl",
  tr: "tbs-card-tr",
  br: "tbs-card-br",
};

const BADGE_VARIANT_CLASS = {
  glow: "tbs-badge-glow",
  solid: "tbs-badge-solid",
  outline: "tbs-badge-outline",
};

const METRIC_ICONS = ["shield", "clock", "layers"];

function Icon({ name, size = 16 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  switch (name) {
    case "layers":
      return (
        <svg {...common}>
          <path d="M12 2 2 7l10 5 10-5-10-5Z" />
          <path d="m2 17 10 5 10-5" />
          <path d="m2 12 10 5 10-5" />
        </svg>
      );
    case "bolt":
      return (
        <svg {...common}>
          <path d="M13 2 3 14h8l-2 8 10-12h-8l2-8Z" />
        </svg>
      );
    case "globe":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20Z" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        </svg>
      );
  }
}

function Ripples({ items, onDone }) {
  return items.map((ripple) => (
    <span
      key={ripple.id}
      className="tbs-ripple"
      style={{ left: ripple.x, top: ripple.y }}
      onAnimationEnd={() => onDone(ripple.id)}
    />
  ));
}

function useRipples() {
  const [items, setItems] = useState([]);
  const spawn = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setItems((prev) => [
      ...prev.slice(-3),
      {
        id: `${event.timeStamp}-${prev.length}`,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      },
    ]);
  };
  const clear = (id) => setItems((prev) => prev.filter((item) => item.id !== id));
  return { items, spawn, clear };
}

function RippleLink({ href, className, children, ...props }) {
  const { items, spawn, clear } = useRipples();
  return (
    <a href={href} className={className} onClick={spawn} {...props}>
      {children}
      <Ripples items={items} onDone={clear} />
    </a>
  );
}

function headingLines(headline) {
  const words = String(headline || "").trim().split(/\s+/).filter(Boolean);
  if (words.length <= 3) return [words.join(" ")];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}

function splitMetrics(copy) {
  const parts = String(copy || "")
    .split(/\s*[·•|]\s*/)
    .map((part) => part.trim())
    .filter(Boolean);
  return parts.length ? parts : [copy];
}

function SafeImg({ src, alt, className, width, height, loading, fetchPriority, onReady }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <span className="tbs-photo-fallback" aria-hidden="true" />;
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      className={className}
      onLoad={onReady}
      onError={() => setFailed(true)}
    />
  );
}

function CursorGlow({ containerRef }) {
  const glowRef = useRef(null);

  useEffect(() => {
    const root = containerRef?.current;
    const glow = glowRef.current;
    if (!root || !glow) return undefined;

    let frame = 0;
    const onMove = (event) => {
      const rect = root.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        glow.style.opacity = "1";
      });
    };
    const onLeave = () => {
      glow.style.opacity = "0";
    };

    root.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("pointerleave", onLeave);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, [containerRef]);

  return <div ref={glowRef} className="tbs-cursor-glow" aria-hidden="true" />;
}

function BadgeKnot({ reduced }) {
  const uid = useId();
  const fillId = `${uid}-knot-fill`;
  return (
    <svg className="tbs-badge-knot" viewBox="0 0 20 16" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8eef6" />
          <stop offset="52%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>
      </defs>
      <ellipse cx="10" cy="8" rx="6.4" ry="5.4" fill={`url(#${fillId})`} />
      <path d="M4.2 8c1.8-2.5 9.8-2.5 11.6 0" fill="none" stroke="#dbe4ee" strokeWidth="1.15" strokeLinecap="round" />
      <path d="M4.2 8c1.8 2.15 9.8 2.15 11.6 0" fill="none" stroke="#475569" strokeWidth="1" strokeLinecap="round" />
      {!reduced ? <circle cx="10" cy="8" r="1.35" fill="#f8fafc" opacity="0.85" /> : null}
    </svg>
  );
}

function HangingHiringBadge({ href, reduced, scale = 1, variant = "glow", position }) {
  const safeVariant = BADGE_VARIANTS.has(variant) ? variant : "glow";
  const badgeStyle = {
    "--badge-scale": String(scale),
    ...(position?.top ? { "--badge-top": position.top } : null),
    ...(position?.right ? { "--badge-right": position.right } : null),
    ...(position?.left ? { "--badge-left": position.left } : null),
  };

  return (
    <div className="tbs-badge-anchor" style={badgeStyle} data-badge-variant={safeVariant}>
      <motion.div
        className="tbs-badge-swing"
        initial={reduced ? false : { rotate: -3 }}
        animate={reduced ? { rotate: 0 } : { rotate: [-3, 3, -3] }}
        transition={
          reduced
            ? { duration: 0 }
            : { duration: 3.8, repeat: Infinity, ease: [0.45, 0.05, 0.55, 0.95] }
        }
      >
        <div className="tbs-badge-lift">
          <span className="tbs-badge-hook" aria-hidden="true" />
          <span className="tbs-badge-rope" aria-hidden="true" />
          <BadgeKnot reduced={reduced} />
          <motion.a
            href={href}
            tabIndex={0}
            className={`tbs-badge-board ${BADGE_VARIANT_CLASS[safeVariant]}`}
            aria-label="We are hiring — open positions"
            whileHover={reduced ? undefined : { y: -4 }}
            whileFocus={reduced ? undefined : { y: -4 }}
            transition={{ duration: 0.18, ease: EASE }}
          >
            <motion.span
              className="tbs-badge-pulse"
              aria-hidden="true"
              animate={reduced ? false : { scale: [1, 1.04, 1], opacity: [0.28, 0.55, 0.28] }}
              transition={
                reduced ? { duration: 0 } : { duration: 2.1, repeat: Infinity, ease: "easeInOut" }
              }
            />
            <span className="tbs-badge-copy">
              <span className="tbs-badge-we">WE ARE</span>
              <span className="tbs-badge-hire">HIRING</span>
            </span>
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
}

function TrustShowcase({ imageSrc, imageAlt, cards, reduced, visible }) {
  const rootRef = useRef(null);
  const [canTilt, setCanTilt] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const mq = window.matchMedia("(pointer: fine) and (min-width: 768px)");
    const apply = () => setCanTilt(mq.matches && !reduced);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [reduced]);

  const resetTilt = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    root.style.setProperty("--tilt-x", "0deg");
    root.style.setProperty("--tilt-y", "0deg");
    root.style.setProperty("--parx", "0");
    root.style.setProperty("--pary", "0");
    setHovering(false);
  }, []);

  const onMove = useCallback(
    (event) => {
      const root = rootRef.current;
      if (!root || !canTilt) return;
      const rect = root.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      const clamp = (value) => Math.max(-0.5, Math.min(0.5, value));
      const nx = clamp(px);
      const ny = clamp(py);
      root.style.setProperty("--tilt-x", `${(-ny * 8).toFixed(2)}deg`);
      root.style.setProperty("--tilt-y", `${(nx * 8).toFixed(2)}deg`);
      root.style.setProperty("--parx", nx.toFixed(3));
      root.style.setProperty("--pary", ny.toFixed(3));
      setHovering(true);
    },
    [canTilt]
  );

  const cardVariants = {
    hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 22, scale: 0.96 },
    show: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 0.42 + index * 0.1, ease: EASE },
    }),
  };

  return (
    <motion.div
      ref={rootRef}
      className="tbs-visual relative mx-auto grid w-full max-w-lg grid-cols-2 gap-3 pt-10 md:block md:min-h-[560px] md:pt-0"
      initial="hidden"
      animate={visible ? "show" : "hidden"}
      aria-label="Trust highlights"
      data-hover={hovering ? "true" : "false"}
      onPointerMove={onMove}
      onPointerLeave={resetTilt}
    >
      <span className="tbs-visual-glow" aria-hidden="true" />

      <motion.div
        className="col-span-2 mx-auto mb-1 flex w-full justify-center md:absolute md:inset-0 md:z-[1] md:mb-auto md:items-center"
        initial={reduced ? false : { opacity: 0, y: 28, scale: 0.96 }}
        animate={visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 28, scale: 0.96 }}
        transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.22, ease: EASE }}
      >
        <div className={`${reduced ? "" : "tbs-float tbs-float-photo"} tbs-photo-stage`}>
          <div className="tbs-photo-tilt">
            <div className="tbs-photo-shell">
              <SafeImg
                src={imageSrc}
                alt={imageAlt}
                width={408}
                height={476}
                loading="lazy"
                className="tbs-photo"
              />
              <span className="tbs-photo-glass" aria-hidden="true" />
              <span className="tbs-photo-scrim" aria-hidden="true" />
            </div>
          </div>
        </div>
      </motion.div>

      {cards.map((item, index) => {
        const Tag = item.href ? "a" : "article";
        const pos = item.pos || "tl";
        return (
          <motion.div
            key={item.id}
            className={`tbs-float-card ${POS_CLASS[pos] || ""}`}
            custom={index}
            variants={cardVariants}
          >
            <div className={reduced ? undefined : `tbs-float tbs-float-${pos}`}>
              <Tag
                href={item.href}
                tabIndex={0}
                className="tbs-card"
                aria-label={`${item.title}: ${item.description}`}
              >
                <span className="tbs-card-icon">
                  <Icon name={item.icon} />
                </span>
                <span className="tbs-card-copy">
                  <h3 className="text-sm font-semibold leading-snug text-[color:var(--neutral-900)]">
                    {item.title}
                  </h3>
                  <p className="text-[0.8rem] leading-snug text-[#475569]">{item.description}</p>
                </span>
              </Tag>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default function TrustedBySection({
  imageSrc = "/whyBusinessTrustUs.png",
  imageAlt = "Panacea IT Services team collaborating in a modern office, building secure and scalable software",
  items = DEFAULT_ITEMS,
  theme = "blue",
  reducedMotion = false,
  badgeScale = 1.12,
  badgeVariant = "glow",
  badgePosition = undefined,
  eyebrow = "TRUSTED BY FORWARD-THINKING BUSINESSES",
  headline = "Why Businesses Trust Us",
  subcopy = "Built for performance. Designed for scale. Trusted for results.",
  primaryCtaLabel = "Get a demo",
  primaryCtaHref = "/contact",
  secondaryCtaLabel = "See case studies",
  secondaryCtaHref = "/portfolio",
  trustMicrocopy = "99.9% reliability · 24/7 global support · Enterprise-ready infrastructure",
  hiringHref = "/careers",
  cursorGlow = true,
  className = "",
}) {
  const sectionRef = useRef(null);
  const prefersReduced = useReducedMotion();
  const reduced = Boolean(reducedMotion || prefersReduced);
  const inView = useInView(sectionRef, { once: true, amount: 0.16, margin: "-40px 0px" });
  const visible = inView || reduced;
  const themeVars = useMemo(() => applyTheme(theme), [theme]);
  const [heavyReady, setHeavyReady] = useState(false);
  const lines = headingLines(headline);
  const metrics = splitMetrics(trustMicrocopy);

  useEffect(() => {
    if (reduced) return undefined;
    const enable = () => setHeavyReady(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(enable, { timeout: 1200 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(enable, 1);
    return () => window.clearTimeout(id);
  }, [reduced]);

  const cards = items.slice(0, 4);
  const enableGlow = heavyReady && !reduced && cursorGlow;
  const lineGroup = {
    hidden: {},
    show: { transition: reduced ? { staggerChildren: 0 } : { staggerChildren: 0.12 } },
  };
  const lineItem = {
    hidden: reduced ? { y: 0, opacity: 1 } : { y: "108%", opacity: 0 },
    show: {
      y: "0%",
      opacity: 1,
      transition: { duration: reduced ? 0 : 0.72, ease: EASE },
    },
  };

  return (
    <section
      ref={sectionRef}
      className={`tbs px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8 lg:pb-24 lg:pt-24 ${className}`.trim()}
      style={themeVars}
      aria-labelledby="trusted-by-headline"
      data-theme={theme}
      data-reduced-motion={reduced ? "true" : "false"}
      id="trusted-by"
    >
      <span className="tbs-grain" aria-hidden="true" />
      <span className="tbs-grid" aria-hidden="true" />
      <span className="tbs-mesh" aria-hidden="true" />
      <span className="tbs-wave" aria-hidden="true" />
      <span className="tbs-orb tbs-orb-a" aria-hidden="true" />
      <span className="tbs-orb tbs-orb-b" aria-hidden="true" />
      <span className="tbs-orb tbs-orb-c" aria-hidden="true" />
      {enableGlow ? <CursorGlow containerRef={sectionRef} /> : null}

      <HangingHiringBadge
        href={hiringHref}
        reduced={reduced}
        scale={badgeScale}
        variant={badgeVariant}
        position={badgePosition}
      />

      <div className="relative z-[2] mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-xl">
            <motion.p
              className="tbs-eyebrow"
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: reduced ? 0 : 0.45, ease: EASE }}
            >
              <span className="tbs-eyebrow-dot" aria-hidden="true" />
              {eyebrow}
            </motion.p>

            <motion.h2
              id="trusted-by-headline"
              className="tbs-heading"
              aria-label={headline}
              initial="hidden"
              animate={visible ? "show" : "hidden"}
              variants={lineGroup}
            >
              {lines.map((line) => (
                <span key={line} className="tbs-heading-line">
                  <motion.span className="tbs-heading-word" variants={lineItem}>
                    {line}
                  </motion.span>
                </span>
              ))}
            </motion.h2>
            <span className="tbs-heading-rule" aria-hidden="true" />

            <motion.p
              className="tbs-subcopy"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.28, ease: EASE }}
            >
              {subcopy}
            </motion.p>

            <motion.div
              className="mt-7 flex flex-wrap items-center gap-3"
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.4, ease: EASE }}
            >
              <a
                href={primaryCtaHref}
                className="tbs-btn tbs-btn-primary"
                aria-label={`${primaryCtaLabel} — request a product demo`}
              >
                {primaryCtaLabel}
                <span className="tbs-btn-icon">
                  <Icon name="arrow" size={16} />
                </span>
              </a>
              <RippleLink
                href={secondaryCtaHref}
                className="tbs-btn tbs-btn-secondary"
                aria-label={`${secondaryCtaLabel} — view customer case studies`}
              >
                {secondaryCtaLabel}
              </RippleLink>
            </motion.div>

            <motion.ul
              className="tbs-metrics"
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.52, ease: EASE }}
            >
              {metrics.map((metric, index) => (
                <li key={metric} className="contents">
                  {index > 0 ? <span className="tbs-metric-sep" aria-hidden="true" /> : null}
                  <span className="tbs-metric">
                    <span className="tbs-metric-icon">
                      <Icon name={METRIC_ICONS[index % METRIC_ICONS.length]} size={12} />
                    </span>
                    {metric}
                  </span>
                </li>
              ))}
            </motion.ul>
          </div>

          <TrustShowcase
            imageSrc={imageSrc}
            imageAlt={imageAlt}
            cards={cards}
            reduced={reduced}
            visible={visible}
          />
        </div>
      </div>
    </section>
  );
}
