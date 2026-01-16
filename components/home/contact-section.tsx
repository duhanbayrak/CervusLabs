"use client";

import { Send } from "lucide-react";
import Link from "next/link";
import { SectionTransition } from "@/components/transitions/section-transition";
import { useLanguage } from "@/contexts/language-context";

export function ContactSection() {
  const { t } = useLanguage();
  return (
    <SectionTransition>
      <section
        className="relative z-10 py-32 px-6 lg:px-8 bg-background-light dark:bg-background-dark overflow-hidden"
        id="contact"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="relative max-w-4xl mx-auto text-center">
          <SectionTransition delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-display font-light text-primary dark:text-white mb-6">
              {t.contact.section.title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto font-light">
              {t.contact.section.description}
            </p>
          </SectionTransition>

          <SectionTransition delay={0.2}>
            <form className="max-w-md mx-auto space-y-4 text-left">
              <div>
                <label htmlFor="email" className="sr-only">
                  {t.contact.section.emailLabel}
                </label>
                <div className="relative">
                  <input
                    className="block w-full rounded-md border-0 py-4 pl-4 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-white/5 dark:text-white dark:ring-white/10 dark:focus:ring-white sm:text-sm sm:leading-6 backdrop-blur-sm bg-white/50 dark:bg-transparent"
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t.contact.section.emailPlaceholder}
                    required
                  />
                  <button
                    type="submit"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    <Send className="w-5 h-5 text-gray-400 hover:text-primary dark:hover:text-white cursor-pointer transition-colors" />
                  </button>
                </div>
              </div>
            </form>
          </SectionTransition>

          <SectionTransition delay={0.3}>
            <div className="mt-12 flex justify-center space-x-8 opacity-60">
              <Link
                href="#"
                className="text-gray-500 hover:text-primary dark:hover:text-white transition-colors"
              >
                LinkedIn
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-primary dark:hover:text-white transition-colors"
              >
                Twitter
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-primary dark:hover:text-white transition-colors"
              >
                GitHub
              </Link>
            </div>
          </SectionTransition>
        </div>
      </section>
    </SectionTransition>
  );
}
