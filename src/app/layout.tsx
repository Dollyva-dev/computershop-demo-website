import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Using Inter for a clean, modern aesthetic
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dollyva Computers | Next-Gen Power Unleashed",
  description: "Forge your ultimate custom rig or shop the latest tech at Dollyva.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#050505] text-slate-200 antialiased min-h-screen flex flex-col`}>
        <Header />
        {/* Main content takes up available space, pushing footer down */}
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}