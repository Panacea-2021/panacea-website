import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/components/TrustedBySection.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CursorGradient from "@/components/CursorGradient"; // Make sure to create this file!
import GoogleAnalytics from "@/components/GoogleAnalytics";
import HomeScrollReset from "@/components/HomeScrollReset";
import QuoteLeadProvider from "@/components/QuoteLeadProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.panaceaitservices.com"),
  title: {
    default: "Panacea IT Services | Software Development & Digital Solutions",
    template: "%s | Panacea IT Services",
  },
  description:
    "ISO-certified IT company in Hyderabad & USA. Custom software, mobile apps, web, SaaS, cloud, and digital marketing services.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Panacea IT Services",
    title: "Panacea IT Services | Software Development & Digital Solutions",
    description:
      "ISO-certified IT company delivering web, mobile, SaaS, and cloud solutions from Hyderabad and the USA.",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Panacea IT Services" }],
  },
  twitter: {
    card: "summary",
    title: "Panacea IT Services",
    description:
      "Custom software, mobile apps, web, SaaS, and digital growth services.",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=location.pathname;if(p!=="/"&&p!=="")return;if("scrollRestoration" in history)history.scrollRestoration="manual";if(location.hash)history.replaceState(null,"",p+location.search);window.scrollTo(0,0);if(document.documentElement)document.documentElement.scrollTop=0;}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#07133a] relative`}
      >
        <GoogleAnalytics />
        <HomeScrollReset />
        {/* The global cursor effect */}
        <CursorGradient />
        
        <QuoteLeadProvider>
          <Navbar />
          {children}
          <Footer />
        </QuoteLeadProvider>
      </body>
    </html>
  );
}