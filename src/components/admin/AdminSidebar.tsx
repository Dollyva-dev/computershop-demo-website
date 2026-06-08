"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, Wrench, Users, LogOut, Menu, X } from "lucide-react";

const ADMIN_LINKS = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Inventory", href: "/admin/inventory", icon: Package },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Custom Builds", href: "/admin/builds", icon: Wrench },
  { name: "Customers", href: "/admin/customers", icon: Users },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // --- LOGOUT FUNCTION ---
  const handleLogout = () => {
    sessionStorage.removeItem("dollyva_admin_auth");
    window.location.reload(); // Refreshes the page to re-trigger the AuthGuard
  };

  return (
    <>
      {/* Mobile Header Bar */}
      <div className="md:hidden flex items-center justify-between bg-[#0a0a0f] h-16 px-4 border-b border-white/5 sticky top-0 z-50 shrink-0">
        <span className="font-bold text-lg tracking-wide text-white flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center text-xs">D</div>
          Dollyva <span className="font-light text-blue-400">Admin</span>
        </span>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="text-slate-300 hover:text-white transition-colors"
          aria-label="Toggle admin menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        bg-[#0a0a0f] flex-col 
        md:w-64 md:border-r md:border-white/5 md:h-screen md:sticky md:top-0 md:flex md:shrink-0
        ${isOpen ? "fixed inset-0 top-16 z-40 border-t border-white/5 flex h-[calc(100vh-4rem)]" : "hidden"}
      `}>
        {/* Admin Brand (Desktop Only) */}
        <div className="hidden md:flex h-20 items-center px-6 border-b border-white/5 shrink-0">
          <span className="font-bold text-lg tracking-wide text-white flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center text-xs">D</div>
            Dollyva <span className="font-light text-blue-400">Admin</span>
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {ADMIN_LINKS.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)} // Auto-close menu on mobile when a link is clicked
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? "bg-blue-600/10 text-blue-400 border border-blue-500/20" 
                    : "text-slate-400 hover:bg-white/5 hover:text-white border border-transparent"
                }`}
              >
                <Icon size={18} />
                <span className="font-medium text-sm">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/5 bg-[#0a0a0f] shrink-0">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all text-sm font-medium"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}