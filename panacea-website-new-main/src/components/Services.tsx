"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  Code2,
  Globe,
  Layout,
  LayoutTemplate,
  PieChart,
  Smartphone,
  X,
  type LucideIcon,
} from "lucide-react";
import styles from "./OurServicesSection.module.css";

type FilterId = "all" | "development" | "design" | "marketing";

type ServiceItem = {
  id: string;
  number: string;
  title: string;
  description: string;
  path: string;
  icon: LucideIcon;
  category: Exclude<FilterId, "all">;
  image: string;
  imageAlt: string;
  iconAnim: "tilt" | "scale" | "spin";
  accent: string;
  accentStrong: string;
  accentSoft: string;
  accentGrad: string;
  capabilities: string[];
  technologies: string[];
};

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "development", label: "Development" },
  { id: "design", label: "Design" },
  { id: "marketing", label: "Marketing" },
];

const serviceData: ServiceItem[] = [
  {
    id: "app",
    number: "01",
    title: "App Development",
    description: "Build fast, scalable mobile applications with modern technologies.",
    path: "/services/application-development",
    icon: Smartphone,
    category: "development",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=500&q=80",
    imageAlt: "Mobile app interfaces displayed on a smartphone",
    iconAnim: "scale",
    accent: "#f43f5e",
    accentStrong: "#be123c",
    accentSoft: "rgba(244, 63, 94, 0.2)",
    accentGrad: "linear-gradient(135deg, #fb7185, #e11d48)",
    capabilities: [
      "Native iOS and Android apps",
      "Cross-platform builds with React Native and Flutter",
      "Store launch, analytics, and ongoing support",
    ],
    technologies: ["Swift", "Kotlin", "React Native", "Flutter"],
  },
  {
    id: "web",
    number: "02",
    title: "Web Development",
    description: "Launch high-performance websites and web apps that convert.",
    path: "/services/website-development",
    icon: Globe,
    category: "development",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=500&q=80",
    imageAlt: "Web development code on a computer screen",
    iconAnim: "tilt",
    accent: "#2563eb",
    accentStrong: "#1d4ed8",
    accentSoft: "rgba(37, 99, 235, 0.2)",
    accentGrad: "linear-gradient(135deg, #38bdf8, #4f46e5)",
    capabilities: [
      "Marketing sites, portals, and SaaS platforms",
      "Responsive, accessible front-end engineering",
      "Secure APIs and scalable backend architecture",
    ],
    technologies: ["Next.js", "React", "Node.js", "TypeScript"],
  },
  {
    id: "uiux",
    number: "03",
    title: "UI/UX Designing",
    description: "Design intuitive, conversion-focused interfaces people enjoy using.",
    path: "/services/website-designing",
    icon: Layout,
    category: "design",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=500&q=80",
    imageAlt: "UI and UX design workspace with interface mockups",
    iconAnim: "spin",
    accent: "#0d9488",
    accentStrong: "#0f766e",
    accentSoft: "rgba(13, 148, 136, 0.2)",
    accentGrad: "linear-gradient(135deg, #2dd4bf, #0f766e)",
    capabilities: [
      "User research, wireframes, and interactive prototypes",
      "Design systems that stay consistent at scale",
      "Usability testing and conversion-led iteration",
    ],
    technologies: ["Figma", "Adobe XD", "Prototyping", "Design Systems"],
  },
  {
    id: "software",
    number: "04",
    title: "Software Development",
    description: "Engineer reliable custom software tailored to your workflows.",
    path: "/services/application-development",
    icon: Code2,
    category: "development",
    image:
      "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?auto=format&fit=crop&w=500&q=80",
    imageAlt: "Software development workspace with code on a screen",
    iconAnim: "tilt",
    accent: "#7c3aed",
    accentStrong: "#6d28d9",
    accentSoft: "rgba(124, 58, 237, 0.2)",
    accentGrad: "linear-gradient(135deg, #a78bfa, #6d28d9)",
    capabilities: [
      "Custom enterprise and workflow software",
      "System integration and process automation",
      "Quality engineering and long-term maintenance",
    ],
    technologies: ["Java", "Python", ".NET", "Cloud"],
  },
  {
    id: "marketing",
    number: "05",
    title: "Digital Marketing",
    description: "Grow visibility and demand with data-driven digital campaigns.",
    path: "/services/digital-marketing",
    icon: PieChart,
    category: "marketing",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&q=80",
    imageAlt: "Digital marketing analytics dashboard",
    iconAnim: "scale",
    accent: "#d97706",
    accentStrong: "#b45309",
    accentSoft: "rgba(217, 119, 6, 0.2)",
    accentGrad: "linear-gradient(135deg, #fbbf24, #ea580c)",
    capabilities: [
      "SEO, content, and search visibility programs",
      "Paid media, social, and campaign analytics",
      "Funnel tracking that ties spend to outcomes",
    ],
    technologies: ["SEO", "Google Ads", "Analytics", "Social"],
  },
  {
    id: "wordpress",
    number: "06",
    title: "Wordpress Website",
    description: "Launch flexible, easy-to-manage WordPress sites that scale.",
    path: "/services/clouds-and-devops",
    icon: LayoutTemplate,
    category: "development",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=500&q=80",
    imageAlt: "Online store checkout interface",
    iconAnim: "spin",
    accent: "#0891b2",
    accentStrong: "#0e7490",
    accentSoft: "rgba(8, 145, 178, 0.2)",
    accentGrad: "linear-gradient(135deg, #22d3ee, #0891b2)",
    capabilities: [
      "Custom themes, blocks, and editorial workflows",
      "Performance, security, and hosting setup",
      "CMS training so your team can publish with confidence",
    ],
    technologies: ["WordPress", "WooCommerce", "PHP", "Gutenberg"],
  },
];

