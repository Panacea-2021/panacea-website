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
import type { IconType } from "react-icons";
import { FaAws, FaMicrosoft } from "react-icons/fa";
import { BsMicrosoftTeams } from "react-icons/bs";
import { VscAzure } from "react-icons/vsc";
import {
  SiAmazon,
  SiAnthropic,
  SiApple,
  SiBitbucket,
  SiCloudflare,
  SiConfluence,
  SiDatabricks,
  SiDigitalocean,
  SiDocker,
  SiFirebase,
  SiGithub,
  SiGitlab,
  SiGoogle,
  SiGooglecloud,
  SiGooglegemini,
  SiGoogleplay,
  SiHubspot,
  SiHuggingface,
  SiJira,
  SiKubernetes,
  SiMeta,
  SiMongodb,
  SiMysql,
  SiNetlify,
  SiNotion,
  SiNvidia,
  SiOpenai,
  SiOracle,
  SiPaypal,
  SiPostgresql,
  SiPytorch,
  SiRazorpay,
  SiRedis,
  SiSalesforce,
  SiSap,
  SiShopify,
  SiSlack,
  SiSnowflake,
  SiStripe,
  SiTensorflow,
  SiVercel,
  SiWoocommerce,
  SiZoho,
} from "react-icons/si";
import styles from "./Brands.module.css";

type CategoryId =
  | "cloud"
  | "development"
  | "ai"
  | "enterprise"
  | "payments"
  | "education";

type Ring = "inner" | "middle" | "outer" | "far";

type Platform = {
  id: string;
  name: string;
  category: CategoryId;
  categoryLabel: string;
  ring: Ring;
  color: string;
  Icon?: IconType;
  src?: string;
  custom?: "ibm" | "servicenow";
  wide?: boolean;
};

const CATEGORIES: { id: CategoryId | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "cloud", label: "Cloud" },
  { id: "ai", label: "AI & Data" },
  { id: "development", label: "Development" },
  { id: "enterprise", label: "Enterprise" },
  { id: "payments", label: "Payments" },
  { id: "education", label: "Education" },
];

