"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Play, X } from "lucide-react";
import {
  CLIENT_TESTIMONIALS,
  type ClientTestimonial,
} from "@/data/clientTestimonials";
import styles from "./VideoCarousel.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;
const DEFAULT_INTERVAL_MS = 5000;

export type VideoCarouselItem = ClientTestimonial & { videoUrl: string };

export function getQuoteVideoTestimonials(
  items: ClientTestimonial[] = CLIENT_TESTIMONIALS,
): VideoCarouselItem[] {
  return items.filter(
    (item): item is VideoCarouselItem =>
      item.type === "video" && Boolean(item.videoUrl),
  );
}

type VideoCarouselProps = {
  items?: VideoCarouselItem[];
  intervalMs?: number;
  className?: string;
  /** When false, auto-advance pauses. */
  playing?: boolean;
};

function wrapIndex(value: number, length: number) {
  if (length <= 0) return 0;
  return (value + length) % length;
}

function SilentVideo({
  src,
  poster,
  shouldPlay,
  className,
}: {
  src: string;
  poster?: string;
  shouldPlay: boolean;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const node = videoRef.current;
    if (!node) return;
    node.muted = true;
    node.defaultMuted = true;
    if (shouldPlay) {
      const play = node.play();
      if (play) void play.catch(() => undefined);
    } else {
      node.pause();
    }
  }, [shouldPlay, src]);

  return (
    <video
      ref={videoRef}
      className={className}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      controls={false}
      disablePictureInPicture
      controlsList="nodownload nofullscreen noremoteplayback"
    />
  );
}

function VideoModal({
  item,
  onClose,
  reduced,
}: {
  item: VideoCarouselItem;
  onClose: () => void;
  reduced: boolean;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key === "Tab") {
        event.preventDefault();
        closeRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [onClose]);

  return createPortal(
    <motion.div
      className={styles.modalBackdrop}
      data-quote-video-modal
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
        aria-labelledby={titleId}
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
        initial={reduced ? false : { opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduced ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
        transition={{ duration: reduced ? 0 : 0.38, ease: EASE }}
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
        <p id={titleId} className={styles.srOnly}>
          Video testimonial from {item.name}
        </p>
        <SilentVideo
          className={styles.modalVideo}
          src={item.videoUrl}
          poster={item.thumbnail}
          shouldPlay={!reduced}
        />
        <div className={styles.modalCredit}>
          <span className={styles.modalName}>{item.name}</span>
          <span className={styles.modalMeta}>
            {item.role}, {item.company}
          </span>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}

/**
 * Auto-advancing testimonial cards. Play opens a muted video modal.
 */
export default function VideoCarousel({
  items,
  intervalMs = DEFAULT_INTERVAL_MS,
  className,
  playing = true,
}: VideoCarouselProps) {
  const reduced = useReducedMotion() === true;
  const slides = useMemo(
    () => items ?? getQuoteVideoTestimonials(),
    [items],
  );
  const [index, setIndex] = useState(0);
  const [tabHidden, setTabHidden] = useState(false);
  const [active, setActive] = useState<VideoCarouselItem | null>(null);

  const current = slides[wrapIndex(index, slides.length)];
  const live =
    playing && !tabHidden && !reduced && !active && slides.length > 1;

  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (!live) return undefined;
    const timer = window.setInterval(() => {
      setIndex((prev) => wrapIndex(prev + 1, slides.length));
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [intervalMs, live, slides.length]);

  if (!current) return null;

  return (
    <div
      className={`${styles.root} ${className ?? ""}`.trim()}
      style={{ ["--vc-interval" as string]: `${intervalMs}ms` }}
      aria-label="Client video testimonials"
      aria-roledescription="carousel"
    >
      <div className={styles.viewport}>
        <AnimatePresence mode="wait">
          <motion.article
            key={current.id}
            className={styles.slide}
            initial={reduced ? { opacity: 1 } : { opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, x: -16 }}
            transition={{ duration: reduced ? 0 : 0.42, ease: EASE }}
          >
            <button
              type="button"
              className={styles.playHit}
              onClick={() => setActive(current)}
              aria-label={`Play video testimonial from ${current.name}`}
            >
              {current.thumbnail ? (
                <Image
                  src={current.thumbnail}
                  alt=""
                  fill
                  sizes="(max-width: 860px) 90vw, 380px"
                  className={styles.poster}
                  priority
                />
              ) : null}
              <span className={styles.scrim} aria-hidden />
              <span className={styles.playWrap} aria-hidden>
                <span className={styles.playPulse} />
                <span className={styles.playBtn}>
                  <Play size={22} fill="currentColor" strokeWidth={0} />
                </span>
              </span>
              <span className={styles.credit}>
                <span className={styles.name}>{current.name}</span>
                <span className={styles.meta}>
                  {current.role}, {current.company}
                </span>
              </span>
            </button>
          </motion.article>
        </AnimatePresence>
        {live && (
          <span className={styles.progress} aria-hidden>
            <span key={current.id} className={styles.progressBar} />
          </span>
        )}
      </div>
      {slides.length > 1 && (
        <div className={styles.dots} aria-hidden>
          {slides.map((slide, slideIndex) => (
            <span
              key={slide.id}
              className={`${styles.dot} ${slideIndex === wrapIndex(index, slides.length) ? styles.dotActive : ""}`}
            />
          ))}
        </div>
      )}
      <AnimatePresence>
        {active && (
          <VideoModal
            item={active}
            onClose={() => setActive(null)}
            reduced={reduced}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
