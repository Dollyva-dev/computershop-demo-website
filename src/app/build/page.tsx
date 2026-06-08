"use client";

import { useState, useRef, useCallback } from "react";
import { Zap, ShieldCheck, CheckCircle2 } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

// ─── Types ───────────────────────────────────────────────────
type Chipset = "AMD" | "Intel" | null;
type Category =
  | "PC CASE"
  | "MOTHERBOARDS"
  | "PROCESSORS"
  | "MEMORY"
  | "COOLERS"
  | "GRAPHICS CARDS"
  | "SSD & NVME"
  | "EXTRA SSD & NVME"
  | "HARD DISK"
  | "EXTRA HARD DISK"
  | "POWER SUPPLY"
  | "FANS";

type Part = {
  id: string;
  name: string;
  price: number;
  specs: string;
  compatibility: "AMD" | "Intel" | "Universal";
};

// ─── Mock Data ────────────────────────────────────────────────
const MOCK_DATA: Record<Category, Part[]> = {
  "PC CASE": [
    { id: "cs1", name: "Lian Li O11 Dynamic EVO", price: 169.99, specs: "Dual-Chamber Mid-Tower", compatibility: "Universal" },
    { id: "cs2", name: "NZXT H9 Flow", price: 159.99, specs: "High-Airflow Mid-Tower", compatibility: "Universal" },
    { id: "cs3", name: "Fractal Design North", price: 139.99, specs: "Wood Front Mid-Tower", compatibility: "Universal" },
    { id: "cs4", name: "Corsair 4000D Airflow", price: 104.99, specs: "High-Airflow Mid-Tower", compatibility: "Universal" },
    { id: "cs5", name: "Hyte Y60", price: 199.99, specs: "Panoramic Glass Mid-Tower", compatibility: "Universal" },
    { id: "cs6", name: "Phanteks NV7", price: 219.99, specs: "Full-Tower Showcase", compatibility: "Universal" },
  ],
  "PROCESSORS": [
    { id: "c1", name: "Intel Core i9-14900K", price: 589.99, specs: "24-Core, 6.0 GHz Boost", compatibility: "Intel" },
    { id: "c2", name: "AMD Ryzen 9 7950X3D", price: 649.00, specs: "16-Core, 5.7 GHz Boost", compatibility: "AMD" },
    { id: "c3", name: "Intel Core i7-14700K", price: 409.99, specs: "20-Core, 5.6 GHz Boost", compatibility: "Intel" },
    { id: "c4", name: "AMD Ryzen 7 7800X3D", price: 399.00, specs: "8-Core, 5.0 GHz Boost", compatibility: "AMD" },
    { id: "c5", name: "Intel Core i5-13600K", price: 299.99, specs: "14-Core, 5.1 GHz Boost", compatibility: "Intel" },
    { id: "c6", name: "AMD Ryzen 5 7600X", price: 229.00, specs: "6-Core, 5.3 GHz Boost", compatibility: "AMD" },
    { id: "c7", name: "Intel Core i9-13900K", price: 549.99, specs: "24-Core, 5.8 GHz Boost", compatibility: "Intel" },
  ],
  "MOTHERBOARDS": [
    { id: "m1", name: "ASUS ROG Maximus Z790", price: 629.99, specs: "LGA 1700, ATX, DDR5", compatibility: "Intel" },
    { id: "m2", name: "MSI MAG B650 Tomahawk", price: 219.99, specs: "AM5, ATX, DDR5", compatibility: "AMD" },
    { id: "m3", name: "Gigabyte Z790 AORUS Elite", price: 299.99, specs: "LGA 1700, ATX, DDR5", compatibility: "Intel" },
    { id: "m4", name: "ASUS ROG Strix B650E-F", price: 259.99, specs: "AM5, ATX, DDR5", compatibility: "AMD" },
    { id: "m5", name: "MSI PRO Z790-A MAX WIFI", price: 239.99, specs: "LGA 1700, ATX, DDR5", compatibility: "Intel" },
    { id: "m6", name: "Gigabyte X670E AORUS Master", price: 489.99, specs: "AM5, E-ATX, DDR5", compatibility: "AMD" },
    { id: "m7", name: "ASRock Z790 Taichi", price: 479.99, specs: "LGA 1700, E-ATX, DDR5", compatibility: "Intel" },
  ],
  "MEMORY": [
    { id: "r1", name: "Corsair Dominator 64GB", price: 315.00, specs: "DDR5-6000 CL30 2×32GB", compatibility: "Universal" },
    { id: "r2", name: "G.Skill Trident Z5 32GB", price: 189.99, specs: "DDR5-5600 CL36 2×16GB", compatibility: "Universal" },
    { id: "r3", name: "Corsair Vengeance 32GB", price: 119.99, specs: "DDR5-6000 CL36 2x16GB", compatibility: "Universal" },
    { id: "r4", name: "Kingston FURY Beast 64GB", price: 249.99, specs: "DDR5-5600 CL40 2x32GB", compatibility: "Universal" },
    { id: "r5", name: "TeamGroup T-Force Delta RGB 32GB", price: 109.99, specs: "DDR5-6000 CL30 2x16GB", compatibility: "Universal" },
    { id: "r6", name: "G.Skill Flare X5 Series 32GB", price: 104.99, specs: "DDR5-6000 CL32 2x16GB", compatibility: "Universal" },
  ],
  "GRAPHICS CARDS": [
    { id: "g1", name: "RTX 4090 Founders Ed.", price: 1599.99, specs: "24GB GDDR6X · 450W TDP", compatibility: "Universal" },
    { id: "g2", name: "RTX 4080 Super", price: 999.99, specs: "16GB GDDR6X · 320W TDP", compatibility: "Universal" },
    { id: "g3", name: "RX 7900 XTX", price: 949.99, specs: "24GB GDDR6 · 355W TDP", compatibility: "Universal" },
    { id: "g4", name: "RTX 4070 Ti Super", price: 799.99, specs: "16GB GDDR6X · 285W TDP", compatibility: "Universal" },
    { id: "g5", name: "RX 7800 XT", price: 499.99, specs: "16GB GDDR6 · 263W TDP", compatibility: "Universal" },
    { id: "g6", name: "RTX 4060 Ti", price: 399.99, specs: "8GB GDDR6 · 160W TDP", compatibility: "Universal" },
    { id: "g7", name: "RX 7600", price: 269.99, specs: "8GB GDDR6 · 165W TDP", compatibility: "Universal" },
  ],
  "SSD & NVME": [
    { id: "s1", name: "Samsung 990 PRO 2TB", price: 169.99, specs: "PCIe 4.0 · 7450MB/s", compatibility: "Universal" },
    { id: "s2", name: "WD Black SN850X 2TB", price: 159.99, specs: "PCIe 4.0 · 7300MB/s", compatibility: "Universal" },
    { id: "s3", name: "Crucial T700 2TB", price: 269.99, specs: "PCIe 5.0 · 12400MB/s", compatibility: "Universal" },
    { id: "s4", name: "Solidigm P44 Pro 2TB", price: 169.99, specs: "PCIe 4.0 · 7000MB/s", compatibility: "Universal" },
    { id: "s5", name: "Corsair MP600 PRO XT 2TB", price: 189.99, specs: "PCIe 4.0 · 7100MB/s", compatibility: "Universal" },
    { id: "s6", name: "Kingston KC3000 2TB", price: 159.99, specs: "PCIe 4.0 · 7000MB/s", compatibility: "Universal" },
  ],
  "EXTRA SSD & NVME": [
    { id: "es1", name: "Crucial P3 Plus 2TB", price: 119.99, specs: "PCIe 4.0 · Secondary", compatibility: "Universal" },
    { id: "es2", name: "Samsung 870 EVO 1TB", price: 79.99, specs: 'SATA SSD 2.5"', compatibility: "Universal" },
    { id: "es3", name: "TeamGroup MP34 4TB", price: 209.99, specs: "PCIe 3.0 · Secondary", compatibility: "Universal" },
    { id: "es4", name: "Crucial MX500 2TB", price: 139.99, specs: 'SATA SSD 2.5"', compatibility: "Universal" },
    { id: "es5", name: "WD Blue SN580 2TB", price: 109.99, specs: "PCIe 4.0 · Secondary", compatibility: "Universal" },
    { id: "es6", name: "SanDisk Ultra 3D 1TB", price: 84.99, specs: 'SATA SSD 2.5"', compatibility: "Universal" },
  ],
  "HARD DISK": [
    { id: "h1", name: "Seagate BarraCuda 4TB", price: 89.99, specs: "7200 RPM · 256MB Cache", compatibility: "Universal" },
    { id: "h2", name: "WD Gold 4TB", price: 99.99, specs: "7200 RPM · 512MB Cache", compatibility: "Universal" },
    { id: "h3", name: "Seagate IronWolf Pro 8TB", price: 219.99, specs: "7200 RPM · 256MB Cache", compatibility: "Universal" },
    { id: "h4", name: "WD Red Plus 8TB", price: 189.99, specs: "5640 RPM · 256MB Cache", compatibility: "Universal" },
    { id: "h5", name: "Toshiba X300 6TB", price: 139.99, specs: "7200 RPM · 256MB Cache", compatibility: "Universal" },
    { id: "h6", name: "Seagate Exos X18 16TB", price: 289.99, specs: "7200 RPM · 256MB Cache", compatibility: "Universal" },
  ],
  "EXTRA HARD DISK": [
    { id: "eh1", name: "WD Blue 4TB", price: 84.99, specs: "5400 RPM · 256MB Cache", compatibility: "Universal" },
    { id: "eh2", name: "Seagate BarraCuda 2TB", price: 54.99, specs: "7200 RPM · 256MB Cache", compatibility: "Universal" },
    { id: "eh3", name: "WD Blue 2TB", price: 59.99, specs: "7200 RPM · 256MB Cache", compatibility: "Universal" },
    { id: "eh4", name: "Toshiba P300 3TB", price: 74.99, specs: "5400 RPM · 128MB Cache", compatibility: "Universal" },
    { id: "eh5", name: "Seagate IronWolf 4TB", price: 99.99, specs: "5400 RPM · 256MB Cache", compatibility: "Universal" },
  ],
  "POWER SUPPLY": [
    { id: "p1", name: "Corsair RM1000x", price: 209.99, specs: "1000W · 80+ Gold Modular", compatibility: "Universal" },
    { id: "p2", name: "Seasonic Vertex GX-850", price: 179.99, specs: "850W · 80+ Gold Modular", compatibility: "Universal" },
    { id: "p3", name: "EVGA SuperNOVA 850 G6", price: 149.99, specs: "850W · 80+ Gold Modular", compatibility: "Universal" },
    { id: "p4", name: "be quiet! Dark Power 13", price: 289.99, specs: "1000W · 80+ Titanium Modular", compatibility: "Universal" },
    { id: "p5", name: "MSI MPG A850G", price: 129.99, specs: "850W · 80+ Gold PCIE5", compatibility: "Universal" },
    { id: "p6", name: "Thermaltake Toughpower GF3", price: 159.99, specs: "1000W · 80+ Gold ATX 3.0", compatibility: "Universal" },
  ],
  "COOLERS": [
    { id: "cl1", name: "NZXT Kraken Elite 360", price: 279.99, specs: "360mm AIO · LCD Screen", compatibility: "Universal" },
    { id: "cl2", name: "Noctua NH-D15", price: 109.99, specs: "Dual-Tower Air · 6 Heatpipes", compatibility: "Universal" },
    { id: "cl3", name: "Thermalright Peerless Assassin 120", price: 34.90, specs: "Dual-Tower Air · 6 Heatpipes", compatibility: "Universal" },
    { id: "cl4", name: "Corsair iCUE H150i ELITE", price: 219.99, specs: "360mm AIO · RGB", compatibility: "Universal" },
    { id: "cl5", name: "Arctic Liquid Freezer III 360", price: 119.99, specs: "360mm AIO · VRM Fan", compatibility: "Universal" },
    { id: "cl6", name: "DeepCool AK620", price: 59.99, specs: "Dual-Tower Air · 6 Heatpipes", compatibility: "Universal" },
  ],
  "FANS": [
    { id: "f1", name: "Lian Li UNI FAN SL120 3pk", price: 89.99, specs: "120mm ARGB · Daisy-Chain", compatibility: "Universal" },
    { id: "f2", name: "Corsair LL120 3-Pack", price: 79.99, specs: "120mm Dual RGB Loop", compatibility: "Universal" },
    { id: "f3", name: "be quiet! Silent Wings 4", price: 69.99, specs: "120mm PWM · Ultra-Silent", compatibility: "Universal" },
    { id: "f4", name: "Phanteks T30-120 3-Pack", price: 84.99, specs: "120mm PWM · 30mm Thick", compatibility: "Universal" },
    { id: "f5", name: "Noctua NF-A12x25 PWM", price: 32.90, specs: "120mm PWM · Premium Quiet", compatibility: "Universal" },
    { id: "f6", name: "Arctic P12 PWM PST 5-Pack", price: 34.99, specs: "120mm PWM · Daisy-Chain", compatibility: "Universal" },
    { id: "f7", name: "Corsair AF120 RGB Elite 3-Pack", price: 89.99, specs: "120mm RGB · Air Guide", compatibility: "Universal" },
  ],
};

