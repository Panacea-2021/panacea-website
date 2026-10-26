import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Admin | Panacea",
  description: "Panacea website administration",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-[110] min-h-screen bg-[#f7f7f7] pt-[100px] lg:pt-[108px]">
      <Suspense fallback={<div className="p-8 text-sm text-slate-500">Loading…</div>}>
        {children}
      </Suspense>
    </div>
  );
}
