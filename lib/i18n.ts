import { en } from "./translations/en";
import { tr } from "./translations/tr";

export type Locale = "en" | "tr";

export const defaultLocale: Locale = "en";
export const locales: Locale[] = ["en", "tr"];

export const localeNames: Record<Locale, string> = {
  en: "English",
  tr: "Türkçe",
};

export const translations = {
  en,
  tr,
};
