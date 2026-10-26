"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Suez_One } from "next/font/google";
import {
  ChevronDown, ArrowRight, X, Menu,
} from "lucide-react";
import { FaEnvelope } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa6";
import { ImLocation2 } from "react-icons/im";
import HiringTag from "./HiringTag";
import { trackEmailClick, trackPhoneClick } from "@/lib/gtag";
import { useQuoteLead } from "./QuoteLeadProvider";
import styles from "./Navbar.module.css";

const suez = Suez_One({ weight: '400', subsets: ['latin'], display: 'swap' });

interface MegaMenuProps {
  data: any[];
  type: string;
  closeMenu: () => void;
}

/* ---------------- MULTI-MENU DATA ---------------- */

const homeData = [
  {
    category: "About us",
    desc: "Panacea delivers innovative mobile and web app solutions for modern businesses",
    icon: <Image src="/business_solution.png" alt="About" width={24} height={24} className="object-contain" />,
    items: [
      { title: "Company Overview", desc: "Panacea delivers innovative mobile and web app solutions for modern businesses", href: "/about" },
      { title: "Vision & Mission", desc: "Driving digital innovation with purpose and empowering businesses globally", href: "/vision" },
      { title: "Leadership Team", desc: "Meet the experienced minds leading Panacea to digital excellence", href: "/leadership" },
      { title: "Our Journey", desc: "14+ years of building world-class digital products across 20+ industries", href: "/journey" },
      { title: "Awards & Recognition", desc: "Industry accolades celebrating our commitment to quality and innovation", href: "/awards" },
      { title: "NASSCOM Membership", desc: "Proud member of India's premier IT industry association", href: "/nasscom" },
      { title: "Life at Panacea", desc: "Explore our vibrant culture, talented people, and collaborative work environment", href: "/careers" },
    ],
    rightPanel: {
      title: "ABOUT PANACEA",
      checkmarks: [
        "ISO-Certified Enterprise IT Company",
        "14+ Years of Industry Experience",
        "Trusted by Global Governments & Enterprises",
        "1500+ Apps Delivered Worldwide",
        "Offices in Hyderabad, USA"
      ],
      buttonText: "Get in Touch",
      buttonLink: "/contact"
    }
  },
  {
    category: "Blog",
    desc: "Discover expert ideas and innovations on our Blogs",
    icon: <Image src="/socialmedia.png" alt="Blog" width={24} height={24} className="object-contain" />,
    items: [
      { title: "Latest Insights", desc: "Read our newest articles and updates", href: "/blog" },
      { title: "Case Studies", desc: "In-depth analysis of our successful projects", href: "/blog/case-study-school-management-platform-launch" },
    ],
    rightPanel: {
      title: "SUBSCRIBE NOW",
      checkmarks: [
        "Weekly Tech Insights",
        "Industry Best Practices",
        "Exclusive Feature Updates"
      ],
      buttonText: "Read Blog",
      buttonLink: "/blog"
    }
  }
];

