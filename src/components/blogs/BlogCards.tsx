"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/blogs/types";
import { excerptFromBlog, formatBlogDate } from "@/lib/blogs/store";

export function FeaturedBlogCard({ blog }: { blog: BlogPost }) {
  const href = `/blog/${blog.slug}`;
  return (
    <article className="blog-main-card relative mb-7 overflow-hidden rounded-[14px] bg-[#F3EFE6] shadow-[0_8px_28px_rgba(0,0,0,0.08)]">
      <div className="flex flex-col gap-3 p-3.5 sm:gap-4 sm:p-4 md:flex-row md:items-start md:gap-5 md:p-4 lg:gap-6">
        <div className="mx-auto w-full max-w-[200px] shrink-0 md:mx-0 md:w-[180px] lg:w-[200px]">
          <div className="relative aspect-square w-full overflow-hidden rounded-[10px] bg-slate-200">
            {blog.backgroundImage ? (
              <Image
                src={blog.backgroundImage}
                alt={blog.title}
                fill
                priority
                sizes="200px"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#00adef] to-[#0B4F8A]" />
            )}
          </div>
          <p className="mt-2 text-left text-[12px] font-semibold text-[#666]">
            {formatBlogDate(blog.publishedAt)}
          </p>
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <h2 className="text-left text-[20px] font-extrabold leading-snug tracking-tight text-[#1a1a1a] sm:text-[22px] md:text-[24px]">
            {blog.title}
          </h2>
          <p className="mt-2.5 line-clamp-3 text-left text-[13px] leading-[1.6] text-[#5b6470] sm:text-[14px]">
            {excerptFromBlog(blog)}
          </p>
          <div className="mt-3 flex justify-end">
            <Link
              href={href}
              className="inline-flex h-[38px] min-w-[110px] items-center justify-center gap-2 rounded-full border border-[#159DE2] bg-white px-5 text-[14px] font-semibold text-[#148ED1] transition-all duration-300 hover:bg-[#148ED1] hover:text-white"
            >
              Read <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export function BlogGridCard({ blog }: { blog: BlogPost }) {
  const href = `/blog/${blog.slug}`;
  return (
    <div className="group relative flex h-[260px] flex-col overflow-hidden rounded-[8px] shadow-md transition-all duration-500 ease-out hover:scale-[1.05] hover:shadow-[0_22px_45px_rgba(0,0,0,0.24)]">
      {blog.backgroundImage ? (
        <Image src={blog.backgroundImage} alt={blog.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B4F8A] to-[#00adef]" />
      )}
      <div className="absolute inset-0 bg-black/35" />
      <div className="relative z-10 flex min-h-0 flex-1 flex-col px-5 pb-4 pt-5">
        <h3 className="mb-2 line-clamp-3 text-left text-[15px] font-semibold leading-[1.4] text-white sm:text-[16px]">
          {blog.title}
        </h3>
        <p className="text-[12px] font-medium text-white/80">{formatBlogDate(blog.publishedAt)}</p>
        <Link
          href={href}
          className="mt-auto ml-auto flex h-[36px] w-fit min-w-[120px] items-center justify-center gap-2 rounded-full border border-[#159DE2] bg-white px-5 text-[14px] font-semibold text-[#148ED1] transition-all duration-300 hover:bg-[#148ED1] hover:text-white"
        >
          Read More <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
