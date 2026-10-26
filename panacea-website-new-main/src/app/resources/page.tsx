"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Smartphone, MonitorSmartphone, CheckCircle, ArrowRight, ArrowUpRight } from "lucide-react";
import AmbientParticles from "@/components/fx/AmbientParticles";

const productShowcase = [
    {
        label: "Digital product example",
        title: "Purpose-built business platforms",
        desc: "Bring everyday workflows into one clear, dependable web experience, designed around the people who use it.",
        image: "/childcaremanage.webp",
        alt: "Panacea childcare management software product preview",
        tags: ["Web platforms", "Workflow tools"]
    },
    {
        label: "Mobile experience",
        title: "Mobile apps people enjoy using",
        desc: "Create connected iOS and Android experiences, from early product definition through launch and iteration.",
        image: "/influencer-app.webp",
        alt: "Panacea influencer mobile application product preview",
        tags: ["iOS & Android", "React Native"]
    },
    {
        label: "Financial technology example",
        title: "Secure digital services",
        desc: "Make complex services feel simple with thoughtful interfaces, robust integrations, and a reliable technical foundation.",
        image: "/stocks-app.webp",
        alt: "Panacea stocks application product preview",
        tags: ["Fintech", "Product engineering"]
    }
];

const resourcesData = [
    {
        category: "Mobile App Developers",
        desc: "Hire dedicated mobile app developers to build native or cross-platform applications.",
        icon: <Smartphone size={32} className="text-blue-500" />,
        skills: ["iOS (Swift/Objective-C)", "Android (Kotlin/Java)", "React Native", "Flutter"]
    },
    {
        category: "Web App Developers",
        desc: "Full-stack developers for scalable, secure, and high-performance web applications.",
        icon: <MonitorSmartphone size={32} className="text-blue-500" />,
        skills: ["React & Next.js", "Node.js & Express", "Python & Django", "Angular & Vue"]
    }
];

const deliverySteps = [
    {
        number: "01",
        title: "Understand the need",
        desc: "Align on your users, goals, constraints, and what a useful first release should achieve."
    },
    {
        number: "02",
        title: "Plan the solution",
        desc: "Shape the product experience, technical approach, milestones, and the right team mix."
    },
    {
        number: "03",
        title: "Build and validate",
        desc: "Develop in focused increments, review progress together, and test quality throughout."
    },
    {
        number: "04",
        title: "Launch and evolve",
        desc: "Prepare for release, support the transition, and prioritize improvements from real use."
    }
];

const backgroundDots = [
    { left: "8%", top: "18%", color: "#8b5cf6", size: 6, delay: 0 },
    { left: "23%", top: "42%", color: "#06b6d4", size: 5, delay: 1.1 },
    { left: "41%", top: "15%", color: "#3b82f6", size: 7, delay: 2.2 },
    { left: "57%", top: "54%", color: "#14b8a6", size: 5, delay: 0.7 },
    { left: "73%", top: "24%", color: "#a855f7", size: 6, delay: 1.8 },
    { left: "89%", top: "62%", color: "#06b6d4", size: 7, delay: 2.8 },
    { left: "33%", top: "82%", color: "#6366f1", size: 5, delay: 1.4 },
    { left: "64%", top: "88%", color: "#0d9488", size: 6, delay: 0.3 },
];

const cardDots = [
    { left: "8%", top: "18%", delay: 0 },
    { left: "26%", top: "76%", delay: 0.8 },
    { left: "44%", top: "24%", delay: 1.5 },
    { left: "63%", top: "82%", delay: 0.4 },
    { left: "84%", top: "16%", delay: 1.1 },
    { left: "93%", top: "62%", delay: 1.9 },
];

