export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  location: string;
  category: string;
  subcategory?: string;
  views: number;
  contactInfo: string;
  isOnSale?: boolean;
  isFeatured?: boolean;
  originalPrice?: number;
  discount?: string;
  createdAt?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface SignupFormData {
  email: string;
  password: string;
  name: string;
}

export interface FilterState {
  minPrice: string;
  maxPrice: string;
  condition: string;
  location: string;
}

export interface FilterSidebarProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}

export const CATEGORIES = [
  { id: 'vehicles', name: 'Vehicles' },
  { id: 'property', name: 'Property' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'furniture', name: 'Furniture' },
  { id: 'jobs', name: 'Jobs' },
  { id: 'services', name: 'Services' },
  { id: 'fashion', name: 'Fashion' },
  { id: 'others', name: 'Others' }
];
