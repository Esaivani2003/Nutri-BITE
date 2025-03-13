"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main
      className="flex flex-col items-center justify-center min-h-screen w-full bg-cover bg-center bg-no-repeat text-white p-12"
      style={{ backgroundImage: "url('/bg1.jpg')" }}
    >
      <div className="max-w-lg bg-gradient-to-r from-black/60 to-transparent p-8 rounded-lg shadow-lg">
        <h1 className="text-5xl font-extrabold leading-tight">
          Eat Healthy , <span className="text-orange-400">Live Happy</span>
        </h1>
        <p className="text-lg mt-4">
        "Delicious, nutritious, and freshly prepared meals for a healthier you. Choose from balanced meals, keto, vegan, and more—delivered to your doorstep."
        </p>
        <button
          className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-lg shadow-md text-lg font-semibold hover:bg-orange-600 transition"
          onClick={() => router.push("/products")}
        >
          Get Started
        </button>
      </div>
    </main>
  );
}