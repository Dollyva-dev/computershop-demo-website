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
    image: "/placeholder-keyboard-1.webp", 
    inStock: true 
  },
  { 
    id: "a2", 
    name: "Logitech G PRO X SUPERLIGHT 2", 
    price: 159.00, 
    category: "Mice", 
    image: "/placeholder-mouse-1.webp", 
    inStock: true 
  },
  { 
    id: "a3", 
    name: "SteelSeries Arctis Nova Pro Wireless", 
    price: 349.99, 
    category: "Headsets", 
    image: "/placeholder-headset-1.webp", 
    inStock: false 
  },
  { 
    id: "a4", 
    name: "Corsair MM700 RGB Extended Mouse Pad", 
    price: 59.99, 
    category: "Mousepads", 
    image: "/placeholder-mousepad-1.webp", 
    inStock: true 
  },
  { 
    id: "a5", 
    name: "Keychron Q1 Pro Wireless Custom", 
    price: 199.00, 
    category: "Keyboards", 
    image: "/placeholder-keyboard-2.webp", 
    inStock: true 
  },
  { 
    id: "a6", 
    name: "Razer DeathAdder V3 Pro", 
    price: 149.99, 
    category: "Mice", 
    image: "/placeholder-mouse-2.webp", 
    inStock: true 
  },
];

export default function AccessoriesPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header reveal animation
    gsap.fromTo(
      ".catalog-header",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power4.out" }
    );

    // Staggered grid reveal animation
    gsap.fromTo(
      ".stagger-card",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.2 }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full bg-background min-h-screen pt-32 pb-24 text-foreground">
      <div className="max-w-[100rem] mx-auto px-6 md:px-12">
        
        {/* Massive Catalog Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-8">
          <div className="overflow-hidden">
            <h1 className="catalog-header text-[10vw] md:text-[6vw] font-bold uppercase tracking-tighter leading-none text-white m-0">
              ACCESSORIES_
            </h1>
          </div>
          <p className="catalog-header text-sm text-gray-500 font-mono tracking-widest uppercase max-w-xs md:text-right mt-6 md:mt-0">
            Elite-grade peripherals. Elevate your interface.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-0 lg:gap-12">
          
          {/* Left Column: Strict Filters Sidebar */}
          <FiltersSidebar />

          {/* Right Column: Product Grid Architecture */}
          <div className="flex-1 w-full">
            
            {/* Top Control Bar (Sharp Edges) */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b border-white/10 w-full gap-4">
              <span className="text-xs font-mono tracking-widest text-gray-500 uppercase">
                Showing [0{ACCESSORY_PRODUCTS.length}] Results
              </span>
              
              <div className="flex items-center gap-4">
                <label htmlFor="sort" className="text-xs font-mono tracking-widest text-gray-500 uppercase hidden sm:block">
                  Sort:
                </label>
                <select 
                  id="sort" 
                  className="bg-transparent border-none text-white text-sm uppercase tracking-wider font-bold cursor-pointer outline-none hover:text-gray-300 transition-colors"
                >
                  <option className="bg-background">Featured</option>
                  <option className="bg-background">Price: Ascending</option>
                  <option className="bg-background">Price: Descending</option>
                  <option className="bg-background">Newest</option>
                </select>
              </div>
            </div>

            {/* Seamless Hairline Grid Container 
                Uses gap-px and bg-white/10 to create perfect 1px borders between all cards
            */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-px bg-white/10 border-y border-white/10">
              {ACCESSORY_PRODUCTS.map((product) => (
                <div key={product.id} className="stagger-card bg-background">
                  <ProductCard {...product} />
                </div>
              ))}
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}