"use client";

import dynamic from "next/dynamic";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import OfferingCard from "./OfferingCard";
import OfferingParticles from "./OfferingParticles";
import { offerings } from "./offeringData";
import styles from "./Offering.module.css";

const OfferingScene = dynamic(() => import("./OfferingScene"), {
  ssr: false,
});

export default function Offering() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() === true;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const orbY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-70, 80]);
  const particleY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-28, 42]);
  const ringY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [36, -52]);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="offering-heading"
    >
      <motion.div className={styles.parallaxLayer} style={{ y: orbY }} aria-hidden>
        <span className={`${styles.orb} ${styles.orbViolet}`} />
        <span className={`${styles.orb} ${styles.orbTeal}`} />
        <span className={`${styles.orb} ${styles.orbSilver}`} />
        <span className={styles.dotGrid} />
      </motion.div>

      <motion.div className={styles.particles} style={{ y: particleY }} aria-hidden>
        <OfferingParticles />
      </motion.div>

      <div className={styles.inner}>
        <motion.div
          className={styles.copy}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowTrack} aria-hidden>
              <span className={styles.eyebrowKnob} />
            </span>
            Our Offering
          </div>

          <h2 id="offering-heading" className={styles.heading}>
            Boost And Lead With Technology Trends
          </h2>

          <motion.p
            className={styles.subhead}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.22, duration: 0.8, ease: "easeOut" }}
          >
            Empowering your digital journey with state-of-the-art solutions tailored
            to elevate your business in the modern technical era.
          </motion.p>
        </motion.div>

        <div className={styles.stage}>
          <motion.div className={styles.ring} style={{ y: ringY }} aria-hidden>
            <OfferingScene />
          </motion.div>
          <div className={styles.grid}>
            {offerings.map((item, index) => (
              <OfferingCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
