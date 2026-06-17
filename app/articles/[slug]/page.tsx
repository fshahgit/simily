import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ALL_ARTICLES, getArticle } from "../../lib/articles";
import { makeSlug } from "../../lib/comparisons";
import LogoAvatar from "../../components/LogoAvatar";
import ReadingProgress from "../../components/ReadingProgress";
import ShareButtons from "../../components/ShareButtons";


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
    keywords: article.tags.join(", "),
    alternates: { canonical: `https://simily.org/articles/${slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://simily.org/articles/${slug}`,
      type: "article",
      publishedTime: article.date,
      images: [{ url: article.heroImage, width: 1200, height: 630 }],
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

function categoryClass(_cat: string) {
  return "bg-violet-100 text-violet-700 border-violet-200";
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
    author: { "@type": "Organization", name: article.author },
    publisher: { "@type": "Organization", name: "Simily", url: "https://simily.org" },
    url: `https://simily.org/articles/${slug}`,
    image: article.heroImage,
    keywords: article.tags.join(", "),
  };

  // Other articles for "More Articles" section — sorted by date, newest first
  const moreArticles = [...ALL_ARTICLES]
    .sort((a, b) => b.date.localeCompare(a.date))
    .filter((a) => a.slug !== slug)
    .slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Reading progress bar */}
      <ReadingProgress />

      {/* Hero image — full width, taller */}
      <div className="relative h-72 w-full overflow-hidden sm:h-96 lg:h-[28rem]">
        <Image
          src={article.heroImage}
          alt={article.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
        {/* Title overlay on image */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <div className="mx-auto max-w-3xl">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full border border-white/30 bg-white/15 backdrop-blur px-2.5 py-0.5 text-xs font-medium text-white">
                {article.category}
              </span>
              <span className="text-sm text-slate-200">{formatDate(article.date)}</span>
              <span className="text-slate-400">·</span>
              <span className="text-sm text-slate-200">{article.readTime} min read</span>
              <span className="text-slate-400">·</span>
              <span className="text-sm text-slate-200">By {article.author}</span>
            </div>
            <h1 className="text-2xl font-bold leading-tight text-white sm:text-4xl drop-shadow-md">
              {article.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 pb-16">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 pt-6 text-sm text-slate-400">
          <Link href="/" className="hover:text-slate-700 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/articles" className="hover:text-slate-700 transition-colors">Articles</Link>
          <span>/</span>
          <span className="truncate max-w-[180px] text-slate-600">{article.title}</span>
        </nav>

        {/* Lead / description */}
        <p className="mb-6 border-l-4 border-violet-500 pl-4 text-lg leading-relaxed text-slate-600">
          {article.description}
        </p>

        {/* Share buttons */}
        <ShareButtons
          title={article.title}
          url={`https://simily.org/articles/${slug}`}
        />

        {/* Key Takeaways box */}
        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
          <div className="mb-10 rounded-2xl border border-violet-200 bg-violet-50 p-5">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-violet-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
              Key Takeaways
            </h2>
            <ul className="space-y-2">
              {article.keyTakeaways.map((t, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Article body */}
        <article className="space-y-10">
          {article.sections.map((section, i) => (
            <section key={i}>
              {section.heading && (
                <h2 className="mb-5 flex items-center gap-3 text-xl font-bold text-slate-900 sm:text-2xl">
                  <span className="h-6 w-1 shrink-0 rounded-full bg-violet-500" />
                  {section.heading}
                </h2>
              )}

              {section.body.split("\n\n").map((para, j) => (
                <p
                  key={j}
                  className={`mb-5 text-[1.05rem] leading-[1.85] text-slate-600 ${
                    i === 0 && j === 0
                      ? "first-letter:float-left first-letter:mr-2 first-letter:text-5xl first-letter:font-bold first-letter:leading-none first-letter:text-violet-600"
                      : ""
                  }`}
                >
                  {para}
                </p>
              ))}

              {/* Inline section image — authored per section, guaranteed unique */}
              {section.image && (
                <figure className="my-6 overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                  <div className="relative h-56 w-full sm:h-72">
                    <Image
                      src={section.image.src}
                      alt={section.image.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="bg-white/50 px-4 py-2.5 text-xs text-slate-400 leading-relaxed border-t border-slate-200">
                    📷 {section.image.caption}
                  </figcaption>
                </figure>
              )}

              {section.quote && (
                <blockquote className="my-6 border-l-4 border-violet-500 pl-5">
                  <p className="text-lg font-medium italic leading-relaxed text-slate-700">
                    &ldquo;{section.quote}&rdquo;
                  </p>
                </blockquote>
              )}

              {section.callout && (
                <div className="my-5 flex gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-blue-500"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                  <p className="text-sm leading-relaxed text-blue-700">{section.callout}</p>
                </div>
              )}

              {section.list && (
                <ul className="mt-3 space-y-2.5">
                  {section.list.map((item, k) => (
                    <li key={k} className="flex items-start gap-3 text-base text-slate-600">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>

        {/* Tags */}
        <div className="mt-10 flex flex-wrap gap-2 border-t border-slate-200 pt-8">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-400 border border-slate-300"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Sources / References */}
        {article.sources && article.sources.length > 0 && (
          <div className="mt-8 rounded-xl border border-slate-200 bg-white/70 p-5">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
              Sources & References
            </h3>
            <ul className="space-y-2">
              {article.sources.map((src, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="mt-0.5 text-slate-400">{i + 1}.</span>
                  <div>
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-violet-600 hover:text-violet-700 hover:underline transition-colors"
                    >
                      {src.title}
                    </a>
                    <span className="ml-1.5 text-xs text-slate-400">— {src.publisher}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Related comparisons */}
        {article.relatedComparisons && article.relatedComparisons.length > 0 && (
          <div className="mt-10">
            <h2 className="mb-4 text-lg font-bold text-slate-900">Compare These Yourself</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {article.relatedComparisons.map(({ a, b }) => {
                const compSlug = makeSlug(a, b);
                return (
                  <Link
                    key={compSlug}
                    href={`/compare/${compSlug}?a=${encodeURIComponent(a)}&b=${encodeURIComponent(b)}`}
                    className="group flex flex-col items-center gap-1.5 rounded-xl border border-slate-200 bg-white/70 px-4 py-4 text-center text-sm transition-all hover:border-violet-200 hover:bg-slate-100"
                  >
                    <div className="flex items-center gap-1.5">
                      <LogoAvatar name={a} size={18} />
                      <span className="font-medium text-slate-700 group-hover:text-slate-900">{a}</span>
                    </div>
                    <span className="text-xs text-violet-600 font-bold">VS</span>
                    <div className="flex items-center gap-1.5">
                      <LogoAvatar name={b} size={18} />
                      <span className="font-medium text-slate-700 group-hover:text-slate-900">{b}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* More articles */}
        <div className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="mb-5 text-lg font-bold text-slate-900">More Articles</h2>
          <div className="space-y-3">
            {moreArticles.map((a) => (
              <Link
                key={a.slug}
                href={`/articles/${a.slug}`}
                className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white/70 p-4 transition-all hover:border-violet-200 hover:bg-slate-100"
              >
                <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg">
                  <Image src={a.heroImage} alt={a.title} fill className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-900 group-hover:text-violet-700 transition-colors">
                    {a.title}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">{a.readTime} min read · {a.category}</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-slate-700 group-hover:text-violet-500 transition-colors">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            ))}
          </div>
        </div>

        {/* Back link */}
        <div className="mt-8">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
          >
            ← Back to all articles
          </Link>
        </div>
      </div>
    </>
  );
}
