"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";

// Mock Data for Premium Partner Brands
// 'hoverColor' defines the custom GSAP drop-shadow glow for each brand
const BRAND_PARTNERS = [
  { id: "b1", name: "NVIDIA", tagline: "The Ultimate Play", logo: "/brand-nvidia.webp", hoverColor: "rgba(118, 185, 0, 0.4)" },
  { id: "b2", name: "AMD", tagline: "Together We Advance", logo: "/brand-amd.webp", hoverColor: "rgba(237, 28, 36, 0.4)" },
  { id: "b3", name: "ASUS ROG", tagline: "For Those Who Dare", logo: "/brand-asus.webp", hoverColor: "rgba(255, 0, 41, 0.4)" },
  { id: "b4", name: "Corsair", tagline: "Never Compromise", logo: "/brand-corsair.webp", hoverColor: "rgba(255, 203, 5, 0.4)" },
  { id: "b5", name: "MSI", tagline: "True Gaming", logo: "/brand-msi.webp", hoverColor: "rgba(226, 27, 34, 0.4)" },
  { id: "b6", name: "Razer", tagline: "For Gamers. By Gamers.", logo: "/brand-razer.svg", hoverColor: "rgba(68, 214, 44, 0.4)" },
  { id: "b7", name: "Intel", tagline: "Do Something Wonderful", logo: "/brand-intel.svg", hoverColor: "rgba(0, 104, 181, 0.4)" },
  { id: "b8", name: "NZXT", tagline: "Build the Extraordinary", logo: "/brand-nzxt.svg", hoverColor: "rgba(121, 98, 204, 0.4)" },
];

// --- Individual Brand Card Component ---
// Handled separately so each card can have its own independent GSAP hover ref
function BrandCard({ brand }: { brand: typeof BRAND_PARTNERS[0] }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const { contextSafe } = useGSAP({ scope: cardRef });

  const handleMouseEnter = contextSafe(() => {
    gsap.to(cardRef.current, {
      scale: 1.05,
      y: -8,
      boxShadow: `0 20px 40px -10px ${brand.hoverColor}`,
      borderColor: "rgba(255, 255, 255, 0.15)",
      duration: 0.4,
      ease: "power3.out",
    });
  });

  const handleMouseLeave = contextSafe(() => {
    gsap.to(cardRef.current, {
      scale: 1,
      y: 0,
      boxShadow: "0 0px 0px 0px rgba(0, 0, 0, 0)",
      borderColor: "rgba(255, 255, 255, 0.05)",
      duration: 0.4,
      ease: "power3.out",
    });
  });

  return (
    <Link 
      href={`/products?brand=${brand.name.toLowerCase()}`}
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col items-center justify-center bg-[#0b0b12] border border-white/5 rounded-xl md:rounded-2xl p-4 md:p-8 backdrop-blur-md transition-colors overflow-hidden h-40 md:h-64"
    >
      {/* Decorative ambient background blur inside the card */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at center, ${brand.hoverColor} 0%, transparent 70%)`, opacity: 0.1 }}
      />

      {/* Brand Logo Container */}
      <div className="relative w-20 h-12 md:w-32 md:h-20 mb-3 md:mb-6 flex items-center justify-center shrink-0">
        <Image 
          src={brand.logo} 
          alt={`${brand.name} Logo`} 
          fill 
          className="object-contain drop-shadow-xl opacity-80 group-hover:opacity-100 transition-opacity" 
        />
      </div>

      <h3 className="text-white font-bold text-sm md:text-lg tracking-wide mb-0.5 md:mb-1 z-10 text-center leading-tight">
        {brand.name}
      </h3>
      <p className="text-[9px] md:text-xs text-slate-400 font-medium tracking-wider uppercase z-10 text-center px-1 line-clamp-2 md:line-clamp-none leading-tight">
        {brand.tagline}
      </p>
      
      {/* Small floating indicator to show it's a link */}
      <div className="absolute top-2 right-2 md:top-4 md:right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-white/50 scale-75 md:scale-100 origin-top-right">
        <ArrowUpRight size={20} />
      </div>
    </Link>
  );
}


// --- Main Page Layout ---
export default function BrandsPage() {
  const gridRef = useRef<HTMLDivElement>(null);

  // Staggered entrance animation for brand cards on load
  useGSAP(() => {
    gsap.fromTo(
      ".brand-card-stagger",
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "back.out(1.2)" }
    );
  }, { scope: gridRef });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 pt-16 md:pt-24 pb-8 md:pb-12 relative">
      
      {/* Ambient background glows for the whole page */}
      <div className="absolute top-0 left-[20%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-600/5 rounded-full blur-[100px] md:blur-[150px] pointer-events-none -z-10" />
      
      {/* Page Header */}
      <div className="mb-8 md:mb-16 text-center max-w-2xl mx-auto px-2 md:px-0">
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-2 md:mb-4">
          Elite Partners
        </h1>
        <p className="text-sm md:text-lg text-slate-400 leading-relaxed">
          We only build with the best. Explore our curated selection of tier-one hardware manufacturers powering the world's most advanced systems.
        </p>
      </div>

      {/* Grid Container */}
      <div 
        ref={gridRef} 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6"
      >
        {BRAND_PARTNERS.map((brand) => (
          <div key={brand.id} className="brand-card-stagger opacity-0">
            <BrandCard brand={brand} />
          </div>
        ))}
      </div>
      
    </div>
  );
}