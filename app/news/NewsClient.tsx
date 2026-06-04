"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { NewsItem, NewsCategory } from "../lib/news";
import { NEWS_CATEGORIES, CAT_COLORS, CAT_ACTIVE } from "../lib/news";

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const h = Math.floor(diff / 3600000);
  if (h < 1) return "Just now";
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

function NewsCard({ item, featured }: { item: NewsItem; featured?: boolean }) {
  if (featured) {
    return (
      <a
        href={item.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300"
      >
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${CAT_COLORS[item.category]}`}>
              {item.category}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-xs text-slate-300 mb-2">{item.publisher} · {timeAgo(item.date)} · {item.readTime} min read</p>
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight group-hover:text-violet-200 transition-colors">
              {item.title}
            </h2>
            <p className="mt-2 text-sm text-slate-300 line-clamp-2">{item.summary}</p>
          </div>
        </div>
        <div className="px-6 py-4 flex items-center justify-between border-t border-slate-100">
          <span className="text-xs text-slate-400">Full story at {item.publisher}</span>
          <span className="text-xs font-semibold text-violet-600 group-hover:translate-x-1 transition-transform inline-block">Read →</span>
        </div>
      </a>
    );
  }

  return (
    <a
      href={item.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md hover:border-violet-200 transition-all duration-200"
    >
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 overflow-hidden rounded-xl">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${CAT_COLORS[item.category]}`}>
            {item.category}
          </span>
          <span className="text-xs text-slate-400">{item.publisher} · {timeAgo(item.date)}</span>
        </div>
        <h3 className="font-semibold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-violet-700 transition-colors line-clamp-2">
          {item.title}
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-slate-500 line-clamp-2">{item.summary}</p>
        <span className="mt-2 inline-block text-xs font-semibold text-violet-600 group-hover:translate-x-1 transition-transform">
          {item.readTime} min read →
        </span>
      </div>
    </a>
  );
}

export default function NewsClient({ items, date }: { items: NewsItem[]; date: string }) {
  const [activeCategory, setActiveCategory] = useState<NewsCategory | "All">("All");
  const [query, setQuery] = useState("");

  const filtered = items.filter((item) => {
    const matchesCat = activeCategory === "All" || item.category === activeCategory;
    const matchesQuery =
      !query ||
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.summary.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">📡</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Tech News</h1>
        </div>
        <p className="text-slate-500 text-sm sm:text-base">
          Daily curated stories in AI, Tech, Blockchain & more · <span className="font-medium text-slate-700">{formattedDate}</span>
        </p>
      </div>

      {/* Search bar */}
      <div className="relative mb-6">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Search today's news..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 placeholder-slate-400 shadow-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
        />
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory("All")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
            activeCategory === "All"
              ? "bg-slate-900 text-white shadow-sm"
              : "bg-white border border-slate-200 text-slate-600 hover:border-slate-400"
          }`}
        >
          All
        </button>
        {NEWS_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
              activeCategory === cat
                ? CAT_ACTIVE[cat] + " shadow-sm"
                : "bg-white border border-slate-200 text-slate-600 hover:border-slate-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-400">No stories match your filter.</div>
      ) : (
        <div className="space-y-6">
          {/* Featured story */}
          {featured && <NewsCard item={featured} featured />}

          {/* Rest of the stories */}
          {rest.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-1">
              {rest.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Bottom CTA */}
      <div className="mt-14 rounded-2xl bg-gradient-to-br from-violet-50 to-slate-50 border border-violet-100 p-8 text-center">
        <p className="text-sm font-semibold text-violet-600 uppercase tracking-widest mb-2">New every day</p>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Fresh stories every morning</h3>
        <p className="text-slate-500 text-sm max-w-sm mx-auto mb-5">
          Our AI curates the top 5–7 tech stories daily. Bookmark this page to stay ahead.
        </p>
        <Link
          href="/compare"
          className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-violet-500 transition-colors"
        >
          Compare any two tools →
        </Link>
      </div>
    </div>
  );
}
