"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
    : articles.slice(1);
  const showFeatured = !active;

  return (
    <div>
      {/* Featured article */}
      {showFeatured && (
        <Link
          href={`/articles/${featured.slug}`}
          className="group mb-10 flex flex-col overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 transition-all hover:border-violet-500/50 hover:bg-gray-800 sm:flex-row"
        >
          {/* Image */}
          <div className="relative h-48 w-full shrink-0 sm:h-auto sm:w-64">
            <Image
              src={featured.heroImage}
              alt={featured.title}
              fill
              className="object-cover"
            />
          </div>
          {/* Content */}
          <div className="flex flex-1 flex-col justify-center p-6">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${categoryClass(featured.category)}`}>
                {featured.category}
              </span>
              <span className="text-xs text-gray-500">{formatDate(featured.date)}</span>
              <span className="text-xs text-gray-500">·</span>
              <span className="text-xs text-gray-500">{featured.readTime} min read</span>
            </div>
            <h2 className="text-xl font-bold text-white group-hover:text-violet-300 transition-colors">
              {featured.title}
            </h2>
            <p className="mt-2 text-sm text-gray-400 leading-relaxed line-clamp-2">{featured.description}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {featured.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="rounded-full bg-gray-800 px-2.5 py-0.5 text-xs text-gray-500 border border-gray-700">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </Link>
      )}

      {/* Category filter row */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-sm font-medium text-gray-400">Browse:</span>
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
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-gray-800 bg-gray-900 transition-all hover:border-violet-500/50 hover:bg-gray-800"
            >
              {/* Card image */}
              <div className="relative h-40 w-full overflow-hidden">
                <Image
                  src={article.heroImage}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                <span className={`absolute bottom-3 left-3 inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${categoryClass(article.category)}`}>
                  {article.category}
                </span>
              </div>
              {/* Card body */}
              <div className="flex flex-1 flex-col p-4">
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
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
