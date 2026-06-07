"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Cpu, Layers, Wrench, Gauge } from "lucide-react";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Timeline for the text content
    const textTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%", 
        toggleActions: "play none none reverse",
      },
    });

    textTl.fromTo(
      ".about-text",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
    );

    // Timeline for the abstract image grid
    const gridTl = gsap.timeline({
      scrollTrigger: {
        trigger: gridRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    gridTl.fromTo(
      ".grid-panel",
      { scale: 0.8, opacity: 0, rotationY: 15 },
      { scale: 1, opacity: 1, rotationY: 0, duration: 1, stagger: 0.2, ease: "expo.out" }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full max-w-7xl mx-auto px-6 py-24 lg:py-32 relative z-10 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column: Text Content */}
        <div className="flex flex-col space-y-8">
          <div className="about-text inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full w-fit text-xs font-semibold tracking-wider uppercase text-purple-400">
            <Cpu size={14} /> The Dollyva Standard
          </div>
          
          <h2 className="about-text text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Built by Enthusiasts, <br />
            <span className="text-slate-400">For Enthusiasts.</span>
          </h2>
          
          <p className="about-text text-base md:text-lg text-slate-400 leading-relaxed max-w-lg">
            We do not compromise. From selecting the absolute best-binned premium hardware to executing flawless, invisible cable management, every system engineered at Dollyva is a masterpiece of uncompromised performance.
          </p>

          <div className="flex flex-col space-y-5 pt-4">
            {/* List Items */}
            <div className="about-text flex items-start gap-4">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 shrink-0">
                <Wrench size={20} />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Precision Assembly</h4>
                <p className="text-sm text-slate-400">Thermal compound application, perfect mounting pressure, and rigorous stress testing.</p>
              </div>
            </div>

            <div className="about-text flex items-start gap-4">
              <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400 shrink-0">
                <Layers size={20} />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Immaculate Cable Routing</h4>
                <p className="text-sm text-slate-400">Custom sleeved cables routed to perfection for optimal airflow and aesthetic brilliance.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Abstract "Image" Grid Showcase */}
        <div ref={gridRef} className="relative h-[500px] w-full perspective-1000">
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-3 gap-4 transform rotate-[-5deg] scale-105">
            
            {/* Large Main Panel — Real PC Build Photo */}
            <div className="grid-panel row-span-2 col-span-1 rounded-2xl border border-white/10 relative overflow-hidden group shadow-2xl">
              <Image
                src="/about-panel-main.png"
                alt="Premium custom PC build by Dollyva"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
              <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-xs font-mono text-slate-300">IMG_SYS_01</span>
              </div>
            </div>

            {/* Top Right Panel — RGB Components Photo */}
            <div className="grid-panel row-span-1 col-span-1 rounded-2xl border border-purple-500/20 relative overflow-hidden group shadow-xl">
              <Image
                src="/about-panel-components.webp"
                alt="G.Skill RGB RAM on premium motherboard"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
              <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                <span className="text-[10px] font-mono text-purple-300">RGB · SYNC</span>
              </div>
            </div>

            {/* Middle Right Panel — RTX GPU Build Photo */}
            <div className="grid-panel row-span-2 col-span-1 rounded-2xl border border-blue-500/20 relative overflow-hidden group shadow-2xl">
              <Image
                src="/about-panel-gpu.webp"
                alt="GeForce RTX GPU installed in a premium PC build"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                <Gauge size={12} className="text-blue-400" />
                <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">Perf. Mode</span>
              </div>
              <div className="absolute bottom-4 right-4 z-20 text-right">
                <div className="text-[10px] font-mono text-indigo-400/70 mb-0.5">FLAGSHIP</div>
                <span className="text-xs font-mono text-indigo-300">RTX_4090_BUILD</span>
              </div>
            </div>

            {/* Bottom Left Panel — Cable Management Photo */}
            <div className="grid-panel row-span-1 col-span-1 rounded-2xl border border-cyan-500/15 relative overflow-hidden group shadow-xl">
              <Image
                src="/about-panel-cables.webp"
                alt="Immaculate custom PC cable management"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
              <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[10px] font-mono text-cyan-300">Airflow · Optimized</span>
              </div>
            </div>

          </div>
          
          {/* Decorative ambient glow behind the grid */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-500/20 blur-[100px] -z-10 rounded-full" />
        </div>

      </div>
    </section>
  );
}