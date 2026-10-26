import type { BlogPost, BlogSection, BlogStatus } from "./types";
import { sanitizeBlogHtml } from "@/lib/sanitizeHtml";

const STORAGE_KEY = "panacea_blogs_v1";

function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

function uid(prefix = "b") {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

export function slugifyTitle(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function createEmptySection(blogId?: string): BlogSection {
  return {
    id: uid(blogId ? `${blogId}_s` : "s"),
    topic: "",
    content: "",
  };
}

export function createEmptyBlog(): BlogPost {
  const id = uid("blog");
  const now = new Date().toISOString();
  return {
    id,
    title: "",
    slug: "",
    metaTitle: "",
    metaDescription: "",
    focusKeywords: [],
    tags: [],
    bodyHtml: "",
    backgroundImage: "",
    sections: [createEmptySection(id)],
    publishedAt: now,
    lastSavedAt: now,
    status: "draft",
    category: "Technology",
    language: "English",
    readTime: "5 min read",
    isMainBlog: false,
    youtubeVideoUrl: "",
    slugManuallyEdited: false,
  };
}

const SEED: BlogPost[] = [
  {
    id: "blog_1",
    title: "How Panacea Builds Scalable Web Platforms",
    slug: "how-panacea-builds-scalable-web-platforms",
    metaTitle: "How Panacea Builds Scalable Web Platforms",
    metaDescription:
      "A practical look at how our engineering team designs, builds, and ships scalable web platforms for growing businesses.",
    focusKeywords: ["web development", "scalable platforms"],
    tags: ["Next.js", "Enterprise", "Cloud"],
    bodyHtml:
      "<p>Modern businesses need platforms that grow with them. At Panacea, we combine solid architecture with clean UX to deliver products that perform under real-world load.</p>",
    backgroundImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    sections: [
      {
        id: "blog_1_s1",
        topic: "Architecture First",
        content:
          "<p>We start with clear domain boundaries, API contracts, and performance budgets before writing feature code.</p>",
      },
      {
        id: "blog_1_s2",
        topic: "Delivery & Support",
        content:
          "<p>Every release includes monitoring, documentation, and a support plan so your team stays confident after launch.</p>",
      },
    ],
    publishedAt: daysAgo(1),
    lastSavedAt: daysAgo(1),
    status: "published",
    category: "Web Development",
    language: "English",
    readTime: "8 min read",
    isMainBlog: true,
    youtubeVideoUrl: "",
    slugManuallyEdited: true,
  },
  {
    id: "blog_2",
    title: "Mobile App UX Patterns That Drive Retention",
    slug: "mobile-app-ux-patterns-that-drive-retention",
    metaTitle: "Mobile App UX Patterns That Drive Retention",
    metaDescription:
      "UX patterns we use in production apps to improve onboarding, engagement, and long-term retention.",
    focusKeywords: ["mobile ux", "app retention"],
    tags: ["Mobile", "UI/UX"],
    bodyHtml:
      "<p>Retention is rarely a single feature — it is a sequence of thoughtful moments across the user journey.</p>",
    backgroundImage:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80",
    sections: [
      {
        id: "blog_2_s1",
        topic: "Onboarding That Respects Time",
        content:
          "<p>Short progressive disclosure beats long tutorials. Show value in the first session.</p>",
      },
    ],
    publishedAt: daysAgo(3),
    lastSavedAt: daysAgo(3),
    status: "published",
    category: "Mobile Apps",
    language: "English",
    readTime: "6 min read",
    isMainBlog: false,
    youtubeVideoUrl: "",
    slugManuallyEdited: true,
  },
  {
    id: "blog_3",
    title: "AI Features Businesses Can Ship This Quarter",
    slug: "ai-features-businesses-can-ship-this-quarter",
    metaTitle: "AI Features Businesses Can Ship This Quarter",
    metaDescription:
      "Practical AI use-cases that deliver ROI without months of research — chat assistants, document intelligence, and automation.",
    focusKeywords: ["ai features", "business automation"],
    tags: ["AI", "Startup"],
    bodyHtml:
      "<p>You do not need a research lab to benefit from AI. Focused workflows often create the fastest wins.</p>",
    backgroundImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80",
    sections: [
      {
        id: "blog_3_s1",
        topic: "Start With One Workflow",
        content:
          "<p>Pick a repetitive process — support triage, lead scoring, or content drafting — and automate it end to end.</p>",
      },
    ],
    publishedAt: daysAgo(5),
    lastSavedAt: daysAgo(5),
    status: "published",
    category: "Technology",
    language: "English",
    readTime: "7 min read",
    isMainBlog: false,
    youtubeVideoUrl: "",
    slugManuallyEdited: true,
  },
  {
    id: "blog_4",
    title: "Case Study: School Management Platform Launch",
    slug: "case-study-school-management-platform-launch",
    metaTitle: "Case Study: School Management Platform Launch",
    metaDescription:
      "How we designed and launched a school management platform covering attendance, parents, and admin workflows.",
    focusKeywords: ["case study", "school management"],
    tags: ["Case Studies", "Enterprise"],
    bodyHtml:
      "<p>From discovery workshops to go-live, this project shows how product clarity beats feature overload.</p>",
    backgroundImage:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80",
    sections: [
      {
        id: "blog_4_s1",
        topic: "Challenge",
        content:
          "<p>The school needed one system for staff, parents, and students without training fatigue.</p>",
      },
      {
        id: "blog_4_s2",
        topic: "Outcome",
        content:
          "<p>Adoption jumped in the first month because core tasks were three taps or less.</p>",
      },
    ],
    publishedAt: daysAgo(8),
    lastSavedAt: daysAgo(8),
    status: "published",
    category: "Case Studies",
    language: "English",
    readTime: "10 min read",
    isMainBlog: false,
    youtubeVideoUrl: "",
    slugManuallyEdited: true,
  },
  {
    id: "blog_5",
    title: "SEO Checklist for New Product Websites",
    slug: "seo-checklist-for-new-product-websites",
    metaTitle: "SEO Checklist for New Product Websites",
    metaDescription:
      "A practical SEO checklist we run before every product website launch.",
    focusKeywords: ["seo checklist", "product website"],
    tags: ["SEO", "Digital Marketing"],
    bodyHtml:
      "<p>Technical SEO and content structure should be ready before marketing spend starts.</p>",
    backgroundImage:
      "https://images.unsplash.com/photo-1432888498266-38ffec0b36c6?w=1200&q=80",
    sections: [
      {
        id: "blog_5_s1",
        topic: "Launch Checklist",
        content:
          "<p>Titles, meta descriptions, sitemap, Core Web Vitals, and crawlable IA — all verified before go-live.</p>",
      },
    ],
    publishedAt: daysAgo(12),
    lastSavedAt: daysAgo(12),
    status: "draft",
    category: "Digital Marketing",
    language: "English",
    readTime: "5 min read",
    isMainBlog: false,
    youtubeVideoUrl: "",
    slugManuallyEdited: true,
  },
];

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function loadBlogs(): BlogPost[] {
  if (!canUseStorage()) return SEED.map((b) => ({ ...b, sections: b.sections.map((s) => ({ ...s })) }));
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED));
      return SEED.map((b) => ({ ...b, sections: b.sections.map((s) => ({ ...s })) }));
    }
    const parsed = JSON.parse(raw) as BlogPost[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED));
      return SEED.map((b) => ({ ...b, sections: b.sections.map((s) => ({ ...s })) }));
    }
    return parsed;
  } catch {
    return SEED.map((b) => ({ ...b, sections: b.sections.map((s) => ({ ...s })) }));
  }
}

