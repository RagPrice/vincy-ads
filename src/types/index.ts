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
  { id: 'vehicles', name: 'Vehicles' },
  { id: 'property', name: 'Property' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'furniture', name: 'Furniture' },
  { id: 'jobs', name: 'Jobs' },
  { id: 'services', name: 'Services' },
  { id: 'fashion', name: 'Fashion' },
  { id: 'others', name: 'Others' }
];

export const MAX_DESCRIPTION_LENGTH = 1000; 
export const MAX_TITLE_LENGTH = 100; 
export const MAX_IMAGES = 4;