const PARTICLES = [
  { top: "18%", left: "12%", size: 4, delay: "0s" },
  { top: "28%", left: "78%", size: 3, delay: "1.2s" },
  { top: "42%", left: "22%", size: 5, delay: "0.6s" },
  { top: "58%", left: "88%", size: 3, delay: "1.8s" },
  { top: "22%", left: "52%", size: 2, delay: "2.4s" },
  { top: "68%", left: "8%", size: 4, delay: "0.9s" },
  { top: "36%", left: "64%", size: 3, delay: "1.5s" },
  { top: "74%", left: "46%", size: 2, delay: "2.1s" },
];

const FLOATERS = [
  { className: styles.floaterCircle, style: { top: "8%", left: "4%" }, delay: "0s" },
  { className: styles.floaterBlob, style: { top: "-6%", right: "8%" }, delay: "1.4s" },
  { className: styles.floaterLine, style: { top: "18%", right: "22%" }, delay: "0.5s" },
  { className: styles.floaterDot, style: { bottom: "12%", left: "10%" }, delay: "1.8s" },
  { className: styles.floaterShape, style: { bottom: "22%", right: "6%" }, delay: "0.8s" },
  { className: styles.floaterCircle, style: { top: "48%", left: "46%" }, delay: "2.2s" },
  { className: styles.floaterDot, style: { top: "6%", left: "38%" }, delay: "1.1s" },
];

const ease = [0.22, 1, 0.36, 1] as const;

function ServiceCard({
  service,
  reduced,
  hidden,
  index,
  onOpen,
}: {
  service: ServiceItem;
  reduced: boolean;
  hidden: boolean;
  index: number;
  onOpen: (service: ServiceItem) => void;
}) {
  const Icon = service.icon;
  const animClass =
    service.iconAnim === "scale"
      ? styles.cardAnimScale
      : service.iconAnim === "spin"
        ? styles.cardAnimSpin
        : "";

  return (
    <motion.div
      className={`${styles.cardSlot} ${hidden ? styles.cardSlotHidden : ""}`}
      initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      animate={{ opacity: hidden ? 0 : 1, y: 0 }}
      transition={{
        duration: reduced ? 0 : 0.45,
        delay: reduced || hidden ? 0 : Math.min(index, 5) * 0.1,
        ease,
      }}
      aria-hidden={hidden}
    >
      <button
        type="button"
        className={`${styles.card} ${animClass}`}
        style={
          {
            "--accent": service.accent,
            "--accent-strong": service.accentStrong,
            "--accent-soft": service.accentSoft,
            "--accent-grad": service.accentGrad,
          } as React.CSSProperties
        }
        onClick={() => {
          if (!hidden) onOpen(service);
        }}
        tabIndex={hidden ? -1 : 0}
        aria-haspopup="dialog"
        aria-label={`${service.title}. ${service.description} Open details.`}
      >
        <span className={styles.cardGlow} aria-hidden />

        <div className={styles.imagePanel}>
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
            className={styles.serviceImage}
          />
          <span className={styles.imageShade} aria-hidden />
          <span className={styles.number}>{service.number}</span>
          <span className={styles.categoryTag}>{service.category}</span>
          <span className={styles.iconWrap}>
            <Icon size={19} strokeWidth={1.9} aria-hidden />
          </span>
        </div>

        <div className={styles.cardBody}>
          <h3 className={styles.cardTitle}>{service.title}</h3>
          <p className={styles.cardDesc}>{service.description}</p>
          <span className={styles.explore} aria-hidden>
            Explore service
            <span className={styles.exploreArrow}>
              <ArrowRight size={14} />
            </span>
          </span>
        </div>
      </button>
    </motion.div>
  );
}

