import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { ServicesGrid } from "@/components/home/services-grid";
import { WorkSection } from "@/components/home/work-section";
import { StatsSection } from "@/components/home/stats-section";
import { ContactSection } from "@/components/home/contact-section";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ServicesGrid />
      <WorkSection />
      <StatsSection />
      <ContactSection />
      <Footer />
    </>
  );
}
