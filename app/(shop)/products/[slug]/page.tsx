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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Price, Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations/index";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";
import { useCartStore } from "@/lib/store";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const product = getProductBySlug(slug);
  const addItem = useCartStore((state) => state.addItem);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-4xl font-semibold mb-4">
            Product Not Found
          </h1>
          <Link href="/products">
            <Button variant="primary">Back to Products</Button>
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
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-surface border-b border-text-muted/10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-text-muted">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/products"
              className="hover:text-primary transition-colors"
            >
              Products
            </Link>
            <span>/</span>
            <span className="text-white">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <FadeIn>
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {discount > 0 && (
                  <Badge
                    variant="danger"
                    className="absolute top-4 left-4"
                  >{`-${discount}%`}</Badge>
                )}
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index
                          ? "border-primary"
                          : "border-transparent hover:border-text-muted/50"
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

          {/* Info */}
          <FadeIn delay={0.2}>
            <div>
              <div className="flex items-center gap-3 mb-4">
                {product.isNew && <Badge variant="primary">New</Badge>}
                {product.isBestseller && <Badge variant="success">Bestseller</Badge>}
              </div>

              <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <Price
                  price={product.price}
                  comparePrice={product.comparePrice}
                  size="lg"
                />
              </div>

              <p className="text-text-muted text-lg mb-8">
                {product.description}
              </p>

              {/* Color Selection */}
              <div className="mb-8">
                <h3 className="font-medium text-white mb-4">
                  Available Colors
                </h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <div
                      key={color.name}
                      className="w-10 h-10 rounded-full border-2 border-text-muted/30"
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="font-medium text-white mb-4">Features</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-text-muted"
                    >
                      <Check className="w-4 h-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center border border-text-muted/20 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-surface transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-surface transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <Button
                  size="lg"
                  variant="primary"
                  onClick={handleAddToCart}
                  className="flex-1"
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-text-muted/10">
                <div className="text-center">
                  <Truck className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-sm text-text-muted">Free Shipping</p>
                  <p className="text-xs text-text-muted/60">Over $200</p>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-sm text-text-muted">2-Year Warranty</p>
                  <p className="text-xs text-text-muted/60">Full Coverage</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-sm text-text-muted">Easy Returns</p>
                  <p className="text-xs text-text-muted/60">30 Days</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Reviews Section */}
        <div className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Customer Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6 mb-8">
                <div className="text-center">
                  <div className="font-serif text-5xl font-semibold text-primary mb-2">
                    4.9
                  </div>
                  <div className="flex gap-1 justify-center mb-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <p className="text-text-muted text-sm">Based on 127 reviews</p>
                </div>
                <div className="flex-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 mb-2">
                      <span className="text-sm text-text-muted w-6">
                        {5 - i}
                      </span>
                      <div className="flex-1 h-2 bg-surface rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
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
              <StaggerChildren className="space-y-6">
                {[
                  {
                    name: "Michael S.",
                    rating: 5,
                    comment: `Absolutely stunning quality! The ${product.name} exceeds my expectations. The polarized lenses are crystal clear and the frame feels premium.`,
                    date: "2 weeks ago",
                  },
                  {
                    name: "Jennifer L.",
                    rating: 5,
                    comment: "Perfect fit and excellent craftsmanship. I've received so many compliments. Will definitely be ordering more colors!",
                    date: "1 month ago",
                  },
                ].map((review, index) => (
                  <StaggerItem key={index}>
                    <div className="border-b border-text-muted/10 pb-6 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
                            <span className="text-background font-semibold">
                              {review.name[0]}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{review.name}</p>
                            <p className="text-text-muted text-sm">
                              Verified Purchase
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-primary text-primary"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-text-muted">{review.comment}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </CardContent>
          </Card>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="font-serif text-3xl font-semibold mb-8">
              You May Also <span className="text-primary">Like</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.slug}`}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-xl bg-surface border border-text-muted/10">
                    <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                      <Image
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-text-muted uppercase tracking-wider mb-2">
                        {relatedProduct.category.replace("-", " ")}
                      </p>
                      <h3 className="font-serif text-lg font-semibold text-text mb-2 line-clamp-1">
                        {relatedProduct.name}
                      </h3>
                      <Price price={relatedProduct.price} className="text-lg" />
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
