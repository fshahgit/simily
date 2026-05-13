import Link from "next/link";
import LogoAvatar from "./LogoAvatar";
import { getRelated, makeSlug } from "../lib/comparisons";

interface Props {
  a: string;
  b: string;
}

export default function RelatedComparisons({ a, b }: Props) {
  const related = getRelated(a, b, 6);
  if (related.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold text-gray-400 text-center tracking-wide uppercase text-xs">
        People Also Compare
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {related.map(({ a: ra, b: rb }) => {
          const slug = makeSlug(ra, rb);
          return (
            <Link
              key={slug}
              href={`/compare/${slug}?a=${encodeURIComponent(ra)}&b=${encodeURIComponent(rb)}`}
              className="flex items-center gap-3 rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 transition-all hover:border-violet-500/40 hover:bg-gray-800 group"
            >
              <LogoAvatar name={ra} size={28} />
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-white truncate group-hover:text-violet-300 transition-colors">
                  {ra} vs {rb}
                </span>
                <span className="text-xs text-gray-500 mt-0.5">AI Comparison</span>
              </div>
              <LogoAvatar name={rb} size={28} className="ml-auto shrink-0" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
