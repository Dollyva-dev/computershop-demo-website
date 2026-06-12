"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import FiltersSidebar from "@/components/products/FiltersSidebar";
import ProductCard from "@/components/products/ProductCard";

const MOCK_PRODUCTS = [
  { id: "1", name: "ASUS ROG Strix GeForce RTX 4090", price: 1999.99, category: "Graphics Cards", image: "/placeholder-gpu.webp", inStock: true },
  { id: "2", name: "Intel Core i9-14900K Processor", price: 589.00, category: "Processors", image: "/placeholder-cpu.webp", inStock: true },
  { id: "3", name: "MSI MEG Z790 GODLIKE Motherboard", price: 1199.99, category: "Motherboards", image: "/placeholder-mobo.webp", inStock: false },
  { id: "4", name: "Corsair Dominator Titanium 64GB DDR5", price: 315.00, category: "Memory", image: "/placeholder-ram.webp", inStock: true },
  { id: "5", name: "Razer Blade 16 (2026) - OLED Mini-LED", price: 3299.99, category: "Laptops", image: "/placeholder-laptop.webp", inStock: true },
  { id: "6", name: "Samsung 990 PRO 2TB PCIe 4.0 NVMe", price: 169.99, category: "Storage", image: "/placeholder-ssd.webp", inStock: true },
];

export default function ProductsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header reveal
    gsap.fromTo(
      ".catalog-header",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power4.out" }
    );

    // Staggered grid reveal
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
              CATALOG_
            </h1>
          </div>
          <p className="catalog-header text-sm text-gray-500 font-mono tracking-widest uppercase max-w-xs md:text-right mt-6 md:mt-0">
            Precision hardware components. Secure your inventory.
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
                Showing [0{MOCK_PRODUCTS.length}] Results
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
              {MOCK_PRODUCTS.map((product) => (
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