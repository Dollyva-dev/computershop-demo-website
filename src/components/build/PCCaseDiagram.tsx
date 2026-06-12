import React from "react";
import { Category, Part, Chipset } from "./types";

interface ZoneProps {
  cat: Category;
  x: number; y: number; w: number; h: number;
  label: string;
  hoveredZone: Category | null;
  selectedParts: Partial<Record<Category, Part>>;
  onEnter: (cat: Category) => void;
  onLeave: () => void;
  onClick: (cat: Category) => void;
  accent: string;
}

function Zone({ cat, x, y, w, h, label, hoveredZone, selectedParts, onEnter, onLeave, onClick, accent }: ZoneProps) {
  const isHov = hoveredZone === cat;
  const isSel = !!selectedParts[cat];

  // Elegant highlighting
  const stroke = isHov ? accent : isSel ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.15)";
  const fill   = isHov ? `${accent}1A` : isSel ? "rgba(255,255,255,0.05)" : "transparent";
  const lColor = isHov ? accent : isSel ? "#fff" : "rgba(255,255,255,0.4)";

  const displayLabel = isSel
    ? (selectedParts[cat]!.name.slice(0, 16) + (selectedParts[cat]!.name.length > 16 ? "…" : ""))
    : label;

  return (
    <g
      onMouseEnter={() => onEnter(cat)}
      onMouseLeave={onLeave}
      onClick={() => onClick(cat)}
      style={{ cursor: "pointer" }}
      className="transition-all duration-300"
    >
      <rect x={x} y={y} width={w} height={h} fill={fill} stroke={stroke} strokeWidth={isHov ? 1.5 : 1} rx={4} />
      
      <text 
        x={x + w / 2} y={y + h / 2} 
        textAnchor="middle" dominantBaseline="middle" 
        fill={lColor} 
        className="font-medium text-[9px] uppercase tracking-widest pointer-events-none select-none"
      >
        {displayLabel}
      </text>

      {/* Elegant dot indicator for installed parts */}
      {isSel && <circle cx={x + w - 12} cy={y + 12} r={3} fill={accent} />}
    </g>
  );
}

// Minimalist Fan Graphic
function FanCircle({ cx, cy, rx: frx = 0, ry: fry = 0, r = 0, isFlat = false }: {
  cx: number; cy: number; rx?: number; ry?: number; r?: number; isFlat?: boolean;
}) {
  const strokeColor = "rgba(255,255,255,0.1)";
  
  if (isFlat) {
    return (
      <g pointerEvents="none">
        <ellipse cx={cx} cy={cy} rx={frx} ry={fry} fill="none" stroke={strokeColor} strokeWidth="1" />
        <ellipse cx={cx} cy={cy} rx={frx * 0.4} ry={fry * 0.4} fill="none" stroke={strokeColor} strokeWidth="1" />
      </g>
    );
  }
  return (
    <g pointerEvents="none">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={strokeColor} strokeWidth="1" />
      <circle cx={cx} cy={cy} r={r * 0.4} fill="none" stroke={strokeColor} strokeWidth="1" />
      <circle cx={cx} cy={cy} r={r * 0.15} fill={strokeColor} />
      <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} stroke={strokeColor} strokeWidth="1" />
      <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} stroke={strokeColor} strokeWidth="1" />
    </g>
  );
}

export interface DiagramProps {
  chipset?: Chipset;
  hoveredZone: Category | null;
  selectedParts: Partial<Record<Category, Part>>;
  onEnter: (cat: Category) => void;
  onLeave: () => void;
  onClick: (cat: Category) => void;
  theme: { accent: string; glow: string };
}

