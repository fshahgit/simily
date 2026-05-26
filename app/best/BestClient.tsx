"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import LogoAvatar from "../components/LogoAvatar";
import { type BestTopic, BEST_CATEGORIES } from "../lib/best";

const PAGE_SIZE = 8;

const CAT_COLORS: Record<string, string> = {
  "AI":                "bg-violet-100 text-violet-700 border-violet-300",
  "Dev Tools":         "bg-blue-100 text-blue-700 border-blue-300",
  "Productivity":      "bg-amber-100 text-amber-700 border-amber-300",
  "Laptops & Hardware":"bg-slate-100 text-slate-700 border-slate-300",
  "Design":            "bg-pink-100 text-pink-700 border-pink-300",
  "Communication":     "bg-teal-100 text-teal-700 border-teal-300",
  "Cloud":             "bg-sky-100 text-sky-700 border-sky-300",
  "Entertainment":     "bg-orange-100 text-orange-700 border-orange-300",
  "Security":          "bg-red-100 text-red-700 border-red-300",
  "Website Builders":  "bg-emerald-100 text-emerald-700 border-emerald-300",
  "By Region":         "bg-teal-100 text-teal-700 border-teal-300",
};

const CAT_ACTIVE: Record<string, string> = {
  "AI":                "bg-violet-600 text-white border-violet-600",
  "Dev Tools":         "bg-blue-600 text-white border-blue-600",
  "Productivity":      "bg-amber-500 text-white border-amber-500",
  "Laptops & Hardware":"bg-slate-700 text-white border-slate-700",
  "Design":            "bg-pink-600 text-white border-pink-600",
  "Communication":     "bg-teal-600 text-white border-teal-600",
  "Cloud":             "bg-sky-600 text-white border-sky-600",
  "Entertainment":     "bg-orange-600 text-white border-orange-600",
  "Security":          "bg-red-600 text-white border-red-600",
  "Website Builders":  "bg-emerald-600 text-white border-emerald-600",
  "By Region":         "bg-teal-600 text-white border-teal-600",
};

function catClass(cat: string, active = false) {
  const map = active ? CAT_ACTIVE : CAT_COLORS;
  return map[cat] ?? (active
    ? "bg-slate-700 text-white border-slate-700"
    : "bg-slate-100 text-slate-600 border-slate-300"
  );
}

