import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import BrandSlider from "@/components/Brands";
import OurStory from "@/components/OurStory";

const About = dynamic(() => import("@/components/About"), {
  loading: () => <SectionSkeleton />,
});
const SoftwareServicesBento = dynamic(() => import("@/components/SoftwareServicesBento"), {
  loading: () => <SectionSkeleton light />,
});
const Services = dynamic(() => import("@/components/Services"), {
  loading: () => <SectionSkeleton light />,
});
const Products = dynamic(() => import("@/components/Products"), {
  loading: () => <SectionSkeleton />,
});
const Process = dynamic(() => import("@/components/Process"), {
  loading: () => <SectionSkeleton />,
});
const Awards = dynamic(() => import("@/components/Awards"), {
  loading: () => <SectionSkeleton />,
});
const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  loading: () => <SectionSkeleton light />,
});
const Technology = dynamic(() => import("@/components/Technologies"), {
  loading: () => <SectionSkeleton />,
});
const Offering = dynamic(() => import("@/components/Offering"), {
  loading: () => <SectionSkeleton />,
});
const TrustedBySection = dynamic(() => import("@/components/TrustedBySection"), {
  loading: () => <SectionSkeleton light />,
});
const ClientTestimonials = dynamic(() => import("@/components/ClientTestimonials"), {
  loading: () => <SectionSkeleton />,
});
const Team = dynamic(() => import("@/components/Team"), {
  loading: () => <SectionSkeleton />,
});
const Contact = dynamic(() => import("@/components/Contact"), {
  loading: () => <SectionSkeleton light />,
});

function SectionSkeleton({ light = false }: { light?: boolean }) {
  return (
    <div
      className={`w-full min-h-[40vh] animate-pulse ${light ? "bg-slate-100" : "bg-[#07133a]/80"}`}
      aria-hidden
    />
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <BrandSlider />
      <OurStory />
      <About />
      <SoftwareServicesBento />
      <Services />
      <Products />
      <Process />
      <Awards />
      <Testimonials />
      <Technology />
      <Offering />
      <TrustedBySection
        theme="blue"
        imageSrc="/whyBusinessTrustUs.png"
        imageAlt="Panacea IT Services team collaborating in a modern office, building secure and scalable software"
        badgeScale={1.12}
        badgeVariant="glow"
        hiringHref="/careers"
        primaryCtaHref="/contact"
        secondaryCtaHref="/portfolio"
      />
      <ClientTestimonials />
      <Team />
      <Contact />
    </>
  );
}
