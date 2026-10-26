"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  ArrowRight,
  Layers,
  Smartphone,
  Sparkles,
  Cpu,
} from "lucide-react";
import styles from "./About.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

const HEADING = [
  { text: "Turning Ideas", className: styles.lineA },
  { text: "Into Digital", className: styles.lineB },
  { text: "Reality", className: styles.lineC },
] as const;

const HIGHLIGHTS = [
  {
    icon: Layers,
    title: "Digital Product Development",
    desc: "From concept to launch, built to scale.",
  },
  {
    icon: Smartphone,
    title: "Web & Mobile Solutions",
    desc: "Experiences that perform on every device.",
  },
  {
    icon: Sparkles,
    title: "AI & Automation",
    desc: "Smarter workflows, measurable efficiency.",
  },
  {
    icon: Cpu,
    title: "Enterprise Technology",
    desc: "Consulting and systems that grow with you.",
  },
] as const;

const METRICS = [
  { value: 79, suffix: "+", label: "Projects Delivered" },
  { value: 32, suffix: "+", label: "Active Clients" },
  { value: 14, suffix: "+", label: "Years of Innovation" },
  { value: 95, suffix: "%", label: "Client Satisfaction" },
] as const;

const MINI_METRICS = [
  { value: 20, suffix: "+", label: "Technologies" },
  { value: 15, suffix: "+", label: "Industry Solutions" },
] as const;

const PHOTOS = [
  {
    src: "/aboutus.webp",
    alt: "Panacea team collaborating on digital product design",
    className: styles.photoPrimary,
    frameClass: "",
    sizes: "(max-width: 900px) 78vw, 340px",
    depth: 8,
  },
  {
    src: "/whyBusinessTrustUs.png",
    alt: "Business leaders reviewing growth strategy in a modern office",
    className: styles.photoA,
    frameClass: "",
    sizes: "(max-width: 900px) 48vw, 210px",
    depth: 14,
  },
  {
    src: "/childcaremanage.webp",
    alt: "Custom digital product for operational software and business growth",
    className: styles.photoB,
    frameClass: styles.photoProduct,
    sizes: "(max-width: 900px) 42vw, 180px",
    depth: 18,
  },
  {
    src: "/stocks-app.webp",
    alt: "Custom software product interface for digital growth",
    className: styles.photoC,
    frameClass: styles.photoProduct,
    sizes: "(max-width: 900px) 36vw, 150px",
    depth: 22,
  },
] as const;

const PARTICLES = [
  { top: "10%", left: "7%", size: 5, delay: "0s", dur: "18s", dx: "10px", dy: "-16px", color: "rgba(56,189,248,0.5)" },
  { top: "16%", left: "88%", size: 4, delay: "1.2s", dur: "20s", dx: "-8px", dy: "-12px", color: "rgba(129,140,248,0.45)" },
  { top: "70%", left: "5%", size: 3, delay: "0.7s", dur: "16s", dx: "7px", dy: "-14px", color: "rgba(251,113,133,0.35)" },
  { top: "76%", left: "93%", size: 6, delay: "1.9s", dur: "22s", dx: "-6px", dy: "-12px", color: "rgba(34,211,238,0.4)" },
  { top: "36%", left: "14%", size: 3, delay: "1.5s", dur: "19s", dx: "9px", dy: "-9px", color: "rgba(56,189,248,0.32)" },
  { top: "46%", left: "72%", size: 4, delay: "2.3s", dur: "21s", dx: "-9px", dy: "-14px", color: "rgba(192,132,252,0.38)" },
  { top: "58%", left: "44%", size: 3, delay: "0.4s", dur: "17s", dx: "6px", dy: "-10px", color: "rgba(125,211,252,0.3)" },
  { top: "24%", left: "58%", size: 2, delay: "2.8s", dur: "15s", dx: "-5px", dy: "-8px", color: "rgba(196,181,253,0.35)" },
] as const;

const BADGES = [
  { label: "10+ Industries", className: styles.badgeA, depth: 16 },
  { label: "79+ Projects", className: styles.badgeB, depth: 20 },
  { label: "32+ Clients", className: styles.badgeC, depth: 18 },
] as const;

