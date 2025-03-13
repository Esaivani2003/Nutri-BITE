"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import Image from "next/image";



const products = [
  {
    id: 1,
    name: "Palak Paneer",
    price: 599,
    image: "/p1.jpg",
    description: "Creamy spinach curry with paneer (Indian cheese), spices, and herbs.",
  },
  {
    id: 2,
    name: "Chana Masala",
    price: 1099,
    image: "/p2.jpg",
    description: "Spicy North Indian chickpea curry with onions, tomatoes, and aromatic spices.",
  },
  {
    id: 3,
    name: "Butter Chicken",
    price: 199,
    image: "/p3.jpg",
    description: "Tender chicken cooked in rich, creamy tomato sauce with butter.",
  },
  {
    id: 4,
    name: "Ras Malai",
    price: 299,
    image: "/p4.jpg",
    description: "Creamy paneer dessert soaked in sweetened milk, garnished with nuts.",
  },
  {
    id: 5,
    name: "Gulab Jamun",
    price: 299,
    image: "/p5.jpg",
    description: "Deep-fried dumplings soaked in sweet, fragrant syrup.",
  },
  {
    id: 6,
    name: "Vegetable Jalfrezi",
    price: 299,
    image: "/p6.jpg",
    description: "Stir-fried mixed vegetables, onions, and bell peppers in a flavorful tomato-based sauce",
  },
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <h1 className="text-center text-red-500 text-xl mt-10">
        Product not found
      </h1>
    );
  }

  const productWithQuantity = { ...product, quantity: 1 };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg">
        {/* Product Image */}
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={300}
          className="w-full h-64 object-cover rounded-md mb-4"
        />

        {/* Product Details */}
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-xl font-semibold text-blue-600">${product.price}</p>

        {/* Add to Cart & Wishlist Buttons */}
        <div className="flex gap-4 mt-4">
          <button
            className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            onClick={() => addToCart(productWithQuantity)}
          >
            <FaShoppingCart /> Add to Cart
          </button>

          <button
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md transition ${
              isInWishlist(product.id) ? "bg-red-500 text-white" : "bg-gray-300 text-black hover:bg-gray-400"
            }`}
            onClick={() => toggleWishlist(product)}
          >
            <FaHeart className="text-white" /> 
            {isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
          </button>
        </div>

        {/* Back to Products Link */}
        <Link href="/products">
          <p className="mt-4 text-center text-gray-500 hover:text-gray-700 cursor-pointer">
            ← Back to Products
          </p>
        </Link>
      </div>
    </div>
  );
}
