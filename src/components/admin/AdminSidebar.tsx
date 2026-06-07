"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, Wrench, Users, LogOut } from "lucide-react";

const ADMIN_LINKS = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Inventory", href: "/admin/inventory", icon: Package },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Custom Builds", href: "/admin/builds", icon: Wrench },
  { name: "Customers", href: "/admin/customers", icon: Users },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#0a0a0f] border-r border-white/5 flex flex-col h-screen sticky top-0">
      {/* Admin Brand */}
      <div className="h-20 flex items-center px-6 border-b border-white/5">
        <span className="font-bold text-lg tracking-wide text-white flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center text-xs">D</div>
          Dollyva <span className="font-light text-blue-400">Admin</span>
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-4 space-y-2">
        {ADMIN_LINKS.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
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
      <div className="p-4 border-t border-white/5">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all text-sm font-medium">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}