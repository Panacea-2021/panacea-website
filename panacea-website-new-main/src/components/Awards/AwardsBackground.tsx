"use client";

import { useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PARTICLES } from "./data";
import styles from "./Awards.module.css";

gsap.registerPlugin(useGSAP);

export default function AwardsBackground({
  reduceMotion,
  active,
}: {
  reduceMotion: boolean;
  active: boolean;
}) {
  const pause = reduceMotion ? styles.animOff : "";
  const waveRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (reduceMotion || !waveRef.current) return;
      gsap.to(waveRef.current.querySelectorAll("path"), {
        x: (index) => (index % 2 === 0 ? -48 : 36),
        duration: (index) => 10 + index * 2.4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: 0.35,
      });
    },
    { dependencies: [reduceMotion] }
  );

  return (
    <div className={`${styles.bgCanvas} ${active ? styles.bgActive : ""}`} aria-hidden>
      <div className={styles.bgBase} />
      <div className={`${styles.bgWaves} ${pause}`}>
        <svg ref={waveRef} viewBox="0 0 1440 420" preserveAspectRatio="none">
          <path
            d="M0,260 C240,190 360,330 560,250 C760,170 900,310 1100,230 C1240,176 1360,210 1440,188 L1440,420 L0,420 Z"
            fill="rgba(220,105,92,0.18)"
          />
          <path
            d="M0,300 C220,240 400,360 620,290 C840,220 980,340 1180,270 C1300,228 1380,250 1440,240 L1440,420 L0,420 Z"
            fill="rgba(210,151,83,0.14)"
          />
          <path
            d="M0,340 C260,300 420,380 680,330 C940,280 1080,370 1280,320 C1360,300 1410,310 1440,308 L1440,420 L0,420 Z"
            fill="rgba(72,103,166,0.16)"
          />
        </svg>
      </div>

      <div className={styles.titleSpot} />
      <div className={styles.titleSpotGold} />
      <div className={`${styles.spotBeam} ${styles.spotBeamA} ${pause}`} />
      <div className={`${styles.spotBeam} ${styles.spotBeamB} ${pause}`} />

      {!reduceMotion && (
        <div className={styles.bgParticles}>
          {PARTICLES.map((p, i) => (
            <span
              key={i}
              className={`${styles.particle} ${
                p.tone === "gold"
                  ? styles.toneGold
                  : p.tone === "silver"
                    ? styles.toneSilver
                    : styles.toneWhite
              }`}
              style={
                {
                  left: p.left,
                  top: p.top,
                  width: p.size,
                  height: p.size,
                  "--dur": `${p.dur}s`,
                  "--delay": `${p.delay}s`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
