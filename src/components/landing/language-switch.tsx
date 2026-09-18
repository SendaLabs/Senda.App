"use client";

import { useLocale, useTranslations } from "next-intl";

import { Link } from "~/i18n/navigation";
import { cn } from "~/lib/utils";

export function LanguageSwitch({ className }: { className?: string }) {
  const locale = useLocale();
  const t = useTranslations("nav");

  return (
    <div
      className={cn("flex items-center gap-1 text-[0.95rem]", className)}
      role="group"
      aria-label={t("language")}
    >
      <Link
        href="/"
        locale="es"
        className={cn(
          "inline-flex min-h-11 min-w-11 items-center justify-center text-charcoal underline-offset-4 hover:underline",
          locale === "es" && "text-forest font-semibold",
        )}
      >
        ES
      </Link>
      <span className="text-charcoal/40" aria-hidden>
        /
      </span>
      <Link
        href="/"
        locale="en"
        className={cn(
          "inline-flex min-h-11 min-w-11 items-center justify-center text-charcoal underline-offset-4 hover:underline",
          locale === "en" && "text-forest font-semibold",
        )}
      >
        EN
      </Link>
    </div>
  );
}
