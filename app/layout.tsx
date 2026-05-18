import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { HeaderLayout } from "@/src/components/header";
import { QueryProvider } from "@/src/lib/query";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShopSphere - Your Ultimate E-Commerce Destination",
  description: "Shop the latest electronics, accessories, and more at ShopSphere. Free shipping on orders over $50.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <HeaderLayout />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
