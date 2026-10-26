import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./OurStory.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

type StoryIdentityProps = {
  visible: boolean;
  reduced: boolean;
};

export default function StoryIdentity({ visible, reduced }: StoryIdentityProps) {
  const [zoomed, setZoomed] = useState(false);

  return (
    <motion.div
      className={styles.identity}
      initial={reduced ? false : { opacity: 0, y: 14, filter: "blur(6px)" }}
      animate={
        visible || reduced
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: 14, filter: "blur(6px)" }
      }
      transition={{ duration: 0.5, delay: reduced ? 0 : 0.16, ease }}
    >
      <p className={styles.brandEyebrow}>
        <span className={styles.brandMark} aria-hidden />
        Panacea IT Services
      </p>

      <button
        type="button"
        className={`${styles.identityInner} ${zoomed ? styles.identityZoomed : ""}`}
        aria-label={zoomed ? "Zoom out Panacea logo" : "Zoom in Panacea logo"}
        aria-pressed={zoomed}
        onClick={() => setZoomed(!zoomed)}
      >
        <span className={styles.orbGlow} aria-hidden />
        <span className={styles.techPattern} aria-hidden />
        <span className={styles.ring} data-ring="1" aria-hidden />
        <span className={styles.ring} data-ring="2" aria-hidden />
        <span className={styles.orbit} aria-hidden>
          <span className={styles.orbitDot} />
        </span>

        <div className={styles.orb}>
          <Image
            src="/logo.png"
            alt="Panacea IT Services"
            fill
            className="object-cover scale-[1.04]"
            sizes="140px"
          />
        </div>

        <span className={styles.est}>EST. 2010+</span>
      </button>

      <p className={styles.tagline}>Engineering ideas into digital impact.</p>
    </motion.div>
  );
}
