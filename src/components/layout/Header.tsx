"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SearchModal from "./SearchModal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const navRef    = useRef<HTMLElement>(null);
  const iconsRef  = useRef<HTMLDivElement>(null);
  const logoRef   = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top -60",
        end: "top -220",
        scrub: 1,
      },
    });

    // Fade out nav + icons
    tl.to(
      [navRef.current, iconsRef.current],
      { opacity: 0, y: -8, pointerEvents: "none", duration: 0.4, ease: "power2.in" },
      0
    );

    // Fade out logo
    tl.to(
      logoRef.current,
      { opacity: 0, duration: 0.35, ease: "power2.in" },
      0
    );

    // Collapse header height + glass background on scroll
    tl.to(
      headerRef.current,
      { height: 0, opacity: 0, duration: 0.45, ease: "power2.inOut" },
      0.1
    );
  }, { scope: document.body as unknown as HTMLElement });

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-50 bg-transparent border-b border-white/[0.06] h-20 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

          {/* Brand Logo & Name */}
          <Link ref={logoRef} href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative w-10 h-10 overflow-hidden flex-shrink-0">
              <Image
                src="/finalLogo.png"
                alt="Dollyva Logo"
                fill
                className="object-contain transition-transform group-hover:scale-110"
              />
            </div>
            <span className="font-bold text-xl tracking-wide text-white whitespace-nowrap">
              Dollyva <span className="font-light text-slate-400">computers</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav ref={navRef} className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/products"    className="nav-products">Products</Link>
            <Link href="/accessories" className="nav-accessories">Accessories</Link>
            <Link href="/brands"      className="nav-brands">Brands</Link>
            <Link href="/laptops"     className="nav-laptops">Laptops</Link>
            <Link
              href="/build"
              className="nav-build relative px-5 py-2 text-white bg-blue-600/10 border border-blue-500/30 rounded-full transition-all duration-300"
            >
              Build My PC
            </Link>
          </nav>

          {/* Utility Icons */}
          <div ref={iconsRef} className="flex items-center gap-6">
            <button
              onClick={() => setSearchOpen(true)}
              className="text-slate-300 hover:text-white transition-colors hover:scale-110 active:scale-95"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <Link href="/cart" className="relative text-slate-300 hover:text-white transition-colors">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 flex items-center justify-center w-4 h-4 bg-blue-600 text-[10px] text-white font-bold rounded-full">
                3
              </span>
            </Link>
          </div>

        </div>
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}