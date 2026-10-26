import React from "react";
import { getPageContent, companyContent } from "@/data/companyContent";
import HeroSection from "@/components/sections/HeroSection";
import FeatureGrid from "@/components/sections/FeatureGrid";
import BenefitsSection from "@/components/sections/BenefitsSection";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const content = getPageContent("company", resolvedParams.slug);
    if (!content) return { title: 'Page Not Found' };
    return { title: `${content.title} | Panacea IT Services`, description: content.overview };
}

export async function generateStaticParams() {
    return Object.keys(companyContent).map((slug) => ({
        slug: String(slug),
    }));
}

// Special case for static routing mappings
export default async function CompanyPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const content = getPageContent("company", resolvedParams.slug);
    if (!content) notFound();

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-500/30">
            <HeroSection title={content.title} subtitle={content.subtitle} overview={content.overview} />
            <FeatureGrid section={content.sections} />
            <BenefitsSection benefits={content.sections.benefits} title="Our Strengths" />
            <FAQSection faqs={content.sections.faqs} />
            <CTASection title="Discover Our Digital Solutions" />
        </div>
    );
}
