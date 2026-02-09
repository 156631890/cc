"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Check, ShoppingBag, Home, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/index";
import { SlideUp } from "@/components/animations/index";
import { useCartStore } from "@/lib/store";

export default function CheckoutSuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <FadeIn>
          <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <Check className="w-12 h-12 text-primary" />
          </div>
        </FadeIn>

        <SlideUp>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
            Order <span className="text-primary">Confirmed!</span>
          </h1>
          <p className="text-text-muted text-lg mb-8">
            Thank you for your purchase. We've received your order and will
            begin processing it shortly.
          </p>
        </SlideUp>

        <FadeIn delay={0.2}>
          <div className="bg-surface rounded-xl p-8 border border-text-muted/10 mb-8">
            <h2 className="font-serif text-xl font-semibold mb-4">
              Order Details
            </h2>
            <div className="space-y-3 text-left max-w-sm mx-auto">
              <div className="flex justify-between">
                <span className="text-text-muted">Order Number:</span>
                <span className="font-mono">LV-2025-001847</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Date:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Email:</span>
                <span>confirmation@example.com</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Estimated Delivery:</span>
                <span>3-5 Business Days</span>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <Link href="/products" className="w-full">
              <Button variant="outline" className="w-full" size="lg">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Continue Shopping
              </Button>
            </Link>
            <Link href="/" className="w-full">
              <Button variant="primary" className="w-full" size="lg">
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          <p className="text-text-muted text-sm">
            A confirmation email has been sent to your email address. You can
            track your order status in the email.
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
