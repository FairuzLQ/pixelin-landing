import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Pixelin",
  description: "Agensi web Indonesia yang membangun website profesional, cepat, dan efektif untuk bisnis Anda.",
  url: "https://pixelin.id",
  logo: "https://pixelin.id/favicon.svg",
  areaServed: "ID",
  serviceType: ["Landing Page", "Company Profile", "E-Commerce", "Custom Web App"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: "Indonesian",
  },
};

export const metadata: Metadata = {
  metadataBase: new URL("https://pixelin.id"),
  title: "Pixelin — Jasa Pembuatan Website Indonesia",
  description: "Pixelin adalah agensi web Indonesia yang membangun website profesional, cepat, dan tepat sasaran. Landing page, company profile, e-commerce — selesai dalam 1–2 minggu.",
  keywords: [
    "jasa website indonesia", "jasa pembuatan website", "web agency indonesia",
    "landing page murah", "company profile website", "jasa web developer",
    "pixelin", "website bisnis indonesia",
  ],
  authors: [{ name: "Pixelin" }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://pixelin.id",
    siteName: "Pixelin",
    title: "Pixelin — Jasa Pembuatan Website Indonesia",
    description: "Website profesional untuk bisnis Anda. Landing page, company profile, e-commerce — selesai 1–2 minggu, harga transparan.",
  },
  twitter: {
    card: "summary",
    title: "Pixelin — Jasa Pembuatan Website Indonesia",
    description: "Website profesional untuk bisnis Anda. Landing page, company profile, e-commerce — selesai 1–2 minggu.",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
