import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BackgroundLayerContact } from "@/components/layout/background-layer-contact";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactInfo } from "@/components/contact/contact-info";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact - Cervus Labs",
  description:
    "Get in touch with Cervus Labs to start your automation and AI transformation journey.",
};

export default function ContactPage() {
  return (
    <>
      <BackgroundLayerContact />
      <Navbar />
      <section className="relative z-10 pt-32 lg:pt-40 pb-20 px-6 lg:px-8 flex-grow flex items-center min-h-[calc(100vh-80px)]">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div className="flex flex-col justify-center h-full pt-8">
              <ContactHero />
              <ContactInfo />
            </div>
            <div className="relative">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
