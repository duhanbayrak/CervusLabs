"use client";

import { useLanguage } from "@/contexts/language-context";
import { SectionTransition } from "@/components/transitions/section-transition";
import { AlertCircle, Brain, CheckCircle2, TrendingUp, Activity } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { Project } from "@/lib/supabase/types";

interface ProjectDetailContentProps {
  project: Project;
}

export function ProjectDetailContent({ project }: ProjectDetailContentProps) {
  const { t } = useLanguage();

  return (
    <SectionTransition>
      <section className="relative z-10 pt-32 pb-24 px-6 lg:px-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <SectionTransition delay={0.1}>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.projectDetail.backToProjects}
            </Link>
          </SectionTransition>

          {/* Hero Section */}
          <SectionTransition delay={0.2}>
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                <span className="px-3 py-1 text-xs font-mono font-bold tracking-wider uppercase text-primary dark:text-white border border-gray-300 dark:border-gray-700 rounded-full">
                  {project.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-primary dark:text-white mb-6 leading-tight">
                {project.title}
              </h1>
              <p className="text-lg md:text-xl font-body font-light text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
                {project.description}
              </p>
            </div>
          </SectionTransition>

          {/* Project Image */}
          {project.image_url && (
            <SectionTransition delay={0.3}>
              <div className="relative w-full h-96 md:h-[500px] rounded-xl overflow-hidden mb-16 bg-gray-200 dark:bg-gray-900">
                <Image
                  src={project.image_url}
                  alt={project.image_alt || project.title}
                  fill
                  className="object-cover"
                />
              </div>
            </SectionTransition>
          )}

          {/* Metrics */}
          {(project.metrics_time_saved || project.metrics_workflows_active || project.metrics_efficiency_gain) && (
            <SectionTransition delay={0.4}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {project.metrics_time_saved && (
                  <div className="p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl">
                    <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest font-mono mb-2">
                      {t.projectDetail.timeSaved}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-display font-bold text-primary dark:text-white">
                        {project.metrics_time_saved}
                      </span>
                      <TrendingUp className="text-green-500 w-6 h-6" />
                    </div>
                  </div>
                )}
                {project.metrics_workflows_active && (
                  <div className="p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl">
                    <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest font-mono mb-2">
                      {t.projectDetail.activeWorkflows}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-display font-bold text-primary dark:text-white">
                        {project.metrics_workflows_active}
                      </span>
                      <Activity className="text-blue-500 w-6 h-6" />
                    </div>
                  </div>
                )}
                {project.metrics_efficiency_gain && (
                  <div className="p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl">
                    <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest font-mono mb-2">
                      {t.projectDetail.efficiencyGain}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-display font-bold text-primary dark:text-white">
                        {project.metrics_efficiency_gain}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </SectionTransition>
          )}

          {/* Challenge & Solution */}
          {(project.challenge_title || project.solution_title) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
              {project.challenge_title && (
                <SectionTransition delay={0.5}>
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
                        <AlertCircle className="w-6 h-6 text-primary dark:text-white" />
                      </div>
                      <h2 className="text-2xl font-display font-bold text-primary dark:text-white uppercase tracking-wide">
                        {project.challenge_title}
                      </h2>
                    </div>
                    {project.challenge_description && (
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {project.challenge_description}
                      </p>
                    )}
                  </div>
                </SectionTransition>
              )}

              {project.solution_title && (
                <SectionTransition delay={0.6}>
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
                        <Brain className="w-6 h-6 text-primary dark:text-white" />
                      </div>
                      <h2 className="text-2xl font-display font-bold text-primary dark:text-white uppercase tracking-wide">
                        {project.solution_title}
                      </h2>
                    </div>
                    {project.solution_description && (
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                        {project.solution_description}
                      </p>
                    )}
                    {project.solution_features && project.solution_features.length > 0 && (
                      <ul className="space-y-3">
                        {project.solution_features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle2 className="text-primary dark:text-white mr-3 mt-1 w-5 h-5 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </SectionTransition>
              )}
            </div>
          )}

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <SectionTransition delay={0.7}>
              <div className="mb-16">
                <h2 className="text-2xl font-display font-bold text-primary dark:text-white mb-8 uppercase tracking-wide">
                  {t.projectDetail.technologiesUsed}
                </h2>
                <div className="flex flex-wrap gap-4">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full text-sm font-medium text-primary dark:text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </SectionTransition>
          )}

          {/* CTA */}
          <SectionTransition delay={0.8}>
            <div className="text-center p-12 bg-primary text-white rounded-xl">
              <h2 className="text-3xl font-display font-light mb-4">
                {t.projectDetail.cta.title}
              </h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                {t.projectDetail.cta.description}
              </p>
              <Link
                href="/contact"
                className="inline-block px-10 py-4 bg-white text-primary font-display font-bold tracking-widest text-sm uppercase hover:bg-gray-200 transition-colors duration-300 rounded-sm"
              >
                {t.projectDetail.cta.button}
              </Link>
            </div>
          </SectionTransition>
        </div>
      </section>
    </SectionTransition>
  );
}
