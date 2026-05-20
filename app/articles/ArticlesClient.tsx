"use client";

import { useState } from "react";
import Link from "next/link";
import { type Article } from "../lib/articles";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const CATEGORY_COLORS: Record<string, string> = {
  AI: "bg-violet-500/15 text-violet-300 border-violet-500/30",
  Laptops: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  Apps: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  Phones: "bg-orange-500/15 text-orange-300 border-orange-500/30",
};

const CATEGORY_ACTIVE: Record<string, string> = {
  AI: "bg-violet-500 text-white border-violet-500",
  Laptops: "bg-blue-500 text-white border-blue-500",
  Apps: "bg-emerald-500 text-white border-emerald-500",
  Phones: "bg-orange-500 text-white border-orange-500",
};

function categoryClass(cat: string, active = false) {
  const map = active ? CATEGORY_ACTIVE : CATEGORY_COLORS;
  return map[cat] ?? (active
    ? "bg-gray-400 text-white border-gray-400"
    : "bg-gray-500/15 text-gray-300 border-gray-500/30"
  );
}

interface Props {
  articles: Article[];
  categories: string[];
}

export default function ArticlesClient({ articles, categories }: Props) {
  const [active, setActive] = useState<string | null>(null);

  const featured = articles[0];
  const filtered = active
    ? articles.filter((a) => a.category === active)
    : articles.slice(1); // show all except featured when no filter
  const showFeatured = !active;

  return (
    <div>
      {/* Featured article — hidden when a filter is active */}
      {showFeatured && (
        <Link
          href={`/articles/${featured.slug}`}
          className="group mb-10 flex flex-col gap-4 rounded-2xl border border-gray-800 bg-gray-900 p-6 transition-all hover:border-violet-500/50 hover:bg-gray-800 sm:flex-row sm:items-center sm:gap-8"
        >
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-violet-500/10 text-4xl">
            {featured.coverEmoji}
          </div>
          <div className="flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${categoryClass(featured.category)}`}
              >
                {featured.category}
              </span>
              <span className="text-xs text-gray-500">{formatDate(featured.date)}</span>
              <span className="text-xs text-gray-500">·</span>
              <span className="text-xs text-gray-500">{featured.readTime} min read</span>
            </div>
            <h2 className="text-xl font-bold text-white group-hover:text-violet-300 transition-colors">
              {featured.title}
            </h2>
            <p className="mt-1 text-sm text-gray-400 leading-relaxed">{featured.description}</p>
          </div>
        </Link>
      )}

      {/* Category filter row */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-sm font-medium text-gray-400">Browse:</span>

        {/* All button */}
        <button
          onClick={() => setActive(null)}
          className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-all cursor-pointer ${
            active === null
              ? "bg-gray-100 text-gray-900 border-gray-100"
              : "bg-gray-500/15 text-gray-300 border-gray-500/30 hover:border-gray-400"
          }`}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(active === cat ? null : cat)}
            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-all cursor-pointer hover:opacity-90 ${categoryClass(cat, active === cat)}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Article grid */}
      {filtered.length === 0 ? (
        <p className="py-10 text-center text-gray-500">No articles in this category yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="group flex flex-col rounded-xl border border-gray-800 bg-gray-900 p-5 transition-all hover:border-violet-500/50 hover:bg-gray-800"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-xl">
                  {article.coverEmoji}
                </div>
                <span
                  className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${categoryClass(article.category)}`}
                >
                  {article.category}
                </span>
              </div>
              <h3 className="flex-1 text-sm font-semibold text-white group-hover:text-violet-300 transition-colors leading-snug">
                {article.title}
              </h3>
              <p className="mt-2 text-xs text-gray-500 leading-relaxed line-clamp-2">
                {article.description}
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs text-gray-600">
                <span>{formatDate(article.date)}</span>
                <span>·</span>
                <span>{article.readTime} min read</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
