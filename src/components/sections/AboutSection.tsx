"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageGridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Massive Text Reveal Animation
    gsap.fromTo(
      ".about-title-line",
      { y: "110%", rotationZ: 2 },
      {
        y: "0%",
        rotationZ: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        },
      }
    );

    // Fade in text blocks
    gsap.fromTo(
      ".about-fade-up",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 70%",
        },
      }
    );

    // 2. Image Reveal (Clip-Path Wipe)
    const images = gsap.utils.toArray(".about-image-wrapper");
    images.forEach((img: any) => {
      gsap.fromTo(
        img,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.5,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: img,
            start: "top 85%",
          },
        }
      );
    });

    // 3. Parallax Image Scrolling
    gsap.to(".parallax-img-fast", {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: imageGridRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(".parallax-img-slow", {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: imageGridRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: containerRef });

  return (
    // Changed pb-32 to pb-12 here to reduce bottom spacing
    <section ref={containerRef} className="w-full bg-background text-foreground border-t border-white/10 pt-24 pb-12">
      <div className="max-w-[100rem] mx-auto px-6 md:px-12">
        
        {/* ── TOP SECTION: Massive Typography ── */}
        <div ref={textRef} className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-24 md:mb-32">
          
          <div className="flex flex-col select-none">
            <span className="about-fade-up text-xs font-mono tracking-[0.3em] uppercase text-gray-500 mb-6 block">
              The Dollyva Standard
            </span>
            <div className="overflow-hidden py-2">
              <h2 className="about-title-line text-[12vw] lg:text-[8vw] font-bold uppercase tracking-tighter leading-[0.85] text-white">
                ZERO
              </h2>
            </div>
            <div className="overflow-hidden py-2">
              <h2 className="about-title-line text-[12vw] lg:text-[8vw] font-bold uppercase tracking-tighter leading-[0.85] text-transparent stroke-text" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)" }}>
                COMPROMISE.
              </h2>
            </div>
          </div>

          <p className="about-fade-up text-sm md:text-base text-gray-400 font-light leading-relaxed max-w-md lg:pb-4">
            We don&apos;t build standard computers. We curate, engineer, and stress-test every single component. From binning the silicon to microscopic cable management, Dollyva is the intersection of extreme power and pure aesthetics.
          </p>
        </div>

        {/* ── BOTTOM SECTION: Editorial Split Layout ── */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-8">
          
          {/* Left Column: Brutalist List */}
          <div className="w-full lg:w-[35%] flex flex-col pt-12">
            
            <div className="about-fade-up border-t border-white/10 py-8 relative group">
              <div className="font-mono text-xs tracking-widest text-gray-500 mb-4 flex justify-between">
                <span>[01]</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">SYS_01</span>
              </div>
              <h4 className="text-xl font-bold uppercase tracking-wide text-white mb-3">Precision Assembly</h4>
              <p className="text-sm text-gray-400 leading-relaxed font-light">
                Flawless thermal compound application, exact mounting pressure, and rigorous structural integrity checks. Built to survive, engineered to dominate.
              </p>
            </div>

            <div className="about-fade-up border-t border-white/10 py-8 relative group">
              <div className="font-mono text-xs tracking-widest text-gray-500 mb-4 flex justify-between">
                <span>[02]</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">SYS_02</span>
              </div>
              <h4 className="text-xl font-bold uppercase tracking-wide text-white mb-3">Invisible Routing</h4>
              <p className="text-sm text-gray-400 leading-relaxed font-light">
                Custom sleeved cables routed with mathematical precision. We optimize for maximum unrestricted airflow and a completely sterile, clean aesthetic.
              </p>
            </div>

            <div className="about-fade-up border-y border-white/10 py-8 relative group">
              <div className="font-mono text-xs tracking-widest text-gray-500 mb-4 flex justify-between">
                <span>[03]</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">SYS_03</span>
              </div>
              <h4 className="text-xl font-bold uppercase tracking-wide text-white mb-3">Thermal Dominance</h4>
              <p className="text-sm text-gray-400 leading-relaxed font-light">
                Acoustically tuned fan curves and bespoke liquid cooling loops designed to maintain sub-zero performance under the most extreme synthetic loads.
              </p>
            </div>

          </div>

          {/* Right Column: Architectural Image Grid */}
          <div ref={imageGridRef} className="w-full lg:w-[65%] grid grid-cols-2 gap-4 lg:gap-8 relative min-h-[600px] lg:pl-12">
            
            {/* Image 1 (Tall, Parallax Up) */}
            <div className="about-image-wrapper relative w-full h-[400px] md:h-[600px] mt-12 overflow-hidden">
              <Image
                src="/about-panel-main.png"
                alt="Premium custom PC build"
                fill
                className="parallax-img-fast object-cover scale-[1.2] grayscale-[30%] hover:grayscale-0 transition-all duration-700"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute top-4 left-4 font-mono text-[10px] text-white/50 tracking-widest mix-blend-difference">
                FIG. A — ARCHITECTURE
              </div>
            </div>

            {/* Right Column Stack */}
            <div className="flex flex-col gap-4 lg:gap-8">
              
              {/* Image 2 (Short, Parallax Down) */}
              <div className="about-image-wrapper relative w-full h-[250px] md:h-[350px] overflow-hidden">
                <Image
                  src="/about-panel-components.webp"
                  alt="Premium components"
                  fill
                  className="parallax-img-slow object-cover scale-[1.2] grayscale-[30%] hover:grayscale-0 transition-all duration-700"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
                 <div className="absolute top-4 left-4 font-mono text-[10px] text-white/50 tracking-widest mix-blend-difference">
                  FIG. B — COMPONENTS
                </div>
              </div>

              {/* Image 3 (Square, Parallax Up) */}
              <div className="about-image-wrapper relative w-full h-[250px] md:h-[350px] overflow-hidden">
                <Image
                  src="/about-panel-gpu.webp"
                  alt="GeForce RTX GPU"
                  fill
                  className="parallax-img-fast object-cover scale-[1.2] grayscale-[30%] hover:grayscale-0 transition-all duration-700"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
                 <div className="absolute top-4 left-4 font-mono text-[10px] text-white/50 tracking-widest mix-blend-difference">
                  FIG. C — GRAPHICS
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}