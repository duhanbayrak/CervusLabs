"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "./project-card";
import { SectionTransition } from "@/components/transitions/section-transition";
import { useLanguage } from "@/contexts/language-context";

export function WorkSection() {
  const { t } = useLanguage();

  const projects = [
    {
      title: t.projects.flowSync.title,
      description: t.projects.flowSync.description,
      category: t.projects.flowSync.category,
      year: "2024",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCglXgSeOwZt32ZYsWaT78YBQ6GRn9uyZXqMnxrGZ4qv9SeAqKgVaPiRT3CIUQegOEIuvtWWEctkv5mpPWwzz97lIiUTJfknf1coL4e-Bo5_bwCpeDLS88rimEXI-3wCVn83mNHjLuLnovruUHDzCaTKkkd1ggwQX_At5nLmtCFsvFLX1iKTYfWvMXcISL5QUAU4OJ-kWC2-RF5SuaRKb5gpDJswgRij3TLpBV37i3F9xpP2Ps-7A-jDT2fZ0aOo2pZpX3NlQTYkKnz",
      imageAlt: "Workflow Automation Dashboard",
    },
    {
      title: t.projects.taskFlow.title,
      description: t.projects.taskFlow.description,
      category: t.projects.taskFlow.category,
      year: "2024",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBqJCeH0pXGDLZLo8iOfnGUxw5-UlYOmIlrvORLVVdc-JScytyC9-a4o-yD5yDb3YWKsnIWMgeIP-qGEEFdxro2O8eGBvnOP9r1mKsz3x9uUKeYwCKxcuxrRYFZ45kWzzoL6ZVlHqRN-jRvX9_WUM-qmAYNCeTBowbHb1mZyihIJsc2tFUKqiUl8JmgmD5f8a7152JSAcfUmqqSyw3yUtc8Z_N_2dPJgdjJRdPvod1v-ESgo4Z-PFRMrFNQfchLG-TvT5byXLWIJCPI",
      imageAlt: "SaaS Application Interface",
    },
    {
      title: t.projects.dataBridge.title,
      description: t.projects.dataBridge.description,
      category: t.projects.dataBridge.category,
      year: "2023",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC_wq2bysXtQEqDeZ368XAWtd_Vczv5DuVvm8iOy3lHo8V_r5KWzIOFR1V3bgEDAjzmafZdYIsg7PUzPQENVjhI4lDEAhAXRAPmR647Ux-8BjLNNwkmeqh4di-wiuVWo40Q1-iWucaouGnv1OCjCtNPeqjVPKC1krdf5na9xfuhfU6NdbusTTfgpH-or4yfLzWF2ZrDRvB0EZfZ-_44xOWQMucfvub_ZHZI04RaW9u_VYpeugkjpFpzXl4Prtyd5_oFOiQ0GkkWRtyf",
      imageAlt: "Data Integration Workflow",
    },
  ];

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
                href="#"
                className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors mt-4 md:mt-0"
              >
                {t.work.viewArchive} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </SectionTransition>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <SectionTransition key={project.title} delay={0.2 + index * 0.1}>
                <ProjectCard {...project} />
              </SectionTransition>
            ))}
          </div>

          <SectionTransition delay={0.5}>
            <div className="mt-8 text-center md:hidden">
              <Link
                href="#"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors"
              >
                {t.work.viewArchive} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </SectionTransition>
        </div>
      </section>
    </SectionTransition>
  );
}
