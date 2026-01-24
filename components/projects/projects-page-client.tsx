'use client';

import { useLanguage } from '@/contexts/language-context';
import { SectionTransition } from '@/components/transitions/section-transition';
import { ProjectsGrid } from './projects-grid';
import { Project } from '@/lib/supabase/types';

interface ProjectsPageClientProps {
  projects: Project[];
  error: string | null;
}

export function ProjectsPageClient({ projects, error }: ProjectsPageClientProps) {
  const { t } = useLanguage();

  return (
    <section className="relative z-10 pt-32 pb-24 px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <SectionTransition>
          <div className="mb-16 border-b border-gray-300 dark:border-gray-800 pb-6">
            <h1 className="text-4xl font-display font-light text-primary dark:text-white mb-4">
              {t.projects.title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t.projects.subtitle}
            </p>
          </div>
        </SectionTransition>

        {error ? (
          <div className="text-center py-12">
            <p className="text-red-600 dark:text-red-400">
              {t.projects.errorLoading}: {error}
            </p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              {t.projects.noProjects}
            </p>
          </div>
        ) : (
          <ProjectsGrid projects={projects} />
        )}
      </div>
    </section>
  );
}
