"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { type Article } from "../lib/articles";

const PAGE_SIZE = 8;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const CATEGORY_COLORS: Record<string, string> = {
  AI:            "bg-violet-100 text-violet-700 border-violet-300",
  Laptops:       "bg-blue-100 text-blue-700 border-blue-300",
  Travel:        "bg-emerald-100 text-emerald-700 border-emerald-300",
  Finance:       "bg-amber-100 text-amber-700 border-amber-300",
  Health:        "bg-rose-100 text-rose-700 border-rose-300",
  Career:        "bg-orange-100 text-orange-700 border-orange-300",
  Smartphones:   "bg-pink-100 text-pink-700 border-pink-300",
  Entertainment: "bg-teal-100 text-teal-700 border-teal-300",
  Apps:          "bg-teal-100 text-teal-700 border-teal-300",
};

const CATEGORY_ACTIVE: Record<string, string> = {
  AI:            "bg-violet-600 text-white border-violet-600",
  Laptops:       "bg-blue-600 text-white border-blue-600",
  Travel:        "bg-emerald-600 text-white border-emerald-600",
  Finance:       "bg-amber-500 text-white border-amber-500",
  Health:        "bg-rose-600 text-white border-rose-600",
  Career:        "bg-orange-600 text-white border-orange-600",
  Smartphones:   "bg-pink-600 text-white border-pink-600",
  Entertainment: "bg-teal-600 text-white border-teal-600",
  Apps:          "bg-teal-600 text-white border-teal-600",
};

function categoryClass(cat: string, active = false) {
  const map = active ? CATEGORY_ACTIVE : CATEGORY_COLORS;
  return map[cat] ?? (active
    ? "bg-slate-700 text-white border-slate-700"
    : "bg-slate-100 text-slate-600 border-slate-300"
  );
}

interface Props {
  articles: Article[];
  categories: string[];
}

export default function ArticlesClient({ articles, categories }: Props) {
  const [active, setActive] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const featured = articles[0];
  const filtered = active
    ? articles.filter((a) => a.category === active)
    : articles.slice(1);
  const showFeatured = !active && page === 1;

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleCategory(cat: string | null) {
    setActive(cat);
    setPage(1);
  }

  return (
    <div>
      {/* Featured article — only on page 1, no filter active */}
      {showFeatured && (
        <Link
          href={`/articles/${featured.slug}`}
          className="group mb-10 flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:border-violet-300 hover:shadow-md sm:flex-row"
        >
          <div className="relative h-48 w-full shrink-0 sm:h-auto sm:w-64">
            <Image src={featured.heroImage} alt={featured.title} fill className="object-cover" />
          </div>
          <div className="flex flex-1 flex-col justify-center p-6">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${categoryClass(featured.category)}`}>
                {featured.category}
              </span>
              <span className="text-xs text-slate-400">{formatDate(featured.date)}</span>
              <span className="text-xs text-slate-300">·</span>
              <span className="text-xs text-slate-400">{featured.readTime} min read</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 group-hover:text-violet-600 transition-colors">
              {featured.title}
            </h2>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed line-clamp-2">{featured.description}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {featured.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-500 border border-slate-200">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </Link>
      )}

      {/* Category filter row */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-sm font-medium text-slate-500">Browse:</span>
        <button
          onClick={() => handleCategory(null)}
          className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-all cursor-pointer ${
            active === null
              ? "bg-slate-900 text-white border-slate-900"
              : "bg-slate-100 text-slate-600 border-slate-200 hover:border-slate-400"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategory(active === cat ? null : cat)}
            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-all cursor-pointer hover:opacity-90 ${categoryClass(cat, active === cat)}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Article grid */}
      {paginated.length === 0 ? (
        <p className="py-10 text-center text-slate-400">No articles in this category yet.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {paginated.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:border-violet-300 hover:shadow-md"
            >
              <div className="relative h-40 w-full overflow-hidden">
                <Image
                  src={article.heroImage}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className={`absolute bottom-3 left-3 inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${categoryClass(article.category)}`}>
                  {article.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="flex-1 text-sm font-semibold text-slate-900 group-hover:text-violet-600 transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {article.description}
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                  <span>{formatDate(article.date)}</span>
                  <span>·</span>
                  <span>{article.readTime} min read</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          {/* Prev */}
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition-all hover:border-violet-300 hover:text-violet-600 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ‹
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
            const isActive = p === page;
            const isNear = Math.abs(p - page) <= 2 || p === 1 || p === totalPages;
            if (!isNear) {
              if (p === page - 3 || p === page + 3) return <span key={p} className="text-slate-400 text-sm">…</span>;
              return null;
            }
            return (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-medium transition-all ${
                  isActive
                    ? "bg-violet-600 border-violet-600 text-white shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 shadow-sm hover:border-violet-300 hover:text-violet-600"
                }`}
              >
                {p}
              </button>
            );
          })}

          {/* Next */}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition-all hover:border-violet-300 hover:text-violet-600 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
