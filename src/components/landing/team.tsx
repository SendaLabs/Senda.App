import Image from "next/image";
import { Send } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Shell } from "~/components/landing/shell";
import { team } from "~/lib/site";

export async function Team() {
  const t = await getTranslations("team");

  return (
    <section id="equipo" className="bg-white py-10 md:py-12">
      <Shell className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
        <div>
          <div className="mx-auto max-w-3xl text-center">
            <p className="team-statement text-charcoal text-2xl leading-[1.08] md:text-3xl">
              {t("statement1Before")}
              <br className="hidden md:block" />{" "}
              <strong className="text-forest font-bold">{t("tool")}</strong>{" "}
              {t("statement1Mid")}{" "}
              <strong className="text-forest font-bold">{t("improve")}</strong>
              <br className="hidden md:block" /> {t("statement1After")}
            </p>
            <p className="text-charcoal mt-4 text-2xl leading-[1.08] md:text-3xl">
              {t("statement2")}
            </p>
          </div>

          <p className="text-forest/70 mt-10 text-center text-xs font-medium tracking-[0.24em]">
            {t("label")}
          </p>

          <ul className="mx-auto mt-5 grid max-w-xl gap-5 sm:grid-cols-3">
            {team.map((person) => (
              <li key={person.name} className="text-center">
                <Image
                  src={person.image}
                  alt={t("portraitAlt", { name: person.name })}
                  width={320}
                  height={400}
                  unoptimized
                  className="border-charcoal/60 bg-cream-deep aspect-[4/5] w-full rounded-md border object-cover object-top"
                  sizes="(max-width: 640px) 80vw, 180px"
                />
                <p className="text-forest mt-2 text-sm">{person.name}</p>
                <p className="text-forest/60 mt-0.5 text-xs">{person.role}</p>
                <p className="mt-2 flex justify-center gap-1.5">
                  <a
                    href={person.telegram}
                    aria-label={t("onTelegram", { name: person.name })}
                    className="border-forest/60 text-forest hover:bg-forest flex size-11 items-center justify-center rounded-full border hover:text-white md:size-6"
                  >
                    <Send className="size-3.5" />
                  </a>
                  <a
                    href={person.x}
                    aria-label={t("onX", { name: person.name })}
                    className="border-forest/60 text-forest hover:bg-forest flex size-11 items-center justify-center rounded-full border hover:text-white md:size-6"
                  >
                    <span className="text-xs font-semibold">X</span>
                  </a>
                  {"linkedin" in person && person.linkedin ? (
                    <a
                      href={person.linkedin}
                      aria-label={t("onLinkedin", { name: person.name })}
                      className="border-forest/60 text-forest hover:bg-forest flex size-11 items-center justify-center rounded-full border hover:text-white md:size-6"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="size-3.5 fill-current"
                      >
                        <path d="M5.2 3.8A2.2 2.2 0 1 1 5.2 8.2 2.2 2.2 0 0 1 5.2 3.8ZM3.4 9.8h3.6V20H3.4V9.8Zm5.8 0h3.4v1.4h.1c.5-.9 1.7-1.8 3.5-1.8 3.7 0 4.4 2.4 4.4 5.6V20H17v-4.4c0-1.1 0-2.6-1.6-2.6s-1.9 1.2-1.9 2.5V20H9.2V9.8Z" />
                      </svg>
                    </a>
                  ) : null}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative pt-6 lg:pt-14">
          <div className="relative mx-auto aspect-[420/520] w-full max-w-sm lg:max-w-none">
            <Image
              src="/maps/latin-america.svg"
              alt={t("mapAlt")}
              fill
              unoptimized
              sizes="(max-width: 1024px) 80vw, 420px"
              className="object-contain"
            />
            <span className="bg-forest absolute top-[31%] left-[40%] size-3 rounded-full" />
            <span className="text-charcoal/70 absolute top-[27%] left-[43%] text-xs">
              {t("costaRica")}
            </span>
            <span className="bg-forest absolute top-[74%] left-[59%] size-3 rounded-full" />
            <span className="text-charcoal/70 absolute top-[71%] left-[38%] text-xs">
              {t("argentina")}
            </span>
          </div>
        </div>
      </Shell>
    </section>
  );
}
