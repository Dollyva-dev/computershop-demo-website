import React from "react";
import { Download } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { gsap } from "gsap";
import { Category, Part } from "./types";

// ─────────────────────────────────────────────────────────────
// ELEGANT ADD-TO-BUILD ANIMATION
// ─────────────────────────────────────────────────────────────
export function triggerFlyAnimation(e: React.MouseEvent) {
  const invoiceEl = document.getElementById("build-summary");
  if (!invoiceEl) return;
  const ir = invoiceEl.getBoundingClientRect();

  const particle = document.createElement("div");
  particle.style.cssText = `
    position: fixed; left: ${e.clientX}px; top: ${e.clientY}px; 
    width: 8px; height: 8px; border-radius: 50%; background: #fff; 
    box-shadow: 0 0 10px rgba(255,255,255,0.5); z-index: 99999; pointer-events: none;
  `;
  document.body.appendChild(particle);

  gsap.to(particle, {
    x: ir.left - e.clientX + 40,
    y: ir.top - e.clientY + 60,
    scale: 0.5,
    opacity: 0,
    duration: 0.6,
    ease: "power2.inOut",
    onComplete: () => {
      particle.remove();
      // Smooth pulse on the invoice
      gsap.fromTo(invoiceEl, { scale: 1.02 }, { scale: 1, duration: 0.3, ease: "power2.out" });
    },
  });
}

// ─────────────────────────────────────────────────────────────
// PREMIUM BUILD SUMMARY
// ─────────────────────────────────────────────────────────────
export function LiveInvoice({ selectedParts, chipset, theme }: {
  selectedParts: Partial<Record<Category, Part>>;
  chipset: string;
  theme: { accent: string; glow: string; badge: string };
}) {
  const subtotal = Object.values(selectedParts).reduce((s, p) => s + (p?.price || 0), 0);
  const count = Object.keys(selectedParts).length;

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Dollyva Build Summary", 14, 22);
    doc.setFontSize(10);
    doc.text(`Platform: ${chipset}`, 14, 30);
    const tableData = Object.entries(selectedParts).map(([cat, part]) => [cat, part!.name, `$${part!.price.toFixed(2)}`]);
    autoTable(doc, {
      startY: 40,
      head: [["Category", "Component", "Price"]],
      body: tableData,
      foot: [["", "Estimated Total", `$${subtotal.toFixed(2)}`]],
      theme: "plain",
      headStyles: { fillColor: [0,0,0], textColor: [255,255,255] },
    });
    doc.save(`Dollyva_Build_${Date.now()}.pdf`);
  };

  return (
    <div className="w-full lg:w-[400px] xl:w-[450px] shrink-0 sticky top-32 z-40">
      <div id="build-summary" className="bg-[#050505] border border-white/10 rounded-2xl p-8 lg:p-10 shadow-2xl transition-transform">
        
        <h2 className="text-xl font-bold uppercase tracking-tight text-white border-b border-white/10 pb-6 mb-8">
          Build Summary
        </h2>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-[10px] font-semibold text-gray-500 mb-3 uppercase tracking-widest">
            <span>Components</span>
            <span>{count} / 12</span>
          </div>
          <div className="w-full h-1.5 flex gap-1 rounded-full overflow-hidden bg-white/5">
            <div 
              className="h-full transition-all duration-500 rounded-full"
              style={{ width: `${(count / 12) * 100}%`, backgroundColor: theme.accent }}
            />
          </div>
        </div>

        {/* Component List */}
        <div className="space-y-4 mb-8 min-h-[200px] max-h-[40vh] overflow-y-auto pr-2" style={{ scrollbarWidth: "thin" }}>
          {Object.entries(selectedParts).map(([cat, part]) => (
            <div key={cat} className="flex justify-between items-center group">
              <div className="flex flex-col w-[75%]">
                <span className="text-[9px] uppercase tracking-widest text-gray-500 mb-1">
                  {cat}
                </span>
                <span className="text-sm font-medium text-white truncate group-hover:text-gray-300 transition-colors">
                  {part!.name}
                </span>
              </div>
              <span className="text-sm font-semibold text-white">
                ${part!.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            </div>
          ))}

          {count === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 pt-12">
              <p className="text-sm font-light text-center px-4">
                Interact with the schematic on the left to begin selecting your components.
              </p>
            </div>
          )}
        </div>

        <div className="w-full h-px bg-white/10 mb-8" />

        {/* Totals & Action */}
        <div className="flex justify-between items-end mb-10">
          <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Estimated Total</span>
          <span className="text-4xl font-black text-white tracking-tighter">
            ${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <button 
            onClick={handleDownloadPDF}
            disabled={subtotal === 0}
            className="w-full py-4 text-xs font-bold uppercase tracking-widest border border-white/20 text-white hover:bg-white hover:text-black rounded-xl transition-colors disabled:opacity-30 flex items-center justify-center gap-2"
          >
            <Download size={16} /> Save Manifest
          </button>

          <button 
            disabled={subtotal === 0}
            className="w-full py-5 text-xs font-bold uppercase tracking-widest rounded-xl transition-transform active:scale-95 disabled:opacity-30 disabled:active:scale-100"
            style={subtotal > 0 ? { backgroundColor: "white", color: "black" } : { backgroundColor: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.3)" }}
          >
            Add Build to Cart
          </button>
        </div>

      </div>
    </div>
  );
}