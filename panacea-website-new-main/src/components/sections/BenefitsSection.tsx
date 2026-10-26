"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function BenefitsSection({ benefits, title = "Key Benefits" }: { benefits?: string[], title?: string }) {
    if (!benefits || benefits.length === 0) return null;

    return (
        <section className="py-24 px-6 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">

                {/* Left: Text & List */}
                <div className="flex-1 w-full relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-black text-[#0B1536] tracking-tight mb-6">
                            Why Choose <span className="text-blue-600">Our Services</span>
                        </h2>
                        <p className="text-slate-500 text-lg mb-10 max-w-xl font-medium">
                            We focus on delivering measurable value, prioritizing quality, scalability, and an exceptional user experience in every project we undertake.
                        </p>

                        <div className="space-y-5">
                            {benefits.map((benefit, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex items-start gap-4"
                                >
                                    <div className="mt-1 shrink-0">
                                        <CheckCircle2 className="text-[#00E676] w-6 h-6" />
                                    </div>
                                    <p className="text-slate-700 font-bold text-lg leading-tight">{benefit}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Right: Abstract Visualization or Image */}
                <div className="flex-1 w-full relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative aspect-square md:aspect-[4/3] rounded-[3rem] overflow-hidden bg-gradient-to-br from-slate-100 to-blue-50 border border-slate-200 shadow-2xl shadow-blue-900/5 group"
                    >
                        {/* Decorative geometric shapes for a modern SaaS look */}
                        <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-colors duration-700" />
                        <div className="absolute bottom-[10%] right-[10%] w-[50%] h-[50%] bg-cyan-400/20 rounded-full blur-3xl group-hover:bg-cyan-400/30 transition-colors duration-700" />

                        <div className="absolute inset-[15%] bg-white/60 backdrop-blur-xl rounded-[2rem] border border-white/50 shadow-sm flex items-center justify-center overflow-hidden">
                            <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-80 mix-blend-overlay group-hover:scale-105 transition-transform duration-700"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent mix-blend-multiply pointer-events-none" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
