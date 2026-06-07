"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Check, ChevronRight, Cpu, HardDrive, MonitorPlay, Zap } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// --- Types & Mock Data ---
type Part = { id: string; name: string; price: number; image: string; specs: string };
type Category = "CPU" | "Motherboard" | "Memory" | "Storage" | "GPU" | "Case" | "Power Supply";

const CATEGORIES: Category[] = ["CPU", "Motherboard", "Memory", "Storage", "GPU", "Case", "Power Supply"];

const MOCK_DATA: Record<Category, Part[]> = {
  CPU: [
    { id: "c1", name: "Intel Core i9-14900K", price: 589.99, image: "/placeholder-cpu.png", specs: "24-Core, 6.0 GHz" },
    { id: "c2", name: "AMD Ryzen 9 7950X3D", price: 649.00, image: "/placeholder-cpu.png", specs: "16-Core, 5.7 GHz" },
    { id: "c3", name: "Intel Core i7-14700K", price: 399.99, image: "/placeholder-cpu.png", specs: "20-Core, 5.6 GHz" },
  ],
  Motherboard: [
    { id: "m1", name: "ASUS ROG Maximus Z790 Hero", price: 629.99, image: "/placeholder-mobo.png", specs: "LGA 1700, DDR5, Wi-Fi 6E" },
    { id: "m2", name: "MSI MAG B650 Tomahawk", price: 219.99, image: "/placeholder-mobo.png", specs: "AM5, DDR5, Wi-Fi 6E" },
  ],
  Memory: [
    { id: "r1", name: "Corsair Dominator Titanium 64GB", price: 315.00, image: "/placeholder-ram.png", specs: "DDR5 6000MHz CL30" },
    { id: "r2", name: "G.Skill Trident Z5 RGB 32GB", price: 119.99, image: "/placeholder-ram.png", specs: "DDR5 6400MHz CL32" },
  ],
  Storage: [
    { id: "s1", name: "Samsung 990 PRO 2TB", price: 169.99, image: "/placeholder-ssd.png", specs: "PCIe 4.0 NVMe M.2" },
    { id: "s2", name: "WD Black SN850X 4TB", price: 299.99, image: "/placeholder-ssd.png", specs: "PCIe 4.0 NVMe M.2" },
  ],
  GPU: [
    { id: "g1", name: "NVIDIA GeForce RTX 4090 FE", price: 1599.99, image: "/placeholder-gpu.png", specs: "24GB GDDR6X" },
    { id: "g2", name: "ASUS ROG Strix RTX 4080 SUPER", price: 1199.99, image: "/placeholder-gpu.png", specs: "16GB GDDR6X" },
  ],
  Case: [
    { id: "cs1", name: "Lian Li O11 Dynamic EVO", price: 149.99, image: "/placeholder-case.png", specs: "Mid-Tower, Dual Chamber" },
    { id: "cs2", name: "NZXT H9 Flow", price: 159.99, image: "/placeholder-case.png", specs: "Mid-Tower, High Airflow" },
  ],
  "Power Supply": [
    { id: "p1", name: "Corsair RM1000x Shift", price: 209.99, image: "/placeholder-psu.png", specs: "1000W, 80+ Gold, ATX 3.0" },
    { id: "p2", name: "Seasonic Vertex GX-1200", price: 249.99, image: "/placeholder-psu.png", specs: "1200W, 80+ Gold, ATX 3.0" },
  ],
};