function TopicCard({ topic }: { topic: BestTopic }) {
  return (
    <Link
      href={`/best/${topic.slug}`}
      className="group flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-violet-300 hover:shadow-md hover:bg-slate-50"
    >
      <div className="flex items-center gap-1.5 flex-wrap">
        {topic.items.slice(0, 5).map((item) => (
          <LogoAvatar key={item} name={item} size={24} />
        ))}
        {topic.items.length > 5 && (
          <span className="text-xs text-slate-400">+{topic.items.length - 5}</span>
        )}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-slate-900 group-hover:text-violet-600 transition-colors text-sm leading-snug">
          {topic.title}
        </h3>
        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{topic.description}</p>
      </div>
      <div className="flex items-center justify-between">
        <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${catClass(topic.category)}`}>
          {topic.category}
        </span>
        <span className="text-xs text-violet-600 font-medium group-hover:underline">See rankings →</span>
      </div>
    </Link>
  );
}

const ALL_CATS = BEST_CATEGORIES; // includes "By Region"

interface Props {
  topics: BestTopic[];
}

export default function BestClient({ topics }: Props) {
  const [active, setActive] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const featured = topics[0];

  // Filtered list (excludes featured when showing "all")
  const filtered = active
    ? topics.filter((t) => t.category === active)
    : topics.slice(1);

  const showFeatured = !active && page === 1 && !searchOpen;

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleCategory(cat: string | null) {
    setActive(cat);
    setPage(1);
    setSearchOpen(false);
    setQuery("");
  }

  // Search results
  const searchResults = query.trim().length > 0
    ? topics.filter((t) => {
        const q = query.toLowerCase();
        return (
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.items.some((i) => i.toLowerCase().includes(q))
        );
      }).slice(0, 8)
    : [];

  function closeSearch() {
    setSearchOpen(false);
    setQuery("");
  }

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        closeSearch();
      }
    }
    if (searchOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [searchOpen]);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") closeSearch();
    }
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <div>
      {/* Search bar — always visible, above filters */}
      <div ref={containerRef} className="relative mb-6">
        <div className={`flex items-center gap-2 rounded-xl border bg-white px-4 py-2.5 shadow-sm transition-all ${searchOpen || query ? "border-violet-400 ring-2 ring-violet-100" : "border-slate-200 hover:border-slate-300"}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-slate-400">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); if (!searchOpen) { setSearchOpen(true); setActive(null); setPage(1); } }}
            onFocus={() => { setSearchOpen(true); setActive(null); setPage(1); }}
            placeholder="Search best-of guides…"
            className="flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-400 outline-none"
          />
          {query && (
            <button onClick={() => { setQuery(""); setSearchOpen(false); }} className="text-slate-400 hover:text-slate-600 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          )}
        </div>

        {/* Search dropdown */}
        {searchOpen && query.trim().length > 0 && (
          <div className="absolute left-0 right-0 top-full z-50 mt-1.5 rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden">
            {searchResults.length === 0 ? (
              <p className="px-4 py-3 text-sm text-slate-400">No guides found for &ldquo;{query}&rdquo;</p>
            ) : (
              <ul>
                {searchResults.map((topic) => (
                  <li key={topic.slug}>
                    <Link
                      href={`/best/${topic.slug}`}
                      onClick={closeSearch}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex shrink-0 -space-x-1.5">
                        {topic.items.slice(0, 3).map((item) => (
                          <LogoAvatar key={item} name={item} size={22} />
                        ))}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-slate-900">{topic.title}</p>
                        <p className="text-xs text-slate-400">{topic.category}</p>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-slate-300">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Featured topic — only on page 1, no filter, no search */}
      {showFeatured && featured && (
        <Link
          href={`/best/${featured.slug}`}
          className="group mb-10 flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:border-violet-300 hover:shadow-md sm:flex-row"
        >
          {/* Logo wall */}
          <div className="flex shrink-0 items-center justify-center bg-gradient-to-br from-violet-50 to-slate-100 p-8 sm:w-64">
            <div className="flex flex-wrap items-center justify-center gap-3 max-w-[180px]">
              {featured.items.slice(0, 6).map((item) => (
                <LogoAvatar key={item} name={item} size={40} />
              ))}
              {featured.items.length > 6 && (
                <span className="text-sm text-slate-400 font-medium">+{featured.items.length - 6}</span>
              )}
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-center p-6">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${catClass(featured.category)}`}>
                {featured.category}
              </span>
              <span className="text-xs text-slate-400">Latest guide</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 group-hover:text-violet-600 transition-colors">
              {featured.title}
            </h2>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed line-clamp-2">{featured.description}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {featured.items.slice(0, 5).map((item) => (
                <span key={item} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-500 border border-slate-200">
                  {item}
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
            active === null && !searchOpen
              ? "bg-slate-900 text-white border-slate-900"
              : "bg-slate-100 text-slate-600 border-slate-200 hover:border-slate-400"
          }`}
        >
          All
        </button>

        {ALL_CATS.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategory(active === cat ? null : cat)}
            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-all cursor-pointer hover:opacity-90 ${catClass(cat, active === cat)}`}
          >
            {cat}
          </button>
        ))}

      </div>

      {/* Grid */}
      {searchOpen && query.trim().length > 0 ? (
        searchResults.length === 0 ? (
          <p className="py-10 text-center text-slate-400">No guides found for &ldquo;{query}&rdquo;</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {searchResults.map((topic) => (
              <TopicCard key={topic.slug} topic={topic} />
            ))}
          </div>
        )
      ) : paginated.length === 0 ? (
        <p className="py-10 text-center text-slate-400">No guides in this category yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {paginated.map((topic) => (
            <TopicCard key={topic.slug} topic={topic} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!searchOpen && totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition-all hover:border-violet-300 hover:text-violet-600 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ‹
          </button>

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
