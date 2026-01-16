"use client";

import { AlertCircle, Brain } from "lucide-react";
import { CheckCircle2 } from "lucide-react";
import { SectionTransition } from "@/components/transitions/section-transition";
import { useLanguage } from "@/contexts/language-context";

export function ChallengeSolution() {
  const { t } = useLanguage();
  return (
    <SectionTransition>
      <section className="relative z-10 py-16 border-t border-gray-200 dark:border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
            <SectionTransition delay={0.1}>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
                    <AlertCircle className="w-6 h-6 text-primary dark:text-white" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-primary dark:text-white uppercase tracking-wide">
                    {t.caseStudies.challenge.title}
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  {t.caseStudies.challenge.description1}
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t.caseStudies.challenge.description2}
                </p>
              </div>
            </SectionTransition>
            <SectionTransition delay={0.2}>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
                    <Brain className="w-6 h-6 text-primary dark:text-white" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-primary dark:text-white uppercase tracking-wide">
                    {t.caseStudies.solution.title}
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  {t.caseStudies.solution.description}
                </p>
                <ul className="space-y-3">
                  {t.caseStudies.solution.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="text-primary dark:text-white mr-3 mt-1 w-5 h-5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </SectionTransition>
          </div>
        </div>
      </section>
    </SectionTransition>
  );
}
