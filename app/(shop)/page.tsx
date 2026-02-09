"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Shield, Truck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/product/product-grid";
import { CategoryCard } from "@/components/product/category-card";
import {
  FadeIn,
  StaggerChildren,
  StaggerItem,
  SlideUp,
} from "@/components/animations/index";
import { getFeaturedProducts, getNewProducts, categories } from "@/lib/products";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const newProducts = getNewProducts();

  const features = [
    {
      icon: Shield,
      title: "Premium Quality",
      description:
        "Handcrafted with the finest materials sourced from the best suppliers around the world",
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On all orders over $200",
    },
    {
      icon: RefreshCw,
      title: "Easy Returns",
      description: "30-day hassle-free returns",
    },
  ];

  const reviews = [
    {
      name: "Sarah M.",
      rating: 5,
      comment: "Absolutely love my new aviators! The quality is outstanding and they're so comfortable for long drives.",
      product: "Aviator Classic Polarized",
    },
    {
      name: "James T.",
      rating: 5,
      comment: "The blue light glasses have been a game changer for my remote work. No more eye strain!",
      product: "Digital Shield Classic",
    },
    {
      name: "Emily R.",
      rating: 5,
      comment: "Finally found stylish sunglasses that actually stay on during my runs. The Aqua Performance is incredible!",
      product: "Aqua Performance",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-secondary">
          <Image
            src="https://images.unsplash.com/photo-1508296695146-257a814070b4?w=1920"
            alt="Luxury Sunglasses"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-background/50 to-background" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <FadeIn>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-semibold mb-6">
              <span className="text-gradient-gold">See the World</span>
              <br />
              <span className="text-white">In Luxury</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-text-muted text-lg mb-8 max-w-2xl mx-auto">
              Discover our collection of premium sunglasses designed for those
              who appreciate exceptional craftsmanship and timeless elegance.
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" variant="primary">
                  Shop Collection
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline">
                  Our Story
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-primary rounded-full" />
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="py-12 bg-surface border-y border-text-muted/10">
        <StaggerChildren className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <StaggerItem key={index}>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{feature.title}</h3>
                    <p className="text-text-muted text-sm">{feature.description}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerChildren>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
                Featured <span className="text-primary">Collection</span>
              </h2>
              <p className="text-text-muted max-w-2xl mx-auto">
                Our most sought-after designs, crafted with precision and style
              </p>
            </div>
          </FadeIn>
          <ProductGrid products={featuredProducts} />
          <div className="text-center mt-12">
            <Link href="/products">
              <Button size="lg" variant="outline">
                View All Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
                Shop by <span className="text-primary">Collection</span>
              </h2>
              <p className="text-text-muted max-w-2xl mx-auto">
                Find the perfect pair for every occasion
              </p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
                New <span className="text-primary">Arrivals</span>
              </h2>
              <p className="text-text-muted max-w-2xl mx-auto">
                Discover our latest additions to the collection
              </p>
            </div>
          </FadeIn>
          <ProductGrid products={newProducts} />
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
                What Our <span className="text-primary">Customers Say</span>
              </h2>
              <p className="text-text-muted max-w-2xl mx-auto">
                Join thousands of satisfied customers who trust LUXE VISION
              </p>
            </div>
          </FadeIn>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <StaggerItem key={index}>
                <div className="bg-secondary rounded-xl p-6 border border-text-muted/10">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <p className="text-text mb-4">{review.comment}</p>
                  <div className="border-t border-text-muted/10 pt-4">
                    <p className="font-semibold text-white">{review.name}</p>
                    <p className="text-text-muted text-sm">
                      Purchased: {review.product}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20" />
        <div className="absolute inset-0 bg-background/80" />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <FadeIn>
            <h2 className="font-serif text-4xl md:text-6xl font-semibold mb-6">
              Experience the Difference
            </h2>
            <p className="text-text-muted text-lg mb-8 max-w-2xl mx-auto">
              Join our exclusive newsletter and be the first to know about new
              arrivals, special offers, and style tips.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 bg-surface border border-text-muted/20 rounded-lg focus:border-primary focus:outline-none transition-colors"
                required
              />
              <Button type="submit" size="lg" variant="primary">
                Subscribe
              </Button>
            </form>
            <p className="text-text-muted/60 text-sm mt-4">
              No spam, unsubscribe anytime.
            </p>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
