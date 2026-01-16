import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BackgroundLayer } from "@/components/layout/background-layer";
import { TermsContent } from "@/components/terms/terms-content";

export const metadata: Metadata = {
  title: "Terms of Service - Cervus Labs",
  description: "Cervus Labs Terms of Service - Read our terms and conditions.",
};

export default function TermsPage() {
  return (
    <>
      <BackgroundLayer />
      <Navbar />
      <TermsContent />
      <Footer />
    </>
  );
}
