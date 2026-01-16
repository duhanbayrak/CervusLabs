"use client";

import { SectionTransition } from "@/components/transitions/section-transition";
import { useLanguage } from "@/contexts/language-context";

export function TermsContent() {
  const { t } = useLanguage();

  return (
    <SectionTransition>
      <section className="relative z-10 pt-32 pb-24 px-6 lg:px-8 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <SectionTransition delay={0.1}>
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-display font-light text-primary dark:text-white mb-4 tracking-tight">
                {t.terms.title}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t.terms.lastUpdated}: {new Date().toLocaleDateString()}
              </p>
            </div>
          </SectionTransition>

          <div className="space-y-12">
            <SectionTransition delay={0.2}>
              <div>
                <h2 className="text-2xl font-display font-semibold text-primary dark:text-white mb-4">
                  {t.terms.sections.agreement.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t.terms.sections.agreement.content}
                </p>
              </div>
            </SectionTransition>

            <SectionTransition delay={0.3}>
              <div>
                <h2 className="text-2xl font-display font-semibold text-primary dark:text-white mb-4">
                  {t.terms.sections.services.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t.terms.sections.services.content}
                </p>
              </div>
            </SectionTransition>

            <SectionTransition delay={0.4}>
              <div>
                <h2 className="text-2xl font-display font-semibold text-primary dark:text-white mb-4">
                  {t.terms.sections.intellectualProperty.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t.terms.sections.intellectualProperty.content}
                </p>
              </div>
            </SectionTransition>

            <SectionTransition delay={0.5}>
              <div>
                <h2 className="text-2xl font-display font-semibold text-primary dark:text-white mb-4">
                  {t.terms.sections.limitations.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t.terms.sections.limitations.content}
                </p>
              </div>
            </SectionTransition>

            <SectionTransition delay={0.6}>
              <div>
                <h2 className="text-2xl font-display font-semibold text-primary dark:text-white mb-4">
                  {t.terms.sections.changes.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t.terms.sections.changes.content}
                </p>
              </div>
            </SectionTransition>
          </div>
        </div>
      </section>
    </SectionTransition>
  );
}
