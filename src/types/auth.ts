export interface User {
  id: string;
  email: string;
  name?: string;
  picture?: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  error: Error | null;
}

export interface AuthContextType extends AuthState {
  login: () => Promise<void>;
  logout: () => Promise<void>;
  signup: () => Promise<void>;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  subcategory: string;
  condition: 'new' | 'like-new' | 'good' | 'fair' | 'poor';
  images: string[];
  location: {
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'sold' | 'expired' | 'draft';
  featured: boolean;
  views: number;
  favorites: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
  parentId: string;
}
