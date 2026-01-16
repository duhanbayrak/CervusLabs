"use client";

import { Mail, Share2 } from "lucide-react";
import { SectionTransition } from "@/components/transitions/section-transition";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";

export function ContactInfo() {
  const { t } = useLanguage();
  return (
    <SectionTransition>
      <div className="space-y-8">
        <SectionTransition delay={0.1}>
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center group-hover:border-primary dark:group-hover:border-white transition-colors">
              <Mail className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-1">
                {t.contact.info.emailUs}
              </p>
              <a
                className="text-lg font-medium text-primary dark:text-white hover:underline decoration-1 underline-offset-4"
                href="mailto:hello@cervuslabs.com"
              >
                hello@cervuslabs.com
              </a>
            </div>
          </div>
        </SectionTransition>
        <SectionTransition delay={0.2}>
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center group-hover:border-primary dark:group-hover:border-white transition-colors">
              <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-1">
                {t.contact.info.followUs}
              </p>
              <div className="flex gap-4 items-center">
                <Link
                  className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors flex items-center gap-2"
                  href="#"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span className="text-sm font-medium">LinkedIn</span>
                </Link>
                <span className="text-gray-300 dark:text-gray-700">|</span>
                <Link
                  className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors flex items-center gap-2"
                  href="#"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span className="text-sm font-medium">Twitter</span>
                </Link>
              </div>
            </div>
          </div>
        </SectionTransition>
      </div>
    </SectionTransition>
  );
}
