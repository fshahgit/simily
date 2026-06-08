import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CompareForm from "./components/CompareForm";
import LogoAvatar from "./components/LogoAvatar";
import { ALL_ARTICLES } from "./lib/articles";
import { getLatestNews } from "./lib/news";
import { ALL_BEST_TOPICS } from "./lib/best";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.simily.org" },
};

const popularComparisons = [
  { a: "ChatGPT", b: "Claude" },
  { a: "React", b: "Vue" },
  { a: "iPhone 16", b: "Samsung Galaxy S25" },
  { a: "Notion", b: "Obsidian" },
  { a: "Mac", b: "Windows" },
  { a: "Python", b: "JavaScript" },
];

const categories = [
  { label: "AI Tools", emoji: "🤖", href: "/compare/chatgpt-vs-claude", color: "from-violet-500/10 to-violet-600/5 border-violet-500/20" },
  { label: "Smartphones", emoji: "📱", href: "/compare/iphone-16-vs-samsung-galaxy-s25", color: "from-blue-500/10 to-blue-600/5 border-blue-500/20" },
  { label: "Dev Tools", emoji: "⚡", href: "/compare/react-vs-vue", color: "from-teal-500/10 to-teal-600/5 border-teal-500/20" },
  { label: "Finance", emoji: "💰", href: "/compare/stripe-vs-paypal", color: "from-emerald-500/10 to-emerald-600/5 border-emerald-500/20" },
];

