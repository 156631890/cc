"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { CategoryInfo } from "@/types";
import { FadeIn } from "@/components/animations/index";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  category: CategoryInfo;
  className?: string;
  index?: number;
}

export function CategoryCard({ category, className, index = 0 }: CategoryCardProps) {
  return (
    <FadeIn delay={index * 0.1}>
      <Link
        href={`/products?category=${category.id}`}
        className={cn(
          "group relative overflow-hidden rounded-lg aspect-[4/3] bg-gray-800",
          className
        )}
      >
        {/* Background Image */}
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Overlay - Subtle */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <h3 className="font-serif text-xl text-white mb-2 group-hover:text-gold transition-colors">
            {category.name}
          </h3>
          <p className="text-gray-300 text-sm mb-3 line-clamp-1">
            {category.description}
          </p>
          <span className="text-gold text-xs tracking-wider uppercase inline-flex items-center gap-2">
            Explore
            <svg
              className="w-3 h-3 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </Link>
    </FadeIn>
  );
}
