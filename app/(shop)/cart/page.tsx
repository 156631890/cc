"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Price } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FadeIn } from "@/components/animations/index";
import { useCartStore, useCartTotals } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const applyCoupon = useCartStore((state) => state.applyCoupon);
  const removeCoupon = useCartStore((state) => state.removeCoupon);
  const coupon = useCartStore((state) => state.coupon);

  const [couponCode, setCouponCode] = useState("");
  const [couponMessage, setCouponMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const { subtotal, tax, shipping, discount, total, hasFreeShipping, amountForFreeShipping } =
    useCartTotals();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    applyCoupon(couponCode);
    setCouponMessage({
      type: "success",
      text: "Coupon applied successfully!",
    });
    setCouponCode("");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-text-muted" />
          </div>
          <h1 className="font-serif text-3xl font-semibold mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-text-muted mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link href="/products">
            <Button size="lg" variant="luxury">
              Start Shopping
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-surface border-b border-text-muted/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h1 className="font-serif text-4xl md:text-5xl font-semibold">
              Shopping <span className="text-primary">Cart</span>
            </h1>
            <p className="text-text-muted mt-2">
              {items.length} item{items.length !== 1 ? "s" : ""} in your cart
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <FadeIn key={`${item.product.id}-${index}`} delay={index * 0.05}>
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex gap-6 p-6">
                      {/* Image */}
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-secondary"
                      >
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </Link>

                      {/* Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <Link
                              href={`/products/${item.product.slug}`}
                              className="font-serif text-lg font-semibold hover:text-primary transition-colors"
                            >
                              {item.product.name}
                            </Link>
                            <p className="text-text-muted text-sm capitalize">
                              {item.product.category.replace("-", " ")}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="p-2 text-text-muted hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Quantity & Price */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-text-muted/20 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="p-2 hover:bg-surface transition-colors"
                            >
                              −
                            </button>
                            <span className="w-10 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-2 hover:bg-surface transition-colors"
                            >
                              +
                            </button>
                          </div>
                          <Price
                            amount={item.product.price * item.quantity}
                            size="lg"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Coupon */}
                <form onSubmit={handleApplyCoupon} className="space-y-3">
                  <Input
                    placeholder="Coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <Button
                    type="submit"
                    variant="outline"
                    className="w-full"
                    size="sm"
                  >
                    Apply Coupon
                  </Button>
                  {couponMessage && (
                    <p
                      className={cn(
                        "text-sm",
                        couponMessage.type === "success"
                          ? "text-green-400"
                          : "text-red-400"
                      )}
                    >
                      {couponMessage.text}
                    </p>
                  )}
                  {coupon && (
                    <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                      <span className="text-sm">{coupon} (10% off)</span>
                      <button
                        onClick={removeCoupon}
                        className="text-text-muted hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </form>

                {/* Totals */}
                <div className="space-y-3 pt-4 border-t border-text-muted/10">
                  <div className="flex justify-between text-text-muted">
                    <span>Subtotal</span>
                    <Price amount={subtotal} />
                  </div>
                  <div className="flex justify-between text-text-muted">
                    <span>Shipping</span>
                    <span>{hasFreeShipping ? "FREE" : <Price amount={shipping} />}</span>
                  </div>
                  {!hasFreeShipping && amountForFreeShipping > 0 && (
                    <p className="text-sm text-primary">
                      Add ${amountForFreeShipping.toFixed(0)} more for free shipping!
                    </p>
                  )}
                  <div className="flex justify-between text-text-muted">
                    <span>Tax (8%)</span>
                    <Price amount={tax} />
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-primary">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-semibold pt-3 border-t border-text-muted/10">
                    <span>Total</span>
                    <Price amount={total} size="lg" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <Link href="/checkout" className="w-full">
                  <Button size="lg" variant="primary" className="w-full">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/products" className="w-full">
                  <Button size="lg" variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
