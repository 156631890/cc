"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { ProductGrid } from "@/components/product/product-grid";
import { Input } from "@/components/ui/input";
import { FadeIn } from "@/components/animations/index";
import { searchProducts } from "@/lib/products";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const results = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchProducts(searchQuery);
  }, [searchQuery]);

  // Update search query when URL parameter changes
  useEffect(() => {
    const q = searchParams.get("q") || "";
    setQuery(q);
    setSearchQuery(q);
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(query);
  };

  const clearSearch = () => {
    setQuery("");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-surface border-b border-text-muted/10 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-8 text-center">
              Search <span className="text-primary">Products</span>
            </h1>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search for sunglasses, brands, categories..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-5 pr-12 py-4 bg-secondary border border-text-muted/20 rounded-xl text-lg focus:border-primary focus:outline-none"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {query && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="p-2 text-text-muted hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
                <button
                  type="submit"
                  className="p-2 text-primary hover:text-primary/80 transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>
          </FadeIn>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {searchQuery ? (
          <FadeIn>
            <div className="mb-8">
              <p className="text-text-muted">
                {results.length > 0
                  ? `Found ${results.length} result${results.length !== 1 ? "s" : ""} for "${searchQuery}"`
                  : `No results found for "${searchQuery}"`}
              </p>
            </div>
            {results.length > 0 ? (
              <ProductGrid products={results} />
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-text-muted" />
                </div>
                <h3 className="font-serif text-2xl font-semibold mb-2">
                  No Products Found
                </h3>
                <p className="text-text-muted mb-6">
                  Try searching with different keywords or browse our collections
                </p>
                <a
                  href="/products"
                  className="inline-flex items-center text-primary hover:underline"
                >
                  Browse All Products
                </a>
              </div>
            )}
          </FadeIn>
        ) : (
          <FadeIn>
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-text-muted" />
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-2">
                Search Our Collection
              </h3>
              <p className="text-text-muted mb-6">
                Enter a keyword to find your perfect pair of sunglasses
              </p>
              <div className="flex flex-wrap gap-3 justify-center max-w-2xl mx-auto">
                {["aviator", "polarized", "sports", "blue light", "kids"].map(
                  (suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => {
                        setQuery(suggestion);
                        setSearchQuery(suggestion);
                      }}
                      className="px-4 py-2 bg-surface border border-text-muted/20 rounded-lg text-sm hover:border-primary hover:text-primary transition-colors"
                    >
                      {suggestion}
                    </button>
                  )
                )}
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-muted">Loading...</p>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
