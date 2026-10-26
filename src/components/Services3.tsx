"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Cpu, 
  Globe, 
  Smartphone, 
  Palette, 
  Megaphone, 
  Code2, 
  ArrowRight 
} from "lucide-react";

const SERVICES = [
  {
    id: "01",
    title: "AI & Machine Learning",
    description: "Custom RAG pipelines and LLM integrations to automate your business intelligence.",
    icon: <Cpu className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
    color: "from-blue-600 to-cyan-500"
  },
  {
    id: "02",
    title: "Web Development",
    description: "High-performance Next.js applications built for scale and speed.",
    icon: <Globe className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    color: "from-cyan-500 to-blue-400"
  },
  {
    id: "03",
    title: "App Development",
    description: "Native and cross-platform mobile solutions for iOS and Android.",
    icon: <Smartphone className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
    color: "from-blue-700 to-indigo-500"
  },
  {
    id: "04",
    title: "UI & UX Design",
    description: "User-centric interfaces that blend aesthetic beauty with functional precision.",
    icon: <Palette className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop",
    color: "from-blue-500 to-cyan-300"
  },
  {
    id: "05",
    title: "Digital Marketing",
    description: "Data-driven strategies to expand your reach and boost conversion rates.",
    icon: <Megaphone className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    color: "from-blue-400 to-cyan-200"
  },
  {
    id: "06",
    title: "Software Engineering",
    description: "Enterprise-grade custom software built to solve complex business challenges.",
    icon: <Code2 className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?q=80&w=800&auto=format&fit=crop",
    color: "from-blue-800 to-blue-500"
  },
];

export default function LuminousServices() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative py-24 bg-white text-slate-900 overflow-hidden">
      
      {/* Subtle Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-50 rounded-full blur-[100px] opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-4"
          >
            <span className="h-[1px] w-12 bg-blue-600" />
            <p className="text-blue-600 font-mono text-[10px] uppercase tracking-[0.4em] font-bold">What We Do</p>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9] text-slate-900">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 font-serif italic font-light lowercase">Expertise.</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Left: Interactive List (Decreased Sizes) */}
          <div className="w-full lg:w-3/5 space-y-0 border-t border-slate-100">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.id}
                onMouseEnter={() => setActiveIndex(index)}
                className="group relative py-6 border-b border-slate-100 cursor-pointer transition-colors duration-500"
              >
                <div className="flex items-center justify-between relative z-10 px-4">
                  <div className="flex items-center gap-6">
                    <span className="font-mono text-xs text-slate-300 group-hover:text-blue-600 transition-colors">
                      {service.id}
                    </span>
                    <h3 className={`text-xl md:text-2xl font-bold uppercase tracking-tight transition-all duration-500 ${activeIndex === index ? 'translate-x-3 text-slate-900' : 'text-slate-300'}`}>
                      {service.title}
                    </h3>
                  </div>
                  <div className={`p-2 rounded-full border transition-all duration-500 ${activeIndex === index ? 'border-blue-600 bg-blue-600 text-white rotate-[-45deg]' : 'border-slate-100 text-slate-400 opacity-0'}`}>
                    <ArrowRight size={18} />
                  </div>
                </div>

                {/* Animated Description Reveal */}
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="pl-16 mt-2 text-slate-500 text-base leading-relaxed max-w-lg">
                        {service.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Hover Background Accent */}
                <div className="absolute inset-0 bg-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>

          {/* Right: Dynamic Image Preview */}
          <div className="hidden lg:block w-2/5 sticky top-32 h-[450px]">
            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-50 bg-slate-50">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(10px)" }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <img 
                    src={SERVICES[activeIndex].image} 
                    alt={SERVICES[activeIndex].title} 
                    className="w-full h-full object-cover"
                  />
                  {/* Themed Overlay Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${SERVICES[activeIndex].color} opacity-20 mix-blend-multiply`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}