const platforms: Platform[] = [
  /* Inner — featured */
  { id: "aws", name: "AWS", category: "cloud", categoryLabel: "Cloud Infrastructure", ring: "inner", color: "#FF9900", Icon: FaAws },
  { id: "azure", name: "Microsoft Azure", category: "cloud", categoryLabel: "Cloud Infrastructure", ring: "inner", color: "#0078D4", Icon: VscAzure },
  { id: "gcp", name: "Google Cloud", category: "cloud", categoryLabel: "Cloud Infrastructure", ring: "inner", color: "#4285F4", Icon: SiGooglecloud },
  { id: "openai", name: "OpenAI", category: "ai", categoryLabel: "AI & Data", ring: "inner", color: "#10A37F", Icon: SiOpenai },
  { id: "microsoft", name: "Microsoft", category: "development", categoryLabel: "Technology", ring: "inner", color: "#00A4EF", Icon: FaMicrosoft },
  { id: "google", name: "Google", category: "development", categoryLabel: "Technology", ring: "inner", color: "#4285F4", Icon: SiGoogle },
  { id: "sriram", name: "Sriram IAS", category: "education", categoryLabel: "Education Partner", ring: "inner", color: "#C81E1E", src: "/brands/srirams-ias.png", wide: true },
  { id: "nvidia", name: "NVIDIA", category: "ai", categoryLabel: "AI & Data", ring: "inner", color: "#76B900", Icon: SiNvidia },

  /* Middle */
  { id: "apple", name: "Apple", category: "development", categoryLabel: "Technology", ring: "middle", color: "#111111", Icon: SiApple },
  { id: "meta", name: "Meta", category: "development", categoryLabel: "Technology", ring: "middle", color: "#0082FB", Icon: SiMeta },
  { id: "github", name: "GitHub", category: "development", categoryLabel: "Development", ring: "middle", color: "#181717", Icon: SiGithub },
  { id: "docker", name: "Docker", category: "development", categoryLabel: "Development", ring: "middle", color: "#2496ED", Icon: SiDocker },
  { id: "mongodb", name: "MongoDB", category: "development", categoryLabel: "Development", ring: "middle", color: "#47A248", Icon: SiMongodb },
  { id: "stripe", name: "Stripe", category: "payments", categoryLabel: "Payments", ring: "middle", color: "#635BFF", Icon: SiStripe },
  { id: "salesforce", name: "Salesforce", category: "enterprise", categoryLabel: "Enterprise", ring: "middle", color: "#00A1E0", Icon: SiSalesforce },
  { id: "cloudflare", name: "Cloudflare", category: "cloud", categoryLabel: "Cloud Infrastructure", ring: "middle", color: "#F38020", Icon: SiCloudflare },
  { id: "firebase", name: "Firebase", category: "cloud", categoryLabel: "Cloud Infrastructure", ring: "middle", color: "#FFCA28", Icon: SiFirebase },
  { id: "vercel", name: "Vercel", category: "cloud", categoryLabel: "Cloud Infrastructure", ring: "middle", color: "#111111", Icon: SiVercel },
  { id: "oracle", name: "Oracle Cloud", category: "cloud", categoryLabel: "Cloud Infrastructure", ring: "middle", color: "#F80000", Icon: SiOracle, wide: true },
  { id: "shopify", name: "Shopify", category: "payments", categoryLabel: "Commerce", ring: "middle", color: "#96BF48", Icon: SiShopify },

  /* Outer */
  { id: "amazon", name: "Amazon", category: "cloud", categoryLabel: "Cloud Infrastructure", ring: "outer", color: "#FF9900", Icon: SiAmazon, wide: true },
  { id: "gitlab", name: "GitLab", category: "development", categoryLabel: "Development", ring: "outer", color: "#FC6D26", Icon: SiGitlab },
  { id: "kubernetes", name: "Kubernetes", category: "development", categoryLabel: "Development", ring: "outer", color: "#326CE5", Icon: SiKubernetes },
  { id: "postgresql", name: "PostgreSQL", category: "development", categoryLabel: "Development", ring: "outer", color: "#4169E1", Icon: SiPostgresql },
  { id: "redis", name: "Redis", category: "development", categoryLabel: "Development", ring: "outer", color: "#DC382D", Icon: SiRedis },
  { id: "anthropic", name: "Anthropic", category: "ai", categoryLabel: "AI & Data", ring: "outer", color: "#191919", Icon: SiAnthropic },
  { id: "gemini", name: "Google Gemini", category: "ai", categoryLabel: "AI & Data", ring: "outer", color: "#8E75B2", Icon: SiGooglegemini },
  { id: "slack", name: "Slack", category: "enterprise", categoryLabel: "Enterprise", ring: "outer", color: "#611F69", Icon: SiSlack },
  { id: "jira", name: "Jira", category: "enterprise", categoryLabel: "Enterprise", ring: "outer", color: "#0052CC", Icon: SiJira },
  { id: "notion", name: "Notion", category: "enterprise", categoryLabel: "Enterprise", ring: "outer", color: "#111111", Icon: SiNotion },
  { id: "sap", name: "SAP", category: "enterprise", categoryLabel: "Enterprise", ring: "outer", color: "#0FAAFF", Icon: SiSap },
  { id: "paypal", name: "PayPal", category: "payments", categoryLabel: "Payments", ring: "outer", color: "#003087", Icon: SiPaypal },
  { id: "razorpay", name: "Razorpay", category: "payments", categoryLabel: "Payments", ring: "outer", color: "#072654", Icon: SiRazorpay },
  { id: "play", name: "Google Play", category: "development", categoryLabel: "Technology", ring: "outer", color: "#34A853", Icon: SiGoogleplay },
  { id: "anynews", name: "AnyNews", category: "education", categoryLabel: "Education Partner", ring: "outer", color: "#F15025", src: "/brands/anynews.png", wide: true },
  { id: "snowflake", name: "Snowflake", category: "ai", categoryLabel: "AI & Data", ring: "outer", color: "#29B5E8", Icon: SiSnowflake },

  /* Far */
  { id: "ibm", name: "IBM Cloud", category: "cloud", categoryLabel: "Cloud Infrastructure", ring: "far", color: "#054ADA", custom: "ibm", wide: true },
  { id: "digitalocean", name: "DigitalOcean", category: "cloud", categoryLabel: "Cloud Infrastructure", ring: "far", color: "#0080FF", Icon: SiDigitalocean },
  { id: "netlify", name: "Netlify", category: "cloud", categoryLabel: "Cloud Infrastructure", ring: "far", color: "#00C7B7", Icon: SiNetlify },
  { id: "bitbucket", name: "Bitbucket", category: "development", categoryLabel: "Development", ring: "far", color: "#0052CC", Icon: SiBitbucket },
  { id: "mysql", name: "MySQL", category: "development", categoryLabel: "Development", ring: "far", color: "#4479A1", Icon: SiMysql },
  { id: "huggingface", name: "Hugging Face", category: "ai", categoryLabel: "AI & Data", ring: "far", color: "#FFD21E", Icon: SiHuggingface },
  { id: "tensorflow", name: "TensorFlow", category: "ai", categoryLabel: "AI & Data", ring: "far", color: "#FF6F00", Icon: SiTensorflow },
  { id: "pytorch", name: "PyTorch", category: "ai", categoryLabel: "AI & Data", ring: "far", color: "#EE4C2C", Icon: SiPytorch },
  { id: "databricks", name: "Databricks", category: "ai", categoryLabel: "AI & Data", ring: "far", color: "#FF3621", Icon: SiDatabricks },
  { id: "hubspot", name: "HubSpot", category: "enterprise", categoryLabel: "Enterprise", ring: "far", color: "#FF7A59", Icon: SiHubspot },
  { id: "teams", name: "Microsoft Teams", category: "enterprise", categoryLabel: "Enterprise", ring: "far", color: "#6264A7", Icon: BsMicrosoftTeams },
  { id: "confluence", name: "Confluence", category: "enterprise", categoryLabel: "Enterprise", ring: "far", color: "#172B4D", Icon: SiConfluence },
  { id: "zoho", name: "Zoho", category: "enterprise", categoryLabel: "Enterprise", ring: "far", color: "#E42527", Icon: SiZoho },
  { id: "servicenow", name: "ServiceNow", category: "enterprise", categoryLabel: "Enterprise", ring: "far", color: "#81B5A1", custom: "servicenow" },
  { id: "woocommerce", name: "WooCommerce", category: "payments", categoryLabel: "Commerce", ring: "far", color: "#96588A", Icon: SiWoocommerce },
  { id: "alltime", name: "All Time Storage", category: "education", categoryLabel: "Partner", ring: "far", color: "#2F6FED", src: "/brands/all-time-storage.png", wide: true },
];

