"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  {
    label: "Twitter / X",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
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
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Entrance animation for footer columns
      gsap.from(".footer-col", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        },
      });

      // Bottom bar slide-up
      gsap.from(bottomRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        delay: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        },
      });

      // Ambient orb drift animations
      gsap.to(orb1Ref.current, {
        x: 40,
        y: -30,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(orb2Ref.current, {
        x: -50,
        y: 20,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      });

      // Link hover micro-lift (delegated via CSS, reinforced by GSAP)
      document.querySelectorAll(".footer-link").forEach((link) => {
        link.addEventListener("mouseenter", () => {
          gsap.to(link, { x: 4, duration: 0.25, ease: "power2.out" });
        });
        link.addEventListener("mouseleave", () => {
          gsap.to(link, { x: 0, duration: 0.25, ease: "power2.out" });
        });
      });

      // Social icon pop-in
      gsap.from(".social-icon", {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  // Floating particle dots
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: `${Math.random() * 3 + 1}px`,
    delay: `${Math.random() * 4}s`,
    duration: `${Math.random() * 4 + 4}s`,
  }));

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-[#050508] border-t border-white/5 pt-20 pb-8 mt-20"
    >
      {/* ── Ambient glow orbs ── */}
      <div
        ref={orb1Ref}
        className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        ref={orb2Ref}
        className="pointer-events-none absolute -bottom-24 -right-24 w-[400px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)",
        }}
      />

      {/* ── Floating particles ── */}
      <div ref={particlesRef} className="pointer-events-none absolute inset-0">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-blue-400/20 animate-float-particle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      {/* ── Subtle grid overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Main content ── */}
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Top columns */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16"
        >
          {/* ── Brand col ── */}
          <div className="footer-col md:col-span-4">
            {/* Logo wordmark */}
            <div className="mb-5">
              <span
                className="text-2xl font-extrabold tracking-tight text-white"
                style={{
                  background:
                    "linear-gradient(135deg, #fff 30%, #93c5fd 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Dollyva
              </span>
              <span className="ml-2 text-lg font-light text-slate-400 tracking-widest uppercase text-sm">
                computers
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-xs">
              Built by Enthusiasts, For Enthusiasts. Premium hardware and
              uncompromised performance — crafted for those who demand the best.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="social-icon group relative flex items-center justify-center w-9 h-9 rounded-xl border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:border-blue-500/60 hover:bg-blue-500/10 transition-all duration-300"
                >
                  {s.icon}
                  <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md bg-blue-500/20" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div className="footer-col md:col-span-2">
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5 relative inline-flex items-center gap-2">
              <span className="w-4 h-px bg-blue-500 inline-block" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="footer-link group inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover:bg-blue-400 transition-colors duration-200 shrink-0" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Products ── */}
          <div className="footer-col md:col-span-2">
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5 relative inline-flex items-center gap-2">
              <span className="w-4 h-px bg-violet-500 inline-block" />
              Products
            </h4>
            <ul className="space-y-3">
              {productLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="footer-link group inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500/50 group-hover:bg-violet-400 transition-colors duration-200 shrink-0" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Newsletter ── */}
          <div className="footer-col md:col-span-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-2 inline-flex items-center gap-2">
              <span className="w-4 h-px bg-cyan-500 inline-block" />
              Stay Updated
            </h4>
            <p className="text-sm text-slate-400 mb-5 mt-1 leading-relaxed">
              Get early access to new builds, exclusive drops, and tech
              announcements.
            </p>

            {/* Glassy newsletter card */}
            <div
              className="rounded-2xl border border-white/10 p-5"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                backdropFilter: "blur(8px)",
              }}
            >
              <form className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/70 focus:bg-blue-500/5 transition-all duration-300"
                />
                <button
                  type="submit"
                  className="relative w-full overflow-hidden rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 group"
                  style={{
                    background:
                      "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Subscribe
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </span>
                  {/* Shine sweep */}
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </button>
              </form>

              <p className="text-[11px] text-slate-600 mt-3 text-center">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>

        {/* ── Divider with gradient ── */}
        <div
          className="h-px w-full mb-8"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(59,130,246,0.4) 30%, rgba(139,92,246,0.4) 70%, transparent)",
          }}
        />

        {/* ── Bottom bar ── */}
        <div
          ref={bottomRef}
          className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500"
        >
          <p>
            © 2026{" "}
            <span className="text-slate-400 font-medium">Dollyva Computers</span>
            . All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-slate-600">
            <span>Crafted with</span>
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3 h-3 text-red-500 mx-0.5 animate-pulse"
            >
              <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
            </svg>
            <span>for performance enthusiasts</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms</Link>
            <Link href="/sitemap" className="hover:text-slate-300 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>

      {/* ── Keyframe for floating particles ── */}
      <style>{`
        @keyframes float-particle {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.4; }
          33%       { transform: translateY(-18px) translateX(8px); opacity: 0.7; }
          66%       { transform: translateY(-8px) translateX(-10px); opacity: 0.3; }
        }
        .animate-float-particle {
          animation-name: float-particle;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
      `}</style>
    </footer>
  );
}