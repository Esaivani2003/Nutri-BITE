"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext"; // Import Wishlist Context

const products = [
  { id: 1, name: "Palak Paneer", price: 599, image: "/p1.jpg" },
  { id: 2, name: "Chana Masala", price: 1099, image: "/p2.jpg" },
  { id: 3, name: "Butter Chicken", price: 199, image: "/p3.jpg" },
  { id: 4, name: "Ras Malai", price: 299, image: "/p4.jpg" },
  { id: 5, name: "Gulab Jamun", price: 299, image: "/p5.jpg" },
  { id: 6, name: " Vegetable Jalfrezi", price: 299, image: "/p6.jpg" },
];

// Offers for the carousel
const offers = [
  { id: 1, image: "/offer1.jpg", title: "Big Sale on Electronics!" },
  { id: 2, image: "/offer2.jpg", title: "50% Off on Smartphones!" },
  { id: 3, image: "/offer3.jpg", title: "Buy 1 Get 1 Free on Headphones!" },
];

export default function ProductsPage() {
  const { wishlist, toggleWishlist } = useWishlist(); // Get Wishlist State & Toggle Function

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Offer Carousel */}
      <div className="mb-6">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
          loop={true}
          className="w-full h-[300px] md:h-[400px] rounded-lg shadow-lg"
        >
          {offers.map((offer) => (
            <SwiperSlide key={offer.id} className="relative w-full h-[300px] md:h-[400px]">
              <Image
                src={offer.image}
                alt={offer.title}
                fill
                className="object-cover w-full h-full rounded-lg"
                priority
                quality={100}
                sizes="(max-width:768px)100vw,(max-width:1200px)80vw,50vw"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Product Listing */}
      <h1 className="text-3xl font-bold mb-6 text-center">Explore Our Dishes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition relative"
          >
            {/* Wishlist Button */}
            <button
              className="absolute top-4 right-4"
              onClick={() => toggleWishlist(product)}
              aria-label="Wishlist"
            >
              <Heart
                size={24}
                className={wishlist.some((item) => item.id === product.id) ? "text-red-500" : "text-gray-400"}
                fill={wishlist.some((item) => item.id === product.id) ? "red" : "none"}
              />
            </button>

            {/* Product Image */}
            <div className="relative w-full h-48">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover rounded-md"
              />
            </div>

            <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
            <Link href={`/products/${product.id}`}>
            <button className="mt-3 w-full flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
              View
            </button>
          </Link>
</div>
))}
    </div>
   </div >
  );
}