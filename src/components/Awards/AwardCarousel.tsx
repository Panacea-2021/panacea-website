"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AwardCard from "./AwardCard";
import { AUTO_MS, AWARDS, EASE } from "./data";
import styles from "./Awards.module.css";

function wrap(index: number, length: number) {
  return (index + length) % length;
}

export default function AwardCarousel({
  reduceMotion,
  inView,
}: {
  reduceMotion: boolean;
  inView: boolean;
}) {
  const [active, setActive] = useState(0);
  const pointerX = useRef(0);
  const labelId = useId();
  const count = AWARDS.length;

  const go = useCallback((next: number) => {
    setActive(wrap(next, count));
  }, [count]);

  useEffect(() => {
    if (reduceMotion || !inView) return;
    const id = window.setInterval(() => go(active + 1), AUTO_MS);
    return () => window.clearInterval(id);
  }, [active, go, inView, reduceMotion]);

  const offsetOf = (index: number) => {
    let offset = index - active;
    if (offset > count / 2) offset -= count;
    if (offset < -count / 2) offset += count;
    return offset;
  };

  return (
    <div
      className={styles.carousel}
      role="region"
      aria-roledescription="carousel"
      aria-labelledby={labelId}
      onPointerDown={(event) => {
        pointerX.current = event.clientX;
      }}
      onPointerUp={(event) => {
        const delta = event.clientX - pointerX.current;
        if (delta > 48) go(active - 1);
        if (delta < -48) go(active + 1);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          go(active - 1);
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          go(active + 1);
        }
      }}
      tabIndex={0}
    >
      <p id={labelId} className={styles.srOnly}>
        Awards from 2021 to 2024. Currently showing {AWARDS[active].title}.
      </p>

      <div className={styles.stage} aria-live="polite">
        {AWARDS.map((award, index) => {
          const offset = offsetOf(index);
          const visible = Math.abs(offset) <= 1;
          return (
            <motion.div
              key={award.id}
              className={styles.slide}
              style={{
                zIndex: visible ? 4 - Math.abs(offset) : 0,
                pointerEvents: visible ? "auto" : "none",
                cursor: offset === 0 ? "default" : "pointer",
              }}
              animate={{
                x: `${-50 + offset * 76}%`,
                y: "-50%",
                rotate: offset === 0 ? 0 : offset * -5,
                scale: offset === 0 ? 1 : 0.82,
                opacity: visible ? (offset === 0 ? 1 : 0.86) : 0,
                filter: "blur(0px)",
              }}
              transition={{
                duration: reduceMotion ? 0.01 : (AUTO_MS / 1000) * 0.88,
                ease: "linear",
              }}
              aria-hidden={!visible}
              onClick={() => {
                if (offset !== 0) go(index);
              }}
            >
              <AwardCard
                award={award}
                index={index}
                featured={offset === 0}
                reduceMotion={reduceMotion}
              />
            </motion.div>
          );
        })}
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.navBtn}
          aria-label="Previous award"
          onClick={() => go(active - 1)}
        >
          ‹
        </button>

        <div className={styles.dots} role="tablist" aria-label="Select award year">
          {AWARDS.map((award, index) => (
            <button
              key={award.id}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-label={`${award.year}: ${award.title}`}
              className={`${styles.dot} ${index === active ? styles.dotActive : ""}`}
              onClick={() => go(index)}
            >
              <span className={styles.dotYear}>{award.year}</span>
              {index === active && !reduceMotion && inView && (
                <span className={styles.dotProgress} />
              )}
            </button>
          ))}
        </div>

        <button
          type="button"
          className={styles.navBtn}
          aria-label="Next award"
          onClick={() => go(active + 1)}
        >
          ›
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={AWARDS[active].id}
          className={styles.liveCaption}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: 0.32, ease: EASE }}
        >
          {AWARDS[active].year} · {AWARDS[active].title}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
