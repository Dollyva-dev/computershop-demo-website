"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

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
    image: "/placeholder-gpu (2).webp",
    category: "Graphics Cards",
  },
  {
    id: "item-2",
    name: "Custom Dollyva Rig - 'The Behemoth'",
    price: 4250.00,
    quantity: 1,
    image: "/placeholder-case (2).webp",
    category: "Custom Build",
  },
  {
    id: "item-3",
    name: "Wooting 60HE+ Analog Keyboard",
    price: 174.99,
    quantity: 2,
    image: "/placeholder-keyboard-1 (2).webp",
    category: "Keyboards",
  }
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART);
  const containerRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: containerRef });

  // 1. Entrance Animation
  useGSAP(() => {
    if (cartItems.length > 0) {
      gsap.fromTo(
        ".cart-item",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
      );
      gsap.fromTo(
        ".summary-panel",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.3, ease: "power2.out" }
      );
    }
  }, { dependencies: [] });

  // 2. Quantity Handlers
  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta); // Prevent going below 1
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  // 3. GSAP Remove Item Animation
  const handleRemoveItem = contextSafe((id: string) => {
    const itemElement = document.getElementById(`cart-row-${id}`);
    if (!itemElement) return;

    // Animate the item sliding out and shrinking
    gsap.to(itemElement, {
      x: -50,
      opacity: 0,
      height: 0,
      marginBottom: 0,
      paddingTop: 0,
      paddingBottom: 0,
      duration: 0.4,
      ease: "power3.in",
      onComplete: () => {
        // Remove from React state AFTER animation finishes
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
    <div ref={containerRef} className="w-full max-w-7xl mx-auto px-6 pt-24 pb-12 min-h-[70vh]">
      
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
          <ShoppingBag className="text-blue-500" size={32} />
          Your Cart
        </h1>
        <p className="text-slate-400">
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart.
        </p>
      </div>

      {cartItems.length === 0 ? (
        /* Empty Cart State */
        <div className="flex flex-col items-center justify-center py-24 bg-[#0b0b12] border border-white/5 rounded-2xl backdrop-blur-md">
          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
            <ShoppingBag size={40} className="text-slate-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
          <p className="text-slate-400 mb-8 text-center max-w-md">
            Looks like you haven't added anything to your cart yet. Explore our elite hardware and custom builds.
          </p>
          <Link 
            href="/products" 
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-colors shadow-[0_0_20px_rgba(59,130,246,0.2)]"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        /* Populated Cart State */
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          
          {/* LEFT COLUMN: Cart Items */}
          <div className="w-full lg:w-2/3 flex flex-col gap-4">
            {cartItems.map((item) => (
              <div 
                key={item.id}
                id={`cart-row-${item.id}`}
                className="cart-item flex flex-col sm:flex-row items-center gap-6 p-4 bg-[#0b0b12] border border-white/5 rounded-2xl backdrop-blur-md relative overflow-hidden"
              >
                {/* Product Image */}
                <div className="w-full sm:w-32 h-32 bg-black/40 rounded-xl relative flex-shrink-0 flex items-center justify-center p-2">
                  <Image src={item.image} alt={item.name} fill className="object-contain" />
                </div>

                {/* Product Info */}
                <div className="flex-1 w-full flex flex-col text-center sm:text-left">
                  <span className="text-xs text-blue-400 font-medium uppercase tracking-wider mb-1">
                    {item.category}
                  </span>
                  <Link href={`/products/${item.id}`} className="text-lg font-semibold text-white hover:text-blue-400 transition-colors mb-2">
                    {item.name}
                  </Link>
                  <span className="text-xl font-bold text-slate-300">
                    ${item.price.toFixed(2)}
                  </span>
                </div>

                {/* Actions (Quantity & Remove) */}
                <div className="flex sm:flex-col items-center gap-4 sm:gap-6 w-full sm:w-auto justify-between sm:justify-center">
                  
                  {/* Quantity Controller */}
                  <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-1">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-10 text-center text-sm font-medium text-white">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button 
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-slate-500 hover:text-red-400 transition-colors flex items-center gap-2 text-sm font-medium"
                  >
                    <Trash2 size={18} />
                    <span className="sm:hidden">Remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN: Order Summary */}
          <div className="summary-panel w-full lg:w-1/3 sticky top-28">
            <div className="bg-[#0b0b12] border border-white/10 rounded-2xl p-6 lg:p-8 backdrop-blur-xl shadow-2xl">
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Estimated Tax (8%)</span>
                  <span className="text-white">${taxes.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-green-400 font-medium">Free</span>
                  ) : (
                    <span className="text-white">${shipping.toFixed(2)}</span>
                  )}
                </div>
              </div>

              {shipping > 0 && (
                <div className="text-xs text-blue-400 mb-6 bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                  Add ${(1000 - subtotal).toFixed(2)} more to your cart to unlock free shipping!
                </div>
              )}

              <div className="w-full h-px bg-white/10 mb-6" />

              <div className="flex justify-between items-end mb-8">
                <span className="text-lg font-bold text-white">Total</span>
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  ${total.toFixed(2)}
                </span>
              </div>

              <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                Secure Checkout <ArrowRight size={20} />
              </button>

              <div className="mt-6 flex items-center justify-center gap-4 text-slate-500">
                {/* Fake trust badges for visual detail */}
                <div className="flex gap-2 text-xs">
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"/> SSL Secured</span>
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"/> Verified</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}