"use client";

import { useState, useEffect } from "react";
import { SectionTransition } from "@/components/transitions/section-transition";
import { useLanguage } from "@/contexts/language-context";
import { getPageContent } from "@/app/actions/page-content";

interface Company {
  name: string;
  logo_url: string;
}

export function TrustedBySection() {
  const { t, locale } = useLanguage();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCompanies = async () => {
      setLoading(true);
      const { data } = await getPageContent('trusted-by');
      if (data) {
        const companiesData: Company[] = [];
        // Find all company entries dynamically
        const companyEntries = data.filter(c => c.content_key.match(/^company\d+_name$/));
        
        // Sort by order_index or by number in content_key
        companyEntries.sort((a, b) => {
          const aMatch = a.content_key.match(/^company(\d+)_name$/);
          const bMatch = b.content_key.match(/^company(\d+)_name$/);
          const aNum = aMatch ? parseInt(aMatch[1]) : 0;
          const bNum = bMatch ? parseInt(bMatch[1]) : 0;
          return aNum - bNum;
        });
        
        companyEntries.forEach((nameContent) => {
          const name = locale === 'tr' ? (nameContent.value_tr || nameContent.value_en || '') : (nameContent.value_en || '');
          const logo_url = nameContent.metadata?.logo_url || '';
          if (name) {
            companiesData.push({ name, logo_url });
          }
        });
        
        setCompanies(companiesData);
      } else {
        setCompanies([]);
      }
      setLoading(false);
    };
    loadCompanies();
  }, [locale]);

  return (
    <SectionTransition>
      <section className="relative z-10 py-20 bg-primary text-white border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-10">
            {t.about.trustedBy.title}
          </p>
          {loading ? (
            <div className="flex flex-wrap justify-center gap-12 md:gap-24">
              <div className="h-12 w-32 bg-white/10 rounded animate-pulse" />
              <div className="h-12 w-32 bg-white/10 rounded animate-pulse" />
              <div className="h-12 w-32 bg-white/10 rounded animate-pulse" />
            </div>
          ) : companies.length === 0 ? (
            <div className="text-gray-400 text-sm">
              Henüz şirket eklenmemiş.
            </div>
          ) : (
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all">
              {companies.map((company, index) => (
                <div
                  key={company.name}
                  className="flex items-center justify-center h-12 max-w-[200px]"
                >
                  {company.logo_url ? (
                    <img
                      src={company.logo_url}
                      alt={company.name}
                      className="max-h-12 max-w-full object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                    />
                  ) : (
                    <span className="text-white/50 text-sm font-medium">{company.name}</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </SectionTransition>
  );
}
