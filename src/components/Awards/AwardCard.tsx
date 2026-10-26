"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EASE, type Award } from "./data";
import styles from "./Awards.module.css";

export default function AwardCard({
  award,
  index,
  featured,
  reduceMotion,
}: {
  award: Award;
  index: number;
  featured: boolean;
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0.01 : 0.55,
        delay: reduceMotion ? 0 : index * 0.08,
        ease: EASE,
      }}
    >
      <article
        className={`${styles.card} ${featured ? styles.cardFeatured : ""}`}
        tabIndex={featured ? 0 : -1}
      >
        <span className={styles.cardGlow} aria-hidden />
        <span className={styles.cardShine} aria-hidden />

        <div className={styles.cardInner}>
          <div className={styles.cardArt}>
            <Image
              src={award.visual}
              alt={award.visualAlt}
              fill
              sizes="(max-width: 767px) 88vw, 360px"
              className={styles.cardArtImage}
            />
            <span className={styles.cardArtShade} aria-hidden />
          </div>
          <div className={styles.cardContent}>
            <p className={styles.year}>{award.year}</p>
            <span className={styles.categoryChip}>{award.category}</span>
            <h3 className={styles.cardTitle}>{award.title}</h3>
            <p className={styles.cardHighlight}>{award.highlight}</p>
            <p className={styles.cardDesc}>{award.description}</p>
          </div>
        </div>
      </article>
    </motion.div>
  );
}
