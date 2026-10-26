"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Loader2, RefreshCw, Sparkles, X } from "lucide-react";
import {
  DIAL_CODES,
  FIND_US_OPTIONS,
  submitContact,
} from "@/lib/submitContact";
import RobotAnimation from "./RobotAnimation";
import VideoCarousel from "./VideoCarousel";
import styles from "./QuoteLeadPopup.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;
const CAPTCHA_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

type Props = {
  open: boolean;
  onClose: () => void;
};

function makeCaptcha() {
  let result = "";
  for (let i = 0; i < 5; i += 1) {
    result += CAPTCHA_CHARS[Math.floor(Math.random() * CAPTCHA_CHARS.length)];
  }
  return result;
}

function QuoteRobot() {
  return (
    <div className={styles.robotWrap} aria-hidden>
      <RobotAnimation welcomeText="Welcome to Panacea" />
    </div>
  );
}

export default function QuoteLeadPopup({ open, onClose }: Props) {
  const reduced = useReducedMotion() === true;
  const titleId = useId();
  const descId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    country: DIAL_CODES[0].country,
    phone: "",
    findUs: "",
    message: "",
    nda: false,
    captchaInput: "",
  });
  const [captcha, setCaptcha] = useState(makeCaptcha);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const selectedDial = useMemo(
    () => DIAL_CODES.find((item) => item.country === form.country) ?? DIAL_CODES[0],
    [form.country],
  );

  useEffect(() => {
    if (!open) return undefined;

    previousFocus.current = document.activeElement as HTMLElement | null;
    const frame = window.requestAnimationFrame(() => closeRef.current?.focus());

    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflowX = "hidden";

    const getFocusable = () => {
      const root = dialogRef.current;
      if (!root) return [];
      return Array.from(
        root.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => !el.hasAttribute("disabled") && el.getClientRects().length > 0);
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (document.querySelector("[data-quote-video-modal]")) return;
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const items = getFocusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflowX = "";
      previousFocus.current?.focus?.();
    };
  }, [open, onClose]);

  const setField = (name: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email.";
    if (!form.phone.trim()) next.phone = "Please enter your mobile number.";
    else if (!/^[0-9]{8,15}$/.test(form.phone.replace(/\s+/g, ""))) next.phone = "Enter a valid number.";
    if (!form.findUs) next.findUs = "Please tell us where you found us.";
    if (!form.message.trim()) next.message = "Please describe your project.";
    if (form.captchaInput.trim().toUpperCase() !== captcha) next.captchaInput = "Captcha does not match.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const ndaLine = form.nda ? "NDA requested: Yes" : "NDA requested: No";
      await submitContact({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        country: form.country,
        interest: form.findUs,
        message: `${form.message.trim()}\n\nWhere they found us: ${form.findUs}\n${ndaLine}`,
        source: "Quote popup",
      });
      setSuccess(true);
    } catch {
      setErrors({
        message: "Could not send. Please email contact@panaceaitservices.com.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      className={styles.root}
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.28 }}
    >
      <button
        type="button"
        className={styles.backdrop}
        aria-label="Close quote form backdrop"
        onClick={onClose}
      />

      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className={styles.dialog}
        initial={reduced ? false : { opacity: 0, scale: 0.96, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 10 }}
        transition={{ duration: reduced ? 0 : 0.42, ease: EASE }}
        onClick={(event) => event.stopPropagation()}
      >
        <span className={styles.dialogGlass} aria-hidden />
        <button
          ref={closeRef}
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close quote form"
          data-quote-close
        >
          <X size={18} strokeWidth={2.4} />
        </button>

        <div className={styles.scroller}>
          {success ? (
            <div className={styles.success}>
              <div className={styles.successIcon} aria-hidden>
                <Check size={28} />
              </div>
              <h3>Quote request received</h3>
              <p>Our experts will review your requirements and get back with a quote and timeline.</p>
            </div>
          ) : (
            <div className={styles.layout}>
              <section className={styles.left} aria-label="Client reviews">
                <span className={styles.leftGrid} aria-hidden />
                <span className={styles.leftGlow} aria-hidden />
                <span className={`${styles.leftGlow} ${styles.leftGlowGold}`} aria-hidden />
                <span className={`${styles.leftGlow} ${styles.leftGlowPink}`} aria-hidden />
                <span className={styles.leftLines} aria-hidden />
                <span className={styles.orbA} aria-hidden />
                <span className={styles.orbB} aria-hidden />
                <span className={styles.spark} aria-hidden />
                <span className={`${styles.spark} ${styles.sparkTwo}`} aria-hidden />

                <motion.h2
                  className={styles.holdOn}
                  initial={reduced ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  Hold On
                </motion.h2>
                <motion.p
                  id={titleId}
                  className={styles.heroPill}
                  initial={reduced ? false : { opacity: 0, rotateX: 18, y: 14 }}
                  animate={{ opacity: 1, rotateX: 8, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
                >
                  Let&apos;s Build Your App
                </motion.p>

                <motion.div
                  className={styles.reviewCard}
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.16, ease: EASE }}
                >
                  <span className={styles.reviewGlow} aria-hidden />
                  <h3 className={styles.reviewEyebrow}>
                    <Sparkles size={13} aria-hidden />
                    Words From Our Clients
                  </h3>
                  <VideoCarousel intervalMs={5000} />
                </motion.div>

                <QuoteRobot />
              </section>

              <section className={styles.right}>
                <motion.h3
                  id={descId}
                  className={styles.formTitle}
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.12, ease: EASE }}
                >
                  Share Your Needs, And We&apos;ll Provide A Quote And Timeline.
                </motion.h3>

                <form className={styles.form} onSubmit={handleSubmit} noValidate>
                  <div className={styles.row}>
                    <label className={`${styles.field} ${errors.name ? styles.fieldError : ""}`}>
                      <span className={styles.srOnly}>Enter your full name</span>
                      <input
                        className={styles.input}
                        name="name"
                        autoComplete="name"
                        placeholder="Enter your full name"
                        value={form.name}
                        onChange={(e) => setField("name", e.target.value)}
                      />
                      {errors.name && <span className={styles.error}>{errors.name}</span>}
                    </label>
                    <label className={`${styles.field} ${errors.email ? styles.fieldError : ""}`}>
                      <span className={styles.srOnly}>Enter your mail ID</span>
                      <input
                        className={styles.input}
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Enter your mail ID"
                        value={form.email}
                        onChange={(e) => setField("email", e.target.value)}
                      />
                      {errors.email && <span className={styles.error}>{errors.email}</span>}
                    </label>
                  </div>

                  <div className={`${styles.field} ${errors.phone ? styles.fieldError : ""}`}>
                    <span className={styles.srOnly} id="quote-phone-label">
                      Enter your mobile number
                    </span>
                    <div className={styles.phoneRow}>
                      <div className={styles.dial}>
                        <span className={styles.dialFlag} aria-hidden>
                          {selectedDial.flag}
                        </span>
                        <span>{selectedDial.dial}</span>
                        <select
                          className={styles.dialSelect}
                          name="country"
                          aria-label="Country code"
                          value={form.country}
                          onChange={(e) => setField("country", e.target.value)}
                        >
                          {DIAL_CODES.map((item) => (
                            <option key={item.country} value={item.country}>
                              {item.flag} {item.dial} {item.country.replace(/\s\(\+\d+\)$/, "")}
                            </option>
                          ))}
                        </select>
                      </div>
                      <input
                        className={styles.phoneInput}
                        name="phone"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel"
                        placeholder="Enter your mobile no"
                        aria-labelledby="quote-phone-label"
                        value={form.phone}
                        onChange={(e) => setField("phone", e.target.value)}
                      />
                    </div>
                    {errors.phone && <span className={styles.error}>{errors.phone}</span>}
                  </div>

                  <label className={`${styles.field} ${errors.findUs ? styles.fieldError : ""}`}>
                    <span className={styles.srOnly}>Where did you find us?</span>
                    <select
                      className={`${styles.select} ${!form.findUs ? styles.selectPlaceholder : ""}`}
                      name="findUs"
                      value={form.findUs}
                      onChange={(e) => setField("findUs", e.target.value)}
                      required
                    >
                      <option value="" disabled>
                        Where did you find us?*
                      </option>
                      {FIND_US_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.findUs && <span className={styles.error}>{errors.findUs}</span>}
                  </label>

                  <label className={`${styles.field} ${errors.message ? styles.fieldError : ""}`}>
                    <span className={styles.srOnly}>
                      Describe your Project or Idea in Brief
                    </span>
                    <textarea
                      className={styles.textarea}
                      name="message"
                      rows={5}
                      placeholder="Describe your Project/Idea in Brief (Make our comeback even stronger.)*"
                      value={form.message}
                      onChange={(e) => setField("message", e.target.value)}
                    />
                    {errors.message && <span className={styles.error}>{errors.message}</span>}
                  </label>

                  <div className={styles.actions}>
                    <label className={styles.nda}>
                      <input
                        type="checkbox"
                        name="nda"
                        checked={form.nda}
                        onChange={(e) => setField("nda", e.target.checked)}
                      />
                      <span className={styles.ndaBox} aria-hidden>
                        <Check size={13} strokeWidth={3} />
                      </span>
                      <span className={styles.ndaCopy}>
                        <span className={styles.ndaTitle}>Need an NDA?</span>
                        <span className={styles.ndaSub}>We&apos;re Happy to Sign.</span>
                      </span>
                    </label>

                    <div className={styles.captcha}>
                      <div className={styles.captchaArt} aria-hidden>
                        <span className={styles.captchaCode}>{captcha}</span>
                      </div>
                      <button
                        type="button"
                        className={styles.captchaRefresh}
                        onClick={() => {
                          setCaptcha(makeCaptcha());
                          setField("captchaInput", "");
                        }}
                        aria-label="Refresh captcha"
                      >
                        <RefreshCw size={15} />
                      </button>
                      <label>
                        <span className={styles.srOnly}>Enter captcha</span>
                        <input
                          className={styles.captchaInput}
                          name="captcha"
                          placeholder="Code"
                          autoComplete="off"
                          value={form.captchaInput}
                          onChange={(e) => setField("captchaInput", e.target.value)}
                          aria-invalid={Boolean(errors.captchaInput)}
                        />
                      </label>
                    </div>
                  </div>
                  {errors.captchaInput && <span className={styles.error}>{errors.captchaInput}</span>}

                  <button type="submit" className={styles.submit} disabled={submitting}>
                    <span className={styles.submitInner}>
                      {submitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Sending…
                        </>
                      ) : (
                        "Get a Quote"
                      )}
                    </span>
                  </button>
                </form>
              </section>
            </div>
          )}
        </div>

        <footer className={styles.footer}>
          <svg className={styles.footerVisual} viewBox="0 0 64 64" aria-hidden>
            <path fill="#7ec8ee" d="M8 32 56 8 40 56 28 36z" />
            <path fill="#2f8fd6" d="M28 36 56 8 36 34z" />
            <path fill="#1b6fb3" d="M28 36 40 56 32 38z" />
          </svg>
          <p className={styles.footerCopy}>
            Get a <em>Quick Response</em> From Our Experts.
          </p>
        </footer>
      </motion.div>
    </motion.div>
  );
}
