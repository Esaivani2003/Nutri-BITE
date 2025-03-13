"use client";

import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import Navbar from "../components/Navbar";
import Footer from "../components/footer"; // Ensure case matches file system
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setShowToast(true);
  }, []);

  return (
    <html lang="en">
      <body className="bg-gray-100">
        <WishlistProvider>
          <CartProvider>
            <Navbar />
            {showToast && <ToastContainer position="top-right" autoClose={2000} />}
            <main className="container mx-auto p-6">{children}</main>
            <Footer />
          </CartProvider>
        </WishlistProvider>
      </body>
    </html> 
  );
}