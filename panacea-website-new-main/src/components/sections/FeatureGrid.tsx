"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import * as Icons from "lucide-react";
import { ContentSection } from "@/data/companyContent";

function FeatureIllustration({ kind }: { kind: "monitor" | "phone" | "globe" }) {
    if (kind === "monitor") {
        return (
            <svg viewBox="0 0 40 40" className="h-9 w-9 drop-shadow-sm" fill="none" aria-hidden="true">
                <rect x="4" y="5" width="32" height="23" rx="4" fill="#2563EB" />
                <rect x="6.5" y="7.5" width="27" height="18" rx="2" fill="#DBEAFE" />
                <rect x="9" y="10" width="10" height="2.5" rx="1.25" fill="#60A5FA" />
                <rect x="9" y="15" width="15" height="7" rx="1.5" fill="#BFDBFE" />
                <rect x="25.5" y="15" width="5" height="7" rx="1.5" fill="#93C5FD" />
                <path d="M17 28v4h6v-4M13 33h14" stroke="#1D4ED8" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
        );
    }

    if (kind === "phone") {
        return (
            <svg viewBox="0 0 40 40" className="h-9 w-9 drop-shadow-sm" fill="none" aria-hidden="true">
                <rect x="10" y="3" width="20" height="34" rx="5" fill="#1E40AF" />
                <rect x="12.5" y="7" width="15" height="25" rx="2.5" fill="#EFF6FF" />
                <rect x="15" y="10" width="10" height="7" rx="2" fill="#93C5FD" />
                <rect x="15" y="19" width="4" height="4" rx="1.2" fill="#3B82F6" />
                <rect x="21" y="19" width="4" height="4" rx="1.2" fill="#60A5FA" />
                <rect x="15" y="25" width="10" height="3" rx="1.5" fill="#BFDBFE" />
                <circle cx="20" cy="34.5" r="1" fill="#DBEAFE" />
            </svg>
        );
    }

    return (
        <svg viewBox="0 0 40 40" className="h-9 w-9 drop-shadow-sm" fill="none" aria-hidden="true">
            <circle cx="20" cy="20" r="15" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2.5" />
            <path d="M5.8 20h28.4M20 5c4 4.1 6.1 9.1 6.1 15S24 30.9 20 35M20 5c-4 4.1-6.1 9.1-6.1 15S16 30.9 20 35" stroke="#3B82F6" strokeWidth="1.8" />
            <path d="M8.5 12.5h23M8.5 27.5h23" stroke="#60A5FA" strokeWidth="1.4" />
            <ellipse cx="20" cy="20" rx="6.1" ry="15" stroke="#1D4ED8" strokeWidth="1.2" opacity=".65" />
        </svg>
    );
}

export default function FeatureGrid({ section }: { section: ContentSection }) {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-10%" });

    if (!section.features || section.features.length === 0) return null;

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 15 }
        }
    };

    return (
        <section className="py-24 px-6 bg-slate-50 relative overflow-hidden">
            {/* Decorative Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16 md:mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-black text-[#0B1536] tracking-tight mb-4"
                    >
                        {section.title ? section.title.split(' ')[0] : ''} <span className="text-blue-600">{section.title ? section.title.split(' ').slice(1).join(' ') : ''}</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-500 text-lg max-w-3xl mx-auto font-medium"
                    >
                        {section.description}
                    </motion.p>
                </div>

                <motion.div
                    ref={containerRef}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                >
                    {section.features.map((feature, idx) => {
                        // Dynamically resolve icon based on index
                        const defaultIcons = [Icons.Monitor, Icons.Smartphone, Icons.Globe, Icons.Layers, Icons.Database, Icons.Server];
                        const illustrationKinds = ["monitor", "phone", "globe"] as const;
                        const IconComponent = defaultIcons[idx % defaultIcons.length];

                        return (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-2 transition-all duration-300 group overflow-hidden relative"
                            >
                                {/* Hover gradient background effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                <div className="relative z-10">
                                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300 shadow-sm">
                                        {idx < illustrationKinds.length ? (
                                            <FeatureIllustration kind={illustrationKinds[idx]} />
                                        ) : (
                                            <IconComponent size={26} strokeWidth={2} />
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed font-medium">{feature.desc}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
