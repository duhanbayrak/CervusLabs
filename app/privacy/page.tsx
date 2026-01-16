import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BackgroundLayer } from "@/components/layout/background-layer";
import { PrivacyContent } from "@/components/privacy/privacy-content";

export const metadata: Metadata = {
  title: "Privacy Policy - Cervus Labs",
  description: "Cervus Labs Privacy Policy - How we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <>
      <BackgroundLayer />
      <Navbar />
      <PrivacyContent />
      <Footer />
    </>
  );
}
