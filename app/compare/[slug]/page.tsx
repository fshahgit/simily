import type { Metadata } from "next";
import ComparisonClient from "./ComparisonClient";

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
    title: `${itemA} vs ${itemB} — Simily`,
    description: `AI-powered comparison: ${itemA} vs ${itemB}. Get a full breakdown of pros, cons, scores, and a clear verdict.`,
  };
}

export default async function ComparePage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { a, b } = await searchParams;
  const itemA = a || slug.split("-vs-")[0].replace(/-/g, " ");
  const itemB = b || slug.split("-vs-").slice(1).join("-vs-").replace(/-/g, " ");

  return <ComparisonClient a={itemA} b={itemB} />;
}
