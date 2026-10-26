"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import {
  CLIENT_TESTIMONIALS,
  type ClientTestimonial,
} from "@/data/clientTestimonials";
import styles from "./ClientTestimonials.module.css";

const ease = [0.22, 1, 0.36, 1] as const;
const SWIPE_THRESHOLD = 60;

const VIDEO_TESTIMONIALS = CLIENT_TESTIMONIALS.filter(
  (item): item is ClientTestimonial & { videoUrl: string } =>
    item.type === "video" && Boolean(item.videoUrl),
);

const PARTICLES = [
  { left: "12%", size: 3, color: "rgba(56, 189, 248, 0.38)", delay: "0s" },
  { left: "28%", size: 2.5, color: "rgba(201, 150, 58, 0.32)", delay: "1.4s" },
  { left: "46%", size: 3, color: "rgba(129, 140, 248, 0.34)", delay: "0.6s" },
  { left: "64%", size: 2.5, color: "rgba(251, 113, 133, 0.28)", delay: "2.1s" },
  { left: "82%", size: 3, color: "rgba(56, 189, 248, 0.28)", delay: "1.8s" },
] as const;

function wrapIndex(value: number, length: number) {
  return (value + length) % length;
}

function VideoCard({
  item,
  featured = false,
  onPlay,
  reduced,
  delay = 0,
  inView,
}: {
  item: ClientTestimonial;
  featured?: boolean;
  onPlay: () => void;
  reduced: boolean;
  delay?: number;
  inView: boolean;
}) {
  return (
    <motion.article
      className={`${styles.card} ${featured ? styles.cardFeatured : styles.cardSide}`}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: reduced ? 0 : delay, ease }}
    >
      <span className={styles.cardGlow} aria-hidden />
      <button
        type="button"
        className={styles.videoHit}
        onClick={onPlay}
        aria-label={`Play video testimonial from ${item.name}`}
      >
        <span className={styles.media}>
          <AnimatePresence mode="wait">
            {item.thumbnail && (
              <motion.span
                key={item.id}
                className={styles.thumbLayer}
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduced ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.32, ease }}
              >
                <Image
                  src={item.thumbnail}
                  alt=""
                  fill
                  sizes={
                    featured
                      ? "(max-width: 767px) 92vw, (max-width: 1099px) 48vw, 560px"
                      : "(max-width: 767px) 92vw, (max-width: 1099px) 28vw, 320px"
                  }
                  className={styles.thumb}
                  priority={featured}
                />
              </motion.span>
            )}
          </AnimatePresence>
          <span className={styles.overlay} aria-hidden />
          <span className={styles.playWrap} aria-hidden>
            <span className={styles.playPulse} />
            <span className={styles.playBtn}>
              <Play size={featured ? 26 : 18} fill="currentColor" strokeWidth={0} />
            </span>
          </span>
          <span className={styles.credit}>
            <AnimatePresence mode="wait">
              <motion.span
                key={item.id}
                className={styles.creditInner}
                initial={reduced ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.28, ease }}
              >
                <span className={styles.creditName}>{item.name}</span>
                <span className={styles.creditMeta}>
                  {item.role}, {item.company}
                </span>
              </motion.span>
            </AnimatePresence>
          </span>
        </span>
      </button>
    </motion.article>
  );
}

function VideoModal({
  item,
  onClose,
  reduced,
}: {
  item: ClientTestimonial;
  onClose: () => void;
  reduced: boolean;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className={styles.modalBackdrop}
      role="presentation"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.28 }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`Video testimonial from ${item.name}`}
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        initial={reduced ? false : { opacity: 0, y: 18, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduced ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
        transition={{ duration: reduced ? 0 : 0.38, ease }}
      >
        <button
          ref={closeRef}
          type="button"
          className={styles.modalClose}
          onClick={onClose}
          aria-label="Close video"
        >
          <X size={18} />
        </button>
        {item.videoUrl && (
          <video
            className={styles.modalVideo}
            src={item.videoUrl}
            poster={item.thumbnail}
            controls
            autoPlay
            playsInline
          />
        )}
      </motion.div>
    </motion.div>
  );
}

