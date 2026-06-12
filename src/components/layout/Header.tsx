"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import SearchModal from "./SearchModal";

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll to trigger the sticky background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  return (
    <>
      {/* DYNAMIC STICKY HEADER 
        Always fixed to the top (top-0). 
        Changes background, padding, and border when scrolling.
      */}
      <header 
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${
          scrolled 
            ? "bg-[#0a0a0a]/90 backdrop-blur-md border-white/10 py-3 shadow-xl" 
            : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
          
          {/* Brand - Text Only */}
          <Link href="/" className="flex items-center flex-shrink-0 z-50">
            <span className="font-bold text-xl tracking-wider text-white uppercase flex items-center gap-1.5">
              Dollyva
              <span className="font-light text-[0.65rem] tracking-[0.2em] text-gray-400 mt-1 uppercase">
                Computers
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/products" className="nav-item">Products</Link>
            <Link href="/accessories" className="nav-item">Accessories</Link>
            <Link href="/brands" className="nav-item">Brands</Link>
            <Link href="/laptops" className="nav-item">Laptops</Link>
          </nav>

          {/* Utility Icons & CTA */}
          <div className="flex items-center gap-5 z-50">
            <button
              onClick={() => setSearchOpen(true)}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Search"
            >
              <Search size={18} strokeWidth={2} />
            </button>
            
            <Link href="/cart" className="relative text-gray-400 hover:text-white transition-colors">
              <ShoppingCart size={18} strokeWidth={2} />
              <span className="absolute -top-2 -right-2 flex items-center justify-center w-4 h-4 bg-white text-[10px] text-black font-bold rounded-full">
                3
              </span>
            </Link>

            {/* Sharp, Minimal "Build My PC" CTA (Desktop) */}
            <Link
              href="/build"
              className="hidden md:flex items-center justify-center px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors duration-300"
            >
              Build Rig
            </Link>

            {/* Hamburger Button (Mobile/Tablet) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-400 hover:text-white transition-colors ml-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* MODERN FULL-SCREEN MOBILE MENU */}
      <div 
        className={`fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col items-center justify-center transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center gap-8 text-2xl font-light tracking-wide">
          <Link href="/products" className="text-gray-400 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>Products</Link>
          <Link href="/accessories" className="text-gray-400 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>Accessories</Link>
          <Link href="/brands" className="text-gray-400 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>Brands</Link>
          <Link href="/laptops" className="text-gray-400 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>Laptops</Link>
          
          <Link
            href="/build"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-6 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-black bg-white rounded-full hover:bg-gray-200 transition-colors duration-300"
          >
            Build My PC
          </Link>
        </nav>
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}