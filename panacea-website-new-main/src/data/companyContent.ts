
import React from "react";

export type ContentSection = {
    title: string;
    description: string;
    features?: { title: string; desc: string; }[];
    benefits?: string[];
    process?: { step: number; name: string; desc: string }[];
    faqs?: { q: string; a: string }[];
};

export type PageContent = {
    slug: string;
    title: string;
    subtitle: string;
    heroImage?: string;
    overview: string;
    sections: ContentSection;
};

// Common Default Data to Fallback On
const defaultBenefits = [
    "Scalable and secure architecture",
    "Tailored to your specific business needs",
    "High performance and speed",
    "Seamless integration with existing systems",
    "Dedicated support and maintenance",
];

const defaultProcess = [
    { step: 1, name: "Discovery", desc: "Understanding your requirements and defining project goals." },
    { step: 2, name: "Strategy", desc: "Crafting a roadmap and technical architecture." },
    { step: 3, name: "Design", desc: "Creating intuitive and engaging user interfaces." },
    { step: 4, name: "Development", desc: "Building the solution with modern technologies." },
    { step: 5, name: "Testing", desc: "Rigorous quality assurance and performance testing." },
    { step: 6, name: "Launch", desc: "Deploying the solution to production." },
];

const defaultFaqs = [
    { q: "How long does a typical project take?", a: "Project timelines vary based on complexity, but typically range from 2 to 6 months for standard applications." },
    { q: "Do you provide post-launch support?", a: "Yes, we offer comprehensive maintenance and support packages to ensure your application runs smoothly." },
    { q: "What technologies do you use?", a: "We use modern stacks including Next.js, React, Node.js, Python, AWS, and more, tailored to your specific needs." },
];

export const servicesContent: Record<string, PageContent> = {
    "mobile": {
        slug: "mobile",
        title: "Mobile App Development",
        subtitle: "Custom iOS, Android & cross-platform solutions",
        overview: "We build high-performance mobile applications that provide intuitive user experiences and drive business growth across all major platforms.",
        sections: {
            title: "Mobile Solutions",
            description: "End-to-end mobile development services from concept to store launch.",
            features: [
                { title: "Native iOS App", desc: "High-performance apps for iPhone and iPad." },
                { title: "Native Android App", desc: "Robust applications for the Android ecosystem." },
                { title: "Cross-Platform", desc: "React Native and Flutter apps for cost-effective scaling." },
            ],
            benefits: defaultBenefits,
            process: defaultProcess,
            faqs: defaultFaqs
        }
    },
    "web": {
        slug: "web",
        title: "Web Application Development",
        subtitle: "Scalable web apps built for your business",
        overview: "Our web development services deliver secure, scalable, and fully functional web applications tailored to your specific business workflows.",
        sections: {
            title: "Web Development Capabilities",
            description: "Modern web solutions using the latest frontend and backend technologies.",
            features: [
                { title: "Frontend Development", desc: "Engaging UIs using React, Next.js, and Vue." },
                { title: "Backend Systems", desc: "Secure and scalable server architectures." },
                { title: "Progressive Web Apps", desc: "App-like experiences in the browser." },
            ],
            benefits: defaultBenefits,
            process: defaultProcess,
            faqs: defaultFaqs
        }
    },
    "ios": {
        slug: "ios",
        title: "iOS App Development",
        subtitle: "Native iPhone apps with seamless UX",
        overview: "We specialize in creating premium, high-performance iOS applications using Swift and Objective-C that strictly adhere to Apple's human interface guidelines.",
        sections: {
            title: "iOS Capabilities",
            description: "Delivering exceptional Apple ecosystem experiences.",
            features: [
                { title: "Swift Development", desc: "Modern, safe, and fast iOS applications." },
                { title: "iPad Optimization", desc: "Tailored experiences for larger screens." },
            ],
            benefits: defaultBenefits,
            process: defaultProcess,
            faqs: defaultFaqs
        }
    },
    "custom": {
        slug: "custom",
        title: "Custom Software Development",
        subtitle: "Tailored solutions for unique business needs",
        overview: "We design and develop bespoke software solutions that map perfectly to your unique business processes, eliminating inefficiencies.",
        sections: {
            title: "Custom Solutions",
            description: "Software that adapts to you, not the other way around.",
            features: [
                { title: "Enterprise Software", desc: "Large-scale systems for complex organizations." },
                { title: "Workflow Automation", desc: "Streamlining repetitive business tasks." },
            ],
            benefits: defaultBenefits,
            process: defaultProcess,
            faqs: defaultFaqs
        }
    },
    "android": {
        slug: "android",
        title: "Android App Development",
        subtitle: "Robust apps for the Android ecosystem",
        overview: "We develop reliable and scalable Android applications using Kotlin and Java, ensuring compatibility across a vast range of devices.",
        sections: {
            title: "Android Advantages",
            description: "Reaching the largest mobile user base globally.",
            features: [
                { title: "Kotlin Architecture", desc: "Modern and concise Android development." },
                { title: "Device Compatibility", desc: "Optimized for various screen sizes and hardware." },
            ],
            benefits: defaultBenefits,
            process: defaultProcess,
            faqs: defaultFaqs
        }
    },
    "ai-consulting": {
        slug: "ai-consulting",
        title: "AI Consulting & Strategy",
        subtitle: "Navigate the AI landscape securely",
        overview: "Our AI consulting services help you identify opportunities to integrate artificial intelligence into your business, driving efficiency and innovation.",
        sections: {
            title: "AI Strategy",
            description: "Transforming your business with intelligent data.",
            features: [
                { title: "AI Readiness Assessment", desc: "Evaluating your infrastructure for AI adoption." },
                { title: "Use Case Identification", desc: "Finding the best-ROI AI applications for you." },
            ],
            benefits: ["Data-driven decision making", "Operational efficiency", "Competitive advantage"],
            process: defaultProcess,
            faqs: defaultFaqs
        }
    },
    "seo": {
        slug: "seo",
        title: "SEO Optimization",
        subtitle: "Rank higher on search engines",
        overview: "Our data-driven SEO strategies improve your online visibility, drive organic traffic, and secure top rankings on Google and other search engines.",
        sections: {
            title: "SEO Strategies",
            description: "Comprehensive optimization for long-term growth.",
            features: [
                { title: "On-Page SEO", desc: "Optimizing content and HTML source code." },
                { title: "Technical SEO", desc: "Improving site speed and crawlability." },
                { title: "Link Building", desc: "Establishing domain authority." },
            ],
            benefits: ["Increased organic traffic", "Higher brand credibility", "Better user experience"],
            process: defaultProcess,
            faqs: defaultFaqs
        }
    }
};

