// ── Types ─────────────────────────────────────────────
export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface ProductVariant {
  id: string;
  size: string;
  color: string;
  colorHex: string;
  stock: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  shortDescription: string;
  description: string;
  basePrice: number;
  discountPercentage: number;
  category: string;
  subcategory: string;
  collection: string;
  fabric: string;
  fit: string;
  care: string;
  tags: string[];
  isTrending: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  isOnSale: boolean;
  images: ProductImage[];
  variants: ProductVariant[];
  reviews: Review[];
  rating: number;
  reviewCount: number;
  deliveryDays: string;
  isArchived?: boolean;
  datasheetUrl?: string;
  specs?: Record<string, string>;
}

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  loyaltyPoints: number;
  avatar?: string;
}

export interface Address {
  id: string;
  label: string;
  firstName: string;
  lastName: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  date: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Returned';
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: string;
  address: Address;
  trackingId?: string;
}

export type SortOption = 'popular' | 'newest' | 'price-asc' | 'price-desc';

export interface FilterState {
  categories: string[];
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
  fabrics: string[];
  collections: string[];
  availability: string[];
}
