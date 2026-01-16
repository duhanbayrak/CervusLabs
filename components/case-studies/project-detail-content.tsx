"use client";

import { useLanguage } from "@/contexts/language-context";
import { SectionTransition } from "@/components/transitions/section-transition";
import { translations } from "@/lib/i18n";
import { AlertCircle, Brain, CheckCircle2, TrendingUp, Activity } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

interface ProjectDetailContentProps {
  slug: string;
}

export function ProjectDetailContent({ slug }: ProjectDetailContentProps) {
  const { t, locale } = useLanguage();
  const projectData = translations[locale as "en" | "tr"].projects;
  const project = Object.values(projectData).find((p) => p.slug === slug);

  if (!project || !("challenge" in project)) {
    return (
      <section className="relative z-10 pt-32 pb-24 px-6 lg:px-8 min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-display font-light text-primary dark:text-white mb-4">
            Project Not Found
          </h1>
          <Link
            href="/case-studies"
            className="text-primary dark:text-white hover:underline"
          >
            Back to Case Studies
          </Link>
        </div>
      </section>
    );
  }

  const projectWithDetails = project as typeof project & {
    challenge: { title: string; description: string };
    solution: { title: string; description: string; features: string[] };
    metrics: { timeSaved: string; workflowsActive: string; efficiencyGain: string };
    technologies: string[];
  };

  // Get image URL based on slug
  const getImageUrl = (slug: string) => {
    const imageMap: Record<string, string> = {
      "flow-sync":
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCglXgSeOwZt32ZYsWaT78YBQ6GRn9uyZXqMnxrGZ4qv9SeAqKgVaPiRT3CIUQegOEIuvtWWEctkv5mpPWwzz97lIiUTJfknf1coL4e-Bo5_bwCpeDLS88rimEXI-3wCVn83mNHjLuLnovruUHDzCaTKkkd1ggwQX_At5nLmtCFsvFLX1iKTYfWvMXcISL5QUAU4OJ-kWC2-RF5SuaRKb5gpDJswgRij3TLpBV37i3F9xpP2Ps-7A-jDT2fZ0aOo2pZpX3NlQTYkKnz",
      "task-flow":
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBqJCeH0pXGDLZLo8iOfnGUxw5-UlYOmIlrvORLVVdc-JScytyC9-a4o-yD5yDb3YWKsnIWMgeIP-qGEEFdxro2O8eGBvnOP9r1mKsz3x9uUKeYwCKxcuxrRYFZ45kWzzoL6ZVlHqRN-jRvX9_WUM-qmAYNCeTBowbHb1mZyihIJsc2tFUKqiUl8JmgmD5f8a7152JSAcfUmqqSyw3yUtc8Z_N_2dPJgdjJRdPvod1v-ESgo4Z-PFRMrFNQfchLG-TvT5byXLWIJCPI",
      "data-bridge":
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC_wq2bysXtQEqDeZ368XAWtd_Vczv5DuVvm8iOy3lHo8V_r5KWzIOFR1V3bgEDAjzmafZdYIsg7PUzPQENVjhI4lDEAhAXRAPmR647Ux-8BjLNNwkmeqh4di-wiuVWo40Q1-iWucaouGnv1OCjCtNPeqjVPKC1krdf5na9xfuhfU6NdbusTTfgpH-or4yfLzWF2ZrDRvB0EZfZ-_44xOWQMucfvub_ZHZI04RaW9u_VYpeugkjpFpzXl4Prtyd5_oFOiQ0GkkWRtyf",
    };
    return imageMap[slug] || imageMap["flow-sync"];
  };

  return (
    <SectionTransition>
      <section className="relative z-10 pt-32 pb-24 px-6 lg:px-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <SectionTransition delay={0.1}>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.projectDetail.backToCaseStudies}
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
          <SectionTransition delay={0.3}>
            <div className="relative w-full h-96 md:h-[500px] rounded-xl overflow-hidden mb-16 bg-gray-200 dark:bg-gray-900">
              <Image
                src={getImageUrl(slug)}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
          </SectionTransition>

          {/* Metrics */}
          <SectionTransition delay={0.4}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <div className="p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl">
                <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest font-mono mb-2">
                  {t.projectDetail.timeSaved}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-display font-bold text-primary dark:text-white">
                    {projectWithDetails.metrics.timeSaved}
                  </span>
                  <TrendingUp className="text-green-500 w-6 h-6" />
                </div>
              </div>
              <div className="p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl">
                <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest font-mono mb-2">
                  {t.projectDetail.activeWorkflows}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-display font-bold text-primary dark:text-white">
                    {projectWithDetails.metrics.workflowsActive}
                  </span>
                  <Activity className="text-blue-500 w-6 h-6" />
                </div>
              </div>
              <div className="p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl">
                <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest font-mono mb-2">
                  {t.projectDetail.efficiencyGain}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-display font-bold text-primary dark:text-white">
                    {projectWithDetails.metrics.efficiencyGain}
                  </span>
                </div>
              </div>
            </div>
          </SectionTransition>

          {/* Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
            <SectionTransition delay={0.5}>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
                    <AlertCircle className="w-6 h-6 text-primary dark:text-white" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-primary dark:text-white uppercase tracking-wide">
                    {projectWithDetails.challenge.title}
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {projectWithDetails.challenge.description}
                </p>
              </div>
            </SectionTransition>

            <SectionTransition delay={0.6}>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
                    <Brain className="w-6 h-6 text-primary dark:text-white" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-primary dark:text-white uppercase tracking-wide">
                    {projectWithDetails.solution.title}
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  {projectWithDetails.solution.description}
                </p>
                <ul className="space-y-3">
                  {projectWithDetails.solution.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="text-primary dark:text-white mr-3 mt-1 w-5 h-5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </SectionTransition>
          </div>

          {/* Technologies */}
          <SectionTransition delay={0.7}>
            <div className="mb-16">
              <h2 className="text-2xl font-display font-bold text-primary dark:text-white mb-8 uppercase tracking-wide">
                {t.projectDetail.technologiesUsed}
              </h2>
              <div className="flex flex-wrap gap-4">
                {projectWithDetails.technologies.map((tech, index) => (
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
