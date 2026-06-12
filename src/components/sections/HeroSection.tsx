"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const SHOWCASE_IMAGES = [
  "/hero-bg.webp",
  "/Gemini_Generated_Image_.webp",
  "/Gemini_Generated_Image_jgn0y0jgn0y0jgn0.webp",
];

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // We need to track the previous index to keep the old image visible during the transition
  const prevIndexRef = useRef(0);

  // Auto-slide timer
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % SHOWCASE_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Initial Entrance Animation
  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Animate the main big text up from a hidden mask
      tl.fromTo(
        ".hero-title-line",
        { y: "100%" },
        { y: "0%", duration: 1.2, stagger: 0.1, ease: "power4.out", delay: 0.2 }
      );

      // Fade in the top elements and button
      tl.fromTo(
        ".hero-ui",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power2.out" },
        "-=0.8"
      );
    },
    { scope: containerRef }
  );

  // Advanced Clip-Path Image Transitions
  useGSAP(
    () => {
      const images = gsap.utils.toArray(".slide-image");
      const prevIndex = prevIndexRef.current;

      // Always reset and animate the progress bar
      gsap.fromTo(
        ".progress-bar-fill",
        { scaleX: 0 },
        { scaleX: 1, duration: 6, ease: "none", transformOrigin: "left" }
      );

      // Skip the image transition on the very first render
      if (activeIndex === prevIndex) return;

      // 1. Prepare the NEW image (hidden at the bottom, placed on top layer)
      gsap.set(images[activeIndex] as Element, { 
        zIndex: 2, 
        clipPath: "inset(100% 0 0 0)", 
        scale: 1.1 
      });

      // 2. Ensure the OLD image stays fully visible just behind it
      gsap.set(images[prevIndex] as Element, { 
        zIndex: 1, 
        clipPath: "inset(0% 0 0 0)" 
      });

      // 3. Keep all OTHER images completely hidden at the back
      images.forEach((img, i) => {
        if (i !== activeIndex && i !== prevIndex) {
          gsap.set(img as Element, { zIndex: 0, clipPath: "inset(100% 0 0 0)" });
        }
      });

      // 4. Animate the NEW image wiping up over the OLD image
      gsap.to(images[activeIndex] as Element, { 
        clipPath: "inset(0% 0 0 0)", 
        scale: 1, 
        duration: 1.5, 
        ease: "power3.inOut",
        onComplete: () => {
          // 5. Cleanup: hide the old image once the wipe is totally finished
          gsap.set(images[prevIndex] as Element, { zIndex: 0, clipPath: "inset(100% 0 0 0)" });
          // Update the ref for the next transition
          prevIndexRef.current = activeIndex;
        }
      });
    },
    { dependencies: [activeIndex], scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      // h-[100dvh] ensures it fits exactly one screen on both desktop and mobile browsers
      className="relative w-full h-[100dvh] overflow-hidden bg-background text-foreground"
    >
      {/* ── BACKGROUND IMAGE SLIDER ── */}
      <div className="absolute inset-0 w-full h-full">
        {SHOWCASE_IMAGES.map((src, index) => (
          <div
            key={src}
            className="slide-image absolute inset-0 w-full h-full"
            // Set initial state: first image is visible, others are hidden at the bottom
            style={{ 
              clipPath: index === 0 ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)",
              zIndex: index === 0 ? 1 : 0
            }}
          >
            <Image
              src={src}
              alt={`Rig Showcase ${index + 1}`}
              fill
              priority={index === 0}
              className="object-cover object-center"
            />
            {/* Heavy gradient to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#0a0a0a]" />
          </div>
        ))}
      </div>

      {/* ── FOREGROUND CONTENT ── */}
      {/* pt-32 accounts for the sticky header, pb-12 creates space at the bottom */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between pt-32 pb-8 px-6 md:px-12 max-w-[100rem] mx-auto">
        
        {/* Top Row: Tech Specs / Status (Pushed down by header) */}
        <div className="hero-ui flex justify-between items-start w-full text-xs font-mono tracking-widest uppercase text-gray-300">
          <div className="flex flex-col gap-1">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              Custom Rigs
            </span>
            <span className="text-gray-500">Precision Engineered</span>
          </div>
          
          <div className="text-right hidden md:block text-gray-500">
            <p>01. PERFORMANCE</p>
            <p>02. AESTHETICS</p>
            <p>03. DOMINANCE</p>
          </div>
        </div>

        {/* Bottom Row: Massive Typography & Interactions */}
        <div className="flex flex-col w-full">
          
          {/* Brutalist Desktop CTA & Description - Sits just above the title */}
          <div className="hero-ui flex flex-col md:flex-row items-start md:items-end justify-between w-full mb-6 md:mb-2">
            <p className="text-sm md:text-base text-gray-300 max-w-sm leading-relaxed font-light mb-6 md:mb-0">
              We don&apos;t just build computers. We forge extreme performance machines tailored for the elite.
            </p>
            
            <Link
              href="/build"
              className="group relative inline-flex items-center justify-center px-10 py-4 bg-white text-black text-sm font-bold uppercase tracking-widest overflow-hidden rounded-sm"
            >
              <span className="relative z-10 group-hover:-translate-y-10 transition-transform duration-500">
                Start Building
              </span>
              <span className="absolute z-10 translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                Start Building
              </span>
            </Link>
          </div>

          {/* Huge Bottom-Anchored Typography */}
          <div className="w-full flex justify-between items-end">
            <div className="overflow-hidden pb-2">
              <h1 className="hero-title-line text-[16vw] lg:text-[12vw] leading-[0.8] font-bold tracking-tighter text-white uppercase m-0 select-none">
                DOMINATE.
              </h1>
            </div>
            
            {/* Slider Controls Container (Bottom Right) */}
            <div className="hero-ui hidden md:flex flex-col items-end gap-3 pb-4">
              <div className="font-mono text-sm text-white">
                0{activeIndex + 1} <span className="text-gray-600">/ 0{SHOWCASE_IMAGES.length}</span>
              </div>
              
              {/* Animated Progress Bar */}
              <div className="w-32 h-[2px] bg-white/20 overflow-hidden">
                <div className="progress-bar-fill w-full h-full bg-white origin-left" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}