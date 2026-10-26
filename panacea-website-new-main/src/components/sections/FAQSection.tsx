"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";

export default function FAQSection({ faqs }: { faqs?: { q: string; a: string }[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    if (!faqs || faqs.length === 0) return null;

    return (
        <section className="py-24 px-6 bg-slate-50 relative">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 bg-[#3B82F6]/5 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10 flex flex-col md:flex-row gap-12">
                {/* Left Side: Sticky Header */}
                <div className="md:w-1/3">
                    <div className="sticky top-24">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 mb-6 shadow-inner"
                        >
                            <MessageCircleQuestion size={32} />
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-black text-[#0B1536] tracking-tight mb-4"
                        >
                            Common <br className="hidden md:block" /> <span className="text-blue-600">Questions</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-slate-500 font-medium leading-relaxed"
                        >
                            Everything you need to know about our services and how we work. Still have questions? Feel free to contact us.
                        </motion.p>
                    </div>
                </div>

                {/* Right Side: Accordion */}
                <div className="md:w-2/3 space-y-4">
                    {faqs.map((faq, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${openIndex === idx ? 'border-blue-500 shadow-lg shadow-blue-500/10' : 'border-slate-200 hover:border-blue-300'
                                }`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                            >
                                <span className={`font-bold text-lg pr-4 ${openIndex === idx ? 'text-blue-600' : 'text-slate-800'}`}>
                                    {faq.q}
                                </span>
                                <motion.div
                                    animate={{ rotate: openIndex === idx ? 180 : 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${openIndex === idx ? 'bg-blue-100 text-blue-600' : 'bg-slate-50 text-slate-400'}`}
                                >
                                    <ChevronDown size={18} strokeWidth={3} />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {openIndex === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-6 pb-6 pt-0 text-slate-500 font-medium leading-relaxed border-t border-slate-100/50 mt-2">
                                            <div className="pt-4">{faq.a}</div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
