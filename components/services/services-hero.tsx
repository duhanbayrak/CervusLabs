"use client";

import { motion } from "framer-motion";
import { SectionTransition } from "@/components/transitions/section-transition";
import { useLanguage } from "@/contexts/language-context";

export function ServicesHero() {
  const { t } = useLanguage();
  return (
    <SectionTransition>
      <section className="relative z-10 pt-48 pb-16 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto relative">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-6xl lg:text-7xl font-display font-light tracking-[0.1em] text-primary dark:text-white mb-8"
          >
            {t.services.hero.title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-24 h-1 bg-primary dark:bg-white mx-auto mb-12 opacity-80"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl md:text-2xl font-body font-light text-gray-700 dark:text-gray-300 leading-relaxed mb-8"
          >
            {t.services.hero.description}
          </motion.p>
        </div>
      </section>
    </SectionTransition>
  );
}
