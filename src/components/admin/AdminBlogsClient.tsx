"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Eye,
  Layers,
  Pencil,
  Plus,
  Search,
  Star,
  Trash2,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import {
  createEmptyBlog,
  createEmptySection,
  deleteBlog,
  formatBlogDate,
  loadBlogs,
  setBlogStatus,
  setMainBlog,
  slugifyTitle,
  upsertBlog,
} from "@/lib/blogs/store";
import {
  BLOG_CATEGORIES,
  BLOG_LANGUAGES,
  BLOG_READ_TIMES,
  BLOG_TAG_SUGGESTIONS,
  type BlogPost,
  type BlogStatus,
} from "@/lib/blogs/types";

function StatusBadge({ status }: { status: BlogStatus }) {
  const active = status === "published";
  return (
    <span
      className={`inline-flex min-w-[88px] items-center justify-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ring-1 ring-inset ${
        active
          ? "bg-emerald-500/15 text-emerald-800 ring-emerald-500/25"
          : "bg-slate-500/10 text-slate-600 ring-slate-500/20"
      }`}
    >
      {active ? "Active" : "Deactivated"}
    </span>
  );
}

function MainBlogBadge() {
  return (
    <span className="inline-flex min-w-[88px] shrink-0 items-center justify-center rounded-full bg-violet-500/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-violet-900 ring-1 ring-inset ring-violet-500/25">
      Main Blog
    </span>
  );
}