const OurServicesSection = () => {
  const reduced = useReducedMotion() === true;
  const sectionRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const [filter, setFilter] = useState<FilterId>("all");
  const [active, setActive] = useState<ServiceItem | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-28, 36]);
  const bgScale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1.04, 1.12]);

  const ActiveIcon = active?.icon;

  const headingVariants: Variants = {
    hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 30, letterSpacing: "0.16em" },
    visible: {
      opacity: 1,
      y: 0,
      letterSpacing: "0.08em",
      transition: { duration: reduced ? 0 : 0.7, ease },
    },
  };

  const copyVariants: Variants = {
    hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 0.16, ease },
    },
  };

  const openService = (service: ServiceItem) => {
    lastFocus.current = document.activeElement as HTMLElement;
    setActive(service);
  };

  const closeService = () => {
    setActive(null);
    lastFocus.current?.focus();
  };

  useEffect(() => {
    if (!active) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActive(null);
        lastFocus.current?.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section id="services" ref={sectionRef} className={styles.section} aria-labelledby={titleId}>
      <div className={styles.hero}>
        <motion.div className={styles.bgParallax} style={{ y: bgY, scale: bgScale }} aria-hidden>
          <Image
            src="/ourservicesimage.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className={styles.bgImage}
          />
        </motion.div>

        <div className={styles.overlay} aria-hidden />
        <span className={`${styles.ambientGlow} ${styles.glowA}`} aria-hidden />
        <span className={`${styles.ambientGlow} ${styles.glowB}`} aria-hidden />
        <div className={styles.gridTexture} aria-hidden />
        <div className={styles.particles} aria-hidden>
          {PARTICLES.map((particle, index) => (
            <span
              key={index}
              className={styles.particle}
              style={{
                top: particle.top,
                left: particle.left,
                width: particle.size,
                height: particle.size,
                animationDelay: particle.delay,
              }}
            />
          ))}
        </div>

        <div className={styles.heroInner}>
          <div className={styles.textBox}>
            <motion.h2
              id={titleId}
              className={styles.heading}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              variants={headingVariants}
            >
              Our Services
            </motion.h2>
            <motion.p
              className={styles.description}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              variants={copyVariants}
            >
              We provide innovative, tailor-made solutions to meet your business
              needs. Our team delivers high-quality services with a focus on
              efficiency and results. Client satisfaction is our priority as we
              ensure timely, reliable, and scalable services.
            </motion.p>

            <motion.div
              className={styles.filters}
              role="group"
              aria-label="Filter services"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.28, ease }}
            >
              {FILTERS.map((item) => {
                const selected = filter === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={selected}
                    className={`${styles.filterBtn} ${selected ? styles.filterBtnActive : ""}`}
                    onClick={() => setFilter(item.id)}
                  >
                    {item.label}
                  </button>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>

      <div className={styles.deck}>
        <div className={styles.floaters} aria-hidden>
          {FLOATERS.map((floater, index) => (
            <span
              key={index}
              className={`${styles.floater} ${floater.className}`}
              style={{ ...floater.style, animationDelay: floater.delay }}
            />
          ))}
        </div>

        <div className={styles.grid}>
          {serviceData.map((service, index) => {
            const hidden = filter !== "all" && service.category !== filter;
            return (
              <ServiceCard
                key={service.id}
                service={service}
                reduced={reduced}
                hidden={hidden}
                index={index}
                onOpen={openService}
              />
            );
          })}
        </div>
      </div>

      <motion.div
        className={styles.lower}
        initial={reduced ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: reduced ? 0 : 0.5, ease }}
      >
        <div className={styles.cta}>
          <p className={styles.ctaKicker}>Have a project in mind?</p>
          <p className={styles.ctaTitle}>Let&apos;s build something exceptional together.</p>
          <div className={styles.ctaWrap}>
            <span className={styles.ctaGlow} aria-hidden />
            <Link href="/contact" className={styles.ctaBtn}>
              Start a Project
              <span className={styles.ctaArrow} aria-hidden>
                <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {active && (
          <motion.div
            className={styles.modalBackdrop}
            role="presentation"
            onClick={closeService}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.25 }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={`${titleId}-dialog`}
              className={styles.modal}
              style={
                {
                  "--accent": active.accent,
                  "--accent-grad": active.accentGrad,
                  "--accent-soft": active.accentSoft,
                } as React.CSSProperties
              }
              onClick={(event) => event.stopPropagation()}
              initial={reduced ? false : { opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: reduced ? 0 : 0.35, ease }}
            >
              <button
                ref={closeRef}
                type="button"
                className={styles.modalClose}
                onClick={closeService}
                aria-label="Close service details"
              >
                <X size={18} />
              </button>

              <span className={styles.modalIcon} aria-hidden>
                {ActiveIcon ? <ActiveIcon size={26} strokeWidth={1.8} /> : null}
              </span>
              <h3 id={`${titleId}-dialog`} className={styles.modalTitle}>
                {active.title}
              </h3>
              <p className={styles.modalLead}>{active.description}</p>

              <p className={styles.modalLabel}>Key capabilities</p>
              <ul className={styles.modalList}>
                {active.capabilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <p className={styles.modalLabel}>Technologies</p>
              <div className={styles.techRow}>
                {active.technologies.map((tech) => (
                  <span key={tech} className={styles.tech}>
                    {tech}
                  </span>
                ))}
              </div>

              <div className={styles.modalActions}>
                <Link href="/contact" className={styles.modalPrimary}>
                  Get Started
                  <ArrowRight size={15} aria-hidden />
                </Link>
                <Link href={active.path} className={styles.modalSecondary}>
                  Explore Service
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default OurServicesSection;
