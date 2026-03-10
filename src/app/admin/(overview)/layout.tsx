import AdminSidebar from "@/components/ui/admin/sidebar-client";
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import "@/(overview)/globals.css";
import AuthProvider from "@/providers/SessionProvider";
import { ConvexClientProvider } from "@/ConvexClientProvider";

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
    template: "Admin (%s) | LMCollection",
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <AuthProvider>
          <ConvexClientProvider>
            <AdminSidebar>{children}</AdminSidebar>
          </ConvexClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
