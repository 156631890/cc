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
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-surface border-b border-text-muted/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-2">
              {selectedCategories.length === 1
                ? categories.find((c) => c.id === selectedCategories[0])?.name
                : "All Products"}
            </h1>
            <p className="text-text-muted">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside
            className={`lg:block lg:w-64 flex-shrink-0 ${
              showFilters ? "block" : "hidden"
            }`}
          >
            <div className="bg-surface rounded-xl p-6 border border-text-muted/10 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-xl font-semibold">Filters</h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-primary text-sm hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-medium text-white mb-3">Categories</h3>
                <div className="space-y-2">
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
                        <div className="w-5 h-5 border border-text-muted/30 rounded peer-checked:bg-primary peer-checked:border-primary transition-colors" />
                        <svg
                          className="w-3 h-3 text-background absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1z" />
                        </svg>
                      </div>
                      <span className="text-text-muted group-hover:text-white transition-colors">
                        {category.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium text-white mb-3">Price Range</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-text-muted text-sm">$</span>
                    <input
                      type="number"
                      min={0}
                      max={500}
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([Number(e.target.value), priceRange[1]])
                      }
                      className="w-full bg-secondary border border-text-muted/20 rounded px-3 py-2 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-text-muted text-sm">$</span>
                    <input
                      type="number"
                      min={0}
                      max={500}
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], Number(e.target.value)])
                      }
                      className="w-full bg-secondary border border-text-muted/20 rounded px-3 py-2 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-surface border border-text-muted/20 rounded-lg"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {hasActiveFilters && (
                  <span className="w-2 h-2 bg-primary rounded-full" />
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
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className="flex items-center gap-1 px-3 py-1 bg-primary/20 text-primary rounded-full text-sm"
                  >
                    {categories.find((c) => c.id === cat)?.name}
                    <X className="w-3 h-3" />
                  </button>
                ))}
                {(priceRange[0] !== 0 || priceRange[1] !== 500) && (
                  <button
                    onClick={() => setPriceRange([0, 500])}
                    className="flex items-center gap-1 px-3 py-1 bg-primary/20 text-primary rounded-full text-sm"
                  >
                    ${priceRange[0]} - ${priceRange[1]}
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            )}

            {/* Grid */}
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}
