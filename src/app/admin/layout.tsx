import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../(overview)/globals.css";
import { ConvexClientProvider } from "../ConvexClientProvider";
import AdminSidebar from "../components/ui/admin/sidebar";

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
    template: "%s | LMCollection",
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
        <div className="flex min-h-screen">
          <aside className="w-full flex-[0_0_280px]">
            <AdminSidebar />
          </aside>
          <main className="flex-1 min-h-screen">
            <ConvexClientProvider>{children}</ConvexClientProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
