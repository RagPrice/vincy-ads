export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  location: string;
  category: string;
  contactInfo: string;
  isFeatured: boolean;
  views: number;
  isOnSale?: boolean;
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