const CHIPSET_THEME = {
  AMD: { accent: "#ef4444", glow: "rgba(239,68,68,0.35)", badge: "bg-red-500/10 text-red-400 border-red-500/20" },
  Intel: { accent: "#3b82f6", glow: "rgba(59,130,246,0.35)", badge: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
};

// ─────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────
export default function InteractiveBuildPage() {
  const [chipset, setChipset] = useState<Chipset>(null);
  const [selectedParts, setSelectedParts] = useState<Partial<Record<Category, Part>>>({});
  const [hoveredZone, setHoveredZone] = useState<Category | null>(null);
  const [popupCat, setPopupCat] = useState<Category | null>(null);
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openPopup = useCallback((cat: Category, clientX: number, clientY: number) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setHoveredZone(cat);
    setPopupCat(cat);
    setPopupPos({ x: clientX, y: clientY });
  }, []);

  const beginClose = useCallback(() => {
    hoverTimer.current = setTimeout(() => {
      setHoveredZone(null);
      setPopupCat(null);
    }, 220);
  }, []);

  const cancelClose = useCallback(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  }, []);

  const handleSelect = useCallback((cat: Category, part: Part, e: React.MouseEvent) => {
    setSelectedParts(prev => ({ ...prev, [cat]: part }));
    triggerFlyAnimation(e);
    setPopupCat(null);
    setHoveredZone(null);
  }, []);

  // ── CHIPSET SELECTION SCREEN ──────────────────────────────
  if (!chipset) {
    return (
      <div className="fixed inset-0 z-50 flex w-full h-screen bg-[#030305] overflow-hidden">
        <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.025]"
          style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,#fff 2px,#fff 3px)" }} />

        {/* AMD */}
        <div onClick={() => setChipset("AMD")}
          className="w-1/2 h-full relative cursor-pointer group border-r border-white/5 overflow-hidden flex items-center justify-center">
          <div className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-red-900/0 to-red-900/0 group-hover:from-red-900/20 group-hover:to-transparent transition-all duration-700 z-10" />
          <div className="z-20 text-center transform group-hover:scale-105 transition-all duration-500 select-none">
            <div className="mb-3 inline-block px-3 py-1 border border-red-500/30 bg-red-500/5 rounded-full text-red-400 text-[9px] font-bold tracking-[0.3em] uppercase">Platform Select</div>
            <h2 className="text-8xl font-black text-white mb-2 tracking-tighter" style={{ textShadow: "0 0 80px rgba(239,68,68,0.5)" }}>AMD</h2>
            <p className="text-red-400/70 font-semibold tracking-[0.2em] uppercase text-sm">Team Red · Ryzen Platform</p>
            <div className="mt-5 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
          </div>
          <div className="pointer-events-none absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-red-500/20 group-hover:border-red-500/60 transition-colors duration-500" />
          <div className="pointer-events-none absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-red-500/20 group-hover:border-red-500/60 transition-colors duration-500" />
          <div className="pointer-events-none absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-red-500/20 group-hover:border-red-500/60 transition-colors duration-500" />
          <div className="pointer-events-none absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-red-500/20 group-hover:border-red-500/60 transition-colors duration-500" />
        </div>

        {/* Intel */}
        <div onClick={() => setChipset("Intel")}
          className="w-1/2 h-full relative cursor-pointer group overflow-hidden flex items-center justify-center">
          <div className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-bl from-blue-900/0 to-blue-900/0 group-hover:from-blue-900/20 group-hover:to-transparent transition-all duration-700 z-10" />
          <div className="z-20 text-center transform group-hover:scale-105 transition-all duration-500 select-none">
            <div className="mb-3 inline-block px-3 py-1 border border-blue-500/30 bg-blue-500/5 rounded-full text-blue-400 text-[9px] font-bold tracking-[0.3em] uppercase">Platform Select</div>
            <h2 className="text-8xl font-black text-white mb-2 tracking-tighter" style={{ textShadow: "0 0 80px rgba(59,130,246,0.5)" }}>Intel</h2>
            <p className="text-blue-400/70 font-semibold tracking-[0.2em] uppercase text-sm">Team Blue · Core Platform</p>
            <div className="mt-5 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
          </div>
          <div className="pointer-events-none absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-blue-500/20 group-hover:border-blue-500/60 transition-colors duration-500" />
          <div className="pointer-events-none absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-blue-500/20 group-hover:border-blue-500/60 transition-colors duration-500" />
          <div className="pointer-events-none absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-blue-500/20 group-hover:border-blue-500/60 transition-colors duration-500" />
          <div className="pointer-events-none absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-blue-500/20 group-hover:border-blue-500/60 transition-colors duration-500" />
        </div>

        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-[#030305] border border-white/10 rounded-full flex items-center justify-center font-black text-slate-500 text-xs">
          VS
        </div>
      </div>
    );
  }

  const theme = CHIPSET_THEME[chipset];

  return (
    <div className="w-full max-w-[1700px] mx-auto px-4 py-6 relative min-h-screen flex gap-6">
      {/* LEFT: Canvas */}
      <div className="flex-1 relative bg-[#03030a] border border-white/5 rounded-3xl flex flex-col items-center justify-center p-6 min-h-[720px]">
        {/* Decorative overlays — pointer-events-none so they never block zone clicks */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.02] rounded-3xl"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="pointer-events-none absolute inset-0 opacity-[0.018] rounded-3xl"
          style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,#fff 2px,#fff 3px)" }} />
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[260px] opacity-[0.08]"
          style={{ background: `radial-gradient(ellipse at top, ${theme.glow}, transparent 70%)` }} />

        {/* Header */}
        <div className="pointer-events-none absolute top-18 left-0 right-0 flex items-center justify-between px-6 py-4 border-b border-white/[0.04] z-30">
          <button className="pointer-events-auto text-[10px] font-bold px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md transition-colors text-slate-400 tracking-widest uppercase"
            onClick={() => { setChipset(null); setSelectedParts({}); setHoveredZone(null); setPopupCat(null); }}>
            ← Change Platform ({chipset})
          </button>
          <span className="text-[9px] text-white/15 font-bold tracking-[0.35em] uppercase">PC Builder · 3D Configurator</span>
          <span className={`px-3 py-1 rounded-full text-[10px] font-black border ${theme.badge}`}>{chipset} Platform</span>
        </div>

        {/* 3D Case Diagram */}
        <div className="mt-8 w-full" style={{ maxWidth: "min(820px, 100%)" }}>
          <PCCaseDiagram
            hoveredZone={hoveredZone}
            selectedParts={selectedParts}
            onEnter={openPopup}
            onLeave={beginClose}
            theme={theme}
          />
        </div>

        <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-[9px] text-white/15 tracking-widest uppercase font-medium whitespace-nowrap">
          Hover any zone to configure · {Object.keys(selectedParts).length} / 12 selected
        </p>
      </div>

      {/* RIGHT: Live Invoice */}
      <LiveInvoice selectedParts={selectedParts} chipset={chipset} theme={theme} />

      {/* HOVER POPUP (portal-like fixed overlay) */}
      {popupCat && (
        <HoverPopup
          cat={popupCat}
          pos={popupPos}
          chipset={chipset}
          theme={theme}
          selectedParts={selectedParts}
          onSelect={(part, e) => handleSelect(popupCat, part, e)}
          onEnter={cancelClose}
          onLeave={beginClose}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// HOVER POPUP  — appears at cursor, stays open while in zone or popup
// ─────────────────────────────────────────────────────────────
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

function HoverPopup({ cat, pos, chipset, theme, selectedParts, onSelect, onEnter, onLeave }: HoverPopupProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(ref.current,
      { scale: 0.88, opacity: 0, y: 10 },
      { scale: 1, opacity: 1, y: 0, duration: 0.22, ease: "back.out(1.8)" }
    );
  }, []);

  const parts = (MOCK_DATA[cat] ?? []).filter(
    p => p.compatibility === "Universal" || p.compatibility === chipset
  );

  const POPUP_W = 285;

  // Smart positioning: flip left if near right edge, flip up if near bottom
  const vw = typeof window !== "undefined" ? window.innerWidth : 1400;
  const vh = typeof window !== "undefined" ? window.innerHeight : 900;
  const APPROX_H = Math.min(parts.length * 92 + 70, 420);

  let left = pos.x + 18;
  let top = pos.y - 30;
  if (left + POPUP_W > vw - 16) left = pos.x - POPUP_W - 18;
  if (top + APPROX_H > vh - 16) top = vh - APPROX_H - 16;
  if (top < 70) top = 70;

  const accent = theme.accent;

  return (
    <div
      ref={ref}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: "fixed",
        left,
        top,
        width: POPUP_W,
        zIndex: 9999,
        background: "rgba(4,4,16,0.97)",
        border: `1px solid ${accent}44`,
        borderRadius: 18,
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        boxShadow: `0 24px 70px rgba(0,0,0,0.85), 0 0 0 1px ${accent}18, 0 0 50px ${accent}14`,
        padding: "14px 14px 10px",
        maxHeight: 440,
        overflowY: "auto",
        overflowX: "hidden",
        cursor: "default",
      }}>

      {/* Header */}
      <div style={{ marginBottom: 11, paddingBottom: 10, borderBottom: `1px solid ${accent}22` }}>
        <div style={{ fontSize: 8, fontWeight: 900, letterSpacing: "0.28em", color: accent, textTransform: "uppercase", marginBottom: 3, fontFamily: '"Courier New",monospace' }}>
          Configure Component
        </div>
        <div style={{ fontSize: 14, fontWeight: 900, color: "#fff", letterSpacing: "-0.01em" }}>{cat}</div>
        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", marginTop: 2, fontFamily: '"Courier New",monospace', letterSpacing: "0.06em" }}>
          {chipset} Platform · {parts.length} option{parts.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Parts list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {parts.length === 0 && (
          <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, textAlign: "center", padding: "16px 0" }}>
            No compatible parts found
          </div>
        )}
        {parts.map(part => {
          const isSelected = selectedParts[cat]?.id === part.id;
          return (
            <PartCard
              key={part.id}
              part={part}
              isSelected={isSelected}
              accent={accent}
              onSelect={onSelect}
            />
          );
        })}
      </div>

      {/* Bottom nudge */}
      <div style={{ marginTop: 10, paddingTop: 8, borderTop: `1px solid rgba(255,255,255,0.04)`, textAlign: "center" }}>
        <span style={{ fontSize: 8, color: "rgba(255,255,255,0.18)", letterSpacing: "0.15em", fontFamily: '"Courier New",monospace', textTransform: "uppercase" }}>
          Click Install to add to build
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PART CARD — inside HoverPopup
// ─────────────────────────────────────────────────────────────
function PartCard({ part, isSelected, accent, onSelect }: {
  part: Part;
  isSelected: boolean;
  accent: string;
  onSelect: (part: Part, e: React.MouseEvent) => void;
}) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: isSelected ? `${accent}1a` : hov ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.028)",
        border: `1px solid ${isSelected ? accent + "55" : hov ? accent + "33" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 12,
        padding: "10px 12px",
        transition: "background 0.15s, border-color 0.15s",
      }}>
      {/* Name row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 6, marginBottom: 3 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", lineHeight: 1.35, flex: 1 }}>{part.name}</span>
        {isSelected && <CheckCircle2 size={13} color={accent} style={{ flexShrink: 0, marginTop: 1 }} />}
      </div>
      {/* Specs */}
      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.38)", marginBottom: 8, fontFamily: '"Courier New",monospace', letterSpacing: "0.04em" }}>
        {part.specs}
      </div>
      {/* Price + button */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 15, fontWeight: 900, color: "#fff" }}>
          ${part.price.toFixed(2)}
        </span>
        <button
          onClick={e => onSelect(part, e)}
          style={{
            background: isSelected ? accent : `${accent}20`,
            color: isSelected ? "#000" : accent,
            border: `1px solid ${accent}55`,
            borderRadius: 7,
            padding: "5px 12px",
            fontSize: 9,
            fontWeight: 900,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "background 0.15s, color 0.15s",
            fontFamily: "inherit",
          }}
          onMouseEnter={e => {
            if (!isSelected) {
              (e.currentTarget as HTMLButtonElement).style.background = accent;
              (e.currentTarget as HTMLButtonElement).style.color = "#000";
            }
          }}
          onMouseLeave={e => {
            if (!isSelected) {
              (e.currentTarget as HTMLButtonElement).style.background = `${accent}20`;
              (e.currentTarget as HTMLButtonElement).style.color = accent;
            }
          }}>
          {isSelected ? "✓ Installed" : "Install"}
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ZONE — interactive hotspot in the SVG
// ─────────────────────────────────────────────────────────────
interface ZoneProps {
  cat: Category;
  x: number; y: number; w: number; h: number;
  label: string;
  labelPos?: "c" | "t" | "b";
  hoveredZone: Category | null;
  selectedParts: Partial<Record<Category, Part>>;
  onEnter: (cat: Category, clientX: number, clientY: number) => void;
  onLeave: () => void;
  accent: string;
}

function Zone({ cat, x, y, w, h, label, labelPos = "c", hoveredZone, selectedParts, onEnter, onLeave, accent }: ZoneProps) {
  const isHov = hoveredZone === cat;
  const isSel = !!selectedParts[cat];
  const s = 5;

  const stroke = isHov ? accent : isSel ? `${accent}99` : "rgba(255,255,255,0.22)";
  const fill   = isHov ? `${accent}22` : isSel ? `${accent}1a` : "rgba(255,255,255,0.025)";
  const lColor = isHov ? accent : isSel ? `${accent}dd` : "rgba(255,255,255,0.45)";

  const displayLabel = isSel
    ? (selectedParts[cat]!.name.slice(0, 14) + (selectedParts[cat]!.name.length > 14 ? "…" : ""))
    : label;

  let ty = y + h / 2;
  let tdb: "middle" | "auto" = "middle";
  if (labelPos === "t") { ty = y + 9; tdb = "auto"; }
  if (labelPos === "b") { ty = y + h - 7; tdb = "auto"; }

  const ls = {
    fontSize: "8px",
    fontFamily: '"Courier New",monospace',
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    pointerEvents: "none" as const,
    userSelect: "none" as const,
  };

  return (
    <g
      onMouseEnter={e => onEnter(cat, e.clientX, e.clientY)}
      onMouseLeave={onLeave}
      style={{ cursor: "pointer" }}>
      {/* Glow halo when hovered */}
      {isHov && <rect x={x-5} y={y-5} width={w+10} height={h+10} rx={4} fill={`${accent}09`} stroke={`${accent}30`} strokeWidth={1} />}
      <rect x={x} y={y} width={w} height={h} rx={1.5} fill={fill} stroke={stroke} strokeWidth={isHov ? 1.5 : 1} />
      {/* Corner ticks */}
      <path d={`M${x},${y+s}L${x},${y}L${x+s},${y}`} stroke={stroke} strokeWidth="1.2" fill="none" />
      <path d={`M${x+w-s},${y}L${x+w},${y}L${x+w},${y+s}`} stroke={stroke} strokeWidth="1.2" fill="none" />
      <path d={`M${x},${y+h-s}L${x},${y+h}L${x+s},${y+h}`} stroke={stroke} strokeWidth="1.2" fill="none" />
      <path d={`M${x+w-s},${y+h}L${x+w},${y+h}L${x+w},${y+h-s}`} stroke={stroke} strokeWidth="1.2" fill="none" />
      <text x={x + w / 2} y={ty} textAnchor="middle" dominantBaseline={tdb} fill={lColor} style={ls}>{displayLabel}</text>
      {isSel && <circle cx={x + w - 7} cy={y + 7} r={2.5} fill={accent} />}
    </g>
  );
}

// ─────────────────────────────────────────────────────────────
// FAN CIRCLE
// ─────────────────────────────────────────────────────────────
function FanCircle({ cx, cy, rx: frx = 0, ry: fry = 0, r = 0, isFlat = false }: {
  cx: number; cy: number; rx?: number; ry?: number; r?: number; isFlat?: boolean;
}) {
  if (isFlat) {
    return (
      <g pointerEvents="none">
        <ellipse cx={cx} cy={cy} rx={frx} ry={fry} fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.13)" strokeWidth="0.8" />
        <ellipse cx={cx} cy={cy} rx={frx * 0.65} ry={fry * 0.65} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.7" />
        <ellipse cx={cx} cy={cy} rx={frx * 0.18} ry={fry * 0.18} fill="rgba(255,255,255,0.12)" />
        <line x1={cx} y1={cy - fry} x2={cx} y2={cy + fry} stroke="rgba(255,255,255,0.06)" strokeWidth="0.6" />
        <line x1={cx - frx} y1={cy} x2={cx + frx} y2={cy} stroke="rgba(255,255,255,0.06)" strokeWidth="0.6" />
      </g>
    );
  }
  return (
    <g pointerEvents="none">
      <circle cx={cx} cy={cy} r={r} fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.13)" strokeWidth="0.8" />
      <circle cx={cx} cy={cy} r={r * 0.65} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.7" />
      <circle cx={cx} cy={cy} r={r * 0.18} fill="rgba(255,255,255,0.12)" />
      <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} stroke="rgba(255,255,255,0.06)" strokeWidth="0.6" />
      <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} stroke="rgba(255,255,255,0.06)" strokeWidth="0.6" />
      <line x1={cx - r * 0.707} y1={cy - r * 0.707} x2={cx + r * 0.707} y2={cy + r * 0.707} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
      <line x1={cx + r * 0.707} y1={cy - r * 0.707} x2={cx - r * 0.707} y2={cy + r * 0.707} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
    </g>
  );
}

// ─────────────────────────────────────────────────────────────
// 3D PC CASE DIAGRAM
// ─────────────────────────────────────────────────────────────
interface DiagramProps {
  hoveredZone: Category | null;
  selectedParts: Partial<Record<Category, Part>>;
  onEnter: (cat: Category, clientX: number, clientY: number) => void;
  onLeave: () => void;
  theme: { accent: string; glow: string };
}

function PCCaseDiagram({ hoveredZone, selectedParts, onEnter, onLeave, theme }: DiagramProps) {
  const accent = theme.accent;

  // ── 3D GEOMETRY ──────────────────────────────────────────
  const GX1 = 178, GY1 = 62, GX2 = 645, GY2 = 550;
  const GW = GX2 - GX1, GH = GY2 - GY1;
  const LDX = 82, LDY = 28, RDX = 72, RDY = 28;
  const LTL = [GX1 - LDX, GY1 + LDY];
  const LBL = [GX1 - LDX, GY2 + LDY];
  const RTR = [GX2 + RDX, GY1 + RDY];
  const RBR = [GX2 + RDX, GY2 + RDY];
  const poly = (...pts: number[][]) => pts.map(p => `${p[0]},${p[1]}`).join(" ");

  function gp(x1p: number, y1p: number, x2p: number, y2p: number) {
    return { x: GX1 + GW * x1p, y: GY1 + GH * y1p, w: GW * (x2p - x1p), h: GH * (y2p - y1p) };
  }

  const zFill = (cat: Category) => {
    if (hoveredZone === cat) return `${accent}22`;
    if (selectedParts[cat]) return `${accent}1a`;
    return "rgba(255,255,255,0.025)";
  };
  const zStroke = (cat: Category) => {
    if (hoveredZone === cat) return accent;
    if (selectedParts[cat]) return `${accent}99`;
    return "rgba(255,255,255,0.22)";
  };

  // Shared Zone props
  const zp = { hoveredZone, selectedParts, onEnter, onLeave, accent };

  const LS = {
    fontSize: "8px",
    fontFamily: '"Courier New",monospace',
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    pointerEvents: "none" as const,
    userSelect: "none" as const,
  };

  return (
    <svg viewBox="0 0 840 640" width="100%" style={{ display: "block", overflow: "visible" }}>
      <defs>
        <filter id="f-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="f-soft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="f-sharp" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <linearGradient id="g-glass" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#0d0d22" />
          <stop offset="60%" stopColor="#07071a" />
          <stop offset="100%" stopColor="#050510" />
        </linearGradient>
        <linearGradient id="g-glass-sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
          <stop offset="30%" stopColor="rgba(255,255,255,0.02)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <linearGradient id="g-back" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#010107" /><stop offset="100%" stopColor="#04040e" />
        </linearGradient>
        <linearGradient id="g-front" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#04040e" /><stop offset="100%" stopColor="#010107" />
        </linearGradient>
        <linearGradient id="g-top" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#05051a" /><stop offset="100%" stopColor="#090922" />
        </linearGradient>
        <linearGradient id="g-bottom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#040412" /><stop offset="100%" stopColor="#020208" />
        </linearGradient>
        <linearGradient id="g-mobo" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#0e0e2c" /><stop offset="100%" stopColor="#09091e" />
        </linearGradient>
        <linearGradient id="g-psu" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0a0a20" /><stop offset="100%" stopColor="#060615" />
        </linearGradient>
        <linearGradient id={`g-edge-${accent.replace('#', '')}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="25%" stopColor={accent} />
          <stop offset="75%" stopColor={accent} />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <pattern id="p-scan" x="0" y="0" width="1" height="4" patternUnits="userSpaceOnUse">
          <rect y="0" width="1" height="1" fill="rgba(255,255,255,0.013)" />
        </pattern>
        <pattern id="p-grid" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M28 0L0 0 0 28" fill="none" stroke="rgba(255,255,255,0.032)" strokeWidth="0.5" />
        </pattern>
        <pattern id="p-pcb" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0L0 0 0 20" fill="none" stroke="rgba(60,120,255,0.06)" strokeWidth="0.4" />
        </pattern>
        <clipPath id="c-glass"><rect x={GX1} y={GY1} width={GW} height={GH} /></clipPath>
        <clipPath id="c-back"><polygon points={poly(LTL, [GX1, GY1], [GX1, GY2], LBL)} /></clipPath>
        <clipPath id="c-front"><polygon points={poly([GX2, GY1], RTR, RBR, [GX2, GY2])} /></clipPath>
        <clipPath id="c-top"><polygon points={poly(LTL, [GX1, GY1], [GX2, GY1], RTR)} /></clipPath>
      </defs>

      {/* ── ALL NON-INTERACTIVE DECORATIVE ELEMENTS ── */}
      <g pointerEvents="none">
        <ellipse cx={407} cy={608} rx={315} ry={14} fill="rgba(0,0,0,0.65)" />
        <ellipse cx={407} cy={612} rx={270} ry={8} fill="rgba(0,0,0,0.4)" />

        <polygon points={poly([GX1,GY2],[GX2,GY2],RBR,LBL)} fill="url(#g-bottom)" stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
        {([
          [GX1-LDX+12, GY2+LDY+2], [GX1-LDX+70, GY2+LDY-3],
          [GX2+RDX-70, GY2+RDY-3], [GX2+RDX-12, GY2+RDY+2],
        ] as [number,number][]).map(([fx,fy],i) => (
          <rect key={i} x={fx-14} y={fy} width={28} height={11} rx={3} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth={0.7} />
        ))}

        <polygon points={poly(LTL,[GX1,GY1],[GX1,GY2],LBL)} fill="url(#g-back)" stroke="rgba(255,255,255,0.09)" strokeWidth={1} />
        <g clipPath="url(#c-back)" fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth={0.65}>
          {[272,283,294,305,316,327,338,350,362,374,386].map((yy,i) => (
            <rect key={i} x={108} y={yy} width={22} height={i%3===2?9:8} rx={1} />
          ))}
          <rect x={108} y={395} width={22} height={14} rx={1} />
          <rect x={108} y={412} width={22} height={14} rx={1} />
        </g>
        <g clipPath="url(#c-back)"><FanCircle cx={127} cy={127} r={23} /></g>

        <polygon points={poly([GX2,GY1],RTR,RBR,[GX2,GY2])} fill="url(#g-front)" stroke="rgba(255,255,255,0.09)" strokeWidth={1} />
        <g clipPath="url(#c-front)" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={0.65}>
          <rect x={650} y={72} width={42} height={14} rx={2} />
          <circle cx={662} cy={79} r={3} />
          <rect x={667} y={75} width={8} height={6} rx={1} />
          <rect x={676} y={75} width={8} height={6} rx={1} />
        </g>
        <g clipPath="url(#c-front)">
          {[165,315,460].map((fy,i) => <FanCircle key={i} cx={678} cy={fy+27} r={24} />)}
        </g>

        <polygon points={poly(LTL,[GX1,GY1],[GX2,GY1],RTR)} fill="url(#g-top)" stroke="rgba(255,255,255,0.09)" strokeWidth={1} />
        <g clipPath="url(#c-top)">
          {[310,430,555].map((fx,i) => {
            const t = (fx-GX1)/GW;
            const fy = GY1-(GY1-LTL[1])*(1-t)*0.35+4;
            return <FanCircle key={i} cx={fx} cy={fy+12} rx={22} ry={10} isFlat />;
          })}
          {[270,300,330,360,390,420,450,480,510,540,570,600].map((fx,i) => (
            <line key={i} x1={fx} y1={GY1-1} x2={fx+(LDX*(1-(fx-GX1)/GW)*0.3)} y2={LTL[1]-1} stroke="rgba(255,255,255,0.05)" strokeWidth={0.6} />
          ))}
        </g>

        <rect x={GX1} y={GY1} width={GW} height={GH} fill="url(#g-glass)" />
        <rect x={GX1} y={GY1} width={GW} height={GH} fill="url(#p-scan)" />
        <rect x={GX1} y={GY1} width={GW} height={GH} fill="url(#p-grid)" />
        <rect x={GX1} y={GY1} width={GW} height={GH} fill="url(#g-glass-sheen)" />

        <rect x={GX1+15} y={GY1+28} width={225} height={290} rx={3} fill="url(#g-mobo)" stroke="rgba(80,100,255,0.12)" strokeWidth={0.8} />
        <rect x={GX1+15} y={GY1+28} width={225} height={290} fill="url(#p-pcb)" clipPath="url(#c-glass)" />
        <g stroke="rgba(60,100,255,0.07)" strokeWidth={0.6} fill="none" clipPath="url(#c-glass)">
          <line x1={GX1+30} y1={GY1+28} x2={GX1+30} y2={GY1+318} />
          <line x1={GX1+80} y1={GY1+28} x2={GX1+80} y2={GY1+318} />
          <line x1={GX1+140} y1={GY1+28} x2={GX1+140} y2={GY1+318} />
          <line x1={GX1+200} y1={GY1+28} x2={GX1+200} y2={GY1+318} />
          <line x1={GX1+15} y1={GY1+90} x2={GX1+240} y2={GY1+90} />
          <line x1={GX1+15} y1={GY1+165} x2={GX1+240} y2={GY1+165} />
          <line x1={GX1+15} y1={GY1+240} x2={GX1+240} y2={GY1+240} />
        </g>
        <rect x={GX1+302} y={GY1+25} width={128} height={290} rx={3} fill="rgba(8,8,22,0.92)" stroke="rgba(255,255,255,0.06)" strokeWidth={0.8} />
        <rect x={GX1+12} y={GY1+402} width={240} height={82} rx={3} fill="url(#g-psu)" stroke="rgba(255,255,255,0.06)" strokeWidth={0.8} />
        <g fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={0.8}>
          {[450,465,480].map(yy => <circle key={yy} cx={GX1+255} cy={yy} r={4} />)}
        </g>
        <g fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth={0.7}>
          {[368,378,388,398,408,418].map((yy,i) => (
            <rect key={i} x={GX1+1} y={yy} width={16} height={7} rx={1} />
          ))}
        </g>

        <g stroke={selectedParts["POWER SUPPLY"] ? `${accent}50` : "rgba(255,255,255,0.05)"} strokeWidth={1.3} fill="none" clipPath="url(#c-glass)">
          <path d={`M${GX1+200},${GY1+402} Q${GX1+220},${GY1+385} ${GX1+240},${GY1+368} Q${GX1+260},${GY1+352} ${GX1+280},${GY1+340}`} strokeDasharray="4 2.5" />
          <path d={`M${GX1+220},${GY1+402} Q${GX1+250},${GY1+382} ${GX1+280},${GY1+362} Q${GX1+310},${GY1+343} ${GX1+340},${GY1+332}`} strokeDasharray="4 2.5" />
          <path d={`M${GX1+175},${GY1+402} Q${GX1+195},${GY1+387} ${GX1+210},${GY1+372}`} strokeDasharray="4 2.5" />
        </g>

        {/* 3D edge highlights */}
        <line x1={GX1} y1={GY1} x2={GX2} y2={GY1} stroke={`url(#g-edge-${accent.replace('#','')})`} strokeWidth={1.8} opacity={0.75} filter="url(#f-soft)" />
        <line x1={GX1} y1={GY1} x2={GX1} y2={GY2} stroke={`${accent}66`} strokeWidth={1.5} filter="url(#f-sharp)" />
        <line x1={GX2} y1={GY1} x2={GX2} y2={GY2} stroke={`${accent}33`} strokeWidth={1} />
        <line x1={GX1} y1={GY2} x2={GX2} y2={GY2} stroke={`${accent}22`} strokeWidth={1} />
        <line x1={LTL[0]} y1={LTL[1]} x2={LBL[0]} y2={LBL[1]} stroke="rgba(255,255,255,0.16)" strokeWidth={1.1} />
        <line x1={RTR[0]} y1={RTR[1]} x2={RBR[0]} y2={RBR[1]} stroke="rgba(255,255,255,0.11)" strokeWidth={1} />
        <line x1={LTL[0]} y1={LTL[1]} x2={GX1} y2={GY1} stroke={`${accent}88`} strokeWidth={2} filter="url(#f-soft)" />
        <line x1={GX2} y1={GY1} x2={RTR[0]} y2={RTR[1]} stroke={`${accent}66`} strokeWidth={1.8} filter="url(#f-soft)" />
        <line x1={LTL[0]} y1={LTL[1]} x2={RTR[0]} y2={RTR[1]} stroke={`${accent}55`} strokeWidth={1.5} />
        <line x1={GX1} y1={GY2} x2={LBL[0]} y2={LBL[1]} stroke="rgba(255,255,255,0.07)" strokeWidth={0.9} />
        <line x1={GX2} y1={GY2} x2={RBR[0]} y2={RBR[1]} stroke="rgba(255,255,255,0.07)" strokeWidth={0.9} />
        <line x1={LBL[0]} y1={LBL[1]} x2={RBR[0]} y2={RBR[1]} stroke="rgba(255,255,255,0.04)" strokeWidth={0.8} />

        {/* Corner brackets */}
        <g stroke={accent} strokeWidth={2} fill="none" filter="url(#f-glow)" opacity={0.8}>
          <path d={`M${GX1+22},${GY1} L${GX1},${GY1} L${GX1},${GY1+22}`} />
          <path d={`M${GX2-22},${GY1} L${GX2},${GY1} L${GX2},${GY1+22}`} />
          <path d={`M${GX1+22},${GY2} L${GX1},${GY2} L${GX1},${GY2-22}`} />
          <path d={`M${GX2-22},${GY2} L${GX2},${GY2} L${GX2},${GY2-22}`} />
        </g>
        <g stroke={accent} strokeWidth={1.5} fill="none" filter="url(#f-soft)" opacity={0.55}>
          <path d={`M${LTL[0]},${LTL[1]+18} L${LTL[0]},${LTL[1]} L${LTL[0]+18},${LTL[1]}`} />
          <path d={`M${RTR[0]-18},${RTR[1]} L${RTR[0]},${RTR[1]} L${RTR[0]},${RTR[1]+18}`} />
        </g>

        {/* HUD callouts */}
        <g fill="rgba(255,255,255,0.22)" style={LS}>
          {([
            ["Rear Fan",130,GY1+127,GX1,GY1+127]
          ] as [string,number,number,number,number][]).map(([lbl,tx,ty,ex,ey],i) => (
            <g key={i}>
              <text x={tx-5} y={ty+3} textAnchor="end">{lbl}</text>
              <line x1={tx} y1={ty} x2={ex} y2={ey} stroke="rgba(255,255,255,0.1)" strokeWidth={0.6} strokeDasharray="3 2" />
            </g>
          ))}
          {([
            ["Front Fans",GX2+RDX+5,GY1+192,GX2+RDX-5,GY1+192],
           
          ] as [string,number,number,number,number][]).map(([lbl,tx,ty,ex,ey],i) => (
            <g key={i}>
              <text x={tx+5} y={ty+3}>{lbl}</text>
              <line x1={tx} y1={ty} x2={ex} y2={ey} stroke="rgba(255,255,255,0.1)" strokeWidth={0.6} strokeDasharray="3 2" />
            </g>
          ))}
        </g>

        {/* Status LEDs */}
        {[0,1,2].map(i => (
          <circle key={i} cx={GX2+RDX-20-i*10} cy={GY2+RDY-22} r={2.5}
            fill={
              i===0 ? (selectedParts["POWER SUPPLY"] ? accent : "rgba(255,255,255,0.08)") :
              i===1 ? (Object.keys(selectedParts).length>4 ? accent : "rgba(255,255,255,0.08)") :
                      (Object.keys(selectedParts).length>8 ? accent : "rgba(255,255,255,0.08)")
            } />
        ))}
      </g>{/* end pointerEvents="none" */}

      {/* ── INTERACTIVE ZONE: FAN (rear face) ── */}
      <g onMouseEnter={e => onEnter("FANS", e.clientX, e.clientY)} onMouseLeave={onLeave}
        style={{ cursor: "pointer" }} clipPath="url(#c-back)">
        <rect x={100} y={100} width={55} height={55} rx={4}
          fill={zFill("FANS")} stroke={zStroke("FANS")} strokeWidth={1} />
      </g>

      {/* ── INTERACTIVE ZONE: FAN (front face) ── */}
      <g onMouseEnter={e => onEnter("FANS", e.clientX, e.clientY)} onMouseLeave={onLeave}
        style={{ cursor: "pointer" }} clipPath="url(#c-front)">
        {[165,315,460].map((fy,i) => (
          <rect key={i} x={647} y={fy} width={62} height={55} rx={4}
            fill={zFill("FANS")} stroke={zStroke("FANS")} strokeWidth={1} />
        ))}
      </g>

      {/* ── INTERACTIVE ZONE: FAN (top face) ── */}
      <g onMouseEnter={e => onEnter("FANS", e.clientX, e.clientY)} onMouseLeave={onLeave}
        style={{ cursor: "pointer" }} clipPath="url(#c-top)">
        <rect x={GX1+110} y={LTL[1]} width={RTR[0]-GX1-200} height={GY1-LTL[1]+8} fill="transparent" />
      </g>

      {/* ── PC CASE border ── */}
      <rect x={GX1} y={GY1} width={GW} height={GH} fill="transparent"
        stroke={zStroke("PC CASE")} strokeWidth={hoveredZone === "PC CASE" ? 2 : 1.5}
        onMouseEnter={e => onEnter("PC CASE", e.clientX, e.clientY)} onMouseLeave={onLeave}
        style={{ cursor: "pointer" }} />

      {/* ── COMPONENT HOTSPOT ZONES (topmost z-order) ── */}
      {(() => { const z = gp(0.032,0.055,0.508,0.64); return <Zone cat="MOTHERBOARDS" {...z} label="MOTHERBOARD" labelPos="t" {...zp} />; })()}
      {(() => { const z = gp(0.04,0.065,0.25,0.215); return <Zone cat="COOLERS" {...z} label="COOLER" labelPos="t" {...zp} />; })()}
      {(() => { const z = gp(0.05,0.215,0.175,0.39); return <Zone cat="PROCESSORS" {...z} label="CPU" {...zp} />; })()}
      {(() => { const z = gp(0.26,0.07,0.35,0.49); return <Zone cat="MEMORY" {...z} label="RAM" {...zp} />; })()}
      {(() => { const z = gp(0.08,0.52,0.48,0.60); return <Zone cat="SSD & NVME" {...z} label="NVMe SSD 1" {...zp} />; })()}
      {(() => { const z = gp(0.08,0.61,0.48,0.68); return <Zone cat="EXTRA SSD & NVME" {...z} label="Extra NVMe" {...zp} />; })()}
      {(() => { const z = gp(0.02,0.70,0.82,0.83); return <Zone cat="GRAPHICS CARDS" {...z} label="GRAPHICS CARD (GPU)" {...zp} />; })()}
      {(() => { const z = gp(0.025,0.845,0.528,0.975); return <Zone cat="POWER SUPPLY" {...z} label="PSU" {...zp} />; })()}
      {(() => { const z = gp(0.648,0.058,0.924,0.212); return <Zone cat="EXTRA SSD & NVME" {...z} label='SSD 2.5"' {...zp} />; })()}
      {(() => { const z = gp(0.648,0.24,0.924,0.41); return <Zone cat="HARD DISK" {...z} label='HDD 3.5"' {...zp} />; })()}
      {(() => { const z = gp(0.648,0.44,0.924,0.61); return <Zone cat="EXTRA HARD DISK" {...z} label="Extra HDD" {...zp} />; })()}

      {/* Active pulse indicator */}
      {hoveredZone && (
        <g pointerEvents="none">
          <circle cx={GX1+12} cy={GY2-12} r={4} fill={accent} opacity={0.8}>
            <animate attributeName="r" values="4;8;4" dur="1.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0.1;0.8" dur="1.4s" repeatCount="indefinite" />
          </circle>
          <text x={GX1+GW/2} y={GY2+22} textAnchor="middle" fill={accent} opacity={0.45}
            style={{ ...LS, fontSize: "9px", letterSpacing: "0.2em" }}>
            ▸ {hoveredZone}
          </text>
        </g>
      )}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// LIVE INVOICE
