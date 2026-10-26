export type BlogStatus = "published" | "draft";

export type BlogSection = {
  id: string;
  topic: string;
  content: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  focusKeywords: string[];
  tags: string[];
  bodyHtml: string;
  backgroundImage: string;
  sections: BlogSection[];
  publishedAt: string;
  lastSavedAt: string;
  status: BlogStatus;
  category: string;
  language: string;
  readTime: string;
  isMainBlog: boolean;
  youtubeVideoUrl: string;
  slugManuallyEdited: boolean;
};

export const BLOG_CATEGORIES = [
  "Technology",
  "Web Development",
  "Mobile Apps",
  "UI/UX",
  "Digital Marketing",
  "Case Studies",
  "Company News",
] as const;

export const BLOG_LANGUAGES = ["English", "Hindi", "Telugu"] as const;

export const BLOG_READ_TIMES = [
  "3 min read",
  "5 min read",
  "7 min read",
  "8 min read",
  "10 min read",
  "12 min read",
  "15 min read",
] as const;

export const BLOG_TAG_SUGGESTIONS = [
  "React",
  "Next.js",
  "Mobile",
  "Cloud",
  "AI",
  "UI/UX",
  "SEO",
  "DevOps",
  "Startup",
  "Enterprise",
];
