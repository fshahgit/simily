import type { Metadata } from "next";
import ComparisonClient from "./ComparisonClient";
import Script from "next/script";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ a?: string; b?: string }>;
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { a, b } = await searchParams;
  const itemA = a || slug.split("-vs-")[0].replace(/-/g, " ");
  const itemB = b || slug.split("-vs-")[1]?.replace(/-/g, " ") || "";
  return {
    title: `${itemA} vs ${itemB} — Which is Better? | Simily`,
    description: `${itemA} vs ${itemB}: AI-powered comparison with scores, pros & cons, and a clear verdict. Find out which one is right for you.`,
    openGraph: {
      title: `${itemA} vs ${itemB} — Which is Better?`,
      description: `AI-powered comparison: ${itemA} vs ${itemB}. Full breakdown of pros, cons, scores, and verdict.`,
      url: `https://simily.org/compare/${slug}`,
      siteName: "Simily",
      type: "article",
    },
    alternates: {
      canonical: `https://simily.org/compare/${slug}?a=${encodeURIComponent(itemA)}&b=${encodeURIComponent(itemB)}`,
    },
  };
}

export default async function ComparePage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { a, b } = await searchParams;
  const itemA = a || slug.split("-vs-")[0].replace(/-/g, " ");
  const itemB = b || slug.split("-vs-").slice(1).join("-vs-").replace(/-/g, " ");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${itemA} vs ${itemB} — Which is Better?`,
    description: `AI-powered comparison between ${itemA} and ${itemB} with detailed scores, pros, cons, and a clear verdict.`,
    author: { "@type": "Organization", name: "Simily" },
    publisher: {
      "@type": "Organization",
      name: "Simily",
      url: "https://simily.org",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://simily.org/compare/${slug}`,
    },
    dateModified: new Date().toISOString(),
  };

  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ComparisonClient a={itemA} b={itemB} />
    </>
  );
}
