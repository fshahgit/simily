"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/search", label: "Search", sm: true },
  { href: "/popular", label: "Popular", sm: true },
  { href: "/best", label: "Best Of", sm: false },
  { href: "/articles", label: "Articles", sm: false },
] as const;

export default function NavLinks() {
  const pathname = usePathname();

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <nav className="flex items-center gap-4 sm:gap-6 text-sm font-medium">
      {links.map(({ href, label, sm }) => (
        <Link
          key={href}
          href={href}
          className={`transition-colors duration-150 ${sm ? "hidden sm:block" : ""} ${
            isActive(href)
              ? "text-violet-600"
              : "text-slate-900 hover:text-violet-600"
          }`}
        >
          {label}
        </Link>
      ))}
      <Link
        href="/news"
        className={`flex items-center gap-1.5 transition-colors duration-150 ${
          isActive("/news") ? "text-violet-600" : "text-slate-900 hover:text-violet-600"
        }`}
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-400" />
        </span>
        News
      </Link>
    </nav>
  );
}
