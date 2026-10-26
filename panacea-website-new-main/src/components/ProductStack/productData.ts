export type ProductTheme =
  | "childcare"
  | "influencer"
  | "funds"
  | "stocks"
  | "customize";

export type SupportingVisual = {
  src: string;
  alt: string;
};

export type ProductItem = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
  meshGradient: string;
  blobColors: [string, string];
  imageUrl: string;
  imageAlt: string;
  imageGlow: string;
  theme: ProductTheme;
  supportingImages: SupportingVisual[];
  ctaLabel?: string;
  ctaHref?: string;
  category: string;
  features: string[];
  storyLine: string;
};

export const products: ProductItem[] = [
  {
    id: "child-care",
    title: "Child Care Management",
    subtitle: "Built to grow from 10 classrooms to 10,000 enrolled families",
    description:
      "An intuitive digital platform that connects parents, children, and caregivers. From attendance and activity updates to communication and progress tracking, it keeps families close and gives childcare teams one place to run the day.",
    gradient: "from-[#0066ff] via-[#00b4d8] to-[#0077b6]",
    meshGradient:
      "linear-gradient(135deg, rgba(0,102,255,0.4) 0%, rgba(0,180,216,0.2) 50%, rgba(0,119,182,0.35) 100%)",
    blobColors: ["rgba(0,212,255,0.45)", "rgba(56,189,248,0.3)"],
    imageUrl:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Children participating in a preschool classroom activity",
    imageGlow: "rgba(0,212,255,0.55)",
    theme: "childcare",
    supportingImages: [
      {
        src: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?auto=format&fit=crop&w=640&q=80",
        alt: "Parent staying connected with their child through the platform",
      },
      {
        src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=640&q=80",
        alt: "Teacher guiding a classroom activity",
      },
    ],
    ctaLabel: "Explore product",
    ctaHref: "/products/child-care",
    category: "Childcare Platform",
    features: ["Parent App", "Activity Tracking", "Smart Notifications", "Progress Updates"],
    storyLine: "Built around real client needs. Designed for everyday impact.",
  },
  {
    id: "influencer",
    title: "Influencer App",
    subtitle: "Connect brands with creators at any campaign scale",
    description:
      "A campaign marketplace for brands and creators who need more than spreadsheets. Match the right voices, run live campaigns, and read performance as it happens.",
    gradient: "from-[#7c3aed] via-[#9333ea] to-[#4338ca]",
    meshGradient:
      "linear-gradient(135deg, rgba(124,58,237,0.45) 0%, rgba(147,51,234,0.25) 50%, rgba(67,56,202,0.35) 100%)",
    blobColors: ["rgba(192,132,252,0.4)", "rgba(129,140,248,0.28)"],
    imageUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Creator reviewing live campaign performance",
    imageGlow: "rgba(192,132,252,0.5)",
    theme: "influencer",
    supportingImages: [
      {
        src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=640&q=80",
        alt: "Brand and creator collaboration session",
      },
      {
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=640&q=80",
        alt: "Campaign analytics dashboard",
      },
    ],
    ctaLabel: "Explore product",
    ctaHref: "/products",
    category: "Creator Marketplace",
    features: ["Creator Matching", "Live Campaigns", "Performance Analytics", "Brand Fit"],
    storyLine: "Designed from real-world requirements.",
  },
  {
    id: "mutual-funds",
    title: "Mutual Funds",
    subtitle: "Portfolio intelligence that scales with every investor",
    description:
      "A secure investment workspace for advisors and investors who need clarity at every SIP and allocation — live portfolios, expert insight, and a single place to grow with confidence.",
    gradient: "from-[#ec4899] via-[#d946ef] to-[#8b5cf6]",
    meshGradient:
      "linear-gradient(135deg, rgba(236,72,153,0.4) 0%, rgba(217,70,239,0.22) 50%, rgba(139,92,246,0.32) 100%)",
    blobColors: ["rgba(244,114,182,0.38)", "rgba(168,85,247,0.25)"],
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Wealth advisor reviewing a live mutual fund portfolio dashboard",
    imageGlow: "rgba(244,114,182,0.48)",
    theme: "funds",
    supportingImages: [
      {
        src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=640&q=80",
        alt: "Investor reviewing long-term fund allocation",
      },
      {
        src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=640&q=80",
        alt: "Advisor planning a client portfolio",
      },
    ],
    ctaLabel: "Explore product",
    ctaHref: "/products",
    category: "Wealth Platform",
    features: ["Portfolio Tracking", "SIP Management", "Live Insights", "Secure Access"],
    storyLine: "Built around the challenges our clients face every day.",
  },
  {
    id: "stocks",
    title: "Stocks App",
    subtitle: "Live markets, institutional-grade charts, retail-ready UX",
    description:
      "Institutional-grade trading for high-volume sessions, without overwhelming everyday investors. Live markets, technical charts, and secure execution in a retail-ready interface.",
    gradient: "from-[#0d9488] via-[#06b6d4] to-[#0284c7]",
    meshGradient:
      "linear-gradient(135deg, rgba(13,148,136,0.4) 0%, rgba(6,182,212,0.22) 50%, rgba(2,132,199,0.32) 100%)",
    blobColors: ["rgba(45,212,191,0.35)", "rgba(34,211,238,0.22)"],
    imageUrl:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Live stock market charts and trading data on a desktop display",
    imageGlow: "rgba(45,212,191,0.45)",
    theme: "stocks",
    supportingImages: [
      {
        src: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=640&q=80",
        alt: "Mobile portfolio watchlist during live trading",
      },
      {
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=640&q=80",
        alt: "Market overview dashboard with performance cards",
      },
    ],
    ctaLabel: "Explore product",
    ctaHref: "/products",
    category: "Trading Platform",
    features: ["Live Markets", "Technical Charts", "Watchlists", "Secure Trades"],
    storyLine: "Designed from real-world requirements.",
  },
  {
    id: "omr",
    title: "OMR Customization",
    subtitle: "High-precision scanning from hundreds to millions of sheets",
    description:
      "Optical mark recognition for institutions that cannot afford guesswork. Custom templates, automated grading, and audit-ready accuracy from hundreds of sheets to millions.",
    gradient: "from-[#f97316] via-[#fb923c] to-[#ea580c]",
    meshGradient:
      "linear-gradient(135deg, rgba(249,115,22,0.42) 0%, rgba(251,146,60,0.24) 50%, rgba(234,88,12,0.32) 100%)",
    blobColors: ["rgba(251,191,36,0.35)", "rgba(249,115,22,0.28)"],
    imageUrl: "/omr-customization.webp",
    imageAlt: "OMR customization worksheet and assessment system",
    imageGlow: "rgba(251,191,36,0.42)",
    theme: "customize",
    supportingImages: [
      {
        src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=640&q=80",
        alt: "Student filling a standardized assessment sheet",
      },
      {
        src: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=640&q=80",
        alt: "Custom OMR form and document setup",
      },
    ],
    ctaLabel: "Explore product",
    ctaHref: "/products",
    category: "Assessment Systems",
    features: ["Custom Templates", "High-volume Scan", "Auto Grading", "Audit Trail"],
    storyLine: "Built around real client needs.",
  },
];
