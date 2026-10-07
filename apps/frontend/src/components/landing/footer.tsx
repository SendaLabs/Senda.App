import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { HomeNavLink } from "~/components/landing/home-nav-link";
import { Shell } from "~/components/landing/shell";
import { Link } from "~/i18n/navigation";
import { BUSINESS_PATH, site } from "~/lib/site";

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="border-forest/25 text-forest hover:bg-forest flex size-7 items-center justify-center rounded-full border transition-colors hover:text-white"
    >
      {children}
    </a>
  );
}

function LinkedinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-3.5 fill-current"
    >
      <path d="M5.2 3.8A2.2 2.2 0 1 1 5.2 8.2 2.2 2.2 0 0 1 5.2 3.8ZM3.4 9.8h3.6V20H3.4V9.8Zm5.8 0h3.4v1.4h.1c.5-.9 1.7-1.8 3.5-1.8 3.7 0 4.4 2.4 4.4 5.6V20H17v-4.4c0-1.1 0-2.6-1.6-2.6s-1.9 1.2-1.9 2.5V20H9.2V9.8Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-3.5 fill-none stroke-current stroke-[1.8]"
    >
      <rect width="16" height="16" x="4" y="4" rx="4" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17.3" cy="6.8" r="1" className="fill-current stroke-none" />
    </svg>
  );
}

export async function SiteFooter() {
  const t = await getTranslations("footer");

  return (
    <footer className="border-stone text-forest border-t bg-white">
      <Shell className="grid gap-6 py-6 md:grid-cols-[1.3fr_1fr_1fr_1fr] md:gap-7 md:py-7">
        <div>
          <Image
            src="/images/logoverde.png"
            alt="Senda"
            width={430}
            height={101}
            className="h-9 w-auto"
          />
          <div className="mt-4 flex gap-2">
            <SocialLink href={site.linkedin} label={t("linkedin")}>
              <LinkedinIcon />
            </SocialLink>
            <SocialLink href={site.x} label={t("x")}>
              <span className="text-sm font-semibold">X</span>
            </SocialLink>
            <SocialLink href={site.instagram} label={t("instagram")}>
              <InstagramIcon />
            </SocialLink>
          </div>
        </div>

        <div>
          <p className="text-forest text-sm">{t("company")}</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <HomeNavLink
                pathname="/"
                hash="equipo"
                className="hover:underline"
              >
                {t("about")}
              </HomeNavLink>
            </li>
            <li>
              <HomeNavLink
                pathname="/"
                hash="equipo"
                className="hover:underline"
              >
                {t("team")}
              </HomeNavLink>
            </li>
            <li>
              <Link href={BUSINESS_PATH} className="hover:underline">
                {t("business")}
              </Link>
            </li>
            <li>
              <a href={site.mailto} className="hover:underline">
                {t("contact")}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-forest text-sm">{t("resources")}</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <HomeNavLink
                pathname="/"
                hash="como-funciona"
                className="hover:underline"
              >
                {t("how")}
              </HomeNavLink>
            </li>
            <li>
              <Link href="/" className="hover:underline">
                {t("product")}
              </Link>
            </li>
            <li>
              <a
                href={site.docs}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {t("docs")}
              </a>
            </li>
            <li>
              <a
                href={site.businessDocs}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {t("businessDocs")}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-forest text-sm">{t("media")}</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href={site.linkedin} className="hover:underline">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={site.instagram} className="hover:underline">
                Instagram
              </a>
            </li>
            <li>
              <a href={site.x} className="hover:underline">
                Twitter
              </a>
            </li>
          </ul>
        </div>
      </Shell>
      <Shell className="border-stone border-t py-2.5">
        <p className="text-forest text-xs">
          © {new Date().getFullYear()} Senda
        </p>
      </Shell>
    </footer>
  );
}
