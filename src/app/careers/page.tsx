"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react";

function BenefitIllustration({ type }: { type: "innovation" | "harmony" | "impact" }) {
    if (type === "innovation") {
        return (
            <svg viewBox="0 0 48 48" className="h-10 w-10 drop-shadow-sm" fill="none" aria-hidden="true">
                <path d="M27.5 4.5 10.8 25h10.8L19.8 43.5 37.2 20H25.8l1.7-15.5Z" fill="url(#innovation-bolt)" stroke="#1D4ED8" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="m27.5 4.5-7.1 20.4h8.8L19.8 43.5 37.2 20H25.8l1.7-15.5Z" fill="#60A5FA" fillOpacity=".3" />
                <defs>
                    <linearGradient id="innovation-bolt" x1="11" y1="7" x2="36" y2="40" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#93C5FD" />
                        <stop offset="1" stopColor="#2563EB" />
                    </linearGradient>
                </defs>
            </svg>
        );
    }

    if (type === "harmony") {
        return (
            <svg viewBox="0 0 48 48" className="h-10 w-10 drop-shadow-sm" fill="none" aria-hidden="true">
                <path d="M13 18h21v12.5A7.5 7.5 0 0 1 26.5 38h-6a7.5 7.5 0 0 1-7.5-7.5V18Z" fill="url(#harmony-cup)" stroke="#1D4ED8" strokeWidth="1.8" />
                <path d="M34 21h2.5a5 5 0 0 1 0 10H34" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M18 11c-2-2.5 2-3.5 0-6M25 11c-2-2.5 2-3.5 0-6M32 11c-2-2.5 2-3.5 0-6" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
                <path d="M16.5 22h14v8.5a5 5 0 0 1-5 5h-4a5 5 0 0 1-5-5V22Z" fill="#DBEAFE" fillOpacity=".8" />
                <defs>
                    <linearGradient id="harmony-cup" x1="13" y1="18" x2="36" y2="38" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#BFDBFE" />
                        <stop offset="1" stopColor="#3B82F6" />
                    </linearGradient>
                </defs>
            </svg>
        );
    }

    return (
        <svg viewBox="0 0 48 48" className="h-10 w-10 drop-shadow-sm" fill="none" aria-hidden="true">
            <circle cx="24" cy="24" r="18" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.8" />
            <circle cx="24" cy="24" r="12.5" fill="#BFDBFE" stroke="#3B82F6" strokeWidth="1.8" />
            <circle cx="24" cy="24" r="7" fill="#60A5FA" stroke="#2563EB" strokeWidth="1.8" />
            <circle cx="24" cy="24" r="2.5" fill="#1D4ED8" />
            <path d="m22.5 25.5 15-15M29 10h8.5v8.5" stroke="#1D4ED8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="m37.5 10-15 15" stroke="#fff" strokeOpacity=".7" strokeWidth="1" />
        </svg>
    );
}

const jobOpenings = [
    {
        title: "Senior Full Stack Engineer",
        type: "Full-Time",
        location: "Hyderabad, India / Remote",
        experience: "5+ Years",
        department: "Engineering"
    },
    {
        title: "UI/UX Designer",
        type: "Full-Time",
        location: "Bangalore, India",
        experience: "3+ Years",
        department: "Design"
    },
    {
        title: "AWS Cloud Architect",
        type: "Contract",
        location: "Remote (USA/India)",
        experience: "7+ Years",
        department: "Cloud & DevOps"
    },
    {
        title: "Product Marketing Manager",
        type: "Full-Time",
        location: "Remote",
        experience: "4+ Years",
        department: "Marketing"
    }
];

