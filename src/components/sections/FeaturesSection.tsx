"use client";

import { useRef, useState } from "react";
import { Truck, ShieldCheck, Zap, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FEATURE_DATA = [
  {
    icon: Zap,
    label: "Speed",
    title: "Lightning Fast Delivery",
    desc: "Next-day shipping on all verified custom in-stock parts and configurations — guaranteed.",
    stat: "24h",
    statLabel: "Avg. Dispatch",
    gradient: "from-blue-500 via-cyan-400 to-blue-600",
    glow: "rgba(59,130,246,0.35)",
    glowStrong: "rgba(59,130,246,0.6)",
    border: "rgba(59,130,246,0.25)",
    iconBg: "from-blue-500/20 to-cyan-500/10",
    accent: "#60a5fa",
    particleColor: "#3b82f6",
    index: 0,
  },
  {
    icon: ShieldCheck,
    label: "Protection",
    title: "Ironclad Warranty",
    desc: "Full comprehensive multi-year coverage protection built into all system assemblies.",
    stat: "3yr",
    statLabel: "Full Coverage",
    gradient: "from-indigo-500 via-violet-400 to-purple-600",
    glow: "rgba(99,102,241,0.35)",
    glowStrong: "rgba(99,102,241,0.6)",
    border: "rgba(99,102,241,0.25)",
    iconBg: "from-indigo-500/20 to-violet-500/10",
    accent: "#818cf8",
    particleColor: "#6366f1",
    index: 1,
  },
  {
    icon: Truck,
    label: "Quality",
    title: "Expert Craftsmanship",
    desc: "Perfect structural component assembly and optimized layouts built by certified technical experts.",
    stat: "100%",
    statLabel: "Hand-Tested",
    gradient: "from-purple-500 via-fuchsia-400 to-violet-600",
    glow: "rgba(168,85,247,0.35)",
    glowStrong: "rgba(168,85,247,0.6)",
    border: "rgba(168,85,247,0.25)",
    iconBg: "from-purple-500/20 to-fuchsia-500/10",
    accent: "#c084fc",
    particleColor: "#a855f7",
    index: 2,
  },
];

// Floating particle dots for each card
function Particles({ color }: { color: string }) {
  const positions = [
    { top: "12%", left: "8%", size: 3, delay: 0 },
    { top: "72%", left: "88%", size: 2, delay: 0.6 },
    { top: "40%", left: "92%", size: 4, delay: 1.2 },
    { top: "85%", left: "15%", size: 2.5, delay: 0.3 },
    { top: "20%", left: "75%", size: 2, delay: 0.9 },
    { top: "60%", left: "5%", size: 3, delay: 1.5 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
      {positions.map((p, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: color,
            opacity: 0.5,
            animation: `floatParticle ${2.5 + i * 0.4}s ease-in-out ${p.delay}s infinite alternate`,
            boxShadow: `0 0 ${p.size * 3}px ${color}`,
          }}
        />
      ))}
    </div>
  );
}

