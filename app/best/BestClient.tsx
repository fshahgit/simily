"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import LogoAvatar from "../components/LogoAvatar";
import { type BestTopic, BEST_CATEGORIES } from "../lib/best";

const PAGE_SIZE = 8;

function catClass(_cat: string, active = false) {
  if (active) return "bg-violet-600 text-white border-violet-600";
  return "bg-white text-slate-600 border-slate-200 hover:border-violet-300 hover:text-violet-600";
}

function TopicCard({ topic }: { topic: BestTopic }) {
  return (
    <Link href={`/best/${topic.slug}`} className="group flex flex-col gap-3 rounded-xl border border-slate-200 bg-white/70 p-5 transition-all hover:border-violet-200 hover:shadow-lg hover:shadow-slate-300/40 hover:-translate-y-0.5">
      <div className="flex items-center gap-1.5 flex-wrap">
        {topic.items.slice(0, 5).map((item) => <LogoAvatar key={item} name={item} size={24} />)}
        {topic.items.length > 5 && <span className="text-xs text-slate-500">+{topic.items.length - 5}</span>}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-slate-900 group-hover:text-violet-700 transition-colors text-sm leading-snug">{topic.title}</h3>
        <p className="text-xs text-slate-400 mt-1 line-clamp-2">{topic.description}</p>
      </div>
      <div className="flex items-center justify-between">
        <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${catClass(topic.category)}`}>{topic.category}</span>
        <span className="text-xs text-violet-600 font-medium group-hover:translate-x-0.5 transition-transform">See rankings →</span>
      </div>
    </Link>
  );
}

interface Props { topics: BestTopic[]; }

export default function BestClient({ topics }: Props) {
  const [active, setActive] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const featured = topics[0];
  const filtered = active ? topics.filter((t) => t.category === active) : topics.slice(1);
  const showFeatured = !active && page === 1 && !searchOpen;
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const searchResults = query.trim().length > 0
    ? topics.filter((t) => { const q = query.toLowerCase(); return t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q) || t.items.some((i) => i.toLowerCase().includes(q)); }).slice(0, 8)
    : [];

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
          <input ref={inputRef} value={query}
            onChange={(e) => { setQuery(e.target.value); if (!searchOpen) { setSearchOpen(true); setActive(null); setPage(1); } }}
            onFocus={() => { setSearchOpen(true); setActive(null); setPage(1); }}
            placeholder="Search best-of guides…"
            className="flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-400 outline-none"
          />
          {query && <button onClick={closeSearch} className="text-slate-500 hover:text-slate-700 cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button>}
        </div>
        {searchOpen && query.trim().length > 0 && (
          <div className="absolute left-0 right-0 top-full z-50 mt-1.5 rounded-xl border border-slate-200 bg-white/80 shadow-xl shadow-slate-300/40 overflow-hidden">
            {searchResults.length === 0
              ? <p className="px-4 py-3 text-sm text-slate-500">No guides found for &ldquo;{query}&rdquo;</p>
              : <ul>{searchResults.map((t) => (
                  <li key={t.slug}>
                    <Link href={`/best/${t.slug}`} onClick={closeSearch} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-100 transition-colors">
                      <div className="flex shrink-0 -space-x-1.5">{t.items.slice(0, 3).map((i) => <LogoAvatar key={i} name={i} size={22} />)}</div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-slate-900">{t.title}</p>
                        <p className="text-xs text-slate-500">{t.category}</p>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-slate-600"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </Link>
                  </li>
                ))}</ul>
            }
          </div>
        )}
      </div>

      {/* Featured topic */}
      {showFeatured && featured && (
        <Link href={`/best/${featured.slug}`} className="group mb-10 flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white/70 transition-all hover:border-violet-200 hover:shadow-lg hover:shadow-slate-300/40 sm:flex-row">
          <div className="flex shrink-0 items-center justify-center bg-gradient-to-br from-violet-950/60 to-slate-900 p-8 sm:w-64">
            <div className="flex flex-wrap items-center justify-center gap-3 max-w-[180px]">
              {featured.items.slice(0, 6).map((item) => <LogoAvatar key={item} name={item} size={40} />)}
              {featured.items.length > 6 && <span className="text-sm text-slate-500 font-medium">+{featured.items.length - 6}</span>}
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-center p-6">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${catClass(featured.category)}`}>{featured.category}</span>
              <span className="text-xs text-slate-500">Latest guide</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 group-hover:text-violet-700 transition-colors">{featured.title}</h2>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed line-clamp-2">{featured.description}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {featured.items.slice(0, 5).map((item) => (
                <span key={item} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-400 border border-slate-300">{item}</span>
              ))}
            </div>
          </div>
        </Link>
      )}

      {/* Category filters */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-sm font-medium text-slate-500">Browse:</span>
        <button onClick={() => handleCategory(null)} className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-all cursor-pointer ${active === null && !searchOpen ? "bg-violet-600 text-white border-violet-600" : "bg-white text-slate-600 border-slate-200 hover:border-violet-300 hover:text-violet-600"}`}>All</button>
        {BEST_CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => handleCategory(active === cat ? null : cat)} className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-all cursor-pointer hover:opacity-90 ${catClass(cat, active === cat)}`}>{cat}</button>
        ))}
      </div>

      {/* Grid */}
      {searchOpen && query.trim().length > 0
        ? (searchResults.length === 0 ? <p className="py-10 text-center text-slate-500">No guides found for &ldquo;{query}&rdquo;</p> : <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{searchResults.map((t) => <TopicCard key={t.slug} topic={t} />)}</div>)
        : (paginated.length === 0 ? <p className="py-10 text-center text-slate-500">No guides in this category yet.</p> : <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{paginated.map((t) => <TopicCard key={t.slug} topic={t} />)}</div>)
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
