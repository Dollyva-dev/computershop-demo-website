"use client";

import { useRef } from "react";
import { Truck, ShieldCheck, Zap } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FEATURE_DATA = [
  {
    icon: <Zap className="w-6 h-6 text-blue-400" />,
    title: "Lightning Fast Delivery",
    desc: "Next-day shipping on all verified custom in-stock parts and configurations.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-indigo-400" />,
    title: "Ironclad Warranty",
    desc: "Full comprehensive multi-year coverage protection built into all system assemblies.",
  },
  {
    icon: <Truck className="w-6 h-6 text-purple-400" />,
    title: "Expert Craftsmanship",
    desc: "Perfect structural component assembly and optimized layouts built by technical experts.",
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".feature-card",
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", // Animation starts when the top of the section is 80% down the viewport
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="w-full max-w-7xl mx-auto px-6 py-24 relative z-10">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
          Engineered for Elite Workflows
        </h2>
        <p className="text-sm md:text-base text-slate-400">
          Experience premium service design structures tailored to maintain structural data computing and flawless execution.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {FEATURE_DATA.map((feat, idx) => (
          <div 
            key={idx} 
            className="feature-card bg-[#0b0b12]/60 border border-white/5 p-8 rounded-2xl backdrop-blur-md hover:border-white/10 hover:shadow-[0_10px_30px_-10px_rgba(59,130,246,0.15)] transition-all duration-300 group"
          >
            <div className="p-3 bg-white/5 rounded-xl w-fit mb-6 transition-transform group-hover:scale-110 group-hover:bg-white/10">
              {feat.icon}
            </div>
            <h3 className="text-lg font-semibold text-white mb-2 tracking-wide group-hover:text-blue-400 transition-colors">
              {feat.title}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              {feat.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}