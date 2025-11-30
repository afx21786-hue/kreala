import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import IntroSection from "@/components/sections/IntroSection";
import WhatWeDoSection from "@/components/sections/WhatWeDoSection";
import ProgramsSection from "@/components/sections/ProgramsSection";
import ImpactSection from "@/components/sections/ImpactSection";
import EventsSection from "@/components/sections/EventsSection";
import PartnersSection from "@/components/sections/PartnersSection";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <IntroSection />
        <WhatWeDoSection />
        <ProgramsSection />
        <ImpactSection />
        <EventsSection />
        <PartnersSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
