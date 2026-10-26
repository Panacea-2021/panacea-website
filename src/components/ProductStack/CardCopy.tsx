"use client";

import { useState, type MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { ProductItem } from "./productData";
import styles from "./productShowcase.module.css";

const EASE = [0.22, 0.9, 0.32, 1] as const;

type Ripple = { id: number; x: number; y: number };

function fade(delay: number, reduce: boolean) {
  if (reduce) {
    return {
      hidden: { opacity: 1, y: 0 },
      show: { opacity: 1, y: 0 },
      exit: { opacity: 1, y: 0 },
    };
  }

  return {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.56, ease: EASE, delay },
    },
    exit: {
      opacity: 0.35,
      y: 8,
      transition: { duration: 0.28, ease: EASE },
    },
  };
}

function spawnRipple(
  event: MouseEvent<HTMLElement>,
  setRipples: (update: (prev: Ripple[]) => Ripple[]) => void
) {
  const rect = event.currentTarget.getBoundingClientRect();
  const next: Ripple = {
    id: event.timeStamp + Math.random(),
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
  setRipples((prev) => [...prev.slice(-3), next]);
}

export default function CardCopy({
  product,
  active,
}: {
  product: ProductItem;
  active: boolean;
}) {
  const reduce = useReducedMotion() ?? false;
  const state = reduce || active ? "show" : "exit";
  const href = product.ctaHref ?? "/products";
  const [exploreRipples, setExploreRipples] = useState<Ripple[]>([]);
  const [studyRipples, setStudyRipples] = useState<Ripple[]>([]);

  return (
    <div className={styles.copy}>
      <motion.p
        className={styles.category}
        initial={false}
        animate={state}
        variants={fade(0.04, reduce)}
      >
        {product.category}
      </motion.p>

      <motion.h3
        className={styles.title}
        initial={false}
        animate={state}
        variants={fade(0.1, reduce)}
      >
        {product.title}
      </motion.h3>

      <motion.p
        className={styles.desc}
        initial={false}
        animate={state}
        variants={fade(0.18, reduce)}
      >
        {product.description}
      </motion.p>

      <motion.div
        className={styles.chips}
        initial={false}
        animate={state}
        variants={fade(0.26, reduce)}
      >
        {product.features.map((feature) => (
          <span key={feature} className={styles.chip}>
            {feature}
          </span>
        ))}
      </motion.div>

      <motion.p
        className={styles.story}
        initial={false}
        animate={state}
        variants={fade(0.34, reduce)}
      >
        {product.storyLine}
      </motion.p>

      <motion.div
        className={styles.ctaRow}
        initial={false}
        animate={state}
        variants={fade(0.42, reduce)}
      >
        <Link
          href={href}
          className={styles.cta}
          tabIndex={active ? 0 : -1}
          onClick={(event) => spawnRipple(event, setExploreRipples)}
        >
          {product.ctaLabel ?? "Explore product"}
          <span className={styles.ctaArrow} aria-hidden>
            →
          </span>
          {exploreRipples.map((ripple) => (
            <span
              key={ripple.id}
              className={styles.ripple}
              style={{ left: ripple.x, top: ripple.y }}
              onAnimationEnd={() =>
                setExploreRipples((prev) => prev.filter((item) => item.id !== ripple.id))
              }
            />
          ))}
        </Link>

        <Link
          href="/portfolio"
          className={styles.ctaGhost}
          tabIndex={active ? 0 : -1}
          onClick={(event) => spawnRipple(event, setStudyRipples)}
        >
          See case studies
          {studyRipples.map((ripple) => (
            <span
              key={ripple.id}
              className={styles.ripple}
              style={{ left: ripple.x, top: ripple.y }}
              onAnimationEnd={() =>
                setStudyRipples((prev) => prev.filter((item) => item.id !== ripple.id))
              }
            />
          ))}
        </Link>
      </motion.div>
    </div>
  );
}
