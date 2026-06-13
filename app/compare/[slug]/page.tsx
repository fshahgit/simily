import type { Metadata } from "next";
import ComparisonClient from "./ComparisonClient";
import RelatedComparisons from "../../components/RelatedComparisons";
import LogoAvatar from "../../components/LogoAvatar";
import Script from "next/script";
import Link from "next/link";
import { ALL_COMPARISONS, makeSlug } from "../../lib/comparisons";
import { Redis } from "@upstash/redis";

interface Props {
  params: Promise<{ slug: string }>;
}

/** Derive proper-cased item names from slug, falling back to slug-derived names */
function resolveItems(slug: string): { itemA: string; itemB: string; itemC?: string } {
  const found = ALL_COMPARISONS.find(
    (c) => makeSlug(c.a, c.b) === slug || makeSlug(c.b, c.a) === slug
  );
  if (found) return { itemA: found.a, itemB: found.b };
  const parts = slug.split("-vs-");
  return {
    itemA: parts[0]?.replace(/-/g, " ") ?? "",
    itemB: parts.slice(1).join("-vs-").replace(/-/g, " ") ?? "",
  };
}

export async function generateStaticParams() {
  return ALL_COMPARISONS.map(({ a, b }) => ({ slug: makeSlug(a, b) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { itemA, itemB, itemC } = resolveItems(slug);
  const title = itemC
    ? `${itemA} vs ${itemB} vs ${itemC} — Which is Best? | Simily`
    : `${itemA} vs ${itemB} — Which is Better? | Simily`;
  const description = itemC
    ? `${itemA} vs ${itemB} vs ${itemC}: AI-powered 3-way comparison with scores, pros & cons, and a clear verdict.`
    : `${itemA} vs ${itemB}: AI-powered comparison with scores, pros & cons, and a clear verdict.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://simily.org/compare/${slug}`,
      siteName: "Simily",
      type: "article",
    },
    alternates: {
      canonical: `https://simily.org/compare/${slug}`,
    },
  };
}

async function getCachedComparison(items: string[]) {
  try {
    const redis = new Redis({
      url: process.env.KV_REST_API_URL!,
      token: process.env.KV_REST_API_TOKEN!,
    });
    const key = `compare:v3:${items.map((i) => i.toLowerCase().trim()).join(":")}`;
    const cached = await redis.get(key);
    return cached ?? null;
  } catch {
    return null;
  }
}

export default async function ComparePage({ params }: Props) {
  const { slug } = await params;
  const { itemA, itemB, itemC } = resolveItems(slug);

  const headline = itemC
    ? `${itemA} vs ${itemB} vs ${itemC} — Which is Best?`
    : `${itemA} vs ${itemB} — Which is Better?`;

  const description = itemC
    ? `AI-powered comparison between ${itemA}, ${itemB}, and ${itemC} with detailed scores, pros, cons, and a clear verdict.`
    : `AI-powered comparison between ${itemA} and ${itemB} with detailed scores, pros, cons, and a clear verdict.`;

  const items = [itemA, itemB, ...(itemC ? [itemC] : [])];

  // Fetch cached comparison data so it's server-rendered for SEO
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const initialData = (await getCachedComparison(items)) as any ?? undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    author: { "@type": "Organization", name: "Simily" },
    publisher: { "@type": "Organization", name: "Simily", url: "https://simily.org" },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://simily.org/compare/${slug}` },
    dateModified: new Date().toISOString(),
  };

  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Server-rendered hero — visible to Google without JS */}
      <div className="mx-auto max-w-5xl px-4 pt-8 pb-4">
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link href="/" className="hover:text-slate-700 transition-colors">Home</Link>
          <span>›</span>
          <Link href="/compare" className="hover:text-slate-700 transition-colors">Compare</Link>
          <span>›</span>
          <span className="text-slate-700 truncate">{headline}</span>
        </nav>

        <div className="text-center space-y-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">{headline}</h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto">{description}</p>
          <div className="flex items-center justify-center gap-3 flex-wrap pt-1">
            {items.map((item, i) => (
              <>
                <div key={item} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-4 py-2">
                  <LogoAvatar name={item} size={22} />
                  <span className="font-semibold text-slate-700 text-sm">{item}</span>
                </div>
                {i < items.length - 1 && (
                  <span key={`vs-${i}`} className="text-slate-400 font-bold text-sm">vs</span>
                )}
              </>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison content — server-rendered when cached, client-rendered otherwise */}
      <ComparisonClient a={itemA} b={itemB} c={itemC} initialData={initialData} />

      <div className="mx-auto max-w-5xl px-4 pb-16">
        <RelatedComparisons a={itemA} b={itemB} />
      </div>
    </>
  );
}
