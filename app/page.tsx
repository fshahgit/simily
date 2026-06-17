import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CompareForm from "./components/CompareForm";
import LogoAvatar from "./components/LogoAvatar";
import { ALL_ARTICLES } from "./lib/articles";
import { getLatestNews } from "./lib/news";
import { ALL_BEST_TOPICS } from "./lib/best";

export const metadata: Metadata = {
  alternates: { canonical: "https://simily.org" },
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
  { label: "AI Tools", href: "/compare/chatgpt-vs-claude", ring: "from-violet-500/15 to-indigo-500/5", icon: "M12 2a7 7 0 0 0-7 7c0 2.4 1.2 4.5 3 5.7V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.3c1.8-1.2 3-3.3 3-5.7a7 7 0 0 0-7-7Z M9 21h6" },
  { label: "Smartphones", href: "/compare/iphone-16-vs-samsung-galaxy-s25", ring: "from-blue-500/15 to-cyan-500/5", icon: "M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z M11 18h2" },
  { label: "Dev Tools", href: "/compare/react-vs-vue", ring: "from-teal-500/15 to-emerald-500/5", icon: "m8 6-6 6 6 6 M16 6l6 6-6 6 M14 4l-4 16" },
  { label: "Finance", href: "/compare/stripe-vs-paypal", ring: "from-emerald-500/15 to-green-500/5", icon: "M12 2v20 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" },
];

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

