import { getTranslations } from "next-intl/server";

import { Marquee } from "~/components/ui/marquee";

const origins = [
  "Madrid",
  "Miami",
  "São Paulo",
  "Ciudad de México",
  "Berlín",
  "Santiago",
  "Nueva York",
  "Barcelona",
  "Londres",
  "Montevideo",
];

export async function ReceiveRail() {
  const t = await getTranslations("receiveRail");

  return (
    <section aria-label={t("label")} className="border-y border-stone bg-cream-deep py-7">
      <p className="px-5 text-center text-sm text-forest md:text-base">
        {t("line")}
      </p>
      <Marquee pauseOnHover className="mt-4 [--duration:36s]">
        {origins.map((city) => (
          <span
            key={city}
            className="mx-2 rounded-full bg-white px-4 py-2 text-sm text-forest"
          >
            {t("chip", { city })}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
