"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Eye } from "lucide-react";
import type { Product } from "@/types";
import { Price, Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn, ScaleOnHover } from "@/components/animations/index";
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
    addItem(product, 1);
  };

  return (
    <FadeIn delay={index * 0.1}>
      <ScaleOnHover>
        <Link href={`/products/${product.slug}`} className={cn("group", className)}>
          <div className="relative overflow-hidden rounded-xl bg-surface border border-text-muted/10">
            {/* Image */}
            <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && <Badge variant="primary">New</Badge>}
                {product.isBestseller && <Badge variant="success">Bestseller</Badge>}
                {product.comparePrice && product.comparePrice > product.price && (
                  <Badge variant="danger">Sale</Badge>
                )}
              </div>

              {/* Quick Actions */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                <Button
                  size="sm"
                  variant="primary"
                  onClick={handleAddToCart}
                  className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Link
                  href={`/products/${product.slug}`}
                  className="p-3 bg-white text-background rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-primary"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Eye className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <p className="text-xs text-text-muted uppercase tracking-wider mb-2">
                {product.category.replace("-", " ")}
              </p>
              <h3 className="font-serif text-lg font-semibold text-text mb-2 line-clamp-1">
                {product.name}
              </h3>

              {/* Colors */}
              <div className="flex items-center gap-2 mb-3">
                {product.colors.slice(0, 4).map((color) => (
                  <div
                    key={color.name}
                    className="w-4 h-4 rounded-full border border-text-muted/20"
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
                {product.colors.length > 4 && (
                  <span className="text-xs text-text-muted">
                    +{product.colors.length - 4}
                  </span>
                )}
              </div>

              {/* Price */}
              <Price
                price={product.price}
                comparePrice={product.comparePrice}
                className="text-lg"
              />
            </div>
          </div>
        </Link>
      </ScaleOnHover>
    </FadeIn>
  );
}
