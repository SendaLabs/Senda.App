"use client";

import { useLocale } from "next-intl";
import { useEffect } from "react";

import { htmlLang } from "~/i18n/routing";

export function DocumentLang() {
  const locale = useLocale();

  useEffect(() => {
    document.documentElement.lang = htmlLang(locale);
  }, [locale]);

  return null;
}
