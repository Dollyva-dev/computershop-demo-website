"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, ArrowRight } from "lucide-react";

// ── All site products in one place ───────────────────────────────────────────
const ALL_PRODUCTS = [
  { id: "1",  name: "ASUS ROG Strix GeForce RTX 4090",      price: 1999.99, category: "Graphics Cards", image: "/placeholder-gpu.webp",        href: "/products", inStock: true },
  { id: "2",  name: "Intel Core i9-14900K Processor",        price: 589.00,  category: "Processors",    image: "/placeholder-cpu.webp",        href: "/products", inStock: true },
  { id: "3",  name: "MSI MEG Z790 GODLIKE Motherboard",      price: 1199.99, category: "Motherboards",  image: "/placeholder-mobo.webp",       href: "/products", inStock: false },
  { id: "4",  name: "Corsair Dominator Titanium 64GB DDR5",  price: 315.00,  category: "Memory",        image: "/placeholder-ram.webp",        href: "/products", inStock: true },
  { id: "6",  name: "Samsung 990 PRO 2TB PCIe 4.0 NVMe",    price: 169.99,  category: "Storage",       image: "/placeholder-ssd.webp",        href: "/products", inStock: true },
  { id: "a1", name: "Wooting 60HE+ Analog Keyboard",         price: 174.99,  category: "Keyboards",     image: "/placeholder-keyboard-1.webp", href: "/accessories", inStock: true },
  { id: "a2", name: "Logitech G PRO X SUPERLIGHT 2",         price: 159.00,  category: "Mice",          image: "/placeholder-mouse-1.webp",    href: "/accessories", inStock: true },
  { id: "a3", name: "SteelSeries Arctis Nova Pro Wireless",  price: 349.99,  category: "Headsets",      image: "/placeholder-headset-1.webp",  href: "/accessories", inStock: false },
  { id: "a4", name: "Corsair MM700 RGB Extended Mouse Pad",  price: 59.99,   category: "Mousepads",     image: "/placeholder-mousepad-1.webp", href: "/accessories", inStock: true },
  { id: "a5", name: "Keychron Q1 Pro Wireless Custom",       price: 199.00,  category: "Keyboards",     image: "/placeholder-keyboard-2.webp", href: "/accessories", inStock: true },
  { id: "a6", name: "Razer DeathAdder V3 Pro",               price: 149.99,  category: "Mice",          image: "/placeholder-mouse-2.webp",    href: "/accessories", inStock: true },
  { id: "l1", name: "Razer Blade 16 (2026) - OLED Mini-LED",price: 3299.99, category: "Laptops",       image: "/placeholder-laptop-1.webp",   href: "/laptops", inStock: true },
  { id: "l2", name: "ASUS ROG Zephyrus G14",                 price: 1899.00, category: "Laptops",       image: "/placeholder-laptop-2.webp",   href: "/laptops", inStock: true },
  { id: "l3", name: "Lenovo Legion Pro 7i Gen 9",            price: 2450.00, category: "Laptops",       image: "/placeholder-laptop-3.webp",   href: "/laptops", inStock: false },
  { id: "l4", name: "Alienware m18 R2 Gaming Laptop",        price: 2899.99, category: "Laptops",       image: "/placeholder-laptop-4.webp",   href: "/laptops", inStock: true },
];

