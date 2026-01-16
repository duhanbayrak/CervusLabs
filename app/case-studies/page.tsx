import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BackgroundLayerCaseStudies } from "@/components/layout/background-layer-case-studies";
import { CaseStudyHero } from "@/components/case-studies/case-study-hero";
import { ChallengeSolution } from "@/components/case-studies/challenge-solution";
import { PerformanceMetrics } from "@/components/case-studies/performance-metrics";
import { TechnologiesDeployed } from "@/components/case-studies/technologies-deployed";
import { CaseStudyCTA } from "@/components/case-studies/case-study-cta";

export const metadata: Metadata = {
  title: "Case Studies - Cervus Labs",
  description:
    "Optimizing global logistics through AI - A case study of intelligent supply chain solutions.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <BackgroundLayerCaseStudies />
      <Navbar />
      <CaseStudyHero />
      <ChallengeSolution />
      <PerformanceMetrics />
      <TechnologiesDeployed />
      <CaseStudyCTA />
      <Footer />
    </>
  );
}
