"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getPublishedBlogs } from "@/lib/blogs/store";
import type { BlogPost } from "@/lib/blogs/types";
import { BlogGridCard, FeaturedBlogCard } from "./BlogCards";

export default function BlogListingClient() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    setBlogs(getPublishedBlogs());
  }, []);

  const categories = useMemo(() => {
    const set = new Set(blogs.map((b) => b.category));
    return ["all", ...Array.from(set)];
  }, [blogs]);

  const featured = blogs.find((b) => b.isMainBlog) ?? blogs[0] ?? null;
  const rest = blogs.filter((b) => b.id !== featured?.id);
  const filtered =
    category === "all" ? rest : blogs.filter((b) => b.category === category);

  return (
    <div className="min-h-screen bg-[#f7f7f7] pt-[120px] pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.28em] text-[#00adef]">
              Insights
            </p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1a1a1a] sm:text-4xl md:text-5xl">
              <span className="bg-gradient-to-r from-[#3099DD] via-[#8B85AA] to-[#D06D7A] bg-clip-text text-transparent">
                Our Blogs
              </span>
            </h1>
            <p className="mt-3 max-w-xl text-[15px] text-[#5b6470]">
              Product thinking, engineering notes, and case studies from the Panacea team.
            </p>
          </div>
          <Link
            href="/admin/blogs"
            className="rounded-full border border-[#159DE2] bg-white px-5 py-2 text-sm font-semibold text-[#148ED1] hover:bg-[#148ED1] hover:text-white transition-colors"
          >
            Admin Panel
          </Link>
        </div>

        {category === "all" && featured ? <FeaturedBlogCard blog={featured} /> : null}

        <div className="mb-5 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                category === c
                  ? "bg-[#148ED1] text-white"
                  : "bg-white text-[#5b6470] ring-1 ring-slate-200 hover:text-[#148ED1]"
              }`}
            >
              {c === "all" ? "All" : c}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center text-slate-500">
            No published blogs in this category yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((blog) => (
              <BlogGridCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