export default function Home() {
  const latestArticle = ALL_ARTICLES[ALL_ARTICLES.length - 1];
  const latestNews = getLatestNews();
  const topNews = latestNews?.items.slice(0, 3) ?? [];
  const topBest = ALL_BEST_TOPICS.slice(-4).reverse();

  return (
    <div className="flex flex-col">

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden dot-grid">
        {/* Floating glass orbs */}
        <div className="pointer-events-none absolute -top-10 left-[8%] h-40 w-40 rounded-full bg-gradient-to-br from-violet-400/30 to-indigo-400/10 blur-2xl float-slow" />
        <div className="pointer-events-none absolute top-20 right-[10%] h-52 w-52 rounded-full bg-gradient-to-br from-blue-400/25 to-cyan-300/10 blur-3xl float-slow" style={{ animationDelay: "1.5s" }} />

        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:py-28 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm font-medium text-violet-700">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-500 pulse-ring" />
            Powered by AI · Free to use
          </div>

          <h1 className="max-w-3xl mx-auto text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.05]">
            Compare anything.{" "}
            <span className="gradient-text">Instantly.</span>
          </h1>

          <p className="mt-6 max-w-xl mx-auto text-lg text-slate-500 leading-relaxed">
            Type two things — products, tools, ideas, diets, frameworks — and get a deep AI‑powered comparison in seconds.
          </p>

          <div className="mt-10 w-full max-w-2xl mx-auto">
            <div className="glass-strong rounded-2xl p-2.5">
              <CompareForm />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
            <span className="flex items-center gap-1.5"><span className="text-violet-500">✓</span> No signup required</span>
            <span className="flex items-center gap-1.5"><span className="text-violet-500">✓</span> Instant AI results</span>
            <span className="flex items-center gap-1.5"><span className="text-violet-500">✓</span> 500+ comparisons</span>
          </div>
        </div>
      </section>

      {/* ── BENTO GRID ────────────────────────────────────────────── */}
      <div className="mx-auto w-full max-w-6xl px-4 pb-24 pt-6 space-y-5">

        {/* Row 1 */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

          {/* Popular comparisons */}
          <div className="premium-card lg:col-span-2 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-violet-500 mb-1">Trending Now</p>
                <h2 className="text-lg font-bold text-slate-900">Popular Comparisons</h2>
              </div>
              <Link href="/popular" className="text-xs font-semibold text-violet-600 hover:text-violet-700 transition-colors">View all →</Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {popularComparisons.map(({ a, b }) => {
                const slug = `${a.toLowerCase().replace(/ /g, "-")}-vs-${b.toLowerCase().replace(/ /g, "-")}`;
                return (
                  <Link key={slug} href={`/compare/${slug}`} className="group flex flex-col items-center gap-2 rounded-2xl bg-white/60 border border-white/80 px-3 py-3.5 text-center shadow-sm hover:shadow-md hover:border-violet-300 hover:-translate-y-0.5 transition-all">
                    <div className="flex items-center gap-1.5">
                      <LogoAvatar name={a} size={18} />
                      <span className="font-semibold text-slate-700 group-hover:text-slate-900 text-xs truncate">{a}</span>
                    </div>
                    <span className="text-[10px] font-bold text-violet-500">VS</span>
                    <div className="flex items-center gap-1.5">
                      <LogoAvatar name={b} size={18} />
                      <span className="font-semibold text-slate-700 group-hover:text-slate-900 text-xs truncate">{b}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Categories */}
          <div className="premium-card rounded-3xl p-6 flex flex-col">
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-violet-500 mb-1">Browse by topic</p>
              <h2 className="text-lg font-bold text-slate-900">Categories</h2>
            </div>
            <div className="grid grid-cols-2 gap-3 flex-1">
              {categories.map((cat) => (
                <Link key={cat.label} href={cat.href} className={`group flex flex-col items-center justify-center gap-2.5 rounded-2xl border border-white/80 bg-gradient-to-br ${cat.ring} p-4 text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all`}>
                  <span className="text-violet-600"><Icon d={cat.icon} /></span>
                  <span className="text-xs font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">{cat.label}</span>
                </Link>
              ))}
            </div>
            <Link href="/best" className="mt-4 block text-center text-xs font-semibold text-violet-600 hover:text-violet-700 transition-colors">Best-of guides →</Link>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

          {/* Latest Article */}
          {latestArticle && (
            <Link href={`/articles/${latestArticle.slug}`} className="premium-card group rounded-3xl overflow-hidden flex flex-col">
              {latestArticle.heroImage && (
                <div className="relative h-44 w-full overflow-hidden">
                  <Image src={latestArticle.heroImage} alt={latestArticle.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full glass-strong px-2.5 py-0.5 text-[11px] font-semibold text-teal-700">Latest Article</span>
                  </div>
                </div>
              )}
              <div className="p-5 flex-1 flex flex-col">
                <p className="text-xs text-slate-400 mb-2">{latestArticle.category} · {latestArticle.readTime} min read</p>
                <h3 className="font-bold text-slate-900 leading-snug group-hover:text-violet-700 transition-colors line-clamp-3 flex-1">{latestArticle.title}</h3>
                <p className="mt-3 text-xs font-semibold text-violet-600 group-hover:translate-x-1 transition-transform inline-block">Read article →</p>
              </div>
            </Link>
          )}

          {/* Tech News */}
          <div className="premium-card lg:col-span-2 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-1">Daily digest</p>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  Tech News
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-400"></span>
                  </span>
                </h2>
              </div>
              <Link href="/news" className="text-xs font-semibold text-orange-500 hover:text-orange-600 transition-colors">All stories →</Link>
            </div>
            <div className="space-y-3">
              {topNews.map((item) => (
                <a key={item.id} href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="group flex gap-3 rounded-2xl bg-white/60 border border-white/80 p-3 shadow-sm hover:shadow-md hover:border-orange-200 hover:-translate-y-0.5 transition-all">
                  <div className="relative w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold mb-1 ${
                      item.category === "AI" ? "bg-violet-100 text-violet-700" :
                      item.category === "Blockchain" ? "bg-orange-100 text-orange-700" :
                      "bg-blue-100 text-blue-700"
                    }`}>{item.category}</span>
                    <p className="text-sm font-semibold text-slate-800 group-hover:text-slate-900 line-clamp-2 leading-snug transition-colors">{item.title}</p>
                    <p className="text-xs text-slate-400 mt-1">{item.publisher}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

          {/* Best of guides */}
          <div className="premium-card lg:col-span-2 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-violet-500 mb-1">Curated picks</p>
                <h2 className="text-lg font-bold text-slate-900">Best-Of Guides</h2>
              </div>
              <Link href="/best" className="text-xs font-semibold text-violet-600 hover:text-violet-700 transition-colors">All guides →</Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {topBest.map((topic) => (
                <Link key={topic.slug} href={`/best/${topic.slug}`} className="group rounded-2xl bg-white/60 border border-white/80 p-4 shadow-sm hover:shadow-md hover:border-violet-300 hover:-translate-y-0.5 transition-all">
                  <span className="text-xs font-semibold text-violet-500 uppercase tracking-wide">{topic.category}</span>
                  <p className="mt-1.5 text-sm font-semibold text-slate-800 group-hover:text-slate-900 line-clamp-2 leading-snug transition-colors">{topic.title}</p>
                  <p className="mt-2 text-xs text-slate-400">{topic.items.length} tools ranked</p>
                </Link>
              ))}
            </div>
          </div>

          {/* How it works */}
          <div className="premium-card rounded-3xl p-6 flex flex-col bg-gradient-to-br from-violet-50/80 to-white/60">
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-violet-500 mb-1">Simple as 1-2-3</p>
              <h2 className="text-lg font-bold text-slate-900">How it Works</h2>
            </div>
            <div className="space-y-5 flex-1">
              {[
                { num: "01", title: "Enter two things", desc: "Any two products, tools, ideas, or concepts." },
                { num: "02", title: "AI analyzes instantly", desc: "Deep, unbiased breakdown across key categories." },
                { num: "03", title: "Make a smart call", desc: "Walk away knowing exactly which option wins for you." },
              ].map((step) => (
                <div key={step.num} className="flex gap-4 items-start">
                  <span className="text-2xl font-bold gradient-text leading-none tabular-nums w-8 shrink-0">{step.num}</span>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{step.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/compare" className="mt-6 block text-center rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all">Start comparing →</Link>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 p-8 sm:p-12 text-center shadow-xl shadow-violet-500/20">
          <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-200 mb-3">Free forever</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Stop guessing. Start comparing.</h2>
            <p className="text-violet-100 text-sm max-w-md mx-auto mb-7">Every comparison is AI-powered, free, and instant. No account needed.</p>
            <div className="flex flex-wrap gap-3 items-center justify-center">
              <Link href="/compare" className="rounded-xl bg-white px-8 py-3 text-sm font-semibold text-violet-700 hover:bg-violet-50 shadow-lg transition-colors">Compare anything →</Link>
              <Link href="/articles" className="rounded-xl border border-white/40 bg-white/10 backdrop-blur px-8 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-colors">Read articles</Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
