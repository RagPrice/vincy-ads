export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  location: string;
  contactInfo: string;
  category: string;
  isOnSale: boolean;
  createdAt: string;
  userId?: string;
  views: number;
}

export interface ListingFormData {
  title: string;
  description: string;
  price: string;
  category: string;
  images: string[];
  location: string;
  contactInfo: string;
  isFeatured: boolean;
  isOnSale: boolean;
}

export interface ListingValidation {
  title: string[];
  description: string[];
  price: string[];
  category: string[];
  images: string[];
  location: string[];
  contactInfo: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: string;
}

export interface SignupFormData {
  email: string;
  password: string;
  name: string;
}

export const CATEGORIES: Category[] = [
  { id: 'vehicles', name: 'Vehicles', icon: '🚗' },
  { id: 'property', name: 'Property', icon: '🏠' },
  { id: 'electronics', name: 'Electronics', icon: '💻' },
  { id: 'furniture', name: 'Furniture', icon: '🪑' },
  { id: 'jobs', name: 'Jobs', icon: '💼' },
  { id: 'services', name: 'Services', icon: '🔧' },
  { id: 'fashion', name: 'Fashion', icon: '👕' },
  { id: 'others', name: 'Others', icon: '📦' }
];

export const MAX_DESCRIPTION_LENGTH = 1000; 
export const MAX_TITLE_LENGTH = 100; 
export const MAX_IMAGES = 4;
