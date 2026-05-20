import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ALL_ARTICLES, getArticle } from "../../lib/articles";
import { makeSlug } from "../../lib/comparisons";
import LogoAvatar from "../../components/LogoAvatar";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ALL_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} — Simily`,
    description: article.description,
    alternates: { canonical: `https://www.simily.org/articles/${slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://www.simily.org/articles/${slug}`,
      type: "article",
      publishedTime: article.date,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const CATEGORY_COLORS: Record<string, string> = {
  AI: "bg-violet-500/15 text-violet-300 border-violet-500/30",
  Laptops: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  Apps: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  Phones: "bg-orange-500/15 text-orange-300 border-orange-500/30",
};

function categoryClass(cat: string) {
  return CATEGORY_COLORS[cat] ?? "bg-gray-500/15 text-gray-300 border-gray-500/30";
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    publisher: { "@type": "Organization", name: "Simily" },
    url: `https://www.simily.org/articles/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-3xl px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/articles" className="hover:text-gray-300 transition-colors">Articles</Link>
          <span>/</span>
          <span className="text-gray-400 truncate max-w-[200px]">{article.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${categoryClass(article.category)}`}
            >
              {article.category}
            </span>
            <span className="text-sm text-gray-500">{formatDate(article.date)}</span>
            <span className="text-sm text-gray-500">·</span>
            <span className="text-sm text-gray-500">{article.readTime} min read</span>
          </div>

          <div className="mb-4 flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-violet-500/10 text-3xl">
              {article.coverEmoji}
            </div>
            <h1 className="text-2xl font-bold text-white leading-snug sm:text-3xl">
              {article.title}
            </h1>
          </div>

          <p className="text-lg text-gray-400 leading-relaxed border-l-2 border-violet-500/50 pl-4">
            {article.description}
          </p>
        </header>

        {/* Article body */}
        <article className="space-y-8">
          {article.sections.map((section, i) => (
            <section key={i}>
              {section.heading && (
                <h2 className="mb-3 text-xl font-bold text-white">{section.heading}</h2>
              )}
              {section.body.split("\n\n").map((para, j) => (
                <p key={j} className="mb-4 text-gray-300 leading-relaxed">
                  {para}
                </p>
              ))}
              {section.list && (
                <ul className="mt-3 space-y-2">
                  {section.list.map((item, k) => (
                    <li key={k} className="flex items-start gap-2 text-gray-300">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>

        {/* Related comparisons */}
        {article.relatedComparisons && article.relatedComparisons.length > 0 && (
          <div className="mt-12 border-t border-gray-800 pt-10">
            <h2 className="mb-4 text-lg font-bold text-white">Compare These Yourself</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {article.relatedComparisons.map(({ a, b }) => {
                const slug = makeSlug(a, b);
                return (
                  <Link
                    key={slug}
                    href={`/compare/${slug}?a=${encodeURIComponent(a)}&b=${encodeURIComponent(b)}`}
                    className="group flex flex-col items-center gap-1.5 rounded-xl border border-gray-800 bg-gray-900 px-4 py-4 text-center text-sm transition-all hover:border-violet-500/50 hover:bg-gray-800"
                  >
                    <div className="flex items-center gap-1.5">
                      <LogoAvatar name={a} size={18} />
                      <span className="font-medium text-gray-200 group-hover:text-white">{a}</span>
                    </div>
                    <span className="text-xs text-violet-400 font-bold">VS</span>
                    <div className="flex items-center gap-1.5">
                      <LogoAvatar name={b} size={18} />
                      <span className="font-medium text-gray-200 group-hover:text-white">{b}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Back link */}
        <div className="mt-10 border-t border-gray-800 pt-8">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            ← Back to all articles
          </Link>
        </div>
      </div>
    </>
  );
}