const FEATURED_MOBILE = ["sriram", "aws", "microsoft", "google", "openai", "nvidia"];

const CONNECTIONS: [string, string][] = [
  ["hub", "aws"],
  ["hub", "azure"],
  ["hub", "gcp"],
  ["hub", "openai"],
  ["hub", "microsoft"],
  ["hub", "google"],
  ["hub", "sriram"],
  ["hub", "nvidia"],
  ["aws", "cloudflare"],
  ["aws", "vercel"],
  ["azure", "microsoft"],
  ["gcp", "firebase"],
  ["gcp", "google"],
  ["openai", "nvidia"],
  ["openai", "anthropic"],
  ["microsoft", "github"],
  ["microsoft", "salesforce"],
  ["google", "play"],
  ["sriram", "anynews"],
  ["nvidia", "docker"],
  ["github", "gitlab"],
  ["docker", "kubernetes"],
  ["mongodb", "redis"],
  ["stripe", "shopify"],
  ["salesforce", "slack"],
  ["apple", "meta"],
  ["oracle", "ibm"],
  ["stripe", "razorpay"],
];

const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  left: `${6 + ((i * 17) % 88)}%`,
  top: `${8 + ((i * 13) % 82)}%`,
  duration: `${18 + (i % 6) * 2}s`,
  delay: `${(i * 0.55) % 8}s`,
  opacity: 0.18 + (i % 5) * 0.07,
  dx: `${(i % 2 === 0 ? 1 : -1) * (5 + (i % 4) * 3)}px`,
  dy: `${-14 - (i % 5) * 5}px`,
}));

