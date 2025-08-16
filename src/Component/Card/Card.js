"use client"
import React from "react";
import Link from "next/link";

export const ProductCard = ({ Products }) => {
  return Products?.map((product) => (
    <div
      key={product.id}
      className="h-[450px] bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      {/* Product Image */}
      <div className="h-56 flex items-center justify-center overflow-hidden rounded-t-xl bg-gray-50">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-1 mb-1">
          {product.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-500 line-clamp-2 mb-3">
          {product.description}
        </p>

        {/* Price & Discount */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xl font-bold text-green-600">
            ${product.price}
          </span>
          <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-full">
            -{product.discountPercentage}%
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <span className="text-yellow-400 mr-1">⭐</span>
          <span className="text-sm font-medium text-gray-700">
            {product.rating?.toFixed(1)}
          </span>
        </div>

        {/* Availability */}
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full self-start ${
            (product.availabilityStatus || "In Stock").toLowerCase() === "in stock"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {product.availabilityStatus || "In Stock"}
        </span>

        {/* Spacer to push button down */}
        <div className="flex-grow"></div>

        {/* Button */}
        <Link
          href={`/preview/${product.id}`}
          className="mt-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm text-center font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  ));
};
