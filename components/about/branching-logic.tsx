"use client";

import { SectionTransition } from "@/components/transitions/section-transition";
import { useLanguage } from "@/contexts/language-context";

export function BranchingLogic() {
  const { t } = useLanguage();
  return (
    <SectionTransition>
      <section className="relative z-10 py-24 bg-white/50 dark:bg-background-dark/50 backdrop-blur-sm border-y border-gray-200 dark:border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -left-10 -top-10 w-64 h-64 bg-primary/5 dark:bg-white/5 rounded-full blur-3xl -z-10" />
              <svg
                className="w-full h-auto max-w-md mx-auto text-primary dark:text-white opacity-80 animate-draw"
                fill="none"
                viewBox="0 0 400 300"
              >
                <g stroke="currentColor" strokeLinecap="round" strokeWidth="1.5">
                  <circle cx="200" cy="150" r="40" strokeOpacity="0.2" />
                  <circle cx="200" cy="150" r="4" />
                  <path d="M200 110 L 200 80 L 160 50" />
                  <path d="M200 80 L 240 50" />
                  <path d="M160 50 L 160 30" />
                  <path d="M160 50 L 140 40" />
                  <path d="M240 50 L 240 30" />
                  <path d="M240 50 L 260 40" />
                  <path d="M200 190 L 200 240" strokeDasharray="4 4" />
                  <path d="M160 150 L 100 150" strokeDasharray="4 4" />
                  <path d="M240 150 L 300 150" strokeDasharray="4 4" />
                  <circle cx="160" cy="50" fill="currentColor" r="2" />
                  <circle cx="240" cy="50" fill="currentColor" r="2" />
                  <circle cx="200" cy="240" fill="currentColor" r="2" />
                  <circle cx="100" cy="150" fill="currentColor" r="2" />
                  <circle cx="300" cy="150" fill="currentColor" r="2" />
                </g>
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-display font-semibold text-primary dark:text-white mb-6 tracking-wide">
                {t.about.branchingLogic.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {t.about.branchingLogic.description}
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {t.about.branchingLogic.description2}
              </p>
            </div>
          </div>
        </div>
      </section>
    </SectionTransition>
  );
}
