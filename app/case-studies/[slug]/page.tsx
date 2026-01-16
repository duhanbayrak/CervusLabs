import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BackgroundLayerCaseStudies } from "@/components/layout/background-layer-case-studies";
import { ProjectDetailContent } from "@/components/case-studies/project-detail-content";
import { notFound } from "next/navigation";
import { translations } from "@/lib/i18n";

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const projects = [
    translations.en.projects.flowSync.slug,
    translations.en.projects.taskFlow.slug,
    translations.en.projects.dataBridge.slug,
  ];

  return projects.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const project = Object.values(translations.en.projects).find(
    (p) => p.slug === slug
  );

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

export default function ProjectDetailPage({ params }: Props) {
  const { slug } = params;
  const project = Object.values(translations.en.projects).find(
    (p) => p.slug === slug
  );

  if (!project) {
    notFound();
  }

  return (
    <>
      <BackgroundLayerCaseStudies />
      <Navbar />
      <ProjectDetailContent slug={slug} />
      <Footer />
    </>
  );
}
