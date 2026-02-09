"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, Search } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Collections", href: "/products" },
  { name: "Driving", href: "/products?category=driving" },
  { name: "Sports", href: "/products?category=sports" },
  { name: "Blue Light", href: "/products?category=blue-light" },
  { name: "About", href: "/about" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-text-muted/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
              <span className="text-background font-serif font-bold text-xl">
                LV
              </span>
            </div>
            <span className="hidden sm:block font-serif text-xl font-semibold tracking-wide">
              LUXE<span className="text-primary">VISION</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-300 relative py-2",
                  pathname === link.href || pathname?.startsWith(link.href)
                    ? "text-primary"
                    : "text-text hover:text-primary"
                )}
              >
                {link.name}
                {(pathname === link.href || pathname?.startsWith(link.href)) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
                )}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <Link
              href="/search"
              className="p-2 text-text hover:text-primary transition-colors"
            >
              <Search className="w-5 h-5" />
            </Link>
            <Link
              href="/cart"
              className="relative p-2 text-text hover:text-primary transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-background text-xs font-semibold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              className="lg:hidden p-2 text-text hover:text-primary transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-surface border-t border-text-muted/10">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "block py-2 text-base font-medium transition-colors",
                  pathname === link.href || pathname?.startsWith(link.href)
                    ? "text-primary"
                    : "text-text hover:text-primary"
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
