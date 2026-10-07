import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { BusinessPage } from "~/components/business/business-page";
import { routing } from "~/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return { title: "Senda" };
  }
  const t = await getTranslations({ locale, namespace: "business.meta" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function EmpresasPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  return <BusinessPage />;
}