export default function ResourcesPage() {
    const reduceMotion = useReducedMotion() === true;

    return (
        <div className="min-h-screen bg-[#020202] text-white pt-20 font-sans selection:bg-teal-500/30">
            {/* Hero Section */}
            <section className="relative max-w-7xl mx-auto px-6 pt-4 pb-10 lg:pt-6 lg:pb-12 mb-6">
                <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 top-0 h-72 w-72 rounded-full bg-teal-400/20 blur-[100px]"
                    animate={reduceMotion ? undefined : { x: [0, -35, 0], y: [0, 45, 0] }}
                    transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-blue-500/15 blur-[100px]"
                    animate={reduceMotion ? undefined : { x: [0, 38, 0], y: [0, -32, 0] }}
                    transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="relative isolate flex min-h-[460px] items-center justify-center overflow-hidden rounded-[2.5rem] bg-slate-900 shadow-[0_30px_100px_rgba(20,184,166,0.18)] md:min-h-[560px]">
                    <Image
                        src="/aboutus.webp"
                        alt=""
                        fill
                        priority
                        sizes="(max-width: 1280px) 100vw, 1280px"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#031216]/75 via-[#031216]/55 to-[#031216]/40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#031216]/60 via-transparent to-[#031216]/15" />
                    <motion.div
                        className="relative z-10 max-w-4xl px-6 py-20 text-center sm:px-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-full">
                            Engineering Experts
                        </span>
                        <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter uppercase italic">
                            Hire Top <span className="text-teal-500">Talent</span>
                        </h1>
                        <p className="text-white/85 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                            Scale your engineering teams rapidly with our pre-vetted, highly skilled IT professionals. Flexible hiring models tailored to your project.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Panacea products and capabilities */}
            <section className="relative isolate w-full overflow-hidden bg-[linear-gradient(135deg,#ffffff_0%,#f8fbff_52%,#f0fbfa_100%)] text-black py-24 rounded-t-[3rem] border-t border-gray-200">
                <AmbientParticles className="pointer-events-none absolute inset-0 z-0 opacity-30" />
                <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-28 top-[7%] z-[1] h-[24rem] w-[24rem] rounded-full blur-[55px]"
                    style={{ background: "radial-gradient(circle, rgba(6, 182, 212, 0.68) 0%, rgba(103, 232, 249, 0.42) 38%, transparent 72%)" }}
                    animate={reduceMotion ? undefined : { x: [0, 110, 30, 0], y: [0, 70, 145, 0] }}
                    transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-28 top-[30%] z-[1] h-[26rem] w-[26rem] rounded-full blur-[60px]"
                    style={{ background: "radial-gradient(circle, rgba(139, 92, 246, 0.62) 0%, rgba(196, 181, 253, 0.4) 40%, transparent 72%)" }}
                    animate={reduceMotion ? undefined : { x: [0, -95, -20, 0], y: [0, 90, 180, 0] }}
                    transition={{ duration: 29, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-24 bottom-[-5rem] z-[1] h-[22rem] w-[22rem] rounded-full blur-[55px]"
                    style={{ background: "radial-gradient(circle, rgba(20, 184, 166, 0.58) 0%, rgba(153, 246, 228, 0.38) 40%, transparent 72%)" }}
                    animate={reduceMotion ? undefined : { x: [0, 85, 130, 0], y: [0, -95, -35, 0] }}
                    transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
                />
                {backgroundDots.map((dot) => (
                    <motion.span
                        key={`${dot.left}-${dot.top}`}
                        aria-hidden="true"
                        className="pointer-events-none absolute z-[2] rounded-full"
                        style={{
                            left: dot.left,
                            top: dot.top,
                            width: dot.size,
                            height: dot.size,
                            backgroundColor: dot.color,
                            boxShadow: `0 0 10px 2px ${dot.color}88`,
                        }}
                        animate={reduceMotion ? undefined : {
                            y: [0, -18, 6, 0],
                            x: [0, 8, -5, 0],
                            opacity: [0.45, 1, 0.65, 0.45],
                            scale: [0.85, 1.25, 0.95, 0.85],
                        }}
                        transition={{
                            duration: 5.5 + dot.delay,
                            delay: dot.delay,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
                <div className="relative z-10 max-w-7xl mx-auto px-6 mb-20">
                    <div className="max-w-3xl mb-10">
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600 mb-3">What we help you create</p>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-950 mb-5">
                            Useful technology, made for real work.
                        </h2>
                        <p className="text-lg leading-relaxed text-slate-600">
                            From a first product idea to a platform that needs to grow, Panacea brings product thinking, design, and engineering together to solve practical business challenges.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {productShowcase.map((item, idx) => (
                            <motion.article
                                key={item.title}
                                className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10"
                                initial={{ y: 28, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                            >
                                <div className="relative flex h-64 items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 via-blue-50 to-teal-50">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.9),transparent_68%)]" />
                                    <Image
                                        src={item.image}
                                        alt={item.alt}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-contain p-5 drop-shadow-xl transition-transform duration-500 group-hover:scale-[1.04]"
                                    />
                                    <span className="absolute left-5 top-5 rounded-full border border-white/80 bg-white/85 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-600 shadow-sm backdrop-blur">
                                        {item.label}
                                    </span>
                                </div>
                                <div className="p-7">
                                    <h3 className="text-2xl font-extrabold tracking-tight text-slate-950">{item.title}</h3>
                                    <p className="mt-3 min-h-[5rem] leading-relaxed text-slate-600">{item.desc}</p>
                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {item.tags.map((tag) => (
                                            <span key={tag} className="rounded-full bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-800">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>

                {/* Specialist hiring */}
                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div className="max-w-3xl">
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600 mb-3">Extend your team</p>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-950 mb-4">The right people for your next milestone.</h2>
                            <p className="text-lg leading-relaxed text-slate-600">
                                Add experienced mobile or web specialists to your delivery team, with skills aligned to your product and working style.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {resourcesData.map((resource, idx) => (
                        <motion.div
                            key={idx}
                            className="group relative overflow-hidden bg-[#f8f9fa] border border-gray-200 rounded-[2.5rem] p-10 hover:border-teal-500/30 hover:shadow-2xl hover:shadow-teal-500/5 transition-all duration-500"
                            initial={{ y: 40, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            {cardDots.map((dot) => (
                                <motion.span
                                    key={`${dot.left}-${dot.top}`}
                                    aria-hidden="true"
                                    className="pointer-events-none absolute z-0 h-1.5 w-1.5 rounded-full bg-teal-400"
                                    style={{
                                        left: dot.left,
                                        top: dot.top,
                                        boxShadow: "0 0 9px 2px rgba(45, 212, 191, 0.42)",
                                    }}
                                    animate={reduceMotion ? undefined : {
                                        y: [0, -9, 3, 0],
                                        x: [0, 4, -3, 0],
                                        opacity: [0.28, 0.75, 0.42, 0.28],
                                        scale: [0.8, 1.15, 0.9, 0.8],
                                    }}
                                    transition={{
                                        duration: 4.5 + dot.delay,
                                        delay: dot.delay,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                />
                            ))}
                            <div className="relative z-10 flex flex-col md:flex-row items-start gap-6 mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100 group-hover:scale-110 transition-transform duration-500 shrink-0">
                                    {resource.icon}
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black text-black mb-4 tracking-tight">{resource.category}</h3>
                                    <p className="text-gray-600 font-medium leading-relaxed mb-8">
                                        {resource.desc}
                                    </p>
                                </div>
                            </div>

                            <div className="relative z-10 space-y-3 mb-10 bg-white p-6 rounded-2xl border border-gray-100">
                                {resource.skills.map((skill, sIdx) => (
                                    <div key={sIdx} className="flex items-center gap-3 text-gray-700 font-medium">
                                        <CheckCircle size={18} className="text-teal-500 shrink-0" />
                                        <span>{skill}</span>
                                    </div>
                                ))}
                            </div>

                            <Link href="/contact" className="relative z-10 inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-teal-500 transition-colors shadow-xl">
                                Hire Now <ArrowRight size={18} />
                            </Link>
                        </motion.div>
                    ))}
                    </div>
                </div>

                {/* Delivery approach */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 mt-24">
                    <div className="rounded-[2.5rem] bg-slate-950 px-7 py-12 text-white md:px-12 md:py-14">
                        <div className="mb-10 max-w-3xl">
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-300 mb-3">A clear delivery path</p>
                            <h2 className="text-3xl font-black tracking-tight md:text-4xl">From first conversation to continuous improvement.</h2>
                            <p className="mt-4 leading-relaxed text-slate-300">
                                Each engagement is shaped around its goals. We keep the work visible, validate decisions early, and plan for what comes after launch.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
                            {deliverySteps.map((step) => (
                                <div key={step.number} className="border-t border-teal-400/40 pt-5">
                                    <span className="text-sm font-black tracking-widest text-teal-300">{step.number}</span>
                                    <h3 className="mt-3 text-xl font-bold">{step.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-slate-300">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                        <Link href="/contact" className="mt-10 inline-flex items-center gap-2 rounded-full bg-teal-400 px-6 py-3 font-bold text-slate-950 transition-colors hover:bg-teal-300">
                            Talk through your project <ArrowUpRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
