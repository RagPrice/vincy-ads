export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  location: string;
  category: string;
  contactInfo: string;
  views: number;
  isOnSale: boolean;
  isFeatured: boolean;
  discount?: number;
  subcategory?: string;
  condition?: string;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  status?: string;
  favorites?: number;
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
  subcategories?: string[];
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  provider?: 'email' | 'google' | 'facebook' | 'apple';
  createdAt: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  provider?: 'email' | 'google' | 'facebook' | 'apple';
}

export const CATEGORIES: Category[] = [
  { 
    id: 'vehicles',
    name: 'Vehicles',
    subcategories: ['Cars', 'Motorcycles', 'Boats', 'Trucks', 'Recreational Vehicles']
  },
  { 
    id: 'real-estate',
    name: 'Real Estate',
    subcategories: ['Houses for Sale', 'Apartments for Rent', 'Commercial Properties', 'Land', 'Roommates']
  },
  { 
    id: 'electronics',
    name: 'Electronics',
    subcategories: ['Computers', 'Smartphones', 'Tablets', 'Audio Equipment', 'Gaming Consoles', 'Accessories']
  },
  { 
    id: 'furniture-home',
    name: 'Furniture & Home',
    subcategories: ['Living Room', 'Bedroom', 'Kitchen', 'Office Furniture', 'Home Decor', 'Appliances']
  },
  { 
    id: 'jobs',
    name: 'Jobs',
    subcategories: ['Full-Time', 'Part-Time', 'Contract', 'Freelance', 'Internships', 'Industry-Specific Roles']
  },
  { 
    id: 'fashion',
    name: 'Fashion & Accessories',
    subcategories: ['Clothing', 'Shoes', 'Watches', 'Jewelry', 'Bags', 'Vintage & Collectibles']
  },
  { 
    id: 'sports-outdoor',
    name: 'Sports & Outdoor',
    subcategories: ['Fitness Equipment', 'Bicycles', 'Camping Gear', 'Sports Equipment', 'Outdoor Clothing']
  },
  { 
    id: 'services',
    name: 'Services',
    subcategories: ['Home Services', 'Professional Services', 'Tutoring', 'Event Services', 'Repair Services']
  },
  { 
    id: 'pets',
    name: 'Pets',
    subcategories: ['Pets for Sale', 'Pet Accessories', 'Pet Services', 'Adoption']
  },
  { 
    id: 'miscellaneous',
    name: 'Miscellaneous',
    subcategories: ['Free Items', 'Collectibles', 'Hobbies', 'Art & Crafts']
  }
];

export const MAX_DESCRIPTION_LENGTH = 1000; 
export const MAX_TITLE_LENGTH = 100; 
export const MAX_IMAGES = 4;
