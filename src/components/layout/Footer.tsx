"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { label: "Twitter / X", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "GitHub", href: "#" },
];

const quickLinks = [
  { label: "Support", href: "/support" },
  { label: "Warranty Info", href: "/warranty" },
  { label: "Track Order", href: "/track-order" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

const productLinks = [
  { label: "Gaming PCs", href: "/gaming" },
  { label: "Workstations", href: "/workstations" },
  { label: "Peripherals", href: "/peripherals" },
  { label: "Custom Builds", href: "/custom" },
  { label: "Parts & Upgrades", href: "/parts" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const textRevealRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal for grid items
      gsap.from(".footer-fade-up", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
        },
      });

      // Parallax effect on the giant bottom text
      gsap.fromTo(
        textRevealRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 70%",
            end: "bottom bottom",
            scrub: 0.5,
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-background text-foreground border-t border-white/10 pt-24 pb-6 mt-20 overflow-hidden flex flex-col"
    >
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 w-full">
        {/* ── Top Section: Editorial Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">
          
          {/* Left: Huge Newsletter Callout */}
          <div className="lg:col-span-6 footer-fade-up">
            <h3 className="text-4xl md:text-5xl font-light tracking-tight mb-8">
              Stay ahead of the curve.<br />
              <span className="font-semibold text-gray-400">Join the collective.</span>
            </h3>
            
            <form className="relative group w-full max-w-md mt-12">
              <input
                type="email"
                placeholder="ENTER YOUR EMAIL"
                className="w-full bg-transparent border-b border-gray-700 pb-4 text-sm tracking-widest text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors duration-500 uppercase"
              />
              <button
                type="submit"
                className="absolute right-0 bottom-4 text-gray-500 group-focus-within:text-white hover:text-white transition-colors duration-300"
                aria-label="Subscribe"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
                  <path strokeLinecap="square" strokeLinejoin="miter" d="M4 12h16m-7-7l7 7-7 7" />
                </svg>
              </button>
            </form>
          </div>

          {/* Right: Structured Links */}
          <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 pt-2">
            
            {/* Products Column */}
            <div className="footer-fade-up">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-6">Products</h4>
              <ul className="space-y-4">
                {productLinks.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors relative group inline-block">
                      {l.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Column */}
            <div className="footer-fade-up">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-6">Support</h4>
              <ul className="space-y-4">
                {quickLinks.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors relative group inline-block">
                      {l.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Socials Column (Text-based, much more modern) */}
            <div className="footer-fade-up col-span-2 md:col-span-1">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-6">Socials</h4>
              <ul className="space-y-4">
                {socialLinks.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} className="text-sm text-gray-400 hover:text-white transition-colors relative group inline-flex items-center gap-2">
                      {s.label}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* ── Bottom Section: Massive Brand Reveal ── */}
      <div className="w-full overflow-hidden border-t border-white/5 pt-8 px-6 md:px-12 flex flex-col items-center">
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-widest text-gray-500 uppercase mb-8">
          <p>© {new Date().getFullYear()} Dollyva Computers</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>

        {/* This is the signature Awwwards "Giant Text". 
          It scales to the viewport width seamlessly. 
          Changed size to 9vw and added whitespace-nowrap to fit the longer text.
        */}
        <h1 
          ref={textRevealRef}
          className="text-[9vw] leading-none font-bold tracking-tighter text-white/5 select-none pointer-events-none w-full text-center whitespace-nowrap"
        >
          DOLLYVA COMPUTERS
        </h1>
      </div>
    </footer>
  );
}