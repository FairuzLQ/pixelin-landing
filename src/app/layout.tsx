import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pixelin — We Build Websites That Work",
  description: "Pixelin adalah agensi web yang membangun website profesional, cepat, dan efektif untuk bisnis Anda. Landing page, company profile, e-commerce — kami kerjakan.",
  keywords: ["website agency", "jasa website", "landing page", "web development", "pixelin"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
