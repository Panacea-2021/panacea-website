"use client";

import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type CSSProperties,
} from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  motion,
  type MotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { products } from "./productData";
import ProductCard from "./ProductCard";
import AmbientParticles from "@/components/fx/AmbientParticles";
import styles from "./productShowcase.module.css";

const HoloScene = dynamic(() => import("@/components/fx/HoloScene"), {
  ssr: false,
});

const EASE = [0.22, 0.9, 0.32, 1] as const;

type Breakpoint = "mobile" | "tablet" | "desktop";

function getBreakpoint(): Breakpoint {
  if (typeof window === "undefined") return "desktop";
  if (window.matchMedia("(min-width: 1100px)").matches) return "desktop";
  if (window.matchMedia("(min-width: 768px)").matches) return "tablet";
  return "mobile";
}

function getPose(offset: number, viewportH: number, reduce: boolean) {
  const abs = Math.abs(offset);
  return {
    x: 0,
    y: offset > 0
      ? offset * viewportH
      : reduce
        ? 0
        : Math.max(offset, -3) * 12,
    z: 0,
    rotateY: 0,
    scale: offset < 0 && !reduce ? Math.max(0.88, 1 + offset * 0.04) : 1,
    opacity: abs > 4 ? 0 : 1,
    zIndex: offset < 0 ? 100 + offset * 2 : 100 - offset * 2,
  };
}

type ProductSlideProps = {
  product: (typeof products)[number];
  index: number;
  count: number;
  progress: MotionValue<number>;
  activeIndex: number;
  viewportH: number;
  bp: Breakpoint;
  reduce: boolean;
};

function ProductSlide({
  product,
  index,
  count,
  progress,
  activeIndex,
  viewportH,
  bp,
  reduce,
}: ProductSlideProps) {
  const offset = useTransform(progress, (value) => index - value * (count - 1));
  const pose = (value: number) => getPose(value, viewportH, reduce);
  const x = useTransform(offset, (value) => pose(value).x);
  const poseY = useTransform(offset, (value) => pose(value).y);
  const z = useTransform(offset, (value) => pose(value).z);
  const rotateY = useTransform(offset, (value) => pose(value).rotateY);
  const scale = useTransform(offset, (value) => pose(value).scale);
  const opacity = useTransform(offset, (value) => pose(value).opacity);
  const zIndex = useTransform(offset, (value) => pose(value).zIndex);
  const isActive = activeIndex === index;
  const isNear = Math.abs(index - activeIndex) <= 1;

  return (
    <motion.div className={styles.slot} style={{ zIndex }}>
      <motion.div
        className={styles.slotCard}
        data-active={isActive ? "true" : "false"}
        data-side={index === activeIndex ? "center" : index < activeIndex ? "prev" : "next"}
        style={{
          transformPerspective: bp === "tablet" ? 1100 : 1320,
          transformOrigin: "center center",
          pointerEvents: isNear ? "auto" : "none",
          x,
          y: poseY,
          z,
          rotateY,
          scale,
          opacity,
        }}
        aria-hidden={!isActive}
      >
        <ProductCard
          product={product}
          index={index}
          isActive={isActive}
          isNearActive={isNear}
        />
      </motion.div>
    </motion.div>
  );
}

