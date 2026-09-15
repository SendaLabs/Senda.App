"use client";

import { useMemo, useState } from "react";

import { Button } from "~/components/ui/button";
import { site } from "~/lib/site";

const moneyAr = new Intl.NumberFormat("es-AR", {
  maximumFractionDigits: 0,
});

export function QuoteCard() {
  const [usd, setUsd] = useState(200);

  const ars = useMemo(
    () => Math.round(usd * site.exampleUsdToArs),
    [usd],
  );

  return (
    <form
      className="w-full rounded-2xl bg-cream p-5 text-charcoal shadow-[0_16px_40px_rgba(18,60,54,0.18)] md:p-7"
      action={site.startHref}
      onSubmit={(event) => {
        event.preventDefault();
        window.location.hash = "empezar";
      }}
    >
      <p className="text-sm text-forest/80">Cotización de ejemplo</p>
      <div className="mt-5 space-y-4">
        <label className="block">
          <span className="text-sm text-forest">Destino</span>
          <span className="mt-1 flex min-h-12 items-center rounded-xl bg-white px-4 text-base">
            Argentina, Mercado Pago
          </span>
        </label>

        <label className="block">
          <span className="text-sm text-forest">¿Cuánto querés enviar?</span>
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
          <p className="text-sm text-forest">Ellos reciben</p>
          <p className="mt-1 text-3xl tabular-nums tracking-tight text-forest">
            {moneyAr.format(ars)}{" "}
            <span className="text-lg font-normal">ARS</span>
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-3 border-t border-stone pt-4 text-sm">
          <div>
            <dt className="text-forest/70">Comisión</dt>
            <dd className="mt-0.5 text-forest">{site.exampleFeeLabel}</dd>
          </div>
          <div>
            <dt className="text-forest/70">Llega</dt>
            <dd className="mt-0.5 text-forest">en minutos</dd>
          </div>
        </dl>
      </div>

      <Button variant="senda" size="cta" className="mt-6 w-full" type="submit">
        Empezar envío
      </Button>
      <p className="mt-3 text-xs leading-relaxed text-forest/70">
        Tipo de cambio ilustrativo (1 USD = {site.exampleUsdToArs} ARS). El
        valor se confirma en el chat.
      </p>
    </form>
  );
}
