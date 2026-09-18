import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Simily is shut down. Every request — every page, every route — is
 * rewritten to Next's built-in not-found page, so the whole site serves
 * a real 404 without deleting any code.
 */
export function middleware(request: NextRequest) {
  return NextResponse.rewrite(new URL("/this-page-does-not-exist-404", request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
