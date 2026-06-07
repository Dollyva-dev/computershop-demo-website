"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart } from "lucide-react";
import SearchModal from "./SearchModal";

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0f] border-b border-white/[0.06] h-20">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
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
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
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
          <div className="flex items-center gap-6">
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