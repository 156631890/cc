import { Product, CategoryInfo } from "@/types";

// Category information
export const categories: CategoryInfo[] = [
  {
    id: "driving",
    name: "Driving Collection",
    description: "Polarized lenses for optimal glare reduction during driving",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600",
  },
  {
    id: "kids",
    name: "Kids Collection",
    description: "Durable, protective eyewear designed specifically for children",
    image: "https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?w=600",
  },
  {
    id: "blue-light",
    name: "Blue Light Protection",
    description: "Filter harmful blue light from screens for digital wellness",
    image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=600",
  },
  {
    id: "sports",
    name: "Sports Performance",
    description: "Lightweight, secure frames designed for active lifestyles",
    image: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=600",
  },
  {
    id: "fashion",
    name: "Fashion Collection",
    description: "Trendsetting designs for the style-conscious individual",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600",
  },
];

// Sample product data
export const products: Product[] = [
  // Driving Collection
  {
    id: "drv-001",
    name: "Aviator Classic Polarized",
    slug: "aviator-classic-polarized",
    category: "driving",
    description: "Timeless aviator design with advanced polarized lenses that eliminate 99.9% of glare. Perfect for long drives and bright conditions. Crafted with premium titanium frames for lightweight comfort.",
    price: 189,
    comparePrice: 229,
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800",
      "https://images.unsplash.com/photo-1577803645773-f96470509666?w=800",
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800",
    ],
    colors: [
      { name: "Gold", hex: "#D4AF37" },
      { name: "Silver", hex: "#C0C0C0" },
      { name: "Gunmetal", hex: "#2C3539" },
    ],
    features: [
      "Polarized lenses",
      "100% UV protection",
      "Titanium frame",
      "Scratch-resistant coating",
      "Anti-reflective interior",
    ],
    inStock: true,
    isBestseller: true,
    seo: {
      title: "Aviator Classic Polarized Sunglasses | LUXE VISION",
      description: "Premium polarized aviator sunglasses with titanium frames. Perfect for driving with 99.9% glare reduction.",
      keywords: ["aviator", "polarized", "driving", "titanium"],
    },
  },
  {
    id: "drv-002",
    name: "Wayfarer Driver Elite",
    slug: "wayfarer-driver-elite",
    category: "driving",
    description: "Bold wayfarer silhouette engineered for the driving enthusiast. High-contrast lenses enhance visibility in varying light conditions while the acetate frame provides durability.",
    price: 165,
    images: [
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=800",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800",
    ],
    colors: [
      { name: "Tortoise", hex: "#8B4513" },
      { name: "Matte Black", hex: "#1a1a1a" },
    ],
    features: [
      "High-contrast lenses",
      "Acetate frame",
      "UV400 protection",
      "Impact resistant",
      "Non-slip temples",
    ],
    inStock: true,
    isNew: true,
    seo: {
      title: "Wayfarer Driver Elite | LUXE VISION",
      description: "Premium wayfarer sunglasses designed for driving with high-contrast lenses.",
      keywords: ["wayfarer", "driving", "acetate"],
    },
  },

  // Kids Collection
  {
    id: "kid-001",
    name: "Junior Explorer",
    slug: "junior-explorer",
    category: "kids",
    description: "Specially designed for children ages 4-8, these sunglasses offer full UV protection in fun, durable frames. Flexible hinges prevent breakage during active play.",
    price: 79,
    images: [
      "https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?w=800",
      "https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=800",
    ],
    colors: [
      { name: "Pink", hex: "#FF69B4" },
      { name: "Blue", hex: "#4169E1" },
      { name: "Red", hex: "#DC143C" },
    ],
    features: [
      "UV400 protection",
      "Shatterproof lenses",
      "Flexible hinges",
      "Soft silicone nose pads",
      "Included protective case",
    ],
    inStock: true,
    isBestseller: true,
    seo: {
      title: "Junior Explorer Kids Sunglasses | LUXE VISION",
      description: "Durable, protective sunglasses designed for children with shatterproof lenses.",
      keywords: ["kids", "children", "uv protection"],
    },
  },
  {
    id: "kid-002",
    name: "Teen Style Pro",
    slug: "teen-style-pro",
    category: "kids",
    description: "Trendy sunglasses designed for pre-teens and teenagers. Adult-quality protection with youth-oriented styling. Perfect for outdoor activities and everyday wear.",
    price: 95,
    images: [
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800",
    ],
    colors: [
      { name: "Matte Black", hex: "#1a1a1a" },
      { name: "Tortoise", hex: "#8B4513" },
      { name: "Crystal", hex: "#E8E8E8" },
    ],
    features: [
      "UV400 protection",
      "Polarized option",
      "Durable frame",
      "Sport hinges",
      "Cleaning cloth included",
    ],
    inStock: true,
    isNew: true,
    seo: {
      title: "Teen Style Pro Sunglasses | LUXE VISION",
      description: "Stylish sunglasses for teenagers with full UV protection.",
      keywords: ["teen", "youth", "polarized"],
    },
  },

  // Blue Light Collection
  {
    id: "blu-001",
    name: "Digital Shield Classic",
    slug: "digital-shield-classic",
    category: "blue-light",
    description: "Premium blue light blocking glasses for the modern digital lifestyle. Filter 90% of harmful blue light from screens while maintaining crystal-clear vision and comfortable wear.",
    price: 129,
    comparePrice: 159,
    images: [
      "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=800",
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800",
    ],
    colors: [
      { name: "Gold", hex: "#D4AF37" },
      { name: "Silver", hex: "#C0C0C0" },
      { name: "Rose Gold", hex: "#B76E79" },
    ],
    features: [
      "90% blue light filtering",
      "Anti-reflective coating",
      "Scratch-resistant",
      "Lightweight frame",
      "Reduced eye fatigue",
    ],
    inStock: true,
    isBestseller: true,
    seo: {
      title: "Digital Shield Classic Blue Light Glasses | LUXE VISION",
      description: "Premium blue light blocking glasses for digital eye strain relief.",
      keywords: ["blue light", "computer", "digital", "gaming"],
    },
  },
  {
    id: "blu-002",
    name: "Gamer Edge Pro",
    slug: "gamer-edge-pro",
    category: "blue-light",
    description: "Engineered specifically for gamers and heavy computer users. Advanced blue light filtering with amber tint for enhanced contrast during extended gaming sessions.",
    price: 149,
    images: [
      "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=800",
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800",
    ],
    colors: [
      { name: "Black/Red", hex: "#1a1a1a" },
      { name: "Black/Blue", hex: "#000080" },
    ],
    features: [
      "95% blue light filtering",
      "Amber tint",
      "Ultra-lightweight",
      "Non-slip temples",
      "Extended wear comfort",
    ],
    inStock: true,
    isNew: true,
    seo: {
      title: "Gamer Edge Pro Blue Light Glasses | LUXE VISION",
      description: "Professional blue light blocking glasses designed for gamers.",
      keywords: ["gaming", "blue light", "esports"],
    },
  },

  // Sports Collection
  {
    id: "sp-001",
    name: "Velocity Sport Elite",
    slug: "velocity-sport-elite",
    category: "sports",
    description: "High-performance sports sunglasses designed for runners, cyclists, and athletes. Lightweight wraparound frame with interchangeable lenses for varying conditions.",
    price: 199,
    images: [
      "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=800",
      "https://images.unsplash.com/photo-1577803645773-f96470509666?w=800",
    ],
    colors: [
      { name: "Matte Black", hex: "#1a1a1a" },
      { name: "Photochromic", hex: "#4B0082" },
    ],
    features: [
      "Interchangeable lenses",
      "Wraparound design",
      "Non-slip grip",
      "Ventilated lenses",
      "Impact resistant",
    ],
    inStock: true,
    isBestseller: true,
    seo: {
      title: "Velocity Sport Elite Sunglasses | LUXE VISION",
      description: "High-performance sports sunglasses with interchangeable lenses.",
      keywords: ["sports", "running", "cycling", "athletic"],
    },
  },
  {
    id: "sp-002",
    name: "Aqua Performance",
    slug: "aqua-performance",
    category: "sports",
    description: "Designed specifically for water sports with hydrophobic lens coating that repels water. Floatable frame design ensures your sunglasses stay with you during any water activity.",
    price: 175,
    images: [
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800",
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800",
    ],
    colors: [
      { name: "Ocean Blue", hex: "#0077BE" },
      { name: "Lime", hex: "#32CD32" },
    ],
    features: [
      "Hydrophobic coating",
      "Floatable frame",
      "Polarized lenses",
      "Saltwater resistant",
      "Secure strap included",
    ],
    inStock: true,
    seo: {
      title: "Aqua Performance Water Sports Sunglasses | LUXE VISION",
      description: "Water sports sunglasses with hydrophobic coating and floatable design.",
      keywords: ["water sports", "fishing", "boating", "polarized"],
    },
  },

  // Fashion Collection
  {
    id: "fas-001",
    name: "Signature Cat Eye",
    slug: "signature-cat-eye",
    category: "fashion",
    description: "Elegant cat-eye silhouette that exudes sophistication. Handcrafted Italian acetate frame with premium CR-39 lenses. A statement piece for the fashion-forward individual.",
    price: 245,
    comparePrice: 295,
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800",
    ],
    colors: [
      { name: "Tortoise", hex: "#8B4513" },
      { name: "Crystal", hex: "#E8E8E8" },
      { name: "Black", hex: "#0a0a0a" },
    ],
    features: [
      "Italian acetate",
      "CR-39 lenses",
      "100% UV protection",
      "Hand-finished",
      "Premium case included",
    ],
    inStock: true,
    isBestseller: true,
    seo: {
      title: "Signature Cat Eye Sunglasses | LUXE VISION",
      description: "Elegant cat-eye sunglasses handcrafted from Italian acetate.",
      keywords: ["cat eye", "fashion", "italian", "luxury"],
    },
  },
  {
    id: "fas-002",
    name: "Modern Round Classic",
    slug: "modern-round-classic",
    category: "fashion",
    description: "Contemporary take on the classic round silhouette. Ultra-thin stainless steel frame with premium tinted lenses. Lightweight comfort meets timeless style.",
    price: 189,
    images: [
      "https://images.unsplash.com/photo-1577803645773-f96470509666?w=800",
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=800",
    ],
    colors: [
      { name: "Gold/Brown", hex: "#D4AF37" },
      { name: "Silver/Green", hex: "#C0C0C0" },
      { name: "Rose Gold/Pink", hex: "#B76E79" },
    ],
    features: [
      "Stainless steel",
      "Tinted lenses",
      "100% UV protection",
      "Ultra-thin frame",
      "Featherlight comfort",
    ],
    inStock: true,
    isNew: true,
    seo: {
      title: "Modern Round Classic Sunglasses | LUXE VISION",
      description: "Contemporary round sunglasses with ultra-thin stainless steel frames.",
      keywords: ["round", "minimalist", "stainless steel"],
    },
  },
  {
    id: "fas-003",
    name: "Oversized Statement",
    slug: "oversized-statement",
    category: "fashion",
    description: "Bold oversized frames that command attention. Premium acetate construction with gradient lenses that offer full coverage and maximum impact.",
    price: 269,
    images: [
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800",
      "https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=800",
    ],
    colors: [
      { name: "Black", hex: "#0a0a0a" },
      { name: "Havana", hex: "#8B4513" },
    ],
    features: [
      "Oversized frame",
      "Gradient lenses",
      "Italian acetate",
      "Full UV protection",
      "Designer case included",
    ],
    inStock: true,
    seo: {
      title: "Oversized Statement Sunglasses | LUXE VISION",
      description: "Bold oversized sunglasses with gradient lenses for maximum impact.",
      keywords: ["oversized", "bold", "gradient", "designer"],
    },
  },
  // New Product - KT001
  {
    id: "KT001",
    name: "Men Polarized Sunglasses",
    slug: "men-polarized-sunglasses",
    category: "driving",
    description: "Classic men's polarized sunglasses with premium frame design. Features advanced glare reduction technology for optimal driving comfort and clear visibility in bright conditions.",
    price: 12,
    comparePrice: 19,
    images: [
      "https://photo3.yupoo.com/lincaizhi/d1b2df12/4128d1d9.jpg?username=lincaizhi"
    ],
    colors: [
      { name: "金色", hex: "#D4AF37" },
      { name: "银色", hex: "#C0C0C0" }
    ],
    features: [
      "Polarized lenses",
      "UV400 protection",
      "Lightweight frame",
      "Anti-slip temples",
    ],
    inStock: true,
    isBestseller: false,
    isNew: true,
    seo: {
      title: "Men Polarized Sunglasses | LUXE VISION",
      description: "Classic men's polarized sunglasses with premium frame design.",
      keywords: ["men sunglasses", "polarized sunglasses"],
    },
  },
];

// Helper functions
export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isBestseller).slice(0, 4);
}

export function getNewProducts(): Product[] {
  return products.filter((p) => p.isNew).slice(0, 4);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
  );
}

export function getRelatedProducts(
  productId: string,
  category: string
): Product[] {
  return products
    .filter((p) => p.category === category && p.id !== productId)
    .slice(0, 4);
}
