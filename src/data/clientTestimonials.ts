export type ClientTestimonial = {
  id: string;
  type: "video" | "text";
  name: string;
  role: string;
  company: string;
  quote: string;
  initials: string;
  avatarGradient: string;
  thumbnail?: string;
  videoUrl?: string;
  videoDuration?: string;
  gender?: "male" | "female";
  verified?: boolean;
  rating?: number;
  trustLabel?: string;
  logoSrc?: string;
  logoAlt?: string;
  location?: string;
};

const COMPANY_LOGO_MAP: Record<string, { src: string; alt: string }> = {
  "sriram's ias": { src: "/brands/srirams-ias.png", alt: "Sriram's IAS" },
  "srirams ias": { src: "/brands/srirams-ias.png", alt: "Sriram's IAS" },
  "sriram ias": { src: "/brands/srirams-ias.png", alt: "Sriram's IAS" },
  anynews: { src: "/brands/anynews.png", alt: "AnyNews" },
  "all time storage": { src: "/brands/all-time-storage.png", alt: "All Time Storage" },
};

export type TestimonialLogo = {
  src: string;
  alt: string;
};

/** Resolve the company mark that belongs to this review — never a random logo. */
export function getTestimonialLogo(item: ClientTestimonial): TestimonialLogo | null {
  if (item.logoSrc) {
    return { src: item.logoSrc, alt: item.logoAlt || item.company };
  }
  const key = item.company.toLowerCase().replace(/[:]/g, "").trim();
  return COMPANY_LOGO_MAP[key] ?? null;
}

