import { getTranslations } from "next-intl/server";

import { Shell } from "~/components/landing/shell";

export async function Compare() {
  const t = await getTranslations("compare");
  const rows = t.raw("rows") as {
    label: string;
    bank: string;
    senda: string;
  }[];

  return (
    <section id="comparar" className="bg-cream py-16 md:py-20">
      <Shell>
        <h2 className="editorial-display text-forest max-w-[16ch] text-3xl md:text-4xl">
          {t("title")}
        </h2>
        <p className="text-charcoal/80 mt-4 max-w-[60ch] text-base leading-relaxed md:text-lg">
          {t("lead")}
        </p>

        <div className="mt-9 max-w-full overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left">
            <thead>
              <tr className="border-stone border-b">
                <th className="text-forest/70 py-4 pr-4 text-sm font-medium">
                  {" "}
                </th>
                <th className="text-forest/70 py-4 pr-4 text-sm font-medium">
                  {t("bank")}
                </th>
                <th className="text-forest py-4 text-sm font-medium">
                  {t("senda")}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-stone/80 border-b">
                  <th className="text-forest py-5 pr-4 align-top text-sm font-medium">
                    {row.label}
                  </th>
                  <td className="text-charcoal/75 py-5 pr-4 align-top text-base">
                    {row.bank}
                  </td>
                  <td className="text-forest py-5 align-top text-base">
                    {row.senda}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Shell>
    </section>
  );
}
