"use client";

import { useRef } from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  inStock: boolean;
}

export default function ProductCard({ name, price, category, image, inStock }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // GSAP Hover Animations using contextSafe for React event handlers
  const { contextSafe } = useGSAP({ scope: cardRef });

  const handleMouseEnter = contextSafe(() => {
    gsap.to(cardRef.current, {
      scale: 1.03,
      y: -5,
      boxShadow: "0 20px 40px -10px rgba(59, 130, 246, 0.3)",
      borderColor: "rgba(59, 130, 246, 0.4)",
      duration: 0.4,
      ease: "power3.out",
    });
  });

  const handleMouseLeave = contextSafe(() => {
    gsap.to(cardRef.current, {
      scale: 1,
      y: 0,
      boxShadow: "0 0px 0px 0px rgba(59, 130, 246, 0)",
      borderColor: "rgba(255, 255, 255, 0.05)",
      duration: 0.4,
      ease: "power3.out",
    });
  });

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="flex flex-col bg-[#0b0b12] border border-white/5 rounded-2xl overflow-hidden backdrop-blur-md cursor-pointer transition-colors"
    >
      {/* Product Image Area */}
      <div className="relative w-full h-56 bg-black/40 p-6 flex items-center justify-center">
        {/* Placeholder for actual product image */}
        <div className="w-full h-full relative">
          <Image 
            src={image} 
            alt={name} 
            fill 
            className="object-contain drop-shadow-2xl" 
          />
        </div>
        {!inStock && (
          <div className="absolute top-3 right-3 bg-red-500/20 text-red-400 border border-red-500/30 text-xs px-2 py-1 rounded-md font-medium">
            Out of Stock
          </div>
        )}
      </div>

      {/* Product Info Area */}
      <div className="p-5 flex flex-col flex-grow border-t border-white/5">
        <span className="text-xs text-blue-400 font-medium mb-1 uppercase tracking-wider">{category}</span>
        <h3 className="text-white font-semibold text-lg leading-tight mb-4 flex-grow">{name}</h3>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-white">
            ${price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
          <button 
            disabled={!inStock}
            className={`p-2.5 rounded-xl transition-colors ${
              inStock 
                ? "bg-white/5 hover:bg-blue-600 text-white border border-white/10 hover:border-blue-500" 
                : "bg-white/5 text-slate-600 border border-transparent cursor-not-allowed"
            }`}
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}