"use client";

import { SectionTransition } from "@/components/transitions/section-transition";
import { useLanguage } from "@/contexts/language-context";

export function TrustedBySection() {
  const { t } = useLanguage();
  return (
    <SectionTransition>
      <section className="relative z-10 py-20 bg-primary text-white border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-10">
            {t.about.trustedBy.title}
          </p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-60 grayscale">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-8 w-24 bg-current opacity-50 rounded"
              />
            ))}
          </div>
        </div>
      </section>
    </SectionTransition>
  );
}
