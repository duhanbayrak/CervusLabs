"use client";

import { Workflow, Cloud, Zap } from "lucide-react";
import { ServiceDetail } from "./service-detail";
import { useLanguage } from "@/contexts/language-context";

export function ServicesContent() {
  const { t } = useLanguage();

  const services = [
    {
      serviceNumber: t.services.service1.number,
      title: t.services.service1.title,
      description: t.services.service1.description,
      features: t.services.service1.features,
      icon: Workflow,
    svgContent: (
      <svg
        className="w-64 h-64 text-primary dark:text-white opacity-80 animate-draw"
        fill="none"
        viewBox="0 0 200 200"
      >
        <g stroke="currentColor" strokeLinecap="round" strokeWidth="1.5">
          <rect height="40" rx="4" width="40" x="40" y="40" />
          <rect height="40" rx="4" width="40" x="120" y="40" />
          <rect height="40" rx="4" width="40" x="80" y="120" />
          <path d="M60 80 L 60 100 L 100 100 L 100 120" />
          <path d="M140 80 L 140 100 L 100 100" />
          <circle cx="100" cy="100" fill="currentColor" r="4" />
          <path d="M100 160 L 100 180" strokeDasharray="4 4" />
        </g>
      </svg>
    ),
      reverse: false,
      backgroundVariant: "default" as const,
      decorativeSvg: (
        <svg
          className="w-full h-full text-primary dark:text-white"
          fill="currentColor"
          viewBox="0 0 200 200"
        >
          <path d="M100 170L85 140H115L100 170Z" />
          <path d="M85 140L75 110L100 100L125 110L115 140" />
          <path d="M75 110L55 105L65 130L85 140" />
          <path d="M125 110L145 105L135 130L115 140" />
        </svg>
      ),
    },
    {
      serviceNumber: t.services.service2.number,
      title: t.services.service2.title,
      description: t.services.service2.description,
      features: t.services.service2.features,
      icon: Cloud,
    svgContent: (
      <svg
        className="w-64 h-64 text-primary dark:text-white opacity-80 animate-draw"
        fill="none"
        viewBox="0 0 200 200"
      >
        <g stroke="currentColor" strokeWidth="1.5">
          <circle cx="100" cy="100" r="30" strokeOpacity="0.3" />
          <circle cx="100" cy="100" r="50" strokeOpacity="0.1" />
          <path d="M100 70 L 100 40" />
          <path d="M100 130 L 100 160" />
          <path d="M70 100 L 40 100" />
          <path d="M130 100 L 160 100" />
          <circle cx="100" cy="40" fill="currentColor" r="3" />
          <circle cx="100" cy="160" fill="currentColor" r="3" />
          <circle cx="40" cy="100" fill="currentColor" r="3" />
          <circle cx="160" cy="100" fill="currentColor" r="3" />
          <path d="M78 78 L 60 60" />
          <path d="M122 78 L 140 60" />
          <path d="M78 122 L 60 140" />
          <path d="M122 122 L 140 140" />
          <circle cx="60" cy="60" fill="currentColor" r="2" />
          <circle cx="140" cy="60" fill="currentColor" r="2" />
          <circle cx="60" cy="140" fill="currentColor" r="2" />
          <circle cx="140" cy="140" fill="currentColor" r="2" />
        </g>
      </svg>
    ),
      reverse: true,
      backgroundVariant: "gradient" as const,
      decorativePosition: "right" as const,
      decorativeSvg: (
        <svg
          className="w-full h-full text-primary dark:text-white"
          fill="currentColor"
          viewBox="0 0 200 200"
        >
          <path d="M100 170L85 140H115L100 170Z" />
          <path d="M85 140L75 110L100 100L125 110L115 140" />
          <path d="M75 110L55 105L65 130L85 140" />
        </svg>
      ),
    },
    {
      serviceNumber: t.services.service3.number,
      title: t.services.service3.title,
      description: t.services.service3.description,
      features: t.services.service3.features,
      icon: Zap,
    svgContent: (
      <svg
        className="w-64 h-64 text-primary dark:text-white opacity-80 animate-draw"
        fill="none"
        viewBox="0 0 200 200"
      >
        <g stroke="currentColor" strokeWidth="1.5">
          <path d="M50 140 L 150 140 L 170 120 L 70 120 Z" />
          <path d="M50 110 L 150 110 L 170 90 L 70 90 Z" />
          <path d="M50 80 L 150 80 L 170 60 L 70 60 Z" />
          <line x1="50" x2="50" y1="140" y2="80" />
          <line x1="150" x2="150" y1="140" y2="80" />
          <line x1="170" x2="170" y1="120" y2="60" />
          <circle cx="80" cy="130" fill="currentColor" r="2" />
          <circle cx="90" cy="130" fill="currentColor" r="2" />
          <circle cx="80" cy="100" fill="currentColor" r="2" />
          <circle cx="80" cy="70" fill="currentColor" r="2" />
        </g>
      </svg>
    ),
      reverse: false,
      backgroundVariant: "default" as const,
      decorativePosition: "bottom" as const,
      decorativeSvg: (
        <svg
          className="w-full h-full text-primary dark:text-white"
          fill="currentColor"
          viewBox="0 0 200 200"
        >
          <path d="M100 170L85 140H115L100 170Z" />
          <path d="M75 110L55 105L65 130L85 140" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {services.map((service, index) => (
        <ServiceDetail
          key={service.serviceNumber}
          {...service}
          reverse={index % 2 === 1}
        />
      ))}
    </>
  );
}
