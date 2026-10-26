import React from "react";
import { getPageContent, hireContent } from "@/data/companyContent";
import HeroSection from "@/components/sections/HeroSection";
import FeatureGrid from "@/components/sections/FeatureGrid";
import BenefitsSection from "@/components/sections/BenefitsSection";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const content = getPageContent("hire", resolvedParams.slug);
    if (!content) return { title: 'Service Not Found' };
    return { title: `${content.title} | Panacea IT Services`, description: content.overview };
}

export async function generateStaticParams() {
    return Object.keys(hireContent).map((slug) => ({
        slug: String(slug),
    }));
}

export default async function HirePage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const content = getPageContent("hire", resolvedParams.slug);
    if (!content) notFound();

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-500/30">
            <HeroSection title={content.title} subtitle={content.subtitle} overview={content.overview} />
            <FeatureGrid section={content.sections} />
            <BenefitsSection benefits={content.sections.benefits} title="Why Hire From Us" />
            <ProcessTimeline process={content.sections.process} />
            <FAQSection faqs={content.sections.faqs} />
            <CTASection title={`Hire Expert ${content.title.replace('Hire ', '')}`} />
        </div>
    );
}
