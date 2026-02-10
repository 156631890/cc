"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  Truck,
  Shield,
  RotateCcw,
  X,
} from "lucide-react";
import { Price } from "@/components/ui/badge";
import { ColorSelector } from "@/components/ui/color-selector";
import { FadeIn } from "@/components/animations/index";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";
import { useCartStore } from "@/lib/store";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const product = getProductBySlug(slug);
  const addItem = useCartStore((state) => state.addItem);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name || "");

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-white mb-4">
            Product Not Found
          </h1>
          <Link href="/products">
            <button className="btn-outline">Back to Products</button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product.id, product.category);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, 1);
    }
  };

  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-black">
      {/* Breadcrumb - Minimal */}
      <div className="border-b border-gold/10 py-4">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gold transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/products"
              className="hover:text-gold transition-colors"
            >
              Collection
            </Link>
            <span>/</span>
            <span className="text-white">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Image Gallery */}
          <FadeIn>
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-gray-900">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {discount > 0 && (
                  <span className="absolute top-4 left-4 px-2 py-1 bg-gold text-black text-[10px] tracking-wider uppercase font-medium">
                    Save {discount}%
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative w-20 h-20 rounded overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? "border-gold opacity-100"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </FadeIn>

          {/* Product Info */}
          <FadeIn delay={0.2}>
            <div className="lg:sticky lg:top-24">
              {/* Badges */}
              <div className="flex items-center gap-2 mb-4">
                {product.isNew && (
                  <span className="px-2 py-1 bg-gold text-black text-[9px] tracking-wider uppercase">
                    New
                  </span>
                )}
                {product.isBestseller && (
                  <span className="px-2 py-1 bg-gray-800 text-gray-300 text-[9px] tracking-wider uppercase border border-gold/20">
                    Bestseller
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl lg:text-4xl text-white mb-4">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mb-6">
                <Price
                  price={product.price}
                  comparePrice={product.comparePrice}
                  size="lg"
                />
              </div>

              {/* Description */}
              <p className="text-gray-400 leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Color Selector */}
              {product.colors.length > 0 && (
                <ColorSelector
                  colors={product.colors}
                  selected={selectedColor}
                  onChange={setSelectedColor}
                  className="mb-8"
                />
              )}

              {/* Features - Minimal */}
              {product.features.length > 0 && (
                <div className="mb-8">
                  <p className="text-xs tracking-wider uppercase text-gray-400 mb-4">
                    Details
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.features.slice(0, 4).map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-gray-400 text-sm"
                      >
                        <div className="w-1 h-1 bg-gold rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quantity & Add to Cart */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  {/* Quantity Selector */}
                  <div className="flex items-center border border-gold/20 rounded">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 text-gray-400 hover:text-white transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center text-white font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 text-gray-400 hover:text-white transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </button>
                </div>
              </div>

              {/* Trust Badges - Minimal */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gold/10">
                <div className="text-center">
                  <Truck className="w-5 h-5 text-gold mx-auto mb-2" />
                  <p className="text-xs text-gray-400">Free Shipping</p>
                  <p className="text-[10px] text-gray-600">Over $200</p>
                </div>
                <div className="text-center">
                  <Shield className="w-5 h-5 text-gold mx-auto mb-2" />
                  <p className="text-xs text-gray-400">2-Year Warranty</p>
                  <p className="text-[10px] text-gray-600">Full Coverage</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-5 h-5 text-gold mx-auto mb-2" />
                  <p className="text-xs text-gray-400">Easy Returns</p>
                  <p className="text-[10px] text-gray-600">30 Days</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Reviews Section - Minimal */}
        <div className="mb-20">
          <div className="bg-gray-900 border border-gold/10 rounded-lg p-8 lg:p-12">
            <h2 className="font-serif text-2xl text-white mb-8 text-center">
              Customer Reviews
            </h2>

            <div className="max-w-2xl mx-auto">
              {/* Rating Summary */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10 pb-10 border-b border-gold/10">
                <div className="text-center">
                  <div className="font-serif text-5xl text-gold mb-2">
                    4.9
                  </div>
                  <div className="flex gap-1 justify-center mb-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-gold text-gold"
                      />
                    ))}
                  </div>
                  <p className="text-gray-500 text-sm">Based on 127 reviews</p>
                </div>

                {/* Rating Bars */}
                <div className="flex-1 w-full sm:max-w-xs space-y-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-gray-500 text-xs w-3">
                        {5 - i}
                      </span>
                      <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gold"
                          style={{
                            width:
                              i === 0
                                ? "75%"
                                : i === 1
                                ? "20%"
                                : i === 2
                                ? "3%"
                                : i === 3
                                ? "1%"
                                : "1%",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Reviews */}
              <div className="space-y-6">
                {[
                  {
                    name: "Michael S.",
                    rating: 5,
                    comment: `Absolutely stunning quality! The ${product.name} exceeds my expectations. The polarized lenses are crystal clear.`,
                    date: "2 weeks ago",
                  },
                  {
                    name: "Jennifer L.",
                    rating: 5,
                    comment: "Perfect fit and excellent craftsmanship. Received so many compliments.",
                    date: "1 month ago",
                  },
                ].map((review, index) => (
                  <div
                    key={index}
                    className="border-b border-gold/10 pb-6 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gold/10 rounded-full flex items-center justify-center">
                          <span className="text-gold text-xs font-medium">
                            {review.name[0]}
                          </span>
                        </div>
                        <div>
                          <p className="text-white text-sm">{review.name}</p>
                          <p className="text-gray-600 text-xs">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 fill-gold text-gold"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      "{review.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="font-serif text-2xl text-white mb-8 text-center">
              You May Also <span className="text-gold">Like</span>
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.slug}`}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-lg bg-gray-900">
                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-800">
                      <Image
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-serif text-sm text-white mb-1 line-clamp-1 group-hover:text-gold transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <Price price={relatedProduct.price} size="sm" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
