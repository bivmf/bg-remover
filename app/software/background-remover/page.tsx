import { AveryFooter } from "@/components/AveryFooter";
import { AveryHeader } from "@/components/AveryHeader";
import { AverySoftwareCTA } from "@/components/AverySoftwareCTA";
import { BackgroundRemoverHero } from "@/components/background-remover/BackgroundRemoverHero";
import { BenefitGrid } from "@/components/BenefitGrid";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQAccordion } from "@/components/FAQAccordion";
import { UseCaseCards } from "@/components/UseCaseCards";
import { FAQS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Free AI Background Remover | Make Images Transparent",
  description: "Remove image backgrounds free with Avery’s AI background remover. Upload a JPG, PNG, or WEBP and download a transparent PNG in seconds.",
  alternates: { canonical: "/software/background-remover" },
  openGraph: { title: "Free AI Background Remover | Avery", description: "Remove an image background and download a transparent PNG for free.", url: "/software/background-remover", siteName: "Avery", type: "website" },
  twitter: { card: "summary_large_image", title: "Free AI Background Remover | Avery", description: "Make an image transparent and download a high-resolution PNG." },
};

export default function BackgroundRemoverPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Avery AI Background Remover",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: "Remove image backgrounds and download a transparent PNG for free.",
  };

  return (
    <>
      <AveryHeader />
      <main id="main-content">
        <Breadcrumbs />
        <BackgroundRemoverHero />
        <BenefitGrid />
        <UseCaseCards />
        <FAQAccordion />
        <AverySoftwareCTA />
      </main>
      <AveryFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
    </>
  );
}
import type { Metadata } from "next";
