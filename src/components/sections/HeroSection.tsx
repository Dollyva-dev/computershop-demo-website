"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// Placeholder image paths - add your own images to the public folder
const SHOWCASE_IMAGES = [
  "/Gemini_Generated_Image_.webp",
  "/hero-bg.webp",
  "/Gemini_Generated_Image_jgn0y0jgn0y0jgn0.webp",
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  // 2-Second Image Rotation Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % SHOWCASE_IMAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(
    () => {
      // Initial Entrance Animations (Text & Buttons)
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
    },
    { scope: containerRef }
  );

  // GSAP Crossfade Animation for fullscreen background images
  useGSAP(
    () => {
      gsap.to(".bg-slide-image", {
        opacity: 0,
        scale: 1.05,
        duration: 1,
        ease: "power2.inOut",
      });

      gsap.to(`.bg-slide-image[data-index="${activeIndex}"]`, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        overwrite: "auto",
      });
    },
    { dependencies: [activeIndex], scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* ── Fullscreen Rotating Background Images ── */}
      {SHOWCASE_IMAGES.map((src, index) => (
        <div
          key={src}
          data-index={index}
          className="bg-slide-image absolute inset-0 opacity-0"
          style={{ zIndex: 0 }}
        >
          <Image
            src={src}
            alt={`Background ${index + 1}`}
            fill
            priority={index === 0}
            className="object-cover object-center"
          />
        </div>
      ))}

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/55 to-black/80" />

      {/* Subtle colour vignette at edges */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-blue-950/40 via-transparent to-indigo-950/40" />

      {/* ── Centered Content ── */}
      <div
        ref={textRef}
        className="relative z-20 flex flex-col items-center text-center space-y-6 px-6 max-w-4xl mx-auto"
      >
        {/* Badge */}
        <div className="reveal-text inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full w-fit text-xs font-semibold tracking-wider uppercase text-blue-400">
          ⚡ Ultimate Performance Guaranteed
        </div>

        {/* Headline */}
        <h1 className="reveal-text text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]">
          Next-Gen Power.{" "}
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
            Unleashed.
          </span>
        </h1>

        {/* Sub-copy */}
        <p className="reveal-text text-lg text-slate-300 max-w-xl leading-relaxed">
          Forge your ultimate custom rig or shop precision-engineered, top-tier
          hardware configurations here at Dollyva.
        </p>

        {/* CTA Buttons */}
        <div className="reveal-btn flex flex-wrap justify-center gap-4 pt-4">
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

        {/* Slide Indicators */}
        <div className="reveal-text flex gap-2 pt-6">
          {SHOWCASE_IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                activeIndex === idx ? "w-8 bg-blue-400" : "w-2.5 bg-white/25"
              }`}
              aria-label={`Background ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}