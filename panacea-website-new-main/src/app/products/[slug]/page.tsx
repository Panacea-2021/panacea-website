import React from "react";
import { getPageContent, productsContent } from "@/data/companyContent";
import HeroSection from "@/components/sections/HeroSection";
import FeatureGrid from "@/components/sections/FeatureGrid";
import BenefitsSection from "@/components/sections/BenefitsSection";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const content = getPageContent("products", resolvedParams.slug);
    if (!content) return { title: 'Product Not Found' };
    return { title: `${content.title} | Panacea IT Services`, description: content.overview };
}

export async function generateStaticParams() {
    return Object.keys(productsContent).map((slug) => ({
        slug: String(slug),
    }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const content = getPageContent("products", resolvedParams.slug);
    if (!content) notFound();

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-500/30">
            <HeroSection title={content.title} subtitle={content.subtitle} overview={content.overview} />
            <FeatureGrid section={content.sections} />
            <BenefitsSection benefits={content.sections.benefits} title="Product Advantages" />
            <ProcessTimeline process={content.sections.process} />
            <FAQSection faqs={content.sections.faqs} />
            <CTASection title="Request a Product Demo" />
        </div>
    );
}
