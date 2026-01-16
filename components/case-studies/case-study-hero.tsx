"use client";

import { TrendingUp, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { SectionTransition } from "@/components/transitions/section-transition";
import { useLanguage } from "@/contexts/language-context";

export function CaseStudyHero() {
  const { t } = useLanguage();
  return (
    <SectionTransition>
      <section className="relative z-10 pt-40 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-start justify-between">
            <div className="lg:w-2/3">
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                <span className="px-3 py-1 text-xs font-mono font-bold tracking-wider uppercase text-primary dark:text-white border border-gray-300 dark:border-gray-700 rounded-full">
                  {t.caseStudies.hero.tags.ecommerce}
                </span>
                <span className="px-3 py-1 text-xs font-mono font-bold tracking-wider uppercase text-primary dark:text-white border border-gray-300 dark:border-gray-700 rounded-full">
                  {t.caseStudies.hero.tags.n8n}
                </span>
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-primary dark:text-white mb-6 leading-tight"
              >
                {t.caseStudies.hero.title}{" "}
                <br />
                <span className="font-semibold">{t.caseStudies.hero.titleBold}</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-lg md:text-xl font-body font-light text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mb-8"
              >
                {t.caseStudies.hero.description}
              </motion.p>
            </div>
            <div className="lg:w-1/3 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                <SectionTransition delay={0.3}>
                  <div className="p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl shadow-sm backdrop-blur-sm">
                    <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest font-mono mb-2">
                      {t.caseStudies.hero.metrics.timeSaved}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-display font-bold text-primary dark:text-white">
                        85%
                      </span>
                      <TrendingUp className="text-green-500 w-6 h-6" />
                    </div>
                  </div>
                </SectionTransition>
                <SectionTransition delay={0.4}>
                  <div className="p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl shadow-sm backdrop-blur-sm">
                    <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest font-mono mb-2">
                      {t.caseStudies.hero.metrics.workflowsActive}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-display font-bold text-primary dark:text-white">
                        24/7
                      </span>
                      <Activity className="text-blue-500 w-6 h-6" />
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      {t.caseStudies.hero.metrics.automatedProcessing}
                    </p>
                  </div>
                </SectionTransition>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionTransition>
  );
}
