"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { DollarSign, PackageOpen, Activity, AlertTriangle } from "lucide-react";

export default function AdminDashboard() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".admin-stagger",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="p-8 pt-24 max-w-7xl mx-auto">
      
      <div className="flex items-center justify-between mb-8 admin-stagger opacity-0">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Dashboard Overview</h1>
          <p className="text-sm text-slate-400">Welcome back. Here is what's happening at Dollyva today.</p>
        </div>
        <div className="text-sm text-slate-500 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
          System Status: <span className="text-green-400 font-medium">Online</span>
        </div>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Stat Card 1 */}
        <div className="admin-stagger opacity-0 bg-[#0b0b12] border border-white/5 p-6 rounded-2xl flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-400 font-medium mb-1">Total Revenue</p>
            <h3 className="text-2xl font-bold text-white">$24,590.00</h3>
            <span className="text-xs text-green-400 mt-2 inline-block">+12% from last week</span>
          </div>
          <div className="p-3 bg-green-500/10 text-green-400 rounded-xl">
            <DollarSign size={20} />
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="admin-stagger opacity-0 bg-[#0b0b12] border border-white/5 p-6 rounded-2xl flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-400 font-medium mb-1">Active Orders</p>
            <h3 className="text-2xl font-bold text-white">42</h3>
            <span className="text-xs text-blue-400 mt-2 inline-block">12 Custom Builds pending</span>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl">
            <Activity size={20} />
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="admin-stagger opacity-0 bg-[#0b0b12] border border-white/5 p-6 rounded-2xl flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-400 font-medium mb-1">Total Products</p>
            <h3 className="text-2xl font-bold text-white">1,204</h3>
            <span className="text-xs text-slate-500 mt-2 inline-block">Across 8 categories</span>
          </div>
          <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl">
            <PackageOpen size={20} />
          </div>
        </div>

        {/* Stat Card 4 (Alert) */}
        <div className="admin-stagger opacity-0 bg-red-500/5 border border-red-500/20 p-6 rounded-2xl flex items-start justify-between">
          <div>
            <p className="text-sm text-red-400/80 font-medium mb-1">Low Stock Alerts</p>
            <h3 className="text-2xl font-bold text-red-400">8</h3>
            <span className="text-xs text-red-400/60 mt-2 inline-block">Items require reordering</span>
          </div>
          <div className="p-3 bg-red-500/20 text-red-400 rounded-xl">
            <AlertTriangle size={20} />
          </div>
        </div>

      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Orders Table */}
        <div className="admin-stagger opacity-0 lg:col-span-2 bg-[#0b0b12] border border-white/5 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <h2 className="text-lg font-bold text-white">Recent Orders</h2>
            <button className="text-sm text-blue-400 hover:text-blue-300">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-400">
              <thead className="bg-white/5 text-slate-300">
                <tr>
                  <th className="px-6 py-4 font-medium">Order ID</th>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-mono text-white">#ORD-9021</td>
                  <td className="px-6 py-4">Alex Mercer</td>
                  <td className="px-6 py-4"><span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-medium">Processing</span></td>
                  <td className="px-6 py-4 text-white">$4,250.00</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-mono text-white">#ORD-9020</td>
                  <td className="px-6 py-4">Sarah Chen</td>
                  <td className="px-6 py-4"><span className="px-2.5 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">Shipped</span></td>
                  <td className="px-6 py-4 text-white">$1,899.99</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-mono text-white">#ORD-9019</td>
                  <td className="px-6 py-4">Marcus Johnson</td>
                  <td className="px-6 py-4"><span className="px-2.5 py-1 rounded-full bg-slate-500/20 text-slate-400 text-xs font-medium">Delivered</span></td>
                  <td className="px-6 py-4 text-white">$174.99</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions / Activity Feed */}
        <div className="admin-stagger opacity-0 bg-[#0b0b12] border border-white/5 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-6">Action Needed</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-xl border border-red-500/20 bg-red-500/5">
              <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-white mb-1">Restock RTX 4090</p>
                <p className="text-xs text-slate-400">Inventory has dropped below critical threshold (2 units remaining).</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 rounded-xl border border-blue-500/20 bg-blue-500/5">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-white mb-1">Approve Custom Build</p>
                <p className="text-xs text-slate-400">Order #ORD-9021 requires technician review before assembly begins.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}