function FeatureCard({ feat }: { feat: (typeof FEATURE_DATA)[0] }) {
  const [hovered, setHovered] = useState(false);
  const Icon = feat.icon;

  return (
    <div
      className="feature-card relative group cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ perspective: "1000px" }}
    >
      {/* Outer ambient glow */}
      <div
        className="absolute -inset-px rounded-2xl transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${feat.border}, transparent 60%)`,
          opacity: hovered ? 1 : 0.4,
        }}
      />

      {/* Card body */}
      <div
        className="relative rounded-2xl p-8 h-full flex flex-col overflow-hidden transition-all duration-500"
        style={{
          background: "rgba(8, 8, 20, 0.75)",
          border: `1px solid ${hovered ? feat.border.replace("0.25", "0.5") : feat.border}`,
          boxShadow: hovered
            ? `0 20px 60px -10px ${feat.glow}, 0 0 0 1px ${feat.border}`
            : `0 8px 30px -10px rgba(0,0,0,0.5)`,
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          backdropFilter: "blur(16px)",
        }}
      >
        {/* Shimmer beam on hover */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
          style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.3s" }}
        >
          <div
            style={{
              position: "absolute",
              top: "-20%",
              left: hovered ? "130%" : "-60%",
              width: "40%",
              height: "140%",
              background: `linear-gradient(105deg, transparent, ${feat.glow.replace("0.35", "0.15")} 50%, transparent)`,
              transform: "skewX(-15deg)",
              transition: "left 0.6s ease",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Top-right decorative circle */}
        <div
          className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle, ${feat.glow}, transparent 70%)`,
            opacity: hovered ? 0.8 : 0.25,
          }}
        />

        {/* Floating particles */}
        <Particles color={feat.particleColor} />

        {/* Tag chip */}
        <div className="flex items-center justify-between mb-6">
          <span
            className="text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full"
            style={{
              background: `${feat.glow.replace("0.35", "0.15")}`,
              color: feat.accent,
              border: `1px solid ${feat.border}`,
              letterSpacing: "0.2em",
            }}
          >
            {feat.label}
          </span>

          {/* Stat badge */}
          <div className="text-right">
            <div
              className="text-xl font-black tracking-tight leading-none"
              style={{
                background: `linear-gradient(135deg, ${feat.accent}, white)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {feat.stat}
            </div>
            <div className="text-[9px] text-slate-500 uppercase tracking-widest mt-0.5">
              {feat.statLabel}
            </div>
          </div>
        </div>

        {/* Icon */}
        <div
          className={`relative w-14 h-14 rounded-2xl mb-6 flex items-center justify-center transition-all duration-500`}
          style={{
            background: `linear-gradient(135deg, ${feat.glow.replace("0.35", "0.2")}, ${feat.glow.replace("0.35", "0.05")})`,
            border: `1px solid ${feat.border}`,
            boxShadow: hovered ? `0 0 20px ${feat.glow}` : "none",
            transform: hovered ? "scale(1.1) rotate(-3deg)" : "scale(1) rotate(0deg)",
          }}
        >
          <Icon
            className="w-6 h-6 transition-colors duration-300"
            style={{ color: feat.accent }}
          />
          {/* Icon inner glow */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at center, ${feat.glow.replace("0.35", "0.3")}, transparent 70%)`,
            }}
          />
        </div>

        {/* Text content */}
        <h3
          className="text-lg font-bold mb-3 tracking-wide transition-colors duration-300 leading-snug"
          style={{ color: hovered ? feat.accent : "#f1f5f9" }}
        >
          {feat.title}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed flex-1">
          {feat.desc}
        </p>

        {/* Bottom CTA row */}
        <div
          className="flex items-center gap-1.5 mt-6 pt-5 text-xs font-semibold uppercase tracking-widest transition-all duration-300"
          style={{
            borderTop: `1px solid ${feat.border.replace("0.25", "0.12")}`,
            color: hovered ? feat.accent : "rgba(100,116,139,0.7)",
          }}
        >
          <span>Learn more</span>
          <ArrowRight
            className="w-3 h-3 transition-transform duration-300"
            style={{ transform: hovered ? "translateX(4px)" : "translateX(0)" }}
          />
        </div>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Header animation
      gsap.fromTo(
        ".features-header",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Cards stagger
      gsap.fromTo(
        ".feature-card",
        { y: 80, opacity: 0, scale: 0.92 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // Orbs drift
      gsap.to(".features-orb", {
        y: -20,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 1.2,
      });
    },
    { scope: sectionRef }
  );

  return (
    <>
      {/* Inject keyframes for particles */}
      <style>{`
        @keyframes floatParticle {
          0%   { transform: translateY(0px) scale(1);   opacity: 0.4; }
          100% { transform: translateY(-10px) scale(1.3); opacity: 0.8; }
        }
        @keyframes pulseRing {
          0%   { transform: scale(0.9); opacity: 0.7; }
          100% { transform: scale(1.3); opacity: 0;   }
        }
        @keyframes rotateGrad {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes scanLine {
          0%   { top: -10%; opacity: 0.6; }
          100% { top: 110%; opacity: 0;   }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="w-full max-w-7xl mx-auto px-6 py-28 relative z-10"
      >
        {/* Background ambient orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="features-orb absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-20"
            style={{ background: "radial-gradient(circle, #3b82f6, transparent 70%)" }}
          />
          <div
            className="features-orb absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-[120px] opacity-15"
            style={{ background: "radial-gradient(circle, #a855f7, transparent 70%)" }}
          />
          <div
            className="features-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-[100px] opacity-10"
            style={{ background: "radial-gradient(circle, #6366f1, transparent 70%)" }}
          />

          {/* Horizontal scan line */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              height: "1px",
              background:
                "linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.4) 30%, rgba(139,92,246,0.6) 50%, rgba(99,102,241,0.4) 70%, transparent 100%)",
              animation: "scanLine 8s linear infinite",
              animationDelay: "2s",
            }}
          />
        </div>

        {/* Section header */}
        <div className="features-header text-center max-w-2xl mx-auto mb-20 relative">
          {/* Eyebrow label */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <div
              className="h-px w-12 rounded-full"
              style={{ background: "linear-gradient(90deg, transparent, #6366f1)" }}
            />
            <span
              className="text-[10px] font-bold uppercase tracking-[0.3em]"
              style={{ color: "#818cf8" }}
            >
              Why Choose Us
            </span>
            <div
              className="h-px w-12 rounded-full"
              style={{ background: "linear-gradient(90deg, #6366f1, transparent)" }}
            />
          </div>

          {/* Main heading with gradient text */}
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight tracking-tight">
            Engineered for{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #60a5fa 0%, #818cf8 40%, #c084fc 80%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Elite Workflows
            </span>
          </h2>

          <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-xl mx-auto">
            Experience premium service design structures tailored to maintain
            flawless execution — from first click to final delivery.
          </p>

          {/* Decorative dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="rounded-full"
                style={{
                  width: i === 1 ? 24 : 6,
                  height: 6,
                  background:
                    i === 1
                      ? "linear-gradient(90deg, #3b82f6, #a855f7)"
                      : "rgba(99,102,241,0.3)",
                  transition: "all 0.3s",
                }}
              />
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {FEATURE_DATA.map((feat) => (
            <FeatureCard key={feat.index} feat={feat} />
          ))}
        </div>

        {/* Bottom decorative grid lines */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "linear-gradient(to top, black 0%, transparent 100%)",
          }}
        />
      </section>
    </>
  );
}