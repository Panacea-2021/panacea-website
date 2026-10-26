"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import styles from "./Testimonials.module.css";

type Review = {
  id: number;
  name: string;
  initials: string;
  gradient: string;
  when: string;
  text: string;
};

const reviews: Review[] = [
  {
    id: 1,
    name: "Abdul Hameed",
    initials: "AH",
    gradient: "linear-gradient(135deg, #FF0808 0%, #99030D 100%)",
    when: "8 months ago",
    text: "Panacea IT Services delivered our mobile app with excellent quality and support. The team understood our requirements quickly and stayed responsive throughout. Highly recommended for web and app development.",
  },
  {
    id: 2,
    name: "Priya Sharma",
    initials: "PS",
    gradient: "linear-gradient(135deg, #9C27B0 0%, #4A148C 100%)",
    when: "a year ago",
    text: "Outstanding experience from design to deployment. The UI/UX was polished, communication was clear, and the final product exceeded expectations. We continue to work with them for enhancements.",
  },
  {
    id: 3,
    name: "Rajesh Kumar",
    initials: "RK",
    gradient: "linear-gradient(135deg, #00897B 0%, #004D40 100%)",
    when: "10 months ago",
    text: "They built a scalable tracking solution for our logistics operations. Reliable delivery, strong technical skills, and great post-launch support. A trusted technology partner.",
  },
  {
    id: 4,
    name: "Priya Sharma",
    initials: "PS",
    gradient: "linear-gradient(135deg, #FF9800 0%, #E65100 100%)",
    when: "6 months ago",
    text: "Professional team with a client-first approach. Our school management platform launched on time and parents love the experience. Thank you Panacea!",
  },
  {
    id: 5,
    name: "Michael Torres",
    initials: "MT",
    gradient: "linear-gradient(135deg, #E91E63 0%, #880E4F 100%)",
    when: "a year ago",
    text: "From discovery to go-live, Panacea was thorough and transparent. The web application performance is excellent and their support team is always available.",
  },
];

const TOTAL_REVIEWS = 21;
const AUTO_MS = 5500;
const RESUME_MS = 4500;
const SWIPE_OFFSET = 80;
const ease = [0.22, 1, 0.36, 1] as const;
const spring = { type: "spring" as const, stiffness: 280, damping: 28, mass: 0.85 };

const HEADING_LINES = ["Trusted by", "businesses that", "expect results."] as const;

const PARTICLES = [
  { left: "12%", size: 3, color: "rgba(56, 189, 248, 0.45)", delay: "0s" },
  { left: "28%", size: 2.5, color: "rgba(129, 140, 248, 0.4)", delay: "1.4s" },
  { left: "46%", size: 3.5, color: "rgba(207, 168, 90, 0.4)", delay: "0.6s" },
  { left: "63%", size: 2.5, color: "rgba(251, 113, 133, 0.4)", delay: "2.1s" },
  { left: "78%", size: 3, color: "rgba(56, 189, 248, 0.35)", delay: "1.1s" },
  { left: "91%", size: 2.5, color: "rgba(129, 140, 248, 0.38)", delay: "2.8s" },
] as const;

function GoogleG({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
      />
    </svg>
  );
}

function StarIcon({ className = "h-[14px] w-[14px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`fill-[#FBBC04] ${className}`} aria-hidden>
      <path d="M10 1.5l2.47 5.34 5.84.62-4.36 3.94 1.21 5.75L10 14.2l-5.16 2.95 1.21-5.75L1.69 7.46l5.84-.62L10 1.5z" />
    </svg>
  );
}

function GoldStars({
  animated = false,
  delay = 0,
}: {
  animated?: boolean;
  delay?: number;
}) {
  return (
    <div className="flex items-center gap-[3px]" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.span
          key={i}
          initial={animated ? { opacity: 0, y: 4, scale: 0.7 } : false}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: delay + i * 0.07, duration: 0.28, ease }}
          className="inline-flex"
        >
          <StarIcon />
        </motion.span>
      ))}
    </div>
  );
}

function VerifiedBadge() {
  return (
    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" aria-hidden>
      <circle cx="10" cy="10" r="9" fill="#1A73E8" />
      <path
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.2 10.3l2.5 2.5 5.1-5.4"
      />
    </svg>
  );
}

