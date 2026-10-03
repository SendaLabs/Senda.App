import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "always",
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/lista-de-espera": "/lista-de-espera",
    "/empresas": {
      es: "/empresas",
      en: "/business",
    },
  },
});

export type AppLocale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;

export function htmlLang(locale: string) {
  return locale === "es" ? "es-AR" : "en";
}

export function toInternalPathname(pathname: string): AppPathname {
  const stripped = pathname.replace(/^\/(es|en)(?=\/|$)/, "") || "/";
  if (stripped === "/empresas" || stripped === "/business") {
    return "/empresas";
  }
  if (stripped === "/lista-de-espera") {
    return "/lista-de-espera";
  }
  return "/";
}
