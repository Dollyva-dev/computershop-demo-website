"use client";

import { useRef } from "react";
import Image from "next/image";
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

export default function ProductCard({ id, name, price, category, image, inStock }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: cardRef });

  const handleMouseEnter = contextSafe(() => {
    // Reveal the "ACQUIRE" button by sliding it up
    gsap.to(".add-btn", { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" });
    // Animate image scale and saturation
    gsap.to(".prod-img", { scale: 1.05, filter: "grayscale(0%)", duration: 0.6, ease: "power2.out" });
  });

  const handleMouseLeave = contextSafe(() => {
    gsap.to(".add-btn", { y: 20, opacity: 0, duration: 0.3, ease: "power2.in" });
    gsap.to(".prod-img", { scale: 1, filter: "grayscale(100%)", duration: 0.6, ease: "power2.out" });
  });

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col h-full bg-background border border-white/10 hover:border-white transition-colors duration-500 cursor-pointer overflow-hidden p-6"
    >
      {/* Top Status Bar */}
      <div className="flex justify-between items-start w-full font-mono text-[10px] tracking-widest uppercase mb-8 z-10 relative">
        <span className="text-gray-500">ID_{id.padStart(4, '0')}</span>
        <span className={inStock ? "text-white" : "text-red-500 line-through"}>
          {inStock ? "In Stock" : "Depleted"}
        </span>
      </div>

      {/* Image Area */}
      <div className="relative w-full h-56 flex items-center justify-center mb-8 z-0">
        <Image 
          src={image} 
          alt={name} 
          fill 
          className="prod-img object-contain grayscale transition-all" 
        />
        {/* Subtle background technical crosshair */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-full h-px bg-white/20 absolute" />
          <div className="h-full w-px bg-white/20 absolute" />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-grow relative z-10">
        <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-2 block">
          {category}
        </span>
        <h3 className="text-white font-bold text-lg leading-tight uppercase tracking-wide mb-6 flex-grow">
          {name}
        </h3>
        
        <div className="flex items-end justify-between overflow-hidden">
          <span className="text-xl font-bold text-white tracking-tighter">
            ${price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
          
          {/* Brutalist Button - Hidden by default, slides up on hover */}
          <button 
            disabled={!inStock}
            className="add-btn translate-y-5 opacity-0 bg-white text-black text-xs font-bold uppercase tracking-widest px-4 py-2 hover:bg-gray-300 disabled:bg-white/10 disabled:text-white/30 transition-colors"
          >
            {inStock ? "Acquire" : "Unavailable"}
          </button>
        </div>
      </div>
    </div>
  );
}