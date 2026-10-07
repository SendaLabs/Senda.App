import { getTranslations } from "next-intl/server";
import { Banknote, Clock3, CreditCard, MapPin, Sparkles } from "lucide-react";
import Image from "next/image";

import { Shell } from "~/components/landing/shell";

const rowIcons = [MapPin, Clock3, Banknote, CreditCard, Sparkles] as const;

export async function Compare() {
  const t = await getTranslations("compare");
  const rows = t.raw("rows") as {
    label: string;
    bank: string;
    senda: string;
  }[];

  return (
    <section id="comparar" className="bg-cream-deep py-16 md:py-20">
      <Shell>
        <div className="mx-auto max-w-6xl">
          <h2 className="editorial-display text-forest max-w-[16ch] text-3xl md:text-4xl">
            {t("title")}
          </h2>
          <p className="text-charcoal/80 mt-4 max-w-[60ch] text-base leading-relaxed md:text-lg">
            {t("lead")}
          </p>

          <div className="mt-9 overflow-hidden rounded-[1.25rem] border border-white/80 bg-white shadow-[0_20px_55px_rgba(18,60,54,0.1)]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[42rem] border-collapse text-left">
                <thead>
                  <tr className="border-stone/80 border-b bg-[#f8faf6]">
                    <th className="text-forest/70 w-[28%] px-5 py-5 text-sm font-medium md:px-7">
                      {t("feature")}
                    </th>
                    <th className="text-charcoal/60 px-5 py-5 text-sm font-medium md:px-7">
                      {t("bank")}
                    </th>
                    <th className="bg-forest text-cream px-5 py-5 text-sm font-semibold md:px-7">
                      <span className="flex items-center gap-2">
                        <span className="flex size-7 items-center justify-center rounded-full bg-white p-1">
                          <Image
                            src="/images/logoverde.png"
                            alt=""
                            width={24}
                            height={24}
                            className="size-full object-contain"
                          />
                        </span>
                        {t("senda")}
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => {
                    const Icon = rowIcons[index] ?? Sparkles;
                    return (
                      <tr key={row.label} className="border-stone/70 border-b last:border-b-0">
                        <th className="text-forest px-5 py-5 align-top text-sm font-semibold md:px-7">
                          <span className="flex items-start gap-3">
                            <span className="bg-cream-deep flex size-8 shrink-0 items-center justify-center rounded-lg">
                              <Icon className="text-forest size-4" strokeWidth={1.8} aria-hidden />
                            </span>
                            <span className="pt-1">{row.label}</span>
                          </span>
                        </th>
                        <td className="text-charcoal/70 px-5 py-5 align-top text-sm leading-relaxed md:px-7 md:text-base">
                          {row.bank}
                        </td>
                        <td className="bg-[#f1f8f1] text-forest px-5 py-5 align-top text-sm font-medium leading-relaxed md:px-7 md:text-base">
                          {row.senda}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}