// ─────────────────────────────────────────────────────────────
function LiveInvoice({ selectedParts, chipset, theme }: {
  selectedParts: Partial<Record<Category, Part>>;
  chipset: string;
  theme: { accent: string; glow: string; badge: string };
}) {
  const subtotal = Object.values(selectedParts).reduce((s, p) => s + p!.price, 0);

  return (
    <div className="w-[340px] shrink-0 sticky top-24 h-fit z-40">
      <div id="invoice-sidebar"
        className="backdrop-blur-xl border rounded-3xl p-7 shadow-2xl"
        style={{ background: "rgba(5,5,14,0.93)", borderColor: `${theme.accent}22` }}>

        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="text-[9px] font-bold tracking-[0.3em] uppercase mb-1" style={{ color: theme.accent }}>Build Summary</div>
            <h2 className="text-base font-black text-white flex items-center gap-2">
              <Zap size={15} style={{ color: theme.accent }} /> Configuration Specs
            </h2>
          </div>
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border ${theme.badge}`}>{chipset}</span>
        </div>

        {/* Progress */}
        <div className="mb-5">
          <div className="flex justify-between text-[9px] text-slate-500 mb-1.5 font-bold uppercase tracking-wider">
            <span>Build Progress</span><span>{Object.keys(selectedParts).length} / 12</span>
          </div>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-700"
              style={{ width: `${(Object.keys(selectedParts).length / 12) * 100}%`, background: `linear-gradient(90deg, ${theme.accent}, ${theme.accent}88)` }} />
          </div>
        </div>

        {/* Parts list */}
        <div className="space-y-2.5 mb-6 min-h-[280px] max-h-[45vh] overflow-y-auto pr-1">
          {Object.entries(selectedParts).map(([cat, part]) => (
            <div key={cat} className="flex justify-between items-start border-b border-white/5 pb-2">
              <div className="flex flex-col max-w-[70%]">
                <span className="text-[8px] text-slate-600 font-black uppercase tracking-wider mb-0.5">{cat}</span>
                <span className="text-[11px] text-white font-semibold truncate">{part!.name}</span>
              </div>
              <span className="text-xs font-black text-slate-300">${part!.price.toFixed(2)}</span>
            </div>
          ))}
          {Object.keys(selectedParts).length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-slate-600 pt-16">
              <ShieldCheck size={26} className="mb-3 opacity-30" />
              <p className="text-[10px] text-center px-4 leading-relaxed">
                Hover any highlighted zone on the 3D case to configure your build.
              </p>
            </div>
          )}
        </div>

        <div className="w-full h-px mb-5"
          style={{ background: `linear-gradient(90deg,transparent,${theme.accent}44,transparent)` }} />

        <div className="flex justify-between items-end mb-6">
          <div>
            <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Estimated Total</div>
            <span className="text-sm font-bold text-white">Subtotal</span>
          </div>
          <span className="text-2xl font-black text-transparent bg-clip-text"
            style={{ backgroundImage: `linear-gradient(135deg, ${theme.accent}, #fff)` }}>
            ${subtotal.toFixed(2)}
          </span>
        </div>

        <button disabled={subtotal === 0}
          className="w-full py-3.5 font-black text-[11px] rounded-xl transition-all uppercase tracking-[0.2em] disabled:opacity-30 disabled:cursor-not-allowed"
          style={subtotal > 0 ? { background: theme.accent, color: "#000" } : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.25)" }}>
          Proceed to Order
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// FLY ANIMATION
// ─────────────────────────────────────────────────────────────
function triggerFlyAnimation(e: React.MouseEvent) {
  const invoiceEl = document.getElementById("invoice-sidebar");
  if (!invoiceEl) return;
  const ir = invoiceEl.getBoundingClientRect();

  const dot = document.createElement("div");
  dot.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:10px;height:10px;border-radius:50%;background:currentColor;z-index:99999;pointer-events:none;`;
  document.body.appendChild(dot);

  gsap.to(dot, {
    x: ir.left - e.clientX + 60,
    y: ir.top - e.clientY + 80,
    scale: 0.2,
    opacity: 0,
    duration: 0.55,
    ease: "power2.inOut",
    onComplete: () => {
      dot.remove();
      gsap.fromTo(invoiceEl, { scale: 1.025 }, { scale: 1, duration: 0.25 });
    },
  });
}