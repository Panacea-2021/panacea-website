"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence, useInView } from "framer-motion";
import { Sparkles, AlertCircle, ArrowRight } from "lucide-react";
import { trackContactFormSubmit } from "@/lib/gtag";
import styles from "./Contact.module.css";

const COUNTRY_OPTIONS = [
  "Afghanistan (+93)", "Albania (+355)", "Algeria (+213)", "Argentina (+54)", "Australia (+61)",
  "Austria (+43)", "Bangladesh (+880)", "Belgium (+32)", "Brazil (+55)", "Canada (+1)",
  "Chile (+56)", "China (+86)", "Colombia (+57)", "Denmark (+45)", "Egypt (+20)",
  "Finland (+358)", "France (+33)", "Germany (+49)", "Greece (+30)", "Hong Kong (+852)",
  "Hungary (+36)", "Iceland (+354)", "India (+91)", "Indonesia (+62)", "Iran (+98)",
  "Iraq (+964)", "Ireland (+353)", "Israel (+972)", "Italy (+39)", "Japan (+81)",
  "Kenya (+254)", "Malaysia (+60)", "Mexico (+52)", "Netherlands (+31)", "New Zealand (+64)",
  "Nigeria (+234)", "Norway (+47)", "Pakistan (+92)", "Philippines (+63)", "Poland (+48)",
  "Portugal (+351)", "Qatar (+974)", "Romania (+40)", "Russia (+7)", "Saudi Arabia (+966)",
  "Singapore (+65)", "South Africa (+27)", "South Korea (+82)", "Spain (+34)", "Sri Lanka (+94)",
  "Sweden (+46)", "Switzerland (+41)", "Thailand (+66)", "Turkey (+90)", "UAE (+971)",
  "United Kingdom (+44)", "United States (+1)", "Vietnam (+84)",
];

const BENEFITS = [
  { num: "01", title: "Strategy First", desc: "Clear thinking before development." },
  { num: "02", title: "Premium Execution", desc: "Interfaces designed to feel exceptional." },
  { num: "03", title: "Built to Scale", desc: "Solutions designed for long-term growth." },
];

const HEADLINE_LINES = [
  { text: "Your Idea.", gradient: false },
  { text: "Our Expertise.", gradient: true },
  { text: "Let's Create.", gradient: false },
];

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  error?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  as?: "input" | "textarea" | "select";
  children?: React.ReactNode;
  rows?: number;
};

