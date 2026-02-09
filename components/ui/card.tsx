import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outlined" | "elevated";
  hover?: boolean;
}

export function Card({
  children,
  className,
  variant = "default",
  hover = false,
}: CardProps) {
  const variants = {
    default: "bg-surface",
    outlined: "bg-transparent border border-text-muted/20",
    elevated: "bg-surface shadow-xl",
  };

  return (
    <div
      className={cn(
        "rounded-xl p-6 transition-all duration-300",
        variants[variant],
        hover && "hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30",
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return <div className={cn("mb-4", className)}>{children}</div>;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <h3 className={cn("text-xl font-serif font-semibold text-text", className)}>
      {children}
    </h3>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn("", className)}>{children}</div>;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={cn("mt-4 pt-4 border-t border-text-muted/10", className)}>
      {children}
    </div>
  );
}