export function saveBlogs(blogs: BlogPost[]) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
}

export function getPublishedBlogs() {
  return loadBlogs()
    .filter((b) => b.status === "published")
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
}

export function getBlogBySlug(slug: string) {
  return loadBlogs().find((b) => b.slug === slug) ?? null;
}

export function upsertBlog(blog: BlogPost) {
  const blogs = loadBlogs();
  const idx = blogs.findIndex((b) => b.id === blog.id);
  const next = {
    ...blog,
    bodyHtml: sanitizeBlogHtml(blog.bodyHtml),
    sections: blog.sections.map((s) => ({
      ...s,
      content: sanitizeBlogHtml(s.content),
    })),
    lastSavedAt: new Date().toISOString(),
  };
  if (idx >= 0) blogs[idx] = next;
  else blogs.unshift(next);
  if (next.isMainBlog) {
    for (const b of blogs) {
      if (b.id !== next.id) b.isMainBlog = false;
    }
  }
  saveBlogs(blogs);
  return next;
}

export function deleteBlog(id: string) {
  saveBlogs(loadBlogs().filter((b) => b.id !== id));
}

export function setBlogStatus(id: string, status: BlogStatus) {
  const blogs = loadBlogs();
  const target = blogs.find((b) => b.id === id);
  if (!target) return null;
  target.status = status;
  target.lastSavedAt = new Date().toISOString();
  saveBlogs(blogs);
  return target;
}

export function setMainBlog(id: string, isMain: boolean) {
  const blogs = loadBlogs();
  for (const b of blogs) {
    b.isMainBlog = isMain && b.id === id;
  }
  saveBlogs(blogs);
  return blogs.find((b) => b.id === id) ?? null;
}

export function formatBlogDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export function formatBlogTime(iso: string) {
  try {
    return new Date(iso).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

export function excerptFromBlog(blog: BlogPost, max = 160) {
  const raw =
    blog.metaDescription ||
    blog.bodyHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (raw.length <= max) return raw;
  return `${raw.slice(0, max).trim()}…`;
}
