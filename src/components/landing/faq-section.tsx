import { getTranslations } from "next-intl/server";

import { FaqSection as CommunityFaq } from "~/components/21st/faq-section";
import { site } from "~/lib/site";

export async function FaqSection() {
  const t = await getTranslations("faq");
  const items = t.raw("items") as { question: string; answer: string }[];

  return (
    <CommunityFaq
      id="preguntas"
      title={t("title")}
      description={t("description")}
      items={items}
      contactInfo={{
        title: t("contactTitle"),
        description: t("contactDescription"),
        buttonText: t("contactButton"),
        href: site.mailto,
      }}
    />
  );
}