const STATS = [
  { value: "50+", label: "Technology Platforms" },
  { value: "10+", label: "Cloud & Infrastructure Partners" },
  { value: "20+", label: "Enterprise Integrations" },
  { value: "Global", label: "Technology Ecosystem" },
];

const RING_LABELS: { id: CategoryId; label: string }[] = [
  { id: "cloud", label: "Cloud & Infrastructure" },
  { id: "ai", label: "AI & Data" },
  { id: "development", label: "Development" },
  { id: "enterprise", label: "Enterprise" },
  { id: "payments", label: "Payments" },
  { id: "education", label: "Education" },
];

const ease = [0.22, 1, 0.36, 1] as const;

function IbmMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 26" className={className} aria-hidden>
      <text
        x="32"
        y="20"
        textAnchor="middle"
        fill="#054ADA"
        fontSize="18"
        fontWeight="800"
        fontFamily="Arial, Helvetica, sans-serif"
        letterSpacing="2"
      >
        IBM
      </text>
    </svg>
  );
}

function ServiceNowMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="1" y="1" width="30" height="30" rx="8" fill="#81B5A1" />
      <text
        x="16"
        y="21"
        textAnchor="middle"
        fill="#fff"
        fontSize="11"
        fontWeight="700"
        fontFamily="Arial, Helvetica, sans-serif"
      >
        now
      </text>
    </svg>
  );
}

function PlatformMark({
  platform,
  className,
}: {
  platform: Platform;
  className?: string;
}) {
  if (platform.custom === "ibm") return <IbmMark className={className} />;
  if (platform.custom === "servicenow") return <ServiceNowMark className={className} />;
  if (platform.src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={platform.src}
        alt=""
        className={className}
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    );
  }
  if (platform.Icon) {
    const Icon = platform.Icon;
    return <Icon className={className} style={{ color: platform.color }} aria-hidden />;
  }
  return <span className={styles.markFallback}>{platform.name}</span>;
}

