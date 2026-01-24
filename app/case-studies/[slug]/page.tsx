import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BackgroundLayerCaseStudies } from "@/components/layout/background-layer-case-studies";
import { ProjectDetailContent } from "@/components/case-studies/project-detail-content";
import { notFound } from "next/navigation";
import { getProjects } from "@/app/actions/projects";

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const { data: projects } = await getProjects();
  
  if (!projects) {
    return [];
  }

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const { data: projects } = await getProjects();
  const project = projects?.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found - Cervus Labs",
    };
  }

  return {
    title: `${project.title} - Cervus Labs`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = params;
  const { data: projects } = await getProjects();
  const project = projects?.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <BackgroundLayerCaseStudies />
      <Navbar />
      <ProjectDetailContent project={project} />
      <Footer />
    </>
  );
}
