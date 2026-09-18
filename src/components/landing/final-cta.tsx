import { getTranslations } from "next-intl/server";

import { Cta1 } from "~/components/21st/cta-1";
import { site } from "~/lib/site";

export async function FinalCta() {
  const t = await getTranslations("cta");

  return (
    <Cta1
      id="empezar"
      title={t("title")}
      description={t("description")}
      primary={{ href: site.mailto, label: t("primary") }}
      secondary={{ href: site.howHref, label: t("secondary") }}
      note={t("note", { email: site.email })}
    />
  );
}
