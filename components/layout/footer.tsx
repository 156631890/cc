import React from "react";
import Link from "next/link";
import { Instagram, Facebook, Twitter, Mail } from "lucide-react";

const footerLinks = {
  shop: [
    { name: "All Products", href: "/products" },
    { name: "New Arrivals", href: "/products?sort=newest" },
    { name: "Best Sellers", href: "/products?sort=popular" },
  ],
  support: [
    { name: "Contact Us", href: "/contact" },
    { name: "FAQs", href: "/faq" },
    { name: "Shipping", href: "/shipping" },
    { name: "Returns", href: "/returns" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Sustainability", href: "/sustainability" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

const socialLinks = [
  { name: "Instagram", href: "#", icon: Instagram },
  { name: "Facebook", href: "#", icon: Facebook },
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "Email", href: "mailto:info@luxevision.com", icon: Mail },
];

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <div className="w-10 h-10 bg-champagne rounded-full flex items-center justify-center mb-6">
              <span className="text-background font-display font-bold text-lg">
                LV
              </span>
            </div>
            <p className="text-foreground/50 text-sm leading-relaxed mb-6">
              Crafting exceptional eyewear since 2015. Each piece tells a story of
              dedication, precision, and the pursuit of perfection.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 flex items-center justify-center border border-border text-foreground/50 hover:text-champagne hover:border-champagne/30 transition-all"
                    aria-label={social.name}
                  >
                    <Icon className="w-4 h-4" strokeWidth={1.5} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs tracking-wider uppercase text-foreground mb-6">
              Shop
            </h4>
            <ul className="space-y-4">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-foreground/50 hover:text-champagne transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs tracking-wider uppercase text-foreground mb-6">
              Support
            </h4>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-foreground/50 hover:text-champagne transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs tracking-wider uppercase text-foreground mb-6">
              Company
            </h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-foreground/50 hover:text-champagne transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-foreground/40 text-xs tracking-wider uppercase">
            © 2025 LUXE VISION. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-foreground/40 hover:text-champagne text-xs transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-foreground/40 hover:text-champagne text-xs transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
