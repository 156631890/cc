"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import { getFeaturedProducts, getNewProducts, categories } from "@/lib/products";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const newProducts = getNewProducts();

  return (
    <div className="min-h-screen">
      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1508296695146-257a814070b4?w=1920&q=90"
            alt="LUXE VISION"
            fill
            className="object-cover"
            priority
            style={{ filter: "grayscale(100%) brightness(0.4)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-champagne text-xs tracking-[0.3em] uppercase mb-6">
            Collection 2025
          </p>
          <h1 className="text-6xl md:text-8xl lg:text-9xl text-foreground mb-8">
            The Art of <span className="italic text-champagne">Vision</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 mb-10 max-w-2xl mx-auto">
            Where craftsmanship meets contemporary elegance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="inline-flex items-center gap-2 bg-champagne text-background px-8 py-4 text-sm tracking-wider uppercase hover:bg-champagne-light transition-colors">
              Explore Collection
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/about" className="inline-flex items-center gap-2 border border-foreground/30 text-foreground px-8 py-4 text-sm tracking-wider uppercase hover:border-champagne hover:text-champagne transition-colors">
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================
          FEATURES SECTION
          ============================================ */}
      <section className="py-24 bg-card">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Handcrafted", desc: "Meticulously crafted by master artisans" },
              { title: "Premium Materials", desc: "Sourced from the finest suppliers" },
              { title: "Timeless Design", desc: "Elegance that transcends trends" },
            ].map((feature, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 border border-champagne/30 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <div className="w-2 h-2 bg-champagne rounded-full" />
                </div>
                <h3 className="text-foreground text-lg mb-3 tracking-wide">{feature.title}</h3>
                <p className="text-foreground/50 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          FEATURED PRODUCTS
          ============================================ */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-champagne text-xs tracking-[0.3em] uppercase mb-4">
              Selection
            </p>
            <h2 className="text-4xl md:text-5xl text-foreground mb-4">
              Featured <span className="italic text-champagne">Pieces</span>
            </h2>
            <div className="w-16 h-px bg-champagne mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/products" className="inline-flex items-center gap-2 border border-foreground/20 text-foreground px-8 py-4 text-sm tracking-wider uppercase hover:border-champagne hover:text-champagne transition-colors">
              View All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================
          CATEGORIES
          ============================================ */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-champagne text-xs tracking-[0.3em] uppercase mb-4">
              Browse
            </p>
            <h2 className="text-4xl md:text-5xl text-foreground">
              By Collection
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.id}`}
                className="group relative aspect-[4/5] overflow-hidden rounded-sm bg-card"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-foreground text-lg mb-1">{category.name}</h3>
                  <span className="text-champagne text-xs tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          NEW ARRIVALS
          ============================================ */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="text-champagne text-xs tracking-[0.3em] uppercase mb-4">
                Just Arrived
              </p>
              <h2 className="text-4xl md:text-5xl text-foreground">
                New <span className="italic text-champagne">Additions</span>
              </h2>
            </div>
            <p className="text-foreground/50 text-sm max-w-md">
              Discover our latest creations, where innovation meets timeless elegance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          TESTIMONIALS
          ============================================ */}
      <section className="py-24 bg-card">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-champagne/30" />
              <span className="text-champagne text-xs tracking-[0.3em] uppercase">
                Acclaim
              </span>
              <div className="w-12 h-px bg-champagne/30" />
            </div>
            <h2 className="text-4xl md:text-5xl text-foreground">
              What They Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { quote: "LUXE VISION redefines modern luxury. Their attention to detail is unmatched.", author: "VOGUE", role: "Editorial Feature" },
              { quote: "The perfect fusion of contemporary design and timeless elegance.", author: "Alexandra M.", role: "Verified Buyer" },
              { quote: "Exceptional quality that exceeds expectations. The craftsmanship is evident.", author: "Jonathan R.", role: "Verified Buyer" },
            ].map((review, i) => (
              <div key={i} className="bg-background border border-border p-8">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-champagne text-champagne" />
                  ))}
                </div>
                <p className="text-foreground/70 mb-6 italic">&ldquo;{review.quote}&rdquo;</p>
                <div className="border-t border-border pt-4">
                  <p className="text-champagne">{review.author}</p>
                  <p className="text-foreground/40 text-xs mt-1">{review.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          NEWSLETTER
          ============================================ */}
      <section className="py-24 bg-background">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl text-foreground mb-4">
            Join the <span className="italic text-champagne">Circle</span>
          </h2>
          <p className="text-foreground/50 mb-10">
            Be the first to discover new collections and exclusive offers.
          </p>

          <form className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-5 py-4 bg-card border border-border text-foreground placeholder:text-foreground/30 focus:border-champagne focus:outline-none transition-colors"
                required
              />
              <button type="submit" className="bg-champagne text-background px-8 py-4 text-sm tracking-wider uppercase hover:bg-champagne-light transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <p className="text-foreground/30 text-xs mt-6">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </section>

      {/* ============================================
          FOOTER PREVIEW
          ============================================ */}
      <section className="py-16 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-champagne text-xs tracking-[0.3em] uppercase mb-4">
            LUXE VISION
          </p>
          <p className="text-foreground/50 text-sm leading-relaxed">
            Crafting exceptional eyewear. Each piece tells a story of dedication,
            precision, and the pursuit of perfection.
          </p>
        </div>
      </section>
    </div>
  );
}
