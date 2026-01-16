"use client";

import { ArrowRight } from "lucide-react";
import { SectionTransition } from "@/components/transitions/section-transition";
import { useState } from "react";
import { useLanguage } from "@/contexts/language-context";

export function ContactForm() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Form submission logic would go here
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <SectionTransition delay={0.2}>
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
        <div className="relative bg-white dark:bg-gray-900/40 backdrop-blur-xl border border-gray-200 dark:border-white/10 p-8 md:p-10 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-display font-semibold text-primary dark:text-white mb-8">
            {t.contact.form.title}
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  className="text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400 ml-1"
                  htmlFor="name"
                >
                  {t.contact.form.name}
                </label>
                <input
                  className="w-full bg-transparent border border-gray-300 dark:border-gray-700 rounded-md px-4 py-3 text-primary dark:text-white focus:outline-none focus:border-primary dark:focus:border-white focus:ring-0 transition-colors placeholder-gray-400/50"
                  id="name"
                  name="name"
                  placeholder={t.contact.form.namePlaceholder}
                  type="text"
                  required
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400 ml-1"
                  htmlFor="email"
                >
                  {t.contact.form.email}
                </label>
                <input
                  className="w-full bg-transparent border border-gray-300 dark:border-gray-700 rounded-md px-4 py-3 text-primary dark:text-white focus:outline-none focus:border-primary dark:focus:border-white focus:ring-0 transition-colors placeholder-gray-400/50"
                  id="email"
                  name="email"
                  placeholder={t.contact.form.emailPlaceholder}
                  type="email"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label
                className="text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400 ml-1"
                htmlFor="company"
              >
                {t.contact.form.company}
              </label>
              <input
                className="w-full bg-transparent border border-gray-300 dark:border-gray-700 rounded-md px-4 py-3 text-primary dark:text-white focus:outline-none focus:border-primary dark:focus:border-white focus:ring-0 transition-colors placeholder-gray-400/50"
                id="company"
                name="company"
                placeholder={t.contact.form.companyPlaceholder}
                type="text"
              />
            </div>
            <div className="space-y-2">
              <label
                className="text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400 ml-1"
                htmlFor="brief"
              >
                {t.contact.form.projectBrief}
              </label>
              <textarea
                className="w-full bg-transparent border border-gray-300 dark:border-gray-700 rounded-md px-4 py-3 text-primary dark:text-white focus:outline-none focus:border-primary dark:focus:border-white focus:ring-0 transition-colors resize-none placeholder-gray-400/50"
                id="brief"
                name="brief"
                placeholder={t.contact.form.briefPlaceholder}
                rows={4}
                required
              />
            </div>
            <div className="pt-4">
              <button
                className="w-full bg-primary dark:bg-white text-white dark:text-primary font-display font-bold tracking-widest text-sm uppercase py-4 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 shadow-lg shadow-gray-200/50 dark:shadow-none flex items-center justify-center gap-2 group-hover:gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? t.contact.form.sending : t.contact.form.sendInquiry}{" "}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </SectionTransition>
  );
}
