"use client";

import { useState, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Chipset, Category, Part } from "@/components/build/types";
import { CHIPSET_THEME } from "@/components/build/data";
import { PCCaseDiagram } from "@/components/build/PCCaseDiagram";
import { LiveInvoice, triggerFlyAnimation } from "@/components/build/LiveInvoice";
import { SidePanel } from "@/components/build/SidePanel";

export default function InteractiveBuildPage() {
  const [chipset, setChipset] = useState<Chipset>(null);
  const [selectedParts, setSelectedParts] = useState<Partial<Record<Category, Part>>>({});
  const [hoveredZone, setHoveredZone] = useState<Category | null>(null);
  const [activePanel, setActivePanel] = useState<Category | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Elegant Entrance Animation
  useGSAP(() => {
    gsap.fromTo(
      ".build-anim",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" }
    );
  }, { scope: containerRef });

  const handleSelect = useCallback((cat: Category, part: Part, e: React.MouseEvent) => {
    setSelectedParts(prev => ({ ...prev, [cat]: part }));
    triggerFlyAnimation(e);
    // Optionally close the panel after selection, or leave it open
    // setActivePanel(null);
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-background min-h-screen pt-32 pb-24 text-foreground border-t border-white/10">
      <div className="max-w-[100rem] mx-auto px-6 md:px-12">
        
        {/* ── Premium Editorial Header ── */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-8">
          <div className="overflow-hidden">
            <h1 className="build-anim text-[12vw] md:text-[8vw] font-bold uppercase tracking-tighter leading-none text-white m-0">
              CONFIGURATOR.
            </h1>
          </div>
          <div className="build-anim flex flex-col md:items-end mt-6 md:mt-0 text-right">
            <span className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
              Architecture Status
            </span>
            <span className="text-sm font-bold text-white uppercase tracking-widest mt-1" style={{ color: chipset ? CHIPSET_THEME[chipset].accent : "white" }}>
              {chipset ? `${chipset} Selected` : "Awaiting Platform"}
            </span>
          </div>
        </div>

        {/* ── STATE 1: PLATFORM SELECTION ── */}
        {!chipset ? (
          <div className="build-anim grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 h-[500px]">
            
            {/* AMD Card */}
            <div 
              onClick={() => setChipset("AMD")}
              className="group relative flex flex-col items-center justify-center bg-[#050505] border border-white/10 hover:border-[#ed1c24] rounded-2xl cursor-pointer overflow-hidden transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#ed1c24]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <h2 className="text-5xl lg:text-7xl font-bold text-white tracking-tighter group-hover:scale-105 transition-transform duration-500 z-10">
                AMD
              </h2>
              <p className="text-gray-500 tracking-widest uppercase text-xs mt-4 group-hover:text-white transition-colors z-10">
                Ryzen Architecture
              </p>
            </div>

            {/* Intel Card */}
            <div 
              onClick={() => setChipset("Intel")}
              className="group relative flex flex-col items-center justify-center bg-[#050505] border border-white/10 hover:border-[#0068b5] rounded-2xl cursor-pointer overflow-hidden transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#0068b5]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <h2 className="text-5xl lg:text-7xl font-bold text-white tracking-tighter group-hover:scale-105 transition-transform duration-500 z-10">
                INTEL
              </h2>
              <p className="text-gray-500 tracking-widest uppercase text-xs mt-4 group-hover:text-white transition-colors z-10">
                Core Architecture
              </p>
            </div>

          </div>
        ) : (
          /* ── STATE 2: THE CONFIGURATOR WORKSPACE ── */
          <div className="build-anim flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            
            {/* LEFT COLUMN: Blueprint Canvas */}
            <div className="flex-1 w-full bg-[#030303] border border-white/10 rounded-2xl relative min-h-[600px] lg:min-h-[800px] flex flex-col overflow-hidden">
              
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} 
              />

              {/* Control Header */}
              <div className="flex justify-between items-center px-8 py-6 border-b border-white/10 z-10">
                <button 
                  onClick={() => { setChipset(null); setSelectedParts({}); }}
                  className="text-xs font-bold tracking-widest uppercase text-gray-400 hover:text-white transition-colors"
                >
                  ← Change Platform
                </button>
                <span className="text-xs tracking-widest text-gray-500 uppercase">
                  Interactive Schematic
                </span>
              </div>

              {/* Central SVG Render */}
              <div className="flex-1 w-full h-full flex items-center justify-center p-4 relative z-0 overflow-x-auto touch-pan-x" style={{ scrollbarWidth: "none" }}>
                <div className="w-full max-w-[900px] min-w-[700px]">
                  <PCCaseDiagram
                    chipset={chipset}
                    hoveredZone={hoveredZone}
                    selectedParts={selectedParts}
                    onEnter={setHoveredZone}
                    onLeave={() => setHoveredZone(null)}
                    onClick={setActivePanel}
                    theme={CHIPSET_THEME[chipset]}
                  />
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Order Summary (Matches Cart Page) */}
            <LiveInvoice 
              selectedParts={selectedParts} 
              chipset={chipset} 
              theme={CHIPSET_THEME[chipset]} 
            />

            {/* HIGH-END SIDE PANEL */}
            {activePanel && (
              <SidePanel
                cat={activePanel}
                chipset={chipset}
                theme={CHIPSET_THEME[chipset]}
                selectedParts={selectedParts}
                onSelect={(part, e) => handleSelect(activePanel, part, e)}
                onClose={() => setActivePanel(null)}
              />
            )}

          </div>
        )}

      </div>
    </div>
  );
}