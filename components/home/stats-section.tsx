"use client";

import { useState, useEffect } from "react";
import { SectionTransition } from "@/components/transitions/section-transition";
import { useLanguage } from "@/contexts/language-context";
import { getPageContent } from "@/app/actions/page-content";
import { PageContent } from "@/app/actions/page-content";

export function StatsSection() {
  const { t, locale } = useLanguage();
  const [stats, setStats] = useState([
    { value: "45+", label: t.stats.enterpriseClients },
    { value: "$20M", label: t.stats.revenueGenerated },
    { value: "99.9%", label: t.stats.uptimeDelivered },
    { value: "12", label: t.stats.globalAwards },
  ]);

  useEffect(() => {
    const loadStats = async () => {
      const { data } = await getPageContent('stats');
      if (data) {
        const statsData: { value: string; label: string }[] = [];
        for (let i = 0; i < 4; i++) {
          const valueKey = `stat${i + 1}_value`;
          const labelKey = `stat${i + 1}_label`;
          const valueContent = data.find(c => c.content_key === valueKey);
          const labelContent = data.find(c => c.content_key === labelKey);
          
          if (valueContent && labelContent) {
            statsData.push({
              value: locale === 'tr' ? (valueContent.value_tr || valueContent.value_en || '') : (valueContent.value_en || ''),
              label: locale === 'tr' ? (labelContent.value_tr || labelContent.value_en || '') : (labelContent.value_en || ''),
            });
          }
        }
        if (statsData.length > 0) {
          setStats(statsData);
        }
      }
    };
    loadStats();
  }, [locale, t.stats.enterpriseClients, t.stats.revenueGenerated, t.stats.uptimeDelivered, t.stats.globalAwards]);

  return (
    <SectionTransition>
      <section className="relative z-10 py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-700/50">
            {stats.map((stat, index) => (
              <SectionTransition key={stat.label} delay={index * 0.1}>
                <div
                  className={`text-center px-4 ${index === 0 ? "" : "pl-4"}`}
                >
                  <div className="text-3xl md:text-4xl font-display font-bold mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs uppercase tracking-widest text-gray-400">
                    {stat.label}
                  </div>
                </div>
              </SectionTransition>
            ))}
          </div>
        </div>
      </section>
    </SectionTransition>
  );
}