const servicesData = [
  {
    category: "Software Development",
    desc: "Delivering seamless digital experiences with expert software development.",
    icon: <Image src="/custom_software-dev.png" alt="Software" width={24} height={24} className="object-contain" />,
    items: [
      { title: "Mobile App Development", desc: "Custom iOS, Android & cross-platform solutions", href: "/services/mobile" },
      { title: "Web Application Development", desc: "Scalable web apps built for your business", href: "/services/web" },
      { title: "iOS App Development", desc: "Native iPhone apps with seamless UX", href: "/services/ios" },
      { title: "Custom Software Development", desc: "Tailored solutions for unique business needs", href: "/services/custom" },
      { title: "Android App Development", desc: "Robust apps for the Android ecosystem", href: "/services/android" },
      { title: "CMS & Portal Development", desc: "Content management systems for easy updates", href: "/services/cms" },
      { title: "iPad App Development", desc: "Optimized tablet experiences for enterprise", href: "/services/ipad" },
      { title: "360° Photography Services", desc: "Immersive virtual tours and product views", href: "/services/photography" },
      { title: "Flutter App Development", desc: "Cross-platform apps from a single codebase", href: "/services/flutter" },
      { title: "Enterprise Application Development", desc: "Scalable, secure & cloud-native enterprise software", href: "/services/enterprise" },
      { title: "React Native App Development", desc: "High-performance hybrid mobile apps", href: "/services/react-native" },
      { title: "App Maintenance & Support", desc: "Ongoing updates, bug fixes & performance optimization", href: "/services/maintenance" },
      { title: "Cross-Platform Development", desc: "Build once, deploy everywhere", href: "/services/cross-platform" },
    ],
    rightPanel: {
      title: "WHY PANACEA",
      checkmarks: [
        "Client-Centric, Result-Driven Approach",
        "End-to-End IT & Digital Transformation Solutions",
        "Efficient Development with Speed & Quality",
        "Dedicated In-House Expert Team",
        "Proven Track Record Across 20+ Industries"
      ],
      buttonText: "Explore Services",
      buttonLink: "/services"
    }
  },
  {
    category: "Cloud & DevOps",
    desc: "Scalable cloud infrastructure and CI/CD automation",
    icon: <Image src="/cloud_devops.png" alt="Cloud" width={24} height={24} className="object-contain" />,
    items: [
      { title: "Cloud Strategy & Consulting", desc: "Expert guidance for cloud adoption and migration", href: "/services/cloud-consulting" },
      { title: "AWS Cloud Services", desc: "Scalable solutions built on Amazon Web Services", href: "/services/aws" },
      { title: "Devops & CI/CD", desc: "Automate delivery and deployment workflows", href: "/services/devops" },
      { title: "Cloud Migration", desc: "Seamless transition to cloud infrastructure", href: "/services/cloud-migration" },
      { title: "Cloud Managed Services", desc: "Comprehensive management of your cloud resources", href: "/services/cloud-managed" },
    ],
    rightPanel: {
      title: "CLOUD EXPERTISE",
      checkmarks: [
        "AWS Advanced Consulting Partner",
        "Azure Integration Experts",
        "Secure & Compliant Architectures",
        "24/7 Cloud Support & Monitoring"
      ],
      buttonText: "View Solutions",
      buttonLink: "/services"
    }
  },
  {
    category: "AI & Data Intelligence",
    desc: "AI-powered insights that transform raw data into real impact.",
    icon: <Image src="/ai_data_intelligence.png" alt="AI" width={24} height={24} className="object-contain" />,
    items: [
      { title: "AI Consulting & Strategy", desc: "Navigate the AI landscape securely", href: "/services/ai-consulting" },
      { title: "Machine Learning Solutions", desc: "Predictive models for business growth", href: "/services/ml" },
      { title: "Data Engineering", desc: "Robust data pipelines and architectures", href: "/services/data-engineering" },
      { title: "Generative AI Applications", desc: "Custom LLM development and integration", href: "/services/gen-ai" },
    ],
    rightPanel: {
      title: "DATA INTELLIGENCE",
      checkmarks: [
        "Predictive Analytics Excellence",
        "Custom LLM Integrations",
        "Data Privacy First Approach"
      ],
      buttonText: "Explore AI",
      buttonLink: "/services"
    }
  },
  {
    category: "Salesforce",
    desc: "Salesforce – where businesses grow smarter and faster.",
    icon: <Image src="/sales_force.png" alt="Salesforce" width={24} height={24} className="object-contain" />,
    items: [
      { title: "Salesforce Consulting", desc: "Strategic planning for CRM success", href: "/services/sf-consulting" },
      { title: "Implementation Services", desc: "End-to-end Salesforce rollout", href: "/services/sf-implementation" },
      { title: "Lightning Migration", desc: "Upgrade to the modern Lightning UI", href: "/services/sf-lightning" },
      { title: "Integration Services", desc: "Connect Salesforce with your ecosystem", href: "/services/sf-integration" },
    ],
    rightPanel: {
      title: "SALESFORCE EXPERTS",
      checkmarks: [
        "Certified Salesforce Developers",
        "Seamless Tool Integrations",
        "Custom Dashboards & Reports",
        "Ongoing Admin Support"
      ],
      buttonText: "Optimize CRM",
      buttonLink: "/services"
    }
  },
  {
    category: "Design & Experience",
    desc: "Design with purpose, experience with impact.",
    icon: <Image src="/design_experience.png" alt="Design" width={24} height={24} className="object-contain" />,
    items: [
      { title: "UI/UX Design & Research", desc: "Data-driven design strategies", href: "/services/ui-ux" },
      { title: "Wireframing & Prototyping", desc: "Visualizing concepts quickly", href: "/services/prototyping" },
      { title: "Usability Testing", desc: "Validating designs with real users", href: "/services/testing" },
      { title: "Brand Identity", desc: "Crafting memorable visual brands", href: "/services/branding" },
    ],
    rightPanel: {
      title: "CRAFTING EXPERIENCES",
      checkmarks: [
        "User-Centric Methodology",
        "Conversion-Optimized Designs",
        "Interactive Prototypes",
        "Accessibility Compliant (WCAG)"
      ],
      buttonText: "See Portfolio",
      buttonLink: "/portfolio"
    }
  },
  {
    category: "Digital Marketing Solutions",
    desc: "Turning clicks into customers with digital marketing solutions.",
    icon: <Image src="/digital-marketing-services.png" alt="Marketing" width={24} height={24} className="object-contain" />,
    items: [
      { title: "SEO Optimization", desc: "Rank higher on search engines", href: "/services/seo" },
      { title: "SEM / PPC Campaigns", desc: "Targeted ads for immediate ROI", href: "/services/ppc" },
      { title: "Social Media Marketing", desc: "Engage and grow your audience", href: "/services/smm" },
      { title: "Content Strategy", desc: "Compelling content that converts", href: "/services/content" },
    ],
    rightPanel: {
      title: "GROWTH MARKETING",
      checkmarks: [
        "Data-Driven Strategies",
        "Transparent Reporting",
        "High ROI Performance Campaigns",
        "Expert Creative Teams"
      ],
      buttonText: "Boost Growth",
      buttonLink: "/services"
    }
  }
];

