import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BackgroundLayerAbout } from "@/components/layout/background-layer-about";
import { AboutHero } from "@/components/about/about-hero";
import { BranchingLogic } from "@/components/about/branching-logic";
import { ValuesGrid } from "@/components/about/values-grid";
import { LeadershipSection } from "@/components/about/leadership-section";
import { TrustedBySection } from "@/components/about/trusted-by-section";

export const metadata: Metadata = {
  title: "About Us - Cervus Labs",
  description: "Learn about Cervus Labs and our mission to bridge human potential and digital capability.",
};

export default function AboutPage() {
  return (
    <>
      <BackgroundLayerAbout />
      <Navbar />
      <AboutHero />
      <BranchingLogic />
      <ValuesGrid />
      <LeadershipSection />
      <TrustedBySection />
      <Footer />
    </>
  );
}
