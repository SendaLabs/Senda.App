import {
  getMarketingStartHref,
  WAITLIST_PATH,
  WHATSAPP_START_URL,
} from "~/lib/marketing-cta";

export const BUSINESS_PATH = "/empresas" as const;
export const BUSINESS_LOGIN_PATH = "/empresas/ingresar" as const;
export const BUSINESS_DOCS = "https://withsenda.site/docs/business";

export const site = {
  name: "Senda",
  email: "sendanetwork@gmail.com",
  mailto:
    "mailto:sendanetwork@gmail.com?subject=Quiero%20enviar%20plata%20a%20Argentina",
  github: "https://github.com/SendaLabs",
  linkedin: "https://www.linkedin.com/company/senda-labs",
  instagram: "https://www.instagram.com/withsenda/",
  x: "https://x.com/senda_app",
  docs: "https://withsenda.site/docs",
  businessDocs: BUSINESS_DOCS,
  challenge: "https://argentinabuilderchallenge.netlify.app/reglamento",
  whatsappHref: WHATSAPP_START_URL,
  /** @deprecated Prefer getStartHref() so the env CTA switch applies. */
  startHref: WHATSAPP_START_URL,
  waitlistPath: WAITLIST_PATH,
  howHref: "#como-funciona",
  exampleUsdToArs: 1350,
  exampleFeeLabel: "incluida",
} as const;

export function getBusinessMailto(locale: string): string {
  const subject =
    locale === "en"
      ? "I want Senda Business for my company"
      : "Quiero Senda Business para mi empresa";
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
}

/** Primary marketing CTA destination (waitlist or product). */
export function getStartHref(): string {
  return getMarketingStartHref();
}

export const navItems = [
  { pathname: "/", hash: "como-funciona", key: "how" },
  { pathname: "/", hash: "por-que-senda", key: "why" },
  { pathname: "/", hash: "equipo", key: "team" },
  { pathname: "/", hash: "preguntas", key: "contact" },
  { pathname: BUSINESS_PATH, key: "business" },
] as const;

export const team = [
  {
    name: "Emilio Alfaro",
    role: "Co-Founder & CPO",
    image: "/images/P_Emilio.svg",
    telegram: "https://t.me/ml0aa",
    x: "https://x.com/eml0aa",
    linkedin: "https://www.linkedin.com/in/emilio-alfaro/",
  },
  {
    name: "Delfina Corradini",
    role: "Co-Founder & CEO",
    image: "/images/P_Delfina.svg",
    telegram: "https://t.me/Delficorradini",
    x: "https://x.com/Delfiicorradini",
    linkedin: "https://www.linkedin.com/in/delfina-luna-corradini-668795224/",
  },
  {
    name: "Nicolas Bustelo",
    role: "Co-Founder & CTO",
    image: "/images/P_Nicolas.png.svg",
    telegram: "https://t.me/nicobustelo",
    x: "https://x.com/nicobustelo__",
    linkedin: "https://ar.linkedin.com/in/nicolas-bustelo",
  },
] as const;
