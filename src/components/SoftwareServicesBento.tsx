"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import {
  Code2,
  Globe,
  Smartphone,
  Cloud,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import ServiceMiniVisual, { type ServiceVisualKind } from "@/components/ServiceMiniVisuals";
import styles from "./SoftwareServicesBento.module.css";

type ServiceItem = {
  title: string;
  desc: string;
  icon: LucideIcon;
  accent: string;
  soft: string;
  href: string;
  visual: ServiceVisualKind;
};

const SERVICES: ServiceItem[] = [
  {
    title: "Custom Software",
    desc: "Scalable, secure applications tailored to your business workflows.",
    icon: Code2,
    accent: "#0ea5e9",
    soft: "rgba(14,165,233,0.14)",
    href: "/services/custom",
    visual: "code",
  },
  {
    title: "Web Development",
    desc: "Business sites, web apps, SaaS platforms, and e‑commerce builds.",
    icon: Globe,
    accent: "#8b5cf6",
    soft: "rgba(139,92,246,0.14)",
    href: "/services/web",
    visual: "browser",
  },
  {
    title: "Mobile Apps",
    desc: "Android, iOS, and cross-platform apps for consumer and enterprise.",
    icon: Smartphone,
    accent: "#14b8a6",
    soft: "rgba(20,184,166,0.14)",
    href: "/services/mobile",
    visual: "phone",
  },
  {
    title: "IT Consulting",
    desc: "Digital transformation, cloud strategy, and system integration.",
    icon: Cloud,
    accent: "#f59e0b",
    soft: "rgba(245,158,11,0.14)",
    href: "/services/cloud-consulting",
    visual: "network",
  },
  {
    title: "AI Solutions",
    desc: "Generative AI, automation tools, and machine learning products.",
    icon: Sparkles,
    accent: "#ec4899",
    soft: "rgba(236,72,153,0.14)",
    href: "/services/ai-consulting",
    visual: "ai",
  },
  {
    title: "E‑commerce",
    desc: "Custom stores, marketplaces, and seamless payment integrations.",
    icon: ShoppingBag,
    accent: "#4f46e5",
    soft: "rgba(79,70,229,0.14)",
    href: "/services",
    visual: "shop",
  },
];

const STATS = [
  { value: 14, suffix: "+", label: "Years Experience" },
  { value: 1500, suffix: "+", label: "Projects Delivered" },
  { value: 20, suffix: "+", label: "Industries Served" },
  { value: null, display: "24/7", label: "Support" },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

function StatValue({
  value,
  suffix,
  display,
  reduced,
}: {
  value?: number;
  suffix?: string;
  display?: string;
  reduced: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 70, damping: 22, mass: 0.6 });

  useEffect(() => {
    if (display != null || value == null) return;
    if (reduced) {
      motionValue.set(value);
      return;
    }
    if (inView) motionValue.set(value);
  }, [display, inView, motionValue, reduced, value]);

  useEffect(() => {
    if (display != null || value == null) return;
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${Math.round(latest).toLocaleString("en-US")}${suffix ?? ""}`;
      }
    });
  }, [display, springValue, suffix, value]);

  if (display) {
    return (
      <span ref={ref} className={styles.statValue}>
        {display}
      </span>
    );
  }

  return (
    <span ref={ref} className={styles.statValue}>
      {reduced ? `${value}${suffix ?? ""}` : `0${suffix ?? ""}`}
    </span>
  );
}

function ServiceCard({
  service,
  reduced,
}: {
  service: ServiceItem;
  reduced: boolean;
}) {
  const Icon = service.icon;

  return (
    <motion.div
      variants={{
        hidden: reduced ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 18, scale: 0.97 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: reduced ? 0 : 0.5, ease },
        },
      }}
    >
      <Link
        href={service.href}
        aria-label={`${service.title} — Explore service`}
        className={styles.card}
        style={
          {
            "--accent": service.accent,
            "--accent-soft": service.soft,
          } as React.CSSProperties
        }
      >
        <span className={styles.cardTint} aria-hidden>
          <i className={styles.cardParticle} />
          <i className={styles.cardParticle} />
          <i className={styles.cardParticle} />
          <i className={styles.cardParticle} />
          <i className={styles.cardParticle} />
        </span>

        <div className={styles.cardTop}>
          <span className={styles.iconWrap}>
            <span className={styles.iconGlow} aria-hidden />
            <Icon size={18} strokeWidth={1.9} aria-hidden />
          </span>
          <div className={styles.visualSlot}>
            <ServiceMiniVisual kind={service.visual} />
          </div>
        </div>

        <h3 className={styles.title}>{service.title}</h3>
        <p className={styles.desc}>{service.desc}</p>

        <span className={styles.explore} aria-hidden>
          <span className={styles.exploreLine}>Explore service</span>
          <span className={styles.exploreArrow}>
            <ArrowRight size={14} />
          </span>
        </span>
      </Link>
    </motion.div>
  );
}

export default function SoftwareServicesBento() {
  const reduced = useReducedMotion() === true;

  return (
    <section
      className={styles.section}
    >
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6">
        <motion.p
          className={styles.iso}
          initial={reduced ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease }}
        >
          <ShieldCheck size={16} color="#0ea5e9" aria-hidden />
          ISO-Certified Enterprise IT Company
        </motion.p>

        <div className={styles.shell}>
          <div className={styles.blobLayer} aria-hidden>
            <span className={`${styles.blob} ${styles.blobA}`} />
            <span className={`${styles.blob} ${styles.blobB}`} />
            <span className={`${styles.blob} ${styles.blobC}`} />
            <span className={`${styles.blob} ${styles.blobD}`} />
            <span className={`${styles.blob} ${styles.blobE}`} />
          </div>
          <div className={styles.grain} aria-hidden />

          <div className={styles.inner}>
            <motion.header
              className={styles.header}
              initial={reduced ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, ease }}
            >
              <p className={styles.eyebrow}>What we build</p>
              <h2 className={styles.heading}>
                Technology that moves your{" "}
                <span className={styles.gradText}>business forward.</span>
                <motion.span
                  className={styles.headingAccent}
                  aria-hidden
                  initial={reduced ? false : { scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2, ease }}
                />
              </h2>
              <p className={styles.lead}>
                From custom software to AI-powered products, we build scalable digital
                experiences designed around your business.
              </p>
            </motion.header>

            <motion.div
              className={styles.grid}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.18 }}
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.08, delayChildren: 0.05 },
                },
              }}
            >
              {SERVICES.map((service) => (
                <ServiceCard key={service.title} service={service} reduced={reduced} />
              ))}
            </motion.div>

            <motion.div
              className={styles.stats}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.15, ease }}
            >
              {STATS.map((stat) => (
                <div key={stat.label} className={styles.stat}>
                  {"display" in stat ? (
                    <StatValue display={stat.display} reduced={reduced} />
                  ) : (
                    <StatValue value={stat.value} suffix={stat.suffix} reduced={reduced} />
                  )}
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              className={styles.cta}
              initial={reduced ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease }}
            >
              <p className={styles.ctaKicker}>Have a project in mind?</p>
              <p className={styles.ctaTitle}>Let&apos;s build something remarkable together.</p>
              <div className={styles.ctaRow}>
                <div className={styles.primaryWrap}>
                  <span className={styles.primaryGlow} aria-hidden />
                  <Link href="/services" className={styles.primaryBtn}>
                    Explore all services
                    <span className={styles.primaryArrow} aria-hidden>
                      <ArrowRight size={16} />
                    </span>
                  </Link>
                </div>
                <Link href="/contact" className={styles.secondaryBtn}>
                  Talk to an expert
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
