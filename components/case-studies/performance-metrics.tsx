"use client";

import { Gauge, Bug } from "lucide-react";
import { SectionTransition } from "@/components/transitions/section-transition";
import { useLanguage } from "@/contexts/language-context";

export function PerformanceMetrics() {
  const { t } = useLanguage();
  return (
    <SectionTransition>
      <section className="relative z-10 py-24 bg-white dark:bg-white/5 border-y border-gray-200 dark:border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionTransition delay={0.1}>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-display font-light text-primary dark:text-white tracking-widest uppercase mb-4">
                {t.caseStudies.metrics.title}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                {t.caseStudies.metrics.description}
              </p>
            </div>
          </SectionTransition>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <SectionTransition delay={0.2}>
              <div className="bg-background-light dark:bg-background-dark p-8 rounded-xl border border-gray-200 dark:border-gray-700 relative overflow-hidden">
                <h3 className="text-lg font-bold text-primary dark:text-white mb-6 flex items-center gap-2">
                  <Gauge className="w-5 h-5" />
                  {t.caseStudies.metrics.processingSpeed}
                </h3>
                <div className="relative h-64 w-full flex items-end justify-between px-4 pb-4 border-b border-l border-gray-300 dark:border-gray-600">
                  {[
                    { height: "30%", label: "M1", color: "bg-gray-300 dark:bg-gray-700" },
                    { height: "45%", label: "M2", color: "bg-gray-400 dark:bg-gray-600" },
                    { height: "55%", label: "M3", color: "bg-gray-500 dark:bg-gray-500" },
                    { height: "75%", label: "M4", color: "bg-gray-600 dark:bg-gray-400" },
                    { height: "90%", label: "M5", color: "bg-gray-800 dark:bg-gray-300", animate: true },
                  ].map((bar, index) => (
                    <div
                      key={index}
                      className={`w-8 ${bar.color} rounded-t-sm group relative transition-all duration-500 ${
                        bar.animate ? "animate-grow-height" : ""
                      }`}
                      style={{
                        height: bar.animate ? "0%" : bar.height,
                        ...(bar.animate && { "--target-height": bar.height }),
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        {bar.label}
                      </div>
                    </div>
                  ))}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    preserveAspectRatio="none"
                  >
                    <path
                      className="text-primary dark:text-white opacity-40"
                      d="M 30 170 L 100 130 L 170 110 L 240 60 L 310 30"
                      fill="none"
                      stroke="currentColor"
                      strokeDasharray="4 4"
                      strokeWidth="2"
                    />
                    <circle
                      className="text-primary dark:text-white fill-current"
                      cx="310"
                      cy="30"
                      r="4"
                    />
                  </svg>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2 px-4 font-mono">
                  <span>{t.caseStudies.metrics.start}</span>
                  <span>{t.caseStudies.metrics.month5}</span>
                </div>
              </div>
            </SectionTransition>
            <SectionTransition delay={0.3}>
              <div className="bg-background-light dark:bg-background-dark p-8 rounded-xl border border-gray-200 dark:border-gray-700 relative overflow-hidden">
                <h3 className="text-lg font-bold text-primary dark:text-white mb-6 flex items-center gap-2">
                  <Bug className="w-5 h-5" />
                  {t.caseStudies.metrics.errorRate}
                </h3>
                <div className="flex flex-col gap-6 h-64 justify-center">
                  {[
                    {
                      label: t.caseStudies.metrics.legacySystem,
                      value: "12.5% Errors",
                      width: "85%",
                      color: "bg-gray-400 dark:bg-gray-600",
                    },
                    {
                      label: t.caseStudies.metrics.phase1,
                      value: "5.2% Errors",
                      width: "45%",
                      color: "bg-gray-600 dark:bg-gray-400",
                    },
                    {
                      label: t.caseStudies.metrics.finalImplementation,
                      value: "0.8% Errors",
                      width: "8%",
                      color: "bg-primary dark:bg-white",
                      isFinal: true,
                    },
                  ].map((item, index) => (
                    <div key={index} className="relative">
                      <div
                        className={`flex justify-between text-sm mb-1 ${
                          item.isFinal
                            ? "font-semibold text-primary dark:text-white"
                            : "text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        <span>{item.label}</span>
                        <span>{item.value}</span>
                      </div>
                      <div className="h-3 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full transition-all duration-1000 ${
                          item.isFinal ? "animate-slide-right" : ""
                        }`}
                        style={{
                          width: item.isFinal ? "0%" : item.width,
                          ...(item.isFinal && { "--target-width": "8%" }),
                        }}
                      />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SectionTransition>
          </div>
        </div>
      </section>
    </SectionTransition>
  );
}