function AddBlogModal({
  open,
  onClose,
  blog,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  blog: BlogPost | null;
  onSave: (blog: BlogPost) => void;
}) {
  const [form, setForm] = useState<BlogPost>(createEmptyBlog);
  const isEdit = Boolean(blog);

  useEffect(() => {
    if (!open) return;
    if (blog) {
      setForm({
        ...blog,
        tags: [...blog.tags],
        focusKeywords: [...blog.focusKeywords],
        sections: blog.sections.map((s) => ({ ...s })),
      });
    } else {
      setForm(createEmptyBlog());
    }
  }, [open, blog]);

  if (!open) return null;

  const setField = <K extends keyof BlogPost>(key: K, value: BlogPost[K]) => {
    setForm((f) => {
      const next = { ...f, [key]: value };
      if (key === "title" && !f.slugManuallyEdited) {
        next.slug = slugifyTitle(String(value));
        if (!f.metaTitle) next.metaTitle = String(value);
      }
      return next;
    });
  };

  const submit = () => {
    if (!form.title.trim()) {
      alert("Title is required");
      return;
    }
    if (!form.slug.trim()) {
      alert("Slug is required");
      return;
    }
    onSave({
      ...form,
      slug: slugifyTitle(form.slug) || slugifyTitle(form.title),
      metaTitle: form.metaTitle || form.title,
      lastSavedAt: new Date().toISOString(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/45 p-4">
      <div className="flex max-h-[min(90vh,760px)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-[#f0f4f8] shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <FileIcon />
            <h2 className="text-lg font-bold text-[#111]">{isEdit ? "Edit Blog" : "Add Blog"}</h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-2 hover:bg-slate-100 text-slate-500">
            ✕
          </button>
        </div>

        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-6 sm:px-8">
          <section className="space-y-4">
            <h3 className="border-b border-[#e8eef5] pb-2 text-sm font-bold tracking-wide text-[#246392]">
              Basic Details
            </h3>
            <Field label="Title">
              <input
                value={form.title}
                onChange={(e) => setField("title", e.target.value)}
                className="field"
                placeholder="Blog title"
              />
            </Field>
            <Field label="Slug">
              <input
                value={form.slug}
                onChange={(e) => {
                  setField("slugManuallyEdited", true);
                  setField("slug", e.target.value);
                }}
                className="field"
                placeholder="url-slug"
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Category">
                <select
                  value={form.category}
                  onChange={(e) => setField("category", e.target.value)}
                  className="field"
                >
                  {BLOG_CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field label="Language">
                <select
                  value={form.language}
                  onChange={(e) => setField("language", e.target.value)}
                  className="field"
                >
                  {BLOG_LANGUAGES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field label="Read time">
                <select
                  value={form.readTime}
                  onChange={(e) => setField("readTime", e.target.value)}
                  className="field"
                >
                  {BLOG_READ_TIMES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
            </div>
            <Field label="Background image URL">
              <input
                value={form.backgroundImage}
                onChange={(e) => setField("backgroundImage", e.target.value)}
                className="field"
                placeholder="https://..."
              />
            </Field>
            <Field label="Intro / body HTML">
              <textarea
                value={form.bodyHtml}
                onChange={(e) => setField("bodyHtml", e.target.value)}
                className="field min-h-[90px]"
                placeholder="<p>Introduction...</p>"
              />
            </Field>
            <Field label="Tags (comma separated)">
              <input
                value={form.tags.join(", ")}
                onChange={(e) =>
                  setField(
                    "tags",
                    e.target.value
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean),
                  )
                }
                className="field"
                placeholder={BLOG_TAG_SUGGESTIONS.slice(0, 4).join(", ")}
              />
            </Field>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={form.isMainBlog}
                onChange={(e) => setField("isMainBlog", e.target.checked)}
              />
              Set as Main Blog
            </label>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={form.status === "published"}
                onChange={(e) => setField("status", e.target.checked ? "published" : "draft")}
              />
              Publish (Active)
            </label>
          </section>

          <section className="space-y-4">
            <h3 className="border-b border-[#e8eef5] pb-2 text-sm font-bold tracking-wide text-[#246392]">
              SEO
            </h3>
            <Field label="Meta title">
              <input
                value={form.metaTitle}
                onChange={(e) => setField("metaTitle", e.target.value)}
                className="field"
              />
            </Field>
            <Field label="Meta description">
              <textarea
                value={form.metaDescription}
                onChange={(e) => setField("metaDescription", e.target.value)}
                className="field min-h-[70px]"
              />
            </Field>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#e8eef5] pb-2">
              <h3 className="text-sm font-bold tracking-wide text-[#246392]">
                Table of Contents / Sections
              </h3>
              <button
                type="button"
                className="text-sm font-semibold text-[#148ED1]"
                onClick={() =>
                  setForm((f) => ({
                    ...f,
                    sections: [...f.sections, createEmptySection(f.id)],
                  }))
                }
              >
                + Add section
              </button>
            </div>
            {form.sections.map((section, idx) => (
              <div key={section.id} className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase text-slate-500">Section {idx + 1}</p>
                  {form.sections.length > 1 ? (
                    <button
                      type="button"
                      className="text-xs font-semibold text-red-500"
                      onClick={() =>
                        setForm((f) => ({
                          ...f,
                          sections: f.sections.filter((s) => s.id !== section.id),
                        }))
                      }
                    >
                      Remove
                    </button>
                  ) : null}
                </div>
                <input
                  value={section.topic}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      sections: f.sections.map((s) =>
                        s.id === section.id ? { ...s, topic: e.target.value } : s,
                      ),
                    }))
                  }
                  className="field"
                  placeholder="Topic heading"
                />
                <textarea
                  value={section.content}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      sections: f.sections.map((s) =>
                        s.id === section.id ? { ...s, content: e.target.value } : s,
                      ),
                    }))
                  }
                  className="field min-h-[80px]"
                  placeholder="<p>Section content...</p>"
                />
              </div>
            ))}
          </section>
        </div>

        <div className="sticky bottom-0 flex justify-end gap-3 border-t border-slate-200/80 bg-[#f0f4f8] px-5 pb-5 pt-4 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 items-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={submit}
            className="inline-flex h-10 items-center rounded-xl bg-gradient-to-r from-[#1a3a5c] to-[#03045e] px-4 text-sm font-semibold text-white shadow-md"
          >
            {isEdit ? "Update Blog" : "Save Blog"}
          </button>
        </div>
      </div>
      <style jsx>{`
        :global(.field) {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid #e2e8f0;
          background: white;
          padding: 0.65rem 0.85rem;
          font-size: 0.875rem;
          color: #111;
          outline: none;
        }
        :global(.field:focus) {
          box-shadow: 0 0 0 2px rgba(85, 172, 231, 0.45);
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</span>
      {children}
    </label>
  );
}

function FileIcon() {
  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eef6fc] text-[#148ED1]">
      <Layers size={18} />
    </span>
  );
}

function ViewModal({ blog, onClose }: { blog: BlogPost | null; onClose: () => void }) {
  if (!blog) return null;
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/45 p-4">
      <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-[#111]">{blog.title}</h2>
            <p className="mt-1 text-sm text-slate-500">
              {blog.category} · {blog.language} · {formatBlogDate(blog.publishedAt)}
            </p>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-2 hover:bg-slate-100">
            ✕
          </button>
        </div>
        <StatusBadge status={blog.status} />
        {blog.isMainBlog ? (
          <span className="ml-2">
            <MainBlogBadge />
          </span>
        ) : null}
        <p className="mt-4 text-sm text-slate-600">{blog.metaDescription || "No description"}</p>
        <div className="mt-6 flex justify-end gap-2">
          <Link
            href={`/blog/${blog.slug}`}
            className="rounded-xl bg-[#148ED1] px-4 py-2 text-sm font-semibold text-white"
          >
            Open public page
          </Link>
          <button type="button" onClick={onClose} className="rounded-xl border px-4 py-2 text-sm font-semibold">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminBlogsClient() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | BlogStatus>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [viewTarget, setViewTarget] = useState<BlogPost | null>(null);

  const refresh = () => setBlogs(loadBlogs());

  useEffect(() => {
    refresh();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return blogs
      .filter((b) => (status === "all" ? true : b.status === status))
      .filter((b) =>
        !q
          ? true
          : b.title.toLowerCase().includes(q) ||
            b.slug.toLowerCase().includes(q) ||
            b.category.toLowerCase().includes(q),
      )
      .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
  }, [blogs, search, status]);

  return (
    <div className="min-h-screen bg-[#f7f7f7] px-4 pb-10 pt-6 sm:px-5 lg:px-6">
      <div className="mx-auto max-w-screen-2xl space-y-5 sm:space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#246392]">
              <Layers size={22} />
              <h1 className="text-2xl font-extrabold text-[#111]">Blog Management</h1>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              Same workflow as Sriram admin — create, edit, publish, and feature blogs.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/blog"
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 shadow-sm"
            >
              View public blogs
            </Link>
            <button
              type="button"
              onClick={async () => {
                await fetch("/api/admin/logout", { method: "POST" });
                window.location.href = "/admin/login";
              }}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
            >
              Log out
            </button>
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setModalOpen(true);
              }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-xl sm:w-auto sm:py-2.5"
            >
              <Plus size={16} /> Add Blog
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/70 bg-white p-4 shadow-[0_18px_48px_rgba(15,23,42,0.06)] sm:p-5">
          <div className="flex min-h-[56px] flex-wrap items-center justify-between gap-3 rounded-xl bg-white px-1 py-1 sm:gap-4">
            <div className="relative w-full min-w-0 flex-1 lg:max-w-lg">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#687180]" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search blog"
                className="h-10 w-full rounded-lg bg-[#eef2fc] pl-10 pr-3 text-sm text-[#222] outline-none placeholder:text-[#9ca0a8] focus:ring-2 focus:ring-[#55ace7]/45"
              />
            </div>
            <div className="relative w-full sm:w-auto sm:min-w-[118px]">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "all" | BlogStatus)}
                className="h-10 w-full cursor-pointer appearance-none rounded-lg border-0 bg-gradient-to-b from-[#55ace7] to-[#3d8fd4] pl-4 pr-9 text-sm font-semibold text-white shadow-sm outline-none"
              >
                <option value="all" className="bg-white text-[#222]">
                  Status
                </option>
                <option value="published" className="bg-white text-[#222]">
                  Active
                </option>
                <option value="draft" className="bg-white text-[#222]">
                  Deactivated
                </option>
              </select>
            </div>
          </div>

          <div className="mt-5 overflow-hidden rounded-xl border border-slate-100">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-[#f8fafc] text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-bold">Title</th>
                    <th className="px-4 py-3 font-bold">Category</th>
                    <th className="px-4 py-3 font-bold">Date</th>
                    <th className="px-4 py-3 font-bold">Status</th>
                    <th className="px-4 py-3 font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-12 text-center text-slate-500">
                        No blogs found
                      </td>
                    </tr>
                  ) : (
                    filtered.map((blog) => (
                      <tr key={blog.id} className="border-t border-slate-100 hover:bg-[#eef6fc]/70">
                        <td className="px-4 py-3">
                          <div className="flex min-w-0 max-w-md items-center gap-2">
                            <span className="truncate font-semibold leading-snug text-[#111]">
                              {blog.title}
                            </span>
                            {blog.isMainBlog ? <MainBlogBadge /> : null}
                          </div>
                          <p className="mt-0.5 text-xs text-slate-400">/{blog.slug}</p>
                        </td>
                        <td className="px-4 py-3 text-slate-600">{blog.category}</td>
                        <td className="px-4 py-3 text-slate-600">{formatBlogDate(blog.publishedAt)}</td>
                        <td className="px-4 py-3">
                          <StatusBadge status={blog.status} />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <IconBtn title="View" onClick={() => setViewTarget(blog)}>
                              <Eye size={15} />
                            </IconBtn>
                            <IconBtn
                              title="Edit"
                              onClick={() => {
                                setEditing(blog);
                                setModalOpen(true);
                              }}
                            >
                              <Pencil size={15} />
                            </IconBtn>
                            <IconBtn
                              title={blog.status === "published" ? "Deactivate" : "Activate"}
                              onClick={() => {
                                setBlogStatus(
                                  blog.id,
                                  blog.status === "published" ? "draft" : "published",
                                );
                                refresh();
                              }}
                            >
                              {blog.status === "published" ? (
                                <ToggleRight size={15} />
                              ) : (
                                <ToggleLeft size={15} />
                              )}
                            </IconBtn>
                            <IconBtn
                              title="Set main"
                              onClick={() => {
                                setMainBlog(blog.id, true);
                                refresh();
                              }}
                            >
                              <Star size={15} className={blog.isMainBlog ? "fill-amber-400 text-amber-500" : ""} />
                            </IconBtn>
                            <IconBtn
                              title="Delete"
                              danger
                              onClick={() => {
                                if (confirm("Delete this blog?")) {
                                  deleteBlog(blog.id);
                                  refresh();
                                }
                              }}
                            >
                              <Trash2 size={15} />
                            </IconBtn>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <AddBlogModal
        open={modalOpen}
        blog={editing}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        onSave={(blog) => {
          upsertBlog(blog);
          refresh();
        }}
      />
      <ViewModal blog={viewTarget} onClose={() => setViewTarget(null)} />
    </div>
  );
}

function IconBtn({
  children,
  onClick,
  title,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 ${
        danger ? "hover:text-red-600" : "hover:text-[#148ED1]"
      }`}
    >
      {children}
    </button>
  );
}
