import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../(overview)/globals.css";
import { ConvexClientProvider } from "../ConvexClientProvider";
import { CheckoutHeader } from "../components/Header";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CheckoutHeader />

        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