function stackPose(depth: number, compact: boolean) {
  if (compact) {
    const poses = [
      { x: 0, y: 18, scale: 1, rotate: 0, opacity: 1 },
      { x: 16, y: -8, scale: 0.965, rotate: 3.8, opacity: 0.92 },
      { x: -12, y: -28, scale: 0.93, rotate: -4.6, opacity: 0.72 },
    ];
    return poses[Math.min(depth, poses.length - 1)];
  }
  const poses = [
    { x: 0, y: 36, scale: 1, rotate: 0, opacity: 1 },
    { x: 34, y: -2, scale: 0.97, rotate: 5.4, opacity: 0.94 },
    { x: -28, y: -30, scale: 0.94, rotate: -6.2, opacity: 0.82 },
    { x: 16, y: -56, scale: 0.91, rotate: 4.1, opacity: 0.62 },
  ];
  return poses[Math.min(depth, poses.length - 1)];
}

function GoogleReviewCard({
  review,
  active,
  reduceMotion,
}: {
  review: Review;
  active: boolean;
  reduceMotion: boolean;
}) {
  return (
    <div className={`${styles.cardFrame} ${active ? styles.cardFrameActive : ""}`}>
      <article className={styles.card}>
        <motion.div
          className={styles.googleMark}
          initial={reduceMotion || !active ? false : { opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease, delay: 0.12 }}
        >
          <GoogleG className="h-6 w-6" />
        </motion.div>

        <header className="relative flex items-center gap-3 pr-12">
          <div
            className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-1 ring-black/[0.06]"
            aria-hidden
          >
            <div
              className="flex h-full w-full items-center justify-center text-[15px] font-medium text-white"
              style={{ background: review.gradient }}
            >
              {review.initials}
            </div>
          </div>
          <div className="min-w-0">
            <p className="truncate text-[14px] font-semibold leading-tight text-[#202124] sm:text-[15px]">
              {review.name}
            </p>
            <p className="mt-0.5 truncate text-[12px] text-[#5f6368]">{review.when}</p>
          </div>
        </header>

        <div className="relative mt-3">
          <GoldStars animated={active && !reduceMotion} />
        </div>

        <blockquote className="relative mt-3 min-h-0 flex-1 overflow-hidden">
          <p className="line-clamp-6 text-[13px] leading-[1.7] text-[#3c4043] sm:text-[13.5px] lg:text-sm">
            {review.text}
          </p>
        </blockquote>

        <footer className="relative mt-3 flex items-center justify-between border-t border-black/[0.06] pt-3">
          <div className={`flex items-center gap-1.5 ${active ? styles.shimmerWrap : ""}`}>
            <VerifiedBadge />
            <span className="text-[11.5px] font-medium text-[#5f6368]">
              Verified Google Review
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[12.5px] font-semibold text-[#202124]">5.0</span>
            <StarIcon className="h-3 w-3" />
          </div>
        </footer>
      </article>
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const resumeTimer = useRef<number | null>(null);
  const remainingRef = useRef(AUTO_MS);
  const inView = useInView(sectionRef, { once: true, amount: 0.28 });
  const reduceMotion = useReducedMotion() ?? false;

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [compact, setCompact] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const [parallax, setParallax] = useState({ x: 0, y: 0, rx: 0, ry: 0 });

  const maxDepth = compact ? 2 : 3;
  const paused = hovering || dragging || focusPaused || !autoplay;
  const running = inView && !paused;

  useEffect(() => {
    const compactMq = window.matchMedia("(max-width: 1023px)");
    const hoverMq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => {
      setCompact(compactMq.matches);
      setCanHover(hoverMq.matches);
    };
    sync();
    compactMq.addEventListener("change", sync);
    hoverMq.addEventListener("change", sync);
    return () => {
      compactMq.removeEventListener("change", sync);
      hoverMq.removeEventListener("change", sync);
    };
  }, []);

  const go = useCallback((dir: 1 | -1) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + reviews.length) % reviews.length);
  }, []);

  const jumpTo = useCallback(
    (next: number) => {
      if (next === index) return;
      const n = reviews.length;
      const forward = (next - index + n) % n;
      const backward = (index - next + n) % n;
      setDirection(forward <= backward ? 1 : -1);
      setIndex(next);
      setAutoplay(false);
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
      resumeTimer.current = window.setTimeout(() => setAutoplay(true), RESUME_MS);
    },
    [index],
  );

  useEffect(() => {
    remainingRef.current = AUTO_MS;
  }, [index]);

  useEffect(() => {
    if (!running) return;
    const started = performance.now();
    const startRemaining = remainingRef.current;
    const id = window.setTimeout(() => {
      remainingRef.current = AUTO_MS;
      go(1);
    }, startRemaining);
    return () => {
      remainingRef.current = Math.max(50, startRemaining - (performance.now() - started));
      window.clearTimeout(id);
    };
  }, [running, index, go]);

  useEffect(() => {
    return () => {
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    };
  }, []);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    setDragging(false);
    const { offset, velocity } = info;
    const horizontal = Math.abs(offset.x) > Math.abs(offset.y);
    if (horizontal) {
      if (offset.x < -SWIPE_OFFSET || velocity.x < -500) go(1);
      else if (offset.x > SWIPE_OFFSET || velocity.x > 500) go(-1);
      return;
    }
    if (offset.y < -SWIPE_OFFSET || velocity.y < -600) go(1);
    else if (offset.y > SWIPE_OFFSET || velocity.y > 600) go(-1);
  };

  const onCardMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!canHover || reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    setParallax({
      x: nx * 5.5,
      y: ny * 4.5,
      rx: ny * -1.6,
      ry: nx * 1.8,
    });
  };

  const resetParallax = () => setParallax({ x: 0, y: 0, rx: 0, ry: 0 });

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      jumpTo((index + 1) % reviews.length);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      jumpTo((index - 1 + reviews.length) % reviews.length);
    }
  };

  const stacked = reviews
    .map((review, i) => ({
      review,
      depth: (i - index + reviews.length) % reviews.length,
    }))
    .filter((item) => item.depth <= maxDepth);

  const reveal = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0.04 : 0.09,
        delayChildren: 0.04,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0.2 : 0.42, ease },
    },
  };

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="testimonials-heading"
    >
      <div className={styles.bgCanvas} aria-hidden>
        <div className={styles.texture} />
        <div className={`${styles.blob} ${styles.blobBlue}`} />
        <div className={`${styles.blob} ${styles.blobLavender}`} />
        <div className={`${styles.blob} ${styles.blobPink}`} />
      </div>

      <div className={styles.shell}>
        <div className={styles.copy}>
          <span className={styles.quoteMark} aria-hidden>
            “
          </span>

          <motion.div
            variants={reveal}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            <motion.p className={styles.label} variants={item}>
              <span className={styles.labelRule} aria-hidden />
              Testimonials
            </motion.p>

            <h2 id="testimonials-heading" className={styles.heading}>
              {HEADING_LINES.map((line) => (
                <motion.span key={line} className={styles.headingLine} variants={item}>
                  {line}
                </motion.span>
              ))}
            </h2>

            <motion.p className={styles.description} variants={item}>
              See what our clients have to say about working with our team.
            </motion.p>

            <motion.div variants={item}>
              <a
                href="https://www.google.com/search?q=panaceaitservices"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.googleBadge}
              >
                <motion.span
                  initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, ease, delay: 0.45 }}
                  className="inline-flex"
                >
                  <GoogleG className="h-5 w-5" />
                </motion.span>
                <div className="h-7 w-px bg-black/[0.08]" aria-hidden />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-[#202124]">5.0</span>
                    <GoldStars animated={!reduceMotion && inView} delay={0.5} />
                  </div>
                  <p className="text-[12px] text-[#5f6368]">
                    From {TOTAL_REVIEWS} Google reviews
                  </p>
                </div>
              </a>
              <p className={styles.liveRow}>
                <span className={styles.liveDot} aria-hidden />
                Live client feedback
              </p>
            </motion.div>

            <motion.div className={styles.pager} variants={item}>
              <span className={styles.counter} aria-hidden>
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(reviews.length).padStart(2, "0")}
              </span>
              <div className={`${styles.tracks} ${paused ? styles.paused : ""}`}>
                {reviews.map((review, i) => {
                  const active = i === index;
                  return (
                    <button
                      key={review.id}
                      type="button"
                      className={styles.trackBtn}
                      aria-label={`Go to review ${i + 1} of ${reviews.length}`}
                      aria-current={active ? "true" : undefined}
                      onClick={() => jumpTo(i)}
                    >
                      <span
                        className={`${styles.track} ${active ? styles.trackActive : styles.trackIdle}`}
                      >
                        {active && (
                          <>
                            <span className={styles.fill} />
                            <span className={styles.playhead} />
                          </>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className={styles.stage}>
          <div
            className={styles.stack}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => {
              setHovering(false);
              resetParallax();
            }}
            onMouseMove={onCardMove}
            onFocus={() => setFocusPaused(true)}
            onBlur={() => setFocusPaused(false)}
            onKeyDown={onKeyDown}
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label="Client Google reviews"
          >
            <p className={styles.srOnly}>
              Use arrow keys or the progress indicators to browse testimonials.
            </p>
            <p className={styles.srOnly} aria-live="polite" aria-atomic="true">
              Showing review {index + 1} of {reviews.length}: {reviews[index].name}
            </p>

            {!compact && (
              <>
                <span className={`${styles.pill} ${styles.pillA}`}>✓ Verified</span>
                <span className={`${styles.pill} ${styles.pillB}`}>★★★★★</span>
                <span className={`${styles.pill} ${styles.pillC}`}>Trusted</span>
                <span className={`${styles.pill} ${styles.pillD}`}>Client love</span>
              </>
            )}

            <AnimatePresence initial={false} custom={direction}>
              {stacked.map(({ review, depth }) => {
                const pose = stackPose(depth, compact);
                const active = depth === 0;
                const parallaxStyle: CSSProperties =
                  active && canHover && !reduceMotion
                    ? {
                        transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0) rotateX(${parallax.rx}deg) rotateY(${parallax.ry}deg)`,
                        boxShadow: `${-parallax.x * 0.8}px ${14 + parallax.y}px 36px -16px rgba(60, 64, 67, 0.32)`,
                        transition: dragging ? "none" : "transform 0.18s ease-out, box-shadow 0.18s ease-out",
                      }
                    : { transform: "none" };

                return (
                  <motion.div
                    key={review.id}
                    className={styles.cardSlot}
                    custom={direction}
                    initial={
                      reduceMotion
                        ? { opacity: 0 }
                        : active
                          ? {
                              y: direction < 0 ? -48 : 36,
                              opacity: 0,
                              scale: 0.98,
                            }
                          : { opacity: 0, scale: 0.86, y: pose.y - 10 }
                    }
                    animate={{
                      x: pose.x,
                      y: pose.y,
                      scale: pose.scale,
                      rotate: pose.rotate,
                      opacity: pose.opacity,
                      zIndex: 20 - depth,
                    }}
                    exit={
                      reduceMotion
                        ? { opacity: 0, transition: { duration: 0.18 } }
                        : {
                            y: direction > 0 ? -64 : 52,
                            x: direction > 0 ? 14 : -12,
                            opacity: 0,
                            scale: 0.97,
                            rotate: direction > 0 ? -2 : 2,
                            zIndex: 30,
                            transition: { duration: 0.36, ease },
                          }
                    }
                    transition={
                      reduceMotion
                        ? { duration: 0.2 }
                        : { ...spring, opacity: { duration: 0.28 } }
                    }
                    drag={active ? (compact ? "x" : true) : false}
                    dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
                    dragElastic={0.72}
                    onDragStart={() => active && setDragging(true)}
                    onDragEnd={active ? handleDragEnd : undefined}
                    whileDrag={active ? { cursor: "grabbing" } : undefined}
                    style={{
                      originX: 0.5,
                      originY: 0.5,
                      pointerEvents: active ? "auto" : "none",
                      cursor: active ? "grab" : "default",
                    }}
                    aria-hidden={!active}
                  >
                    <div className="h-full" style={parallaxStyle}>
                      <GoogleReviewCard
                        review={review}
                        active={active}
                        reduceMotion={reduceMotion}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className={styles.fadeBottom} aria-hidden>
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
    </section>
  );
}
