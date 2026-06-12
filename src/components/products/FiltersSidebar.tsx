"use client";

import { useState } from "react";

const CATEGORIES = ["Laptops", "Desktops", "Processors", "Graphics Cards", "Motherboards", "Memory"];
const BRANDS = ["ASUS", "MSI", "Gigabyte", "Corsair", "NVIDIA", "AMD"];

export default function FiltersSidebar() {
  const [priceRange, setPriceRange] = useState(5000);

  return (
    <aside className="w-full lg:w-72 shrink-0 sticky top-32 h-fit hidden lg:flex flex-col border-r border-white/10 pr-8 pb-12">
      
      {/* Control Panel Header */}
      <div className="pb-6 border-b border-white/10 mb-8">
        <h2 className="text-xs font-mono tracking-[0.2em] text-gray-500 uppercase">
          Parameters // Control
        </h2>
      </div>

      {/* Categories Filter */}
      <div className="mb-10">
        <h3 className="text-white font-bold mb-5 text-sm tracking-widest uppercase">Categories</h3>
        <ul className="space-y-4">
          {CATEGORIES.map((cat) => (
            <li key={cat} className="flex items-center gap-4 group">
              <div className="relative flex items-center justify-center w-4 h-4 border border-white/30 group-hover:border-white transition-colors">
                <input 
                  type="checkbox" 
                  id={cat} 
                  className="peer absolute inset-0 opacity-0 cursor-pointer" 
                />
                {/* Custom checkmark indicator */}
                <div className="w-2 h-2 bg-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
              </div>
              <label htmlFor={cat} className="text-sm text-gray-400 peer-checked:text-white group-hover:text-white cursor-pointer transition-colors uppercase tracking-wider font-light">
                {cat}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Brands Filter */}
      <div className="mb-10">
        <h3 className="text-white font-bold mb-5 text-sm tracking-widest uppercase">Manufacturers</h3>
        <ul className="space-y-4">
          {BRANDS.map((brand) => (
            <li key={brand} className="flex items-center gap-4 group">
              <div className="relative flex items-center justify-center w-4 h-4 border border-white/30 group-hover:border-white transition-colors">
                <input 
                  type="checkbox" 
                  id={brand} 
                  className="peer absolute inset-0 opacity-0 cursor-pointer" 
                />
                <div className="w-2 h-2 bg-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
              </div>
              <label htmlFor={brand} className="text-sm text-gray-400 peer-checked:text-white group-hover:text-white cursor-pointer transition-colors uppercase tracking-wider font-light">
                {brand}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range Filter */}
      <div className="mb-10">
        <h3 className="text-white font-bold mb-5 text-sm tracking-widest uppercase">Max Threshold</h3>
        <input 
          type="range" 
          min="100" 
          max="5000" 
          step="100"
          value={priceRange} 
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full h-px bg-white/20 appearance-none cursor-pointer outline-none slider-thumb-brutalist"
        />
        <div className="mt-4 flex justify-between items-center text-xs font-mono text-gray-500">
          <span>$100</span>
          <span className="text-white text-sm border border-white/20 px-3 py-1">
            ${priceRange.toLocaleString()}
          </span>
        </div>
      </div>

      <style jsx>{`
        .slider-thumb-brutalist::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 24px;
          background: white;
          cursor: pointer;
        }
      `}</style>
    </aside>
  );
}