function PremiumField({ label, name, type = "text", error, value, onChange, as = "input", children, rows = 3 }: FieldProps) {
  const filled = value.trim().length > 0;
  const fieldClass = [
    styles.field,
    filled ? styles.fieldFilled : "",
    error ? styles.fieldError : "",
  ].filter(Boolean).join(" ");

  const commonProps = {
    name,
    id: name,
    value,
    onChange,
    "aria-invalid": !!error,
    "aria-describedby": error ? `${name}-error` : undefined,
  };

  return (
    <div className={fieldClass}>
      {as === "textarea" ? (
        <textarea
          {...commonProps}
          rows={rows}
          className={`${styles.fieldTextarea} ${error ? styles.fieldInputError : ""}`}
          placeholder=" "
        />
      ) : as === "select" ? (
        <select
          {...commonProps}
          className={`${styles.fieldSelect} ${error ? styles.fieldSelectError : ""}`}
        >
          {children}
        </select>
      ) : (
        <input
          {...commonProps}
          type={type}
          className={`${styles.fieldInput} ${error ? styles.fieldInputError : ""}`}
          placeholder=" "
        />
      )}
      <label htmlFor={name} className={styles.fieldLabel}>{label}</label>
      <span className={styles.fieldFocusLine} aria-hidden="true" />
      <span className={styles.fieldGlow} aria-hidden="true" />
      <AnimatePresence>
        {error && (
          <motion.span
            id={`${name}-error`}
            role="alert"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={styles.fieldErrorMsg}
          >
            <AlertCircle size={11} /> {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CreativeLightContact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "India (+91)",
    phone: "",
    interest: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [, setCaptchaCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789#@$";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(result);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const textX = useSpring(useTransform(x, [-100, 100], [30, -30]), { stiffness: 100, damping: 20 });
  const textY = useSpring(useTransform(y, [-100, 100], [30, -30]), { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;
    x.set((mouseX / width - 0.5) * 100);
    y.set((mouseY / height - 0.5) * 100);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Required.";
    if (!formData.email.trim()) newErrors.email = "Required.";
    if (!formData.phone.trim()) newErrors.phone = "Required.";
    if (!formData.interest) newErrors.interest = "Required.";
    if (!formData.message.trim()) newErrors.message = "Required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, source: "Contact form" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send");
      if (data.delivery === "mailto" && data.mailto) {
        window.location.href = data.mailto;
      }
      trackContactFormSubmit();
      setIsSuccess(true);
    } catch {
      setErrors({ message: "Could not send. Please email contact@panaceaitservices.com." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSuccess(false);
    setFormData({ name: "", email: "", country: "India (+91)", phone: "", interest: "", message: "" });
    generateCaptcha();
  };

  const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
  const fadeUp = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-start justify-center overflow-hidden bg-slate-50 pt-48 pb-20 px-4"
    >
      {/* --- BACKGROUND LAYERS (unchanged) --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-200/40 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-10%] left-[-5%] w-[700px] h-[700px] bg-purple-200/40 rounded-full blur-[100px]"
        />
        <motion.div style={{ x: textX, y: textY }} className="absolute top-10 w-full flex justify-center z-0">
          <h1
            className="text-[15vw] md:text-[12vw] font-black whitespace-nowrap leading-none tracking-tighter select-none"
            style={{ WebkitTextStroke: "2px #93c5fd", color: "transparent" }}
          >
            Let&apos;s Discuss
          </h1>
        </motion.div>
      </div>

      {/* --- SUBTLE FOREGROUND DECOR (behind card) --- */}
      <div className={styles.foregroundDecor} aria-hidden="true">
        <div className={`${styles.decorOrb} ${styles.decorOrb1}`} />
        <div className={`${styles.decorOrb} ${styles.decorOrb2}`} />
        <div className={styles.decorCurve} />
        <div className={styles.decorDots}>
          <span className={styles.decorDot} />
          <span className={styles.decorDot} />
          <span className={styles.decorDot} />
        </div>
        <div className={styles.decorStreak} />
      </div>

      {/* --- PREMIUM CARD --- */}
      <div ref={cardRef} className={`relative z-10 w-full max-w-6xl ${styles.cardWrap}`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 24 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className={styles.card}
        >
          <div className={styles.cardGlow} aria-hidden="true" />
          <div className={styles.cardHighlight} aria-hidden="true" />
          <div className={styles.cardAmbient} aria-hidden="true" />

          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className={styles.successWrap}
              >
                <div className={styles.successIcon}>
                  <Sparkles size={36} />
                </div>
                <h3 className={styles.successTitle}>Message Received!</h3>
                <p className={styles.successText}>
                  We&apos;ve received your inquiry. Our team will get back to you within 24 hours.
                </p>
                <button type="button" onClick={resetForm} className={styles.successBtn}>
                  Send Another
                </button>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.cardInner}>
                {/* LEFT — Editorial content */}
                <motion.div
                  className={styles.leftPanel}
                  variants={stagger}
                  initial="hidden"
                  animate={isInView ? "show" : "hidden"}
                >
                  <div className={styles.leftOrb} aria-hidden="true" />

                  <motion.div variants={fadeUp} className={styles.eyebrow}>
                    <span className={`${styles.eyebrowLine} ${isInView ? styles.eyebrowLineVisible : ""}`} />
                    <span className={styles.eyebrowDot} />
                    <span className={styles.eyebrowText}>Let&apos;s Discuss</span>
                  </motion.div>

                  <motion.p variants={fadeUp} className={`${styles.eyebrowText} !text-[0.625rem] !tracking-[0.2em] !text-slate-400`}>
                    Let&apos;s Build Something Great
                  </motion.p>

                  <motion.h2 variants={fadeUp} className={styles.headline}>
                    {HEADLINE_LINES.map((line, i) => (
                      <motion.span
                        key={line.text}
                        className={`${styles.headlineLine} ${line.gradient ? styles.headlineGradient : ""}`}
                        initial={{ opacity: 0, y: 12 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.15 + i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {line.text}
                      </motion.span>
                    ))}
                  </motion.h2>

                  <motion.p variants={fadeUp} className={styles.supportText}>
                    Whether you&apos;re launching something new or transforming an existing product, let&apos;s create a digital experience that makes an impact.
                  </motion.p>

                  <motion.div variants={fadeUp} className={styles.benefits}>
                    {BENEFITS.map((b, i) => (
                      <motion.div
                        key={b.num}
                        className={styles.benefit}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.35 + i * 0.08, duration: 0.45 }}
                      >
                        <span className={styles.benefitNum}>{b.num}</span>
                        <div className={styles.benefitContent}>
                          <span className={styles.benefitTitle}>{b.title}</span>
                          <span className={styles.benefitDesc}>{b.desc}</span>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div variants={fadeUp} className={styles.trustChips}>
                    <span className={styles.trustChip}>Strategy-first approach</span>
                    <span className={styles.trustChip}>Premium digital experiences</span>
                    <span className={styles.trustChip}>Built around your goals</span>
                  </motion.div>
                </motion.div>

                {/* RIGHT — Form */}
                <motion.div
                  className={styles.rightPanel}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className={styles.formEyebrow}>Project Initiation</p>

                  <form onSubmit={handleSubmit} className={styles.formGrid} noValidate>
                    <div className={styles.formRow}>
                      <PremiumField label="Full Name*" name="name" value={formData.name} onChange={handleChange} error={errors.name} />
                      <PremiumField label="Email Address*" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
                    </div>

                    <div className={styles.formRow}>
                      <PremiumField label="Country" name="country" value={formData.country} onChange={handleChange} as="select">
                        {COUNTRY_OPTIONS.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </PremiumField>
                      <PremiumField label="Phone Number*" name="phone" value={formData.phone} onChange={handleChange} error={errors.phone} />
                    </div>

                    <PremiumField label="Interested In*" name="interest" value={formData.interest} onChange={handleChange} error={errors.interest} as="select">
                      <option value="" disabled hidden />
                      <option value="Web Design">Web Design</option>
                      <option value="Graphic Design">Graphic Design</option>
                      <option value="App Development">App Development</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                      <option value="Business Development">Business Development</option>
                      <option value="Job Requirements">Job Requirements</option>
                      <option value="Other">Other</option>
                    </PremiumField>

                    <PremiumField label="Your Message*" name="message" value={formData.message} onChange={handleChange} error={errors.message} as="textarea" rows={3} />

                    <div className={styles.ctaWrap}>
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className={styles.ctaButton}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isSubmitting ? "Processing..." : "Start the Conversation"}
                        {!isSubmitting && <ArrowRight size={17} className={styles.ctaArrow} aria-hidden="true" />}
                      </motion.button>
                      <p className={styles.ctaMicrocopy}>
                        Tell us what you&apos;re building — we&apos;ll take it from there.
                      </p>
                      <p className={styles.ctaMicrocopySecondary}>
                        Usually responds within 1 business day.
                      </p>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