export const productsContent: Record<string, PageContent> = {
    "child-care": {
        slug: "child-care",
        title: "Child Care System",
        subtitle: "Streamline daycare operations",
        overview: "An all-in-one management platform designed specifically for child care centers and daycares to handle administration, billing, and parent communication.",
        sections: {
            title: "System Features",
            description: "Everything you need to run your center efficiently.",
            features: [
                { title: "Attendance Tracking", desc: "Digital check-in/out for children and staff." },
                { title: "Automated Billing", desc: "Seamless invoicing and payment processing." },
            ],
            benefits: ["Reduced administrative work", "Improved parent engagement", "Accurate record keeping"],
            process: defaultProcess,
            faqs: defaultFaqs
        }
    },
    "school": {
        slug: "school",
        title: "School Management App",
        subtitle: "All-in-one educational platform",
        overview: "A comprehensive digital solution to manage school operations, from admissions and academics to fee collection and transport.",
        sections: {
            title: "Platform Modules",
            description: "Connecting students, parents, and teachers.",
            features: [
                { title: "Academic Management", desc: "Timetables, exams, and grading." },
                { title: "Parent Portal", desc: "Real-time updates on student progress." },
            ],
            benefits: ["Streamlined operations", "Enhanced communication", "Data security"],
            process: defaultProcess,
            faqs: defaultFaqs
        }
    },
    "car-wash": {
        slug: "car-wash",
        title: "Car Wash App",
        subtitle: "Book auto cleaning instantly",
        overview: "An on-demand car wash booking system connecting vehicle owners with professional detailers for scheduling doorstep or on-site services.",
        sections: {
            title: "App Features",
            description: "Modernizing the car detailing business.",
            features: [
                { title: "Instant Booking", desc: "Schedule washes with a few taps." },
                { title: "Service Tracking", desc: "Real-time updates on washer arrival." },
            ],
            benefits: ["Increased bookings", "Optimized scheduling", "Customer loyalty"],
            process: defaultProcess,
            faqs: defaultFaqs
        }
    }
};

