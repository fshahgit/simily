import type { Metadata } from "next";
import ComparisonClient from "./ComparisonClient";
import RelatedComparisons from "../../components/RelatedComparisons";
import Script from "next/script";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ a?: string; b?: string; c?: string }>;
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { a, b, c } = await searchParams;
  const itemA = a || slug.split("-vs-")[0].replace(/-/g, " ");
  const itemB = b || slug.split("-vs-")[1]?.replace(/-/g, " ") || "";
  const itemC = c;
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
      canonical: `https://simily.org/compare/${slug}?a=${encodeURIComponent(itemA)}&b=${encodeURIComponent(itemB)}${itemC ? `&c=${encodeURIComponent(itemC)}` : ""}`,
    },
  };
}

export default async function ComparePage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { a, b, c } = await searchParams;
  const itemA = a || slug.split("-vs-")[0].replace(/-/g, " ");
  const itemB = b || slug.split("-vs-").slice(1).join("-vs-").replace(/-/g, " ");
  const itemC = c;

  const headline = itemC
    ? `${itemA} vs ${itemB} vs ${itemC} — Which is Best?`
    : `${itemA} vs ${itemB} — Which is Better?`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description: `AI-powered comparison between ${itemA}, ${itemB}${itemC ? `, and ${itemC}` : ""} with detailed scores, pros, cons, and a clear verdict.`,
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
      <ComparisonClient a={itemA} b={itemB} c={itemC} />
      <div className="mx-auto max-w-5xl px-4 pb-16">
        <RelatedComparisons a={itemA} b={itemB} />
      </div>
    </>
  );
}
