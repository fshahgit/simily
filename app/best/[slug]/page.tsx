import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBestTopic } from "../../lib/best";
import BestClient from "./BestClient";
import LogoAvatar from "../../components/LogoAvatar";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const topic = getBestTopic(slug);
  if (!topic) return {};

  return {
    title: `${topic.title} in 2025 | Simily`,
    description: topic.description,
    openGraph: {
      title: `${topic.title} in 2025 | Simily`,
      description: topic.description,
      url: `https://simily.org/best/${slug}`,
      siteName: "Simily",
      type: "article",
    },
    alternates: {
      canonical: `https://simily.org/best/${slug}`,
    },
  };
}

export default async function BestPage({ params }: Props) {
  const { slug } = await params;
  const topic = getBestTopic(slug);
  if (!topic) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${topic.title} in 2025`,
    description: topic.description,
    author: { "@type": "Organization", name: "Simily" },
    publisher: { "@type": "Organization", name: "Simily", url: "https://simily.org" },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://simily.org/best/${slug}` },
    dateModified: new Date().toISOString(),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-3xl px-4 py-12 space-y-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/best" className="hover:text-gray-300 transition-colors">Best Lists</Link>
          <span>›</span>
          <span className="text-gray-400">{topic.title}</span>
        </nav>

        {/* Hero */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-400 uppercase tracking-wider">
            {topic.category}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            {topic.title}
          </h1>
          <p className="text-gray-500 text-sm">AI-ranked · Updated 2025</p>

          {/* Items preview */}
          <div className="flex items-center justify-center gap-2 flex-wrap pt-1">
            {topic.items.map((item) => (
              <div key={item} className="flex items-center gap-1.5 rounded-xl border border-gray-800 bg-gray-900 px-3 py-1.5">
                <LogoAvatar name={item} size={18} />
                <span className="text-xs text-gray-300 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI-generated content */}
        <BestClient slug={slug} title={topic.title} items={topic.items} />
      </div>
    </>
  );
}