export const hireContent: Record<string, PageContent> = {
    "mobile": {
        slug: "mobile",
        title: "Hire Mobile App Developers",
        subtitle: "Full-cycle iOS & Android app specialists",
        overview: "Augment your team with our top-tier mobile app developers. We provide experienced engineers skilled in Swift, Kotlin, React Native, and Flutter.",
        sections: {
            title: "Developer Expertise",
            description: "Vetted professionals ready to build your app.",
            features: [
                { title: "Native Experts", desc: "Deep knowledge of iOS and Android SDKs." },
                { title: "Cross-Platform", desc: "Efficient development with hybrid frameworks." },
            ],
            benefits: ["Cost-effective scaling", "Faster time to market", "No recruitment overhead"],
            process: [
                { step: 1, name: "Consultation", desc: "Discuss your resource requirements." },
                { step: 2, name: "Selection", desc: "Interview shortlisted candidates." },
                { step: 3, name: "Onboarding", desc: "Seamless integration into your team workflow." }
            ],
            faqs: defaultFaqs
        }
    },
    "react": {
        slug: "react",
        title: "Hire React Native Developers",
        subtitle: "JavaScript-powered mobile apps with native feel",
        overview: "Hire expert React Native developers to build highly performant, cross-platform mobile applications using a single JavaScript codebase.",
        sections: {
            title: "React Native Skills",
            description: "Bridging the gap between web and mobile.",
            features: [
                { title: "UI/UX Implementation", desc: "Pixel-perfect, fluid interfaces." },
                { title: "API Integration", desc: "Seamless server connectivity." },
            ],
            benefits: ["Code reusability", "Faster development cycle", "Native-like performance"],
            process: [
                { step: 1, name: "Consultation", desc: "Discuss your resource requirements." },
                { step: 2, name: "Selection", desc: "Interview shortlisted candidates." },
                { step: 3, name: "Onboarding", desc: "Seamless integration into your team workflow." }
            ],
            faqs: defaultFaqs
        }
    }
};

