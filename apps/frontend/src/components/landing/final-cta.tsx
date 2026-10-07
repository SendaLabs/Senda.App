import { getLocale, getTranslations } from "next-intl/server";

import { Cta1 } from "~/components/21st/cta-1";
import { isInternalMarketingPath } from "~/lib/marketing-cta";
import { getStartHref, site } from "~/lib/site";

export async function FinalCta() {
  const t = await getTranslations("cta");
  const locale = await getLocale();
  const startHref = getStartHref();
  const startExternal = !isInternalMarketingPath(startHref);

  return (
    <Cta1
      id="empezar"
      title={t("title")}
      description={t("description")}
      primary={{
        href: startExternal ? startHref : `/${locale}${startHref}`,
        label: t("primary"),
        target: startExternal ? "_blank" : undefined,
      }}
      secondary={{ href: site.howHref, label: t("secondary") }}
      note={t("note", { email: site.email })}
    />
  );
}
