import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../(overview)/globals.css";
import { ConvexClientProvider } from "../ConvexClientProvider";
import AdminSidebar from "@/components/ui/admin/sidebar-client";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "Admin(%s) | LMCollection",
    default: "Admin | LMCollection",
  },
  description: "LMCollection - Like it, Love it, & Wear it.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ConvexClientProvider>
          <AdminSidebar>{children}</AdminSidebar>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
