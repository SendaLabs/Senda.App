import type { AppLocale } from "./routing";
import type messages from "../../messages/es.json";

declare module "next-intl" {
  interface AppConfig {
    Locale: AppLocale;
    Messages: typeof messages;
  }
}
