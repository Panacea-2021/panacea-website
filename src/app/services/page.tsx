"use client";

import React from "react";
import Link from "next/link";
import ServiceArtwork from "@/components/ServiceArtwork";
import styles from "./servicesPage.module.css";
import {
  Monitor,
  Smartphone,
  Layers,
  Megaphone,
  Search,
  LayoutTemplate,
  AppWindow,
  MousePointerClick,
  PenTool,
  Users,
  Database,
  Cloud,
  Globe,
  Share2
} from "lucide-react";

export default function ServicesPage() {
  return (
    <div className={`${styles.page} min-h-screen bg-white font-sans text-slate-800 selection:bg-blue-500/30`}>
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden bg-[#0a1b4e]">
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight">
            End-to-End <span className="text-[#FFD700]">Software <br className="hidden md:block" /> Development</span> Services
          </h1>
          <p className="text-slate-300 text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-10">
            Comprehensive software development services designed to help startups, growing businesses, and enterprise organizations build scalable, secure, and high-performance digital systems.
          </p>
          <Link href="/contact">
            <button className="px-8 py-3.5 rounded-xl bg-[#3B82F6] text-white font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/25">
              Let's Discuss &rarr;
            </button>
          </Link>
        </div>
      </section>

      {/* 2. TRACK RECORD SECTION */}
      <section className="py-24 px-6 bg-gradient-to-br from-blue-50 via-white to-indigo-50 shrink-0 relative">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-[#0B1536] mb-6 tracking-tight">
            Leading <span className="text-[#FFD700]">Software Development</span> <br className="hidden md:block" /> Company — Global Delivery
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed mb-16 max-w-4xl mx-auto font-medium">
            At Panacea IT services, our engineering expertise spans web applications, mobile apps, custom enterprise software, SaaS platforms, Salesforce solutions, and cloud-native infrastructure — delivering measurable business outcomes for global clients.
          </p>

          <h3 className="text-2xl font-black text-[#0B1536] mb-8">Proven Track Record</h3>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 shadow-sm hover:border-blue-200 transition-colors">
              <h4 className="text-4xl font-black text-blue-500 mb-2">1500+</h4>
              <p className="text-slate-500 font-bold text-sm">Mobile Apps <br /> Developed</p>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 shadow-sm hover:border-blue-200 transition-colors">
              <h4 className="text-4xl font-black text-blue-500 mb-2">820+</h4>
              <p className="text-slate-500 font-bold text-sm">Websites <br /> Developed</p>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 shadow-sm hover:border-blue-200 transition-colors">
              <h4 className="text-4xl font-black text-blue-500 mb-2">700+</h4>
              <p className="text-slate-500 font-bold text-sm">Unique Features <br /> Implemented</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DESIGN SERVICES */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#0B1536] tracking-tight mb-4">
              <span className="text-blue-500">Design</span> Services
            </h2>
            <p className="text-slate-500 text-lg">We create <span className="font-bold text-slate-700">customer-centric</span> designs for web and mobile applications focused on clarity, usability, and conversion optimization.</p>
          </div>

          <div className="grid mx-auto lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl min-h-[400px] bg-slate-200">
              <ServiceArtwork kind="design" label="Interface design workspace with wireframes, a prototype, and a color palette" />
            </div>

            <div className="space-y-4">
              <div className="flex gap-4 p-4 rounded-3xl hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center shrink-0 text-pink-500">
                  <AppWindow size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Mobile App Design</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">Designing intuitive, high-performance mobile app interfaces for iOS and Android.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-3xl hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0 text-blue-500">
                  <MousePointerClick size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">UX/UI Design</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">User-centered UX/UI designs focused on clarity, usability, and conversion optimization.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-3xl hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center shrink-0 text-cyan-500">
                  <PenTool size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Branding</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">Creating strong, memorable brand identities that resonate with your target audience.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DEVELOPMENT SERVICES */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#0B1536] tracking-tight mb-4">
              <span className="text-blue-500">Development</span> Services
            </h2>
            <p className="text-slate-500 text-lg max-w-3xl mx-auto">We deliver result-driven, customized web application development, mobile app development, custom software engineering, and SaaS platform services.</p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {/* 01 */}
            <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm relative overflow-hidden group hover:border-blue-100 transition-colors">
              <div className="relative -mx-8 -mt-8 mb-6 h-36 overflow-hidden rounded-t-3xl">
                <ServiceArtwork kind="web" label="Web application dashboard with responsive interface panels and analytics" />
              </div>
              <div className="absolute top-4 right-6 text-6xl font-black text-slate-50/80 -z-10 group-hover:text-blue-50 transition-colors">01</div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 mb-6">
                <Monitor size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Web Application Development</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">Scalable, secure, and performance-driven web applications — custom web apps, enterprise platforms, API integrations, and progressive web apps.</p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-white border border-blue-100 text-blue-600 text-xs font-semibold rounded-full">React</span>
                <span className="px-3 py-1 bg-white border border-blue-100 text-blue-600 text-xs font-semibold rounded-full">Next.js</span>
                <span className="px-3 py-1 bg-white border border-blue-100 text-blue-600 text-xs font-semibold rounded-full">Node.js</span>
                <span className="px-3 py-1 bg-white border border-blue-100 text-blue-600 text-xs font-semibold rounded-full">PWA</span>
              </div>
              <Link href="/contact" className="text-blue-500 font-bold text-sm flex items-center gap-1 hover:text-blue-600 transition-colors">Learn More &rarr;</Link>
            </div>

            {/* 02 */}
            <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm relative overflow-hidden group hover:border-blue-100 transition-colors">
              <div className="relative -mx-8 -mt-8 mb-6 h-36 overflow-hidden rounded-t-3xl">
                <ServiceArtwork kind="mobile" label="Mobile application interface displayed on a smartphone with connected app features" />
              </div>
              <div className="absolute top-4 right-6 text-6xl font-black text-slate-50/80 -z-10 group-hover:text-blue-50 transition-colors">02</div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 mb-6">
                <Smartphone size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Mobile App Development</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">Robust mobile applications across iOS, Android, and cross-platform frameworks for enterprise mobility and consumer-focused experiences.</p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-white border border-blue-100 text-blue-600 text-xs font-semibold rounded-full">iOS</span>
                <span className="px-3 py-1 bg-white border border-blue-100 text-blue-600 text-xs font-semibold rounded-full">Android</span>
                <span className="px-3 py-1 bg-white border border-blue-100 text-blue-600 text-xs font-semibold rounded-full">React Native</span>
                <span className="px-3 py-1 bg-white border border-blue-100 text-blue-600 text-xs font-semibold rounded-full">Flutter</span>
              </div>
              <Link href="/contact" className="text-blue-500 font-bold text-sm flex items-center gap-1 hover:text-blue-600 transition-colors">Learn More &rarr;</Link>
            </div>

            {/* 03 */}
            <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm relative overflow-hidden group hover:border-blue-100 transition-colors">
              <div className="relative -mx-8 -mt-8 mb-6 h-36 overflow-hidden rounded-t-3xl">
                <ServiceArtwork kind="software" label="Custom software code editor connected to modular system components" />
              </div>
              <div className="absolute top-4 right-6 text-6xl font-black text-slate-50/80 -z-10 group-hover:text-blue-50 transition-colors">03</div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 mb-6">
                <Layers size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Custom Software Development</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">Tailored enterprise applications, business process automation, workflow management systems, and legacy system modernization.</p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-white border border-blue-100 text-blue-600 text-xs font-semibold rounded-full">Enterprise</span>
                <span className="px-3 py-1 bg-white border border-blue-100 text-blue-600 text-xs font-semibold rounded-full">Automation</span>
                <span className="px-3 py-1 bg-white border border-blue-100 text-blue-600 text-xs font-semibold rounded-full">Workflows</span>
                <span className="px-3 py-1 bg-white border border-blue-100 text-blue-600 text-xs font-semibold rounded-full">APIs</span>
              </div>
              <Link href="/contact" className="text-blue-500 font-bold text-sm flex items-center gap-1 hover:text-blue-600 transition-colors">Learn More &rarr;</Link>
            </div>

            {/* 04 */}
            <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm relative overflow-hidden group hover:border-blue-100 transition-colors">
              <div className="relative -mx-8 -mt-8 mb-6 h-36 overflow-hidden rounded-t-3xl">
                <ServiceArtwork kind="saas" label="Cloud software platform connecting modular business applications" />
              </div>
              <div className="absolute top-4 right-6 text-6xl font-black text-slate-50/80 -z-10 group-hover:text-blue-50 transition-colors">04</div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 mb-6">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">SaaS Platform Development</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">Scalable SaaS platforms built on multi-tenant architecture with subscription billing, cloud-native infrastructure, and API-driven ecosystems.</p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-white border border-blue-100 text-blue-600 text-xs font-semibold rounded-full">Multi-Tenant</span>
                <span className="px-3 py-1 bg-white border border-blue-100 text-blue-600 text-xs font-semibold rounded-full">AWS</span>
                <span className="px-3 py-1 bg-white border border-blue-100 text-blue-600 text-xs font-semibold rounded-full">Azure</span>
                <span className="px-3 py-1 bg-white border border-blue-100 text-blue-600 text-xs font-semibold rounded-full">Billing</span>
              </div>
              <Link href="/contact" className="text-blue-500 font-bold text-sm flex items-center gap-1 hover:text-blue-600 transition-colors">Learn More &rarr;</Link>
            </div>

            {/* 05 */}
            <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm relative overflow-hidden group hover:border-blue-100 transition-colors">
              <div className="relative -mx-8 -mt-8 mb-6 h-36 overflow-hidden rounded-t-3xl">
                <ServiceArtwork kind="crm" label="Customer relationship management dashboard with connected sales pipeline stages" />
              </div>
              <div className="absolute top-4 right-6 text-6xl font-black text-slate-50/80 -z-10 group-hover:text-blue-50 transition-colors">05</div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 mb-6">
                <Database size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Salesforce Consulting</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">Expert Salesforce implementation, CRM customization, workflow automation, and Sales & Service Cloud integration for operational efficiency.</p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-white border border-blue-100 text-blue-600 text-xs font-semibold rounded-full">Salesforce</span>
                <span className="px-3 py-1 bg-white border border-blue-100 text-blue-600 text-xs font-semibold rounded-full">CRM</span>
                <span className="px-3 py-1 bg-white border border-blue-100 text-blue-600 text-xs font-semibold rounded-full">Automation</span>
                <span className="px-3 py-1 bg-white border border-blue-100 text-blue-600 text-xs font-semibold rounded-full">Cloud</span>
              </div>
              <Link href="/contact" className="text-blue-500 font-bold text-sm flex items-center gap-1 hover:text-blue-600 transition-colors">Learn More &rarr;</Link>
            </div>

            {/* 06 */}
            <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm relative overflow-hidden group hover:border-blue-100 transition-colors">
              <div className="relative -mx-8 -mt-8 mb-6 h-36 overflow-hidden rounded-t-3xl">
                <ServiceArtwork kind="cloud" label="Cloud infrastructure connected to scalable server environments" />
              </div>
              <div className="absolute top-4 right-6 text-6xl font-black text-slate-50/80 -z-10 group-hover:text-blue-50 transition-colors">06</div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 mb-6">
                <Cloud size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Cloud & DevOps</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">Secure cloud architecture, migration & modernization, CI/CD pipelines, infrastructure automation, and DevOps consulting services.</p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-white border border-blue-100 text-blue-600 text-xs font-semibold rounded-full">CI/CD</span>
                <span className="px-3 py-1 bg-white border border-blue-100 text-blue-600 text-xs font-semibold rounded-full">Docker</span>
                <span className="px-3 py-1 bg-white border border-blue-100 text-blue-600 text-xs font-semibold rounded-full">Kubernetes</span>
                <span className="px-3 py-1 bg-white border border-blue-100 text-blue-600 text-xs font-semibold rounded-full">Terraform</span>
              </div>
              <Link href="/contact" className="text-blue-500 font-bold text-sm flex items-center gap-1 hover:text-blue-600 transition-colors">Learn More &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MARKETING SERVICES */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#0B1536] tracking-tight mb-4">
              <span className="text-blue-500">Marketing Services</span> That Drive Growth
            </h2>
            <p className="text-slate-500 text-lg max-w-3xl mx-auto">Boost your online presence with comprehensive digital marketing solutions designed to attract, engage, and convert your audience into loyal customers.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {/* Digital Marketing (General) */}
            <div className="relative bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-100 transition-colors">
              <div className="relative -mx-8 -mt-8 mb-6 h-36 overflow-hidden rounded-t-2xl">
                <ServiceArtwork kind="marketing" label="Digital marketing campaign dashboard with channel performance analytics" />
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 mb-6">
                <MousePointerClick size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Digital Marketing</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">Data-driven digital marketing strategies that attract, engage, and convert — driving measurable growth across all channels.</p>
            </div>

            {/* SEO */}
            <div className="relative bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-100 transition-colors">
              <div className="relative -mx-8 -mt-8 mb-6 h-36 overflow-hidden rounded-t-2xl">
                <ServiceArtwork kind="seo" label="Search optimization analytics with rising organic visibility and ranking insights" />
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 mb-6">
                <Search size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Search Engine Optimization (SEO)</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">Boost your search rankings with expert SEO that increases visibility, organic traffic, and long-term sustainable growth.</p>
            </div>

            {/* SEM */}
            <div className="relative bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-100 transition-colors">
              <div className="relative -mx-8 -mt-8 mb-6 h-36 overflow-hidden rounded-t-2xl">
                <ServiceArtwork kind="sem" label="Paid search campaign listings with targeted advertising performance" />
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 mb-6">
                <Globe size={24} className="text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Search Engine Marketing (SEM)</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">Drive instant traffic and high-quality leads with targeted SEM campaigns and cost-effective ad strategies that maximize ROI.</p>
            </div>

            {/* SMM */}
            <div className="relative bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-100 transition-colors">
              <div className="relative -mx-8 -mt-8 mb-6 h-36 overflow-hidden rounded-t-2xl">
                <ServiceArtwork kind="social" label="Social media campaign post on a smartphone with engagement and sharing indicators" />
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 mb-6">
                <Megaphone size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Social Media Marketing (SMM)</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">Strategic content and smart advertising that builds your brand presence and turns followers into loyal customers.</p>
            </div>

          </div>
        </div>
      </section>

      {/* 6. SOFTWARE DEVELOPMENT PROCESS */}
      <section className="py-24 px-6 bg-white overflow-hidden text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-blue-600 tracking-tight mb-4">
            Software Development Process We Follow
          </h2>
          <p className="text-slate-500 text-lg max-w-3xl mx-auto mb-16">
            Our software development team follows an agile methodology to ensure a successful, on-time launch of your application to market.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              { step: '1', name: 'Requirement Gathering' },
              { step: '2', name: 'Strategy' },
              { step: '3', name: 'Design' },
              { step: '4', name: 'Development' },
              { step: '5', name: 'Quality Assurance' },
              { step: '6', name: 'Deployment' },
              { step: '7', name: 'Support & Maintenance' }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center p-6 border border-blue-100 rounded-2xl shadow-sm bg-blue-50 min-w-[140px] hover:border-blue-200 transition-all hover:-translate-y-1">
                <span className="text-4xl font-black text-[#0B1536] mb-4">{item.step}</span>
                <span className="text-sm font-bold text-slate-600 max-w-[100px] leading-tight text-center">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA SECTION */}
      <section className="py-24 px-6 bg-[#0B1536] text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
            Have a Project in Mind?
          </h2>
          <p className="text-slate-300 text-lg mb-10">
            Let's connect, discuss your ideas, and turn them into impactful, user-focused solutions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="w-full px-8 py-3.5 rounded-xl bg-[#3B82F6] text-white font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors shadow-lg">
                Contact Us &rarr;
              </button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="w-full px-8 py-3.5 rounded-xl bg-[#22C55E] text-white font-bold flex items-center justify-center gap-2 hover:bg-[#16A34A] transition-colors shadow-lg">
                WhatsApp &rarr;
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}