function CollagePhoto({
  photo,
  index,
  px,
  py,
  scrollYProgress,
  visible,
  reduced,
}: {
  photo: (typeof PHOTOS)[number];
  index: number;
  px: MotionValue<number>;
  py: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
  visible: boolean;
  reduced: boolean;
}) {
  const x = useTransform(px, (v) => (reduced ? 0 : v * photo.depth));
  const pointerY = useTransform(py, (v) => (reduced ? 0 : v * photo.depth * 0.8));
  const scrollShift = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [photo.depth * 0.4, photo.depth * -0.85],
  );
  const y = useTransform([pointerY, scrollShift], (vals) => {
    const [p, s] = vals as number[];
    return p + s;
  });

  return (
    <motion.figure
      className={`${styles.photo} ${photo.className}`}
      initial={reduced ? false : { opacity: 0, y: 28, scale: 0.96 }}
      animate={
        visible
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 28, scale: 0.96 }
      }
      transition={{
        duration: 0.75,
        delay: reduced ? 0 : 0.52 + index * 0.1,
        ease,
      }}
    >
      <motion.div className={styles.photoParallax} style={{ x, y }}>
        <div className={styles.photoFloat}>
          <div className={styles.photoFrame}>
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes={photo.sizes}
              className={`${styles.photoImg} ${photo.frameClass ?? ""}`}
            />
            <span className={styles.photoOverlay} aria-hidden />
          </div>
        </div>
      </motion.div>
    </motion.figure>
  );
}

function FloatingBadge({
  badge,
  index,
  scrollYProgress,
  visible,
  reduced,
}: {
  badge: (typeof BADGES)[number];
  index: number;
  scrollYProgress: MotionValue<number>;
  visible: boolean;
  reduced: boolean;
}) {
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [badge.depth * 0.25, badge.depth * -0.55],
  );

  return (
    <motion.span
      className={`${styles.badge} ${badge.className}`}
      initial={reduced ? false : { opacity: 0, scale: 0.92 }}
      animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
      transition={{
        duration: 0.5,
        delay: reduced ? 0 : 0.82 + index * 0.1,
        ease,
      }}
    >
      <motion.span className={styles.badgeParallax} style={{ y }}>
        {badge.label}
      </motion.span>
    </motion.span>
  );
}

