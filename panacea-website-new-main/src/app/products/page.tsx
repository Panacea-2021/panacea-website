"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./productsPage.module.css";
import {
    ArrowRight,
    Check,
    Code,
    ShoppingBag,
    MapPin,
    CreditCard,
    Cloud,
    Bot,
    Utensils,
    HeartPulse,
    Truck,
    ShoppingCart,
    Home,
    GraduationCap,
    Users,
    RefreshCw,
    Server,
    Shield,
    MessageSquare,
    LifeBuoy,
    Search,
    PenTool,
    Database,
    Smartphone,
    Plug,
    FlaskConical,
    Rocket
} from "lucide-react";

export default function ProductsPage() {
    return (
        <div className="min-h-screen bg-white font-sans text-slate-800 selection:bg-blue-500/30">
            {/* 1. HERO SECTION */}
            <section className={`relative pt-32 pb-24 px-6 overflow-hidden bg-[#07133a] ${styles.productsHero}`}>
                {/* Background Gradients & Patterns */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.15)_0%,rgba(7,19,58,1)_70%)]" />
                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                </div>
                <div className={styles.heroMotion} aria-hidden="true">
                    <span />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
                    <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
                        Hyderabad's Leading Partner
                    </span>

                    <h1 className="text-4xl md:text-6xl lg:text-[4rem] font-bold text-white mb-6 leading-[1.1] tracking-tight">
                        On-Demand Product <br className="hidden md:block" />
                        <span className="text-[#FFD700]">Development Company</span> in <br className="hidden md:block" />
                        Hyderabad
                    </h1>

                    <p className="text-slate-300 text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-10">
                        Panacea IT services is a leading On-Demand Products Development Company in Hyderabad, specializing in building scalable, secure, and high-performance on-demand applications for startups, enterprises, and growing businesses.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 w-full">
                        <Link href="/contact" className="w-full sm:w-auto">
                            <button className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold flex items-center justify-center gap-2 hover:from-blue-700 hover:to-cyan-600 transition-colors shadow-lg shadow-cyan-500/25 w-full">
                                Get Started <ArrowRight size={18} />
                            </button>
                        </Link>
                        <button className="px-8 py-3.5 rounded-xl bg-transparent border border-white/20 text-white font-semibold hover:bg-white/5 transition-colors w-full sm:w-auto">
                            Mobile App Services
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 w-full max-w-3xl mx-auto border-t border-white/10 pt-10">
                        <div className="text-center">
                            <h3 className="text-4xl font-black text-white mb-2">2000+</h3>
                            <p className="text-xs text-slate-400 font-bold tracking-widest uppercase">Projects Delivered</p>
                        </div>
                        <div className="hidden md:block w-px h-16 bg-white/10" />
                        <div className="text-center">
                            <h3 className="text-4xl font-black text-white mb-2">1000+</h3>
                            <p className="text-xs text-slate-400 font-bold tracking-widest uppercase">Global Clients</p>
                        </div>
                        <div className="hidden md:block w-px h-16 bg-white/10" />
                        <div className="text-center">
                            <h3 className="text-4xl font-black text-white mb-2">14+</h3>
                            <p className="text-xs text-slate-400 font-bold tracking-widest uppercase">Years Experience</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. OVERVIEW SECTION */}
            <section className="py-24 px-6 bg-white shrink-0">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="inline-block px-4 py-1.5 rounded bg-blue-50 text-blue-600 text-xs font-bold tracking-widest uppercase mb-4">
                            Overview
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                            What Are <span className="text-blue-500">On-Demand Products?</span>
                        </h2>
                        <p className="text-slate-600 text-lg leading-relaxed mb-8">
                            On-demand products are digital platforms that allow users to request services or products instantly through mobile or web applications. As an experienced <span className="text-blue-500 font-semibold cursor-pointer underline decoration-blue-200 underline-offset-4">mobile app development company in Hyderabad</span>, we build customized solutions tailored to your industry and business model.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                "Ride-sharing apps", "Food delivery platforms", "Grocery delivery apps",
                                "Healthcare booking systems", "Home services applications", "",
                                "Logistics & courier platforms", "Marketplace applications"
                            ].filter(Boolean).map((item, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                        <Check size={12} className="text-green-600" />
                                    </div>
                                    <span className="text-sm font-semibold text-slate-700">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/3]">
                            <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop" alt="Team discussing" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>

                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 lg:-left-6 lg:right-auto right-6 bg-white py-3 px-6 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3">
                            <div className="text-yellow-500">⚡</div>
                            <span className="font-bold text-slate-900">Instant Delivery</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. SERVICES SECTION */}
            <section className="py-24 px-6 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1.5 rounded bg-blue-50 text-blue-600 text-xs font-bold tracking-widest uppercase mb-4">
                            What We Offer
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                            Our On-Demand Product <span className="text-blue-500">Development Services</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <Code size={24} className="text-blue-600" />, tint: "#93c5fd",
                                title: "Custom On-Demand App Development",
                                desc: "We develop fully customized on-demand mobile and web applications for iOS, Android, and cross-platform frameworks."
                            },
                            {
                                icon: <ShoppingBag size={24} className="text-blue-600" />, tint: "#d8b4fe",
                                title: "Multi-Vendor Marketplace Development",
                                desc: "Build scalable platforms that connect multiple service providers with customers in real-time."
                            },
                            {
                                icon: <MapPin size={24} className="text-blue-600" />, tint: "#86efac",
                                title: "Real-Time Tracking & Notifications",
                                desc: "GPS tracking, push notifications, order status updates, and real-time analytics."
                            },
                            {
                                icon: <CreditCard size={24} className="text-blue-600" />, tint: "#fdba74",
                                title: "Secure Payment Integration",
                                desc: "Seamlessly integrate major payment gateways including Stripe, PayPal, and more for secure transactions."
                            },
                            {
                                icon: <Cloud size={24} className="text-blue-600" />, tint: "#67e8f9",
                                title: "Cloud-Based Scalability",
                                desc: "Ensure your platform scales seamlessly with AWS, Google Cloud, and Azure architectures."
                            },
                            {
                                icon: <Bot size={24} className="text-blue-600" />, tint: "#fca5a5",
                                title: "AI-Powered Automation",
                                desc: "Integrate LLMs, chatbots, and predictive analytics to streamline specific operations."
                            }
                        ].map((srv, i) => (
                            <div key={i} className={`${styles.serviceCard} bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
                                <span
                                    aria-hidden
                                    className={styles.serviceCardTint}
                                    style={{ backgroundColor: srv.tint }}
                                />
                                <div className={styles.serviceCardContent}>
                                <div className="flex items-center gap-5 mb-5">
                                    <div className="w-14 h-14 rounded-xl border border-sky-100 bg-sky-50 flex items-center justify-center shrink-0">
                                        {srv.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900">{srv.title}</h3>
                                </div>
                                <p className="text-slate-600 leading-relaxed text-sm">{srv.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. DOMAINS SECTION */}
            <section className={`${styles.industriesSection} py-24 px-6 bg-white`}>
                <div className="max-w-5xl mx-auto text-center">
                    <span className="inline-block px-4 py-1.5 rounded bg-blue-50 text-blue-600 text-xs font-bold tracking-widest uppercase mb-4">
                        Domains
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-16">
                        Industries We <span className="text-blue-500">Serve</span>
                    </h2>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 text-left">
                        {[
                            { icon: <Utensils size={20} className="text-red-500" />, text: "Food & Restaurant", bg: "bg-red-50" },
                            { icon: <HeartPulse size={20} className="text-emerald-500" />, text: "Healthcare & Telemedicine", bg: "bg-emerald-50" },
                            { icon: <Truck size={20} className="text-amber-500" />, text: "Transportation & Logistics", bg: "bg-amber-50" },
                            { icon: <ShoppingCart size={20} className="text-purple-500" />, text: "E-commerce & Retail", bg: "bg-purple-50" },
                            { icon: <Home size={20} className="text-cyan-500" />, text: "Beauty & Home Services", bg: "bg-cyan-50" },
                            { icon: <GraduationCap size={20} className="text-blue-500" />, text: "Education & Skill Platforms", bg: "bg-blue-50" },
                        ].map((domain, i) => (
                            <div key={i} className={`${styles.industryCard} flex items-center gap-4 p-5 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-slate-50 transition-colors shadow-sm`}>
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${domain.bg}`}>
                                    {domain.icon}
                                </div>
                                <span className="font-bold text-slate-800 text-sm whitespace-nowrap">{domain.text}</span>
                            </div>
                        ))}
                    </div>

                    <p className="text-slate-600 text-lg">
                        We provide tailored on-demand solutions for both startups and established enterprises in Hyderabad and beyond.
                    </p>
                </div>
            </section>

            {/* 5. OUR EDGE SECTION */}
            <section className="py-24 px-6 bg-[#0a1b4e]">
                <div className="max-w-5xl mx-auto text-center">
                    <span className="inline-block px-4 py-1.5 rounded bg-white/5 border border-white/10 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
                        Our Edge
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-16">
                        Why Choose Panacea IT services for <br className="hidden md:block" />
                        <span className="text-[#FFD700]">On-Demand Development?</span>
                    </h2>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                        {[
                            { text: "Experienced development team", icon: <Users size={18} className="text-blue-400" /> },
                            { text: "Agile & DevOps-driven process", icon: <RefreshCw size={18} className="text-blue-400" /> },
                            { text: "Scalable cloud infrastructure", icon: <Server size={18} className="text-blue-400" /> },
                            { text: "Secure & performance-optimized architecture", icon: <Shield size={18} className="text-blue-400" /> },
                            { text: "Transparent communication", icon: <MessageSquare size={18} className="text-blue-400" /> },
                            { text: "Post-launch support & maintenance", icon: <LifeBuoy size={18} className="text-blue-400" /> },
                        ].map((edge, i) => (
                            <div key={i} className="flex items-center gap-4 p-6 rounded-xl bg-[#07133a] border border-blue-900/50 text-left hover:bg-[#0B1536] transition-colors shadow-sm">
                                <div className="shrink-0">{edge.icon}</div>
                                <span className="text-sm font-semibold text-white leading-tight">{edge.text}</span>
                            </div>
                        ))}
                    </div>

                    <p className="text-slate-400 text-sm leading-relaxed max-w-4xl mx-auto">
                        Our expertise ensures your on-demand platform is built for performance, growth, and long-term success. Explore our <span className="text-blue-400 font-semibold border-b border-blue-400/30 cursor-pointer pb-0.5 hover:text-blue-300">custom software development services</span> and <span className="text-blue-400 font-semibold border-b border-blue-400/30 cursor-pointer pb-0.5 hover:text-blue-300">cloud services for scalable apps</span>.
                    </p>
                </div>
            </section>

            {/* 6. DEVELOPMENT PROCESS SECTION */}
            <section className={`${styles.processSection} py-24 px-6 bg-white overflow-hidden relative`}>
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <span className="inline-block px-4 py-1.5 rounded bg-blue-50 text-blue-600 text-xs font-bold tracking-widest uppercase mb-4">
                        How We Work
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-20">
                        Our Development <span className="text-blue-500">Process</span>
                    </h2>

                    <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-8 md:gap-0 mt-10">
                        {/* Connecting Line (Desktop Background) */}
                        <div className={`hidden md:block absolute top-[45px] left-[5%] right-[5%] h-[2px] bg-blue-100 -z-10 ${styles.processConnector}`} />

                        {[
                            { id: "01", icon: <Search size={22} />, title: "Requirement Analysis & Business Strategy" },
                            { id: "02", icon: <PenTool size={22} />, title: "UI/UX Design & Wireframing" },
                            { id: "03", icon: <Database size={22} />, title: "Scalable Backend Development" },
                            { id: "04", icon: <Smartphone size={22} />, title: "Mobile & Web App Development" },
                            { id: "05", icon: <Plug size={22} />, title: "API & Payment Integration" },
                            { id: "06", icon: <FlaskConical size={22} />, title: "Testing & Quality Assurance" },
                            { id: "07", icon: <Rocket size={22} />, title: "Deployment & Post-Launch Support" }
                        ].map((step, index) => (
                            <div key={index} className="flex flex-row md:flex-col items-center flex-1 relative gap-6 md:gap-4 w-full md:w-auto text-left md:text-center group">
                                <span className="md:absolute md:-top-10 font-bold text-blue-500 text-sm hidden md:block">{step.id}</span>
                                <span className="font-bold text-blue-500 text-sm block md:hidden w-8 shrink-0">{step.id}</span>

                                <div className="w-16 h-16 md:w-[90px] md:h-[90px] rounded-full bg-white border-2 border-blue-100 flex items-center justify-center text-blue-500 shadow-sm relative shrink-0 group-hover:border-blue-500 group-hover:bg-blue-50 group-hover:scale-110 transition-all duration-300 z-10">
                                    {/* Small line dot connecting to the background line */}
                                    <div className="hidden md:block absolute top-1/2 -left-2 w-2 h-[2px] bg-blue-100" />
                                    <div className="hidden md:block absolute top-1/2 -right-2 w-2 h-[2px] bg-blue-100" />
                                    {step.icon}
                                </div>

                                <p className="text-xs md:text-sm font-bold text-slate-700 leading-tight md:max-w-[120px] md:mt-4">
                                    {step.title}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. BOTTOM CTA SECTION */}
            <section className="py-24 px-6 bg-[#07133a] border-t border-white/5 relative overflow-hidden text-center">
                {/* Subtle blur highlights */}
                <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
                    <span className="inline-block px-5 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-bold tracking-widest uppercase mb-8">
                        Ready To Build?
                    </span>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6">
                        Launch Your On-Demand <br className="hidden md:block" />
                        Platform Today
                    </h2>

                    <p className="text-slate-400 text-base md:text-lg mb-12 max-w-2xl">
                        Partner with Panacea IT services for scalable, secure on-demand application development in Hyderabad.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                        <Link href="/contact" className="w-full sm:w-auto">
                            <button className="w-full px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold flex items-center justify-center gap-2 hover:from-blue-700 hover:to-cyan-600 transition-colors shadow-xl shadow-cyan-500/20">
                                Contact Us <ArrowRight size={18} />
                            </button>
                        </Link>
                        <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-transparent border border-white/20 text-white font-semibold hover:bg-white/5 transition-colors">
                            App Support Services
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
