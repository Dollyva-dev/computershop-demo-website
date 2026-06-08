"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Search, Plus, Edit, Trash2, X, Upload } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// --- Types & Mock Data ---
type InventoryItem = {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  status: "Active" | "Draft" | "Out of Stock";
  image: string;
};

const INITIAL_INVENTORY: InventoryItem[] = [
  { id: "INV-001", name: "ASUS ROG Strix RTX 4090", category: "Graphics Cards", stock: 12, price: 1999.99, status: "Active", image: "/placeholder-gpu.png" },
  { id: "INV-002", name: "Intel Core i9-14900K", category: "Processors", stock: 3, price: 589.00, status: "Active", image: "/placeholder-cpu.png" }, // Low stock example
  { id: "INV-003", name: "Razer Blade 16 (2026)", category: "Laptops", stock: 0, price: 3299.99, status: "Out of Stock", image: "/placeholder-laptop-1.png" },
  { id: "INV-004", name: "Wooting 60HE+ Keyboard", category: "Accessories", stock: 45, price: 174.99, status: "Active", image: "/placeholder-keyboard-1.png" },
  { id: "INV-005", name: "Corsair RM1000x PSU", category: "Power Supply", stock: 18, price: 209.99, status: "Active", image: "/placeholder-psu.png" },
];

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  // GSAP Entrance Animation for Table Rows
  useGSAP(() => {
    gsap.fromTo(
      ".stagger-row",
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" }
    );
  }, { scope: tableRef, dependencies: [inventory, searchTerm] }); // Re-run when data changes

  // Filter Logic
  const filteredInventory = inventory.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Delete Handler
  const handleDelete = (id: string) => {
    if(confirm("Are you sure you want to delete this item?")) {
      setInventory(prev => prev.filter(item => item.id !== id));
    }
  };

  return (
    <div className="p-4 md:p-8 pt-20 md:pt-24 max-w-[1600px] mx-auto relative min-h-screen">
      
      {/* Page Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Inventory Management</h1>
          <p className="text-sm text-slate-400">Manage products, pricing, and stock levels.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search inventory..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-[#0b0b12] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 transition-colors w-full sm:w-64"
            />
          </div>
          
          {/* Add Product Button */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-xl transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)] w-full sm:w-auto shrink-0"
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>
      </div>

      {/* Inventory Table Container */}
      <div ref={tableRef} className="bg-[#0b0b12] border border-white/5 rounded-2xl overflow-hidden shadow-xl w-full">
        <div className="overflow-x-auto">
          {/* Added min-w-[800px] to force horizontal scroll instead of crushing columns on mobile */}
          <table className="w-full text-left text-sm text-slate-400 min-w-[800px]">
            <thead className="bg-white/5 text-slate-300 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Stock Level</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="stagger-row hover:bg-white/[0.02] transition-colors group">
                  
                  {/* Product Info */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 shrink-0 rounded-lg bg-black/40 border border-white/5 flex items-center justify-center p-1 relative">
                        <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                      </div>
                      <div>
                        <p className="text-white font-medium mb-0.5 whitespace-nowrap">{item.name}</p>
                        <p className="text-xs text-slate-500 font-mono">{item.id}</p>
                      </div>
                    </div>
                  </td>
                  
                  {/* Category */}
                  <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
                  
                  {/* Stock Level with automated colored alerts */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${
                        item.stock === 0 ? "bg-red-500" : item.stock < 5 ? "bg-orange-500" : "bg-green-500"
                      }`} />
                      <span className={item.stock < 5 ? "text-orange-400 font-medium" : ""}>
                        {item.stock} in stock
                      </span>
                    </div>
                  </td>
                  
                  {/* Price */}
                  <td className="px-6 py-4 text-white font-medium whitespace-nowrap">
                    ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  
                  {/* Status Badge */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium inline-block ${
                      item.status === "Active" ? "bg-green-500/10 text-green-400 border border-green-500/20" :
                      item.status === "Draft" ? "bg-slate-500/10 text-slate-400 border border-slate-500/20" :
                      "bg-red-500/10 text-red-400 border border-red-500/20"
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  
                  {/* Actions (Always visible on mobile/tablets since there is no hover capability) */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors">
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
              {filteredInventory.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    No products found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- ADD PRODUCT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={() => setIsModalOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="relative w-full max-w-2xl bg-[#0b0b12] border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
            
            <div className="p-4 md:p-6 border-b border-white/5 flex items-center justify-between shrink-0">
              <h2 className="text-xl font-bold text-white">Add New Product</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 md:p-6 overflow-y-auto space-y-6">
              
              {/* Image Upload Area */}
              <div className="w-full h-32 md:h-40 border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                <Upload className="text-slate-500 group-hover:text-blue-400 mb-2 transition-colors" size={24} />
                <p className="text-sm text-slate-400 font-medium">Click to upload product image</p>
                <p className="text-xs text-slate-500">PNG, JPG up to 5MB</p>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-slate-400 font-medium">Product Name</label>
                  <input type="text" className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" placeholder="e.g. RTX 5090" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-400 font-medium">Category</label>
                  <select className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 cursor-pointer">
                    <option>Graphics Cards</option>
                    <option>Processors</option>
                    <option>Motherboards</option>
                    <option>Laptops</option>
                    <option>Accessories</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-400 font-medium">Price ($)</label>
                  <input type="number" className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-400 font-medium">Initial Stock Quantity</label>
                  <input type="number" className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" placeholder="0" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm text-slate-400 font-medium">Product Description</label>
                  <textarea rows={4} className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 resize-none" placeholder="Enter product specs and details..." />
                </div>
              </div>
            </div>

            <div className="p-4 md:p-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-end gap-3 sm:gap-4 bg-white/[0.02] rounded-b-2xl shrink-0">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-full sm:w-auto px-6 py-2.5 sm:py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors order-2 sm:order-1"
              >
                Cancel
              </button>
              <button 
                className="w-full sm:w-auto px-6 py-2.5 sm:py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)] order-1 sm:order-2"
              >
                Save Product
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}