const productsData = [
  {
    category: "Management Systems",
    desc: "Comprehensive admin and operations management tools.",
    icon: <Image src="/education.png" alt="Management" width={24} height={24} className="object-contain" />,
    items: [
      { title: "Child Care System", desc: "Streamline daycare operations", href: "/products/child-care" },
      { title: "School Management App", desc: "All-in-one educational platform", href: "/products/school" },
      { title: "OMR Customization", desc: "Automated grading solutions", href: "/products/omr" },
      { title: "Influencers App", desc: "Manage campaigns and creators", href: "/products/influencers" },
    ],
    rightPanel: {
      title: "OUR PRODUCTS",
      checkmarks: [
        "Scalable Architectures",
        "Easy Integration Capabilities",
        "Secure Data Handling",
        "Custom Tailored Deployments"
      ],
      buttonText: "View Products",
      buttonLink: "/products"
    }
  },
  {
    category: "On-Demand Apps",
    desc: "Transforming services into instant successes.",
    icon: <Image src="/ondemand.png" alt="On Demand" width={24} height={24} className="object-contain" />,
    items: [
      { title: "Car Wash App", desc: "Book auto cleaning instantly", href: "/products/car-wash" },
      { title: "Grocery Delivery", desc: "Hyperlocal commerce platforms", href: "/products/grocery" },
      { title: "Ticket Booking", desc: "Event and travel reservations", href: "/products/tickets" },
      { title: "Party Rentals", desc: "Manage inventory and bookings", href: "/products/party-rentals" },
    ],
    rightPanel: {
      title: "ON-DEMAND ECONOMY",
      checkmarks: [
        "Real-Time Tracking",
        "Secure Payment Gateways",
        "Admin Control Panels",
        "Multi-Platform Support"
      ],
      buttonText: "Start Building",
      buttonLink: "/contact"
    }
  }
];

