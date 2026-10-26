import React from "react";
import styles from "./SoftwareServicesBento.module.css";

export type ServiceVisualKind =
  | "code"
  | "browser"
  | "phone"
  | "network"
  | "ai"
  | "shop";

export default function ServiceMiniVisual({ kind }: { kind: ServiceVisualKind }) {
  switch (kind) {
    case "code":
      return (
        <div className={styles.viz} aria-hidden>
          <div className={styles.codeDots}>
            <i />
            <i />
            <i />
          </div>
          <pre className={styles.codeBody}>
            <span className={styles.kw}>const</span> product = {"{"}
            {"\n"}  <span className={styles.key}>secure</span>: true
            {"\n"}
            {"}"}
            <span className={styles.cursor} />
          </pre>
        </div>
      );
    case "browser":
      return (
        <div className={styles.viz} aria-hidden>
          <div className={styles.browserBar}>
            <div className={styles.browserDots}>
              <i />
              <i />
              <i />
            </div>
            <div className={styles.urlBar} />
          </div>
          <div className={styles.progress} />
          <div className={styles.browserBody}>
            <div className={styles.heroBlock} />
            <div className={styles.lineStack}>
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      );
    case "phone":
      return (
        <div className={styles.viz} aria-hidden style={{ display: "grid", placeItems: "center" }}>
          <div className={styles.phone}>
            <div className={styles.notch} />
            <div className={styles.phoneUi} />
            <div className={styles.phoneUi} />
            <span className={styles.notif} />
          </div>
        </div>
      );
    case "network":
      return (
        <div className={styles.viz} aria-hidden>
          <svg className={styles.netSvg} viewBox="0 0 116 70" fill="none">
            <line className={styles.dashPulse} x1="24" y1="36" x2="58" y2="18" stroke="#fdba74" strokeWidth="1.2" />
            <line className={styles.dashPulse} x1="58" y1="18" x2="92" y2="36" stroke="#fdba74" strokeWidth="1.2" />
            <line className={styles.dashPulse} x1="24" y1="36" x2="58" y2="54" stroke="#fed7aa" strokeWidth="1.2" />
            <line className={styles.dashPulse} x1="92" y1="36" x2="58" y2="54" stroke="#fed7aa" strokeWidth="1.2" />
            <circle className={styles.pulseDot} cx="24" cy="36" r="5" fill="#fb923c" />
            <circle className={styles.pulseDot} cx="58" cy="18" r="5" fill="#f59e0b" style={{ animationDelay: "0.4s" }} />
            <circle className={styles.pulseDot} cx="92" cy="36" r="5" fill="#fb923c" style={{ animationDelay: "0.8s" }} />
            <circle className={styles.pulseDot} cx="58" cy="54" r="5" fill="#f59e0b" style={{ animationDelay: "1.2s" }} />
          </svg>
        </div>
      );
    case "ai":
      return (
        <div className={styles.viz} aria-hidden>
          <svg className={styles.aiSvg} viewBox="0 0 116 70" fill="none">
            <line x1="22" y1="20" x2="58" y2="35" stroke="#f9a8d4" strokeWidth="1" />
            <line x1="22" y1="50" x2="58" y2="35" stroke="#f9a8d4" strokeWidth="1" />
            <line x1="58" y1="35" x2="94" y2="20" stroke="#f9a8d4" strokeWidth="1" />
            <line x1="58" y1="35" x2="94" y2="50" stroke="#f9a8d4" strokeWidth="1" />
            <circle className={styles.aiGlow} cx="22" cy="20" r="4" fill="#ec4899" />
            <circle className={styles.aiGlow} cx="22" cy="50" r="4" fill="#f472b6" style={{ animationDelay: "0.35s" }} />
            <circle className={styles.pulseDot} cx="58" cy="35" r="5.5" fill="#db2777" />
            <circle className={styles.aiGlow} cx="94" cy="20" r="4" fill="#ec4899" style={{ animationDelay: "0.7s" }} />
            <circle className={styles.aiGlow} cx="94" cy="50" r="4" fill="#f472b6" style={{ animationDelay: "1s" }} />
            <circle className={styles.aiGlow} cx="40" cy="12" r="1.6" fill="#fbcfe8" style={{ animationDelay: "0.2s" }} />
            <circle className={styles.aiGlow} cx="78" cy="58" r="1.6" fill="#fbcfe8" style={{ animationDelay: "0.9s" }} />
          </svg>
        </div>
      );
    case "shop":
      return (
        <div className={styles.viz} aria-hidden>
          <div className={styles.shop}>
            <div className={styles.shopThumb} />
            <div className={styles.shopMeta}>
              <span />
              <b>$49</b>
            </div>
            <div className={styles.cartWrap}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6h15l-1.5 9h-12z" />
                <path d="M6 6 5 3H2" />
                <circle cx="9" cy="20" r="1.3" fill="currentColor" />
                <circle cx="18" cy="20" r="1.3" fill="currentColor" />
              </svg>
              <span className={styles.cartBadge} />
            </div>
          </div>
        </div>
      );
  }
}
