import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0f] border-t border-white/5 pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="md:col-span-1">
            <span className="font-bold text-xl tracking-wide text-white block mb-4">
              Dollyva <span className="font-light text-slate-400">computers</span>
            </span>
            <p className="text-sm text-slate-400 leading-relaxed">
              Built by Enthusiasts, For Enthusiasts. Premium hardware and uncompromised performance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/support" className="hover:text-blue-400 transition">Support</Link></li>
              <li><Link href="/warranty" className="hover:text-blue-400 transition">Warranty Info</Link></li>
              <li><Link href="/track-order" className="hover:text-blue-400 transition">Track Order</Link></li>
              <li><Link href="/terms" className="hover:text-blue-400 transition">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Newsletter (Spans 2 cols on desktop) */}
          <div className="md:col-span-2">
            <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
            <p className="text-sm text-slate-400 mb-4">
              Subscribe for drop alerts on new tech and exclusive Dollyva builds.
            </p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow bg-white/5 border border-white/10 rounded-md px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-white/5 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>© 2026 Dollyva. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}