function CountValue({
  value,
  suffix,
  visible,
  reduced,
}: {
  value: number;
  suffix: string;
  visible: boolean;
  reduced: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 70,
    damping: 22,
    mass: 0.55,
  });

  useEffect(() => {
    const formatted = (n: number) => `${Math.round(n)}${suffix}`;
    if (reduced) {
      motionValue.set(value);
      if (ref.current) ref.current.textContent = formatted(value);
      return;
    }
    if (visible) motionValue.set(value);
  }, [motionValue, reduced, suffix, value, visible]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) ref.current.textContent = `${Math.round(latest)}${suffix}`;
    });
  }, [springValue, suffix]);

  const finalLabel = `${value}${suffix}`;

  return (
    <span className={styles.metricValue} aria-label={finalLabel}>
      <span ref={ref} aria-hidden>
        {reduced ? finalLabel : `0${suffix}`}
      </span>
    </span>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.16, margin: "-40px 0px" });
  const reduced = useReducedMotion() === true;
  const visible = inView || reduced;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const px = useSpring(rawX, { stiffness: 90, damping: 20, mass: 0.4 });
  const py = useSpring(rawY, { stiffness: 90, damping: 20, mass: 0.4 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const waveY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [20, -32]);
  const orbShift = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 26]);
  const headingY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [10, -22]);

  const onPointerMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    rawX.set((event.clientX - rect.left) / rect.width - 0.5);
    rawY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const onPointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      data-visible={visible ? "true" : "false"}
      data-reduced={reduced ? "true" : "false"}
      aria-labelledby="about-panacea-heading"
    >
      <div className={styles.bg} aria-hidden>
        <motion.span className={`${styles.orb} ${styles.orbCyan}`} style={{ y: orbShift }} />
        <span className={`${styles.orb} ${styles.orbViolet}`} />
        <span className={`${styles.orb} ${styles.orbPink}`} />
        <span className={`${styles.orb} ${styles.orbBlue}`} />
        <span className={`${styles.flowShape} ${styles.flowShapeA}`} />
        <span className={`${styles.flowShape} ${styles.flowShapeB}`} />
        <span className={`${styles.flowShape} ${styles.flowShapeC}`} />
        <span className={styles.grid} />
        <span className={styles.dots} />
        <span className={styles.mesh} />
        <span className={styles.lightSweep} />
        <motion.svg
          className={styles.ribbons}
          viewBox="0 0 2400 800"
          preserveAspectRatio="none"
          style={{ y: waveY }}
        >
          <path
            className={styles.ribbonA}
            d="M0 210C280 130 460 320 760 250C1060 180 1280 70 1580 140C1880 210 2100 300 2400 230V800H0Z"
          />
          <path
            className={styles.ribbonB}
            d="M0 360C260 280 520 460 820 390C1120 320 1360 210 1680 280C1960 340 2200 420 2400 360V800H0Z"
          />
          <path
            className={styles.ribbonC}
            d="M0 520C300 450 560 600 900 530C1240 460 1500 400 1860 460C2140 508 2280 560 2400 540V800H0Z"
          />
        </motion.svg>
        <svg className={styles.strokeWaves} viewBox="0 0 1440 720" fill="none">
          <path
            className={styles.strokeWaveA}
            d="M-60 200C160 130 360 260 580 200C800 140 1000 70 1220 130C1340 162 1440 190 1520 170"
          />
          <path
            className={styles.strokeWaveB}
            d="M-40 430C180 370 420 510 680 450C940 390 1140 320 1360 380C1460 412 1540 450 1600 440"
          />
        </svg>
        <svg className={styles.arcs} viewBox="0 0 1200 720" fill="none">
          <path d="M60 520C240 280 430 160 680 260C930 360 1100 140 1260 220" stroke="url(#aboutArcGrad)" strokeWidth="1.1" />
          <path d="M20 260C220 360 500 420 780 240C1000 100 1160 300 1280 360" stroke="url(#aboutArcGrad)" strokeWidth="1" opacity="0.7" />
          <circle cx="680" cy="260" r="3" fill="#818cf8" opacity="0.55" />
          <circle cx="240" cy="340" r="2.2" fill="#38bdf8" opacity="0.5" />
          <circle cx="1100" cy="168" r="2.2" fill="#fb7185" opacity="0.45" />
          <defs>
            <linearGradient id="aboutArcGrad" x1="60" y1="520" x2="1260" y2="220">
              <stop stopColor="#38bdf8" stopOpacity="0" />
              <stop offset="0.5" stopColor="#818cf8" stopOpacity="0.65" />
              <stop offset="1" stopColor="#fb7185" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className={`${styles.particle}${i > 4 ? ` ${styles.particleMute}` : ""}`}
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              ["--delay" as string]: p.delay,
              ["--dur" as string]: p.dur,
              ["--dx" as string]: p.dx,
              ["--dy" as string]: p.dy,
              ["--p" as string]: p.color,
            }}
          />
        ))}
        <span className={styles.glowDotA} />
        <span className={styles.glowDotB} />
        <span className={styles.glowDotC} />
        <span className={styles.geoRing} />
        <span className={styles.geoDiamond} />
      </div>

      <div className={styles.wrap}>
        <div className={styles.layout}>
          <div className={styles.copy}>
            <motion.p
              className={styles.eyebrow}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.5, ease }}
            >
              <motion.span
                className={styles.eyebrowLine}
                aria-hidden
                initial={reduced ? false : { scaleX: 0, opacity: 0 }}
                animate={visible ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                transition={{ duration: 0.55, delay: reduced ? 0 : 0.12, ease }}
              />
              About Panacea
            </motion.p>

            <motion.h2
              id="about-panacea-heading"
              className={styles.heading}
              aria-label="Turning Ideas Into Digital Reality"
              style={{ y: headingY }}
            >
              {HEADING.map((line, index) => (
                <span key={line.text} className={styles.headingLine}>
                  <motion.span
                    className={styles.headingReveal}
                    initial={reduced ? false : { opacity: 0, y: "110%" }}
                    animate={visible ? { opacity: 1, y: "0%" } : { opacity: 0, y: "110%" }}
                    transition={{
                      duration: 0.78,
                      delay: reduced ? 0 : 0.14 + index * 0.13,
                      ease,
                    }}
                  >
                    <span className={`${styles.headingText} ${line.className}`}>
                      {line.text}
                    </span>
                  </motion.span>
                </span>
              ))}
            </motion.h2>

            <motion.p
              className={styles.lead}
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.55, delay: reduced ? 0 : 0.52, ease }}
            >
              We build digital products that move businesses forward.
            </motion.p>

            <motion.p
              className={styles.body}
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.55, delay: reduced ? 0 : 0.62, ease }}
            >
              Panacea IT Services Pvt Ltd is a technology partner for digital
              product development, web and mobile apps, custom software, business
              automation, and technology consulting. We design scalable digital
              experiences with a clear focus on measurable business outcomes.
            </motion.p>

            <ul className={styles.highlights}>
              {HIGHLIGHTS.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.li
                    key={item.title}
                    className={styles.highlightItem}
                    initial={reduced ? false : { opacity: 0, y: 22 }}
                    animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
                    transition={{
                      duration: 0.55,
                      delay: reduced ? 0 : 0.7 + index * 0.1,
                      ease,
                    }}
                  >
                    <div className={styles.highlight}>
                      <span className={styles.highlightShine} aria-hidden />
                      <span className={styles.highlightIcon} aria-hidden>
                        <Icon size={16} strokeWidth={1.85} />
                      </span>
                      <span className={styles.highlightCopy}>
                        <span className={styles.highlightTitle}>{item.title}</span>
                        <span className={styles.highlightDesc}>{item.desc}</span>
                      </span>
                    </div>
                  </motion.li>
                );
              })}
            </ul>

            <motion.div
              className={styles.ctaRow}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.5, delay: reduced ? 0 : 1.12, ease }}
            >
              <Link href="/about" className={styles.primaryBtn}>
                <span className={styles.btnGlow} aria-hidden />
                Discover More
                <ArrowRight className={styles.btnArrow} size={16} strokeWidth={2.2} />
              </Link>
              <Link href="/portfolio" className={styles.secondaryBtn}>
                View Our Work
                <ArrowRight className={styles.btnArrow} size={15} strokeWidth={2} />
              </Link>
            </motion.div>
          </div>

          <div className={styles.visual}>
            <span className={styles.visualAura} aria-hidden />
            <div
              className={styles.collage}
              onMouseMove={onPointerMove}
              onMouseLeave={onPointerLeave}
            >
              {PHOTOS.map((photo, index) => (
                <CollagePhoto
                  key={photo.src}
                  photo={photo}
                  index={index}
                  px={px}
                  py={py}
                  scrollYProgress={scrollYProgress}
                  visible={visible}
                  reduced={reduced}
                />
              ))}

              {BADGES.map((badge, index) => (
                <FloatingBadge
                  key={badge.label}
                  badge={badge}
                  index={index}
                  scrollYProgress={scrollYProgress}
                  visible={visible}
                  reduced={reduced}
                />
              ))}

              <motion.aside
                className={styles.metricsCard}
                aria-label="Growth metrics"
                initial={reduced ? false : { opacity: 0 }}
                animate={visible ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.7, delay: reduced ? 0 : 0.78, ease }}
              >
                <div className={styles.metricsFloat}>
                  <div className={styles.metricsInner}>
                    <div className={styles.metricsHead}>
                      <span className={styles.metricsTitle}>Growth Metrics</span>
                      <span className={styles.metricsLive}>
                        <span className={styles.liveDot} aria-hidden />
                        Live
                      </span>
                    </div>
                    <ul className={styles.metricsGrid}>
                      {METRICS.map((metric) => (
                        <li key={metric.label} className={styles.metric}>
                          <CountValue
                            value={metric.value}
                            suffix={metric.suffix}
                            visible={visible}
                            reduced={reduced}
                          />
                          <span className={styles.metricLabel}>{metric.label}</span>
                        </li>
                      ))}
                    </ul>
                    <ul className={styles.miniGrid}>
                      {MINI_METRICS.map((metric) => (
                        <li key={metric.label} className={styles.miniMetric}>
                          <CountValue
                            value={metric.value}
                            suffix={metric.suffix}
                            visible={visible}
                            reduced={reduced}
                          />
                          <span className={styles.miniLabel}>{metric.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
