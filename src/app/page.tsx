import { readContent } from "@/lib/content";
import Navbar from "@/components/sections/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import WorkSection from "@/components/sections/WorkSection";
import WhySection from "@/components/sections/WhySection";
import PixelGameSection from "@/components/sections/PixelGameSection";
import ContactSection from "@/components/sections/ContactSection";
import FooterSection from "@/components/sections/FooterSection";

export default function Home() {
  const content = readContent();

  return (
    <main className="min-h-screen bg-[#050508] overflow-x-hidden">
      <Navbar />
      <HeroSection content={content.hero} />
      <ServicesSection content={content.services} />
      <WorkSection />
      <WhySection content={content.why} />
      <PixelGameSection />
      <ContactSection content={content.contact} />
      <FooterSection />
    </main>
  );
}
