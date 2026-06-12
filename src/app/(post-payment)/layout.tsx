import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/globals.css";
import Header from "../components/header";
import Construction from "@/components/ui/under-construction";
import { ConvexClientProvider } from "@/ConvexClientProvider";
import ComingSoon from "@/components/coming-soon";

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
    default: "Payment | LMCollection",
  },
  description: "Pay for your items bought from our store; LMCollection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <ComingSoon />

        <ConvexClientProvider>
          <Construction />
          <Header />
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
