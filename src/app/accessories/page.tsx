"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import FiltersSidebar from "@/components/products/FiltersSidebar";
import ProductCard from "@/components/products/ProductCard";

// Mock Data - Filtered exclusively for Peripherals and Accessories
const ACCESSORY_PRODUCTS = [
  { 
    id: "a1", 
    name: "Wooting 60HE+ Analog Keyboard", 
    price: 174.99, 
    category: "Keyboards", 
    image: "/placeholder-keyboard-1.png", 
    inStock: true 
  },
  { 
    id: "a2", 
    name: "Logitech G PRO X SUPERLIGHT 2", 
    price: 159.00, 
    category: "Mice", 
    image: "/placeholder-mouse-1.png", 
    inStock: true 
  },
  { 
    id: "a3", 
    name: "SteelSeries Arctis Nova Pro Wireless", 
    price: 349.99, 
    category: "Headsets", 
    image: "/placeholder-headset-1.png", 
    inStock: false 
  },
  { 
    id: "a4", 
    name: "Corsair MM700 RGB Extended Mouse Pad", 
    price: 59.99, 
    category: "Mousepads", 
    image: "/placeholder-mousepad-1.png", 
    inStock: true 
  },
  { 
    id: "a5", 
    name: "Keychron Q1 Pro Wireless Custom", 
    price: 199.00, 
    category: "Keyboards", 
    image: "/placeholder-keyboard-2.png", 
    inStock: true 
  },
  { 
    id: "a6", 
    name: "Razer DeathAdder V3 Pro", 
    price: 149.99, 
    category: "Mice", 
    image: "/placeholder-mouse-2.png", 
    inStock: true 
  },
];

export default function AccessoriesPage() {
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
      
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
          Premium Accessories
        </h1>
        <p className="text-slate-400">
          Elevate your setup with elite-grade peripherals, from analog keyboards to ultra-lightweight mice.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        
        {/* Left Column: Filters Sidebar */}
        {/* Note: You might want to pass props to FiltersSidebar in the future to change the categories dynamically */}
        <FiltersSidebar />

        {/* Right Column: Product Grid */}
        <div className="flex-1">
          {/* Controls Bar */}
          <div className="flex items-center justify-between mb-8 bg-white/5 border border-white/5 p-4 rounded-xl backdrop-blur-sm">
            <span className="text-sm text-slate-400">Showing {ACCESSORY_PRODUCTS.length} results</span>
            
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

          {/* Grid Container */}
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {ACCESSORY_PRODUCTS.map((product) => (
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