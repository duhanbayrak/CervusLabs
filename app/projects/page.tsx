import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BackgroundLayerCaseStudies } from "@/components/layout/background-layer-case-studies";
import { getProjects } from "@/app/actions/projects";
import { ProjectsPageClient } from "@/components/projects/projects-page-client";

export const metadata: Metadata = {
  title: "Projects - Cervus Labs",
  description:
    "Explore our portfolio of successful projects and innovative solutions.",
};

export default async function ProjectsPage() {
  const { data: projects, error } = await getProjects();
  const projectsData = projects || [];

  return (
    <>
      <BackgroundLayerCaseStudies />
      <Navbar />
      <ProjectsPageClient projects={projectsData} error={error} />
      <Footer />
    </>
  );
}
