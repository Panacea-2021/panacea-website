import type { ReactNode } from "react";
import type { ClientTestimonial } from "@/data/clientTestimonials";
import { getTestimonialLogo } from "@/data/clientTestimonials";
import styles from "./QuoteLeadPopup.module.css";

function SvgShell({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg viewBox="0 0 220 52" className={styles.logoSvg} role="img" aria-label={label}>
      {children}
    </svg>
  );
}

function Lockup({
  title,
  subtitle,
  accent,
  icon,
}: {
  title: string;
  subtitle: string;
  accent: string;
  icon: ReactNode;
}) {
  return (
    <SvgShell label={`${title} ${subtitle}`}>
      <rect x="6" y="6" width="40" height="40" rx="12" fill={accent} opacity="0.14" />
      {icon}
      <text x="56" y="23" fill="#12263a" fontSize="13" fontWeight="800">
        {title}
      </text>
      <text x="56" y="39" fill="#64748b" fontSize="9.5" fontWeight="600">
        {subtitle}
      </text>
    </SvgShell>
  );
}

function LogoById({ item }: { item: ClientTestimonial }) {
  switch (item.id) {
    case "evgeny":
      return (
        <Lockup
          title="SIEGEL"
          subtitle="AGENCY"
          accent="#cfa85a"
          icon={
            <>
              <path d="M18 12h20l-3.5 28H21.5z" fill="#cfa85a" />
              <path d="M22 16h12l-2.5 20h-7z" fill="#f3d48a" />
            </>
          }
        />
      );
    case "ilya":
      return (
        <Lockup
          title="HEDGIE"
          subtitle="LEARN ENGLISH"
          accent="#f59e0b"
          icon={
            <>
              <circle cx="26" cy="26" r="13" fill="#f59e0b" />
              <circle cx="22" cy="24" r="1.8" fill="#1a1408" />
              <circle cx="30" cy="24" r="1.8" fill="#1a1408" />
              <path d="M21 31c2.5 3 7.5 3 10 0" stroke="#1a1408" strokeWidth="1.8" fill="none" />
            </>
          }
        />
      );
    case "valery":
      return (
        <Lockup
          title="AI ASSISTANT"
          subtitle="INTELLIGENT PRODUCTS"
          accent="#6366f1"
          icon={
            <>
              <circle cx="26" cy="26" r="12" fill="#818cf8" />
              <path d="M26 18v16M18 26h16" stroke="#fff" strokeWidth="2.2" />
            </>
          }
        />
      );
    case "abdul":
      return (
        <Lockup
          title="COMMERCE"
          subtitle="MOBILE PLATFORM"
          accent="#ef4444"
          icon={
            <>
              <rect x="18" y="12" width="16" height="28" rx="3" fill="#fff" stroke="#ef4444" strokeWidth="2" />
              <rect x="21" y="16" width="10" height="16" rx="1.5" fill="#ef4444" />
            </>
          }
        />
      );
    case "priya":
      return (
        <Lockup
          title="EDTECH"
          subtitle="LEARNING STARTUP"
          accent="#7c3aed"
          icon={<path d="M14 34 26 16 38 34Z" fill="#7c3aed" />}
        />
      );
    case "rajesh":
      return (
        <Lockup
          title="LOGISTICS"
          subtitle="ENTERPRISE TRACKING"
          accent="#14b8a6"
          icon={
            <>
              <rect x="14" y="22" width="24" height="12" rx="2" fill="#14b8a6" />
              <circle cx="20" cy="36" r="3.5" fill="#0f766e" />
              <circle cx="32" cy="36" r="3.5" fill="#0f766e" />
            </>
          }
        />
      );
    case "michael":
      return (
        <Lockup
          title="SAAS"
          subtitle="CLOUD PLATFORM"
          accent="#fb7185"
          icon={
            <>
              <path d="M16 32c5-12 16-12 21 0" fill="none" stroke="#fb7185" strokeWidth="3.4" />
              <circle cx="22" cy="20" r="3.4" fill="#fb7185" />
            </>
          }
        />
      );
    case "sarah":
      return (
        <Lockup
          title="HEALTHTECH"
          subtitle="CARE PLATFORM"
          accent="#06b6d4"
          icon={
            <>
              <rect x="23" y="14" width="6" height="24" rx="1.5" fill="#06b6d4" />
              <rect x="14" y="23" width="24" height="6" rx="1.5" fill="#06b6d4" />
            </>
          }
        />
      );
    case "david":
      return (
        <Lockup
          title="FINSERVE"
          subtitle="FINANCIAL SOLUTIONS"
          accent="#f59e0b"
          icon={
            <>
              <circle cx="26" cy="26" r="13" fill="#f59e0b" />
              <text x="21.5" y="31" fill="#78350f" fontSize="14" fontWeight="800">
                $
              </text>
            </>
          }
        />
      );
    case "ananya":
      return (
        <Lockup
          title="RETAIL GROUP"
          subtitle="COMMERCE BRAND"
          accent="#fb7185"
          icon={<path d="M16 34V24l10-8 10 8v10z" fill="#fb7185" />}
        />
      );
    case "james":
      return (
        <Lockup
          title="ENTERPRISE"
          subtitle="SOFTWARE CO."
          accent="#6366f1"
          icon={
            <>
              <rect x="16" y="16" width="6" height="20" fill="#6366f1" />
              <rect x="24" y="20" width="6" height="16" fill="#818cf8" />
              <rect x="32" y="14" width="6" height="22" fill="#4f46e5" />
            </>
          }
        />
      );
    case "lisa":
      return (
        <Lockup
          title="CREATOR APP"
          subtitle="ECONOMY PLATFORM"
          accent="#a855f7"
          icon={<polygon points="18,16 38,26 18,36" fill="#a855f7" />}
        />
      );
    default:
      return (
        <Lockup
          title={item.company.replace(/:.*$/, "").toUpperCase()}
          subtitle={item.role}
          accent="#38bdf8"
          icon={<circle cx="26" cy="26" r="12" fill="#38bdf8" />}
        />
      );
  }
}

export default function QuoteCompanyLogo({ item }: { item: ClientTestimonial }) {
  const fileLogo = getTestimonialLogo(item);

  return (
    <div className={styles.logoPlate}>
      {fileLogo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={fileLogo.src} alt={fileLogo.alt} className={styles.logoImg} />
      ) : (
        <LogoById item={item} />
      )}
    </div>
  );
}
