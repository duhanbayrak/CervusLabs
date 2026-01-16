import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BackgroundLayerAbout } from "@/components/layout/background-layer-about";
import { ServicesHero } from "@/components/services/services-hero";
import { ServicesContent } from "@/components/services/services-content";
import { HowWeWork } from "@/components/services/how-we-work";
import { ServicesCTA } from "@/components/services/services-cta";

export const metadata: Metadata = {
  title: "Services - Cervus Labs",
  description:
    "Intelligent solutions for enterprise automation, AI & machine learning, and cloud-native software development.",
};

export default function ServicesPage() {
  return (
    <>
      <BackgroundLayerAbout />
      <Navbar />
      <ServicesHero />
      <ServicesContent />
      <HowWeWork />
      <ServicesCTA />
      <Footer />
    </>
  );
}
