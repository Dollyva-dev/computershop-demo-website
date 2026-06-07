import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import AboutSection from "@/components/sections/AboutSection";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden w-full flex flex-col items-center">
      {/* Visual background ambient glows */}
      <div className="absolute top-[-10%] left-[-20%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-20%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none" />

      <HeroSection />
      <FeaturesSection />
      <AboutSection />
    </div>
  );
}