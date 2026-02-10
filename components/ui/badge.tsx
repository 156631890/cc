import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "primary" | "success" | "danger" | "outline";
}

export function Badge({
  children,
  className,
  variant = "default",
}: BadgeProps) {
  const variants = {
    default: "bg-gray-800 text-gray-300",
    primary: "bg-gold text-black",
    success: "bg-gray-800 text-gray-300",
    danger: "bg-gray-800 text-gray-300",
    outline: "border border-gold/20 text-gold",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 text-[10px] tracking-wider uppercase font-medium rounded",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

interface PriceProps {
  price?: number;
  amount?: number;
  comparePrice?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Price({
  price,
  amount,
  comparePrice,
  className,
  size = "md",
}: PriceProps) {
  const actualPrice = amount ?? price ?? 0;
  const formatPrice = (p: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(p);
  };

  const sizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span
        className={cn(
          "font-serif text-gold",
          sizes[size]
        )}
      >
        {formatPrice(actualPrice)}
      </span>
      {comparePrice && comparePrice > actualPrice && (
        <span
          className={cn(
            "font-serif text-gray-600 line-through",
            sizes[size]
          )}
        >
          {formatPrice(comparePrice)}
        </span>
      )}
    </div>
  );
}
