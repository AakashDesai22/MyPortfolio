import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MagneticCursor from "@/components/MagneticCursor";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Akki | Creative Front-end Developer",
  description: "Building scalable full-stack solutions with a focus on UX",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-grid-pattern relative min-h-screen text-foreground`}>
        <SmoothScroll>
          <MagneticCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
