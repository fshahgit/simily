import type { Metadata } from "next";
import Link from "next/link";
import LogoAvatar from "../components/LogoAvatar";
import { ALL_BEST_TOPICS, BEST_CATEGORIES } from "../lib/best";

export const metadata: Metadata = {
  title: "Best Of — AI-Ranked Guides | Simily",
  description: "AI-powered 'best of' guides for tools, apps, and services. Find the best AI chatbot, code editor, note-taking app, VPN, and more.",
  openGraph: {
    title: "Best Of — AI-Ranked Guides | Simily",
    description: "AI-powered best-of guides for tools, apps, and services.",
    url: "https://simily.org/best",
    siteName: "Simily",
    type: "website",
  },
  alternates: { canonical: "https://simily.org/best" },
};

export default function BestPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 space-y-12">
      {/* Hero */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">Best Of Guides</h1>
        <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
          AI-ranked guides to help you pick the right tool, app, or service — without the fluff.
        </p>
      </div>

      {/* Categories */}
      {BEST_CATEGORIES.map((cat) => {
        const topics = ALL_BEST_TOPICS.filter((t) => t.category === cat);
        if (topics.length === 0) return null;
        return (
          <section key={cat} className="space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-violet-400 border-b border-gray-800 pb-2">
              {cat}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {topics.map((topic) => (
                <Link
                  key={topic.slug}
                  href={`/best/${topic.slug}`}
                  className="group flex flex-col gap-3 rounded-2xl border border-gray-800 bg-gray-900 p-5 transition-all hover:border-violet-500/40 hover:bg-gray-800"
                >
                  {/* Item logos */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {topic.items.slice(0, 5).map((item) => (
                      <LogoAvatar key={item} name={item} size={24} />
                    ))}
                    {topic.items.length > 5 && (
                      <span className="text-xs text-gray-600">+{topic.items.length - 5}</span>
                    )}
                  </div>
                  {/* Title */}
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-violet-300 transition-colors text-sm leading-snug">
                      {topic.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{topic.description}</p>
                  </div>
                  <span className="text-xs text-violet-400 font-medium">
                    See rankings →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
