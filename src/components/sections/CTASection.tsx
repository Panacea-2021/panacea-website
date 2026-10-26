"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone, MessageSquare } from "lucide-react";

export default function CTASection({ title = "Ready to Transform Your Business?" }) {
    return (
        <section className="py-24 px-6 relative overflow-hidden bg-[#0a0f24]">
            {/* Dynamic Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-400/20 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="max-w-5xl mx-auto relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                    className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-12 md:p-20 shadow-2xl relative overflow-hidden"
                >
                    {/* Inner glow effect */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50" />

                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6">
                        {title}
                    </h2>
                    <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium">
                        Partner with Panacea IT Services to build scalable, high-performance digital solutions that drive measurable growth.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/contact" className="w-full sm:w-auto">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/30 transition-shadow text-lg"
                            >
                                Start Your Project <ArrowRight size={20} />
                            </motion.button>
                        </Link>
                        <Link href="/contact" className="w-full sm:w-auto">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 font-bold flex items-center justify-center gap-2 backdrop-blur-md transition-colors text-lg"
                            >
                                <Phone size={20} className="text-[#00E676]" /> Contact Sales
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
