"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";
import type { IconType } from "react-icons";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaVuejs,
  FaAngular,
  FaSwift,
  FaAws,
  FaDocker,
  FaFigma,
  FaPython,
  FaGitAlt,
  FaJira,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiIonic,
  SiLaravel,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiFirebase,
  SiKubernetes,
  SiAdobexd,
  SiTensorflow,
  SiOpenai,
  SiPostman,
} from "react-icons/si";
import { ArrowUpRight } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import styles from "./Technologies.module.css";

const categories = [
  "Web Platform",
  "Databases",
  "Cloud & DevOps",
  "UI/UX",
  "AI",
  "Tools",
] as const;

type Category = (typeof categories)[number];

type TechItem = {
  name: string;
  icon: IconType;
  color: string;
};

const techData: Record<Category, TechItem[]> = {
  "Web Platform": [
    { name: "React Js", icon: FaReact, color: "#61DAFB" },
    { name: "Next Js", icon: SiNextdotjs, color: "#000000" },
    { name: "Node.js", icon: FaNodeJs, color: "#339933" },
    { name: "Ionic", icon: SiIonic, color: "#3880FF" },
    { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
    { name: "Vue.js", icon: FaVuejs, color: "#4FC08D" },
    { name: "Angular", icon: FaAngular, color: "#DD0031" },
    { name: "React Native", icon: FaReact, color: "#61DAFB" },
    { name: "Swift", icon: FaSwift, color: "#F05138" },
  ],
  Databases: [
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
    { name: "MySQL", icon: SiMysql, color: "#4479A1" },
    { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
  ],
  "Cloud & DevOps": [
    { name: "AWS", icon: FaAws, color: "#FF9900" },
    { name: "Docker", icon: FaDocker, color: "#2496ED" },
    { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
  ],
  "UI/UX": [
    { name: "Figma", icon: FaFigma, color: "#F24E1E" },
    { name: "Adobe XD", icon: SiAdobexd, color: "#FF61F6" },
  ],
  AI: [
    { name: "Python", icon: FaPython, color: "#3776AB" },
    { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
    { name: "OpenAI", icon: SiOpenai, color: "#412991" },
  ],
  Tools: [
    { name: "Git", icon: FaGitAlt, color: "#F05032" },
    { name: "Jira", icon: FaJira, color: "#0052CC" },
    { name: "Postman", icon: SiPostman, color: "#FF6C37" },
  ],
};

const ORBIT_PATH =
  "M-80 430 C 220 430, 420 120, 720 120 S 1220 430, 1560 430";

const EASE = [0.22, 1, 0.36, 1] as const;
const ROW_TOL = 32;

type Line = { x1: number; y1: number; x2: number; y2: number };

function buildLines(points: { x: number; y: number }[]): Line[] {
  if (points.length < 2) return [];

  const sorted = [...points].sort((a, b) => a.y - b.y || a.x - b.x);
  const rows: { x: number; y: number }[][] = [];

  for (const point of sorted) {
    const row = rows.find((candidate) => Math.abs(candidate[0].y - point.y) < ROW_TOL);
    if (row) row.push(point);
    else rows.push([point]);
  }

  rows.forEach((row) => row.sort((a, b) => a.x - b.x));

  const lines: Line[] = [];

  for (const row of rows) {
    for (let i = 0; i < row.length - 1; i += 1) {
      lines.push({
        x1: row[i].x,
        y1: row[i].y,
        x2: row[i + 1].x,
        y2: row[i + 1].y,
      });
    }
  }

  for (let r = 0; r < rows.length - 1; r += 1) {
    const top = rows[r];
    const bot = rows[r + 1];
    const ranked = top
      .map((a) => {
        let best = bot[0];
        let bestD = Infinity;
        for (const b of bot) {
          const d = Math.abs(a.x - b.x);
          if (d < bestD) {
            bestD = d;
            best = b;
          }
        }
        return { a, b: best, d: bestD };
      })
      .sort((a, b) => a.d - b.d);

    const used = new Set<string>();
    let added = 0;
    for (const candidate of ranked) {
      if (added >= 2) break;
      const key = `${candidate.b.x}:${candidate.b.y}`;
      if (used.has(key)) continue;
      used.add(key);
      lines.push({
        x1: candidate.a.x,
        y1: candidate.a.y,
        x2: candidate.b.x,
        y2: candidate.b.y,
      });
      added += 1;
    }
  }

  return lines;
}

function ConnectionLines({
  hostRef,
  itemCount,
  activeTab,
  enabled,
  gradientId,
}: {
  hostRef: RefObject<HTMLDivElement | null>;
  itemCount: number;
  activeTab: string;
  enabled: boolean;
  gradientId: string;
}) {
  const [lines, setLines] = useState<Line[]>([]);

  useLayoutEffect(() => {
    if (!enabled) {
      setLines([]);
      return;
    }

    const host = hostRef.current;
    if (!host) return;

    const measure = () => {
      const cards = host.querySelectorAll<HTMLElement>("[data-tech-hex]");
      const parent = host.getBoundingClientRect();
      const points = Array.from(cards).map((card) => {
        const rect = card.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2 - parent.left,
          y: rect.top + rect.height / 2 - parent.top,
        };
      });
      setLines(buildLines(points));
    };

    const frame = window.requestAnimationFrame(measure);
    const delayed = window.setTimeout(measure, 360);
    const observer = new ResizeObserver(measure);
    observer.observe(host);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(delayed);
      observer.disconnect();
    };
  }, [hostRef, itemCount, activeTab, enabled]);

  if (!enabled || lines.length === 0) return null;

  return (
    <svg className={styles.connections} aria-hidden>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#fb7185" />
        </linearGradient>
      </defs>
      {lines.map((line, index) => (
        <line
          key={`${line.x1}-${line.y1}-${index}`}
          className={styles.connectionLine}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke={`url(#${gradientId})`}
        />
      ))}
    </svg>
  );
}

function TechCard({
  tech,
  category,
  index,
  selected,
  reduce,
  onSelect,
}: {
  tech: TechItem;
  category: string;
  index: number;
  selected: boolean;
  reduce: boolean;
  onSelect: (name: string) => void;
}) {
  const Icon = tech.icon;

  return (
    <motion.article
      className={`${styles.card} ${selected ? styles.cardSelected : ""}`}
      style={{ "--i": index, "--logo": tech.color } as CSSProperties}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.88 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: reduce ? 0.2 : 0.42,
        delay: reduce ? 0 : index * 0.07,
        ease: EASE,
      }}
      onClick={() => onSelect(tech.name)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(tech.name);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={tech.name}
      aria-pressed={selected}
    >
      <div className={styles.cardLift}>
        <div className={reduce ? undefined : styles.cardFloat}>
          <div
            className={styles.tooltip}
            role="tooltip"
            aria-hidden
          >
            <span className={styles.tooltipName}>{tech.name}</span>
            <span className={styles.tooltipMeta}>
              <span className={styles.tooltipCat}>{category}</span>
              <ArrowUpRight className={styles.tooltipArrow} strokeWidth={2.2} />
            </span>
          </div>

          <div className={styles.hexStack}>
            <span className={styles.hexGlow} aria-hidden />
            <div className={styles.hexStage} data-tech-hex>
              <span className={styles.hexBorder} aria-hidden />
              <span className={styles.hexFace} aria-hidden />
              <span className={styles.hexContent}>
                <span className={styles.logo}>
                  <Icon size={40} style={{ color: tech.color }} aria-hidden />
                </span>
              </span>
            </div>
          </div>

          <div className={styles.nameWrap}>
            <span className={styles.name}>{tech.name}</span>
            <ArrowUpRight className={styles.explore} strokeWidth={2.4} aria-hidden />
          </div>
          <span className={styles.activeDot} aria-hidden />
        </div>
      </div>
    </motion.article>
  );
}

export default function TechnologiesSection() {
  const [activeTab, setActiveTab] = useState<Category>("Web Platform");
  const [selected, setSelected] = useState<string | null>(null);
  const [linesEnabled, setLinesEnabled] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const selectTimer = useRef<number | null>(null);
  const didCenterTab = useRef(false);

  const reduce = useReducedMotion() ?? false;
  const inView = useInView(sectionRef, { once: true, amount: 0.18 });
  const uid = useId().replace(/:/g, "");

  const items = techData[activeTab];
  const count = items.length;

  useEffect(() => {
    const media = window.matchMedia(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
    );
    const sync = () => setLinesEnabled(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const button = tabRefs.current[activeTab];
    const scroller = tabsRef.current;
    if (!button || !scroller) return;

    if (!didCenterTab.current) {
      didCenterTab.current = true;
      return;
    }

    const target =
      button.offsetLeft - (scroller.clientWidth - button.offsetWidth) / 2;

    scroller.scrollTo({
      left: Math.max(0, target),
      behavior: reduce ? "auto" : "smooth",
    });
  }, [activeTab, reduce]);

  useEffect(() => {
    return () => {
      if (selectTimer.current) window.clearTimeout(selectTimer.current);
    };
  }, []);

  const onSelect = useCallback((name: string) => {
    setSelected(name);
    if (selectTimer.current) window.clearTimeout(selectTimer.current);
    selectTimer.current = window.setTimeout(() => setSelected(null), 1400);
  }, []);

  const reveal = (delay: number) =>
    reduce
      ? { initial: { opacity: 0 }, animate: inView ? { opacity: 1 } : { opacity: 0 }, transition: { duration: 0.25, delay: 0 } }
      : {
          initial: { opacity: 0, y: 18, filter: "blur(6px)" },
          animate: inView
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: 18, filter: "blur(6px)" },
          transition: { duration: 0.75, delay, ease: EASE },
        };

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${inView ? styles.isVisible : ""}`}
      aria-labelledby="technologies-heading"
    >
      <div className={styles.bgCanvas} aria-hidden>
        <span className={styles.centerGlow} />
        <span className={`${styles.bgWord} ${styles.bgWordA}`}>CODE</span>
        <span className={`${styles.bgWord} ${styles.bgWordB}`}>DIGITAL</span>
        <span className={`${styles.bgWord} ${styles.bgWordC}`}>CLOUD</span>
        <span className={`${styles.bgWord} ${styles.bgWordD}`}>AI</span>
        <span className={`${styles.bgWord} ${styles.bgWordE}`}>BUILD</span>
        <span className={`${styles.bgWord} ${styles.bgWordF}`}>INNOVATE</span>

        <span className={`${styles.particle} ${styles.dot} ${styles.p1}`} />
        <span className={`${styles.particle} ${styles.dot} ${styles.p2}`} />
        <span className={`${styles.particle} ${styles.spark} ${styles.p3}`} />
        <span className={`${styles.particle} ${styles.dot} ${styles.p4}`} />
        <span className={`${styles.particle} ${styles.spark} ${styles.p5}`} />
        <span className={`${styles.particle} ${styles.dot} ${styles.p6} ${styles.hideMobile}`} />
        <span className={`${styles.particle} ${styles.dot} ${styles.p7} ${styles.hideMobile}`} />
        <span className={`${styles.particle} ${styles.spark} ${styles.p8} ${styles.hideMobile}`} />
      </div>

      <div className={styles.orbitWrap} aria-hidden>
        <svg className={styles.orbitSvg} viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id={`techOrbitGrad-${uid}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#fb7185" />
            </linearGradient>
            <radialGradient id={`techDotGrad-${uid}`}>
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#fb7185" />
            </radialGradient>
          </defs>
          <path
            className={styles.orbitPath}
            d={ORBIT_PATH}
            stroke={`url(#techOrbitGrad-${uid})`}
          />
          {!reduce && (
            <>
              <circle
                className={styles.orbitDot}
                r="5"
                fill={`url(#techDotGrad-${uid})`}
                style={{ offsetPath: `path('${ORBIT_PATH}')` }}
              />
              <circle
                className={styles.orbitDotSoft}
                r="3"
                fill="#818cf8"
                opacity="0.7"
                style={{ offsetPath: `path('${ORBIT_PATH}')` }}
              />
            </>
          )}
        </svg>
      </div>

      <div className={styles.inner}>
        <header className={styles.header}>
          <motion.div className={styles.labelRow} {...reveal(0.08)}>
            <span className={styles.labelRule} />
            <span className={styles.label}>Our Technologies</span>
            <span className={`${styles.labelRule} ${styles.labelRuleShort}`} />
          </motion.div>

          <motion.div {...reveal(0.26)} id="technologies-heading">
            <SectionTitle
              className={styles.mainTitle}
              textClassName={`${styles.titleShimmer} ${inView && !reduce ? styles.shimmerOn : ""}`}
            >
              We Use Technologies
            </SectionTitle>
          </motion.div>
        </header>

        <motion.div className={styles.navBlock} {...reveal(0.46)}>
          <div className={styles.tabsWrap}>
            <div
              ref={tabsRef}
              className={styles.tabs}
              role="tablist"
              aria-label="Technology categories"
            >
              {categories.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    ref={(node) => {
                      tabRefs.current[tab] = node;
                    }}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="tech-category-indicator"
                        className={styles.tabIndicator}
                        transition={
                          reduce
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 380, damping: 34 }
                        }
                      />
                    )}
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          <p className={styles.count} aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.span
                key={count}
                className={styles.countNum}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: EASE }}
              >
                {String(count).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
            {count === 1 ? "Technology" : "Technologies"}
          </p>
        </motion.div>

        <div className={styles.stage} ref={stageRef}>
          <ConnectionLines
            hostRef={stageRef}
            itemCount={count}
            activeTab={activeTab}
            enabled={linesEnabled && inView}
            gradientId={`techLineGrad-${uid}`}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className={styles.grid}
              role="tabpanel"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: reduce ? 0.18 : 0.28, ease: EASE }}
            >
              {items.map((tech, index) => (
                <TechCard
                  key={tech.name}
                  tech={tech}
                  category={activeTab}
                  index={index}
                  selected={selected === tech.name}
                  reduce={reduce}
                  onSelect={onSelect}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
