import { getAffiliateLinks, type AffiliateLink } from "../lib/affiliates";
import LogoAvatar from "./LogoAvatar";

function AffiliateBadge({ link }: { link: AffiliateLink }) {
  const styles: Record<AffiliateLink["type"], string> = {
    amazon:  "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100 hover:border-amber-300",
    trial:   "bg-green-50 border-green-200 text-green-700 hover:bg-green-100 hover:border-green-300",
    deal:    "bg-violet-50 border-violet-200 text-violet-700 hover:bg-violet-100 hover:border-violet-300",
    site:    "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300",
  };

  const icons: Record<AffiliateLink["type"], React.ReactNode> = {
    amazon: (
      <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
        <path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.699-3.182v.685zm3.186 7.705c-.209.189-.512.201-.745.074-1.052-.872-1.238-1.276-1.814-2.106-1.734 1.767-2.962 2.297-5.209 2.297-2.66 0-4.731-1.641-4.731-4.925 0-2.565 1.391-4.309 3.37-5.164 1.715-.754 4.11-.891 5.942-1.095v-.41c0-.753.06-1.642-.383-2.294-.385-.579-1.124-.82-1.775-.82-1.205 0-2.277.618-2.54 1.897-.054.285-.261.567-.549.582l-3.061-.333c-.259-.056-.545-.267-.472-.663C5.855 2.524 8.832 1.5 11.5 1.5c1.39 0 3.206.37 4.305 1.422 1.388 1.297 1.256 3.02 1.256 4.9v4.435c0 1.333.553 1.92 1.073 2.64.184.258.224.566-.01.76l-2.98 2.138zM21.479 19.763c-2.578 1.875-6.315 2.87-9.533 2.87-4.509 0-8.567-1.666-11.633-4.436-.241-.218-.026-.516.264-.346 3.313 1.928 7.409 3.084 11.641 3.084 2.854 0 5.994-.591 8.885-1.817.436-.185.801.286.376.645z" />
      </svg>
    ),
    trial: (
      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    deal: (
      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
    ),
    site: (
      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    ),
  };

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all shadow-sm ${styles[link.type]}`}
    >
      {icons[link.type]}
      {link.label}
    </a>
  );
}

interface AffiliateSectionProps {
  a: string;
  b: string;
  c?: string;
}

export default function AffiliateSection({ a, b, c }: AffiliateSectionProps) {
  const items = [
    { name: a, links: getAffiliateLinks(a) },
    { name: b, links: getAffiliateLinks(b) },
    ...(c ? [{ name: c, links: getAffiliateLinks(c) }] : []),
  ].filter((item) => item.links.length > 0);

  if (items.length === 0) return null;

  const cols = items.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
      <div className="flex items-center gap-2 mb-5">
        <h3 className="font-bold text-white text-lg">Where to Get It</h3>
        <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-600 border border-green-200">
          Best links
        </span>
      </div>

      <div className={`grid gap-4 ${cols}`}>
        {items.map((item) => (
          <div key={item.name} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
            <div className="flex items-center gap-2">
              <LogoAvatar name={item.name} size={28} />
              <span className="font-semibold text-slate-800 text-sm">{item.name}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {item.links.map((link) => (
                <AffiliateBadge key={link.url} link={link} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-slate-400">
        Some links may be affiliate links — we may earn a small commission at no extra cost to you.
      </p>
    </div>
  );
}
