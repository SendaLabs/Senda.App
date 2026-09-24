import { getTranslations } from "next-intl/server";

import { HowItWorks1 } from "~/components/21st/how-it-works-1";
import { StartCtaLink } from "~/components/landing/start-cta-link";
import { Button } from "~/components/ui/button";

export async function HowItWorks() {
  const t = await getTranslations("how");
  const steps = t.raw("steps") as {
    number: string;
    title: string;
    copy: string;
  }[];

  return (
    <HowItWorks1
      id="como-funciona"
      eyebrow={t("eyebrow")}
      title={t("title")}
      description={t("description")}
      steps={steps}
      action={
        <Button variant="senda" size="cta" asChild>
          <StartCtaLink>{t("start")}</StartCtaLink>
        </Button>
      }
    />
  );
}
