"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import type { ProductItem } from "../productData";
import SafeImage from "./SafeImage";
import styles from "../showcase.module.css";
import type { ReactNode } from "react";

type Props = {
  product: ProductItem;
  active: boolean;
  hovered: boolean;
  px: MotionValue<number>;
  py: MotionValue<number>;
  device?: ReactNode;
};

export default function LayeredMedia({
  product,
  active,
  hovered,
  px,
  py,
  device,
}: Props) {
  const extras = product.supportingImages;
  const support = extras[0];
  const detail = extras[1];
  const pause = active ? "" : styles.paused;

  const mainX = useTransform(px, (v) => v * 10);
  const mainY = useTransform(py, (v) => v * 8);
  const supportX = useTransform(px, (v) => v * -12);
  const supportY = useTransform(py, (v) => v * -9);
  const detailX = useTransform(px, (v) => v * 16);
  const detailY = useTransform(py, (v) => v * -11);
  const deviceX = useTransform(px, (v) => v * -8);
  const deviceY = useTransform(py, (v) => v * 12);

  return (
    <div
      className={`${styles.cluster} ${hovered ? styles.hovered : ""} ${
        active ? styles.activeMedia : styles.idleMedia
      }`}
    >
      <div
        className={styles.glowOrb}
        style={{ background: product.imageGlow }}
        aria-hidden
      />

      <div className={styles.heroWrap}>
        <motion.div style={{ x: mainX, y: mainY }} className="h-full w-full">
          <div className={`h-full w-full ${active ? styles.floatY : ""} ${pause}`}>
            <div className={styles.heroFrame}>
              <SafeImage
                src={product.imageUrl}
                alt={product.imageAlt}
                className={`${styles.heroImg} ${active ? styles.kenBurns : ""}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
            </div>
          </div>
        </motion.div>
      </div>

      {support && (
        <div className={`${styles.supportWrap} hidden sm:block`}>
          <motion.div style={{ x: supportX, y: supportY }} className="h-full w-full">
            <div
              className={`${styles.supportFrame} ${active ? styles.drift : ""} ${pause}`}
            >
              <SafeImage src={support.src} alt={support.alt} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </motion.div>
        </div>
      )}

      {detail && (
        <div className={`${styles.detailWrap} hidden sm:block`}>
          <motion.div style={{ x: detailX, y: detailY }} className="h-full w-full">
            <div
              className={`${styles.detailFrame} ${active ? styles.floatYSlow : ""} ${pause}`}
            >
              <SafeImage src={detail.src} alt={detail.alt} />
            </div>
          </motion.div>
        </div>
      )}

      {device && (
        <div className={`${styles.deviceWrap} hidden sm:block`}>
          <motion.div style={{ x: deviceX, y: deviceY }}>
            <div className={pause}>{device}</div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
