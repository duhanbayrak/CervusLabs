"use client";

import { Search, Network, Code, TrendingUp } from "lucide-react";
import { SectionTransition } from "@/components/transitions/section-transition";
import { useLanguage } from "@/contexts/language-context";

export function HowWeWork() {
  const { t } = useLanguage();

  const steps = [
    {
      icon: Search,
      title: t.services.howWeWork.steps.discovery.title,
      description: t.services.howWeWork.steps.discovery.description,
    },
    {
      icon: Network,
      title: t.services.howWeWork.steps.strategy.title,
      description: t.services.howWeWork.steps.strategy.description,
    },
    {
      icon: Code,
      title: t.services.howWeWork.steps.implementation.title,
      description: t.services.howWeWork.steps.implementation.description,
    },
    {
      icon: TrendingUp,
      title: t.services.howWeWork.steps.growth.title,
      description: t.services.howWeWork.steps.growth.description,
    },
  ];

  return (
    <SectionTransition>
      <section className="relative z-10 py-32 bg-white dark:bg-background-dark border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionTransition delay={0.1}>
            <div className="text-center mb-24">
              <h2 className="text-3xl md:text-4xl font-display font-light text-primary dark:text-white tracking-[0.15em] uppercase">
                {t.services.howWeWork.title}
              </h2>
            </div>
          </SectionTransition>
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-gray-200 dark:bg-white/10 z-0" />
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <SectionTransition key={step.title} delay={0.2 + index * 0.1}>
                  <div className="relative z-10 group">
                    <div className="w-24 h-24 mx-auto bg-background-light dark:bg-background-dark border-2 border-gray-200 dark:border-gray-700 rounded-full flex items-center justify-center mb-8 group-hover:border-primary dark:group-hover:border-white transition-colors duration-300">
                      <Icon className="w-8 h-8 text-gray-400 group-hover:text-primary dark:group-hover:text-white transition-colors" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-display font-bold text-primary dark:text-white mb-3">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed px-4">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </SectionTransition>
              );
            })}
          </div>
        </div>
      </section>
    </SectionTransition>
  );
}
