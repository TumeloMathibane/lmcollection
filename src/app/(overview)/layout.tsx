import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/globals.css";
import { ConvexClientProvider } from "../ConvexClientProvider";

import Header from "../components/header";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

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
    default: "Home | LMCollection",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <ConvexClientProvider>
          <Header />
          <Navbar />
          {children}
          <Footer />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
