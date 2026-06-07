"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, ArrowRight, Tag } from "lucide-react";

// ── All site products in one place ───────────────────────────────────────────
const ALL_PRODUCTS = [
  // Products
  { id: "1",  name: "ASUS ROG Strix GeForce RTX 4090",      price: 1999.99, category: "Graphics Cards", image: "/placeholder-gpu.webp",        href: "/products", inStock: true },
  { id: "2",  name: "Intel Core i9-14900K Processor",        price: 589.00,  category: "Processors",    image: "/placeholder-cpu.webp",        href: "/products", inStock: true },
  { id: "3",  name: "MSI MEG Z790 GODLIKE Motherboard",      price: 1199.99, category: "Motherboards",  image: "/placeholder-mobo.webp",       href: "/products", inStock: false },
  { id: "4",  name: "Corsair Dominator Titanium 64GB DDR5",  price: 315.00,  category: "Memory",        image: "/placeholder-ram.webp",        href: "/products", inStock: true },
  { id: "6",  name: "Samsung 990 PRO 2TB PCIe 4.0 NVMe",    price: 169.99,  category: "Storage",       image: "/placeholder-ssd.webp",        href: "/products", inStock: true },
  // Accessories
  { id: "a1", name: "Wooting 60HE+ Analog Keyboard",         price: 174.99,  category: "Keyboards",     image: "/placeholder-keyboard-1.webp", href: "/accessories", inStock: true },
  { id: "a2", name: "Logitech G PRO X SUPERLIGHT 2",         price: 159.00,  category: "Mice",          image: "/placeholder-mouse-1.webp",    href: "/accessories", inStock: true },
  { id: "a3", name: "SteelSeries Arctis Nova Pro Wireless",  price: 349.99,  category: "Headsets",      image: "/placeholder-headset-1.webp",  href: "/accessories", inStock: false },
  { id: "a4", name: "Corsair MM700 RGB Extended Mouse Pad",  price: 59.99,   category: "Mousepads",     image: "/placeholder-mousepad-1.webp", href: "/accessories", inStock: true },
  { id: "a5", name: "Keychron Q1 Pro Wireless Custom",       price: 199.00,  category: "Keyboards",     image: "/placeholder-keyboard-2.webp", href: "/accessories", inStock: true },
  { id: "a6", name: "Razer DeathAdder V3 Pro",               price: 149.99,  category: "Mice",          image: "/placeholder-mouse-2.webp",    href: "/accessories", inStock: true },
  // Laptops
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

  // Focus input when modal opens
  useEffect(() => {
    if (open) {
      setQuery("");
      setFocused(-1);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [open]);

  // Keyboard navigation + ESC to close
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
      el?.scrollIntoView({ block: "nearest" });
    }
  }, [focused]);

  if (!open) return null;

  return (
    <>
      {/* ── Backdrop ────────────────────────────────────────────────────────── */}
      <div
        className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
        style={{ animation: "searchFadeIn 0.2s ease" }}
        onClick={onClose}
      />

      {/* ── Modal panel ─────────────────────────────────────────────────────── */}
      <div
        className="fixed z-[101] top-[10vh] left-1/2 -translate-x-1/2 w-full max-w-2xl px-4"
        style={{ animation: "searchSlideIn 0.25s cubic-bezier(.22,.68,0,1.2)" }}
      >
        <div className="rounded-2xl border border-white/10 bg-[#0d0d18]/95 backdrop-blur-2xl shadow-[0_32px_80px_rgba(0,0,0,0.8)] overflow-hidden">

          {/* Input row */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/8">
            <Search size={18} className="text-blue-400 flex-shrink-0" />
            <input
              ref={inputRef}
              id="search-input"
              type="text"
              placeholder="Search products, categories…"
              value={query}
              onChange={e => { setQuery(e.target.value); setFocused(-1); }}
              className="flex-1 bg-transparent text-white placeholder-slate-500 text-base outline-none"
            />
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5"
              aria-label="Close search"
            >
              <X size={18} />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[58vh] overflow-y-auto overscroll-contain">
            {query.trim() === "" ? (
              /* Quick links when empty */
              <div className="p-4">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3 px-1">
                  Quick Links
                </p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_LINKS.map(l => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={onClose}
                      className="flex items-center gap-1.5 text-sm text-slate-300 bg-white/5 hover:bg-blue-600/20 hover:text-blue-300 border border-white/8 hover:border-blue-500/30 rounded-full px-4 py-1.5 transition-all duration-200"
                    >
                      <Tag size={12} />
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : results.length === 0 ? (
              /* No results */
              <div className="flex flex-col items-center justify-center py-14 text-center px-6">
                <Search size={36} className="text-slate-700 mb-3" />
                <p className="text-slate-400 font-medium">No results for &ldquo;{query}&rdquo;</p>
                <p className="text-slate-600 text-sm mt-1">Try a different product name or category</p>
              </div>
            ) : (
              /* Product results */
              <ul ref={listRef} className="p-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2 px-3 pt-2">
                  {results.length} result{results.length !== 1 ? "s" : ""}
                </p>
                {results.map((product, i) => (
                  <li key={product.id}>
                    <Link
                      href={product.href}
                      onClick={onClose}
                      onMouseEnter={() => setFocused(i)}
                      className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-150 group ${
                        focused === i
                          ? "bg-blue-600/15 border border-blue-500/20"
                          : "hover:bg-white/5 border border-transparent"
                      }`}
                    >
                      {/* Thumbnail */}
                      <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-white/5 border border-white/8">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain p-1"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                        />
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{product.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-slate-500">{product.category}</span>
                          {!product.inStock && (
                            <span className="text-[10px] text-amber-500/80 bg-amber-500/10 rounded px-1.5 py-0.5">
                              Out of stock
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Price + arrow */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-sm font-semibold text-blue-400">
                          ${product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        </span>
                        <ArrowRight
                          size={14}
                          className={`transition-all duration-200 ${
                            focused === i ? "text-blue-400 translate-x-0.5" : "text-slate-600"
                          }`}
                        />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer hint */}
          <div className="border-t border-white/6 px-5 py-2.5 flex items-center gap-4 text-[11px] text-slate-600">
            <span><kbd className="font-mono bg-white/8 border border-white/10 rounded px-1.5 py-0.5 text-slate-400">↑↓</kbd> navigate</span>
            <span><kbd className="font-mono bg-white/8 border border-white/10 rounded px-1.5 py-0.5 text-slate-400">↵</kbd> open</span>
            <span><kbd className="font-mono bg-white/8 border border-white/10 rounded px-1.5 py-0.5 text-slate-400">esc</kbd> close</span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes searchFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes searchSlideIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-12px) scale(0.97); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0)     scale(1);    }
        }
      `}</style>
    </>
  );
}
