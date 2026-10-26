"use client";

import Image from "next/image";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Phone, Mail, MapPin, Linkedin, Twitter, Globe, Clock } from "lucide-react";
import Contact from "@/components/Contact";

export default function ContactLayout() {
  // Mouse Parallax Effect for Background Text
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const textX = useSpring(useTransform(mouseX, [-100, 100], [30, -30]), { stiffness: 100, damping: 20 });
  const textY = useSpring(useTransform(mouseY, [-100, 100], [30, -30]), { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(((e.clientX - left) / width - 0.5) * 100);
    mouseY.set(((e.clientY - top) / height - 0.5) * 100);
  };

  return (
    <section onMouseMove={handleMouseMove} className="relative min-h-screen bg-[#F8FAFC] overflow-hidden pt-[106px]">



      {/* 2. ELEVATED HEADER SECTION */}
      <div className="relative isolate w-full px-6 py-14 md:py-16 text-center z-10 overflow-hidden">
        <Image
          src="/ourservicesimage.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/40" />
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Main Title */}
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-2">
            Let's Build Something
          </h2>

          {/* Gradient Sub-title */}
          <h3 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2563eb] to-[#38bdf8] leading-tight mb-8">
            Extraordinary Together
          </h3>

          {/* Subtext */}
          <p className="text-white/85 text-lg md:text-xl font-normal max-w-3xl mx-auto mb-10">
            We are a Professional Web Development & Mobile App Development Company
          </p>

          {/* Elevated Animated Underline */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full shadow-md"
          ></motion.div>
        </motion.div>
      </div>

      {/* 3. SPLIT COMPANY DETAILS & MAP SECTION */}
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-8 relative z-10">

        {/* Left: Company Details Card (Span 5) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="lg:col-span-5 bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden flex flex-col justify-center"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
          <h3 className="text-3xl font-bold mb-10 relative z-10">Corporate Presence</h3>

          <div className="space-y-10 relative z-10">
            <div className="flex items-start gap-6">
              <div className="bg-blue-600/30 p-4 rounded-2xl text-blue-400"><Phone size={28} /></div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Direct Lines</p>
                <p className="text-xl font-bold">+91 9347959536</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="bg-blue-600/30 p-4 rounded-2xl text-blue-400"><Mail size={28} /></div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Official Support</p>
                <p className="text-xl font-bold">sales@panaceaitservices.com</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="bg-blue-600/30 p-4 rounded-2xl text-blue-400"><MapPin size={28} /></div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Global Locations</p>
                <p className="text-xl font-bold leading-relaxed">
                  Panacea IT Services, Madhapur<br />
                  Hyderabad, India.<br /> USA
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-10 border-t border-slate-800 flex gap-4 relative z-10">
            {[Linkedin, Twitter, Globe].map((Icon, i) => (
              <a key={i} href="#" className="bg-slate-800 p-4 rounded-2xl text-slate-400 hover:text-white hover:bg-blue-600 transition-all">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right: Interactive Map (Span 7) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="lg:col-span-7 bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white h-[500px] lg:h-auto"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.8272226612346!2d78.38157547516346!3d17.42008808347494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93f5ada2ad11%3A0x89047701198f1f5!2sPanacea%20IT%20Services%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            className="w-full h-full"

            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
          ></iframe>
        </motion.div>
      </div>

      {/* Background Parallax Watermark */}
      <motion.div
        style={{ x: textX, y: textY }}
        className="fixed inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none z-0"
      >
        <h1 className="text-[25vw] font-black uppercase tracking-tighter">Panacea</h1>
      </motion.div>
      <div className="mt-4"><Contact /></div>
    </section>
  );
}