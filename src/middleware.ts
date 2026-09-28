import createMiddleware from "next-intl/middleware";

import { routing } from "~/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // /c/* proxies to the WhatsApp bot — must skip locale redirects.
  matcher: ["/((?!api|trpc|docs|_next|_vercel|c(?:/|$)|.*\\..*).*)"],
};
