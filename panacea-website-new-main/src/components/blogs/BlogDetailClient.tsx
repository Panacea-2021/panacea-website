"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock3 } from "lucide-react";
import { formatBlogDate, formatBlogTime, getBlogBySlug } from "@/lib/blogs/store";
import type { BlogPost } from "@/lib/blogs/types";
import { sanitizeBlogHtml } from "@/lib/sanitizeHtml";

export default function BlogDetailClient({ slug }: { slug: string }) {
  const [blog, setBlog] = useState<BlogPost | null | undefined>(undefined);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    setBlog(getBlogBySlug(slug));
  }, [slug]);

  const sections = useMemo(() => blog?.sections?.filter((s) => s.topic.trim()) ?? [], [blog]);

  useEffect(() => {
    if (!sections.length) return;
    setActiveId(sections[0].id);
  }, [sections]);

  if (blog === undefined) {
    return (
      <div className="min-h-screen bg-[#f7f7f7] pt-[140px] pb-20">
        <div className="mx-auto max-w-6xl px-6 animate-pulse space-y-6">
          <div className="h-12 w-2/3 rounded bg-slate-200" />
          <div className="h-[360px] rounded-[10px] bg-slate-200" />
        </div>
      </div>
    );
  }

  if (!blog || blog.status !== "published") {
    return (
      <div className="min-h-screen bg-[#f7f7f7] pt-[140px] pb-20 text-center">
        <h1 className="text-2xl font-bold text-slate-800">Blog not found</h1>
        <Link href="/blog" className="mt-4 inline-flex text-[#148ED1] font-semibold">
          ← Back to blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] pt-[120px] pb-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_280px]">
        <article>
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#148ED1]"
          >
            <ArrowLeft size={16} /> All blogs
          </Link>

          <h1 className="mb-6 text-[32px] font-black leading-[1.15] sm:text-[44px] xl:text-[48px]">
            <span className="bg-gradient-to-r from-[#3099DD] via-[#8B85AA] to-[#D06D7A] bg-clip-text text-transparent">
              {blog.title}
            </span>
          </h1>

          <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px] font-semibold text-[#666] sm:text-[16px]">
            <span>{blog.category}</span>
            <span>|</span>
            <span>{blog.language}</span>
            <span>|</span>
            <span>{formatBlogDate(blog.publishedAt)}</span>
            <span>{formatBlogTime(blog.publishedAt)}</span>
            <span className="flex items-center gap-2">
              <Clock3 size={18} /> Read Time : {blog.readTime}
            </span>
          </div>

          {blog.tags.length > 0 ? (
            <div className="mb-8 flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#eef6fc] px-3 py-1 text-sm font-semibold text-[#246392]"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          <div className="relative mb-10 h-[280px] w-full overflow-hidden rounded-[10px] sm:h-[380px] md:h-[440px]">
            {blog.backgroundImage ? (
              <Image
                src={blog.backgroundImage}
                alt={blog.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width:1280px) 100vw, 900px"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#0B4F8A] to-[#00adef]" />
            )}
          </div>

          {blog.bodyHtml ? (
            <div
              className="prose prose-slate mb-10 max-w-none text-[15px] leading-relaxed text-[#3c4043]"
              dangerouslySetInnerHTML={{ __html: sanitizeBlogHtml(blog.bodyHtml) }}
            />
          ) : null}

          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="mb-3 text-xl font-bold text-[#1a1a1a]">{section.topic}</h2>
                <div
                  className="text-[15px] leading-relaxed text-[#3c4043]"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeBlogHtml(section.content || "<p></p>"),
                  }}
                />
              </section>
            ))}
          </div>
        </article>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="mb-3 text-sm font-bold uppercase tracking-wide text-[#246392]">
              Table of Contents
            </p>
            {sections.length === 0 ? (
              <p className="text-sm text-slate-500">No sections</p>
            ) : (
              <nav className="flex flex-col gap-2">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={() => setActiveId(s.id)}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                      activeId === s.id
                        ? "bg-[#eef6fc] text-[#148ED1]"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {s.topic}
                  </a>
                ))}
              </nav>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
