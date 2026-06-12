import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Category, Part } from "./types";
import { MOCK_DATA } from "./data";
import { Check } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

interface HoverPopupProps {
  cat: Category;
  pos: { x: number; y: number };
  chipset: string;
  theme: { accent: string; glow: string };
  selectedParts: Partial<Record<Category, Part>>;
  onSelect: (part: Part, e: React.MouseEvent) => void;
  onEnter: () => void;
  onLeave: () => void;
}

export function HoverPopup({ cat, pos, chipset, theme, selectedParts, onSelect, onEnter, onLeave }: HoverPopupProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Smooth, premium fade & scale entrance
    gsap.fromTo(ref.current,
      { scale: 0.95, opacity: 0, y: 10 },
      { scale: 1, opacity: 1, y: 0, duration: 0.25, ease: "power2.out" }
    );
  }, []);

  const parts = (MOCK_DATA[cat] ?? []).filter(
    p => p.compatibility === "Universal" || p.compatibility === chipset
  );

  const POPUP_W = 340;
  const vw = typeof window !== "undefined" ? window.innerWidth : 1400;
  const vh = typeof window !== "undefined" ? window.innerHeight : 900;
  const APPROX_H = Math.min(parts.length * 100 + 80, 420);

  let left = pos.x + 20;
  let top = pos.y - 20;

  if (vw < 1024) { 
    left = Math.max(10, Math.min(pos.x - (POPUP_W / 2), vw - POPUP_W - 10));
    top = pos.y + 20; 
    if (top + APPROX_H > vh - 20) top = Math.max(70, pos.y - APPROX_H - 20);
  } else {
    if (left + POPUP_W > vw - 16) left = pos.x - POPUP_W - 20;
    if (top + APPROX_H > vh - 16) top = vh - APPROX_H - 16;
    if (top < 70) top = 70;
  }

  return (
    <div
      ref={ref}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="fixed z-[9999] bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col cursor-default"
      style={{ left, top, width: POPUP_W, maxHeight: 440 }}
    >
      {/* Header */}
      <div className="p-5 border-b border-white/10 bg-[#050505]">
        <div className="text-[10px] font-semibold tracking-[0.2em] text-gray-500 uppercase mb-1">
          Select Component
        </div>
        <div className="text-lg font-bold text-white uppercase tracking-tight">{cat}</div>
        <div className="text-xs text-gray-500 mt-2">
          {parts.length} compatible options found
        </div>
      </div>

      {/* Part List */}
      <div className="flex flex-col overflow-y-auto p-2" style={{ scrollbarWidth: "none" }}>
        {parts.length === 0 && (
          <div className="text-gray-500 text-sm text-center py-10">
            No compatible parts available.
          </div>
        )}
        {parts.map(part => (
          <PartCard 
            key={part.id} 
            part={part} 
            isSelected={selectedParts[cat]?.id === part.id} 
            accent={theme.accent} 
            onSelect={onSelect} 
          />
        ))}
      </div>
    </div>
  );
}

function PartCard({ part, isSelected, accent, onSelect }: {
  part: Part;
  isSelected: boolean;
  accent: string;
  onSelect: (part: Part, e: React.MouseEvent) => void;
}) {
  return (
    <div
      onClick={(e) => onSelect(part, e)}
      className={`group p-4 rounded-xl cursor-pointer transition-all duration-200 border border-transparent ${
        isSelected ? "bg-white/5 border-white/20" : "hover:bg-white/[0.03]"
      }`}
    >
      <div className="flex justify-between items-start gap-4 mb-2">
        <span className="text-sm font-semibold text-white leading-tight">{part.name}</span>
        {isSelected && <Check size={16} style={{ color: accent }} className="shrink-0" />}
      </div>
      
      <div className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">
        {part.specs}
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm font-bold text-white">
          ${part.price.toFixed(2)}
        </span>
        <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${isSelected ? "text-white" : "text-gray-500 group-hover:text-white"}`}>
          {isSelected ? "Installed" : "Select"}
        </span>
      </div>
    </div>
  );
}