export default function ClientTestimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10%" });
  const reduced = useReducedMotion() ?? false;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [videoOpen, setVideoOpen] = useState<ClientTestimonial | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const count = VIDEO_TESTIMONIALS.length;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const go = useCallback(
    (nextIndex: number) => {
      if (!count) return;
      const wrapped = wrapIndex(nextIndex, count);
      if (wrapped === index) return;
      const forward = wrapIndex(wrapped - index, count) <= count / 2;
      setDirection(forward ? 1 : -1);
      setIndex(wrapped);
    },
    [index, count],
  );

  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD || info.velocity.x < -400) next();
    else if (info.offset.x > SWIPE_THRESHOLD || info.velocity.x > 400) prev();
  };

  if (!count) return null;

  const featured = VIDEO_TESTIMONIALS[index];
  const prevItem = VIDEO_TESTIMONIALS[wrapIndex(index - 1, count)];
  const nextItem = VIDEO_TESTIMONIALS[wrapIndex(index + 1, count)];
  const showTrio = !isMobile && count >= 3;
  const showDuo = !isMobile && count === 2;
  const duoOther = count === 2 ? VIDEO_TESTIMONIALS[1 - index] : null;

  const slideVariants = {
    enter: (d: number) =>
      reduced ? { opacity: 0 } : { opacity: 0, x: d > 0 ? 40 : -40 },
    center: { opacity: 1, x: 0 },
    exit: (d: number) =>
      reduced ? { opacity: 0 } : { opacity: 0, x: d > 0 ? -40 : 40 },
  };

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="client-testimonials-heading"
    >
      <div className={styles.bg} aria-hidden>
        <div className={styles.noise} />
        <div className={styles.grid} />
        <div className={styles.goldOrb} />
        <div className={styles.cyanOrb} />
        <div className={styles.violetOrb} />
        <div className={styles.roseOrb} />
        {PARTICLES.map((p) => (
          <span
            key={p.left}
            className={styles.particle}
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              background: p.color,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      <div className={styles.wrap}>
        <header className={styles.header}>
          <motion.h2
            id="client-testimonials-heading"
            className={styles.heading}
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
          >
            What Our <span className={styles.headingAccent}>Clients</span> Say
          </motion.h2>
          <motion.span
            className={styles.headingRule}
            aria-hidden
            initial={reduced ? false : { opacity: 0, scaleX: 0.4 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.55, delay: reduced ? 0 : 0.18, ease }}
          />
          <motion.p
            className={styles.lede}
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: reduced ? 0 : 0.22, ease }}
          >
            Real experiences. Real results. Trusted by businesses that chose to
            build with us.
          </motion.p>
        </header>

        <div className={styles.stage}>
          {count > 1 && (
            <>
              <div className={`${styles.nav} ${styles.navPrev}`}>
                <button
                  type="button"
                  className={styles.navBtn}
                  onClick={prev}
                  aria-label="Previous testimonial video"
                >
                  <ChevronLeft size={20} className={styles.navIcon} />
                </button>
              </div>
              <div className={`${styles.nav} ${styles.navNext}`}>
                <button
                  type="button"
                  className={styles.navBtn}
                  onClick={next}
                  aria-label="Next testimonial video"
                >
                  <ChevronRight size={20} className={styles.navIcon} />
                </button>
              </div>
            </>
          )}

          <div
            className={styles.carousel}
            role="region"
            aria-roledescription="carousel"
            aria-label="Client testimonial videos"
            onKeyDown={onKeyDown}
            tabIndex={0}
          >
            <p className={styles.srOnly}>
              Use arrow keys, swipe, or navigation buttons to browse client
              testimonial videos.
            </p>
            <p className={styles.srOnly} aria-live="polite" aria-atomic="true">
              Showing video {index + 1} of {count}: {featured.name}
            </p>

            {isMobile ? (
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={featured.id}
                  className={styles.mobileTrack}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: reduced ? 0.15 : 0.42, ease }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.18}
                  onDragEnd={onDragEnd}
                >
                  <VideoCard
                    item={featured}
                    featured
                    onPlay={() => setVideoOpen(featured)}
                    reduced={reduced}
                    inView={inView}
                  />
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className={`${styles.showcase} ${showDuo ? styles.showcaseDuo : ""}`}>
                {showTrio && (
                  <VideoCard
                    key="slot-prev"
                    item={prevItem}
                    onPlay={() => setVideoOpen(prevItem)}
                    reduced={reduced}
                    delay={0.08}
                    inView={inView}
                  />
                )}
                {showDuo && duoOther && (
                  <VideoCard
                    key="slot-other"
                    item={duoOther}
                    onPlay={() => setVideoOpen(duoOther)}
                    reduced={reduced}
                    delay={0.08}
                    inView={inView}
                  />
                )}
                <VideoCard
                  key="slot-featured"
                  item={featured}
                  featured
                  onPlay={() => setVideoOpen(featured)}
                  reduced={reduced}
                  delay={0.16}
                  inView={inView}
                />
                {showTrio && (
                  <VideoCard
                    key="slot-next"
                    item={nextItem}
                    onPlay={() => setVideoOpen(nextItem)}
                    reduced={reduced}
                    delay={0.24}
                    inView={inView}
                  />
                )}
              </div>
            )}
          </div>

          {count > 1 && (
            <div className={styles.pagination} role="tablist" aria-label="Testimonial videos">
              {VIDEO_TESTIMONIALS.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  className={styles.dotBtn}
                  aria-label={`Show video from ${item.name}`}
                  aria-selected={i === index}
                  onClick={() => go(i)}
                >
                  <span className={`${styles.dot} ${i === index ? styles.dotActive : ""}`} />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {videoOpen && (
          <VideoModal
            item={videoOpen}
            onClose={() => setVideoOpen(null)}
            reduced={reduced}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
