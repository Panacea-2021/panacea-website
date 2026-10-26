"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type ShowcaseItem = {
  label: string;
  kind: "website" | "admin" | "mobile";
  src?: string;
};

type Props = {
  items?: ShowcaseItem[];
  accent?: string;
  animationVariant?: number;
  productImage?: string;
  isActive?: boolean;
};

const defaultItems: ShowcaseItem[] = [
  { label: "Website", kind: "website" },
  { label: "Admin Panel", kind: "admin" },
  { label: "Mobile App", kind: "mobile" },
];

const ease = [0.16, 1, 0.3, 1] as const;

const PARALLAX = {
  website: { x: 6, y: 6 },
  mobile: { x: 12, y: 12 },
  admin: { x: 9, y: 9 },
  glow: { x: 20, y: 20 },
} as const;

function WebsiteMock({ accent, src }: { accent: string; src?: string }) {
  if (src) {
    return (
      <div className="relative h-full w-full bg-white">
        <Image src={src} alt="Product preview" fill className="object-cover" sizes="320px" />
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-white flex flex-col">
      <div className="h-6 flex items-center gap-1.5 px-2.5 border-b border-slate-100 bg-slate-50">
        <span className="w-2 h-2 rounded-full bg-red-400" />
        <span className="w-2 h-2 rounded-full bg-amber-400" />
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        <span className="ml-2 flex-1 h-3 rounded-full bg-slate-100" />
      </div>
      <div className="flex-1 p-3 flex flex-col gap-2">
        <div className="h-8 rounded-md" style={{ background: accent }} />
        <div className="grid grid-cols-3 gap-2 flex-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-md bg-slate-100" />
          ))}
        </div>
        <div className="h-3 w-2/3 rounded bg-slate-200" />
        <div className="h-3 w-1/2 rounded bg-slate-100" />
      </div>
    </div>
  );
}

function AdminMock({ accent }: { accent: string }) {
  return (
    <div className="h-full w-full bg-white flex">
      <div
        className="w-[28%] h-full p-2 flex flex-col gap-1.5"
        style={{ background: accent }}
      >
        <div className="h-2.5 w-3/4 rounded bg-white/40" />
        <div className="h-2 w-full rounded bg-white/25 mt-2" />
        <div className="h-2 w-full rounded bg-white/25" />
        <div className="h-2 w-4/5 rounded bg-white/25" />
        <div className="h-2 w-full rounded bg-white/40 mt-auto" />
      </div>
      <div className="flex-1 p-2.5 flex flex-col gap-2 bg-slate-50">
        <div className="flex gap-2">
          <div className="flex-1 h-10 rounded-md bg-white shadow-sm border border-slate-100" />
          <div className="flex-1 h-10 rounded-md bg-white shadow-sm border border-slate-100" />
        </div>
        <div className="flex-1 rounded-md bg-white shadow-sm border border-slate-100 p-2 flex flex-col gap-1.5">
          <div className="h-2 w-1/3 rounded bg-slate-200" />
          <div className="h-2 w-full rounded bg-slate-100" />
          <div className="h-2 w-full rounded bg-slate-100" />
          <div className="h-2 w-4/5 rounded bg-slate-100" />
          <div
            className="mt-auto h-8 rounded origin-left"
            style={{ background: `${accent}33`, transform: "scaleX(0.75)" }}
          />
        </div>
      </div>
    </div>
  );
}

function MobileMock({ accent }: { accent: string }) {
  return (
    <div className="h-full w-full bg-white flex flex-col">
      <div
        className="h-5 flex items-center justify-center relative"
        style={{ background: accent }}
      >
        <span className="w-10 h-1 rounded-full bg-black/20 absolute top-1" />
      </div>
      <div className="flex-1 p-2.5 flex flex-col gap-2">
        <div className="h-3 w-1/2 rounded bg-slate-200 mx-auto" />
        <div
          className="rounded-xl flex-1 p-2 flex flex-col gap-1.5"
          style={{ background: `${accent}18` }}
        >
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-8 rounded-lg bg-white shadow-sm" />
          ))}
        </div>
        <div
          className="h-7 rounded-full mx-auto w-3/4"
          style={{ background: accent }}
        />
      </div>
      <div className="h-3 flex justify-center pb-1">
        <span className="w-8 h-1 rounded-full bg-slate-300" />
      </div>
    </div>
  );
}

type FrameMotion = {
  enter: { x: number; y: number; rotate: number; scale: number };
  restRotate: number;
  float: { y: number[]; rotate: number[] };
  duration: number;
  parallaxKey: keyof typeof PARALLAX;
  zDepth: number;
};

