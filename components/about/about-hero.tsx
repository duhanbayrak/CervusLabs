"use client";

import { motion } from "framer-motion";
import { SectionTransition } from "@/components/transitions/section-transition";
import { useLanguage } from "@/contexts/language-context";

export function AboutHero() {
  const { t } = useLanguage();
  return (
    <SectionTransition>
      <section className="relative z-10 pt-48 pb-24 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-6xl lg:text-7xl font-display font-light tracking-[0.1em] text-primary dark:text-white mb-8"
          >
            {t.about.hero.title}
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
            {t.about.hero.description}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            {t.about.hero.mission}
          </motion.p>
        </div>
      </section>
    </SectionTransition>
  );
}
