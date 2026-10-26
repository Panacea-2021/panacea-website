"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaChevronUp,
  FaEnvelope,
} from "react-icons/fa";
import { Suez_One } from "next/font/google";
import Image from "next/image";
import { trackEmailClick, trackPhoneClick } from "@/lib/gtag";
import styles from "./Footer.module.css";

const suezOne = Suez_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-suez-one",
});

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease },
  }),
};

const contactStagger = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease,
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const contactItemMotion = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

const PARTICLES = [
  { x: 6, y: 10, s: 1.4, d: 14, delay: 0 },
  { x: 18, y: 28, s: 1, d: 18, delay: 2 },
  { x: 32, y: 8, s: 1.2, d: 16, delay: 4 },
  { x: 48, y: 22, s: 0.9, d: 20, delay: 1 },
  { x: 62, y: 12, s: 1.3, d: 15, delay: 3 },
  { x: 78, y: 30, s: 1, d: 17, delay: 5 },
  { x: 91, y: 16, s: 1.1, d: 19, delay: 2.5 },
  { x: 12, y: 48, s: 0.8, d: 22, delay: 6 },
  { x: 28, y: 58, s: 1.2, d: 16, delay: 1.5 },
  { x: 44, y: 42, s: 1, d: 18, delay: 4.5 },
  { x: 58, y: 62, s: 1.4, d: 14, delay: 0.8 },
  { x: 74, y: 50, s: 0.9, d: 21, delay: 3.2 },
  { x: 88, y: 68, s: 1.1, d: 17, delay: 5.5 },
  { x: 8, y: 78, s: 1, d: 19, delay: 2.2 },
  { x: 22, y: 88, s: 1.3, d: 15, delay: 7 },
  { x: 40, y: 76, s: 0.8, d: 23, delay: 1.1 },
  { x: 55, y: 90, s: 1.2, d: 16, delay: 4.8 },
  { x: 70, y: 82, s: 1, d: 18, delay: 0.4 },
  { x: 84, y: 92, s: 1.1, d: 20, delay: 6.2 },
  { x: 95, y: 44, s: 0.9, d: 17, delay: 3.8 },
  { x: 38, y: 34, s: 1.2, d: 15, delay: 8 },
  { x: 66, y: 38, s: 1, d: 19, delay: 2.8 },
];

/* ---------- Scroll to top ---------- */

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const reduced = useReducedMotion() === true;

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 300);
    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="Back to top"
      title="Back to top"
      onClick={scrollToTop}
      tabIndex={isVisible ? 0 : -1}
      aria-hidden={!isVisible}
      className={`${styles.backToTop} ${!isVisible ? styles.backToTopHidden : ""}`}
    >
      <FaChevronUp size={16} aria-hidden className={styles.backToTopIcon} />
      <span className={styles.backToTopTooltip}>Back to top</span>
    </button>
  );
};

/* ---------- Nav link: dot → arrow on hover ---------- */

const NavLink = ({ href, label }: { href: string; label: string }) => (
  <li>
    <a href={href} className={styles.navLink}>
      <span className={styles.navIndicator} aria-hidden>
        <span className={styles.navDot} />
        <span className={styles.navArrow}>→</span>
      </span>
      {label}
    </a>
  </li>
);

/* ---------- Contact item ---------- */

const ContactItem = ({
  icon,
  title,
  content,
  sub,
  iconClass,
  href,
  onClick,
  nowrap,
}: {
  icon: React.ReactNode;
  title: string;
  content: string;
  sub: string;
  iconClass: string;
  href?: string;
  onClick?: () => void;
  nowrap?: boolean;
}) => (
  <motion.div className={styles.contactItem} variants={contactItemMotion}>
    <div className={`${styles.contactIconWrap} ${iconClass}`}>{icon}</div>
    <div className={styles.contactBody}>
      <p className={styles.contactLabel}>{title}</p>
      {href ? (
        <a
          href={href}
          onClick={onClick}
          className={`${styles.contactValue} ${nowrap ? styles.contactValueNowrap : ""}`}
        >
          {content}
        </a>
      ) : (
        <p className={styles.contactValue}>{content}</p>
      )}
      <p className={styles.contactSub}>{sub}</p>
    </div>
  </motion.div>
);

/* ---------- Main footer ---------- */