function Frame({
  item,
  accent,
  className,
  delay,
  motionCfg,
  reduceMotion,
  parallax,
  isDesktop,
}: {
  item: ShowcaseItem;
  accent: string;
  className: string;
  delay: number;
  motionCfg: FrameMotion;
  reduceMotion: boolean;
  parallax: { x: number; y: number };
  isDesktop: boolean;
}) {
  const px =
    isDesktop && !reduceMotion
      ? parallax.x * PARALLAX[motionCfg.parallaxKey].x
      : 0;
  const py =
    isDesktop && !reduceMotion
      ? parallax.y * PARALLAX[motionCfg.parallaxKey].y
      : 0;

  return (
    <motion.div
      className={`absolute overflow-hidden rounded-2xl bg-white/95 border border-white/60 ${className}`}
      style={{
        boxShadow: `0 ${12 + motionCfg.zDepth}px ${28 + motionCfg.zDepth * 2}px rgba(0,0,0,${0.22 + motionCfg.zDepth * 0.02})`,
        transformOrigin: "center center",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
      initial={
        reduceMotion
          ? { opacity: 1, x: 0, y: 0, scale: 1, rotate: motionCfg.restRotate }
          : {
              opacity: 0,
              x: motionCfg.enter.x,
              y: motionCfg.enter.y,
              scale: motionCfg.enter.scale,
              rotate: motionCfg.enter.rotate,
            }
      }
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotate: motionCfg.restRotate,
      }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {!reduceMotion ? (
        <motion.div
          className="absolute inset-0"
          animate={{
            y: motionCfg.float.y,
            rotate: motionCfg.float.rotate,
          }}
          transition={{
            duration: motionCfg.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay + 0.7,
          }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{ x: px, y: py }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <MockContent item={item} accent={accent} />
          </motion.div>
        </motion.div>
      ) : (
        <MockContent item={item} accent={accent} />
      )}
    </motion.div>
  );
}

function MockContent({ item, accent }: { item: ShowcaseItem; accent: string }) {
  return (
    <>
      <div className="absolute inset-0">
        {item.kind === "website" && (
          <WebsiteMock accent={accent} src={item.src} />
        )}
        {item.kind === "admin" && <AdminMock accent={accent} />}
        {item.kind === "mobile" && <MobileMock accent={accent} />}
      </div>
      <div className="absolute bottom-0 inset-x-0 bg-white/90 backdrop-blur-sm px-2.5 py-1.5 border-t border-slate-100/80 z-10">
        <p className="text-[10px] md:text-[11px] font-bold text-slate-700 tracking-wide text-center uppercase">
          {item.label}
        </p>
      </div>
    </>
  );
}

const COLLAGE_SETS: {
  website: FrameMotion;
  admin: FrameMotion;
  mobile: FrameMotion;
}[] = [
  {
    website: {
      enter: { x: 0, y: 50, rotate: -8, scale: 0.86 },
      restRotate: -2,
      float: { y: [0, -12, 0], rotate: [-2, -1, -2] },
      duration: 6,
      parallaxKey: "website",
      zDepth: 2,
    },
    admin: {
      enter: { x: -48, y: 36, rotate: -18, scale: 0.8 },
      restRotate: -8,
      float: { y: [0, 10, 0], rotate: [1, -1, 1] },
      duration: 5.5,
      parallaxKey: "admin",
      zDepth: 4,
    },
    mobile: {
      enter: { x: 48, y: -36, rotate: 16, scale: 0.8 },
      restRotate: 7,
      float: { y: [0, -18, 0], rotate: [-2, 2, -2] },
      duration: 5,
      parallaxKey: "mobile",
      zDepth: 6,
    },
  },
  {
    website: {
      enter: { x: -30, y: 20, rotate: 12, scale: 0.9 },
      restRotate: 1,
      float: { y: [0, -10, 0], rotate: [1, -2, 1] },
      duration: 6.5,
      parallaxKey: "website",
      zDepth: 2,
    },
    admin: {
      enter: { x: 0, y: 60, rotate: 10, scale: 0.75 },
      restRotate: -5,
      float: { y: [0, 8, 0], rotate: [1, -1.5, 1] },
      duration: 5.2,
      parallaxKey: "admin",
      zDepth: 4,
    },
    mobile: {
      enter: { x: 60, y: 20, rotate: -20, scale: 0.78 },
      restRotate: 10,
      float: { y: [0, -16, 0], rotate: [-2, 2.5, -2] },
      duration: 4.8,
      parallaxKey: "mobile",
      zDepth: 6,
    },
  },
  {
    website: {
      enter: { x: 0, y: 0, rotate: 0, scale: 0.5 },
      restRotate: -3,
      float: { y: [0, -11, 0], rotate: [-3, -2, -3] },
      duration: 7,
      parallaxKey: "website",
      zDepth: 2,
    },
    admin: {
      enter: { x: -70, y: 0, rotate: -25, scale: 0.7 },
      restRotate: -10,
      float: { y: [0, 12, 0], rotate: [1.5, -1, 1.5] },
      duration: 5.8,
      parallaxKey: "admin",
      zDepth: 4,
    },
    mobile: {
      enter: { x: 70, y: 0, rotate: 25, scale: 0.7 },
      restRotate: 9,
      float: { y: [0, -20, 0], rotate: [-2.5, 2, -2.5] },
      duration: 4.5,
      parallaxKey: "mobile",
      zDepth: 6,
    },
  },
  {
    website: {
      enter: { x: 40, y: -40, rotate: 8, scale: 0.85 },
      restRotate: 2,
      float: { y: [0, -13, 0], rotate: [2, 3, 2] },
      duration: 6.2,
      parallaxKey: "website",
      zDepth: 2,
    },
    admin: {
      enter: { x: -20, y: 70, rotate: -5, scale: 0.82 },
      restRotate: -6,
      float: { y: [0, 9, 0], rotate: [1, -1.2, 1] },
      duration: 5.4,
      parallaxKey: "admin",
      zDepth: 4,
    },
    mobile: {
      enter: { x: 20, y: -50, rotate: 22, scale: 0.76 },
      restRotate: 12,
      float: { y: [0, -17, 0], rotate: [-2, 2.2, -2] },
      duration: 4.6,
      parallaxKey: "mobile",
      zDepth: 6,
    },
  },
  {
    website: {
      enter: { x: 0, y: -70, rotate: -4, scale: 0.88 },
      restRotate: -1,
      float: { y: [0, -12, 0], rotate: [-1, 1.5, -1] },
      duration: 6.8,
      parallaxKey: "website",
      zDepth: 2,
    },
    admin: {
      enter: { x: -40, y: -50, rotate: -12, scale: 0.8 },
      restRotate: -9,
      float: { y: [0, 11, 0], rotate: [1.2, -1.5, 1.2] },
      duration: 5.6,
      parallaxKey: "admin",
      zDepth: 4,
    },
    mobile: {
      enter: { x: 40, y: -60, rotate: 14, scale: 0.8 },
      restRotate: 6,
      float: { y: [0, -19, 0], rotate: [-2.2, 2, -2.2] },
      duration: 4.9,
      parallaxKey: "mobile",
      zDepth: 6,
    },
  },
];

export default function ProductShowcaseCollage({
  items,
  accent = "#00A9FF",
  animationVariant = 0,
  productImage,
  isActive = true,
}: Props) {
  const reduceMotion = useReducedMotion() ?? false;
  const containerRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  const resolvedItems: ShowcaseItem[] = items ?? [
    { ...defaultItems[0], src: productImage },
    defaultItems[1],
    defaultItems[2],
  ];

  const website =
    resolvedItems.find((i) => i.kind === "website") ?? {
      ...defaultItems[0],
      src: productImage,
    };
  const admin = resolvedItems.find((i) => i.kind === "admin") ?? defaultItems[1];
  const mobile =
    resolvedItems.find((i) => i.kind === "mobile") ?? defaultItems[2];
  const set = COLLAGE_SETS[animationVariant % COLLAGE_SETS.length];

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduceMotion || !isDesktop) return;
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      setParallax({ x: nx, y: ny });
    },
    [reduceMotion, isDesktop]
  );

  const handleMouseLeave = useCallback(() => {
    setParallax({ x: 0, y: 0 });
  }, []);

  const glowPx = isDesktop && !reduceMotion ? parallax.x * PARALLAX.glow.x : 0;
  const glowPy = isDesktop && !reduceMotion ? parallax.y * PARALLAX.glow.y : 0;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[220px] md:min-h-0 flex items-center justify-center p-4 md:p-6"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
    >
      {!reduceMotion && (
        <motion.div
          aria-hidden
          className="absolute w-[58%] h-[58%] rounded-full blur-3xl pointer-events-none"
          style={{ background: accent }}
          animate={{
            scale: isActive ? [1, 1.12, 1] : [0.95, 1.05, 0.95],
            opacity: isActive ? [0.2, 0.38, 0.2] : [0.12, 0.22, 0.12],
            x: glowPx,
            y: glowPy,
          }}
          transition={{
            scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 0.4, ease: "easeOut" },
            y: { duration: 0.4, ease: "easeOut" },
          }}
        />
      )}

      <div
        className="relative w-full max-w-[280px] sm:max-w-[300px] aspect-square md:max-w-[340px]"
        style={{ transformStyle: "preserve-3d", perspective: "1200px" }}
      >
        <Frame
          item={website}
          accent={accent}
          delay={0.1}
          className="left-[10%] top-[8%] w-[74%] h-[72%] z-20"
          reduceMotion={reduceMotion}
          motionCfg={set.website}
          parallax={parallax}
          isDesktop={isDesktop}
        />
        <Frame
          item={admin}
          accent={accent}
          delay={0.28}
          className="left-0 bottom-[2%] w-[42%] h-[42%] z-30"
          reduceMotion={reduceMotion}
          motionCfg={set.admin}
          parallax={parallax}
          isDesktop={isDesktop}
        />
        <Frame
          item={mobile}
          accent={accent}
          delay={0.4}
          className="right-0 top-0 w-[38%] h-[48%] z-40"
          reduceMotion={reduceMotion}
          motionCfg={set.mobile}
          parallax={parallax}
          isDesktop={isDesktop}
        />
      </div>
    </div>
  );
}
