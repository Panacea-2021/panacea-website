import type { Metadata } from "next";
import AdminLoginPage from "./AdminLoginClient";

export const metadata: Metadata = {
  title: "Admin Login | Panacea",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AdminLoginPage />;
}
