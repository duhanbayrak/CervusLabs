"use client";

import { SectionTransition } from "@/components/transitions/section-transition";
import { useLanguage } from "@/contexts/language-context";

export function PrivacyContent() {
  const { t } = useLanguage();

  return (
    <SectionTransition>
      <section className="relative z-10 pt-32 pb-24 px-6 lg:px-8 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <SectionTransition delay={0.1}>
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-display font-light text-primary dark:text-white mb-4 tracking-tight">
                {t.privacy.title}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t.privacy.lastUpdated}: {new Date().toLocaleDateString()}
              </p>
            </div>
          </SectionTransition>

          <div className="space-y-12">
            <SectionTransition delay={0.2}>
              <div>
                <h2 className="text-2xl font-display font-semibold text-primary dark:text-white mb-4">
                  {t.privacy.sections.introduction.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t.privacy.sections.introduction.content}
                </p>
              </div>
            </SectionTransition>

            <SectionTransition delay={0.3}>
              <div>
                <h2 className="text-2xl font-display font-semibold text-primary dark:text-white mb-4">
                  {t.privacy.sections.dataCollection.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t.privacy.sections.dataCollection.content}
                </p>
              </div>
            </SectionTransition>

            <SectionTransition delay={0.4}>
              <div>
                <h2 className="text-2xl font-display font-semibold text-primary dark:text-white mb-4">
                  {t.privacy.sections.dataUse.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t.privacy.sections.dataUse.content}
                </p>
              </div>
            </SectionTransition>

            <SectionTransition delay={0.5}>
              <div>
                <h2 className="text-2xl font-display font-semibold text-primary dark:text-white mb-4">
                  {t.privacy.sections.dataSecurity.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t.privacy.sections.dataSecurity.content}
                </p>
              </div>
            </SectionTransition>

            <SectionTransition delay={0.6}>
              <div>
                <h2 className="text-2xl font-display font-semibold text-primary dark:text-white mb-4">
                  {t.privacy.sections.contact.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t.privacy.sections.contact.content}
                </p>
              </div>
            </SectionTransition>
          </div>
        </div>
      </section>
    </SectionTransition>
  );
}
