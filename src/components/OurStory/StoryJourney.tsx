"use client";

import { motion } from "framer-motion";
import styles from "./OurStory.module.css";
import type { MetricId } from "./StoryMetricCard";

const ease = [0.22, 1, 0.36, 1] as const;

export type JourneyMetricId = MetricId;

const MILESTONES: {
  year: string;
  caption: string;
  metricId: JourneyMetricId;
}[] = [
  { year: "2010", caption: "Foundation", metricId: "years" },
  { year: "14+ Years", caption: "Experience", metricId: "years" },
  { year: "1,500+", caption: "Projects", metricId: "projects" },
  { year: "Global", caption: "Delivery", metricId: "offices" },
];

type StoryJourneyProps = {
  visible: boolean;
  reduced: boolean;
  activeMetric: JourneyMetricId | null;
  onHighlight: (id: JourneyMetricId | null) => void;
};

export default function StoryJourney({
  visible,
  reduced,
  activeMetric,
  onHighlight,
}: StoryJourneyProps) {
  return (
    <div className={styles.journey} aria-label="Company journey">
      <div className={styles.journeyTrack} aria-hidden>
        <motion.span
          className={styles.journeyPath}
          initial={reduced ? false : { scaleX: 0, opacity: 0.25 }}
          animate={
            visible || reduced
              ? { scaleX: 1, opacity: 0.7 }
              : { scaleX: 0, opacity: 0.25 }
          }
          transition={{ duration: 0.9, delay: reduced ? 0 : 0.55, ease }}
        />
      </div>

      <ol className={styles.journeyList}>
        {MILESTONES.map((step, index) => (
          <motion.li
            key={`${step.year}-${step.caption}`}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={
              visible || reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }
            }
            transition={{
              duration: 0.4,
              delay: reduced ? 0 : 0.52 + index * 0.08,
              ease,
            }}
          >
            <button
              type="button"
              className={`${styles.journeyItem} ${
                activeMetric === step.metricId ? styles.journeyItemActive : ""
              }`}
              onMouseEnter={() => onHighlight(step.metricId)}
              onMouseLeave={() => onHighlight(null)}
              onFocus={() => onHighlight(step.metricId)}
              onBlur={() => onHighlight(null)}
            >
              <span className={styles.journeyDot} aria-hidden />
              <span>
                <span className={styles.journeyYear}>{step.year}</span>
                <span className={styles.journeyCaption}>{step.caption}</span>
              </span>
            </button>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
