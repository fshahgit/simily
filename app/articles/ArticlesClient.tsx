"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { type Article } from "../lib/articles";

const PAGE_SIZE = 8;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const CATEGORY_COLORS: Record<string, string> = {
  AI:            "bg-violet-100 text-violet-700 border-violet-200",
  Laptops:       "bg-blue-100 text-blue-700 border-blue-200",
  Travel:        "bg-emerald-100 text-emerald-700 border-emerald-200",
  Finance:       "bg-amber-100 text-amber-700 border-amber-200",
  Health:        "bg-rose-100 text-rose-700 border-rose-200",
  Career:        "bg-orange-100 text-orange-700 border-orange-200",
  Smartphones:   "bg-pink-100 text-pink-700 border-pink-200",
  Entertainment: "bg-teal-100 text-teal-700 border-teal-200",
  Apps:          "bg-teal-100 text-teal-700 border-teal-200",
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
  return map[cat] ?? (active ? "bg-slate-600 text-white border-slate-600" : "bg-slate-700/50 text-slate-700 border-slate-300");
}

interface Props { articles: Article[]; categories: string[]; }

export default function ArticlesClient({ articles, categories }: Props) {
  const [active, setActive] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const featured = articles[0];
  const searchResults = query.trim().length > 0
    ? articles.filter((a) => {
        const q = query.toLowerCase();
        return a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) || a.tags.some((t) => t.toLowerCase().includes(q));
      }).slice(0, 8)
    : [];

  const filtered = active ? articles.filter((a) => a.category === active) : articles.slice(1);
  const showFeatured = !active && page === 1 && !searchOpen;
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleCategory(cat: string | null) { setActive(cat); setPage(1); setSearchOpen(false); setQuery(""); }
  function closeSearch() { setSearchOpen(false); setQuery(""); }

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (containerRef.current && !containerRef.current.contains(e.target as Node)) closeSearch(); };
    if (searchOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [searchOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeSearch(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <div>
      {/* Search bar */}
      <div ref={containerRef} className="relative mb-6">
        <div className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 transition-all bg-white/80 ${searchOpen || query ? "border-violet-500 ring-2 ring-violet-500/15" : "border-slate-200 hover:border-slate-300"}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-slate-500">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
          </svg>
          <input
            ref={inputRef} value={query}
            onChange={(e) => { setQuery(e.target.value); if (!searchOpen) { setSearchOpen(true); setActive(null); setPage(1); } }}
            onFocus={() => { setSearchOpen(true); setActive(null); setPage(1); }}
            placeholder="Search articles…"
            className="flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-400 outline-none"
          />
          {query && (
            <button onClick={closeSearch} className="text-slate-500 hover:text-slate-700 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
          )}
        </div>
        {searchOpen && query.trim().length > 0 && (
          <div className="absolute left-0 right-0 top-full z-50 mt-1.5 rounded-xl border border-slate-200 bg-white/80 shadow-xl shadow-slate-300/40 overflow-hidden">
            {searchResults.length === 0
              ? <p className="px-4 py-3 text-sm text-slate-500">No articles found for &ldquo;{query}&rdquo;</p>
              : <ul>{searchResults.map((a) => (
                  <li key={a.slug}>
                    <Link href={`/articles/${a.slug}`} onClick={closeSearch} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-100 transition-colors">
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-medium text-slate-900">{a.title}</p>
                        <p className="text-xs text-slate-500">{a.category} · {formatDate(a.date)}</p>
                      </div>
                      <span className={`shrink-0 inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${categoryClass(a.category)}`}>{a.category}</span>
                    </Link>
                  </li>
                ))}</ul>
            }
          </div>
        )}
      </div>

      {/* Featured article */}
      {showFeatured && (
        <Link href={`/articles/${featured.slug}`} className="group mb-10 flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white/70 transition-all hover:border-violet-200 hover:shadow-lg hover:shadow-slate-300/40 sm:flex-row">
          <div className="relative h-48 w-full shrink-0 sm:h-auto sm:w-64">
            <Image src={featured.heroImage} alt={featured.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900/20" />
          </div>
          <div className="flex flex-1 flex-col justify-center p-6">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${categoryClass(featured.category)}`}>{featured.category}</span>
              <span className="text-xs text-slate-500">{formatDate(featured.date)}</span>
              <span className="text-xs text-slate-700">·</span>
              <span className="text-xs text-slate-500">{featured.readTime} min read</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 group-hover:text-violet-700 transition-colors">{featured.title}</h2>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed line-clamp-2">{featured.description}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {featured.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-400 border border-slate-300">#{tag}</span>
              ))}
            </div>
          </div>
        </Link>
      )}

      {/* Category filters */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-sm font-medium text-slate-500">Browse:</span>
        <button onClick={() => handleCategory(null)} className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-all cursor-pointer ${active === null ? "bg-slate-900 text-white border-slate-900" : "bg-white/80 text-slate-400 border-slate-200 hover:border-slate-300 hover:text-slate-700"}`}>All</button>
        {categories.map((cat) => (
          <button key={cat} onClick={() => handleCategory(active === cat ? null : cat)} className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-all cursor-pointer hover:opacity-90 ${categoryClass(cat, active === cat)}`}>{cat}</button>
        ))}
      </div>

      {/* Article grid */}
      {searchOpen && query.trim().length > 0 ? (
        searchResults.length === 0
          ? <p className="py-10 text-center text-slate-500">No articles found for &ldquo;{query}&rdquo;</p>
          : <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{searchResults.map((a) => <ArticleCard key={a.slug} article={a} categoryClass={categoryClass} />)}</div>
      ) : paginated.length === 0
        ? <p className="py-10 text-center text-slate-500">No articles in this category yet.</p>
        : <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{paginated.map((a) => <ArticleCard key={a.slug} article={a} categoryClass={categoryClass} />)}</div>
      }

      {/* Pagination */}
      {!searchOpen && totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white/80 text-slate-400 transition-all hover:border-violet-200 hover:text-violet-700 disabled:opacity-30 disabled:cursor-not-allowed">‹</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
            const isActive = p === page;
            const isNear = Math.abs(p - page) <= 2 || p === 1 || p === totalPages;
            if (!isNear) { if (p === page - 3 || p === page + 3) return <span key={p} className="text-slate-600 text-sm">…</span>; return null; }
            return <button key={p} onClick={() => setPage(p)} className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-medium transition-all ${isActive ? "bg-violet-600 border-violet-600 text-white" : "border-slate-200 bg-white/80 text-slate-400 hover:border-violet-200 hover:text-violet-700"}`}>{p}</button>;
          })}
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white/80 text-slate-400 transition-all hover:border-violet-200 hover:text-violet-700 disabled:opacity-30 disabled:cursor-not-allowed">›</button>
        </div>
      )}
    </div>
  );
}

function ArticleCard({ article, categoryClass }: { article: Article; categoryClass: (c: string) => string }) {
  return (
    <Link href={`/articles/${article.slug}`} className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white/70 transition-all hover:border-violet-200 hover:shadow-lg hover:shadow-slate-300/40 hover:-translate-y-0.5">
      <div className="relative h-40 w-full overflow-hidden">
        <Image src={article.heroImage} alt={article.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
        <span className={`absolute bottom-3 left-3 inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${categoryClass(article.category)}`}>{article.category}</span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="flex-1 text-sm font-semibold text-slate-900 group-hover:text-violet-700 transition-colors leading-snug">{article.title}</h3>
        <p className="mt-2 text-xs text-slate-400 leading-relaxed line-clamp-2">{article.description}</p>
        <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
          <span>{new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
          <span>·</span>
          <span>{article.readTime} min read</span>
        </div>
      </div>
    </Link>
  );
}
