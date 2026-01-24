"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "./project-card";
import { SectionTransition } from "@/components/transitions/section-transition";
import { useLanguage } from "@/contexts/language-context";
import { Project } from "@/lib/supabase/types";

interface WorkSectionClientProps {
  projects: Project[];
}

export function WorkSectionClient({ projects }: WorkSectionClientProps) {
  const { t } = useLanguage();

  return (
    <SectionTransition>
      <section
        className="relative z-10 py-32 px-6 lg:px-8 bg-background-light dark:bg-background-dark"
        id="work"
      >
        <div className="max-w-7xl mx-auto">
          <SectionTransition delay={0.1}>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gray-300 dark:border-gray-800 pb-6">
              <div>
                <h2 className="text-3xl font-display font-light text-primary dark:text-white mb-2">
                  {t.work.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t.work.subtitle}
                </p>
              </div>
              <Link
                href="/projects"
                className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors mt-4 md:mt-0"
              >
                {t.work.viewArchive} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </SectionTransition>

          {projects.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                  <SectionTransition key={project.id} delay={0.2 + index * 0.1}>
                    <ProjectCard
                      title={project.title}
                      description={project.description}
                      category={project.category}
                      year={project.year}
                      imageUrl={project.image_url}
                      imageAlt={project.image_alt || project.title}
                      slug={project.slug}
                    />
                  </SectionTransition>
                ))}
              </div>

              <SectionTransition delay={0.5}>
                <div className="mt-8 text-center md:hidden">
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors"
                  >
                    {t.work.viewArchive} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </SectionTransition>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                {t.projects.noProjects}
              </p>
            </div>
          )}
        </div>
      </section>
    </SectionTransition>
  );
}
