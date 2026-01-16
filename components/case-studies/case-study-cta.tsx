"use client";

import { SectionTransition } from "@/components/transitions/section-transition";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";

export function CaseStudyCTA() {
  const { t } = useLanguage();
  return (
    <SectionTransition>
      <section className="relative z-10 py-32 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 network-grid [mask-image:linear-gradient(to_bottom,transparent,black)]" />
        </div>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-20">
          <h2 className="text-4xl md:text-5xl font-display font-light tracking-tight mb-8">
            {t.caseStudies.cta.title}
          </h2>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t.caseStudies.cta.description}
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 bg-white text-primary font-display font-bold tracking-widest text-sm uppercase hover:bg-gray-200 transition-colors duration-300 rounded-sm"
          >
            {t.caseStudies.cta.button}
          </Link>
        </div>
      </section>
    </SectionTransition>
  );
}
