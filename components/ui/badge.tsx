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
    default: "bg-text-muted/20 text-text",
    primary: "bg-primary/20 text-primary",
    success: "bg-green-500/20 text-green-400",
    danger: "bg-red-500/20 text-red-400",
    outline: "border border-text-muted/30 text-text",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 text-xs font-medium rounded-full",
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
          "font-cormorant font-semibold text-primary",
          sizes[size]
        )}
      >
        {formatPrice(actualPrice)}
      </span>
      {comparePrice && comparePrice > actualPrice && (
        <span
          className={cn(
            "font-cormorant text-text-muted line-through",
            sizes[size]
          )}
        >
          {formatPrice(comparePrice)}
        </span>
      )}
    </div>
  );
}
