import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BackgroundLayer } from "@/components/layout/background-layer";
import { SitemapContent } from "@/components/sitemap/sitemap-content";

export const metadata: Metadata = {
  title: "Sitemap - Cervus Labs",
  description: "Cervus Labs website sitemap - Find all pages and sections.",
};

export default function SitemapPage() {
  return (
    <>
      <BackgroundLayer />
      <Navbar />
      <SitemapContent />
      <Footer />
    </>
  );
}
