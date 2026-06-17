"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import LogoAvatar from "../components/LogoAvatar";

const PAGE_SIZE = 8;

export interface Comparison {
  a: string;
  b: string;
  category: string;
}

function makeSlug(a: string, b: string) {
  return `${a.toLowerCase().replace(/ /g, "-")}-vs-${b.toLowerCase().replace(/ /g, "-")}`;
}

function ComparisonCard({ a, b, category }: Comparison) {
  const slug = makeSlug(a, b);
  return (
    <Link
      href={`/compare/${slug}`}
      className="group flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white/70 px-4 py-3.5 transition-all hover:border-violet-200 hover:bg-slate-100"
    >
      <LogoAvatar name={a} size={28} />
      <span className="flex-1 text-sm font-medium text-slate-700 group-hover:text-slate-900 truncate">{a}</span>
      <span className="shrink-0 rounded-full bg-violet-50 border border-violet-200 px-2 py-0.5 text-xs font-bold text-violet-600">VS</span>
      <span className="flex-1 text-right text-sm font-medium text-slate-700 group-hover:text-slate-900 truncate">{b}</span>
      <LogoAvatar name={b} size={28} />
      <span className="shrink-0 text-slate-700 group-hover:text-violet-500 transition-colors ml-1">→</span>
    </Link>
  );
}

interface Props {
  comparisons: Comparison[];
  categoryNames: string[];
}

export default function PopularClient({ comparisons, categoryNames }: Props) {
  const [active, setActive] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const featured = comparisons[0];

  const searchResults = query.trim().length > 0
    ? comparisons.filter((c) => {
        const q = query.toLowerCase();
        return (
          c.a.toLowerCase().includes(q) ||
          c.b.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
        );
      }).slice(0, 8)
    : [];

  const filtered = active
    ? comparisons.filter((c) => c.category === active)
    : comparisons.slice(1);

  const showFeatured = !active && page === 1 && !searchOpen;
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleCategory(cat: string | null) {
    setActive(cat);
    setPage(1);
    setSearchOpen(false);
    setQuery("");
  }

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
      {/* Search bar */}
      <div ref={containerRef} className="relative mb-6">
        <div className={`flex items-center gap-2 rounded-xl border bg-white/80 px-4 py-2.5 transition-all ${searchOpen || query ? "border-violet-500 ring-2 ring-violet-500/15" : "border-slate-200 hover:border-slate-300"}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-slate-400">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); if (!searchOpen) { setSearchOpen(true); setActive(null); setPage(1); } }}
            onFocus={() => { setSearchOpen(true); setActive(null); setPage(1); }}
            placeholder="Search comparisons…"
            className="flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-400 outline-none"
          />
          {query && (
            <button onClick={closeSearch} className="text-slate-400 hover:text-slate-600 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          )}
        </div>

        {/* Dropdown */}
        {searchOpen && query.trim().length > 0 && (
          <div className="absolute left-0 right-0 top-full z-50 mt-1.5 rounded-xl border border-slate-200 bg-white/80 shadow-xl shadow-slate-300/40 overflow-hidden">
            {searchResults.length === 0 ? (
              <p className="px-4 py-3 text-sm text-slate-400">No comparisons found for &ldquo;{query}&rdquo;</p>
            ) : (
              <ul>
                {searchResults.map((c) => (
                  <li key={`${c.a}-${c.b}`}>
                    <Link
                      href={`/compare/${makeSlug(c.a, c.b)}`}
                      onClick={closeSearch}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex items-center gap-1.5 shrink-0">
                        <LogoAvatar name={c.a} size={20} />
                        <LogoAvatar name={c.b} size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-medium text-slate-900">{c.a} vs {c.b}</p>
                        <p className="text-xs text-slate-400">{c.category}</p>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-slate-700">
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

      {/* Featured comparison */}
      {showFeatured && featured && (
        <Link
          href={`/compare/${makeSlug(featured.a, featured.b)}`}
          className="group mb-10 flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white/70 transition-all hover:border-violet-200 sm:flex-row"
        >
          {/* Logo panel */}
          <div className="flex shrink-0 items-center justify-center gap-6 bg-gradient-to-br from-violet-50 to-slate-100 px-10 py-8 sm:w-64">
            <div className="flex flex-col items-center gap-2">
              <LogoAvatar name={featured.a} size={52} />
              <span className="text-xs font-semibold text-slate-700">{featured.a}</span>
            </div>
            <span className="rounded-full bg-white/80 border border-violet-200 px-2.5 py-1 text-sm font-bold text-violet-600">VS</span>
            <div className="flex flex-col items-center gap-2">
              <LogoAvatar name={featured.b} size={52} />
              <span className="text-xs font-semibold text-slate-700">{featured.b}</span>
            </div>
          </div>
          {/* Info */}
          <div className="flex flex-1 flex-col justify-center p-6">
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-2.5 py-0.5 text-xs font-medium text-violet-700">
                {featured.category}
              </span>
              <span className="text-xs text-slate-400">Featured comparison</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 group-hover:text-violet-700 transition-colors">
              {featured.a} vs {featured.b}
            </h2>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
              Get an in-depth AI-powered breakdown comparing {featured.a} and {featured.b} — features, pricing, pros & cons and a clear winner.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-violet-600 group-hover:underline">
              See comparison →
            </span>
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
              ? "bg-violet-600 text-white border-violet-600"
              : "bg-white text-slate-600 border-slate-200 hover:border-violet-300 hover:text-violet-600"
          }`}
        >
          All
        </button>
        {categoryNames.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategory(active === cat ? null : cat)}
            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-all cursor-pointer ${
              active === cat
                ? "bg-violet-600 text-white border-violet-600"
                : "bg-white text-slate-600 border-slate-200 hover:border-violet-300 hover:text-violet-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {searchOpen && query.trim().length > 0 ? (
        searchResults.length === 0 ? (
          <p className="py-10 text-center text-slate-400">No comparisons found for &ldquo;{query}&rdquo;</p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {searchResults.map((c) => (
              <ComparisonCard key={`${c.a}-${c.b}`} {...c} />
            ))}
          </div>
        )
      ) : paginated.length === 0 ? (
        <p className="py-10 text-center text-slate-400">No comparisons in this category yet.</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {paginated.map((c) => (
            <ComparisonCard key={`${c.a}-${c.b}`} {...c} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!searchOpen && totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white/80 text-slate-400 transition-all hover:border-violet-200 hover:text-violet-700 disabled:opacity-30 disabled:cursor-not-allowed"
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
                    : "border-slate-200 bg-white/80 text-slate-400 hover:border-violet-200 hover:text-violet-700"
                }`}
              >
                {p}
              </button>
            );
          })}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white/80 text-slate-400 transition-all hover:border-violet-200 hover:text-violet-700 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ›
          </button>
        </div>
      )}

      {/* CTA */}
      {!searchOpen && (
        <div className="mt-16 rounded-2xl border border-violet-200 bg-violet-50 p-8 text-center">
          <h3 className="text-xl font-bold text-slate-900">Don&apos;t see what you need?</h3>
          <p className="mt-2 text-slate-500">Compare anything — just type two things and our AI does the rest.</p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-xl bg-violet-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-violet-500"
          >
            Start a Comparison →
          </Link>
        </div>
      )}
    </div>
  );
}