export default function CareersPage() {
    const reduceMotion = useReducedMotion();

    return (
        <div className="min-h-screen bg-[#020202] text-white pt-24 font-sans selection:bg-blue-500/30">
            {/* Careers hero */}
            <section className="relative isolate mx-auto flex min-h-[calc(100svh-6rem)] w-full items-center justify-center overflow-hidden px-6 py-16">
                <video
                    aria-hidden="true"
                    autoPlay={!reduceMotion}
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-[center_40%]"
                >
                    <source src="/careers-innovation.mp4" type="video/mp4" />
                </video>
                <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-br from-[#020817]/94 via-[#071126]/88 to-[#020202]/94" />
                <motion.div
                    className="pointer-events-none absolute top-1/2 left-1/2 z-[2] h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 blur-[150px] animate-pulse"
                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }}
                />
                <div className="relative z-10 mx-auto w-full max-w-7xl">
                    <div className="text-center">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full inline-block"
                        >
                            Join Our Team
                        </motion.div>
                        <motion.h1
                            className="mb-8 text-5xl font-black uppercase italic tracking-tighter md:text-7xl xl:text-[clamp(2.75rem,6.2vw,6rem)] xl:whitespace-nowrap"
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                        >
                            Build the <span className="text-blue-500">Future</span> With<br /> Us
                        </motion.h1>
                        <motion.p
                            className="mx-auto max-w-3xl text-lg font-medium leading-relaxed text-gray-300 md:text-xl"
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        >
                            We are looking for passionate builders, designers, and thinkers to help us create innovative digital experiences for the world.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Content Sections (White) */}
            <section className="w-full bg-white text-black py-24 rounded-t-[3rem] border-t border-gray-200">
                {/* Culture Section */}
                <div className="max-w-7xl mx-auto px-6 mb-32">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">Life at Panacea</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">We foster an environment of continuous learning, autonomy, and impactful work.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { type: "innovation" as const, title: "Innovation First", desc: "Work with cutting-edge tech stacks and shape industry standards." },
                            { type: "harmony" as const, title: "Work-Life Harmony", desc: "Flexible hours, remote options, and generous time off policies." },
                            { type: "impact" as const, title: "Impact Driven", desc: "Build products that solve real-world problems for global enterprises." }
                        ].map((perk, i) => (
                            <motion.div
                                key={i}
                                className="bg-[#f8f9fa] p-10 rounded-[2rem] border border-gray-200 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 group"
                                initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 border border-blue-100 group-hover:scale-110 transition-transform duration-300">
                                    <BenefitIllustration type={perk.type} />
                                </div>
                                <h3 className="text-2xl font-black mb-3 tracking-tight">{perk.title}</h3>
                                <p className="text-gray-600 font-medium leading-relaxed">{perk.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Open Positions List */}
                <div className="max-w-5xl mx-auto px-6">
                    <motion.h2
                        className="text-4xl md:text-5xl font-black mb-12 text-center tracking-tighter"
                        initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}
                    >
                        Open Positions
                    </motion.h2>

                    <div className="space-y-6">
                        {jobOpenings.map((job, idx) => (
                            <motion.a
                                key={idx}
                                href={`mailto:contact@panaceaitservices.com?subject=${encodeURIComponent(`Application: ${job.title}`)}`}
                                className="group block bg-[#f8f9fa] border border-gray-200 hover:border-blue-500/50 p-6 md:p-8 rounded-[2rem] transition-all hover:shadow-2xl hover:shadow-blue-500/10"
                                initial={{ x: -20, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div>
                                        <div className="text-xs text-blue-600 font-bold mb-3 uppercase tracking-widest bg-blue-50 inline-block px-3 py-1 rounded-full">{job.department}</div>
                                        <h3 className="text-3xl font-black text-black mb-4 group-hover:text-blue-600 transition-colors tracking-tight">{job.title}</h3>
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 font-medium">
                                            <span className="flex items-center gap-2 bg-white border border-gray-100 px-4 py-2 rounded-xl shadow-sm"><Briefcase size={16} className="text-gray-400" /> {job.type}</span>
                                            <span className="flex items-center gap-2 bg-white border border-gray-100 px-4 py-2 rounded-xl shadow-sm"><MapPin size={16} className="text-gray-400" /> {job.location}</span>
                                            <span className="flex items-center gap-2 bg-white border border-gray-100 px-4 py-2 rounded-xl shadow-sm"><Clock size={16} className="text-gray-400" /> {job.experience}</span>
                                        </div>
                                    </div>

                                    <div className="shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-black group-hover:bg-blue-600 transition-colors shadow-lg shadow-black/20 group-hover:shadow-blue-600/30">
                                        <ArrowRight size={24} className="text-white group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