const resourcesData = [
  {
    category: "Mobile App Developers",
    desc: "Mobile App Development - From concept to code, we create apps that connect...",
    icon: <Image src="/custom_software-dev.png" alt="Mobile" width={24} height={24} className="object-contain" />,
    items: [
      { title: "Mobile App Developers", desc: "Full-cycle iOS & Android app specialists", href: "/hire/mobile" },
      { title: "Native App Developers", desc: "Platform-specific apps for peak performance", href: "/hire/native" },
      { title: "Android App Developers", desc: "Kotlin & Java experts for the Play Store", href: "/hire/android" },
      { title: "Hybrid App Developers", desc: "Single codebase apps across iOS & Android", href: "/hire/hybrid" },
      { title: "iOS App Developers", desc: "Swift developers for iPhone & Apple ecosystem", href: "/hire/ios" },
      { title: "Flutter App Developers", desc: "Google's UI toolkit for beautiful cross-platform apps", href: "/hire/flutter" },
      { title: "iPad App Developers", desc: "Tablet-optimized apps for enterprise & education", href: "/hire/ipad" },
      { title: "React Native Developers", desc: "JavaScript-powered mobile apps with native feel", href: "/hire/react" },
      { title: "Custom Software Developers", desc: "Bespoke solutions tailored to your workflow", href: "/hire/custom" },
    ],
    rightPanel: {
      title: "HIRING MADE EASY",
      checkmarks: [
        "Pre-Vetted & Skilled IT Professionals",
        "Flexible Hiring Models (Hourly, Dedicated, Project-Based)",
        "Quick Onboarding & Seamless Integration",
        "Cost-Effective Resource Engagement",
        "Transparent Communication & Full Control"
      ],
      buttonText: "Start Hiring",
      buttonLink: "/contact"
    }
  },
  {
    category: "Web App Developers",
    desc: "Full-stack developers for scalable web applications.",
    icon: <Image src="/business_solution.png" alt="Web" width={24} height={24} className="object-contain" />,
    items: [
      { title: "Frontend Developers", desc: "React, Angular, Vue experts", href: "/hire/frontend" },
      { title: "Backend Developers", desc: "Node, Python, Java engineers", href: "/hire/backend" },
      { title: "Full Stack Developers", desc: "End-to-end web specialists", href: "/hire/fullstack" },
      { title: "CMS Developers", desc: "WordPress, Drupal, Shopify experts", href: "/hire/cms" },
    ],
    rightPanel: {
      title: "TOP WEB TALENT",
      checkmarks: [
        "Modern JS Framework Experts",
        "Secure Backend Architects",
        "Performance Orientated coders",
        "Agile Methodologies"
      ],
      buttonText: "Hire Web Devs",
      buttonLink: "/contact"
    }
  },
  {
    category: "Enterprise & Cloud Developers",
    desc: "AWS, DevOps and cloud infrastructure specialists.",
    icon: <Image src="/cloud_devops.png" alt="Enterprise" width={24} height={24} className="object-contain" />,
    items: [
      { title: "Cloud Architects", desc: "Design scalable cloud systems", href: "/hire/architects" },
      { title: "DevOps Engineers", desc: "CI/CD and automation specialists", href: "/hire/devops" },
      { title: "Database Administrators", desc: "Optimize data storage & retrieval", href: "/hire/dba" },
      { title: "Security Experts", desc: "Ensure compliance & data protection", href: "/hire/security" },
    ],
    rightPanel: {
      title: "SCALE YOUR INFRA",
      checkmarks: [
        "AWS, Azure, GCP Experts",
        "Zero Downtime Migrations",
        "High Availability Architectures"
      ],
      buttonText: "Transform Now",
      buttonLink: "/contact"
    }
  },
  {
    category: "Design & Creative Experts",
    desc: "UI/UX designers and creative professionals on demand.",
    icon: <Image src="/design_experience.png" alt="Design" width={24} height={24} className="object-contain" />,
    items: [
      { title: "UI/UX Designers", desc: "Craft beautiful user interfaces", href: "/hire/ui-ux" },
      { title: "Product Designers", desc: "End-to-end product visionaries", href: "/hire/product-designers" },
      { title: "Graphic Designers", desc: "Visual branding and assets", href: "/hire/graphics" },
      { title: "Animators & 3D Artists", desc: "Immersive interactive media", href: "/hire/3d" },
    ],
    rightPanel: {
      title: "CREATIVE MASTERY",
      checkmarks: [
        "Figma & Adobe CC Experts",
        "Design Thinking Workshops",
        "Rapid Prototyping",
        "Pixel-Perfect Delivery"
      ],
      buttonText: "Hire Creatives",
      buttonLink: "/contact"
    }
  }
];

