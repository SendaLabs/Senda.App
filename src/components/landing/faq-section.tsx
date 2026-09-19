import { getTranslations } from "next-intl/server";

import { FaqSection as CommunityFaq } from "~/components/21st/faq-section";

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
        form: {
          nameLabel: t("form.name"),
          emailLabel: t("form.email"),
          messageLabel: t("form.message"),
          submitLabel: t("form.submit"),
          successMessage: t("form.success"),
          errorMessage: t("form.error"),
        },
      }}
    />
  );
}
