"use client";

import { useState, useEffect } from "react";
import { User } from "lucide-react";
import { SectionTransition } from "@/components/transitions/section-transition";
import { useLanguage } from "@/contexts/language-context";
import { getPageContent } from "@/app/actions/page-content";

interface Leader {
  name: string;
  role: string;
}

export function LeadershipSection() {
  const { t, locale } = useLanguage();
  const [leaders, setLeaders] = useState<Leader[]>([
    { name: "Dr. Elena Vos", role: "Chief Executive Officer" },
    { name: "Marcus Chen", role: "CTO & Lead Architect" },
    { name: "Sarah O'Neil", role: "Head of Product Design" },
    { name: "James Thorne", role: "VP of Engineering" },
  ]);

  useEffect(() => {
    const loadLeaders = async () => {
      const { data } = await getPageContent('leadership');
      if (data) {
        const leadersData: Leader[] = [];
        for (let i = 0; i < 4; i++) {
          const nameKey = `leader${i + 1}_name`;
          const nameContent = data.find(c => c.content_key === nameKey);
          
          if (nameContent) {
            const name = locale === 'tr' ? (nameContent.value_tr || nameContent.value_en || '') : (nameContent.value_en || '');
            const role = nameContent.metadata?.role || '';
            if (name) {
              leadersData.push({ name, role });
            }
          }
        }
        if (leadersData.length > 0) {
          setLeaders(leadersData);
        }
      }
    };
    loadLeaders();
  }, [locale]);
  return (
    <SectionTransition>
      <section className="relative z-10 py-24 bg-white dark:bg-background-dark border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionTransition delay={0.1}>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              <div>
                <h2 className="text-3xl font-display font-light text-primary dark:text-white mb-2">
                  {t.about.leadership.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t.about.leadership.subtitle}
                </p>
              </div>
            </div>
          </SectionTransition>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leaders.map((leader, index) => (
              <SectionTransition key={leader.name} delay={0.2 + index * 0.1}>
                <div className="group">
                  <div className="relative overflow-hidden aspect-[4/5] bg-gray-100 dark:bg-white/5 mb-4 rounded-sm">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-300 dark:text-gray-600 group-hover:scale-105 transition-transform duration-500">
                      <User className="w-24 h-24" />
                    </div>
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-display font-bold text-primary dark:text-white">
                    {leader.name}
                  </h3>
                  <p className="text-xs font-mono uppercase tracking-wider text-gray-500">
                    {leader.role}
                  </p>
                </div>
              </SectionTransition>
            ))}
          </div>
        </div>
      </section>
    </SectionTransition>
  );
}
