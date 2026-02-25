"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, Search } from "lucide-react";
import { useCartStore } from "@/lib/store";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Collection", href: "/products" },
  { name: "About", href: "/about" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const pathname = usePathname();
  const totalItems = useCartStore((state) => state.getTotalItems());
  const cartItems = useCartStore((state) => state.items);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-background border-b border-border py-2">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-champagne/70 text-[10px] tracking-[0.25em] uppercase">
            Complimentary shipping on orders over $200
          </p>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-sm border-b border-border"
            : "bg-background border-b border-border"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-champagne rounded-full flex items-center justify-center">
                <span className="text-background font-display font-bold text-lg">
                  LV
                </span>
              </div>
              <span className="hidden sm:block font-display text-sm tracking-[0.2em] text-foreground">
                LUXE<span className="text-champagne">VISION</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname?.startsWith(link.href + "/");
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative text-xs tracking-[0.2em] uppercase transition-colors ${
                      isActive ? "text-champagne" : "text-foreground/60 hover:text-foreground"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute -bottom-5 left-0 right-0 h-px bg-champagne" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <Link
                href="/search"
                className="p-2 text-foreground/60 hover:text-champagne transition-colors"
                aria-label="Search"
              >
                <Search className="w-4 h-4" strokeWidth={1.5} />
              </Link>

              {/* Cart */}
              <div className="relative">
                <button
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="relative p-2 text-foreground/60 hover:text-champagne transition-colors"
                  aria-label="Shopping cart"
                >
                  <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-champagne text-background text-[9px] font-medium rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </button>

                {/* Cart Dropdown */}
                {isCartOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsCartOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-4 w-80 bg-card border border-border shadow-xl overflow-hidden z-50">
                      {cartItems.length === 0 ? (
                        <div className="p-8 text-center">
                          <p className="text-foreground/50 text-sm">Your cart is empty</p>
                        </div>
                      ) : (
                        <>
                          <div className="p-4 border-b border-border">
                            <p className="text-xs tracking-wider text-champagne">
                              {totalItems} {totalItems === 1 ? "item" : "items"}
                            </p>
                          </div>
                          <div className="max-h-64 overflow-y-auto p-4 space-y-4">
                            {cartItems.slice(0, 3).map((item) => (
                              <div key={item.id} className="flex gap-3">
                                <div className="w-16 h-16 bg-background rounded overflow-hidden flex-shrink-0">
                                  <img
                                    src={item.product.images[0]}
                                    alt={item.product.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm text-foreground truncate">
                                    {item.product.name}
                                  </p>
                                  <p className="text-xs text-foreground/50">
                                    Qty: {item.quantity}
                                  </p>
                                </div>
                              </div>
                            ))}
                            {cartItems.length > 3 && (
                              <p className="text-xs text-champagne">
                                +{cartItems.length - 3} more items
                              </p>
                            )}
                          </div>
                          <div className="p-4 border-t border-border">
                            <Link
                              href="/cart"
                              onClick={() => setIsCartOpen(false)}
                              className="block w-full text-center py-3 bg-champagne text-background text-xs tracking-wider uppercase font-medium hover:bg-champagne-light transition-colors"
                            >
                              View Cart
                            </Link>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-foreground/60 hover:text-champagne transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-card border-t border-border">
            <div className="px-6 py-8 space-y-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname?.startsWith(link.href + "/");
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`block text-sm tracking-[0.15em] uppercase transition-colors ${
                      isActive ? "text-champagne" : "text-foreground/60 hover:text-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
