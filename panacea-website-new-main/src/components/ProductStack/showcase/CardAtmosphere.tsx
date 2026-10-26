"use client";

import type { ProductItem } from "../productData";
import styles from "../showcase.module.css";

const WAVE =
  "M0,72 C180,120 360,24 540,72 C720,120 900,24 1080,72 C1260,120 1440,40 1620,72 L1620,140 L0,140 Z";

function WaveBand({
  fill,
  className,
  height,
}: {
  fill: string;
  className: string;
  height: string;
}) {
  return (
    <div className={`absolute left-0 right-0 ${height} overflow-hidden pointer-events-none`}>
      <div className={`${styles.waveTrack} ${className}`}>
        <svg viewBox="0 0 1620 140" className="w-1/2 h-full" preserveAspectRatio="none" aria-hidden>
          <path d={WAVE} fill={fill} />
        </svg>
        <svg viewBox="0 0 1620 140" className="w-1/2 h-full" preserveAspectRatio="none" aria-hidden>
          <path d={WAVE} fill={fill} />
        </svg>
      </div>
    </div>
  );
}

export default function CardAtmosphere({
  product,
  active,
}: {
  product: ProductItem;
  active: boolean;
}) {
  const pause = active ? "" : styles.paused;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0 opacity-70"
        style={{ background: product.meshGradient, backgroundSize: "200% 200%" }}
      />

      <div
        className={`absolute -left-[10%] top-[8%] w-[58%] h-[58%] rounded-full blur-[56px] opacity-45 ${
          active ? styles.floatYSlow : ""
        } ${pause}`}
        style={{ background: product.blobColors[0] }}
      />
      <div
        className={`absolute -right-[8%] bottom-[4%] w-[50%] h-[50%] rounded-full blur-[52px] opacity-35 ${
          active ? styles.floatX : ""
        } ${pause}`}
        style={{ background: product.blobColors[1] }}
      />

      <WaveBand
        fill="rgba(255,255,255,0.07)"
        className={pause}
        height="bottom-[-4%] h-[34%]"
      />
      <WaveBand
        fill="rgba(255,255,255,0.04)"
        className={`${styles.waveTrackReverse} ${pause}`}
        height="bottom-[8%] h-[26%]"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/12" />
    </div>
  );
}
