"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { motion, useInView, useReducedMotion } from "framer-motion";
import AwardsBackground from "./AwardsBackground";
import AwardCarousel from "./AwardCarousel";
import { EASE } from "./data";
import styles from "./Awards.module.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export default function AwardsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const inView = useInView(sectionRef, { amount: 0.18, margin: "8% 0px" });
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="awards-heading"
    >
      <AwardsBackground reduceMotion={reduceMotion} active={inView} />

      <div className={styles.inner}>
        <motion.header
          className={styles.header}
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.55, ease: EASE }}
        >
          <p className={styles.kicker}>Our Awards</p>
          <h2 id="awards-heading" className={`${styles.heading} ${playfair.className}`}>
            A Legacy of Distinction
          </h2>
          <p className={styles.subheading}>
            Recognizing creativity, craftsmanship, and ideas that leave a lasting
            mark.
          </p>
        </motion.header>

        <AwardCarousel reduceMotion={reduceMotion} inView={inView} />

        <motion.div
          className={styles.ctaWrap}
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.45, ease: EASE }}
        >
          <Link
            href="/awards"
            className={styles.cta}
            onClick={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              const id = Date.now();
              setRipples((prev) => [
                ...prev,
                { id, x: event.clientX - rect.left, y: event.clientY - rect.top },
              ]);
              window.setTimeout(() => {
                setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
              }, 700);
            }}
          >
            {ripples.map((ripple) => (
              <span
                key={ripple.id}
                className={styles.ctaRipple}
                style={{ left: ripple.x, top: ripple.y }}
                aria-hidden
              />
            ))}
            View All Achievements
            <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
