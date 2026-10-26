import type { LucideIcon } from "lucide-react";
import {
  Globe,
  Megaphone,
  PenTool,
  ShieldCheck,
  Server,
  Boxes,
} from "lucide-react";
import type { ComponentType } from "react";

export type OfferingIcon = ComponentType<{ size?: number; className?: string }>;

export type OfferingItem = {
  id: string;
  title: string;
  Icon: OfferingIcon;
  /** Slide-in origin for staggered 3D entrance */
  from: { x: number; y: number; rotateX: number; rotateY: number };
  floatDelay: string;
};

function AndroidIcon({ size = 26, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M8 4 6.2 7.2" />
      <path d="m16 4 1.8 3.2" />
      <rect x="7" y="8" width="10" height="9.5" rx="2.2" />
      <path d="M5.5 11.5v4.2a1.2 1.2 0 0 0 2.4 0v-4.2" />
      <path d="M16.1 11.5v4.2a1.2 1.2 0 0 0 2.4 0v-4.2" />
      <path d="M10 17.5v2.8" />
      <path d="M14 17.5v2.8" />
    </svg>
  );
}

function AppleIcon({ size = 26, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M12 6.2c.6-1.6 2-2.7 3.6-2.8" />
      <path d="M16.4 8.2c1.9 1.1 2.9 3.3 2.4 5.5-.6 2.6-2.7 4.3-4.4 4.3-1 0-1.5-.6-2.8-.6s-1.8.6-2.7.6c-1.7 0-3.6-1.8-4.3-4.4-.8-2.9.4-6 2.6-7.1 1.2-.6 2.6-.3 3.6.4.8.6 1.5.6 2.3.3 1-.4 2-.3 3.3 1" />
    </svg>
  );
}

const lucide = (Icon: LucideIcon): OfferingIcon => Icon;

export const offerings: OfferingItem[] = [
  {
    id: "website",
    title: "Website",
    Icon: lucide(Globe),
    from: { x: -88, y: 36, rotateX: 18, rotateY: -38 },
    floatDelay: "0s",
  },
  {
    id: "android",
    title: "Android",
    Icon: AndroidIcon,
    from: { x: 12, y: -76, rotateX: -22, rotateY: 16 },
    floatDelay: "0.35s",
  },
  {
    id: "ios",
    title: "iOS",
    Icon: AppleIcon,
    from: { x: 92, y: 28, rotateX: 16, rotateY: 36 },
    floatDelay: "0.7s",
  },
  {
    id: "marketing",
    title: "Marketing",
    Icon: lucide(Megaphone),
    from: { x: 48, y: 86, rotateX: 28, rotateY: 12 },
    floatDelay: "1.05s",
  },
  {
    id: "uiux",
    title: "UI/UX",
    Icon: lucide(PenTool),
    from: { x: -72, y: 54, rotateX: 12, rotateY: -26 },
    floatDelay: "0.2s",
  },
  {
    id: "security",
    title: "Security",
    Icon: lucide(ShieldCheck),
    from: { x: 74, y: -42, rotateX: -14, rotateY: 30 },
    floatDelay: "0.55s",
  },
  {
    id: "backend",
    title: "Backend",
    Icon: lucide(Server),
    from: { x: -44, y: 92, rotateX: 26, rotateY: -14 },
    floatDelay: "0.9s",
  },
  {
    id: "devops",
    title: "Dev Ops",
    Icon: lucide(Boxes),
    from: { x: 56, y: 68, rotateX: 20, rotateY: 22 },
    floatDelay: "1.2s",
  },
];
