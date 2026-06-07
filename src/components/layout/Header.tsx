"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger to avoid warnings
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);

  // GSAP Animation for the scroll effect
  useGSAP(() => {
    gsap.to(headerRef.current, {
      scrollTrigger: {
        trigger: document.body,
        start: "top -50", // Triggers after scrolling 50px
        end: "top -100",
        toggleActions: "play none none reverse", // Plays forward on scroll down, reverses on scroll up
      },
      backgroundColor: "rgba(10, 10, 15, 0.75)",
      backdropFilter: "blur(16px)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
      boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
      duration: 0.4,
      ease: "power2.out",
    });
  }, { scope: headerRef });

  return (
    <header 
      ref={headerRef} 
      className="fixed top-0 left-0 w-full z-50 bg-transparent border-b border-transparent transition-all"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 overflow-hidden">
            {/* Replace src with your actual logo path in the public folder */}
            <Image 
              src="/finalLogo.png" 
              alt="Dollyva Logo" 
              fill 
              className="object-contain transition-transform group-hover:scale-110" 
            />
          </div>
          <span className="font-bold text-xl tracking-wide text-white">
            Dollyva <span className="font-light text-slate-400">computers</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/products" className="nav-products">Products</Link>
          <Link href="/accessories" className="nav-accessories">Accessories</Link>
          <Link href="/brands" className="nav-brands">Brands</Link>
          <Link href="/laptops" className="nav-laptops">Laptops</Link>
          
          {/* Build My PC - Highlighted Button */}
          <Link 
            href="/build" 
            className="nav-build relative px-5 py-2 text-white bg-blue-600/10 border border-blue-500/30 rounded-full transition-all duration-300"
          >
            Build My PC
          </Link>
        </nav>

        {/* Utility Icons */}
        <div className="flex items-center gap-6">
          <button className="text-slate-300 hover:text-white transition-colors" aria-label="Search">
            <Search size={20} />
          </button>
          
          <Link href="/cart" className="relative text-slate-300 hover:text-white transition-colors">
            <ShoppingCart size={20} />
            {/* Dynamic Cart Badge Placeholder */}
            <span className="absolute -top-2 -right-2 flex items-center justify-center w-4 h-4 bg-blue-600 text-[10px] text-white font-bold rounded-full">
              3
            </span>
          </Link>
        </div>

      </div>
    </header>
  );
}