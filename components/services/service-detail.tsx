"use client";

import { LucideIcon, CheckCircle2 } from "lucide-react";
import { SectionTransition } from "@/components/transitions/section-transition";

interface ServiceDetailProps {
  serviceNumber: string;
  title: string;
  description: string;
  features: string[];
  icon: LucideIcon;
  svgContent: React.ReactNode;
  reverse?: boolean;
  backgroundVariant?: "default" | "glass" | "gradient";
  decorativeSvg?: React.ReactNode;
  decorativePosition?: "left" | "right" | "bottom";
}

export function ServiceDetail({
  serviceNumber,
  title,
  description,
  features,
  icon: Icon,
  svgContent,
  reverse = false,
  backgroundVariant = "default",
  decorativeSvg,
  decorativePosition = "left",
}: ServiceDetailProps) {
  const contentOrder = reverse ? "order-2 lg:order-1" : "order-2 lg:order-1";
  const imageOrder = reverse ? "order-1 lg:order-2" : "order-1 lg:order-2";

  const backgroundClasses = {
    default: "bg-white dark:bg-background-dark/50",
    glass: "bg-white/50 dark:bg-white/5 backdrop-blur-sm",
    gradient: "bg-background-light dark:bg-background-dark",
  };

  return (
    <SectionTransition>
      <section
        className={`relative z-10 py-24 border-t border-gray-200 dark:border-gray-800/50 ${
          backgroundVariant === "glass"
            ? "bg-white/50 dark:bg-white/5 backdrop-blur-sm border-y"
            : ""
        }`}
      >
        {decorativeSvg && (
          <div
            className={`absolute ${
              decorativePosition === "right"
                ? "right-[-15%] top-1/3 rotate-45"
                : decorativePosition === "bottom"
                ? "left-[-5%] bottom-0 -rotate-90 w-[500px] h-[500px]"
                : "left-[-15%] top-1/4 -rotate-12"
            } w-[600px] h-[600px] opacity-[0.02] dark:opacity-[0.04] pointer-events-none`}
          >
            {decorativeSvg}
          </div>
        )}
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className={contentOrder}>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/10 shadow-sm">
                  <Icon className="w-8 h-8 text-primary dark:text-white" />
                </div>
                <span className="text-sm font-mono uppercase tracking-widest text-gray-500">
                  {serviceNumber}
                </span>
              </div>
              <h2 className="text-4xl font-display font-semibold text-primary dark:text-white mb-6">
                {title}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                {description}
              </p>
              <ul className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="text-primary dark:text-white mr-3 mt-1 w-5 h-5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className={`${imageOrder} relative h-96 w-full ${backgroundClasses[backgroundVariant]} border border-gray-200 dark:border-white/5 rounded-xl flex items-center justify-center overflow-hidden`}
            >
              {backgroundVariant === "default" && (
                <div className="absolute inset-0 network-grid opacity-50" />
              )}
              {backgroundVariant === "gradient" && (
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 dark:to-white/5" />
              )}
              {backgroundVariant === "default" && (
                <div className="absolute inset-0 network-grid opacity-30" />
              )}
              <div className="relative z-10">{svgContent}</div>
            </div>
          </div>
        </div>
      </section>
    </SectionTransition>
  );
}
