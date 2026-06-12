import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import AboutSection from "@/components/sections/AboutSection";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Ambient glows removed. Sections will inherit the main background color */}
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
    </div>
  );
}