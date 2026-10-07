import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { LoginForm } from "~/components/business/login/login-form";
import { LoginGlobe } from "~/components/business/login/login-globe";
import { LanguageSwitch } from "~/components/landing/language-switch";
import { Link } from "~/i18n/navigation";
import { BUSINESS_PATH } from "~/lib/site";

export async function BusinessLoginPage() {
  const t = await getTranslations("business.login");
  const stats = t.raw("stats") as { value: string; label: string }[];

  return (
    <main className="bg-cream min-h-dvh lg:grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
      <aside className="relative isolate flex min-h-[19rem] flex-col overflow-hidden bg-[#061f1b] px-6 pt-7 pb-6 text-white sm:px-10 lg:min-h-dvh lg:px-12 lg:pt-10 lg:pb-8">
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_30%_20%,rgba(28,92,74,0.45),transparent_60%)]"
          aria-hidden
        />
        <LoginGlobe />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#061f1b] via-[#061f1b]/70 to-transparent"
          aria-hidden
        />

        <Link
          href={BUSINESS_PATH}
          className="relative flex w-fit items-center gap-2.5"
          aria-label={t("home")}
        >
          <Image
            src="/images/logoblanco.png"
            alt=""
            width={420}
            height={110}
            className="h-7 w-auto"
            sizes="120px"
            priority
          />
          <span className="border-l border-white/35 pl-2.5 text-[0.95rem] text-white/80">
            {t("brandSuffix")}
          </span>
        </Link>

        <div className="relative mt-10 lg:mt-24">
          <p className="max-w-[13ch] text-[2rem] leading-[1.1] font-medium tracking-[-0.03em] sm:text-[2.4rem] lg:text-[2.6rem]">
            {t("panelTitle")}
          </p>
          <p className="mt-5 hidden max-w-[36ch] text-[0.95rem] leading-relaxed text-white/75 sm:block">
            {t("panelSub")}
          </p>
        </div>

        <ul className="relative mt-auto hidden grid-cols-3 divide-x divide-white/20 pt-10 text-center lg:grid">
          {stats.map((stat) => (
            <li
              key={stat.label}
              className="flex flex-col items-center justify-center px-3"
            >
              {stat.value ? (
                <span className="text-lg font-semibold">{stat.value}</span>
              ) : null}
              <span className="max-w-[12ch] text-xs leading-snug text-white/70">
                {stat.label}
              </span>
            </li>
          ))}
        </ul>
      </aside>

      <section className="flex min-h-[calc(100dvh-19rem)] flex-col px-6 py-6 sm:px-10 lg:min-h-dvh lg:px-14 lg:py-8">
        <div className="flex items-center justify-between gap-4">
          <LanguageSwitch />
          <p className="text-charcoal/65 text-sm">
            {t("noAccount")}{" "}
            <Link
              href="/lista-de-espera"
              className="text-forest font-medium underline underline-offset-4 hover:no-underline"
            >
              {t("register")}
            </Link>
          </p>
        </div>

        <div className="flex flex-1 items-center justify-center py-10 lg:justify-start lg:pl-[8%]">
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
