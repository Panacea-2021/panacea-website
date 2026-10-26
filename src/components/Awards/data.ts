export const AWARDS = [
  {
    id: 4,
    year: 2021,
    title: "Creative Design Award",
    category: "Creativity",
    highlight: "Brand recall up 28%",
    description:
      "Honored for a campaign identity that increased brand recall by 28% and set a new creative benchmark for the category.",
    visual: "/influencer-app.webp",
    visualAlt: "Influencer app design project",
  },
  {
    id: 3,
    year: 2022,
    title: "Design Mastery Award",
    category: "Craftsmanship",
    highlight: "Pixel-perfect at enterprise scale",
    description:
      "Recognized for pixel-perfect execution across web, mobile, and brand collateral on enterprise-scale engagements.",
    visual: "/childcaremanage.webp",
    visualAlt: "Child care management app design project",
  },
  {
    id: 2,
    year: 2023,
    title: "Design Excellence Award",
    category: "Design",
    highlight: "Adopted across 12 products",
    description:
      "Delivered a multi-platform design system adopted across 12 client products, improving consistency and delivery speed.",
    visual: "/stocks-app.webp",
    visualAlt: "Stocks app design project",
  },
  {
    id: 1,
    year: 2024,
    title: "Innovative Design Award",
    category: "Innovation",
    highlight: "Onboarding time cut 40%",
    description:
      "Led a product redesign that cut user onboarding time by 40% and earned industry recognition for pushing UX boundaries.",
    visual: "/mutual-funds.webp",
    visualAlt: "Mutual funds app design project",
  },
] as const;

export type Award = (typeof AWARDS)[number];

export const EASE = [0.22, 1, 0.36, 1] as const;

export const AUTO_MS = 4000;

export const PARTICLES = [
  { left: "8%", top: "72%", size: 3, dur: 16, delay: 0, tone: "gold" },
  { left: "18%", top: "58%", size: 2.2, dur: 20, delay: 2.1, tone: "silver" },
  { left: "29%", top: "84%", size: 2.8, dur: 18, delay: 1.2, tone: "gold" },
  { left: "41%", top: "66%", size: 1.8, dur: 14, delay: 3.4, tone: "white" },
  { left: "54%", top: "78%", size: 3.2, dur: 22, delay: 0.6, tone: "gold" },
  { left: "67%", top: "62%", size: 2.4, dur: 17, delay: 2.8, tone: "silver" },
  { left: "78%", top: "80%", size: 2, dur: 19, delay: 1.5, tone: "gold" },
  { left: "89%", top: "54%", size: 2.6, dur: 21, delay: 0.3, tone: "white" },
  { left: "12%", top: "28%", size: 2, dur: 23, delay: 4.2, tone: "silver" },
  { left: "86%", top: "22%", size: 2.4, dur: 18, delay: 1.8, tone: "gold" },
  { left: "48%", top: "18%", size: 1.8, dur: 24, delay: 3.1, tone: "white" },
  { left: "63%", top: "34%", size: 2.2, dur: 15, delay: 2.4, tone: "gold" },
] as const;
