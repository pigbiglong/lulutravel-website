export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  duration: string;
  location: string;
  heroImage: string;
  gallery: readonly string[];
  highlights: readonly string[];
  itinerary: readonly ItineraryDay[];
  included: readonly string[];
  notIncluded: readonly string[];
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  image?: string;
  meals: readonly string[];
}

export interface CartItem {
  productId: string;
  product: Product;
  guests: number;
  date?: string;
  addons: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
}

export interface Booking {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}
