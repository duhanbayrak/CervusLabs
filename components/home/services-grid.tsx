"use client";

import { Workflow, Cloud, Zap } from "lucide-react";
import { SectionTransition } from "@/components/transitions/section-transition";
import { useLanguage } from "@/contexts/language-context";

export function ServicesGrid() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Workflow,
      title: t.services.workflowAutomation.title,
      description: t.services.workflowAutomation.description,
    },
    {
      icon: Cloud,
      title: t.services.saasDevelopment.title,
      description: t.services.saasDevelopment.description,
    },
    {
      icon: Zap,
      title: t.services.apiIntegration.title,
      description: t.services.apiIntegration.description,
    },
  ];

  return (
    <SectionTransition>
      <section
        className="relative z-10 py-24 bg-white dark:bg-background-dark border-t border-gray-200 dark:border-gray-900"
        id="services"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <SectionTransition key={service.title} delay={index * 0.1}>
                  <div className="group p-6 rounded-2xl transition-all duration-300 hover:bg-gray-50 dark:hover:bg-white/5">
                    <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-white/10 text-primary dark:text-white">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-display font-semibold text-primary dark:text-white mb-2 tracking-wide">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {service.description}
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
