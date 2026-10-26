"use client";

import Link from "next/link";
import { Dancing_Script, Montserrat } from "next/font/google";
import styles from "./HiringTag.module.css";

const dancing = Dancing_Script({
  weight: ["600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  weight: ["500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export default function HiringTag({ hidden = false }: { hidden?: boolean }) {
  return (
    <Link
      href="/careers"
      aria-label="We are hiring — view careers"
      className={`${styles.hiringTag} ${hidden ? styles.hiringHidden : ""}`}
    >
      <span className={styles.pin} aria-hidden>
        <span className={styles.pinHead} />
        <span className={styles.pinShine} />
      </span>

      <span className={styles.swing}>
        <span className={styles.strings} aria-hidden>
          <span className={styles.string} />
          <span className={styles.string} />
        </span>

        <span className={styles.card}>
          <span className={styles.gloss} aria-hidden />
          <span className={styles.eyelets} aria-hidden>
            <span className={styles.eyelet} />
            <span className={styles.eyelet} />
          </span>
          <span className={`${styles.copy} ${montserrat.className}`}>
            <span className={`${styles.come} ${dancing.className}`}>Come in!</span>
            <span className={styles.we}>WE ARE</span>
            <span className={styles.hire}>HIRING</span>
          </span>
        </span>
      </span>
    </Link>
  );
}
