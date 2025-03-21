"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, Heart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function Navbar() {
  const router = useRouter();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const [isOpen, setIsOpen] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  // Ensure client-side rendering for correct counts
  useEffect(() => {
    setTotalItems(cart.reduce((sum, item) => sum + item.quantity, 0));
    setWishlistCount(wishlist.length);
  }, [cart, wishlist]);

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between p-4">
        <h1
          className="text-3xl font-bold cursor-pointer bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-300"
          onClick={() => router.push("/")}
        >
          Nutri-BITE
        </h1>

        <ul className="hidden md:flex space-x-6 text-lg font-medium">
          {["Home", "Dishes", "Wishlist", "Cart"].map((item) => (
            <li key={item}>
              <button
                className="hover:text-orange-400 transition"
                onClick={() => router.push(item === "Home" ? "/" : `/${item.toLowerCase()}`)}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          {/* Wishlist Button */}
          <button onClick={() => router.push("/wishlist")} className="relative" aria-label="Wishlist">
            <Heart size={28} className="text-white hover:text-red-400" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button onClick={() => router.push("/cart")} className="relative" aria-label="Cart">
            <ShoppingCart size={28} className="text-white hover:text-orange-400" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu */}
          <button
            className="md:hidden ml-4"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 text-white p-4 space-y-2">
          {["Home", "Dishes", "Wishlist", "Cart"].map((item) => (
            <button
              key={item}
              className="block w-full py-2 text-center hover:text-orange-400"
              onClick={() => {
                router.push(item === "Home" ? "/" : `/${item.toLowerCase()}`);
                setIsOpen(false);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}