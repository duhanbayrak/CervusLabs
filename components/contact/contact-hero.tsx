"use client";

import { motion } from "framer-motion";
import { SectionTransition } from "@/components/transitions/section-transition";
import { useLanguage } from "@/contexts/language-context";

export function ContactHero() {
  const { t } = useLanguage();
  return (
    <SectionTransition>
      <div className="mb-2">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="px-3 py-1 text-xs font-mono font-bold tracking-wider uppercase text-primary dark:text-white border border-gray-300 dark:border-gray-700 rounded-full bg-white/50 dark:bg-white/5"
        >
          {t.contact.hero.tag}
        </motion.span>
      </div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="text-5xl md:text-6xl font-display font-light text-primary dark:text-white mb-6 leading-tight tracking-tight"
      >
        {t.contact.hero.title} <br />
        <span className="font-bold">{t.contact.hero.titleBold}</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg mb-12 font-light"
      >
        {t.contact.hero.description}
      </motion.p>
    </SectionTransition>
  );
}
