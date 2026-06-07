"use client";

import { useState } from "react";

const CATEGORIES = ["Laptops", "Desktops", "Processors", "Graphics Cards", "Motherboards", "Memory"];
const BRANDS = ["ASUS", "MSI", "Gigabyte", "Corsair", "NVIDIA", "AMD"];

export default function FiltersSidebar() {
  const [priceRange, setPriceRange] = useState(2500);

  return (
    <aside className="w-full lg:w-64 shrink-0 space-y-8 sticky top-28 h-fit hidden md:block">
      
      {/* Categories Filter */}
      <div className="bg-white/5 border border-white/5 rounded-2xl p-6 backdrop-blur-sm">
        <h3 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Categories</h3>
        <ul className="space-y-3">
          {CATEGORIES.map((cat) => (
            <li key={cat} className="flex items-center gap-3">
              <input type="checkbox" id={cat} className="w-4 h-4 rounded border-white/20 bg-black/50 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900" />
              <label htmlFor={cat} className="text-sm text-slate-400 hover:text-white cursor-pointer transition-colors">
                {cat}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range Filter */}
      <div className="bg-white/5 border border-white/5 rounded-2xl p-6 backdrop-blur-sm">
        <h3 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Max Price</h3>
        <input 
          type="range" 
          min="100" 
          max="5000" 
          value={priceRange} 
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        <div className="mt-3 text-right text-sm text-blue-400 font-mono">
          ${priceRange.toLocaleString()}
        </div>
      </div>

      {/* Brands Filter */}
      <div className="bg-white/5 border border-white/5 rounded-2xl p-6 backdrop-blur-sm">
        <h3 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Brands</h3>
        <ul className="space-y-3">
          {BRANDS.map((brand) => (
            <li key={brand} className="flex items-center gap-3">
              <input type="checkbox" id={brand} className="w-4 h-4 rounded border-white/20 bg-black/50 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900" />
              <label htmlFor={brand} className="text-sm text-slate-400 hover:text-white cursor-pointer transition-colors">
                {brand}
              </label>
            </li>
          ))}
        </ul>
      </div>

    </aside>
  );
}