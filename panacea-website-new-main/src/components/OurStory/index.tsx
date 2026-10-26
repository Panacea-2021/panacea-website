"use client";

import { useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { Award, Layers, MapPin, ShieldCheck } from "lucide-react";
import StoryIdentity from "./StoryIdentity";
import StoryContent from "./StoryContent";
import StoryMetricCard, { type MetricId, type StoryMetric } from "./StoryMetricCard";
import styles from "./OurStory.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

const STATS: StoryMetric[] = [
  {
    id: "projects",
    icon: Layers,
    value: 1500,
    suffix: "+",
    label: "Projects delivered",
    accent: "pink",
  },
  {
    id: "years",
    icon: Award,
    value: 14,
    suffix: "+",
    label: "Years of excellence",
    accent: "blue",
  },
  {
    id: "iso",
    icon: ShieldCheck,
    display: "ISO",
    label: "Certified IT company",
    accent: "teal",
  },
  {
    id: "offices",
    icon: MapPin,
    value: 2,
    label: "Offices · Hyderabad & USA",
    accent: "orange",
  },
];

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2, margin: "-36px 0px" });
  const reduced = useReducedMotion() === true;
  const visible = inView || reduced;
  const [selectedMetric, setSelectedMetric] = useState<MetricId | null>("projects");

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="our-story-heading"
    >
      <div className={styles.wrap}>
        <motion.header
          className={styles.headingBlock}
          initial={reduced ? false : { opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={
            visible
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 18, filter: "blur(8px)" }
          }
          transition={{ duration: 0.55, ease }}
        >
          <h2 id="our-story-heading" className={styles.heading}>
            <span className={styles.headingText}>Our Story</span>
          </h2>
          <div className={styles.headingAccent} aria-hidden>
            <motion.span
              className={styles.headingRail}
              initial={reduced ? false : { scaleX: 0, opacity: 0 }}
              animate={visible ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.45, delay: reduced ? 0 : 0.16, ease }}
            />
            <motion.span
              className={styles.headingDot}
              initial={reduced ? false : { scale: 0, opacity: 0 }}
              animate={visible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.35, delay: reduced ? 0 : 0.28, ease }}
            />
            <motion.span
              className={styles.headingRail}
              initial={reduced ? false : { scaleX: 0, opacity: 0 }}
              animate={visible ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.45, delay: reduced ? 0 : 0.16, ease }}
            />
          </div>
        </motion.header>

        <div className={styles.surface}>
          <div className={styles.bg} aria-hidden>
            <svg
              className={styles.bgSvg}
              viewBox="0 0 1200 500"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="storyMatter" x1="0" y1="0" x2="1" y2="0">
                  <stop stopColor="#a9dcf5" />
                  <stop offset="0.48" stopColor="#dfe3fa" />
                  <stop offset="1" stopColor="#f5cce1" />
                </linearGradient>
              </defs>
              <path
                d="M22 0H350C430 78 506 136 650 136C790 136 872 42 982 34C1076 27 1142 61 1200 110V478Q1200 500 1178 500H780C720 432 680 404 600 404C500 404 455 438 360 472C275 503 220 486 155 486C100 486 36 462 0 440V22Q0 0 22 0Z"
                fill="url(#storyMatter)"
                transform="translate(40 16) scale(0.93 0.936)"
              />
            </svg>
          </div>
          <div className={styles.layout}>
            <StoryIdentity visible={visible} reduced={reduced} />

            <div className={styles.storyCol}>
              <StoryContent visible={visible} reduced={reduced} />
            </div>

            <div className={styles.metricsWrap}>
              <ul className={styles.metrics}>
                {STATS.map((metric, index) => (
                  <StoryMetricCard
                    key={metric.id}
                    metric={metric}
                    index={index}
                    visible={visible}
                    reduced={reduced}
                    active={selectedMetric === metric.id}
                    onSelect={() =>
                      setSelectedMetric(selectedMetric === metric.id ? null : metric.id)
                    }
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