export default function BuildPage() {
  const [activeTab, setActiveTab] = useState<Category>("CPU");
  const [selectedParts, setSelectedParts] = useState<Partial<Record<Category, Part>>>({});
  
  const contentRef = useRef<HTMLDivElement>(null);
  const invoiceRef = useRef<HTMLDivElement>(null);

  // Animate content when switching tabs
  useGSAP(() => {
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
    );
  }, { dependencies: [activeTab], scope: contentRef });

  // Custom GSAP "Fly to Invoice" animation
  const handleSelectPart = (e: React.MouseEvent<HTMLButtonElement>, part: Part, category: Category) => {
    // Update State
    setSelectedParts(prev => ({ ...prev, [category]: part }));

    // Get coordinates for the animation
    const button = e.currentTarget;
    const buttonRect = button.getBoundingClientRect();
    const invoiceEl = document.getElementById("invoice-sidebar");
    
    if (!invoiceEl) return;
    const invoiceRect = invoiceEl.getBoundingClientRect();

    // Create a ghost clone of the button/card
    const ghost = button.cloneNode(true) as HTMLElement;
    ghost.style.position = "fixed";
    ghost.style.left = `${buttonRect.left}px`;
    ghost.style.top = `${buttonRect.top}px`;
    ghost.style.width = `${buttonRect.width}px`;
    ghost.style.height = `${buttonRect.height}px`;
    ghost.style.zIndex = "9999";
    ghost.style.pointerEvents = "none";
    ghost.style.borderRadius = "12px";
    ghost.style.boxShadow = "0 0 30px rgba(59,130,246,0.5)";
    document.body.appendChild(ghost);

    // Animate the ghost flying to the invoice
    gsap.to(ghost, {
      x: invoiceRect.left - buttonRect.left + (invoiceRect.width / 2),
      y: invoiceRect.top - buttonRect.top + 100,
      scale: 0.1,
      opacity: 0,
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: () => {
        ghost.remove(); // Clean up DOM
        // Pulse the invoice to show it was added
        gsap.fromTo(invoiceEl, 
          { scale: 1.02, boxShadow: "0 0 30px rgba(59,130,246,0.3)" },
          { scale: 1, boxShadow: "0 0 0px rgba(59,130,246,0)", duration: 0.4 }
        );
      }
    });

    // Automatically advance to the next tab if available
    const currentIndex = CATEGORIES.indexOf(category);
    if (currentIndex < CATEGORIES.length - 1) {
      setTimeout(() => setActiveTab(CATEGORIES[currentIndex + 1]), 600);
    }
  };

  // Calculations
  const subtotal = Object.values(selectedParts).reduce((sum, part) => sum + (part?.price || 0), 0);
  const assemblyFee = subtotal > 0 ? 99.00 : 0;
  const total = subtotal + assemblyFee;

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 relative min-h-screen">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-[10%] w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
          Dollyva <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Rig Configurator</span>
        </h1>
        <p className="text-slate-400">Select premium, certified compatible parts to forge your ultimate system.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 items-start">
        
        {/* LEFT COLUMN: Selection Interface */}
        <div className="w-full lg:w-2/3 flex flex-col space-y-6">
          
          {/* Tabs */}
          <div className="flex overflow-x-auto pb-4 gap-2 scrollbar-hide border-b border-white/10">
            {CATEGORIES.map((cat, idx) => {
              const isSelected = !!selectedParts[cat];
              const isActive = activeTab === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-t-xl text-sm font-medium transition-all whitespace-nowrap ${
                    isActive 
                      ? "bg-white/10 text-white border-b-2 border-blue-500" 
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] ${isSelected ? 'bg-blue-500 text-white' : 'bg-white/10'}`}>
                    {isSelected ? <Check size={12} /> : idx + 1}
                  </span>
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Active Tab Content Grid */}
          <div ref={contentRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            {MOCK_DATA[activeTab].map((part) => {
              const isCurrentlySelected = selectedParts[activeTab]?.id === part.id;
              
              return (
                <div 
                  key={part.id}
                  className={`relative flex flex-col bg-[#0b0b12] border rounded-2xl p-5 transition-all duration-300 ${
                    isCurrentlySelected 
                      ? "border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.15)]" 
                      : "border-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="w-full h-40 relative bg-black/30 rounded-xl mb-4 flex items-center justify-center p-4">
                    <Image src={part.image} alt={part.name} fill className="object-contain" />
                  </div>
                  
                  <h3 className="text-white font-semibold leading-tight mb-1">{part.name}</h3>
                  <p className="text-xs text-slate-400 mb-4">{part.specs}</p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-lg font-bold text-white">${part.price.toFixed(2)}</span>
                    <button 
                      onClick={(e) => handleSelectPart(e, part, activeTab)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isCurrentlySelected
                          ? "bg-blue-600/20 text-blue-400 border border-blue-500/50"
                          : "bg-white/10 hover:bg-blue-600 text-white border border-transparent"
                      }`}
                    >
                      {isCurrentlySelected ? "Selected" : "Select"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Live Sticky Invoice */}
        <div className="w-full lg:w-1/3 sticky top-28">
          <div 
            id="invoice-sidebar" 
            ref={invoiceRef}
            className="bg-[#0b0b12]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl"
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Zap className="text-blue-500" size={20} />
              Your Configuration
            </h2>

            {/* Line Items */}
            <div className="space-y-4 mb-8">
              {CATEGORIES.map((cat) => {
                const part = selectedParts[cat];
                return (
                  <div key={cat} className="flex justify-between items-start group">
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-0.5">{cat}</span>
                      <span className={`text-sm ${part ? 'text-white' : 'text-slate-600 italic'}`}>
                        {part ? part.name : "Not Selected"}
                      </span>
                    </div>
                    <span className={`text-sm font-medium ${part ? 'text-white' : 'text-transparent'}`}>
                      ${part?.price.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-white/10 mb-6" />

            {/* Summary */}
            <div className="space-y-3 mb-8">
              <div className="flex justify-between text-sm text-slate-400">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-400">
                <span>Expert Assembly Fee</span>
                <span>${assemblyFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
                <span className="text-lg font-bold text-white">Total</span>
                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button 
              disabled={subtotal === 0}
              className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                subtotal > 0 
                  ? "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]" 
                  : "bg-white/5 text-slate-500 cursor-not-allowed"
              }`}
            >
              Proceed to Checkout <ChevronRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}