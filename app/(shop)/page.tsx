"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductGrid } from "@/components/product/product-grid";
import { CategoryCard } from "@/components/product/category-card";
import {
  FadeIn,
  StaggerChildren,
  StaggerItem,
} from "@/components/animations/index";
import { getFeaturedProducts, getNewProducts, categories } from "@/lib/products";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const newProducts = getNewProducts();

  const features = [
    {
      title: "Handcrafted",
      description: "Meticulously crafted by master artisans",
    },
    {
      title: "Premium Materials",
      description: "Sourced from the finest suppliers",
    },
    {
      title: "Timeless Design",
      description: "Elegance that transcends trends",
    },
  ];

  const reviews = [
    {
      name: "Alexandra M.",
      rating: 5,
      comment: "The quality is extraordinary. True refined taste.",
      product: "Aviator Classic",
    },
    {
      name: "Jonathan R.",
      rating: 5,
      comment: "Eyewear that matches my standards. Impeccable.",
      product: "Signature Cat Eye",
    },
    {
      name: "VOGUE",
      rating: 5,
      comment: "LUXE VISION redefines modern luxury.",
      product: "Editorial Feature",
    },
  ];

  return (
    <div>
      {/* ========================================
          HERO - Minimal Impact
          ======================================== */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-black">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1508296695146-257a814070b4?w=1920&q=90"
            alt="LUXE VISION"
            fill
            className="object-cover opacity-30"
            priority
            style={{ filter: "grayscale(100%) contrast(120%)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <FadeIn>
            <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-8">
              Premium Eyewear
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h1 className="mb-6">
              <span className="block text-white">The Art of</span>
              <span className="block text-gold italic">Vision</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="w-16 h-px bg-gold mx-auto mb-8" />
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/products">
                <span className="btn-primary">
                  Explore Collection
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </span>
              </Link>
              <Link href="/about">
                <span className="btn-outline">Our Story</span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ========================================
          FEATURES - Clean Icons
          ======================================== */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-5xl mx-auto px-6">
          <StaggerChildren>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
              {features.map((feature, index) => (
                <StaggerItem key={index}>
                  <div className="text-center">
                    <div className="w-8 h-8 border border-gold/30 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <div className="w-2 h-2 bg-gold rounded-full" />
                    </div>
                    <h3 className="text-xs tracking-[0.25em] uppercase text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerChildren>
        </div>
      </section>

      {/* ========================================
          FEATURED PRODUCTS
          ======================================== */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-4">
                The Collection
              </p>
              <h2 className="mb-4">
                <span className="text-white">Featured</span>
              </h2>
              <div className="w-12 h-px bg-gold mx-auto" />
            </div>
          </FadeIn>

          <ProductGrid products={featuredProducts} />

          <FadeIn>
            <div className="text-center mt-16">
              <Link href="/products">
                <span className="btn-outline">
                  View All
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ========================================
          CATEGORIES
          ======================================== */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-4">
                Browse By
              </p>
              <h2>
                <span className="text-white">Collection</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          NEW ARRIVALS
          ======================================== */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
              <div>
                <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-4">
                  Just Arrived
                </p>
                <h2 className="mb-4">
                  <span className="text-gold">New</span>
                  <span className="text-white"> Additions</span>
                </h2>
                <div className="w-12 h-px bg-gold" />
              </div>
              <p className="text-gray-400 text-sm max-w-sm">
                Discover our latest creations, where innovation meets timeless elegance.
              </p>
            </div>
          </FadeIn>

          <ProductGrid products={newProducts} />
        </div>
      </section>

      {/* ========================================
          REVIEWS - Minimal Cards
          ======================================== */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-4 mb-6">
                <div className="w-8 h-px bg-gold" />
                <span className="text-gold text-[10px] tracking-[0.4em] uppercase">
                  Acclaim
                </span>
                <div className="w-8 h-px bg-gold" />
              </div>
              <h2>
                <span className="text-white">Testimonials</span>
              </h2>
            </div>
          </FadeIn>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <StaggerItem key={index}>
                <div className="bg-black border border-gold/10 p-8 hover:border-gold/20 transition-colors duration-300">
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <svg
                        key={i}
                        className="w-3 h-3 text-gold"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-8">
                    "{review.comment}"
                  </p>

                  {/* Author */}
                  <div className="border-t border-gold/10 pt-6">
                    <p className="text-gold text-xs tracking-wider mb-1">
                      {review.name}
                    </p>
                    <p className="text-gray-500 text-[10px] tracking-wider uppercase">
                      {review.product}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ========================================
          NEWSLETTER - Clean
          ======================================== */}
      <section className="py-24 bg-black">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="mb-4">
              <span className="text-white">Join the</span>
              <span className="text-gold"> Circle</span>
            </h2>

            <p className="text-gray-400 text-sm mb-12 leading-relaxed">
              Be the first to discover new collections and exclusive offers.
            </p>

            <form className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-5 py-3 bg-gray-900 border border-gold/10 text-white placeholder:text-gray-500 focus:border-gold/30 focus:outline-none transition-colors text-sm"
                  required
                />
                <button type="submit" className="btn-primary whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <p className="text-gray-600 text-[10px] tracking-wider mt-6">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </form>
          </FadeIn>
        </div>
      </section>

      {/* ========================================
          FOOTER PREVIEW
          ======================================== */}
      <section className="py-16 bg-gray-900 border-t border-gold/10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-4">
              LUXE VISION
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Crafting exceptional eyewear. Each piece tells a story of
              dedication, precision, and the pursuit of perfection.
            </p>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
