"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import LogoAvatar from "../components/LogoAvatar";
import { type BestTopic, BEST_CATEGORIES, REGIONS } from "../lib/best";

function TopicCard({ topic }: { topic: BestTopic }) {
  return (
    <Link
      href={`/best/${topic.slug}`}
      className="group flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-violet-300 hover:shadow-md hover:bg-slate-50"
    >
      <div className="flex items-center gap-1.5 flex-wrap">
        {topic.items.slice(0, 5).map((item) => (
          <LogoAvatar key={item} name={item} size={24} />
        ))}
        {topic.items.length > 5 && (
          <span className="text-xs text-slate-400">+{topic.items.length - 5}</span>
        )}
      </div>
      <div>
        <h3 className="font-semibold text-slate-900 group-hover:text-violet-600 transition-colors text-sm leading-snug">
          {topic.title}
        </h3>
        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{topic.description}</p>
      </div>
      <span className="text-xs text-violet-600 font-medium">See rankings →</span>
    </Link>
  );
}

interface Props {
  topics: BestTopic[];
}

const ALL_CATS = BEST_CATEGORIES.filter((c) => c !== "By Region");

export default function BestClient({ topics }: Props) {
  const [active, setActive] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const standardTopics = topics.filter((t) => t.category !== "By Region");
  const regionalTopics = topics.filter((t) => t.category === "By Region");

  // Search results — match against title, description, items, category
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

  function openSearch() {
    setSearchOpen(true);
    setActive(null);
    setTimeout(() => inputRef.current?.focus(), 50);
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

  const filteredStandard = active
    ? standardTopics.filter((t) => t.category === active)
    : standardTopics;

  const showRegions = !active || active === "By Region";

  return (
    <div className="space-y-10">
      {/* Filter row */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 text-sm font-medium text-slate-500">Browse:</span>

        {/* All */}
        <button
          onClick={() => { setActive(null); closeSearch(); }}
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
            onClick={() => { setActive(active === cat ? null : cat); closeSearch(); }}
            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-all cursor-pointer ${
              active === cat
                ? "bg-violet-600 text-white border-violet-600"
                : "bg-violet-50 text-violet-600 border-violet-200 hover:border-violet-400"
            }`}
          >
            {cat}
          </button>
        ))}

        <button
          onClick={() => { setActive(active === "By Region" ? null : "By Region"); closeSearch(); }}
          className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-all cursor-pointer ${
            active === "By Region"
              ? "bg-teal-600 text-white border-teal-600"
              : "bg-teal-50 text-teal-600 border-teal-200 hover:border-teal-400"
          }`}
        >
          By Region
        </button>

        {/* Search icon / input */}
        <div ref={containerRef} className="relative ml-1">
          {!searchOpen ? (
            <button
              onClick={openSearch}
              aria-label="Search guides"
              className="inline-flex items-center justify-center h-7 w-7 rounded-full border border-slate-300 bg-white text-slate-400 hover:border-violet-400 hover:text-violet-600 transition-all cursor-pointer shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
              </svg>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 rounded-full border border-violet-400 bg-white px-3 py-1 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-violet-500 shrink-0">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search guides…"
                className="w-36 bg-transparent text-xs text-slate-900 placeholder-slate-400 outline-none"
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18M6 6l12 12"/>
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* Dropdown */}
          {searchOpen && query.trim().length > 0 && (
            <div className="absolute left-0 top-full z-50 mt-2 w-72 rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden">
              {searchResults.length === 0 ? (
                <p className="px-4 py-3 text-xs text-slate-400">No guides found for &ldquo;{query}&rdquo;</p>
              ) : (
                <ul>
                  {searchResults.map((topic) => (
                    <li key={topic.slug}>
                      <Link
                        href={`/best/${topic.slug}`}
                        onClick={closeSearch}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex shrink-0 -space-x-1.5">
                          {topic.items.slice(0, 3).map((item) => (
                            <LogoAvatar key={item} name={item} size={20} />
                          ))}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-xs font-medium text-slate-900">{topic.title}</p>
                          <p className="text-xs text-slate-400">{topic.category}</p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto shrink-0 text-slate-300">
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
      </div>

      {/* Content */}
      {!(searchOpen && query.trim().length > 0) && (
        <>
          {/* Standard categories */}
          {active === null ? (
            ALL_CATS.map((cat) => {
              const catTopics = standardTopics.filter((t) => t.category === cat);
              if (catTopics.length === 0) return null;
              return (
                <section key={cat} className="space-y-4">
                  <h2 className="text-xs font-semibold uppercase tracking-widest text-violet-600 border-b border-slate-200 pb-2">
                    {cat}
                  </h2>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {catTopics.map((topic) => (
                      <TopicCard key={topic.slug} topic={topic} />
                    ))}
                  </div>
                </section>
              );
            })
          ) : active !== "By Region" ? (
            <section className="space-y-4">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-violet-600 border-b border-slate-200 pb-2">
                {active}
              </h2>
              {filteredStandard.length === 0 ? (
                <p className="py-8 text-center text-slate-400">No guides in this category yet.</p>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredStandard.map((topic) => (
                    <TopicCard key={topic.slug} topic={topic} />
                  ))}
                </div>
              )}
            </section>
          ) : null}

          {/* By Region */}
          {showRegions && regionalTopics.length > 0 && (
            <section className="space-y-8">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-violet-600 border-b border-slate-200 pb-2">
                By Region
              </h2>
              {REGIONS.map((region) => {
                const regionTopics = regionalTopics.filter((t) => t.region === region);
                if (regionTopics.length === 0) return null;
                return (
                  <div key={region} className="space-y-3">
                    <h3 className="text-sm font-semibold text-slate-700">{region}</h3>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {regionTopics.map((topic) => (
                        <TopicCard key={topic.slug} topic={topic} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </section>
          )}
        </>
      )}
    </div>
  );
}