const Footer = () => {
  const reduced = useReducedMotion() === true;
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reduced) return;
    const el = footerRef.current;
    if (!el) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const offset = ((rect.top + rect.height / 2 - vh / 2) / vh) * 18;
        el.style.setProperty("--parallax-y", `${offset.toFixed(2)}px`);
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduced]);

  const services = [
    { label: "Web Development", href: "/services/web" },
    { label: "Mobile Apps", href: "/services/mobile" },
    { label: "UI/UX Design", href: "/services" },
    { label: "Digital Marketing", href: "/services" },
    { label: "SEO Optimization", href: "/services/seo" },
    { label: "Consulting", href: "/contact" },
  ];

  const companyLinks = [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/#team" },
    { label: "Careers", href: "/careers" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  const socials = [
    {
      icon: <FaFacebookF />,
      href: "https://www.facebook.com/people/Panacea-Itservices/pfbid02xyrubFZ9aJzH3pyxSHRhyMoUXDVmGXJWnU3uKffcqQT7Vk5gGH8t99QrE1NqobY2l/",
      className: styles.socialFacebook,
      label: "Follow Panacea on Facebook",
    },
    {
      icon: <FaInstagram />,
      href: "https://www.instagram.com/panaceaitservices/?hl=en",
      className: styles.socialInstagram,
      label: "Follow Panacea on Instagram",
    },
    {
      icon: <FaLinkedinIn />,
      href: "https://www.linkedin.com/company/107517525/",
      className: styles.socialLinkedin,
      label: "Connect with Panacea on LinkedIn",
    },
  ];

  const contactInfo = {
    email: "contact@panaceaitservices.com",
    emailSub: "Get in touch",
    phone: "+91 9347959536",
    phoneSub: "Call us anytime",
    address: "Panacea IT Services, Madhapur, Hyderabad / USA",
    addressSub: "Our headquarters",
  };

  const motionProps = reduced
    ? {}
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, margin: "-40px" },
      };

  return (
    <>
      <footer ref={footerRef} className={styles.footer}>
        <div className={styles.topFade} aria-hidden />

        <div className={styles.topGlow} aria-hidden>
          <div className={styles.topGlowLine} />
          {!reduced && <div className={styles.topGlowShimmer} />}
          <div className={styles.topGlowBloom} />
        </div>

        <div className={styles.bgLayer} aria-hidden>
          <div className={styles.bgBase} />
          <div className={styles.bgGrid} />
          <div className={styles.bgNoise} />
          <div className={styles.bgStars} />
          <svg
            className={styles.networkMesh}
            viewBox="0 0 1440 760"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <g className={styles.networkLines}>
              <path d="M0 442 128 386 260 418 392 330 522 376 654 306 792 352 932 270 1068 316 1194 226 1324 278 1440 214" />
              <path d="M0 442 82 550 224 512 260 418 338 560 470 486 522 376 590 530 724 468 792 352 856 520 1000 448 1068 316 1140 508 1280 432 1324 278 1440 380" />
              <path d="M82 550 154 680 302 620 338 560 470 658 590 530 676 670 812 600 856 520 1000 640 1140 508 1206 664 1360 572 1440 380" />
              <path d="M128 386 156 274 294 294 392 330 422 224 560 244 654 306 692 192 830 224 932 270 968 160 1104 188 1194 226 1230 128 1364 158" />
              <path d="M224 512 294 294 338 560 422 224 470 486 560 244 590 530 692 192 724 468 830 224 856 520 968 160 1000 448 1104 188 1140 508 1230 128 1280 432 1364 158 1440 214" />
            </g>
            <g className={styles.networkNodes}>
              <circle cx="82" cy="550" r="3.5" />
              <circle cx="128" cy="386" r="3" />
              <circle cx="156" cy="274" r="3.5" />
              <circle cx="224" cy="512" r="4" />
              <circle cx="260" cy="418" r="3" />
              <circle cx="294" cy="294" r="3.5" />
              <circle cx="338" cy="560" r="4" />
              <circle cx="392" cy="330" r="3.5" />
              <circle cx="422" cy="224" r="3" />
              <circle cx="470" cy="486" r="4" />
              <circle cx="522" cy="376" r="3" />
              <circle cx="590" cy="530" r="4" />
              <circle cx="654" cy="306" r="3.5" />
              <circle cx="724" cy="468" r="3" />
              <circle cx="792" cy="352" r="4" />
              <circle cx="856" cy="520" r="3.5" />
              <circle cx="932" cy="270" r="3" />
              <circle cx="1000" cy="448" r="4" />
              <circle cx="1068" cy="316" r="3.5" />
              <circle cx="1140" cy="508" r="3" />
              <circle cx="1194" cy="226" r="4" />
              <circle cx="1280" cy="432" r="3.5" />
              <circle cx="1324" cy="278" r="3" />
              <circle cx="1360" cy="572" r="4" />
            </g>
          </svg>
          <div className={styles.bgParallax}>
            <div className={`${styles.bgOrb} ${styles.bgOrbCta}`} />
            <div className={`${styles.bgOrb} ${styles.bgOrbNav}`} />
            <div className={`${styles.bgOrb} ${styles.bgOrbContact}`} />
          </div>
          <div className={styles.bgArc} />
          <div className={styles.bgRect} />
          <div className={styles.bgCircle} />
          <div className={styles.bgVignette} />
        </div>

        {!reduced && (
          <div className={styles.particles} aria-hidden>
            {PARTICLES.map((p, i) => (
              <span
                key={i}
                className={styles.particle}
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: `${p.s}px`,
                  height: `${p.s}px`,
                  animationDuration: `${p.d}s`,
                  animationDelay: `${p.delay}s`,
                }}
              />
            ))}
          </div>
        )}

        <div className={styles.container}>
          {/* CTA hero */}
          <motion.div
            className={styles.ctaSection}
            variants={fadeUp}
            custom={0}
            {...motionProps}
          >
            <div className={styles.ctaGlow} aria-hidden />
            <div className={styles.ctaBeam} aria-hidden />
            <h2 className={styles.ctaHeading}>
              Let&apos;s build something exceptional.
            </h2>
            <p className={styles.ctaText}>
              Have an idea, product, or business challenge? Let&apos;s turn it
              into a digital experience that stands out.
            </p>
            <a href="/contact" className={styles.ctaButton}>
              Start a Conversation
              <span className={styles.ctaArrow} aria-hidden>
                →
              </span>
            </a>
          </motion.div>

          <div className={styles.sectionDivider} aria-hidden />

          {/* Main grid */}
          <div className={styles.mainGrid}>
            <motion.div
              className={styles.brandCol}
              variants={fadeUp}
              custom={0.1}
              {...motionProps}
            >
              <div className={styles.brandHeader}>
                <div className={styles.logoWrap}>
                  <div className={styles.logoHalo} aria-hidden />
                  <div className={styles.logoImage}>
                    <Image
                      src="/logo.png"
                      alt="Panacea Logo"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h2 className={`${suezOne.className} ${styles.brandTitle}`}>
                    Panacea
                  </h2>
                  <span className={styles.brandSubtitle}>
                    IT Services Pvt.Ltd
                  </span>
                </div>
              </div>

              <p className={styles.brandDesc}>
                We create innovative digital solutions that help businesses grow
                and connect with their audiences through modern design and
                cutting-edge technology.
              </p>

              <div className={styles.socialRow}>
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    className={`${styles.socialBtn} ${s.className}`}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.nav
              className={styles.navCol}
              aria-label="Services"
              variants={fadeUp}
              custom={0.16}
              {...motionProps}
            >
              <h3 className={styles.navHeading}>
                <span className={styles.navHeadingAccent} aria-hidden />
                Services
              </h3>
              <ul className={styles.navList}>
                {services.map((svc) => (
                  <NavLink key={svc.label} href={svc.href} label={svc.label} />
                ))}
              </ul>
            </motion.nav>

            <motion.nav
              className={styles.navCol}
              aria-label="Company"
              variants={fadeUp}
              custom={0.22}
              {...motionProps}
            >
              <h3 className={styles.navHeading}>
                <span className={styles.navHeadingAccent} aria-hidden />
                Company
              </h3>
              <ul className={styles.navList}>
                {companyLinks.map((link) => (
                  <NavLink key={link.label} href={link.href} label={link.label} />
                ))}
              </ul>
            </motion.nav>
          </div>

          <div className={styles.sectionDivider} aria-hidden />

          {/* Contact command bar */}
          <motion.div
            className={styles.contactCardWrap}
            variants={contactStagger}
            {...motionProps}
          >
            <div className={styles.contactCardGlow} aria-hidden />
            <div className={styles.contactCard}>
              <div className={styles.contactCardInner}>
                <ContactItem
                  icon={<FaEnvelope size={16} />}
                  title="Email"
                  content={contactInfo.email}
                  sub={contactInfo.emailSub}
                  iconClass={styles.contactIconCyan}
                  href={`mailto:${contactInfo.email}`}
                  onClick={trackEmailClick}
                  nowrap
                />
                <ContactItem
                  icon={<FaPhoneAlt size={15} />}
                  title="Phone"
                  content={contactInfo.phone}
                  sub={contactInfo.phoneSub}
                  iconClass={styles.contactIconBlue}
                  href="tel:+919347959536"
                  onClick={trackPhoneClick}
                  nowrap
                />
                <ContactItem
                  icon={<FaMapMarkerAlt size={16} />}
                  title="Location"
                  content={contactInfo.address}
                  sub={contactInfo.addressSub}
                  iconClass={styles.contactIconPurple}
                />
              </div>
            </div>
          </motion.div>

          {/* Copyright */}
          <motion.div
            className={styles.legalBar}
            variants={fadeUp}
            custom={0.38}
            {...motionProps}
          >
            <p className={styles.copyrightMain}>
              © 2026 Panacea IT Services Pvt. Ltd.
            </p>
            <p className={styles.copyrightSub}>All rights reserved.</p>
            <div className={styles.legalLinks}>
              <a href="/privacy" className={styles.legalLink}>
                Privacy
              </a>
              <span className={styles.legalDot} aria-hidden>
                ·
              </span>
              <a href="/terms" className={styles.legalLink}>
                Terms
              </a>
              <span className={styles.legalDot} aria-hidden>
                ·
              </span>
              <a href="/privacy" className={styles.legalLink}>
                GDPR
              </a>
            </div>
          </motion.div>
        </div>

        <div className={styles.watermark} aria-hidden>
          <p className={`${suezOne.className} ${styles.watermarkText}`}>
            PANACEA
          </p>
        </div>
      </footer>

      <BackToTop />
    </>
  );
};

export default Footer;
