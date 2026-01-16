"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";

export function HeroSection() {
  const { t } = useLanguage();
  return (
    <section className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
      {/* Network SVG Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[1400px] pointer-events-none -z-10">
        <svg
          className="w-full h-full text-gray-300 dark:text-white/10 opacity-60 animate-network-pulse"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 1000 800"
        >
          <g stroke="currentColor" strokeWidth="0.5">
            <path d="M500 400 L 100 100" strokeDasharray="4 4" />
            <path d="M500 400 L 900 100" strokeDasharray="4 4" />
            <path d="M500 400 L 100 700" strokeDasharray="4 4" />
            <path d="M500 400 L 900 700" strokeDasharray="4 4" />
            <path d="M500 400 L 500 100" opacity="0.5" />
            <path d="M500 400 L 200 400" opacity="0.5" />
            <path d="M500 400 L 800 400" opacity="0.5" />
            <path d="M300 300 L 700 300" opacity="0.3" />
            <path
              d="M200 400 L 300 200 L 700 200 L 800 400"
              fill="none"
              opacity="0.2"
            />
            <circle cx="500" cy="400" fill="none" r="150" strokeOpacity="0.2" />
            <circle
              cx="500"
              cy="400"
              fill="none"
              r="280"
              strokeDasharray="10 10"
              strokeOpacity="0.1"
            />
          </g>
          <circle
            className="animate-pulse"
            cx="300"
            cy="300"
            fill="currentColor"
            r="2"
          />
          <circle
            className="animate-pulse"
            cx="700"
            cy="300"
            fill="currentColor"
            r="2"
            style={{ animationDelay: "1s" }}
          />
          <circle
            className="animate-pulse"
            cx="500"
            cy="200"
            fill="currentColor"
            r="2"
            style={{ animationDelay: "2s" }}
          />
          <circle cx="200" cy="400" fill="currentColor" r="1.5" />
          <circle cx="800" cy="400" fill="currentColor" r="1.5" />
        </svg>
      </div>

      {/* Deer Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10 relative w-56 h-56 md:w-72 md:h-72 animate-draw opacity-90 hover:opacity-100 transition-opacity duration-500"
      >
        <div className="absolute inset-0 bg-primary/5 dark:bg-white/5 blur-3xl rounded-full -z-10" />
        <svg
          className="w-full h-full text-primary dark:text-white stroke-current stroke-[1.5] drop-shadow-[0_0_15px_rgba(17,24,39,0.1)] dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          fill="none"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M100 170L85 140H115L100 170Z" />
          <path d="M85 140L75 110L100 100L125 110L115 140" />
          <path d="M75 110L55 105L65 130L85 140" />
          <path d="M125 110L145 105L135 130L115 140" />
          <path d="M75 110L70 90L100 100L130 90L125 110" />
          <g className="opacity-80">
            <path d="M70 90L60 70L40 70L40 50" />
            <path d="M60 70L80 50L80 30" />
            <path d="M80 50L60 40" />
            <path d="M40 70L25 85" />
            <path d="M130 90L140 70L160 70L160 50" />
            <path d="M140 70L120 50L120 30" />
            <path d="M120 50L140 40" />
            <path d="M160 70L175 85" />
          </g>
          <circle cx="100" cy="100" fill="currentColor" r="1" />
          <circle
            className="animate-ping"
            cx="40"
            cy="50"
            fill="currentColor"
            r="1"
            style={{ animationDuration: "3s", opacity: 0.5 }}
          />
          <circle
            className="animate-ping"
            cx="160"
            cy="50"
            fill="currentColor"
            r="1"
            style={{ animationDuration: "3s", opacity: 0.5 }}
          />
        </svg>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="text-5xl md:text-7xl lg:text-8xl font-display font-light tracking-[0.25em] text-primary dark:text-white mb-6 uppercase drop-shadow-sm"
      >
        Cervus Labs
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl mx-auto text-sm md:text-base font-body tracking-widest text-gray-600 dark:text-gray-400 uppercase mb-12 font-medium"
      >
        {t.hero.tagline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col sm:flex-row gap-6"
      >
        <Link
          href="#work"
          className="group relative px-10 py-4 overflow-hidden rounded-sm bg-primary text-white shadow-lg transition-all duration-300 hover:bg-opacity-90 hover:shadow-xl dark:bg-white dark:text-primary"
        >
          <span className="relative z-10 font-medium tracking-widest text-xs uppercase">
            {t.hero.viewWork}
          </span>
          <div className="absolute inset-0 h-full w-full scale-0 rounded-sm transition-all duration-300 group-hover:scale-100 group-hover:bg-gray-200/20" />
        </Link>

        <Link
          href="#contact"
          className="px-10 py-4 rounded-sm border border-gray-400 dark:border-gray-600 text-gray-800 dark:text-gray-300 hover:border-primary dark:hover:border-white hover:text-primary dark:hover:text-white transition-colors duration-300 backdrop-blur-sm bg-white/10 dark:bg-black/20"
        >
          <span className="font-medium tracking-widest text-xs uppercase">
            {t.hero.contactUs}
          </span>
        </Link>
      </motion.div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-gray-400 dark:text-gray-600" />
      </div>
    </section>
  );
}
