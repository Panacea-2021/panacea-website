"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Cpu, 
  Globe, 
  Smartphone, 
  Palette, 
  Megaphone, 
  Code2, 
  ArrowUpRight,
  ShieldCheck
} from "lucide-react";

const SERVICES = [
  {
    title: "AI & Machine Learning",
    description: "Custom RAG pipelines and LLM integrations to automate business intelligence.",
    icon: <Cpu className="w-8 h-8" />,
    className: "md:col-span-2 md:row-span-2 bg-gradient-to-br from-[#07133a] to-blue-900 text-white",
    iconBg: "bg-blue-500/20 text-cyan-400"
  },
  {
    title: "Web Development",
    description: "High-performance Next.js apps built for scale and speed.",
    icon: <Globe className="w-6 h-6" />,
    className: "bg-slate-50 border border-slate-100",
    iconBg: "bg-blue-600 text-white"
  },
  {
    title: "App Development",
    description: "Native and cross-platform solutions for iOS and Android.",
    icon: <Smartphone className="w-6 h-6" />,
    className: "bg-slate-50 border border-slate-100",
    iconBg: "bg-cyan-500 text-white"
  },
  {
    title: "UI & UX Design",
    description: "User-centric interfaces blending beauty with functional precision.",
    icon: <Palette className="w-6 h-6" />,
    className: "bg-white border border-slate-200 shadow-sm",
    iconBg: "bg-blue-100 text-blue-600"
  },
  {
    title: "Digital Marketing",
    description: "Data-driven strategies to boost your measurable results.",
    icon: <Megaphone className="w-6 h-6" />,
    className: "bg-white border border-slate-200 shadow-sm",
    iconBg: "bg-indigo-100 text-indigo-600"
  },
  {
    title: "Software Development",
    description: "Enterprise-grade custom software built to solve complex challenges.",
    icon: <Code2 className="w-7 h-7" />,
    className: "md:col-span-2 bg-blue-50 border border-blue-100",
    iconBg: "bg-blue-600 text-white"
  },
];

export default function ProfessionalServices() {
  return (
    <section className="relative py-24 bg-white text-[#07133a] overflow-hidden">
      
      {/* --- SUBTLE BACKGROUND DECOR --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-50 rounded-full blur-[100px] opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* --- CREATIVE CENTERED HEADING --- */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
               <ShieldCheck className="text-blue-600 w-4 h-4" />
               <span className="text-blue-600 font-bold uppercase tracking-[0.3em] text-[10px]">Our Expertise</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-none uppercase">
                Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 font-serif italic font-light lowercase">Capabilities.</span>
            </h2>
          </motion.div>
        </div>

        {/* --- BENTO GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[180px]">
          {SERVICES.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className={`group relative p-8 rounded-[2.5rem] flex flex-col justify-between transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${service.className}`}
            >
              <div className="flex justify-between items-start relative z-10">
                <div className={`p-3 rounded-2xl ${service.iconBg} group-hover:scale-110 transition-transform duration-500`}>
                  {service.icon}
                </div>
                <div className="p-2 rounded-full bg-black/5 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                   <ArrowUpRight size={20} />
                </div>
              </div>

              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2 tracking-tight uppercase">{service.title}</h3>
                <p className="text-sm opacity-70 leading-relaxed line-clamp-2">
                  {service.description}
                </p>
              </div>

              {/* Subtle Glass Highlight */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}