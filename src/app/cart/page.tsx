"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { X, Minus, Plus } from "lucide-react";

// --- Types & Mock Data ---
type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
};

const INITIAL_CART: CartItem[] = [
  {
    id: "item-1",
    name: "ASUS ROG Strix GeForce RTX 4090",
    price: 1999.99,
    quantity: 1,
    image: "/placeholder-gpu.webp",
    category: "Graphics Cards",
  },
  {
    id: "item-2",
    name: "Custom Dollyva Rig - 'The Behemoth'",
    price: 4250.00,
    quantity: 1,
    image: "/placeholder-case.webp",
    category: "Custom Build",
  },
  {
    id: "item-3",
    name: "Wooting 60HE+ Analog Keyboard",
    price: 174.99,
    quantity: 2,
    image: "/placeholder-keyboard-1.webp",
    category: "Keyboards",
  }
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART);
  const containerRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: containerRef });

  // 1. Premium Entrance Animation
  useGSAP(() => {
    if (cartItems.length > 0) {
      // Reveal Header
      gsap.fromTo(
        ".cart-header",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out", stagger: 0.1 }
      );
      
      // Reveal Cart Rows
      gsap.fromTo(
        ".cart-row",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.2 }
      );

      // Reveal Summary Panel
      gsap.fromTo(
        ".summary-panel",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "expo.out", delay: 0.3 }
      );
    }
  }, { dependencies: [] });

  // 2. Quantity Handlers
  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  // 3. GSAP Smooth Remove Animation
  const handleRemoveItem = contextSafe((id: string) => {
    const itemElement = document.getElementById(`cart-row-${id}`);
    if (!itemElement) return;

    // Smoothly fade and collapse the row
    gsap.to(itemElement, {
      opacity: 0,
      height: 0,
      paddingTop: 0,
      paddingBottom: 0,
      borderBottomWidth: 0,
      duration: 0.5,
      ease: "power3.inOut",
      onComplete: () => {
        setCartItems(prev => prev.filter(item => item.id !== id));
      }
    });
  });

  // 4. Math Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const taxRate = 0.08; // 8% placeholder tax
  const taxes = subtotal * taxRate;
  const shipping = subtotal > 1000 ? 0 : 49.99; // Free shipping over $1000
  const total = subtotal + taxes + shipping;

  return (
    <div ref={containerRef} className="w-full bg-background min-h-screen pt-32 pb-24 text-foreground border-t border-white/10">
      <div className="max-w-[100rem] mx-auto px-6 md:px-12">
        
        {/* ── Massive Editorial Header ── */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-8">
          <div className="overflow-hidden">
            <h1 className="cart-header text-[12vw] md:text-[8vw] font-bold uppercase tracking-tighter leading-none text-white m-0">
              CART_
            </h1>
          </div>
          <div className="cart-header flex flex-col md:items-end mt-6 md:mt-0">
            <span className="text-xs font-mono tracking-widest text-gray-500 uppercase">
              Current Selection
            </span>
            <span className="text-sm font-bold text-white uppercase tracking-widest mt-1">
              [ 0{cartItems.length} ] ITEMS
            </span>
          </div>
        </div>

        {cartItems.length === 0 ? (
          /* ── Empty State ── */
          <div className="flex flex-col items-center justify-center py-32 border border-white/10 bg-[#050505]">
            <div className="text-[10vw] font-black text-white/5 leading-none select-none pointer-events-none tracking-tighter">
              EMPTY
            </div>
            <p className="text-sm font-light tracking-wide text-gray-400 mt-6 text-center max-w-md">
              Your cart is currently empty. Explore the catalog to begin your build.
            </p>
            <Link 
              href="/products" 
              className="mt-8 px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-gray-300 transition-colors"
            >
              Back to Catalog
            </Link>
          </div>
        ) : (
          /* ── Populated Cart State ── */
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            
            {/* LEFT COLUMN: Cart Items */}
            <div className="flex-1 w-full flex flex-col">
              
              {/* Table Headers (Hidden on Mobile) */}
              <div className="hidden md:flex justify-between items-center pb-4 border-b border-white/10 text-xs font-mono tracking-widest uppercase text-gray-500">
                <span className="w-[50%]">Product</span>
                <span className="w-[20%] text-center">Quantity</span>
                <span className="w-[20%] text-right">Total</span>
                <span className="w-[10%] text-right"></span>
              </div>

              {/* Items List */}
              {cartItems.map((item) => (
                <div 
                  key={item.id}
                  id={`cart-row-${item.id}`}
                  className="cart-row group flex flex-col md:flex-row items-start md:items-center py-8 border-b border-white/10 transition-colors"
                >
                  {/* Product Image & Details */}
                  <div className="w-full md:w-[50%] flex items-center gap-6 mb-6 md:mb-0">
                    <Link href={`/products/${item.id}`} className="relative w-24 h-24 bg-[#050505] border border-white/10 flex-shrink-0 flex items-center justify-center p-4 group-hover:border-white/30 transition-colors overflow-hidden">
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill 
                        className="object-contain grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                      />
                    </Link>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-1">
                        {item.category}
                      </span>
                      <Link href={`/products/${item.id}`} className="text-base md:text-lg font-bold text-white uppercase tracking-tight group-hover:text-gray-300 transition-colors">
                        {item.name}
                      </Link>
                      <span className="text-sm font-mono text-gray-400 mt-2 md:hidden">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Quantity Controller */}
                  <div className="w-full md:w-[20%] flex md:justify-center mb-6 md:mb-0">
                    <div className="flex items-center border border-white/20 rounded-full px-2 py-1">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} strokeWidth={2} />
                      </button>
                      <span className="w-8 text-center text-sm font-mono text-white">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} strokeWidth={2} />
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="w-full md:w-[20%] flex md:justify-end mb-4 md:mb-0 hidden md:flex">
                    <span className="text-lg font-mono font-bold text-white">
                      ${(item.price * item.quantity).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  {/* Remove Button */}
                  <div className="w-full md:w-[10%] flex justify-end">
                    <button 
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-gray-500 hover:text-white transition-colors p-2"
                      aria-label="Remove item"
                    >
                      <X size={20} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT COLUMN: Architectural Summary Panel */}
            <div className="summary-panel w-full lg:w-[400px] xl:w-[450px] shrink-0 sticky top-32">
              <div className="bg-[#050505] border border-white/10 p-8 lg:p-10">
                
                <h2 className="text-xl font-bold uppercase tracking-tight text-white border-b border-white/10 pb-6 mb-8">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-8 font-mono text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span className="uppercase tracking-widest">Subtotal</span>
                    <span className="text-white">${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span className="uppercase tracking-widest">Taxes (8%)</span>
                    <span className="text-white">${taxes.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span className="uppercase tracking-widest">Shipping</span>
                    {shipping === 0 ? (
                      <span className="text-white font-bold">COMPLIMENTARY</span>
                    ) : (
                      <span className="text-white">${shipping.toFixed(2)}</span>
                    )}
                  </div>
                </div>

                {shipping > 0 && (
                  <div className="text-[10px] font-mono text-gray-400 mb-8 border-l border-white/40 pl-4 py-1 uppercase tracking-wider">
                    Add ${(1000 - subtotal).toFixed(2)} more to unlock complimentary shipping.
                  </div>
                )}

                <div className="w-full h-px bg-white/20 mb-8" />

                <div className="flex justify-between items-end mb-10">
                  <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Total</span>
                  <span className="text-4xl font-black text-white tracking-tighter">
                    ${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>
                </div>

                {/* Animated Brutalist Checkout Button */}
                <button className="group relative w-full flex items-center justify-center px-8 py-5 bg-white text-black font-bold uppercase tracking-widest text-xs overflow-hidden">
                  <span className="relative z-10 group-hover:-translate-y-12 transition-transform duration-500">
                    Proceed to Checkout
                  </span>
                  <span className="absolute z-10 translate-y-12 group-hover:translate-y-0 transition-transform duration-500 text-white">
                    Secure Connection
                  </span>
                  {/* Hover Fill */}
                  <div className="absolute inset-0 bg-[#0a0a0a] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                </button>

              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}