import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Category, Part } from "./types";
import { MOCK_DATA } from "./data";
import { Check, X } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

interface SidePanelProps {
  cat: Category;
  chipset: string;
  theme: { accent: string; glow: string };
  selectedParts: Partial<Record<Category, Part>>;
  onSelect: (part: Part, e: React.MouseEvent) => void;
  onClose: () => void;
}

export function SidePanel({ cat, chipset, theme, selectedParts, onSelect, onClose }: SidePanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Background overlay fade in
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    // Panel slide in from right
    gsap.fromTo(panelRef.current,
      { x: "100%" },
      { x: "0%", duration: 0.4, ease: "power3.out" }
    );
  }, []);

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
    gsap.to(panelRef.current, { x: "100%", duration: 0.3, ease: "power3.in", onComplete: onClose });
  };

  const parts = (MOCK_DATA[cat] ?? []).filter(
    p => p.compatibility === "Universal" || p.compatibility === chipset
  );

  return (
    <>
      {/* Invisible Overlay for click-to-close */}
      <div 
        ref={overlayRef}
        onClick={handleClose}
        className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm"
      />
      
      {/* Sliding Panel */}
      <div
        ref={panelRef}
        className="fixed top-0 right-0 h-full w-[400px] max-w-full z-[9999] bg-[#0a0a0a] border-l border-white/10 shadow-[-20px_0_60px_rgba(0,0,0,0.8)] flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-[#050505] flex justify-between items-start">
          <div>
            <div className="text-[10px] font-semibold tracking-[0.2em] text-gray-500 uppercase mb-1">
              Select Component
            </div>
            <div className="text-xl font-bold text-white uppercase tracking-tight">{cat}</div>
            <div className="text-xs text-gray-500 mt-2">
              {parts.length} compatible options found
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Part List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ scrollbarWidth: "none" }}>
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
              onSelect={(p, e) => {
                onSelect(p, e);
                // Optionally close after select, or leave open. We'll leave open so user can see selection.
              }} 
            />
          ))}
        </div>
      </div>
    </>
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
      className={`group flex items-center p-3 rounded-xl cursor-pointer transition-all duration-200 border border-transparent ${
        isSelected ? "bg-white/5 border-white/20" : "hover:bg-white/[0.03]"
      }`}
    >
      {/* Product Image */}
      <div className="w-20 h-20 shrink-0 bg-[#050505] rounded-lg border border-white/10 overflow-hidden flex items-center justify-center mr-4">
        {part.image ? (
          <img src={part.image} alt={part.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
        ) : (
          <div className="text-xs text-gray-600">No Img</div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2 mb-1">
          <span className="text-sm font-semibold text-white leading-tight truncate">{part.name}</span>
          {isSelected && <Check size={16} style={{ color: accent }} className="shrink-0" />}
        </div>
        
        <div className="text-[11px] text-gray-500 leading-relaxed mb-2 line-clamp-2">
          {part.specs}
        </div>

        <div className="flex justify-between items-center mt-auto">
          <span className="text-sm font-bold text-white">
            ${part.price.toFixed(2)}
          </span>
          <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${isSelected ? "text-white" : "text-gray-500 group-hover:text-white"}`}>
            {isSelected ? "Installed" : "Select"}
          </span>
        </div>
      </div>
    </div>
  );
}
