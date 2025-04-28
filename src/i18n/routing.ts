import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  defaultLocale: "en",
  locales: ["en", "pt", "es"],
  localeDetection: false,
});
export type Locale = (typeof routing.locales)[number];
