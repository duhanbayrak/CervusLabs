'use client';

import { ProjectCard } from '@/components/home/project-card';
import { SectionTransition } from '@/components/transitions/section-transition';
import { Project } from '@/lib/supabase/types';

interface ProjectsGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <SectionTransition key={project.id} delay={0.1 + index * 0.05}>
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
  );
}
