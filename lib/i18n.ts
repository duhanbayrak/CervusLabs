export type Locale = "en" | "tr";

export const defaultLocale: Locale = "en";
export const locales: Locale[] = ["en", "tr"];

export const localeNames: Record<Locale, string> = {
  en: "English",
  tr: "Türkçe",
};
