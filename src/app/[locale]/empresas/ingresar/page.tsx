import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { BusinessLoginPage } from "~/components/business/login/login-page";
import { routing } from "~/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return { title: "Senda" };
  }
  const t = await getTranslations({ locale, namespace: "business.login" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    robots: { index: false },
  };
}

export default async function BusinessLoginRoute({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  return <BusinessLoginPage />;
}
