"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";

// Mock Data for Premium Partner Brands
// 'accent' uses exact brand hex codes for the sharp, brutalist hover lines
const BRAND_PARTNERS = [
  { id: "01", name: "NVIDIA", tagline: "The Ultimate Play", logo: "/brand-nvidia.webp", accent: "#76b900" },
  { id: "02", name: "AMD", tagline: "Together We Advance", logo: "/brand-amd.webp", accent: "#ed1c24" },
  { id: "03", name: "ASUS ROG", tagline: "For Those Who Dare", logo: "/brand-asus.webp", accent: "#ff0029" },
  { id: "04", name: "Corsair", tagline: "Never Compromise", logo: "/brand-corsair.webp", accent: "#ffcb05" },
  { id: "05", name: "MSI", tagline: "True Gaming", logo: "/brand-msi.webp", accent: "#e21b22" },
  { id: "06", name: "Razer", tagline: "For Gamers. By Gamers.", logo: "/brand-razer.svg", accent: "#44d62c" },
  { id: "07", name: "Intel", tagline: "Do Something Wonderful", logo: "/brand-intel.svg", accent: "#0068b5" },
  { id: "08", name: "NZXT", tagline: "Build the Extraordinary", logo: "/brand-nzxt.svg", accent: "#7962cc" },
];

// --- Individual Brand Card Component ---
function BrandCard({ brand }: { brand: typeof BRAND_PARTNERS[0] }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const { contextSafe } = useGSAP({ scope: cardRef });

  const handleMouseEnter = contextSafe(() => {
    // Sweep down the accent line
    gsap.to(".brand-accent", { height: "100%", duration: 0.4, ease: "power3.out" });
    // Snap logo to full color and scale up
    gsap.to(".brand-logo", { filter: "grayscale(0%)", opacity: 1, scale: 1.1, duration: 0.5, ease: "power4.out" });
    // Slide in the arrow
    gsap.to(".brand-arrow", { x: 0, y: 0, opacity: 1, duration: 0.3, ease: "power2.out" });
    // Slightly push the text content right
    gsap.to(".brand-text", { x: 8, duration: 0.4, ease: "power3.out" });
  });

  const handleMouseLeave = contextSafe(() => {
    gsap.to(".brand-accent", { height: "0%", duration: 0.4, ease: "power3.inOut" });
    gsap.to(".brand-logo", { filter: "grayscale(100%)", opacity: 0.4, scale: 1, duration: 0.5, ease: "power3.out" });
    gsap.to(".brand-arrow", { x: -10, y: 10, opacity: 0, duration: 0.3 });
    gsap.to(".brand-text", { x: 0, duration: 0.4, ease: "power3.out" });
  });

  return (
    <Link 
      href={`/products?brand=${brand.name.toLowerCase()}`}
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col justify-between bg-background p-8 md:p-12 transition-colors overflow-hidden h-[300px] md:h-[400px] lg:h-[450px] cursor-pointer"
    >
      {/* Brutalist Accent Line (Hidden by default, sweeps down on hover) */}
      <div 
        className="brand-accent absolute top-0 left-0 w-1 h-0 z-20"
        style={{ backgroundColor: brand.accent }}
      />

      {/* Top Header: ID & Arrow */}
      <div className="flex justify-between items-start w-full z-10 relative">
        <span className="text-[10px] md:text-xs font-mono tracking-[0.2em] text-gray-600 uppercase">
          [MFR_{brand.id}]
        </span>
        <div className="brand-arrow opacity-0 -translate-x-2 translate-y-2 text-white">
          <ArrowUpRight size={24} strokeWidth={1.5} />
        </div>
      </div>

      {/* Center: Brand Logo */}
      <div className="relative w-full h-24 md:h-32 flex items-center justify-center z-10 my-auto">
        <Image 
          src={brand.logo} 
          alt={`${brand.name} Logo`} 
          fill 
          className="brand-logo object-contain grayscale opacity-40 transition-none" 
        />
      </div>

      {/* Bottom: Text Content */}
      <div className="brand-text flex flex-col z-10 relative mt-auto">
        <h3 className="text-white font-bold text-xl md:text-2xl tracking-tight uppercase mb-2">
          {brand.name}
        </h3>
        <p className="text-xs text-gray-500 font-mono tracking-widest uppercase">
          {brand.tagline}
        </p>
      </div>

      {/* Subtle background noise overlay for texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("/noise.png")' }} />
    </Link>
  );
}


// --- Main Page Layout ---
export default function BrandsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header reveal
    gsap.fromTo(
      ".header-anim",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power4.out" }
    );

    // Staggered grid reveal
    gsap.fromTo(
      ".stagger-card",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.2 }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full bg-background min-h-screen pt-32 pb-24 text-foreground border-t border-white/10">
      <div className="max-w-[100rem] mx-auto px-6 md:px-12">
        
        {/* Massive Editorial Header */}
        <div className="mb-20 md:mb-32 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="flex flex-col select-none">
            <span className="header-anim text-xs font-mono tracking-[0.3em] uppercase text-gray-500 mb-6 block">
              Global Supply Chain
            </span>
            <div className="overflow-hidden py-1">
              <h1 className="header-anim text-[12vw] md:text-[8vw] font-bold uppercase tracking-tighter leading-[0.85] text-white">
                TIER 1
              </h1>
            </div>
            <div className="overflow-hidden py-1">
              <h1 className="header-anim text-[12vw] md:text-[8vw] font-bold uppercase tracking-tighter leading-[0.85] text-transparent stroke-text" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)" }}>
                PARTNERS.
              </h1>
            </div>
          </div>

          <p className="header-anim text-sm md:text-base text-gray-400 font-light leading-relaxed max-w-sm md:pb-4">
            We only engineer with absolute precision. Explore our curated network of global hardware manufacturers powering the world's most dominant systems.
          </p>
        </div>

        {/* Seamless Hairline Grid Architecture 
            gap-px + bg-white/10 creates strict 1px borders between all cells
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border-y border-white/10">
          {BRAND_PARTNERS.map((brand) => (
            <div key={brand.id} className="stagger-card bg-background">
              <BrandCard brand={brand} />
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}