export const companyContent: Record<string, PageContent> = {
    "about": {
        slug: "about",
        title: "About Panacea",
        subtitle: "Company Overview",
        overview: "Panacea IT Services is a leading technology solutions provider specializing in digital transformation, software development, and enterprise IT consulting.",
        sections: {
            title: "Who We Are",
            description: "Empowering businesses through technology.",
            features: [
                { title: "Global Reach", desc: "Delivering solutions to clients worldwide." },
                { title: "Innovation Focused", desc: "Always adopting the latest technologies." },
            ],
            benefits: ["14+ Years Experience", "1500+ Projects Completed", "ISO Certified"],
            process: defaultProcess,
            faqs: defaultFaqs
        }
    },
    "vision": {
        slug: "vision",
        title: "Vision & Mission",
        subtitle: "Driving digital innovation with purpose",
        overview: "Our vision is to be the global partner of choice for digital transformation, while our mission is to empower businesses with innovative, scalable software that drives measurable results.",
        sections: {
            title: "Our Core Values",
            description: "The principles that guide our work.",
            features: [
                { title: "Excellence", desc: "Uncompromising quality in every deliverable." },
                { title: "Client Centricity", desc: "Your success is our priority." },
            ],
            benefits: ["Transparent processes", "Dedicated partnerships", "Commitment to innovation"],
            process: defaultProcess,
            faqs: defaultFaqs
        }
    },
    "leadership": {
        slug: "leadership",
        title: "Leadership Team",
        subtitle: "Experienced minds guiding Panacea",
        overview:
            "Panacea is led by founders and operators who blend product vision, engineering depth, and operational excellence — building reliable digital products for startups and enterprises.",
        sections: {
            title: "How Leadership Shows Up",
            description: "Hands-on guidance from strategy through delivery.",
            features: [
                { title: "Founder-led delivery", desc: "Direct involvement on architecture, UX, and go-to-market decisions." },
                { title: "Cross-functional teams", desc: "Design, engineering, QA, and growth collaborating as one unit." },
                { title: "Global mindset", desc: "Delivery culture shaped by Hyderabad and USA market experience." },
            ],
            benefits: [
                "Clear ownership and accountability",
                "Transparent communication",
                "Quality-first engineering standards",
            ],
            process: [
                { step: 1, name: "Align", desc: "Understand business goals and constraints with stakeholders." },
                { step: 2, name: "Staff", desc: "Assemble the right mix of product and engineering talent." },
                { step: 3, name: "Guide", desc: "Weekly reviews, risk management, and decision support." },
                { step: 4, name: "Scale", desc: "Grow teams and systems as product traction increases." },
            ],
            faqs: defaultFaqs,
        },
    },
    "journey": {
        slug: "journey",
        title: "Our Journey",
        subtitle: "14+ years of building digital products",
        overview:
            "From early mobile and web engagements to SaaS platforms and enterprise systems, Panacea has grown into an ISO-certified partner trusted across industries — refining how we design, build, and support software that lasts.",
        sections: {
            title: "Milestones That Shaped Us",
            description: "A practical path from craftsmanship to scale.",
            features: [
                { title: "Product craft", desc: "Strong UI/UX and engineering fundamentals on every engagement." },
                { title: "Industry breadth", desc: "Education, fintech, logistics, healthcare-adjacent, and marketplace domains." },
                { title: "Delivery maturity", desc: "Repeatable processes for discovery, sprints, QA, and release." },
            ],
            benefits: ["14+ years experience", "1500+ projects delivered", "Hyderabad + USA presence"],
            process: [
                { step: 1, name: "Foundations", desc: "Built core mobile and web delivery capabilities." },
                { step: 2, name: "Products", desc: "Launched vertical products and reusable platform modules." },
                { step: 3, name: "Scale", desc: "Expanded team, cloud practices, and enterprise engagements." },
                { step: 4, name: "Today", desc: "ISO-certified delivery with full-stack digital services." },
            ],
            faqs: defaultFaqs,
        },
    },
    "awards": {
        slug: "awards",
        title: "Awards & Recognition",
        subtitle: "Celebrating craft, quality, and impact",
        overview:
            "Recognition matters when it reflects real outcomes — design excellence, engineering reliability, and client trust. Panacea’s awards highlight a culture of quality across product and delivery.",
        sections: {
            title: "What Recognition Means Here",
            description: "Standards we continue to raise on every project.",
            features: [
                { title: "Design excellence", desc: "Interfaces that balance beauty with usability and conversion." },
                { title: "Engineering quality", desc: "Secure, maintainable systems built for production reality." },
                { title: "Client outcomes", desc: "Partners who return because delivery is dependable." },
            ],
            benefits: ["Quality-first culture", "Peer and industry recognition", "Continuous improvement"],
            process: defaultProcess,
            faqs: defaultFaqs,
        },
    },
    "nasscom": {
        slug: "nasscom",
        title: "NASSCOM Membership",
        subtitle: "Part of India’s premier IT industry network",
        overview:
            "Panacea is proud to be associated with NASSCOM’s ecosystem — staying connected to industry standards, talent practices, and the broader Indian technology community.",
        sections: {
            title: "Why Membership Matters",
            description: "Credibility, community, and continuous learning.",
            features: [
                { title: "Industry alignment", desc: "Practices informed by national IT and digital standards." },
                { title: "Talent & capability", desc: "Access to insights on skills, roles, and emerging tech." },
                { title: "Network effects", desc: "Connections across product companies, startups, and enterprises." },
            ],
            benefits: ["Trusted industry association", "Up-to-date market awareness", "Professional credibility"],
            process: defaultProcess,
            faqs: defaultFaqs,
        },
    }
};

// Helper function to resolve generic missing routes
export function getPageContent(category: string, slug: string): PageContent {
    let dictionary;
    if (category === "services") dictionary = servicesContent;
    else if (category === "products") dictionary = productsContent;
    else if (category === "hire") dictionary = hireContent;
    else if (category === "company") dictionary = companyContent;

    if (dictionary && dictionary[slug]) {
        return dictionary[slug];
    }

    // Generic Fallback generator for unmapped routes so we never hit a true 404 visually
    const formattedTitle = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return {
        slug,
        title: `${formattedTitle} Solutions`,
        subtitle: `Expert ${formattedTitle} services tailored for you`,
        overview: `At Panacea IT Services, we provide comprehensive ${formattedTitle.toLowerCase()} solutions designed to streamline operations, enhance user engagement, and accelerate your digital transformation journey.`,
        sections: {
            title: `Our ${formattedTitle} Offerings`,
            description: "Industry-leading expertise to help you scale.",
            features: [
                { title: "End-to-End Delivery", desc: "From concept to deployment." },
                { title: "Scalable Architecture", desc: "Built for future growth." },
                { title: "Dedicated Support", desc: "24/7 monitoring and maintenance." },
            ],
            benefits: defaultBenefits,
            process: defaultProcess,
            faqs: defaultFaqs
        }
    };
}
