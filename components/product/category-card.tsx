"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
        className={cn("group relative overflow-hidden rounded-2xl aspect-[4/3]", className)}
      >
        {/* Background Image */}
        <div className="absolute inset-0 bg-secondary">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <h3 className="font-serif text-2xl font-semibold text-white mb-2">
            {category.name}
          </h3>
          <p className="text-text-muted text-sm mb-4 line-clamp-2">
            {category.description}
          </p>
          <span className="inline-flex items-center text-primary font-medium group-hover:gap-3 transition-all">
            Explore Collection
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </FadeIn>
  );
}
