"use client";

import Image from "next/image";
import { Product, formatCurrency } from "@/types";

interface ProductCardProps {
  product: Product;
  onBuy: (product: Product) => void;
  disabled?: boolean;
}

export default function ProductCard({
  product,
  onBuy,
  disabled = false,
}: ProductCardProps) {
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock <= 5 && product.stock > 0;

  return (
    <div className="group relative">
      {/* Main Card */}
      <div className="floating-card p-6 h-full relative overflow-hidden">
        {/* Stock Indicator Badge */}
        <div className="absolute top-4 right-4 z-10">
          <div
            className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
              product.stock > 5
                ? "bg-success-500 text-white"
                : product.stock > 0
                ? "bg-warning-500 text-white animate-pulse"
                : "bg-error-500 text-white"
            }`}
          >
            {product.stock > 5
              ? "✓ In Stock"
              : product.stock > 0
              ? `${product.stock} left`
              : "Sold Out"}
          </div>
        </div>

        {/* Product Image */}
        <div className="relative h-52 mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-secondary-100 to-secondary-50 group-hover:scale-105 transition-transform duration-500">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Overlay Effects */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">😞</div>
                <span className="text-white font-bold text-lg">
                  OUT OF STOCK
                </span>
              </div>
            </div>
          )}

          {/* Floating Action Button */}
          {!isOutOfStock && (
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <button
                onClick={() => onBuy(product)}
                disabled={disabled}
                className={`w-12 h-12 rounded-full shadow-lg transition-all duration-300 ${
                  disabled
                    ? "bg-secondary-300 text-secondary-500 cursor-not-allowed"
                    : "bg-white text-primary-600 hover:bg-primary-600 hover:text-white hover:scale-110"
                }`}
              >
                🛒
              </button>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-xl text-secondary-800 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors duration-300">
              {product.name}
            </h3>

            {/* Price Display */}
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-gradient">
                {formatCurrency(product.price)}
              </div>

              {isLowStock && (
                <div className="flex items-center space-x-1 text-warning-600 animate-pulse">
                  <span className="text-sm">⚠️</span>
                  <span className="text-xs font-semibold">Low Stock!</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => onBuy(product)}
            disabled={disabled || isOutOfStock}
            className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
              disabled || isOutOfStock
                ? "bg-secondary-200 text-secondary-400 cursor-not-allowed"
                : disabled
                ? "bg-secondary-300 text-secondary-500 cursor-not-allowed"
                : "btn-primary group-hover:shadow-glow"
            }`}
          >
            {isOutOfStock ? (
              <span className="text-sm">
                <span>Out of Stock</span>
              </span>
            ) : disabled ? (
              <span className="text-sm">
                <span>Insert Money First</span>
              </span>
            ) : (
              <span className="text-sm">
                <span>Buy Now</span>
              </span>
            )}
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-primary-200/50 to-accent-200/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
        <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-tr from-accent-200/50 to-primary-200/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>
      </div>
    </div>
  );
}
