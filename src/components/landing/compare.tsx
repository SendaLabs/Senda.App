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
    <section id="comparar" className="bg-cream py-20 md:py-28">
      <Shell>
        <h2 className="editorial-display max-w-[16ch] text-4xl text-forest md:text-5xl">
          {t("title")}
        </h2>
        <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-charcoal/80">
          {t("lead")}
        </p>

        <div className="mt-12 max-w-full overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-stone">
                <th className="py-4 pr-4 text-sm font-medium text-forest/70">
                  {" "}
                </th>
                <th className="py-4 pr-4 text-sm font-medium text-forest/70">
                  {t("bank")}
                </th>
                <th className="py-4 text-sm font-medium text-forest">
                  {t("senda")}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-stone/80">
                  <th className="py-5 pr-4 align-top text-sm font-medium text-forest">
                    {row.label}
                  </th>
                  <td className="py-5 pr-4 align-top text-base text-charcoal/75">
                    {row.bank}
                  </td>
                  <td className="py-5 align-top text-base text-forest">
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
