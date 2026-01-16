"use client";

import Link from "next/link";
import { SectionTransition } from "@/components/transitions/section-transition";
import { useLanguage } from "@/contexts/language-context";
import { ArrowRight } from "lucide-react";

export function SitemapContent() {
  const { t } = useLanguage();

  const pages = [
    { href: "/", label: t.sitemap.pages.home },
    { href: "/services", label: t.sitemap.pages.services },
    { href: "/case-studies", label: t.sitemap.pages.caseStudies },
    { href: "/about", label: t.sitemap.pages.about },
    { href: "/contact", label: t.sitemap.pages.contact },
    { href: "/privacy", label: t.sitemap.pages.privacy },
    { href: "/terms", label: t.sitemap.pages.terms },
  ];

  return (
    <SectionTransition>
      <section className="relative z-10 pt-32 pb-24 px-6 lg:px-8 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <SectionTransition delay={0.1}>
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-display font-light text-primary dark:text-white mb-4 tracking-tight">
                {t.sitemap.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {t.sitemap.description}
              </p>
            </div>
          </SectionTransition>

          <SectionTransition delay={0.2}>
            <div className="space-y-4">
              {pages.map((page, index) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="group flex items-center justify-between p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl hover:border-primary dark:hover:border-white transition-all duration-300"
                >
                  <span className="text-lg font-display font-medium text-primary dark:text-white">
                    {page.label}
                  </span>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary dark:group-hover:text-white group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </SectionTransition>
        </div>
      </section>
    </SectionTransition>
  );
}
