import type { Metadata } from "next";
import AdminBlogsClient from "@/components/admin/AdminBlogsClient";

export const metadata: Metadata = {
  title: "Blog Admin | Panacea",
  description: "Manage Panacea website blogs",
  robots: { index: false, follow: false },
};

export default function AdminBlogsPage() {
  return <AdminBlogsClient />;
}
