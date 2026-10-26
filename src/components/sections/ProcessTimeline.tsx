"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ProcessTimeline({ process }: { process?: { step: number; name: string; desc: string }[] }) {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    if (!process || process.length === 0) return null;

    return (
        <section className="py-24 px-6 bg-[#0a0f24] relative overflow-hidden" ref={containerRef}>
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-20 text-white">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-black tracking-tight mb-4"
                    >
                        How We <span className="text-[#00E676]">Deliver Success</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-400 text-lg"
                    >
                        Our proven agile methodology ensures transparency, quality, and timely delivery.
                    </motion.p>
                </div>

                <div className="relative pl-8 md:pl-0">
                    {/* Animated vertical line (desktop center, mobile left) */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-800 -translate-x-1/2">
                        <motion.div
                            style={{ height: lineHeight }}
                            className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-400 via-cyan-400 to-[#00E676] rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                        />
                    </div>

                    <div className="space-y-12">
                        {process.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: 0.5 }}
                                className={`relative flex flex-col md:flex-row items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#0a0f24] border-4 border-slate-800 flex items-center justify-center z-10 text-white font-black text-lg shadow-xl shrink-0 group">
                                    <div className="absolute inset-2 rounded-full bg-slate-800 group-hover:bg-blue-500 transition-colors" />
                                    <span className="relative z-10">{step.step}</span>
                                </div>

                                {/* Content Card */}
                                <div className={`w-full md:w-1/2 ${idx % 2 === 0 ? 'md:pl-16' : 'md:pr-16'} pl-10 md:pt-0 pt-2`}>
                                    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                                        <h3 className="text-xl font-bold text-white mb-2">{step.name}</h3>
                                        <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
