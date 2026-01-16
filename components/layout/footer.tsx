"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="relative z-10 py-12 border-t border-gray-200 dark:border-gray-800 bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <span className="font-display font-bold text-sm tracking-[0.2em] text-primary dark:text-white">
            CERVUS<span className="font-light">LABS</span>
          </span>
          <p className="text-xs text-gray-500 mt-2">{t.footer.copyright}</p>
        </div>
        <div className="flex space-x-6 text-xs text-gray-500 uppercase tracking-wider">
          <Link
            href="#"
            className="hover:text-primary dark:hover:text-white transition-colors"
          >
            {t.footer.privacy}
          </Link>
          <Link
            href="#"
            className="hover:text-primary dark:hover:text-white transition-colors"
          >
            {t.footer.terms}
          </Link>
          <Link
            href="#"
            className="hover:text-primary dark:hover:text-white transition-colors"
          >
            {t.footer.sitemap}
          </Link>
        </div>
      </div>
    </footer>
  );
}