const QUICK_LINKS = [
  { label: "All Products",  href: "/products" },
  { label: "Accessories",   href: "/accessories" },
  { label: "Gaming Laptops",href: "/laptops" },
  { label: "Build My PC",   href: "/build" },
  { label: "Brands",        href: "/brands" },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SearchModal({ open, onClose }: Props) {
  const [query, setQuery]         = useState("");
  const [focused, setFocused]     = useState(-1);
  const inputRef                  = useRef<HTMLInputElement>(null);
  const listRef                   = useRef<HTMLUListElement>(null);

  const results = query.trim().length > 0
    ? ALL_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  // Focus input & lock body scroll when modal opens
  useEffect(() => {
    if (open) {
      setQuery("");
      setFocused(-1);
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!open) return;
    if (e.key === "Escape") { onClose(); return; }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocused(f => Math.min(f + 1, results.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocused(f => Math.max(f - 1, -1));
    }
    if (e.key === "Enter" && focused >= 0 && results[focused]) {
      window.location.href = results[focused].href;
      onClose();
    }
  }, [open, focused, results, onClose]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Scroll focused item into view
  useEffect(() => {
    if (focused >= 0 && listRef.current) {
      const el = listRef.current.children[focused] as HTMLElement;
      el?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [focused]);

  if (!open) return null;

  return (
    <>
      {/* ── Premium Full-Screen Takeover Backdrop ── */}
      <div
        className="fixed inset-0 z-[100] bg-[#0a0a0a]/95 backdrop-blur-xl flex flex-col"
        style={{ animation: "searchFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors p-2 z-50"
          aria-label="Close search"
        >
          <X size={32} strokeWidth={1} />
        </button>

        <div className="w-full max-w-5xl mx-auto px-6 md:px-12 pt-24 md:pt-32 flex flex-col h-full">
          
          {/* ── Massive Minimalist Input ── */}
          <div className="relative border-b border-white/20 focus-within:border-white transition-colors duration-500 pb-4 md:pb-6 flex items-center shrink-0">
            <Search size={32} strokeWidth={1.5} className="text-gray-500 mr-4 md:mr-6 shrink-0" />
            <input
              ref={inputRef}
              id="search-input"
              type="text"
              placeholder="Search the catalog..."
              value={query}
              onChange={e => { setQuery(e.target.value); setFocused(-1); }}
              className="w-full bg-transparent text-3xl md:text-5xl font-light tracking-tight text-white placeholder-gray-700 outline-none"
              autoComplete="off"
            />
          </div>

          {/* ── Results Area ── */}
          <div className="flex-1 overflow-y-auto mt-8 md:mt-12 pb-12 overscroll-contain" style={{ scrollbarWidth: "none" }}>
            {query.trim() === "" ? (
              
              /* Standby / Quick Links State */
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-6">
                  Quick Access
                </p>
                <div className="flex flex-wrap gap-4">
                  {QUICK_LINKS.map(l => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={onClose}
                      className="text-sm font-medium text-gray-400 hover:text-white border border-white/10 hover:border-white/30 rounded-full px-6 py-2.5 transition-all duration-300"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>

            ) : results.length === 0 ? (
              
              /* No Results State */
              <div className="flex flex-col items-center justify-center pt-20 text-center">
                <p className="text-2xl font-light text-white mb-2">No results found for &ldquo;{query}&rdquo;</p>
                <p className="text-gray-500">Check the spelling or try a broader search term.</p>
              </div>

            ) : (
              
              /* Elegant Results List */
              <div className="flex flex-col">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4 px-2">
                  {results.length} Result{results.length !== 1 ? "s" : ""} Found
                </p>
                <ul ref={listRef} className="flex flex-col">
                  {results.map((product, i) => {
                    const isFocused = focused === i;
                    return (
                      <li key={product.id}>
                        <Link
                          href={product.href}
                          onClick={onClose}
                          onMouseEnter={() => setFocused(i)}
                          className={`group flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${
                            isFocused ? "bg-white/5" : "hover:bg-white/5"
                          }`}
                        >
                          <div className="flex items-center gap-6">
                            {/* Premium Square Thumbnail */}
                            <div className={`relative w-16 h-16 md:w-20 md:h-20 bg-[#050505] border border-white/10 rounded-xl flex-shrink-0 flex items-center justify-center transition-colors ${isFocused ? "border-white/30" : ""}`}>
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-contain p-2 md:p-3"
                                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                              />
                            </div>

                            {/* Product Details */}
                            <div className="flex flex-col">
                              <span className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">
                                {product.category}
                              </span>
                              <span className={`text-base md:text-lg font-medium transition-colors ${isFocused ? "text-white" : "text-gray-300"}`}>
                                {product.name}
                              </span>
                              {!product.inStock && (
                                <span className="text-xs text-red-400 mt-1">Out of Stock</span>
                              )}
                            </div>
                          </div>

                          {/* Price & Arrow */}
                          <div className="flex items-center gap-6 pl-4">
                            <span className="text-lg font-medium text-white hidden md:block">
                              ${product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                            </span>
                            <ArrowRight 
                              size={20} 
                              strokeWidth={1.5}
                              className={`transition-all duration-300 ${isFocused ? "text-white translate-x-1" : "text-gray-600"}`} 
                            />
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
          
        </div>
      </div>

      <style jsx global>{`
        @keyframes searchFadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}