"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "~/components/ui/button";
import {
  getMarketingStartHref,
  isInternalMarketingPath,
} from "~/lib/marketing-cta";
import { site } from "~/lib/site";

export function QuoteCard() {
  const t = useTranslations("quote");
  const locale = useLocale();
  const [usd, setUsd] = useState(200);
  const numberLocale = locale === "es" ? "es-AR" : "en-US";
  const money = useMemo(
    () => new Intl.NumberFormat(numberLocale, { maximumFractionDigits: 0 }),
    [numberLocale],
  );

  const ars = useMemo(
    () => Math.round(usd * site.exampleUsdToArs),
    [usd],
  );

  return (
    <form
      className="text-charcoal w-full max-w-full rounded-2xl bg-cream p-5 shadow-[0_16px_40px_rgba(18,60,54,0.18)] md:p-7"
      onSubmit={(event) => {
        event.preventDefault();
        const href = getMarketingStartHref();
        if (isInternalMarketingPath(href)) {
          window.location.assign(`/${locale}${href}`);
          return;
        }
        if (href.startsWith("#")) {
          window.location.hash = href.slice(1);
          return;
        }
        window.open(href, "_blank", "noreferrer");
      }}
    >
      <p className="text-forest/80 text-sm">{t("eyebrow")}</p>
      <div className="mt-5 space-y-4">
        <label className="block">
          <span className="text-forest text-sm">{t("destination")}</span>
          <span className="mt-1 flex min-h-12 items-center rounded-xl bg-white px-4 text-base">
            {t("destinationValue")}
          </span>
        </label>

        <label className="block">
          <span className="text-forest text-sm">{t("amount")}</span>
          <span className="mt-1 flex min-h-12 items-center rounded-xl bg-white px-4">
            <span className="text-forest/70 mr-2">USD</span>
            <input
              type="number"
              min={10}
              max={5000}
              step={10}
              value={usd}
              onChange={(event) => setUsd(Number(event.target.value) || 0)}
              className="w-full bg-transparent text-lg tabular-nums outline-none"
            />
          </span>
        </label>

        <div>
          <p className="text-forest text-sm">{t("receive")}</p>
          <p className="text-forest mt-1 text-3xl tracking-tight tabular-nums">
            {money.format(ars)}{" "}
            <span className="text-lg font-normal">ARS</span>
          </p>
        </div>

        <dl className="border-stone grid grid-cols-2 gap-3 border-t pt-4 text-sm">
          <div>
            <dt className="text-forest/70">{t("fee")}</dt>
            <dd className="text-forest mt-0.5">{t("feeValue")}</dd>
          </div>
          <div>
            <dt className="text-forest/70">{t("arrives")}</dt>
            <dd className="text-forest mt-0.5">{t("arrivesValue")}</dd>
          </div>
        </dl>
      </div>

      <Button variant="senda" size="cta" className="mt-6 w-full" type="submit">
        {t("start")}
      </Button>
      <p className="text-forest/70 mt-3 text-xs leading-relaxed">
        {t("disclaimer", { rate: site.exampleUsdToArs })}
      </p>
    </form>
  );
}
