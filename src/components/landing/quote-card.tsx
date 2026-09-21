"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "~/components/ui/button";
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
      className="w-full max-w-full rounded-2xl bg-cream p-5 text-charcoal shadow-[0_16px_40px_rgba(18,60,54,0.18)] md:p-7"
      onSubmit={(event) => {
        event.preventDefault();
        window.open(site.whatsappHref, "_blank", "noreferrer");
      }}
    >
      <p className="text-sm text-forest/80">{t("eyebrow")}</p>
      <div className="mt-5 space-y-4">
        <label className="block">
          <span className="text-sm text-forest">{t("destination")}</span>
          <span className="mt-1 flex min-h-12 items-center rounded-xl bg-white px-4 text-base">
            {t("destinationValue")}
          </span>
        </label>

        <label className="block">
          <span className="text-sm text-forest">{t("amount")}</span>
          <span className="mt-1 flex min-h-12 items-center rounded-xl bg-white px-4">
            <span className="mr-2 text-forest/70">USD</span>
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
          <p className="text-sm text-forest">{t("receive")}</p>
          <p className="mt-1 text-3xl tabular-nums tracking-tight text-forest">
            {money.format(ars)}{" "}
            <span className="text-lg font-normal">ARS</span>
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-3 border-t border-stone pt-4 text-sm">
          <div>
            <dt className="text-forest/70">{t("fee")}</dt>
            <dd className="mt-0.5 text-forest">{t("feeValue")}</dd>
          </div>
          <div>
            <dt className="text-forest/70">{t("arrives")}</dt>
            <dd className="mt-0.5 text-forest">{t("arrivesValue")}</dd>
          </div>
        </dl>
      </div>

      <Button variant="senda" size="cta" className="mt-6 w-full" type="submit">
        {t("start")}
      </Button>
      <p className="mt-3 text-xs leading-relaxed text-forest/70">
        {t("disclaimer", { rate: site.exampleUsdToArs })}
      </p>
    </form>
  );
}
