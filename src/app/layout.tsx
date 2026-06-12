import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Using Poppins for a sleek, modern, and geometric aesthetic
const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Poppins requires explicit weights
});

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
      <body className={`${poppins.className} bg-background text-foreground antialiased min-h-screen flex flex-col`}>
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