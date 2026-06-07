"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import FiltersSidebar from "@/components/products/FiltersSidebar";
import ProductCard from "@/components/products/ProductCard";

// Mock Data - Replace with actual data fetching later
const MOCK_PRODUCTS = [
  { id: "1", name: "ASUS ROG Strix GeForce RTX 4090", price: 1999.99, category: "Graphics Cards", image: "/placeholder-gpu.webp", inStock: true },
  { id: "2", name: "Intel Core i9-14900K Processor", price: 589.00, category: "Processors", image: "/placeholder-cpu.webp", inStock: true },
  { id: "3", name: "MSI MEG Z790 GODLIKE Motherboard", price: 1199.99, category: "Motherboards", image: "/placeholder-mobo.webp", inStock: false },
  { id: "4", name: "Corsair Dominator Titanium 64GB DDR5", price: 315.00, category: "Memory", image: "/placeholder-ram.webp", inStock: true },
  { id: "5", name: "Razer Blade 16 (2026) - OLED Mini-LED", price: 3299.99, category: "Laptops", image: "/placeholder-laptop.webp", inStock: true },
  { id: "6", name: "Samsung 990 PRO 2TB PCIe 4.0 NVMe", price: 169.99, category: "Storage", image: "/placeholder-ssd.webp", inStock: true },
];

export default function ProductsPage() {
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
    <div className="w-full max-w-7xl mx-auto px-6 pt-24 pb-12">
      
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">All Products</h1>
        <p className="text-slate-400">Discover premium hardware for your next ultimate build.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        
        {/* Left Column: Filters Sidebar */}
        <FiltersSidebar />

        {/* Right Column: Product Grid */}
        <div className="flex-1">
          {/* Controls Bar (Sort & Mobile Filter Toggle) */}
          <div className="flex items-center justify-between mb-8 bg-white/5 border border-white/5 p-4 rounded-xl backdrop-blur-sm">
            <span className="text-sm text-slate-400">Showing {MOCK_PRODUCTS.length} results</span>
            
            <div className="flex items-center gap-3">
              <label htmlFor="sort" className="text-sm text-slate-400 hidden sm:block">Sort by:</label>
              <select 
                id="sort" 
                className="bg-[#0b0b12] border border-white/10 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 outline-none"
              >
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest Arrivals</option>
              </select>
            </div>
          </div>

          {/* Grid Container */}
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {MOCK_PRODUCTS.map((product) => (
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