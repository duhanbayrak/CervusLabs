"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";
import { useState, useEffect, useRef } from "react";
import { AntlerMouseEffect } from "@/components/ui/AntlerMouseEffect";

export function HeroSection() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number; duration: number }>>([]);
  const mousePositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Set mounted to true immediately on client side
    setMounted(true);
    
    // Generate particles only on client side - optimized count (reduced from 50 to 30)
    const particleData = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 5,
    }));
    setParticles(particleData);
    
    // Start animations immediately after mount
    // Use multiple RAFs to ensure DOM is fully ready
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => {
        const raf3 = requestAnimationFrame(() => {
          setAnimationStarted(true);
        });
        return () => cancelAnimationFrame(raf3);
      });
      return () => cancelAnimationFrame(raf2);
    });
    
    return () => cancelAnimationFrame(raf1);
  }, []);

  // Branching lines from antlers - Minimalist optimized version
  // Reduced to essential branches only
  const branchingLines = [
    // Left antler branches - Key points only
    { id: 1, startX: 40, startY: 50, endX: 20, endY: 30, delay: 0 },
    { id: 2, startX: 60, startY: 40, endX: 30, endY: 20, delay: 0.2 },
    { id: 3, startX: 80, startY: 30, endX: 70, endY: 10, delay: 0.4 },
    // Right antler branches - Key points only
    { id: 4, startX: 140, startY: 40, endX: 170, endY: 20, delay: 0.2 },
    { id: 5, startX: 160, startY: 50, endX: 190, endY: 60, delay: 0.3 },
    { id: 6, startX: 120, startY: 30, endX: 130, endY: 10, delay: 0.5 },
    // Side branches from lower points
    { id: 7, startX: 25, startY: 85, endX: 10, endY: 100, delay: 0.6 },
    { id: 8, startX: 25, startY: 85, endX: 15, endY: 70, delay: 0.7 },
    { id: 9, startX: 175, startY: 85, endX: 190, endY: 100, delay: 0.6 },
    { id: 10, startX: 175, startY: 85, endX: 185, endY: 70, delay: 0.7 },
  ];

  return (
    <section 
      className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 text-center overflow-hidden"
    >
      {/* Antler Mouse Effect - Canvas API (optimized, replaces SVG branching) */}
      <AntlerMouseEffect />

      {/* Animated Gradient Background - Optimized */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div 
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary/15 dark:bg-white/8 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/15 dark:bg-white/8 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>



      {/* Animated Particles - Optimized (reduced count, removed mouse attraction for performance) */}
      {mounted && particles.map((particle) => {
        // Use fixed values based on particle id for consistency
        const xOffset = (particle.id % 10) * 5 - 25;
        
        return (
          <motion.div
            key={particle.id}
            className="absolute w-1.5 h-1.5 bg-primary/30 dark:bg-white/25 rounded-full pointer-events-none -z-10"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -150, 0],
              x: [0, xOffset, 0],
              opacity: [0.1, 0.5, 0.1],
              scale: [0.6, 1, 0.6],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        );
      })}


      {/* Deer Logo with Branching Lines */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10 relative w-56 h-56 md:w-72 md:h-72 lg:w-[320px] lg:h-[320px] opacity-90 hover:opacity-100 transition-opacity duration-500 z-10"
      >
        <div className="absolute inset-0 bg-primary/5 dark:bg-white/5 blur-3xl rounded-full -z-10" />
        
        {/* Branching Lines SVG - More prominent */}
        {mounted && (
          <svg
            className="absolute inset-0 w-full h-full text-primary/60 dark:text-white/40 pointer-events-none"
            fill="none"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            style={{ zIndex: -1 }}
          >
            {/* Main branches - Animated */}
            {branchingLines.map((line) => {
              const path = `M ${line.startX} ${line.startY} L ${line.endX} ${line.endY}`;
              return (
                <motion.path
                  key={`${line.id}`}
                  d={path}
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                  fill="none"
                  initial={false}
                  animate={animationStarted ? { 
                    pathLength: [0, 1, 0.6],
                    opacity: [0, 0.8, 0.6, 0.4, 0.2],
                  } : { pathLength: 0, opacity: 0 }}
                  transition={{
                    pathLength: {
                      duration: 4,
                      delay: line.delay,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut",
                    },
                    opacity: {
                      duration: 5,
                      delay: line.delay,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: [0.4, 0, 0.2, 1],
                      times: [0, 0.2, 0.4, 0.7, 1],
                    },
                  }}
                />
              );
            })}
            {/* Secondary branching - Animated */}
            {branchingLines.slice(0, 6).map((line) => {
              const midX = (line.startX + line.endX) / 2;
              const midY = (line.startY + line.endY) / 2;
              const angle = Math.atan2(line.endY - line.startY, line.endX - line.startX);
              const perpAngle = angle + Math.PI / 2;
              const branchLength = 12 + (line.id % 3) * 3;
              const branchX = midX + Math.cos(perpAngle) * branchLength;
              const branchY = midY + Math.sin(perpAngle) * branchLength;
              const branchPath = `M ${midX} ${midY} L ${Math.max(0, Math.min(200, branchX))} ${Math.max(0, Math.min(200, branchY))}`;
              return (
                <motion.path
                  key={`branch-${line.id}`}
                  d={branchPath}
                  stroke="currentColor"
                  strokeWidth="0.7"
                  strokeDasharray="2 3"
                  fill="none"
                  initial={false}
                  animate={animationStarted ? { 
                    pathLength: [0, 1, 0.5],
                    opacity: [0, 0.6, 0.5, 0.3, 0.15],
                  } : { pathLength: 0, opacity: 0 }}
                  transition={{
                    pathLength: {
                      duration: 3.5,
                      delay: line.delay + 0.8,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut",
                    },
                    opacity: {
                      duration: 4.5,
                      delay: line.delay + 0.8,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: [0.4, 0, 0.2, 1],
                      times: [0, 0.2, 0.4, 0.7, 1],
                    },
                  }}
                />
              );
            })}
          </svg>
        )}

        {/* Deer Logo SVG */}
        <svg
          className="w-full h-full text-primary dark:text-white stroke-current stroke-[1.5] drop-shadow-[0_0_15px_rgba(17,24,39,0.1)] dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] relative z-10"
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
          className="group relative px-10 py-4 overflow-hidden rounded-xl bg-primary text-white shadow-lg transition-all duration-300 hover:bg-opacity-90 hover:shadow-xl dark:bg-white dark:text-primary"
        >
          <span className="relative z-10 font-medium tracking-widest text-xs uppercase">
            {t.hero.viewWork}
          </span>
          <div className="absolute inset-0 h-full w-full scale-0 rounded-xl transition-all duration-300 group-hover:scale-100 group-hover:bg-gray-200/20" />
        </Link>

        <Link
          href="#contact"
          className="px-10 py-4 rounded-xl border border-gray-400 dark:border-gray-600 text-gray-800 dark:text-gray-300 hover:border-primary dark:hover:border-white hover:text-primary dark:hover:text-white transition-colors duration-300 backdrop-blur-sm bg-white/10 dark:bg-black/20"
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
