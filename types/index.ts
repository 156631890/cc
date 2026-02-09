// Product Categories
export type ProductCategory =
  | "driving"
  | "kids"
  | "blue-light"
  | "sports"
  | "fashion";

// Color type
export interface Color {
  name: string;
  hex: string;
  image?: string;
}

// Product interface
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: ProductCategory;
  colors: Color[];
  sizes?: string[];
  features: string[];
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

// Cart item - simplified version used by store
export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: any; // For compatibility - can be Color object or string
  selectedSize?: string;
}

// Cart item with color/size selection (for future use)
export interface CartItemWithSelection {
  product: Product;
  quantity: number;
  selectedColor: Color;
  selectedSize?: string;
}

// Cart state
export interface CartState {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

// Category info
export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  description: string;
  image: string;
}

// Filter options
export interface FilterOptions {
  categories: ProductCategory[];
  priceRange: [number, number];
  colors: string[];
  inStockOnly: boolean;
}

// Sort options
export type SortOption = "newest" | "price-low" | "price-high" | "popular";

// Review type
export interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

// Order type
export interface Order {
  id: string;
  items: CartItem[];
  customer: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
  shipping: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  subtotal: number;
  tax: number;
  shippingCost: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  createdAt: string;
}

// Coupon type
export interface Coupon {
  code: string;
  discount: number;
  type: "percentage" | "fixed";
}

// Cart store state
export interface CartStore {
  items: CartItem[];
  coupon: Coupon | null;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, selectedColor: Color, selectedSize?: string) => void;
  updateQuantity: (productId: string, selectedColor: Color, quantity: number, selectedSize?: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; discount: number; message?: string };
  removeCoupon: () => void;
  getSubtotal: () => number;
  getTax: () => number;
  getShipping: () => number;
  getTotal: () => number;
  getTotalItems: () => number;
}

// Customer info for checkout
export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

// Shipping address for checkout
export interface ShippingAddress {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

// Payment method
export interface PaymentMethod {
  type: "card" | "paypal";
  cardLast4?: string;
}

// Checkout state
export interface CheckoutState {
  step: "customer" | "shipping" | "payment" | "review" | "complete";
  customerInfo: CustomerInfo | null;
  shippingAddress: ShippingAddress | null;
  paymentMethod: PaymentMethod | null;
  isProcessing: boolean;
}

// Wishlist item
export interface WishlistItem {
  productId: string;
  addedAt: Date;
}
