"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import type { Product } from "@/types";
import { useCartStore } from "@/lib/store";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdded, setIsAdded] = React.useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <Link href={`/products/${product.slug}`} className={className}>
      <div className="group bg-card border border-border overflow-hidden hover:border-champagne/30 transition-colors">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-card">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />

          {/* Badges */}
          {product.isNew && (
            <span className="absolute top-3 left-3 px-2 py-1 bg-champagne text-background text-[10px] tracking-wider uppercase font-medium">
              New
            </span>
          )}

          {product.isBestseller && (
            <span className="absolute top-3 left-3 px-2 py-1 bg-background/80 backdrop-blur text-champagne text-[10px] tracking-wider uppercase font-medium border border-champagne/20">
              Bestseller
            </span>
          )}

          {/* Quick Add Button */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-0 left-0 right-0 py-4 bg-background/90 backdrop-blur text-foreground opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-xs tracking-wider uppercase hover:bg-champagne hover:text-background"
          >
            {isAdded ? <span>Added</span> : <><Plus className="w-4 h-4" /> Quick Add</>}
          </button>
        </div>

        {/* Info */}
        <div className="p-5">
          <h3 className="text-foreground text-base mb-3 group-hover:text-champagne transition-colors">
            {product.name}
          </h3>

          {/* Colors */}
          {product.colors.length > 1 && (
            <div className="flex items-center gap-2 mb-4">
              {product.colors.slice(0, 5).map((color) => (
                <div
                  key={color.name}
                  className="w-3 h-3 rounded-full border border-border"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              {product.colors.length > 5 && (
                <span className="text-foreground/40 text-xs">+{product.colors.length - 5}</span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-champagne text-lg">
              ${product.price}
            </span>
            {product.comparePrice && (
              <span className="text-foreground/40 line-through text-sm">
                ${product.comparePrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
