"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, Search } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";

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
      {/* Minimal Announcement Bar */}
      <div className="bg-black border-b border-gold/10 py-2">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[10px] tracking-[0.25em] text-gold/70 uppercase">
            Free shipping on orders over $200
          </p>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/95 backdrop-blur-sm border-b border-gold/10"
            : "bg-black border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo - Minimal */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 lg:w-9 lg:h-9 flex items-center justify-center bg-gold rounded-full">
                <span className="text-black font-serif font-bold text-sm lg:text-base">
                  LV
                </span>
              </div>
              <span className="hidden sm:block font-serif text-sm tracking-[0.2em] text-white">
                LUXE<span className="text-gold">VISION</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8 xl:space-x-10">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname?.startsWith(link.href + "/");
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative text-[11px] tracking-[0.2em] uppercase transition-colors duration-200 ${
                      isActive ? "text-white" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 w-full h-px bg-gold" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4 lg:space-x-6">
              <Link
                href="/search"
                className="p-2 text-gray-400 hover:text-gold transition-colors"
                aria-label="Search"
              >
                <Search className="w-4 h-4" strokeWidth={1.5} />
              </Link>

              {/* Cart with Preview */}
              <div className="relative">
                <button
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="relative p-2 text-gray-400 hover:text-gold transition-colors"
                  aria-label="Shopping cart"
                >
                  <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-black text-[9px] font-medium rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </button>

                {/* Cart Preview Dropdown */}
                <AnimatePresence>
                  {isCartOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsCartOpen(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-2 w-80 bg-gray-900 border border-gold/10 rounded-lg shadow-xl overflow-hidden z-50"
                      >
                        {cartItems.length === 0 ? (
                          <div className="p-8 text-center">
                            <p className="text-gray-400 text-sm">Your cart is empty</p>
                          </div>
                        ) : (
                          <>
                            <div className="p-4 border-b border-gold/10">
                              <p className="text-xs tracking-wider text-gray-400">
                                {totalItems} {totalItems === 1 ? "item" : "items"}
                              </p>
                            </div>
                            <div className="max-h-64 overflow-y-auto p-4 space-y-4">
                              {cartItems.slice(0, 3).map((item) => (
                                <div key={item.id} className="flex gap-3">
                                  <div className="w-16 h-16 bg-gray-800 rounded overflow-hidden flex-shrink-0">
                                    <img
                                      src={item.product.images[0]}
                                      alt={item.product.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm text-white truncate">
                                      {item.product.name}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                      Qty: {item.quantity}
                                    </p>
                                  </div>
                                </div>
                              ))}
                              {cartItems.length > 3 && (
                                <p className="text-xs text-gold">
                                  +{cartItems.length - 3} more items
                                </p>
                              )}
                            </div>
                            <div className="p-4 border-t border-gold/10">
                              <Link
                                href="/cart"
                                onClick={() => setIsCartOpen(false)}
                                className="block w-full text-center py-3 bg-gold text-black text-xs tracking-wider uppercase font-medium hover:bg-gold-light transition-colors"
                              >
                                View Cart
                              </Link>
                            </div>
                          </>
                        )}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              <button
                className="lg:hidden p-2 text-gray-400 hover:text-gold transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-gray-900 border-t border-gold/10 overflow-hidden"
            >
              <div className="px-6 py-8 space-y-6">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href || pathname?.startsWith(link.href + "/");
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`block text-sm tracking-[0.15em] uppercase transition-colors ${
                        isActive ? "text-gold" : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