/* ---------------- MEGA MENU COMPONENT ---------------- */

const MegaMenu = ({ data, type, closeMenu }: MegaMenuProps) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeItem = data[activeIdx];

  if (!activeItem) return null;

  return (
    <div
      className={`${styles.megaWrap} w-full max-h-[60vh] overflow-hidden hidden lg:flex flex-col`}
      data-type={type.toLowerCase()}
    >
      <span className={styles.megaAmbient} aria-hidden />

      <div className={`${styles.megaInner} w-full h-full flex overflow-hidden`}>
        {/* Left Column (Categories) */}
        <div className={`${styles.megaSidebar} ${styles.megaScrollbar}`}>
          <h4 className={styles.megaGroupLabel}>Explore • {type}</h4>
          {data.map((item: any, idx: number) => (
            <div
              key={idx}
              onMouseEnter={() => setActiveIdx(idx)}
              className={`${styles.megaItem} group ${activeIdx === idx ? styles.megaItemActive : ""}`}
            >
              <div className={styles.megaIcon}>
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h6 className={styles.megaCategoryTitle}>{item.category}</h6>
                <p className={styles.megaCategoryDesc}>{item.desc}</p>
              </div>
              <ChevronDown size={14} className={`${styles.megaArrow} -rotate-90`} aria-hidden />
            </div>
          ))}
        </div>

        {/* Middle Column (Content Grid) */}
        <div className={`${styles.megaContent} ${styles.megaScrollbar}`}>
          <p className={styles.megaContentLabel}>Solutions</p>
          <h4 className={styles.megaContentTitle}>{activeItem.category}</h4>
          <div className={`grid ${activeItem.items.length > 5 ? "grid-cols-2" : "grid-cols-1"} gap-x-8 gap-y-1`}>
            {activeItem.items.map((link: any, lIdx: number) => (
              <Link key={lIdx} href={link.href} onClick={closeMenu} className={styles.megaLink}>
                <span className={styles.megaLinkTitle}>
                  {link.title}
                  <ArrowRight size={12} className={styles.megaLinkArrow} aria-hidden />
                </span>
                <span className={styles.megaLinkDesc}>{link.desc}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Column (Highlights) */}
        <div className={styles.megaPanel}>
          <span className={styles.megaPanelGlow} aria-hidden />
          <div>
            <h4 className={styles.megaPanelTitle}>{activeItem.rightPanel.title}</h4>
            <div className={styles.megaPanelList}>
              {activeItem.rightPanel.checkmarks.map((point: string, pIdx: number) => (
                <div key={pIdx} className={styles.megaPanelPoint}>
                  <span className={styles.megaPanelCheck}>
                    <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className={styles.megaPanelText}>{point}</span>
                </div>
              ))}
            </div>
          </div>

          <Link href={activeItem.rightPanel.buttonLink} onClick={closeMenu} className={styles.megaPanelBtn}>
            {activeItem.rightPanel.buttonText}
          </Link>
        </div>
      </div>
    </div>
  )
}

/* ---------------- MAIN NAVBAR ---------------- */

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [finePointer, setFinePointer] = useState(false);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const { isOpen: quoteOpen, openQuote } = useQuoteLead();

  useEffect(() => {
    if (quoteOpen) return;
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
  }, [isMobileMenuOpen, quoteOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const sync = () => setFinePointer(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getDropdownData = () => {
    if (activeDropdown === "home") return homeData;
    if (activeDropdown === "services") return servicesData;
    if (activeDropdown === "products") return productsData;
    if (activeDropdown === "resources") return resourcesData;
    return [];
  };

  const getDropdownType = () => {
    if (activeDropdown === "home") return "Home";
    if (activeDropdown === "services") return "Services";
    if (activeDropdown === "products") return "Products";
    if (activeDropdown === "resources") return "Resources";
    return "";
  };

  const onNavPointerMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduceMotion || !finePointer) return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--nav-mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--nav-my", `${e.clientY - r.top}px`);
  };

  const openDropdown = (id: string) => setActiveDropdown(id);

  const handleHomeClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);

    if (pathname !== "/") return;

    event.preventDefault();
    if (window.location.hash) {
      window.history.replaceState(null, "", `/${window.location.search}`);
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const desktopNavItems: Array<{
    id: string;
    label: string;
    href: string;
    hasDropdown: boolean;
    isActive: (p: string) => boolean;
  }> = [
    { id: "home", label: "Home", href: "/", hasDropdown: true, isActive: (p) => p === "/" },
    { id: "services", label: "Services", href: "/services", hasDropdown: true, isActive: (p) => p.startsWith("/services") },
    { id: "products", label: "Products", href: "/products", hasDropdown: true, isActive: (p) => p.startsWith("/products") },
    { id: "resources", label: "Resources", href: "/resources", hasDropdown: true, isActive: (p) => p.startsWith("/resources") },
    { id: "portfolio", label: "Portfolio", href: "/portfolio", hasDropdown: false, isActive: (p) => p.startsWith("/portfolio") },
    { id: "careers", label: "Careers", href: "/careers", hasDropdown: false, isActive: (p) => p.startsWith("/careers") },
  ];

  const contactActive = pathname.startsWith("/contact");

  return (
    <header
      data-scrolled={scrolled}
      className={`${styles.headerRoot} ${pathname === "/" ? styles.overHero : ""} fixed top-0 left-0 w-full z-[100]`}
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <div className={`${styles.topBar} hidden lg:block`}>
        <div className={styles.topBarInner}>
          <div className={styles.topBarLeft}>
            <a
              href="mailto:contact@panaceaitservices.com"
              onClick={trackEmailClick}
              className={styles.contactLink}
            >
              <FaEnvelope size={10} />
              contact@panaceaitservices.com
            </a>
            <span className={styles.topSep} aria-hidden />
            <a
              href="tel:+919347959536"
              onClick={trackPhoneClick}
              className={styles.contactLink}
            >
              <FaPhoneVolume size={10} />
              +91 9347959536
            </a>
          </div>
          <div className={styles.topBarRight}>
            <span className={styles.contactLink}>
              <ImLocation2 size={10} />
              Hyderabad
            </span>
            <span className={styles.topSep} aria-hidden />
            <span className={styles.metaText}>USA</span>
            <span className={`${styles.topSep} hidden xl:block`} aria-hidden />
            <span className={`${styles.statusText} hidden xl:inline-flex`}>
              <span className={styles.statusDot} aria-hidden />
              Available for new projects
            </span>
          </div>
        </div>
      </div>

      <nav
        onMouseMove={onNavPointerMove}
        className={`${styles.navShell} ${styles.navGlass} ${scrolled ? styles.navScrolled : ""}`}
      >
        <div className={styles.navCursorGlow} aria-hidden />
        <div className={styles.scrollLight} aria-hidden />

        <div className={styles.navInner}>
          <Link
            href="/"
            scroll
            className={styles.logoLink}
            onMouseEnter={() => setActiveDropdown(null)}
            onClick={handleHomeClick}
          >
            <span className={styles.logoMark}>
              <Image src="/logo.png" alt="Panacea" width={22} height={22} className="object-contain" />
            </span>
            <span className={`${styles.logoText} ${suez.className}`}>Panacea</span>
          </Link>

          <div className={styles.navCluster}>
            {desktopNavItems.map((item) => {
              const routeActive = item.isActive(pathname);
              const dropdownOpen = item.hasDropdown && activeDropdown === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  scroll
                  onMouseEnter={() => (item.hasDropdown ? openDropdown(item.id) : setActiveDropdown(null))}
                  onFocus={() => (item.hasDropdown ? openDropdown(item.id) : setActiveDropdown(null))}
                  onClick={item.id === "home" ? handleHomeClick : undefined}
                  data-nav={item.id}
                  className={`${styles.navLink} ${routeActive ? styles.navLinkActive : ""} ${dropdownOpen ? styles.navLinkOpen : ""}`}
                  aria-current={routeActive ? "page" : undefined}
                  aria-expanded={item.hasDropdown ? dropdownOpen : undefined}
                  aria-haspopup={item.hasDropdown ? "true" : undefined}
                >
                  {item.label}
                  {item.hasDropdown && (
                    <ChevronDown
                      size={12}
                      className={styles.chevron}
                      aria-hidden
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className={styles.navActions}>
            <span className={styles.mobileHiring}>
              <HiringTag hidden={isMobileMenuOpen} />
            </span>

            <Link
              href="/contact"
              data-nav="contact"
              className={`${styles.navContact} ${contactActive ? styles.navContactActive : ""}`}
              onMouseEnter={() => setActiveDropdown(null)}
              aria-current={contactActive ? "page" : undefined}
            >
              Contact Us
              <ArrowRight className={styles.navContactArrow} aria-hidden />
            </Link>

            <button
              type="button"
              onClick={() => openQuote("manual")}
              className={styles.quoteCta}
              onMouseEnter={() => setActiveDropdown(null)}
            >
              <span className={styles.quoteLabel}>Request Quote</span>
              <ArrowRight className={styles.quoteArrow} aria-hidden />
            </button>

            <span className={styles.desktopHiring}>
              <HiringTag />
            </span>

            <button
              type="button"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-menu"
              className={styles.menuToggle}
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {activeDropdown && (
            <motion.div
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10, scale: 0.988 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.992 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-full left-0 w-full z-20 origin-top"
            >
              <MegaMenu
                data={getDropdownData()}
                type={getDropdownType()}
                closeMenu={() => setActiveDropdown(null)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-nav-menu"
              role="dialog"
              aria-label="Mobile navigation"
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className={`${styles.mobileMenu} lg:hidden`}
            >
              <div className={styles.mobileMenuInner}>
                {[
                  { href: "/", label: "Home", active: pathname === "/" },
                  { href: "/services", label: "Services", active: pathname.startsWith("/services"), expandId: "services", dataset: servicesData },
                  { href: "/products", label: "Products", active: pathname.startsWith("/products"), expandId: "products", dataset: productsData },
                  { href: "/resources", label: "Resources", active: pathname.startsWith("/resources"), expandId: "resources", dataset: resourcesData },
                  { href: "/portfolio", label: "Portfolio", active: pathname.startsWith("/portfolio") },
                  { href: "/careers", label: "Careers", active: pathname.startsWith("/careers") },
                  { href: "/contact", label: "Contact Us", active: pathname.startsWith("/contact") },
                ].map((item) => (
                  <div key={item.href}>
                    {"expandId" in item && item.expandId ? (
                      <div>
                        <div className={`${styles.mobileNavItem} ${item.active ? styles.mobileNavItemActive : ""}`}>
                          <Link
                            href={item.href}
                            className="flex-1 min-h-[44px] flex items-center"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.label}
                          </Link>
                          <button
                            type="button"
                            aria-label={`Expand ${item.label} submenu`}
                            aria-expanded={mobileExpanded === item.expandId}
                            className={`${styles.mobileExpandBtn} ${
                              mobileExpanded === item.expandId ? styles.mobileExpandBtnOpen : ""
                            }`}
                            onClick={() =>
                              setMobileExpanded(mobileExpanded === item.expandId ? null : item.expandId!)
                            }
                          >
                            <ChevronDown size={18} />
                          </button>
                        </div>
                        <AnimatePresence>
                          {mobileExpanded === item.expandId && (
                            <motion.div
                              initial={reduceMotion ? false : { opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <div className={styles.mobileSubmenu}>
                                {item.dataset!.map((s, sIdx) => (
                                  <div key={sIdx} className={styles.mobileSubGroup}>
                                    <p className={styles.mobileSubLabel}>{s.category}</p>
                                    <div className="flex flex-col">
                                      {s.items.map((link: any, lIdx: number) => (
                                        <Link
                                          key={lIdx}
                                          href={link.href}
                                          onClick={() => setMobileMenuOpen(false)}
                                          className={styles.mobileSubLink}
                                        >
                                          {link.title}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        scroll
                        onClick={item.href === "/" ? handleHomeClick : () => setMobileMenuOpen(false)}
                        className={`${styles.mobileNavItem} ${item.active ? styles.mobileNavItemActive : ""}`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openQuote("manual");
                  }}
                  className={`${styles.quoteCta} ${styles.mobileQuote}`}
                >
                  <span className={styles.quoteLabel}>Request Quote</span>
                  <ArrowRight className={styles.quoteArrow} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}