export function PCCaseDiagram({ chipset, hoveredZone, selectedParts, onEnter, onLeave, onClick, theme }: DiagramProps) {
  const accent = theme.accent;

  // Geometry
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

  const zp = { hoveredZone, selectedParts, onEnter, onLeave, onClick, accent };

  // Helper for FANS zone styling
  const fanStroke = hoveredZone === "FANS" ? accent : "transparent";
  const fanFill = hoveredZone === "FANS" ? `${accent}1A` : "transparent";

  return (
    <svg viewBox="0 0 840 640" width="100%" style={{ display: "block", overflow: "visible" }}>
      <defs>
        <clipPath id="c-glass"><rect x={GX1} y={GY1} width={GW} height={GH} /></clipPath>
        <clipPath id="c-back"><polygon points={poly(LTL, [GX1, GY1], [GX1, GY2], LBL)} /></clipPath>
        <clipPath id="c-front"><polygon points={poly([GX2, GY1], RTR, RBR, [GX2, GY2])} /></clipPath>
        <clipPath id="c-top"><polygon points={poly(LTL, [GX1, GY1], [GX2, GY1], RTR)} /></clipPath>
      </defs>

      {/* ── CLEAN STRUCTURAL CHASSIS ── */}
      <g pointerEvents="none">
        
        {/* Outer Frame */}
        <polygon points={poly([GX1,GY2],[GX2,GY2],RBR,LBL)} fill="#050505" stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
        <polygon points={poly(LTL,[GX1,GY1],[GX1,GY2],LBL)} fill="#050505" stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
        <polygon points={poly([GX2,GY1],RTR,RBR,[GX2,GY2])} fill="#050505" stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
        <polygon points={poly(LTL,[GX1,GY1],[GX2,GY1],RTR)} fill="#050505" stroke="rgba(255,255,255,0.1)" strokeWidth={1} />

        {/* Back panel venting */}
        <g clipPath="url(#c-back)" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={1}>
          {[272,286,300,314,328,342,356,370,384].map((yy,i) => (
            <line key={i} x1={108} y1={yy} x2={130} y2={yy} />
          ))}
        </g>
        <g clipPath="url(#c-back)"><FanCircle cx={127} cy={127} r={23} /></g>

        {/* Front Fans */}
        <g clipPath="url(#c-front)">
          {[165,315,460].map((fy,i) => <FanCircle key={i} cx={678} cy={fy+27} r={24} />)}
        </g>

        {/* Top Fans */}
        <g clipPath="url(#c-top)">
          {[310,430,555].map((fx,i) => {
            const t = (fx-GX1)/GW;
            const fy = GY1-(GY1-LTL[1])*(1-t)*0.35+4;
            return <FanCircle key={i} cx={fx} cy={fy+12} rx={22} ry={10} isFlat />;
          })}
        </g>

        {/* Glass Panel Background */}
        <rect x={GX1} y={GY1} width={GW} height={GH} fill="rgba(255,255,255,0.01)" />

        {/* Motherboard Backplate */}
        <rect x={GX1+15} y={GY1+28} width={225} height={290} fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.1)" strokeWidth={1} rx={4} />
        
        {/* Shrouds */}
        <rect x={GX1+302} y={GY1+25} width={128} height={290} fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth={1} rx={4} />
        <rect x={GX1+12} y={GY1+402} width={240} height={82} fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth={1} rx={4} />
        
        {/* 3D Wireframe structural lines */}
        <line x1={GX1} y1={GY1} x2={GX2} y2={GY1} stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
        <line x1={GX1} y1={GY1} x2={GX1} y2={GY2} stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
        <line x1={GX2} y1={GY1} x2={GX2} y2={GY2} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
        <line x1={GX1} y1={GY2} x2={GX2} y2={GY2} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
        <line x1={LTL[0]} y1={LTL[1]} x2={LBL[0]} y2={LBL[1]} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
        <line x1={RTR[0]} y1={RTR[1]} x2={RBR[0]} y2={RBR[1]} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
        <line x1={LTL[0]} y1={LTL[1]} x2={GX1} y2={GY1} stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
        <line x1={GX2} y1={GY1} x2={RTR[0]} y2={RTR[1]} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
        <line x1={LTL[0]} y1={LTL[1]} x2={RTR[0]} y2={RTR[1]} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
        <line x1={GX1} y1={GY2} x2={LBL[0]} y2={LBL[1]} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
        <line x1={GX2} y1={GY2} x2={RBR[0]} y2={RBR[1]} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
        <line x1={LBL[0]} y1={LBL[1]} x2={RBR[0]} y2={RBR[1]} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />

        {/* ── PROCESSOR GRAPHIC ── */}
        {(() => {
          const px = GX1 + GW * 0.06;
          const py = GY1 + GH * 0.225;
          const pw = GW * 0.105;
          const ph = GH * 0.155;
          const hasCPU = !!selectedParts["PROCESSORS"];
          const pStroke = chipset === "AMD" ? "#ef4444" : chipset === "Intel" ? "#3b82f6" : "rgba(255,255,255,0.2)";
          const pFill = hasCPU ? (chipset === "AMD" ? "rgba(239,68,68,0.1)" : "rgba(59,130,246,0.1)") : "rgba(255,255,255,0.03)";
          
          return (
            <g pointerEvents="none">
              <rect x={px} y={py} width={pw} height={ph} fill={pFill} stroke={pStroke} strokeWidth={1.5} rx={2} />
              {/* Internal socket pins illusion */}
              <rect x={px+4} y={py+4} width={pw-8} height={ph-8} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={1} strokeDasharray="1 1" />
            </g>
          );
        })()}

      </g>

      {/* ── INTERACTIVE FAN ZONES ── */}
      <g 
        onMouseEnter={() => onEnter("FANS")} 
        onMouseLeave={onLeave} 
        onClick={() => onClick("FANS")}
        style={{ cursor: "pointer" }} 
        clipPath="url(#c-back)"
      >
        <rect x={100} y={100} width={55} height={55} fill={fanFill} stroke={fanStroke} strokeWidth={1} rx={4} />
      </g>
      <g 
        onMouseEnter={() => onEnter("FANS")} 
        onMouseLeave={onLeave} 
        onClick={() => onClick("FANS")}
        style={{ cursor: "pointer" }} 
        clipPath="url(#c-front)"
      >
        {[165,315,460].map((fy,i) => (
          <rect key={i} x={647} y={fy} width={62} height={55} fill={fanFill} stroke={fanStroke} strokeWidth={1} rx={4} />
        ))}
      </g>

      {/* ── COMPONENT HOTSPOT ZONES ── */}
      {(() => { const z = gp(0.032,0.055,0.508,0.64); return <Zone cat="MOTHERBOARDS" {...z} label="Motherboard" labelPos="t" {...zp} />; })()}
      {(() => { const z = gp(0.04,0.065,0.25,0.215); return <Zone cat="COOLERS" {...z} label="Cooler" labelPos="t" {...zp} />; })()}
      {(() => { const z = gp(0.05,0.215,0.175,0.39); return <Zone cat="PROCESSORS" {...z} label={chipset || "CPU"} {...zp} />; })()}
      {(() => { const z = gp(0.26,0.07,0.35,0.49); return <Zone cat="MEMORY" {...z} label="RAM" {...zp} />; })()}
      {(() => { const z = gp(0.08,0.52,0.48,0.60); return <Zone cat="SSD & NVME" {...z} label="Storage 1" {...zp} />; })()}
      {(() => { const z = gp(0.08,0.61,0.48,0.68); return <Zone cat="EXTRA SSD & NVME" {...z} label="Storage 2" {...zp} />; })()}
      {(() => { const z = gp(0.02,0.70,0.82,0.83); return <Zone cat="GRAPHICS CARDS" {...z} label="Graphics Card" {...zp} />; })()}
      {(() => { const z = gp(0.025,0.845,0.528,0.975); return <Zone cat="POWER SUPPLY" {...z} label="Power Supply" {...zp} />; })()}
      {(() => { const z = gp(0.648,0.058,0.924,0.212); return <Zone cat="EXTRA SSD & NVME" {...z} label='2.5" SSD' {...zp} />; })()}
      {(() => { const z = gp(0.648,0.24,0.924,0.41); return <Zone cat="HARD DISK" {...z} label='3.5" HDD' {...zp} />; })()}
      {(() => { const z = gp(0.648,0.44,0.924,0.61); return <Zone cat="EXTRA HARD DISK" {...z} label="Aux HDD" {...zp} />; })()}

    </svg>
  );
}