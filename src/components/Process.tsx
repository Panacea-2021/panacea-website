"use client";

import React from "react";
import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";

const steps = [
  { 
    id: "01", 
    title: "STRATEGY", 
    description: "Panacea IT services encourages innovation, out-of-the-box thinking & continual learning. We follow a systematic process to ensure excellence.", 
    imageSrc: "/bar1.png", 
    position: "top" 
  },
  { 
    id: "02", 
    title: "DESIGN", 
    description: "After finalizing the strategy, our veteran designers create a high-fidelity prototype of your project as per specifications.", 
    imageSrc: "/bar2.png", 
    position: "bottom" 
  },
  { 
    id: "03", 
    title: "DEVELOP", 
    description: "Once designs are approved, we move forward with robust mobile app development using the latest tech stacks.", 
    imageSrc: "/bar3.png", 
    position: "top" 
  },
  { 
    id: "04", 
    title: "TESTING", 
    description: "Before rolling out, we ensure the quality of your web or mobile apps project with comprehensive Q&A testing.", 
    imageSrc: "/bar4.png", 
    position: "bottom" 
  },
  { 
    id: "05", 
    title: "DELIVER", 
    description: "Our dedicated teams offer you high-quality projects designed to scale your business and drive growth.", 
    imageSrc: "/bar5.png", 
    position: "top" 
  },
];

export default function NavyTechProcess() {
  return (
    <section className="w-full bg-[#07133a] py-24 overflow-hidden font-sans relative text-white">
      
      {/* --- DECORATIVE BACKGROUND --- */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[0%] right-[-5%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
        
        <div className="absolute inset-0 opacity-[0.05]" 
             style={{ backgroundImage: `radial-gradient(#fff 0.5px, transparent 0.5px)`, backgroundSize: '30px 30px' }} 
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20 animate-fadeIn">
          <SectionTitle className="mb-6">Our Process</SectionTitle>
          <div className="w-24 h-1 bg-linear-to-r from-blue-500 to-cyan-400 mx-auto mb-6 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.4)]"></div>
          <p className="text-blue-100/60 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Panacea IT services is a world-class <span className="text-cyan-300 font-medium">mobile app development company</span>. We follow a systematic process to ensure flawless project completion.
          </p>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:block relative min-h-120">
          
          <div className="absolute inset-0 z-0 pointer-events-none">
            <svg viewBox="0 0 1200 450" fill="none" className="w-full h-full" preserveAspectRatio="none">
              <path
                d="M 120 85 L 360 365 L 600 85 L 840 365 L 1080 85"
                stroke="rgba(103, 232, 249, 0.2)" 
                strokeWidth="2.5"
                strokeDasharray="12 10"
                strokeLinecap="round"
                className="animate-lineSlide"
              />
            </svg>
          </div>

          <div className="flex justify-between items-start relative z-10 px-4">
            {steps.map((step, index) => (
              <div 
                key={step.id} 
                className="flex flex-col items-center w-64 opacity-0 animate-slideUp"
                style={{ animationDelay: `${index * 0.15}s`, animationFillMode: 'forwards' }}
              >
                {step.position === "top" ? (
                  <>
                    <ImageCircle src={step.imageSrc} alt={step.title} />
                    <div className="h-22.5" /> 
                    <StepText title={step.title} desc={step.description} />
                  </>
                ) : (
                  <>
                    <StepText title={step.title} desc={step.description} />
                    <div className="h-22.5" /> 
                    <ImageCircle src={step.imageSrc} alt={step.title} />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden flex flex-col space-y-20">
          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className="flex flex-col items-center text-center px-6 opacity-0 animate-slideUp"
              style={{ animationDelay: `${index * 0.2}s`, animationFillMode: 'forwards' }}
            >
               <ImageCircle src={step.imageSrc} alt={step.title} />
               <div className="mt-10">
                 <StepText title={step.title} desc={step.description} />
               </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes lineSlide { from { stroke-dashoffset: 200; } to { stroke-dashoffset: 0; } }
        .animate-fadeIn { animation: fadeIn 1.2s ease-out; }
        .animate-slideUp { animation: slideUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .animate-lineSlide { animation: lineSlide 20s linear infinite; }
      `}</style>
    </section>
  );
}

function ImageCircle({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative group shrink-0 transition-all duration-500">
      <div className="absolute inset-0 bg-blue-400/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" />
      
      <div className="absolute -inset-5 border-2 border-dashed border-blue-400/20 rounded-full group-hover:rotate-180 transition-transform duration-[3000ms] group-hover:border-cyan-400/50"></div>
      
      {/* Outer Container Clip */}
      <div className="w-40 h-40 rounded-full bg-[#0a1b4e] border border-blue-300/10 flex items-center justify-center p-2 relative z-10 shadow-[0_0_50px_rgba(0,0,0,0.3)] group-hover:border-blue-400/40 transition-all duration-500 overflow-hidden">
        {/* Inner Circle Image Container */}
        <div className="relative w-full h-full rounded-full overflow-hidden group-hover:scale-110 transition-transform duration-500 bg-[#0a1b4e]">
          <Image 
            src={src} 
            alt={alt} 
            fill 
            className="object-cover brightness-110 rounded-full" 
          />
        </div>
      </div>
    </div>
  );
}

function StepText({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="text-center shrink-0 group">
      <div className="inline-block px-8 py-2 border-2 border-dashed border-blue-800/60 rounded-full text-cyan-300 text-xs font-bold tracking-[0.2em] mb-5 bg-transparent uppercase group-hover:border-cyan-500/50 group-hover:text-cyan-200 transition-all duration-300 shadow-sm">
        {title}
      </div>
      <p className="text-sm text-blue-100/50 leading-relaxed max-w-60 mx-auto group-hover:text-blue-50/80 transition-colors">
        {desc}
      </p>
    </div>
  );
}