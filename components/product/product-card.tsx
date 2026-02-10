"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Plus } from "lucide-react";
import type { Product } from "@/types";
import { Price, Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/index";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/lib/store";

interface ProductCardProps {
  product: Product;
  className?: string;
  index?: number;
}

export function ProductCard({ product, className, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  return (
    <FadeIn delay={index * 0.08}>
      <Link href={`/products/${product.slug}`} className={cn("group block", className)}>
        <div className="relative overflow-hidden rounded-lg bg-gray-900">
          {/* Image - Larger aspect ratio */}
          <div className="relative aspect-[3/4] overflow-hidden bg-gray-800">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Minimal Badge */}
            {product.isNew && (
              <div className="absolute top-3 left-3">
                <span className="px-2 py-1 bg-gold text-black text-[9px] tracking-wider uppercase font-medium">
                  New
                </span>
              </div>
            )}

            {/* Quick Add - Minimal overlay */}
            <button
              onClick={handleAddToCart}
              className="absolute bottom-0 left-0 right-0 py-4 bg-white/95 text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span className="text-xs tracking-wider uppercase font-medium">
                Quick Add
              </span>
            </button>
          </div>

          {/* Info - Simplified */}
          <div className="p-4">
            <h3 className="font-serif text-base text-white mb-2 line-clamp-1 group-hover:text-gold transition-colors">
              {product.name}
            </h3>

            {/* Colors - Minimal dots */}
            {product.colors.length > 1 && (
              <div className="flex items-center gap-1.5 mb-3">
                {product.colors.slice(0, 5).map((color) => (
                  <div
                    key={color.name}
                    className="w-3 h-3 rounded-full border border-gray-700"
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
                {product.colors.length > 5 && (
                  <span className="text-gray-500 text-xs">
                    +{product.colors.length - 5}
                  </span>
                )}
              </div>
            )}

            {/* Price */}
            <Price
              price={product.price}
              comparePrice={product.comparePrice}
            />
          </div>
        </div>
      </Link>
    </FadeIn>
  );
}