export const CLIENT_TESTIMONIALS: ClientTestimonial[] = [
  {
    id: "evgeny",
    type: "video",
    name: "Evgeny",
    role: "CEO",
    company: "Siegel Agency",
    quote:
      "Everything was delivered fast, done well and done in full. Talking to the team was easy and straightforward.",
    initials: "EV",
    avatarGradient: "linear-gradient(135deg, #cfa85a 0%, #8b6914 100%)",
    thumbnail: "/aboutus.webp",
    videoUrl: "/Hero.mp4",
    videoDuration: "2:14",
    gender: "male",
    verified: true,
    rating: 5,
    trustLabel: "Verified Client",
  },
  {
    id: "ilya",
    type: "text",
    name: "Ilya",
    role: "Founder",
    company: "Hedgie: Learn English Grammar",
    quote:
      "The team helped turn the Hedgie idea into a clear and engaging product that makes learning grammar easier and more enjoyable.",
    initials: "IL",
    avatarGradient: "linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)",
    verified: true,
    rating: 5,
    trustLabel: "Project Delivered Successfully",
  },
  {
    id: "valery",
    type: "text",
    name: "Valery",
    role: "Founder",
    company: "AI Assistant",
    quote:
      "The team proposed a solution that met the goals of the first release while leaving room to grow the product and add new AI capabilities.",
    initials: "VA",
    avatarGradient: "linear-gradient(135deg, #818cf8 0%, #4f46e5 100%)",
    verified: true,
    rating: 5,
    trustLabel: "Verified Client",
  },
  {
    id: "abdul",
    type: "text",
    name: "Abdul Hameed",
    role: "Product Owner",
    company: "Mobile Commerce Platform",
    quote:
      "Panacea delivered our mobile app with excellent quality and support. The team understood our requirements quickly and stayed responsive throughout.",
    initials: "AH",
    avatarGradient: "linear-gradient(135deg, #FF0808 0%, #99030D 100%)",
    rating: 5,
    trustLabel: "5.0 Client Rating",
  },
  {
    id: "priya",
    type: "video",
    name: "Priya Sharma",
    role: "Director of Product",
    company: "EdTech Startup",
    quote:
      "Outstanding experience from design to deployment. The UI/UX was polished, communication was clear, and the final product exceeded expectations.",
    initials: "PS",
    avatarGradient: "linear-gradient(135deg, #9C27B0 0%, #4A148C 100%)",
    thumbnail: "/education.png",
    videoUrl: "/Hero.mp4",
    videoDuration: "1:48",
    gender: "female",
    verified: true,
    rating: 5,
    trustLabel: "Verified Client",
  },
  {
    id: "rajesh",
    type: "text",
    name: "Rajesh Kumar",
    role: "Operations Head",
    company: "Logistics Enterprise",
    quote:
      "They built a scalable tracking solution for our logistics operations. Reliable delivery, strong technical skills, and great post-launch support.",
    initials: "RK",
    avatarGradient: "linear-gradient(135deg, #00897B 0%, #004D40 100%)",
    rating: 5,
    trustLabel: "Enterprise Client",
  },
  {
    id: "michael",
    type: "text",
    name: "Michael Torres",
    role: "CTO",
    company: "SaaS Platform",
    quote:
      "From discovery to go-live, Panacea was thorough and transparent. The web application performance is excellent and their support team is always available.",
    initials: "MT",
    avatarGradient: "linear-gradient(135deg, #E91E63 0%, #880E4F 100%)",
    verified: true,
    rating: 5,
    trustLabel: "Project Delivered Successfully",
  },
  {
    id: "sarah",
    type: "text",
    name: "Sarah Chen",
    role: "Founder",
    company: "HealthTech Startup",
    quote:
      "They translated a complex healthcare workflow into a intuitive product. Security, compliance, and speed were handled with real expertise.",
    initials: "SC",
    avatarGradient: "linear-gradient(135deg, #06b6d4 0%, #0e7490 100%)",
    verified: true,
    rating: 5,
    trustLabel: "Verified Client",
  },
  {
    id: "david",
    type: "video",
    name: "David Okonkwo",
    role: "CEO",
    company: "FinServe Solutions",
    quote:
      "Our fintech platform launched ahead of schedule with rock-solid architecture. Panacea felt like an extension of our own engineering team.",
    initials: "DO",
    avatarGradient: "linear-gradient(135deg, #f59e0b 0%, #b45309 100%)",
    thumbnail: "/business_solution.png",
    videoUrl: "/Hero.mp4",
    videoDuration: "2:32",
    gender: "male",
    verified: true,
    rating: 5,
    trustLabel: "Enterprise Client",
  },
  {
    id: "ananya",
    type: "text",
    name: "Ananya Patel",
    role: "Head of Digital",
    company: "Retail Group",
    quote:
      "The e-commerce rebuild improved conversion and page speed dramatically. Clear milestones, zero drama, and a team that genuinely cares about outcomes.",
    initials: "AP",
    avatarGradient: "linear-gradient(135deg, #fb7185 0%, #be185d 100%)",
    rating: 5,
    trustLabel: "5.0 Client Rating",
  },
  {
    id: "james",
    type: "text",
    name: "James Wilson",
    role: "VP Engineering",
    company: "Enterprise Software Co.",
    quote:
      "We needed a partner who could scale with us. Panacea delivered cloud-native infrastructure and a codebase our internal team was proud to inherit.",
    initials: "JW",
    avatarGradient: "linear-gradient(135deg, #6366f1 0%, #312e81 100%)",
    verified: true,
    rating: 5,
    trustLabel: "Enterprise Client",
  },
  {
    id: "lisa",
    type: "text",
    name: "Lisa Fernandez",
    role: "Founder",
    company: "Creator Economy App",
    quote:
      "They brought product thinking, not just code. Every sprint moved us closer to a launch-ready MVP that users actually wanted to use.",
    initials: "LF",
    avatarGradient: "linear-gradient(135deg, #a855f7 0%, #6b21a8 100%)",
    verified: true,
    rating: 5,
    trustLabel: "Verified Client",
  },
];

export const CLIENT_LOGOS = [
  { src: "/brands/srirams-ias-white.png", alt: "Sriram's IAS" },
  { src: "/brands/all-time-storage.png", alt: "All Time Storage" },
  { src: "/brands/anynews.png", alt: "AnyNews" },
  { src: "/bar1.png", alt: "Client partner" },
  { src: "/bar2.png", alt: "Client partner" },
  { src: "/bar3.png", alt: "Client partner" },
] as const;
