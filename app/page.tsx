import type { Metadata } from "next";
import Link from "next/link";
import CompareForm from "./components/CompareForm";
import LogoAvatar from "./components/LogoAvatar";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.simily.org",
  },
};

const popularComparisons = [
  { a: "iPhone 16", b: "Samsung Galaxy S25" },
  { a: "React", b: "Vue" },
  { a: "Notion", b: "Obsidian" },
  { a: "Keto Diet", b: "Intermittent Fasting" },
  { a: "Python", b: "JavaScript" },
  { a: "Netflix", b: "Disney+" },
  { a: "Mac", b: "Windows" },
  { a: "ChatGPT", b: "Claude" },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-4 py-24 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-300 bg-violet-50 px-4 py-1.5 text-sm text-violet-600">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-500 animate-pulse" />
          Powered by AI
        </div>
        <h1 className="max-w-3xl text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl">
          Compare anything.{" "}
          <span className="text-violet-600">Instantly.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-slate-500 leading-relaxed">
          Type two things — products, tools, ideas, diets, frameworks — and get a deep AI-powered comparison in seconds.
        </p>
        <div className="mt-10 w-full max-w-2xl">
          <CompareForm />
        </div>
      </section>

      {/* Popular comparisons */}
      <section className="mx-auto w-full max-w-5xl px-4 pb-24">
        <h2 className="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-slate-400">
          Popular Comparisons
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {popularComparisons.map(({ a, b }) => {
            const slug = `${encodeURIComponent(a.toLowerCase().replace(/ /g, "-"))}-vs-${encodeURIComponent(b.toLowerCase().replace(/ /g, "-"))}`;
            return (
              <Link
                key={slug}
                href={`/compare/${slug}?a=${encodeURIComponent(a)}&b=${encodeURIComponent(b)}`}
                className="group flex flex-col items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-4 text-center text-sm shadow-sm transition-all hover:border-violet-300 hover:shadow-md hover:bg-slate-50"
              >
                <div className="flex items-center justify-center gap-1.5">
                  <LogoAvatar name={a} size={20} />
                  <span className="font-medium text-slate-700 group-hover:text-slate-900">{a}</span>
                </div>
                <span className="text-xs text-violet-600 font-bold">VS</span>
                <div className="flex items-center justify-center gap-1.5">
                  <LogoAvatar name={b} size={20} />
                  <span className="font-medium text-slate-700 group-hover:text-slate-900">{b}</span>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/popular"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-600 shadow-sm transition-all hover:border-violet-300 hover:bg-slate-50 hover:text-slate-900"
          >
            View All Comparisons
            <span className="text-violet-600">→</span>
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-slate-200 bg-white py-20 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-slate-900">How Simily Works</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              { icon: "✏️", title: "Enter two things", desc: "Type any two items you want to compare — no limits on category." },
              { icon: "⚡", title: "AI analyzes instantly", desc: "Our AI researches and structures a clear, unbiased side-by-side breakdown." },
              { icon: "✅", title: "Make a smart decision", desc: "Walk away knowing exactly which option suits your needs better." },
            ].map((step) => (
              <div key={step.title} className="flex flex-col items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 border border-violet-100 text-2xl">
                  {step.icon}
                </div>
                <h3 className="font-semibold text-slate-900">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