export default function ProductStack() {
  const reduce = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [bp, setBp] = useState<Breakpoint>("desktop");
  const [viewportH, setViewportH] = useState(800);
  const count = products.length;
  const [index, setIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const { scrollYProgress: stageProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });
  const washY = useTransform(scrollYProgress, [0, 1], ["7%", "-11%"]);
  const holoY = useTransform(scrollYProgress, [0, 1], ["5%", "-9%"]);
  const orbY = useTransform(scrollYProgress, [0, 1], ["4%", "-7%"]);

  const goTo = useCallback(
    (next: number) => {
      const stage = stageRef.current;
      if (!stage || count < 2) return;
      const stageTop = stage.getBoundingClientRect().top + window.scrollY;
      const scrollDistance = stage.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(count - 1, next)) / (count - 1);
      window.scrollTo({
        top: stageTop + scrollDistance * progress,
        behavior: reduce ? "auto" : "smooth",
      });
    },
    [count, reduce]
  );

  useLayoutEffect(() => {
    const measure = () => {
      setBp(getBreakpoint());
      setViewportH(window.innerHeight);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
    };
  }, []);

  useMotionValueEvent(stageProgress, "change", (progress) => {
    const nextIndex = Math.round(progress * (count - 1));
    setIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1);
    }
    if (event.key === "Home") {
      event.preventDefault();
      goTo(0);
    }
    if (event.key === "End") {
      event.preventDefault();
      goTo(count - 1);
    }
  };

  const activeProduct = products[index];

  return (
    <section
      ref={sectionRef}
      id="products"
      className={styles.section}
      aria-labelledby="products-heading"
    >
      <div className={styles.bg} aria-hidden>
        <motion.div className={styles.bgWash} style={{ y: washY }} />
        <div className={styles.grid} />
        <motion.div className={styles.holo} style={{ y: holoY }}>
          <HoloScene lite={bp !== "desktop"} />
        </motion.div>
        <AmbientParticles className={styles.particles} />
        <div className={styles.mesh} />
        <motion.div className={styles.orbLayer} style={{ y: orbY }}>
          <div className={`${styles.glow} ${styles.glowA}`} />
          <div className={`${styles.glow} ${styles.glowB}`} />
          <div className={`${styles.glow} ${styles.glowC}`} />
          <div className={`${styles.orb} ${styles.orbA}`} />
          <div className={`${styles.orb} ${styles.orbB}`} />
          <div className={`${styles.orb} ${styles.orbC}`} />
        </motion.div>
        <div className={`${styles.streak} ${styles.streakA}`} />
        <div className={`${styles.streak} ${styles.streakB}`} />
        <div className={`${styles.streak} ${styles.streakC}`} />
      </div>

      <div className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.servicesLinkWrap}>
            <Link href="/services" className={styles.servicesLink}>
              Go to Services Page &gt;&gt;
            </Link>
          </div>

          <motion.p
            className={styles.eyebrow}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: reduce ? 0 : 0.55, ease: EASE }}
          >
            Our Offerings
          </motion.p>
          <motion.h2
            id="products-heading"
            className={styles.heading}
            initial={reduce ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.65 }}
            transition={{ duration: reduce ? 0 : 0.82, ease: EASE }}
          >
            <span className={styles.headingText}>Products That Scale</span>
            <span className={styles.headingSub}>With Your Team</span>
          </motion.h2>
          <span className={styles.rule} aria-hidden />
          <motion.p
            className={styles.lede}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : 0.08, ease: EASE }}
          >
            Purpose-built digital products designed around real business needs — helping
            organizations simplify operations, engage users, and scale with confidence.
          </motion.p>
          <motion.p
            className={styles.grounding}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: reduce ? 0 : 0.55, delay: reduce ? 0 : 0.16, ease: EASE }}
          >
            Designed from real-world requirements.
          </motion.p>
        </header>
      </div>

      <div
        ref={stageRef}
        className={styles.stage}
        style={{ "--product-count": count } as CSSProperties}
      >
        <div className={styles.stickyStage}>
          <div
            className={styles.scene}
            role="region"
            aria-roledescription="carousel"
            aria-label="Product showcase"
            aria-describedby="products-carousel-live"
            tabIndex={0}
            onKeyDown={onKeyDown}
          >
            <p id="products-carousel-live" className={styles.srOnly} aria-live="polite" aria-atomic="true">
              {activeProduct.title}
            </p>

            <div className={styles.sceneGlow} aria-hidden />
            <div className={styles.reflection} aria-hidden />

            {products.map((product, i) => (
              <ProductSlide
                key={product.id}
                product={product}
                index={i}
                count={count}
                progress={stageProgress}
                activeIndex={index}
                viewportH={viewportH}
                bp={bp}
                reduce={reduce}
              />
            ))}
          </div>

          <div className={styles.nav}>
            <div className={styles.navMeta}>
              <span className={styles.counter} aria-live="polite">
                {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </span>
              <div className={styles.progress} aria-hidden>
                <motion.div
                  className={styles.progressFill}
                  style={{ scaleX: stageProgress }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
