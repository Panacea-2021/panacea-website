"use client";

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Globe, Smartphone, Megaphone, Palette, Cloud, Settings,
  Shield, Cpu, Rocket, Users, CheckCircle, Mail, Phone, MapPin,
  Database, Layout, Code, BarChart, Server, Layers, Target,
  Award, BookOpen, Briefcase, Zap, Heart, Search, MousePointer2,
  ChevronRight, Facebook, Instagram, Linkedin, Twitter, Youtube, Quote
} from 'lucide-react';
import Technology from '@/components/Technologies';

// Animation Constants
const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

const stagger = {
  animate: { transition: { staggerChildren: 0.2 } }
};

const scrollReveal = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: "easeOut" }
};

const serviceBackgroundDots = [
  { left: "7%", top: "16%", color: "#60a5fa", delay: 0 },
  { left: "19%", top: "68%", color: "#22d3ee", delay: 1.3 },
  { left: "34%", top: "28%", color: "#818cf8", delay: 0.6 },
  { left: "48%", top: "82%", color: "#38bdf8", delay: 1.8 },
  { left: "64%", top: "14%", color: "#a78bfa", delay: 0.9 },
  { left: "78%", top: "62%", color: "#22d3ee", delay: 2.1 },
  { left: "93%", top: "30%", color: "#60a5fa", delay: 0.4 },
];

