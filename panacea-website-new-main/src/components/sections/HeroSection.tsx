"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
    title: string;
    subtitle: string;
    overview: string;
}

export default function HeroSection({ title, subtitle, overview }: HeroSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    return (
        <section
            ref={containerRef}
            className="relative pt-32 pb-24 px-6 min-h-[60vh] flex items-center justify-center overflow-hidden bg-[#0B1536]"
        >
            {/* Background Elements */}
            <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen translate-x-1/3 -translate-y-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] mix-blend-screen -translate-x-1/3 translate-y-1/3 pointer-events-none" />

                {/* Subtle grid pattern */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
            </motion.div>

            <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold mb-8 uppercase tracking-widest backdrop-blur-sm"
                >
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    {subtitle}
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tight"
                >
                    {title ? title.split(' ').map((word, i) => {
                        const wordsLength = title.split(' ').length;
                        return (
                            <span key={i} className="inline-block relative">
                                {i === wordsLength - 1 ? (
                                    <span className="text-[#00E676] relative z-10">{word}</span>
                                ) : (
                                    <span className="mr-3 lg:mr-4">{word}</span>
                                )}
                            </span>
                        );
                    }) : null}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                    className="text-slate-300 text-base md:text-xl max-w-3xl mx-auto leading-relaxed mb-10 font-medium"
                >
                    {overview}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/25 transition-all group overflow-hidden relative">
                        <span className="relative z-10 flex items-center gap-2">Let's Discuss <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></span>
                        <div className="absolute inset-0 h-full w-full bg-white/20 scale-x-0 group-hover:scale-x-100 transform origin-left transition-transform duration-300 ease-out" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