export default function Home() {
  const latestArticle = ALL_ARTICLES[ALL_ARTICLES.length - 1];
  const latestNews = getLatestNews();
  const topNews = latestNews?.items.slice(0, 3) ?? [];
  const topBest = ALL_BEST_TOPICS.slice(-4).reverse();

  return (
    <div className="flex flex-col">

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden dot-grid hero-glow">
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:py-28 text-center">
          {/* AI badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-300">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 pulse-ring" />
            Powered by AI · Free to use
          </div>

          <h1 className="max-w-3xl mx-auto text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
            Compare anything.{" "}
            <span className="text-violet-400 glow-text">Instantly.</span>
          </h1>

          <p className="mt-6 max-w-xl mx-auto text-lg text-slate-400 leading-relaxed">
            Type two things — products, tools, ideas, diets, frameworks — and get a deep AI‑powered comparison in seconds.
          </p>

          <div className="mt-10 w-full max-w-2xl mx-auto">
            <CompareForm />
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-500">
            <span className="flex items-center gap-1.5"><span className="text-violet-400">✓</span> No signup required</span>
            <span className="flex items-center gap-1.5"><span className="text-violet-400">✓</span> Instant AI results</span>
            <span className="flex items-center gap-1.5"><span className="text-violet-400">✓</span> 500+ comparisons</span>
          </div>
        </div>
      </section>

      {/* ── BENTO GRID ────────────────────────────────────────────── */}
      <div className="mx-auto w-full max-w-6xl px-4 pb-24 pt-10 space-y-4">

        {/* Row 1: Popular comparisons (large) + Category pills (small) */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

          {/* Popular comparisons — 2/3 width */}
          <div className="bento-card lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">Trending Now</p>
                <h2 className="text-lg font-bold text-white">Popular Comparisons</h2>
              </div>
              <Link href="/popular" className="text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {popularComparisons.map(({ a, b }) => {
                const slug = `${a.toLowerCase().replace(/ /g, "-")}-vs-${b.toLowerCase().replace(/ /g, "-")}`;
                return (
                  <Link
                    key={slug}
                    href={`/compare/${slug}`}
                    className="group flex flex-col items-center gap-2 rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-3.5 text-center text-sm hover:border-violet-500/30 hover:bg-slate-900 transition-all"
                  >
                    <div className="flex items-center gap-1.5">
                      <LogoAvatar name={a} size={18} />
                      <span className="font-medium text-slate-300 group-hover:text-white text-xs truncate">{a}</span>
                    </div>
                    <span className="text-[10px] font-bold text-violet-500">VS</span>
                    <div className="flex items-center gap-1.5">
                      <LogoAvatar name={b} size={18} />
                      <span className="font-medium text-slate-300 group-hover:text-white text-xs truncate">{b}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Categories — 1/3 width */}
          <div className="bento-card rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col">
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">Browse by topic</p>
              <h2 className="text-lg font-bold text-white">Categories</h2>
            </div>
            <div className="grid grid-cols-2 gap-3 flex-1">
              {categories.map((cat) => (
                <Link
                  key={cat.label}
                  href={cat.href}
                  className={`group flex flex-col items-center justify-center gap-2 rounded-xl border bg-gradient-to-br ${cat.color} p-4 text-center hover:scale-[1.02] transition-all`}
                >
                  <span className="text-2xl">{cat.emoji}</span>
                  <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">{cat.label}</span>
                </Link>
              ))}
            </div>
            <Link
              href="/best"
              className="mt-4 block text-center text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors"
            >
              Best-of guides →
            </Link>
          </div>
        </div>

        {/* Row 2: Latest Article (1/3) + News Feed (2/3) */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

          {/* Latest Article */}
          {latestArticle && (
            <Link
              href={`/articles/${latestArticle.slug}`}
              className="bento-card group rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden flex flex-col"
            >
              {latestArticle.heroImage && (
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={latestArticle.heroImage}
                    alt={latestArticle.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full bg-teal-500/20 border border-teal-500/30 px-2.5 py-0.5 text-[11px] font-semibold text-teal-300">
                      Latest Article
                    </span>
                  </div>
                </div>
              )}
              <div className="p-5 flex-1 flex flex-col">
                <p className="text-xs text-slate-500 mb-2">{latestArticle.category} · {latestArticle.readTime} min read</p>
                <h3 className="font-bold text-white leading-snug group-hover:text-violet-300 transition-colors line-clamp-3 flex-1">
                  {latestArticle.title}
                </h3>
                <p className="mt-3 text-xs font-semibold text-violet-400 group-hover:translate-x-1 transition-transform inline-block">
                  Read article →
                </p>
              </div>
            </Link>
          )}

          {/* Tech News */}
          <div className="bento-card lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">Daily digest</p>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  Tech News
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-400"></span>
                  </span>
                </h2>
              </div>
              <Link href="/news" className="text-xs font-medium text-orange-400 hover:text-orange-300 transition-colors">
                All stories →
              </Link>
            </div>
            <div className="space-y-4">
              {topNews.map((item) => (
                <a
                  key={item.id}
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex gap-3 rounded-xl border border-slate-800 bg-slate-950/40 p-3.5 hover:border-orange-500/20 hover:bg-slate-900 transition-all"
                >
                  <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold mb-1 ${
                      item.category === "AI" ? "bg-violet-500/20 text-violet-300" :
                      item.category === "Blockchain" ? "bg-orange-500/20 text-orange-300" :
                      "bg-blue-500/20 text-blue-300"
                    }`}>{item.category}</span>
                    <p className="text-sm font-semibold text-slate-200 group-hover:text-white line-clamp-2 leading-snug transition-colors">
                      {item.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{item.publisher}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Row 3: Best-of guides (2/3) + How it works (1/3) */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

          {/* Best of guides */}
          <div className="bento-card lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">Curated picks</p>
                <h2 className="text-lg font-bold text-white">Best-Of Guides</h2>
              </div>
              <Link href="/best" className="text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors">
                All guides →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {topBest.map((topic) => (
                <Link
                  key={topic.slug}
                  href={`/best/${topic.slug}`}
                  className="group rounded-xl border border-slate-800 bg-slate-950/40 p-4 hover:border-violet-500/30 hover:bg-slate-900 transition-all"
                >
                  <span className="text-xs font-semibold text-violet-400 uppercase tracking-wide">{topic.category}</span>
                  <p className="mt-1.5 text-sm font-semibold text-slate-200 group-hover:text-white line-clamp-2 leading-snug transition-colors">
                    {topic.title}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">{topic.items.length} tools ranked</p>
                </Link>
              ))}
            </div>
          </div>

          {/* How it works */}
          <div className="bento-card rounded-2xl border border-slate-800 bg-gradient-to-br from-violet-950/40 to-slate-900/60 p-6 flex flex-col">
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">Simple as 1-2-3</p>
              <h2 className="text-lg font-bold text-white">How it Works</h2>
            </div>
            <div className="space-y-5 flex-1">
              {[
                { num: "01", title: "Enter two things", desc: "Any two products, tools, ideas, or concepts." },
                { num: "02", title: "AI analyzes instantly", desc: "Deep, unbiased breakdown across key categories." },
                { num: "03", title: "Make a smart call", desc: "Walk away knowing exactly which option wins for you." },
              ].map((step) => (
                <div key={step.num} className="flex gap-4 items-start">
                  <span className="text-2xl font-bold text-violet-500/30 leading-none tabular-nums w-8 shrink-0">{step.num}</span>
                  <div>
                    <p className="font-semibold text-white text-sm">{step.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/compare"
              className="mt-6 block text-center rounded-xl bg-violet-600 hover:bg-violet-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors"
            >
              Start comparing →
            </Link>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bento-card rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-950/60 via-slate-900/60 to-indigo-950/40 p-8 sm:p-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">Free forever</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Stop guessing. Start comparing.
          </h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto mb-7">
            Every comparison is AI-powered, free, and instant. No account needed.
          </p>
          <div className="flex flex-wrap gap-3 items-center justify-center">
            <Link
              href="/compare"
              className="rounded-xl bg-violet-600 hover:bg-violet-500 px-8 py-3 text-sm font-semibold text-white transition-colors"
            >
              Compare anything →
            </Link>
            <Link
              href="/articles"
              className="rounded-xl border border-slate-700 bg-slate-800/60 hover:bg-slate-800 hover:border-slate-600 px-8 py-3 text-sm font-semibold text-slate-300 transition-colors"
            >
              Read articles
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
