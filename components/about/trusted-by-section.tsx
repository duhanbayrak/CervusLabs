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
      try {
        const { data, error } = await getPageContent('trusted-by');
        if (error) {
          console.error('Error loading companies:', error);
          // Don't set empty array on error, might be temporary
          setCompanies([]);
          setLoading(false);
          return;
        }
        
        if (data && Array.isArray(data) && data.length > 0) {
          const companiesData: Company[] = [];
          // Find all company entries dynamically
          const companyEntries = data.filter(c => c.content_key && c.content_key.match(/^company\d+_name$/));
          
          if (companyEntries.length > 0) {
            // Sort by order_index or by number in content_key
            companyEntries.sort((a, b) => {
              // First try order_index
              if (a.order_index !== b.order_index) {
                return (a.order_index || 0) - (b.order_index || 0);
              }
              // Fallback to number in content_key
              const aMatch = a.content_key.match(/^company(\d+)_name$/);
              const bMatch = b.content_key.match(/^company(\d+)_name$/);
              const aNum = aMatch ? parseInt(aMatch[1]) : 0;
              const bNum = bMatch ? parseInt(bMatch[1]) : 0;
              return aNum - bNum;
            });
            
            companyEntries.forEach((nameContent) => {
              const name = locale === 'tr' ? (nameContent.value_tr || nameContent.value_en || '') : (nameContent.value_en || '');
              const logo_url = nameContent.metadata?.logo_url || '';
              // Add company if it has a name (logo is optional)
              if (name && name.trim()) {
                companiesData.push({ name: name.trim(), logo_url: logo_url?.trim() || '' });
              }
            });
          }
          
          setCompanies(companiesData);
        } else {
          setCompanies([]);
        }
      } catch (err) {
        console.error('Error loading companies:', err);
        setCompanies([]);
      } finally {
        setLoading(false);
      }
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
                  key={`${company.name}-${index}`}
                  className="flex items-center justify-center h-12 max-w-[200px]"
                >
                  {company.logo_url && company.logo_url.trim() ? (
                    <img
                      src={company.logo_url}
                      alt={company.name}
                      className="max-h-12 max-w-full object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                      onError={(e) => {
                        // If image fails to load, show company name instead
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          const fallback = document.createElement('span');
                          fallback.className = 'text-white/50 text-sm font-medium';
                          fallback.textContent = company.name;
                          parent.appendChild(fallback);
                        }
                      }}
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
