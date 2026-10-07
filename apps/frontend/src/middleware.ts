import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";

import { routing } from "~/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Cobro pages are rewritten to the WhatsApp backend — never locale-prefix them.
  if (request.nextUrl.pathname.startsWith("/c/")) {
    return NextResponse.next();
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|trpc|docs|_next|_vercel|.*\\..*).*)"],
};
