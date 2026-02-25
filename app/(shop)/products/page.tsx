"use client";

import React, { useState, useMemo } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { ProductGrid } from "@/components/product/product-grid";
import { Select } from "@/components/ui/input";
import { FadeIn } from "@/components/animations/index";
import { products, categories } from "@/lib/products";

export default function ProductsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [sortBy, setSortBy] = useState<"newest" | "price-low" | "price-high" | "popular">("newest");
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }

    // Filter by price
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Filter by in stock
    filtered = filtered.filter((p) => p.inStock);

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        filtered.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
        break;
      case "newest":
      default:
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    return filtered;
  }, [selectedCategories, priceRange, sortBy]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 500]);
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    priceRange[0] !== 0 ||
    priceRange[1] !== 500;

  return (
    <div className="min-h-screen bg-black">
      {/* Header - Minimal */}
      <div className="border-b border-gold/10 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <h1 className="font-serif text-3xl lg:text-4xl text-white mb-2">
              {selectedCategories.length === 1
                ? categories.find((c) => c.id === selectedCategories[0])?.name
                : "All Products"}
            </h1>
            <p className="text-gray-500 text-sm">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Filters Sidebar - Refined */}
          <aside
            className={`lg:block lg:w-56 flex-shrink-0 ${
              showFilters ? "block" : "hidden"
            }`}
          >
            <div className="lg:sticky lg:top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm tracking-wider uppercase text-white">Filters</h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-gold text-xs hover:text-gold-light transition-colors"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h3 className="text-xs tracking-wider uppercase text-gray-400 mb-4">
                  Categories
                </h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <label
                      key={category.id}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.id)}
                          onChange={() => toggleCategory(category.id)}
                          className="sr-only peer"
                        />
                        <div className="w-4 h-4 border border-gray-600 rounded-sm transition-colors peer-checked:bg-gold peer-checked:border-gold peer-checked:ring-1 peer-checked:ring-gold/50" />
                        <svg
                          className="w-3 h-3 text-black absolute top-0.5 left-0.5 opacity-0 peer-checked:opacity-100 transition-opacity"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                        </svg>
                      </div>
                      <span className="text-gray-400 text-sm group-hover:text-white transition-colors">
                        {category.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-xs tracking-wider uppercase text-gray-400 mb-4">
                  Price Range
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-sm">$</span>
                    <input
                      type="number"
                      min={0}
                      max={500}
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([Number(e.target.value), priceRange[1]])
                      }
                      className="w-full bg-gray-900 border border-gold/10 rounded px-3 py-2 text-sm text-white focus:border-gold/30 focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-sm">$</span>
                    <input
                      type="number"
                      min={0}
                      max={500}
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], Number(e.target.value)])
                      }
                      className="w-full bg-gray-900 border border-gold/10 rounded px-3 py-2 text-sm text-white focus:border-gold/30 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-8 gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gold/10 rounded-lg text-white"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="text-sm">Filters</span>
                {hasActiveFilters && (
                  <span className="w-2 h-2 bg-gold rounded-full" />
                )}
              </button>

              <div className="flex-1 lg:max-w-xs ml-auto">
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  options={[
                    { value: "newest", label: "Newest First" },
                    { value: "popular", label: "Best Sellers" },
                    { value: "price-low", label: "Price: Low to High" },
                    { value: "price-high", label: "Price: High to Low" },
                  ]}
                />
              </div>
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-8">
                {selectedCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-gold/10 text-gold border border-gold/20 rounded-full text-xs hover:bg-gold/20 transition-colors"
                  >
                    {categories.find((c) => c.id === cat)?.name}
                    <X className="w-3 h-3" />
                  </button>
                ))}
                {(priceRange[0] !== 0 || priceRange[1] !== 500) && (
                  <button
                    onClick={() => setPriceRange([0, 500])}
                    className="flex items-center gap-2 px-3 py-1.5 bg-gold/10 text-gold border border-gold/20 rounded-full text-xs hover:bg-gold/20 transition-colors"
                  >
                    ${priceRange[0]} - ${priceRange[1]}
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            )}

            {/* Grid */}
            {filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <div className="py-20 text-center">
                <p className="text-gray-500">No products found matching your filters.</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-gold text-sm hover:text-gold-light transition-colors"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
