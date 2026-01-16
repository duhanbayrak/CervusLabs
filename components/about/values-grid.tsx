"use client";

import {
  Lightbulb,
  Cog,
  Infinity,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import { SectionTransition } from "@/components/transitions/section-transition";
import { useLanguage } from "@/contexts/language-context";

export function ValuesGrid() {
  const { t } = useLanguage();

  const values = [
    {
      icon: Lightbulb,
      title: t.about.values.innovation.title,
      description: t.about.values.innovation.description,
    },
    {
      icon: Cog,
      title: t.about.values.precision.title,
      description: t.about.values.precision.description,
    },
    {
      icon: Infinity,
      title: t.about.values.scalability.title,
      description: t.about.values.scalability.description,
    },
    {
      icon: Shield,
      title: t.about.values.integrity.title,
      description: t.about.values.integrity.description,
    },
    {
      icon: Users,
      title: t.about.values.collaboration.title,
      description: t.about.values.collaboration.description,
    },
    {
      icon: Zap,
      title: t.about.values.velocity.title,
      description: t.about.values.velocity.description,
    },
  ];

  return (
    <SectionTransition>
      <section className="relative z-10 py-32 bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionTransition delay={0.1}>
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-display font-light text-primary dark:text-white tracking-[0.15em] uppercase">
                {t.about.values.title}
              </h2>
            </div>
          </SectionTransition>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <SectionTransition key={value.title} delay={0.2 + index * 0.1}>
                  <div className="group relative p-8 rounded-xl bg-white dark:bg-card-dark border border-gray-100 dark:border-white/5 hover:border-primary/20 hover:shadow-lg transition-all duration-300">
                    <div className="absolute top-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    <div className="w-12 h-12 mb-6 flex items-center justify-center bg-gray-50 dark:bg-white/5 rounded-lg text-primary dark:text-white">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-primary dark:text-white mb-3">
                      {value.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {value.description}
                    </p>
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
