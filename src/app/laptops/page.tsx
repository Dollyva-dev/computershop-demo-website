"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import FiltersSidebar from "@/components/products/FiltersSidebar";
import ProductCard from "@/components/products/ProductCard";

// Mock Data - Filtered exclusively for Laptops
const LAPTOP_PRODUCTS = [
  { 
    id: "l1", 
    name: "Razer Blade 16 (2026) - OLED Mini-LED", 
    price: 3299.99, 
    category: "Laptops", 
    image: "/placeholder-laptop-1.webp", 
    inStock: true 
  },
  { 
    id: "l2", 
    name: "ASUS ROG Zephyrus G14", 
    price: 1899.00, 
    category: "Laptops", 
    image: "/placeholder-laptop-2.webp", 
    inStock: true 
  },
  { 
    id: "l3", 
    name: "Lenovo Legion Pro 7i Gen 9", 
    price: 2450.00, 
    category: "Laptops", 
    image: "/placeholder-laptop-3.webp", 
    inStock: false 
  },
  { 
    id: "l4", 
    name: "Alienware m18 R2 Gaming Laptop", 
    price: 2899.99, 
    category: "Laptops", 
    image: "/placeholder-laptop-4.webp", 
    inStock: true 
  },
];

export default function LaptopsPage() {
  const gridRef = useRef<HTMLDivElement>(null);

  // Staggered entrance animation for product cards on load
  useGSAP(() => {
    gsap.fromTo(
      ".stagger-card",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
    );
  }, { scope: gridRef });

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12">
      
      {/* Page Header - Updated specifically for this route */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
          Gaming Laptops
        </h1>
        <p className="text-slate-400">
          Portable powerhouses engineered for uncompromising, on-the-go performance.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        
        {/* Left Column: Filters Sidebar */}
        <FiltersSidebar />

        {/* Right Column: Product Grid */}
        <div className="flex-1">
          {/* Controls Bar (Sort & Mobile Filter Toggle) */}
          <div className="flex items-center justify-between mb-8 bg-white/5 border border-white/5 p-4 rounded-xl backdrop-blur-sm">
            <span className="text-sm text-slate-400">Showing {LAPTOP_PRODUCTS.length} results</span>
            
            <div className="flex items-center gap-3">
              <label htmlFor="sort" className="text-sm text-slate-400 hidden sm:block">Sort by:</label>
              <select 
                id="sort" 
                className="bg-[#0b0b12] border border-white/10 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 outline-none cursor-pointer"
              >
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest Arrivals</option>
              </select>
            </div>
          </div>

          {/* Grid Container rendering the filtered LAPTOP_PRODUCTS */}
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {LAPTOP_PRODUCTS.map((product) => (
              <div key={product.id} className="stagger-card opacity-0">
                <ProductCard {...product} />
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  );
}