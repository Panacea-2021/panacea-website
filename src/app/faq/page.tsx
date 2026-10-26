import React from "react";
import HeroSection from "@/components/sections/HeroSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";

export const metadata = {
    title: 'Frequently Asked Questions | Panacea IT Services',
    description: 'Find answers to common questions about our software development, design, and digital marketing services.'
};

const generalFaqs = [
    { q: "What is your typical software development process?", a: "We follow an agile methodology starting from requirement gathering, moving into strategy and design, followed by development, rigorous QA testing, deployment, and ongoing maintenance." },
    { q: "What industries do you specialize in?", a: "We have proven expertise across 20+ industries including Healthcare, Finance, Education, Real Estate, E-commerce, and Logistics." },
    { q: "Do you offer post-launch support and maintenance?", a: "Yes, we provide comprehensive SLA-based support and maintenance packages to ensure your application remains secure, up-to-date, and performs optimally." },
    { q: "How long does it take to develop a custom application?", a: "The timeline varies significantly depending on the project's complexity and scope. A standard mobile or web app can take anywhere from 3 to 6 months, while complex enterprise systems may take longer. We provide a tailored timeline after the discovery phase." },
    { q: "What technology stack do you use?", a: "We use modern, scalable technologies. For frontend: React, Next.js, Vue. For backend: Node.js, Python, Java. For mobile: Swift, Kotlin, React Native, and Flutter. We also specialize in AWS/Azure cloud infrastructure." }
];

export default function FAQPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-500/30">
            <HeroSection
                title="Frequently Asked Questions"
                subtitle="We're Here to Help"
                overview="Find comprehensive answers to common questions about our services, methodologies, pricing, and how we partner with our clients for success."
            />

            <div className="py-12 bg-white">
                <FAQSection faqs={generalFaqs} />
            </div>

            <CTASection title="Still have questions?" />
        </div>
    );
}
