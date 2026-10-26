"use client";

import { motion } from "framer-motion";
import styles from "./OurStory.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

type StoryContentProps = {
  visible: boolean;
  reduced: boolean;
};

export default function StoryContent({ visible, reduced }: StoryContentProps) {
  const reveal = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 12, filter: "blur(5px)" },
    animate:
      visible || reduced
        ? { opacity: 1, y: 0, filter: "blur(0px)" }
        : { opacity: 0, y: 12, filter: "blur(5px)" },
    transition: { duration: 0.48, delay: reduced ? 0 : delay, ease },
  });

  return (
    <div className={styles.content}>
      <motion.div className={styles.chapter} {...reveal(0.22)}>
        <h3 className={styles.kicker}>Research-driven technology</h3>
        <p className={styles.copy}>
          Panacea IT Services Pvt Ltd is a{" "}
          <em className={styles.emph}>research-driven technology</em> company
          founded by industry experts with deep expertise in mobile, web, and
          enterprise software for modern businesses worldwide.
        </p>
      </motion.div>

      <motion.div className={styles.chapter} {...reveal(0.34)}>
        <h3 className={`${styles.kicker} ${styles.kickerSubtle}`}>
          Product excellence + client-first vision
        </h3>
        <p className={styles.copy}>
          Driven by <em className={styles.emph}>product excellence</em> and a{" "}
          <em className={styles.emph}>client-first vision</em>, we help startups
          and global brands turn ambitious ideas into reliable digital products —
          combining thoughtful design,{" "}
          <em className={styles.emph}>modern engineering</em>, and{" "}
          <em className={styles.emph}>measurable outcomes</em>.
        </p>
      </motion.div>

      <motion.div className={styles.chapter} {...reveal(0.46)}>
        <h3 className={`${styles.kicker} ${styles.kickerSubtle}`}>
          Trusted global partner
        </h3>
        <p className={styles.copy}>
          For over a decade, Panacea has stood as a trusted partner from Hyderabad
          to the USA, delivering ISO-certified quality across custom software, SaaS
          platforms, cloud, and digital growth services.
        </p>
      </motion.div>
    </div>
  );
}
