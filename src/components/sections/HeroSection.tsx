"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// Placeholder image paths - add your own images to the public folder
const SHOWCASE_IMAGES = [
  "/Gemini_Generated_Image_.png", 
  "/hero-bg.png",
  "/Gemini_Generated_Image_jgn0y0jgn0y0jgn0.png"
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  
  const [activeIndex, setActiveIndex] = useState(0);

  // 2-Second Image Rotation Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % SHOWCASE_IMAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    // 1. Initial Entrance Animations (Text & Container)
    const tl = gsap.timeline();
    tl.fromTo(
      ".reveal-text",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" }
    );
    tl.fromTo(
      ".reveal-btn",
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
      "-=0.4"
    );
    tl.fromTo(
      visualRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" },
      "-=0.8"
    );

    // 2. Mouse Movement Parallax
    const handleMouseMove = (e: MouseEvent) => {
      if (!visualRef.current) return;
      const { clientX, clientY } = e;
      const moveX = (clientX - window.innerWidth / 2) * 0.03;
      const moveY = (clientY - window.innerHeight / 2) * 0.03;

      gsap.to(visualRef.current, {
        x: moveX,
        y: moveY,
        rotationY: moveX * 0.5,
        rotationX: -moveY * 0.5,
        duration: 0.6,
        ease: "power1.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, { scope: containerRef });

  // 3. GSAP Crossfade Animation for the Images
  useGSAP(() => {
    // Fade out all images slightly scaled up
    gsap.to(".slide-image", {
      opacity: 0,
      scale: 1.05,
      duration: 0.8,
      ease: "power2.inOut"
    });

    // Fade in and settle the active image
    gsap.to(`.slide-image[data-index="${activeIndex}"]`, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power2.out",
      overwrite: "auto"
    });
  }, { dependencies: [activeIndex], scope: visualRef });

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[80vh] w-full flex items-center overflow-hidden py-12"
    >
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.jpg" // Main background image
          alt="Dollyva Custom Builds"
          fill
          priority
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#050505] via-[#050505]/90 to-transparent" />
      <div className="absolute inset-0 z-0 bg-black/40" />

      {/* Main Content Grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center perspective-1000">
        
        {/* Left Column: Text & Content */}
        <div ref={textRef} className="flex flex-col space-y-6">
          <div className="reveal-text inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full w-fit text-xs font-semibold tracking-wider uppercase text-blue-400">
            ⚡ Ultimate Performance Guaranteed
          </div>
          
          <h1 className="reveal-text text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
            Next-Gen Power. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
              Unleashed.
            </span>
          </h1>
          
          <p className="reveal-text text-lg text-slate-400 max-w-lg leading-relaxed">
            Forge your ultimate custom rig or shop precision-engineered, top-tier hardware configurations here at Dollyva.
          </p>
          
          <div className="reveal-btn flex flex-wrap gap-4 pt-4">
            <Link 
              href="/build" 
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-xl shadow-lg shadow-blue-500/20 transition-transform active:scale-95"
            >
              Start Custom Build
            </Link>
            <Link 
              href="/laptops" 
              className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium rounded-xl backdrop-blur-sm transition-colors"
            >
              Shop Laptops
            </Link>
          </div>
        </div>

        {/* Right Column: Dynamic Image Showcase */}
        <div className="flex justify-center items-center w-[700px] h-[450px] relative">
          <div 
            ref={visualRef} 
            className="w-80 h-80 sm:w-[700px] sm:h-[450px] rounded-3xl bg-[#0a0a0f]/80 border border-white/10 backdrop-blur-xl relative shadow-2xl flex items-center justify-center group transform-style-3d overflow-hidden"
          >
            {/* The Image Carousel */}
            <div className="absolute inset-4 rounded-2xl overflow-hidden bg-black z-10 border border-white/5">
              {SHOWCASE_IMAGES.map((src, index) => (
                <div 
                  key={src}
                  data-index={index}
                  className="slide-image absolute inset-0 opacity-0"
                >
                  <Image 
                    src={src} 
                    alt={`Showcase Build ${index + 1}`} 
                    fill 
                    className="object-cover"
                  />
                  {/* Subtle inner gradient to make images look cohesive */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              ))}
            </div>

            {/* Decorative Overlay Elements */}
            <div className="absolute w-[120%] h-[120%] bg-gradient-to-tr from-blue-500/10 to-purple-500/10 blur-xl rounded-full z-0 pointer-events-none" />
            
            {/* Floating Badges */}
            <div className="absolute top-8 left-8 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-[10px] text-slate-300 rounded-md z-20 shadow-lg">
              
            </div>
            
            {/* Slide Indicators */}
            <div className="absolute bottom-8 right-8 flex gap-2 z-20">
              {SHOWCASE_IMAGES.map((_, idx) => (
                <div 
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    activeIndex === idx ? "w-6 bg-blue-500" : "w-2 bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}