export default function PanaceaPortfolio() {
  const reduceMotion = useReducedMotion() === true;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">

      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-200">P</div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight leading-none text-slate-900">Panacea</span>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">IT Services Pvt. Ltd</span>
            </div>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-bold text-slate-600">
            {['About', 'Services', 'Projects', 'Products', 'Tech', 'Training'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-blue-600 transition-colors uppercase tracking-tighter">{item}</a>
            ))}
          </div>
          <a href="#contact" className="px-6 py-2 bg-slate-900 text-white text-sm rounded-full font-bold hover:bg-blue-600 transition-all shadow-md">
            Contact Us
          </a>
        </div>
      </nav>

      <header className="relative pt-32 pb-24 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 -skew-x-12 translate-x-20 z-0"></div>
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400/10 rounded-full blur-[120px] z-0 animate-pulse"></div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">

          {/* --- LEFT SIDE: THE CONTENT --- */}
          <motion.div initial="initial" animate="animate" variants={stagger}>
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-8">
              <Zap size={14} className="text-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-700">
                BEST SOFTWARE SOLUTIONS
              </span>
            </motion.div>

            <motion.h1 variants={fadeIn} className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.9] mb-8 uppercase tracking-tighter">
              CODE THAT <br />
              <span className="text-blue-600">CONNECTS</span>
            </motion.h1>

            <motion.p variants={fadeIn} className="text-xl text-slate-600 mb-10 leading-relaxed max-w-lg italic font-medium">
              "Turning ideas into powerful code custom software built to perform"
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-wrap gap-5">
              <a href="#services" className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 hover:-translate-y-1 transition-all shadow-xl shadow-blue-200 uppercase tracking-tighter flex items-center gap-2">
                Our Services <Rocket size={20} />
              </a>
              <a href="#projects" className="px-10 py-5 bg-white border-2 border-slate-100 text-slate-900 rounded-2xl font-black text-lg hover:bg-slate-50 hover:border-blue-600 transition-all flex items-center gap-2 uppercase tracking-tighter">
                Key Projects <ChevronRight size={20} />
              </a>
            </motion.div>

            <motion.div variants={fadeIn} className="mt-12 inline-flex items-center gap-12 rounded-2xl border border-blue-300 bg-gradient-to-r from-blue-200 via-indigo-200 to-cyan-200 px-6 py-5 shadow-md shadow-blue-200/70">
              <div>
                <p className="text-4xl font-black text-slate-900">40+</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Solutions Delivered</p>
              </div>
              <div>
                <p className="text-4xl font-black text-slate-900">15+</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Success Stories</p>
              </div>
            </motion.div>
          </motion.div>

          {/* --- RIGHT SIDE: LAYERED ENGINE --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative h-[500px] flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-400 rounded-[4rem] shadow-2xl rotate-3 opacity-10"></div>

            <motion.div
              animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-0 right-0 w-3/4 p-8 bg-white rounded-[2.5rem] shadow-2xl border border-blue-50 z-10"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                  <CheckCircle size={20} />
                </div>
                <p className="font-black text-slate-900 uppercase tracking-tighter">Scalability & Security</p>
              </div>
              <p className="text-[10px] text-slate-500 font-bold uppercase leading-relaxed tracking-widest">
                Ensuring efficiency, security, and scalability through cutting-edge technology.
              </p>
            </motion.div>

            <motion.div
              animate={{ y: [0, -20, 0], x: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-0 left-0 w-3/4 p-10 bg-slate-900 rounded-[3rem] shadow-2xl z-20 text-white"
            >
              <div className="inline-block p-3 bg-blue-600 rounded-2xl mb-6 shadow-lg shadow-blue-600/20">
                <Target size={32} />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">
                Transforming Ideas
              </h3>
              <p className="text-sm text-slate-400 font-medium italic leading-relaxed">
                "Our passion lies in turning ideas into impactful digital solutions."
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></div>
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-400">Live Innovation Hub</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -right-10 -top-10 opacity-5 z-0"
            >
              <Target size={300} className="text-blue-900" />
            </motion.div>
          </motion.div>

        </div>
      </header>

      {/* Company Overview */}
      <section id="about" className="py-24 bg-white">
        <motion.div
          className="max-w-7xl mx-auto px-6"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={stagger}
        >
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div variants={scrollReveal}>
              <h2 className="text-blue-600 font-bold text-sm uppercase tracking-[0.3em] mb-4">Our Company</h2>
              <p className="text-3xl font-black text-slate-900 mb-6 leading-tight">
                Panacea ITServices Pvt Ltd is a dynamic and fast-growing, research-driven company founded by industry experts with extensive expertise in Mobile App and Web Development.
              </p>
              <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                We excel in transforming visionary ideas into top-tier mobile and web solutions. Our mission is to deliver highly efficient, scalable, and user-centric business solutions by power of cutting edge technology and adhering to the highest industry standards.
              </p>
              <div className="space-y-4 mb-8 text-slate-600">
                <p>We offer a wide range of services including software development, cloud solutions, mobile and web application development, IT consulting, and digital transformation support.</p>
                <p className="border-l-4 border-blue-600 pl-6 py-2 italic font-medium">
                  Our team of skilled professionals is passionate about leveraging the latest technologies to create customized solutions tailored to the unique needs of every client. we are committed to being a trusted partner in every step of the journey.
                </p>
              </div>
            </motion.div>

            <div className="grid gap-6">
              <motion.div variants={scrollReveal} className="p-8 rounded-[2rem] bg-slate-900 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl group-hover:bg-blue-600/40 transition-all"></div>
                <h3 className="text-xl font-black mb-4 flex items-center gap-2 tracking-widest uppercase text-blue-400">
                  <Target size={24} /> Our Vision
                </h3>
                <p className="text-slate-300 leading-relaxed text-sm">
                  At PanacealTServices Pvt Ltd, Our vision is to become a leading force in the IT industry by driving innovation, delivering transformative digital solutions, and empowering businesses to succeed in a rapidly evolving technological landscape. We aspire to build a future where technology seamlessly connects people, processes, and ideas, creating smarter and more efficient systems that improve everyday life.
                </p>
              </motion.div>
              <motion.div variants={scrollReveal} className="p-8 rounded-[2rem] bg-blue-600 text-white relative overflow-hidden group">
                <h3 className="text-xl font-black mb-4 flex items-center gap-2 tracking-widest uppercase text-blue-100">
                  <Rocket size={24} /> Our Mission
                </h3>
                <p className="text-blue-50 leading-relaxed text-sm mb-6">
                  Our mission is simple: to harness the power of technology to create smarter, more connected, and future-ready businesses.
                </p>
                <div className="grid gap-3 pt-4 border-t border-white/20 text-xs font-bold uppercase tracking-wider">
                  <div className="flex items-center gap-2"><CheckCircle size={14} /> Transform Ideas into Reality</div>
                  <div className="flex items-center gap-2"><CheckCircle size={14} /> Provide Cutting-Edge Tools and Platforms</div>
                  <div className="flex items-center gap-2"><CheckCircle size={14} /> Build Long-Lasting Partnerships</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CEO Profile */}
      

      {/* Services Grid */}
      <section id="services" className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#ffffff_0%,#f7fbff_52%,#effaff_100%)] py-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <motion.div
            className="absolute -left-40 top-[-8rem] h-[30rem] w-[30rem] rounded-full bg-cyan-300/35 blur-[90px]"
            animate={reduceMotion ? undefined : { x: [0, 100, 35, 0], y: [0, 65, 135, 0] }}
            transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -right-40 top-[18rem] h-[32rem] w-[32rem] rounded-full bg-blue-300/30 blur-[100px]"
            animate={reduceMotion ? undefined : { x: [0, -90, -25, 0], y: [0, 90, 175, 0] }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[-12rem] left-[34%] h-[26rem] w-[26rem] rounded-full bg-violet-300/25 blur-[95px]"
            animate={reduceMotion ? undefined : { x: [0, 70, 120, 0], y: [0, -75, -20, 0] }}
            transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          />
          {serviceBackgroundDots.map((dot) => (
            <motion.span
              key={`${dot.left}-${dot.top}`}
              className="absolute h-1.5 w-1.5 rounded-full"
              style={{
                left: dot.left,
                top: dot.top,
                backgroundColor: dot.color,
                boxShadow: `0 0 12px 3px ${dot.color}66`,
              }}
              animate={reduceMotion ? undefined : {
                y: [0, -16, 5, 0],
                x: [0, 7, -4, 0],
                opacity: [0.35, 0.95, 0.55, 0.35],
                scale: [0.8, 1.25, 0.9, 0.8],
              }}
              transition={{ duration: 5.5 + dot.delay, delay: dot.delay, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>

        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-6"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={stagger}
        >
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">Our Services</h2>
            <p className="text-slate-500 max-w-3xl mx-auto font-medium">
              Panacea ITServices Pvt Ltd specializes in delivering high-quality web and mobile application development services tailored to meet the diverse needs of businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <ServiceItem icon={<Globe />} title="Web Development" desc="Creating dynamic, responsive, and user-friendly websites to enhance brand presence." />
            <ServiceItem icon={<Smartphone />} title="Mobile App Development" desc="iOS & Android platforms blending functionality with intuitive design." />
            <ServiceItem icon={<Megaphone />} title="Digital Marketing" desc="Comprehensive solutions to enhance visibility and drive more conversions." />
            <ServiceItem icon={<Palette />} title="UI/UX Designing" desc="User-centric design focused on seamless experiences and engagement." />
            <ServiceItem icon={<Cloud />} title="Cloud Hosting Solutions" desc="Scalable and secure infrastructure aligned with latest technologies." />
            <ServiceItem icon={<Settings />} title="Technical Consulting" desc="Expert guidance on digital transformation and technical strategy." />
            <ServiceItem icon={<Shield />} title="Cyber Security" desc="Protecting business assets with advanced security protocols." />
            <ServiceItem icon={<Layers />} title="DevOps & Automation" desc="Faster delivery, continuous integration, and reliable performance." />
            <ServiceItem icon={<Cpu />} title="AI Integration" desc="Harnessing artificial intelligence and machine learning solutions." />
            <ServiceItem icon={<Rocket />} title="Brand Promotion" desc="Tailored strategies to boost your brand in a competitive world." />
          </div>

          <motion.div variants={scrollReveal} className="mt-20 p-12 rounded-[3rem] bg-slate-900 text-white grid md:grid-cols-4 gap-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>
            <div>
              <h4 className="text-lg font-black mb-2 uppercase tracking-widest text-blue-400">Why Choose Us?</h4>
              <p className="text-slate-400 text-[10px] font-bold uppercase">Expertise in Cutting-edge Technologies</p>
            </div>
            <div>
              <h4 className="text-lg font-black mb-2 uppercase tracking-widest text-blue-400">Customized</h4>
              <p className="text-slate-400 text-[10px] font-bold uppercase">Tailored to your specific requirements</p>
            </div>
            <div>
              <h4 className="text-lg font-black mb-2 uppercase tracking-widest text-blue-400">On-Time</h4>
              <p className="text-slate-400 text-[10px] font-bold uppercase">Commitment to deadlines & quality</p>
            </div>
            <div>
              <h4 className="text-lg font-black mb-2 uppercase tracking-widest text-blue-400">End-to-End</h4>
              <p className="text-slate-400 text-[10px] font-bold uppercase">Ideation to post-launch maintenance</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Products and Projects */}
      <section id="projects" className="py-24 bg-slate-50 overflow-hidden">
        <motion.div
          className="max-w-7xl mx-auto px-6"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={scrollReveal} className="mb-16">
            <h2 className="text-2xl font-black mb-6 uppercase tracking-tighter text-slate-900">
              Project Highlights
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { title: "Stocks App", src: "/stocks-app.webp" },
                { title: "Child Care Management", src: "/childcaremanage.webp" },
                { title: "Mutual Funds", src: "/mutual-funds.webp" },
                { title: "OMR Customization", src: "/omr-customization.webp" },
                { title: "Influencer App", src: "/influencer-app.webp" },
              ].map((project) => (
                <div key={project.title} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <Image
                      src={project.src}
                      alt={`${project.title} project`}
                      fill
                      sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                      className="object-cover object-top transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <p className="px-3 py-3 text-xs font-bold text-slate-800">{project.title}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-16 mb-24">
            <motion.div variants={scrollReveal}>
              <h2 className="text-3xl font-black mb-12 flex items-center gap-3 uppercase tracking-tighter italic">
                <Briefcase className="text-blue-600" /> Key Projects
              </h2>
              <div className="flex flex-wrap gap-3">
                {[
                  "STOX 11", "Hyderabad Party Rentals", "Digi Akshara",
                  "BOV", "Baba Car Wash", "Brain Buzz",
                  "Mutual Funds", "OMR Sheet", "Child Care Management", "Evergreen"
                ].map((project) => (
                  <span key={project} className="px-6 py-4 rounded-2xl bg-white border border-slate-200 text-slate-800 font-black text-sm shadow-sm hover:border-blue-400 transition-all">
                    {project}
                  </span>
                ))}
              </div>
              <p className="mt-12 text-slate-500 text-sm font-bold uppercase leading-relaxed max-w-lg">
                PanacealTServices Pvt Ltd delivers innovative IT solutions. We turn ideas into reliable, user-centric digital products.
              </p>
            </motion.div>

            <motion.div variants={scrollReveal} id="products">
              <h2 className="text-3xl font-black mb-12 flex items-center gap-3 uppercase tracking-tighter italic text-slate-900">
                <Layout className="text-blue-600" /> Our Products
              </h2>
              <div className="grid gap-4">
                <ProductRow title="E-Commerce Website" desc="Custom platforms with secure payments, easy inventory management, and seamless shopping." />
                <ProductRow title="Food Delivery Website" desc="Efficient ordering, real-time tracking, secure payments, and customize-able menus." />
                <ProductRow title="School Management" desc="Streamline school operations: manage student data, academic records, and attendance." />
                <ProductRow title="Event Management" desc="Software designed to plan, organize, and manage events efficiently." />
                <ProductRow title="Online Course Platform" desc="Enable students to access educational content via the internet." />
                <ProductRow title="Mutual Funds" desc="Pool of money collected from multiple investors to invest in stocks and assets." />
                <ProductRow title="Dating App" desc="Advanced algorithms to connect people who share interests and values." />
                <ProductRow title="Store Management" desc="Organizing inventory, sales, staff, and customer service operations." />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Digital Marketing Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <motion.div
          className="max-w-7xl mx-auto px-6 relative z-10"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={stagger}
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={scrollReveal}>
              <h2 className="text-4xl font-black mb-4 uppercase italic tracking-tighter">Digital Marketing Solutions</h2>
              <p className="text-blue-400 text-2xl font-black mb-8 underline decoration-white/20 underline-offset-8 underline decoration-2 tracking-widest uppercase">
                Boost your Brand, Maximize Your Growth
              </p>
              <p className="text-slate-400 text-lg mb-12 leading-relaxed italic font-medium">
                In today's digital era, having a strong online presence is essential for business success. We use data-driven strategies and latest marketing techniques to ensure you stay ahead.
              </p>

              <div className="space-y-8">
                <MarketingItem title="SEO" desc="Keyword optimization, on-page/off-page SEO, technical SEO, and link building." />
                <MarketingItem title="SMM" desc="Build brand presence on social media with tailored strategies and content creation." />
                <MarketingItem title="PPC" desc="Drive instant traffic and sales with Google Ads, social media campaigns, and retargeting." />
                <MarketingItem title="Content Marketing" desc="Blogs, website copy, videos, and email to attract and retain customers." />
                <MarketingItem title="Email Marketing & Automation" desc="Personalized drip campaigns and performance tracking to boost conversions." />
              </div>
            </motion.div>

            <motion.div variants={scrollReveal} className="grid grid-cols-2 gap-6">
              {[
                { n: 'Google', i: <Search size={32} /> },
                { n: 'Facebook', i: <Facebook size={32} /> },
                { n: 'Instagram', i: <Instagram size={32} /> },
                { n: 'LinkedIn', i: <Linkedin size={32} /> },
                { n: 'Twitter', i: <Twitter size={32} /> },
                { n: 'YouTube', i: <Youtube size={32} /> }
              ].map((plat) => (
                <div key={plat.n} className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 text-center hover:bg-blue-600 transition-all group">
                  <div className="mb-4 text-blue-400 group-hover:text-white flex justify-center">{plat.i}</div>
                  <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-white">{plat.n}</h4>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Tech Stack Section */}
      <Technology />

      {/* Academy Section */}
      <section id="training" className="py-24 bg-blue-600 text-white relative overflow-hidden">
        <motion.div
          className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={scrollReveal}>
            <div className="inline-block px-4 py-1 rounded-full bg-white/20 text-[10px] font-black uppercase tracking-[0.3em] mb-6 animate-pulse">
              Newly Launched
            </div>
            <h2 className="text-5xl font-black leading-tight uppercase tracking-tighter mb-8 italic">
              REAL TIME WORK EXPERIENCE
            </h2>
            <p className="text-blue-100 text-lg leading-relaxed mb-8 font-medium">
              Launched just 2 months ago, PanacealTServices Pvt Ltd is already shaping the future of tech talent. With 50+ students we offer hands-on training in full-stack development, data structures, resume building, and interview prep.
            </p>
            <p className="text-sm font-black opacity-80 mb-12 border-l-2 border-white/40 pl-4 uppercase leading-loose tracking-wider">
              Our mission is to turn beginners into job-ready professionals-fast, affordably, and effectively. Backed by PanacealTServices Pvt Ltd.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                "Web Designing", "UI/UX Designing", "Data Analytics", "Python",
                "Digital Marketing", "Data Science", "React.js", "Flutter"
              ].map(item => (
                <div key={item} className="flex items-center gap-3 bg-white/10 p-4 rounded-xl border border-white/5 font-black text-xs uppercase tracking-widest">
                  <CheckCircle size={18} className="text-blue-300 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={scrollReveal} className="bg-white rounded-[4rem] p-12 lg:p-16 text-slate-900 shadow-2xl relative">
            <Quote className="absolute -top-10 -right-10 text-slate-50 w-64 h-64 -rotate-12" />
            <div className="relative z-10">
              <h3 className="text-2xl font-black mb-6 uppercase italic">Our Office Space</h3>
              <p className="text-slate-500 font-bold mb-8 italic text-xs tracking-widest leading-relaxed uppercase">
                Welcome to PanacealTServices Pvt Ltd. Step into a space built for comfort, learning, and collaboration. We host regular training sessions to empower our team with the latest skills and innovations.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="group relative aspect-video overflow-hidden rounded-3xl bg-slate-200">
                  <Image
                    src="/aboutus.webp"
                    alt="Team collaborating together in a modern office"
                    fill
                    sizes="(max-width: 768px) 50vw, 320px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent" />
                  <span className="absolute bottom-4 left-4 text-xs font-black uppercase tracking-[0.16em] text-white drop-shadow-md sm:text-sm">
                    Office Space
                  </span>
                </div>
                <div className="group relative aspect-video overflow-hidden rounded-3xl bg-slate-200">
                  <Image
                    src="/whyBusinessTrustUs.png"
                    alt="Team reviewing ideas and project plans during a workshop"
                    fill
                    sizes="(max-width: 768px) 50vw, 320px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent" />
                  <span className="absolute bottom-4 left-4 text-xs font-black uppercase tracking-[0.16em] text-white drop-shadow-md sm:text-sm">
                    Team Workshop
                  </span>
                </div>
              </div>
              <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white">
                <p className="font-black italic text-sm leading-relaxed mb-4">
                  "At PanacealTServices we believe great ideas thrive where passion meets technology"
                </p>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
                  Turning ideas into impactful solutions every day fueled by a vibrant team.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

// Sub-components

function ServiceItem({ icon, title, desc }: { icon: React.ReactElement<{ size?: number; className?: string }>, title: string, desc: string }) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      variants={scrollReveal}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white/85 backdrop-blur-sm p-8 rounded-[2rem] border-2 border-blue-100 hover:border-blue-300 shadow-[0_8px_24px_rgba(15,23,42,0.08)] hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 flex flex-col items-center text-center group relative overflow-hidden"
    >
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] border-2"
        animate={{
          borderColor: isHovered
            ? ["#93c5fd", "#67e8f9", "#93c5fd"]
            : "rgba(37, 99, 235, 0)",
          boxShadow: isHovered
            ? [
                "0 0 0 0 rgba(37, 99, 235, 0)",
                "0 0 8px 1px rgba(6, 182, 212, 0.14)",
                "0 0 0 0 rgba(37, 99, 235, 0)",
              ]
            : "0 0 0 0 rgba(37, 99, 235, 0)",
        }}
        transition={
          isHovered
            ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.2 }
        }
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-transparent to-cyan-50/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

      <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-[1.35rem] border border-white bg-gradient-to-br from-blue-100 via-white to-cyan-100 text-blue-600 shadow-[0_8px_18px_rgba(37,99,235,0.16),inset_0_1px_0_rgba(255,255,255,0.95)] transition-all duration-300 group-hover:scale-110 group-hover:from-blue-600 group-hover:via-blue-500 group-hover:to-cyan-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-500/30">
        <span className="absolute inset-[5px] rounded-[1rem] bg-gradient-to-br from-white/70 to-transparent opacity-80 group-hover:opacity-20" />
        <span className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_7px_rgba(34,211,238,0.9)] transition-transform duration-300 group-hover:scale-125" />
        <span className="relative drop-shadow-[0_2px_2px_rgba(15,23,42,0.22)]">
          {React.cloneElement(icon, { size: 28, className: "relative z-10" })}
        </span>
      </div>
      <h3 className="relative z-10 font-black text-slate-900 text-[11px] uppercase tracking-[0.1em] mb-4 group-hover:text-blue-700 transition-colors">{title}</h3>
      <p className="relative z-10 text-slate-500 text-[11px] font-medium leading-relaxed group-hover:text-slate-800 transition-colors">
        {desc}
      </p>
    </motion.div>
  );
}

function ProductRow({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="group flex gap-4 p-5 rounded-3xl hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-slate-100">
      <div className="w-1 h-auto bg-blue-600 rounded-full group-hover:scale-y-110 transition-transform shrink-0"></div>
      <div>
        <h4 className="text-xs font-black text-slate-900 mb-1 uppercase tracking-tighter italic">{title}</h4>
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-tight leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function MarketingItem({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="group pl-6 border-l-2 border-white/10 hover:border-blue-500 transition-colors">
      <h5 className="font-black text-blue-400 text-xs mb-1 uppercase tracking-[0.2em]">{title}</h5>
      <p className="text-slate-500 text-xs font-bold uppercase tracking-tighter group-hover:text-white transition-colors">{desc}</p>
    </div>
  );
}