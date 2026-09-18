import { getTranslations } from "next-intl/server";

import { HowItWorks1 } from "~/components/21st/how-it-works-1";
import { Button } from "~/components/ui/button";
import { site } from "~/lib/site";

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
          <a href={site.startHref}>{t("start")}</a>
        </Button>
      }
    />
  );
}