function usePointerParallax(enabled: boolean) {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = useCallback(
    (e: MouseEvent) => {
      if (!enabled || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      setOffset({ x: nx * 8, y: ny * 6 });
    },
    [enabled]
  );

  const handleLeave = useCallback(() => setOffset({ x: 0, y: 0 }), []);

  useEffect(() => {
    if (!enabled) return;
    const el = sectionRef.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [enabled, handleMove, handleLeave]);

  return { sectionRef, offset };
}

function ConnectionNetwork({
  active,
  hoveredId,
  relatedIds,
  nodeRefs,
  hubRef,
  visible,
}: {
  active: boolean;
  hoveredId: string | null;
  relatedIds: Set<string>;
  nodeRefs: React.MutableRefObject<Map<string, HTMLElement | null>>;
  hubRef: React.RefObject<HTMLDivElement | null>;
  visible: boolean;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const uid = useId().replace(/:/g, "");

  const updatePaths = useCallback(() => {
    const svg = svgRef.current;
    const container = svg?.parentElement;
    if (!svg || !container) return;
    const cRect = container.getBoundingClientRect();

    CONNECTIONS.forEach(([a, b], i) => {
      const elA = a === "hub" ? hubRef.current : nodeRefs.current.get(a);
      const elB = b === "hub" ? hubRef.current : nodeRefs.current.get(b);
      const base = svg.querySelector<SVGPathElement>(`#${uid}-c-${i}`);
      const shimmer = svg.querySelector<SVGPathElement>(`#${uid}-s-${i}`);
      if (!elA || !elB || !base) return;
      if (!elA.offsetParent || !elB.offsetParent) {
        base.setAttribute("d", "");
        shimmer?.setAttribute("d", "");
        return;
      }

      const aRect = elA.getBoundingClientRect();
      const bRect = elB.getBoundingClientRect();
      const ax = aRect.left + aRect.width / 2 - cRect.left;
      const ay = aRect.top + aRect.height / 2 - cRect.top;
      const bx = bRect.left + bRect.width / 2 - cRect.left;
      const by = bRect.top + bRect.height / 2 - cRect.top;
      const mx = (ax + bx) / 2;
      const my = (ay + by) / 2 + (i % 2 === 0 ? -18 : 16);
      const d = `M ${ax} ${ay} Q ${mx} ${my} ${bx} ${by}`;
      base.setAttribute("d", d);
      shimmer?.setAttribute("d", d);

      const lit =
        hoveredId &&
        (a === hoveredId ||
          b === hoveredId ||
          relatedIds.has(a) ||
          relatedIds.has(b));
      base.classList.toggle(styles.connectionLit, Boolean(lit));
      shimmer?.classList.toggle(styles.connectionLit, Boolean(lit));
    });
  }, [hubRef, hoveredId, nodeRefs, relatedIds, uid]);

  useEffect(() => {
    updatePaths();
    const container = svgRef.current?.parentElement;
    if (!container) return;
    const ro = new ResizeObserver(updatePaths);
    ro.observe(container);
    window.addEventListener("resize", updatePaths);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updatePaths);
    };
  }, [updatePaths, visible]);

  useEffect(() => {
    if (!active || !visible) {
      updatePaths();
      return;
    }
    let raf = 0;
    let frame = 0;
    const loop = () => {
      frame += 1;
      if (frame % 2 === 0) updatePaths();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [active, visible, updatePaths]);

  return (
    <svg ref={svgRef} className={styles.connections} aria-hidden>
      <defs>
        <linearGradient id={`${uid}-g`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(56,189,248,0.45)" />
          <stop offset="50%" stopColor="rgba(129,140,248,0.55)" />
          <stop offset="100%" stopColor="rgba(192,132,252,0.4)" />
        </linearGradient>
        <linearGradient id={`${uid}-sh`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="45%" stopColor="rgba(186,230,253,0.85)" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      {CONNECTIONS.map((_, i) => (
        <g key={i}>
          <path
            id={`${uid}-c-${i}`}
            className={styles.connectionPath}
            stroke={`url(#${uid}-g)`}
          />
          {i % 3 === 0 ? (
            <path
              id={`${uid}-s-${i}`}
              className={styles.connectionShimmer}
              stroke={`url(#${uid}-sh)`}
            />
          ) : null}
        </g>
      ))}
    </svg>
  );
}

function GlassNode({
  platform,
  size,
  showCaption,
  active,
  related,
  dimmed,
  onEnter,
  onLeave,
  style,
  nodeRef,
  stagger,
}: {
  platform: Platform;
  size: "inner" | "middle" | "outer" | "far" | "card" | "featured";
  showCaption?: boolean;
  active?: boolean;
  related?: boolean;
  dimmed?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  style?: React.CSSProperties;
  nodeRef?: (el: HTMLDivElement | null) => void;
  stagger?: number;
}) {
  return (
    <div
      ref={nodeRef}
      className={[
        styles.node,
        styles[`size_${size}`],
        platform.wide ? styles.nodeWide : "",
        active ? styles.nodeActive : "",
        related ? styles.nodeRelated : "",
        dimmed ? styles.nodeDimmed : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={
        {
          ...style,
          "--glow": platform.color,
          "--stagger": `${stagger ?? 0}s`,
        } as React.CSSProperties
      }
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      tabIndex={0}
      role="listitem"
      aria-label={`${platform.name}, ${platform.categoryLabel}`}
    >
      <span className={styles.nodeGlow} aria-hidden />
      <div className={styles.nodeGlass}>
        <div
          className={`${styles.logoPlate} ${platform.src ? styles.logoPlateImage : ""}`}
        >
          <PlatformMark
            platform={platform}
            className={`${styles.logoMark} ${
              platform.wide ? styles.logoMarkWide : ""
            } ${platform.src ? styles.logoMarkImg : ""}`}
          />
        </div>
        {showCaption ? (
          <div className={styles.caption}>
            <span className={styles.nodeName}>{platform.name}</span>
            <span className={styles.nodeCat}>{platform.categoryLabel}</span>
          </div>
        ) : null}
      </div>
      {!showCaption ? (
        <div className={styles.tooltip}>
          <strong>{platform.name}</strong>
          <span>{platform.categoryLabel}</span>
        </div>
      ) : null}
    </div>
  );
}

export default function BrandSlider() {
  const prefersReducedMotion = useReducedMotion();
  const [isTouch, setIsTouch] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mobileCategory, setMobileCategory] = useState<CategoryId | "all">("all");
  const parallaxEnabled = !prefersReducedMotion && !isTouch;
  const { sectionRef, offset } = usePointerParallax(parallaxEnabled);
  const inView = useInView(sectionRef, { once: true, amount: 0.02 });
  const hubRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Map<string, HTMLElement | null>>(new Map());

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const relatedIds = useMemo(() => {
    if (!hoveredId) return new Set<string>();
    const current = platforms.find((p) => p.id === hoveredId);
    if (!current) return new Set<string>();
    const same = platforms
      .filter((p) => p.category === current.category && p.id !== hoveredId)
      .slice(0, 5)
      .map((p) => p.id);
    return new Set(same);
  }, [hoveredId]);

  const setNodeRef = useCallback((id: string, el: HTMLDivElement | null) => {
    nodeRefs.current.set(id, el);
  }, []);

  const inner = platforms.filter((p) => p.ring === "inner");
  const middle = platforms.filter((p) => p.ring === "middle");
  const outer = platforms.filter((p) => p.ring === "outer");
  const far = platforms.filter((p) => p.ring === "far");
  const extras = [...outer, ...far];

  const featuredMobile = platforms.filter((p) => FEATURED_MOBILE.includes(p.id));
  const mobileRest = platforms.filter((p) => {
    if (FEATURED_MOBILE.includes(p.id) && mobileCategory === "all") return false;
    if (mobileCategory === "all") return true;
    return p.category === mobileCategory;
  });

  const dimmed = Boolean(hoveredId);

  return (
    <section
      ref={sectionRef}
      className={[
        styles.section,
        inView ? styles.inView : "",
        prefersReducedMotion ? styles.reduced : "",
        !parallaxEnabled ? styles.noParallax : "",
      ]
        .filter(Boolean)
        .join(" ")}
      id="partners"
      aria-labelledby="partners-heading"
    >
      <div className={styles.bgDrift} aria-hidden />
      <div className={styles.aurora} aria-hidden>
        <div className={`${styles.auroraLayer} ${styles.auroraLayer1}`} />
        <div className={`${styles.auroraLayer} ${styles.auroraLayer2}`} />
        <div className={`${styles.auroraLayer} ${styles.auroraLayer3}`} />
      </div>
      <div className={styles.centerBloom} aria-hidden />
      <div className={styles.noise} aria-hidden />
      <div className={styles.gridPattern} aria-hidden />

      <div className={styles.particles} aria-hidden>
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className={styles.particle}
            style={
              {
                left: p.left,
                top: p.top,
                "--duration": p.duration,
                "--delay": p.delay,
                "--opacity": p.opacity,
                "--dx": p.dx,
                "--dy": p.dy,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.headingGlow} aria-hidden />
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 id="partners-heading" className={styles.heading}>
              <span className={styles.headingText}>
                <span className={styles.headingLine}>Trusted Platforms</span>
                <span className={styles.headingPartners}>&amp; Partners</span>
              </span>
            </h2>
          </motion.div>
          <motion.p
            className={styles.kicker}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : 0.1, ease }}
          >
            Built on the world&apos;s leading technology ecosystem
          </motion.p>
          <motion.p
            className={styles.subtitle}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : 0.18, ease }}
          >
            From cloud infrastructure and AI to enterprise platforms and modern
            development tools, we build on technologies trusted by teams worldwide.
          </motion.p>
          <motion.div
            className={styles.trustBadge}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.55, delay: prefersReducedMotion ? 0 : 0.26, ease }}
          >
            <span className={styles.trustStar} aria-hidden>
              ✦
            </span>
            50+ TECHNOLOGIES · CLOUDS · PLATFORMS · PARTNERS
          </motion.div>
        </header>

        {/* Desktop / tablet constellation */}
        <div
          className={styles.constellation}
          style={
            parallaxEnabled
              ? { transform: `translate(${offset.x * 0.28}px, ${offset.y * 0.22}px)` }
              : undefined
          }
        >
          <div className={styles.orbitRing} data-ring="inner" aria-hidden />
          <div className={styles.orbitRing} data-ring="middle" aria-hidden />
          <div className={styles.orbitRing} data-ring="outer" aria-hidden />
          <div className={styles.orbitRing} data-ring="far" aria-hidden />

          {RING_LABELS.map((item) => (
            <span
              key={item.id}
              className={`${styles.ringLabel} ${styles[`ringLabel_${item.id}`]}`}
            >
              {item.label}
            </span>
          ))}

          <ConnectionNetwork
            active={inView && !prefersReducedMotion && !isTouch}
            hoveredId={hoveredId}
            relatedIds={relatedIds}
            nodeRefs={nodeRefs}
            hubRef={hubRef}
            visible={inView}
          />

          <div className={styles.hub} ref={hubRef}>
            <span className={styles.hubOrb} aria-hidden />
            <span className={styles.hubRing} aria-hidden />
            <div className={styles.hubGlass}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="" className={styles.hubLogo} />
              <span className={styles.hubName}>Panacea</span>
              <span className={styles.hubMeta}>Digital Ecosystem</span>
            </div>
          </div>

          <div className={`${styles.ring} ${styles.ringInner}`} role="list">
            {inner.map((platform, i) => (
              <div
                key={platform.id}
                className={styles.slot}
                style={
                  {
                    "--i": i,
                    "--n": inner.length,
                    "--offset": "-90deg",
                  } as React.CSSProperties
                }
              >
                <GlassNode
                  platform={platform}
                  size="inner"
                  showCaption
                  stagger={0.12 + i * 0.04}
                  active={hoveredId === platform.id}
                  related={relatedIds.has(platform.id)}
                  dimmed={dimmed && hoveredId !== platform.id && !relatedIds.has(platform.id)}
                  onEnter={() => setHoveredId(platform.id)}
                  onLeave={() => setHoveredId(null)}
                  nodeRef={(el) => setNodeRef(platform.id, el)}
                />
              </div>
            ))}
          </div>

          <div className={`${styles.ring} ${styles.ringMiddle}`} role="list">
            {middle.map((platform, i) => (
              <div
                key={platform.id}
                className={styles.slot}
                style={
                  {
                    "--i": i,
                    "--n": middle.length,
                    "--offset": "-75deg",
                  } as React.CSSProperties
                }
              >
                <GlassNode
                  platform={platform}
                  size="middle"
                  showCaption
                  stagger={0.28 + i * 0.03}
                  active={hoveredId === platform.id}
                  related={relatedIds.has(platform.id)}
                  dimmed={dimmed && hoveredId !== platform.id && !relatedIds.has(platform.id)}
                  onEnter={() => setHoveredId(platform.id)}
                  onLeave={() => setHoveredId(null)}
                  nodeRef={(el) => setNodeRef(platform.id, el)}
                />
              </div>
            ))}
          </div>

          <div className={`${styles.ring} ${styles.ringOuter}`} role="list">
            {outer.map((platform, i) => (
              <div
                key={platform.id}
                className={styles.slot}
                style={
                  {
                    "--i": i,
                    "--n": outer.length,
                    "--offset": "-90deg",
                  } as React.CSSProperties
                }
              >
                <GlassNode
                  platform={platform}
                  size="outer"
                  stagger={0.42 + i * 0.02}
                  active={hoveredId === platform.id}
                  related={relatedIds.has(platform.id)}
                  dimmed={dimmed && hoveredId !== platform.id && !relatedIds.has(platform.id)}
                  onEnter={() => setHoveredId(platform.id)}
                  onLeave={() => setHoveredId(null)}
                  nodeRef={(el) => setNodeRef(platform.id, el)}
                />
              </div>
            ))}
          </div>

          <div className={`${styles.ring} ${styles.ringFar}`} role="list">
            {far.map((platform, i) => (
              <div
                key={platform.id}
                className={styles.slot}
                style={
                  {
                    "--i": i,
                    "--n": far.length,
                    "--offset": "-79deg",
                  } as React.CSSProperties
                }
              >
                <GlassNode
                  platform={platform}
                  size="far"
                  stagger={0.55 + i * 0.015}
                  active={hoveredId === platform.id}
                  related={relatedIds.has(platform.id)}
                  dimmed={dimmed && hoveredId !== platform.id && !relatedIds.has(platform.id)}
                  onEnter={() => setHoveredId(platform.id)}
                  onLeave={() => setHoveredId(null)}
                  nodeRef={(el) => setNodeRef(platform.id, el)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.extrasTablet}>
          <p className={styles.extrasLabel}>Extended technology stack</p>
          <div className={styles.extrasGrid} role="list">
            {extras.map((platform) => (
              <GlassNode
                key={`extra-${platform.id}`}
                platform={platform}
                size="card"
                showCaption
              />
            ))}
          </div>
        </div>

        <div className={styles.extrasLaptop}>
          <p className={styles.extrasLabel}>Additional platforms</p>
          <div className={styles.extrasGrid} role="list">
            {far.map((platform) => (
              <GlassNode
                key={`far-${platform.id}`}
                platform={platform}
                size="card"
                showCaption
              />
            ))}
          </div>
        </div>

        {/* Mobile layout */}
        <div className={styles.mobileLayout}>
          <div className={styles.featuredGrid} role="list">
            {featuredMobile.map((platform) => (
              <GlassNode
                key={`feat-${platform.id}`}
                platform={platform}
                size="featured"
                showCaption
              />
            ))}
          </div>

          <div className={styles.categoryScroll} role="tablist" aria-label="Platform categories">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={mobileCategory === cat.id}
                className={`${styles.categoryChip} ${
                  mobileCategory === cat.id ? styles.categoryChipActive : ""
                }`}
                onClick={() => setMobileCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className={styles.mobileGrid} role="list">
            {mobileRest.map((platform) => (
              <GlassNode
                key={`m-${platform.id}`}
                platform={platform}
                size="card"
                showCaption
              />
            ))}
          </div>
        </div>

        <motion.ul
          className={styles.stats}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : 0.35, ease }}
        >
          {STATS.map((stat) => (
            <li key={stat.label} className={styles.stat}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </li>
          ))}
        </motion.ul>
      </div>

      <div className={styles.bottomAccentGlow} aria-hidden />
      <div className={styles.bottomAccent} aria-hidden />
    </section>
  );
}
