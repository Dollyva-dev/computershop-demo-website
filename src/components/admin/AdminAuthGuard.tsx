"use client";

import { useState } from "react";
import { Lock } from "lucide-react";

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Replace 'admin123' with your actual password
    if (password === "admin123") {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPassword("admin123");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#050505] p-4 text-slate-200">
        <div className="max-w-md w-full bg-[#0b0b12] border border-white/5 p-8 rounded-2xl shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="p-4 bg-white/5 rounded-full mb-4">
              <Lock size={32} className="text-slate-300" />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Access</h1>
            <p className="text-sm text-slate-400 mt-2">Enter the master password to continue.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className={`w-full bg-white/5 border ${
                  error ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-blue-500"
                } rounded-xl px-4 py-3 text-white placeholder:text-slate-500 outline-none transition-colors`}
                autoFocus
              />
              {error && <p className="text-red-400 text-xs mt-2">Incorrect password. Please try again.</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors"
            >
              Unlock Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

  // If authenticated, render the layout and its children
  return <>{children}</>;
}