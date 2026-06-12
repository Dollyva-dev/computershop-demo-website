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
    number: "01",
    title: "LIGHTNING FAST",
    desc: "Next-day shipping on all verified custom in-stock parts and configurations. We don't make you wait for dominance.",
    stat: "24H",
    statLabel: "DISPATCH",
  },
  {
    icon: ShieldCheck,
    number: "02",
    title: "IRONCLAD WARRANTY",
    desc: "Comprehensive multi-year coverage built into every system assembly. Absolute peace of mind, engineered.",
    stat: "3YR",
    statLabel: "COVERAGE",
  },
  {
    icon: Truck,
    number: "03",
    title: "EXPERT CRAFTSMANSHIP",
    desc: "Flawless structural assembly, perfect cable management, and thermal optimization by certified technicians.",
    stat: "100%",
    statLabel: "HAND-TESTED",
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Fade in the sticky left header
      gsap.fromTo(
        ".feature-header-anim",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      // Staggered slide up for the feature rows on the right
      gsap.fromTo(
        ".feature-row",
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top 80%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-background text-foreground border-t border-white/10"
    >
      <div className="max-w-[100rem] mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row w-full relative">
          
          {/* ── LEFT: STICKY HEADER ── */}
          <div className="w-full lg:w-[40%] py-20 lg:py-32 lg:pr-16 relative">
            <div className="lg:sticky lg:top-40">
              <span className="feature-header-anim block text-xs font-mono tracking-[0.3em] uppercase text-gray-500 mb-8">
                The Dollyva Standard
              </span>
              
              <h2 className="feature-header-anim text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter leading-[0.9] text-white">
                Engineered <br />
                <span className="text-gray-600">For Elite</span> <br />
                Workflows.
              </h2>
              
              <p className="feature-header-anim text-gray-400 mt-8 max-w-sm font-light leading-relaxed">
                Experience premium service structures designed to maintain flawless execution — from your first configuration click to final deployment.
              </p>
            </div>
          </div>

          {/* ── RIGHT: SCROLLING FEATURE ROWS ── */}
          <div ref={triggerRef} className="w-full lg:w-[60%] flex flex-col lg:py-32">
            {FEATURE_DATA.map((feat, index) => {
              const Icon = feat.icon;
              return (
                <div
                  key={index}
                  className="feature-row group relative flex flex-col md:flex-row items-start md:items-center justify-between border-t border-white/10 py-12 md:py-16 hover:bg-white/[0.02] transition-colors duration-500 cursor-default px-4 -mx-4 md:px-8 md:-mx-8"
                >
                  {/* Background Number (Stroke outline) */}
                  <div 
                    className="absolute right-8 top-1/2 -translate-y-1/2 text-[12vw] md:text-[8vw] font-black leading-none select-none pointer-events-none opacity-20 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110"
                    style={{
                      WebkitTextStroke: "1px rgba(255,255,255,0.1)",
                      color: "transparent",
                    }}
                  >
                    {feat.number}
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-8 w-full md:w-1/2 z-10">
                    <div className="w-12 h-12 flex items-center justify-center border border-white/20 rounded-full group-hover:bg-white group-hover:text-black transition-all duration-300">
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight uppercase group-hover:translate-x-4 transition-transform duration-500">
                      {feat.title}
                    </h3>
                  </div>

                  {/* Description & Stat */}
                  <div className="flex flex-col items-start md:items-end w-full md:w-1/2 mt-6 md:mt-0 z-10 pl-20 md:pl-0">
                    <p className="text-sm text-gray-400 leading-relaxed md:text-right max-w-xs mb-6 group-hover:text-white transition-colors duration-300">
                      {feat.desc}
                    </p>
                    <div className="flex flex-col items-start md:items-end">
                      <span className="text-3xl font-bold tracking-tighter text-white">
                        {feat.stat}
                      </span>
                      <span className="text-[10px] font-mono tracking-widest uppercase text-gray-500">
                        {feat.statLabel}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Final Bottom Border */}
            <div className="border-t border-white/10 w-full" />
          </div>

        </div>
      </div>
    </section>
  );
}