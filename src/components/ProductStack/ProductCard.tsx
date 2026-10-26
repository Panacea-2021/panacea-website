"use client";

import { useState } from "react";
import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import type { ProductItem } from "./productData";
import CardAtmosphere from "./showcase/CardAtmosphere";
import ProductShowcase from "./showcase/ProductShowcase";
import CardCopy from "./CardCopy";
import styles from "./productShowcase.module.css";

type Props = {
  product: ProductItem;
  index: number;
  isActive: boolean;
  isNearActive?: boolean;
};

export default function ProductCard({
  product,
  index,
  isActive,
  isNearActive = false,
}: Props) {
  const reduce = useReducedMotion() ?? false;
  const [hovered, setHovered] = useState(false);
  const liveHover = isActive && hovered && !reduce;
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  return (
    <motion.article
      className={`${styles.card} ${liveHover ? styles.cardHovered : ""} bg-gradient-to-br ${product.gradient}`}
      style={{
        ["--card-glow" as string]: product.imageGlow,
        transformPerspective: 1100,
      }}
      aria-label={product.title}
      aria-hidden={!isActive}
      aria-current={isActive ? "true" : undefined}
      {...(!isActive ? { inert: true } : {})}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
      }}
    >
      <span className={styles.cardBorder} aria-hidden />
      <span className={styles.cardGlass} aria-hidden />
      <span className={styles.cardSheen} aria-hidden />
      <span className={styles.cardNeon} aria-hidden />
      <CardAtmosphere product={product} active={isActive && !reduce} />

      <div
        className={styles.scrim}
        style={{
          background:
            product.theme === "childcare"
              ? "linear-gradient(90deg, rgba(8,28,52,0.42) 0%, rgba(8,28,52,0.18) 46%, transparent 78%)"
              : product.theme === "influencer"
                ? "linear-gradient(90deg, rgba(28,10,48,0.42) 0%, rgba(28,10,48,0.18) 46%, transparent 78%)"
                : product.theme === "funds"
                  ? "linear-gradient(90deg, rgba(36,10,32,0.42) 0%, rgba(36,10,32,0.18) 46%, transparent 78%)"
                  : product.theme === "stocks"
                    ? "linear-gradient(90deg, rgba(4,32,36,0.42) 0%, rgba(4,32,36,0.16) 46%, transparent 78%)"
                    : "linear-gradient(90deg, rgba(40,18,8,0.42) 0%, rgba(40,18,8,0.18) 46%, transparent 78%)",
        }}
        aria-hidden
      />
      <div
        className={styles.imageGlow}
        style={{
          opacity: liveHover ? 1 : isActive ? 0.58 : 0.34,
          background: `radial-gradient(55% 50% at 74% 48%, ${product.imageGlow}, transparent 70%)`,
        }}
        aria-hidden
      />

      <span className={styles.watermark} aria-hidden>
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className={styles.cardBody}>
        <CardCopy product={product} active={isActive} />

        <div
          className={`${styles.visual} ${isActive && !reduce ? styles.visualSweep : ""}`}
        >
          <ProductShowcase
            product={product}
            isActive={isActive}
            isNearActive={isNearActive || isActive}
            hovered={liveHover}
            px={px}
            py={py}
          />
        </div>
      </div>
    </motion.article>
  );
}
