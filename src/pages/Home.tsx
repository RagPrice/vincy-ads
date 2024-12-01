import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { incrementViews } from '../utils/storage';
import { Listing } from '../types';
import {
  Car,
  Home as HomeIcon,
  Laptop,
  Sofa,
  Briefcase,
  ShoppingBag,
  ChevronDown,
  Smartphone,
  Wrench,
  Gift,
  PaintBucket,
  Shirt,
  UtensilsCrossed,
  GraduationCap,
  Dumbbell,
  Music,
  PawPrint,
  Baby,
  Gamepad2,
  Flower2,
  BookOpen,
  Calendar,
  Package,
  ChevronRight,
} from 'lucide-react';

interface SubCategory {
  name: string;
  subcategories?: string[];
}

interface Category {
  name: string;
  path: string;
  subcategories: (string | SubCategory)[];
}

const categories: Category[] = [
  {
    name: 'Vehicles',
    path: '/category/vehicles',
    subcategories: [
      'For Sale',
      'For Rent'
    ]
  },
  {
    name: 'Real Estate',
    path: '/category/real-estate',
    subcategories: [
      'Houses for Sale',
      'Apartments for Rent',
      'Commercial Properties',
      'Land',
      'Roommates'
    ]
  },
  {
    name: 'Electronics',
    path: '/category/electronics',
    subcategories: [
      'Computers',
      'Smartphones',
      'Tablets',
      'Audio Equipment',
      'Gaming Consoles',
      'Accessories'
    ]
  },
  {
    name: 'Fashion & Accessories',
    path: '/category/fashion',
    subcategories: [
      'Clothing',
      'Shoes',
      'Watches',
      'Jewelry',
      'Bags',
      'Vintage & Collectibles'
    ]
  },
  {
    name: 'Jobs',
    path: '/category/jobs',
    subcategories: [
      'Full-Time',
      'Part-Time',
      'Contract',
      'Freelance',
      'Internships',
      'Industry-Specific Roles'
    ]
  },
  {
    name: 'Events',
    path: '/category/events',
    subcategories: []
  },
  {
    name: 'Furniture & Home',
    path: '/category/furniture-home',
    subcategories: [
      'Living Room',
      'Bedroom',
      'Kitchen',
      'Office Furniture',
      'Home Decor',
      'Appliances'
    ]
  },
  {
    name: 'Services',
    path: '/category/services',
    subcategories: [
      'Home Services',
      'Professional Services',
      'Tutoring',
      'Event Services',
      'Repair Services'
    ]
  },
  {
    name: 'Pets',
    path: '/category/pets',
    subcategories: [
      'Pets for Sale',
      'Pet Accessories',
      'Pet Services',
      'Adoption'
    ]
  },
  {
    name: 'Miscellaneous',
    path: '/category/miscellaneous',
    subcategories: [
      'Free Items',
      'Collectibles',
      'Hobbies',
      'Art & Crafts'
    ]
  }
];

const CATEGORY_ICONS = {
  'vehicles': Car,
  'real-estate': HomeIcon,
  'electronics': Laptop,
  'furniture-home': Sofa,
  'jobs': Briefcase,
  'fashion': Shirt,
  'events': Calendar,
  'services': Wrench,
  'pets': PawPrint,
  'miscellaneous': Package,
};

const Home = () => {
  const [featuredListings] = useState<Listing[]>([
    {
      id: '1',
      title: 'Luxury Beach House',
      description: 'Beautiful 3-bedroom villa with ocean view',
      price: 750000,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      location: 'Bequia',
      category: 'Real Estate',
      contactInfo: 'contact@email.com',
      featured: true,
      views: 150
    },
    {
      id: '2',
      title: 'Modern Office Space',
      description: 'Prime location, fully furnished',
      price: 299000,
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      location: 'Kingstown',
      category: 'Real Estate',
      contactInfo: 'contact@email.com',
      featured: true,
      views: 120
    },
    {
      id: '3',
      title: 'Beachfront Villa',
      description: 'Luxury 4-bedroom villa with private beach access',
      price: 850000,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      location: 'Bequia',
      category: 'Real Estate',
      contactInfo: 'contact@email.com',
      featured: true,
      views: 100
    }
  ]);

  const [dealsListings] = useState<Listing[]>([
    {
      id: '4',
      title: 'iPhone 14 Pro',
      description: '256GB, Midnight, Unlocked',
      price: 899,
      image: 'https://images.unsplash.com/photo-1678911820864-e5c67e784b10?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      location: 'Kingstown',
      category: 'Electronics',
      contactInfo: 'contact@email.com',
      discount: 20,
      views: 200
    },
    {
      id: '5',
      title: 'Designer Sofa Set',
      description: '3-piece modern living room set',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      location: 'Calliaqua',
      category: 'Furniture & Home',
      contactInfo: 'contact@email.com',
      discount: 30,
      views: 150
    },
    {
      id: '6',
      title: 'Samsung 65" QLED TV',
      description: '4K Smart TV with HDR',
      price: 799,
      image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      location: 'Mesopotamia',
      category: 'Electronics',
      contactInfo: 'contact@email.com',
      discount: 25,
      views: 180
    },
    {
      id: '7',
      title: 'Mountain Bike',
      description: '29" Premium Mountain Bike',
      price: 449,
      image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      location: 'Layou',
      category: 'Sports',
      contactInfo: 'contact@email.com',
      discount: 15,
      views: 120
    },
    {
      id: '8',
      title: 'Gold Necklace',
      description: '18K Gold Chain, 20 inches',
      price: 599,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      location: 'Kingstown',
      category: 'Fashion & Accessories',
      contactInfo: 'contact@email.com',
      discount: 40,
      views: 160
    },
    {
      id: '9',
      title: 'Gaming Console',
      description: 'Latest gen with 2 controllers',
      price: 399,
      image: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      location: 'Arnos Vale',
      category: 'Electronics',
      contactInfo: 'contact@email.com',
      discount: 20,
      views: 140
    },
    {
      id: '10',
      title: 'Dining Set',
      description: '6-seater wooden dining set',
      price: 899,
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      location: 'Bequia',
      category: 'Furniture & Home',
      contactInfo: 'contact@email.com',
      discount: 35,
      views: 130
    },
    {
      id: '11',
      title: 'Designer Watch',
      description: 'Luxury automatic watch',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      location: 'Kingstown',
      category: 'Fashion & Accessories',
      contactInfo: 'contact@email.com',
      discount: 25,
      views: 170
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSelectedCategory(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(prev => prev === categoryName ? null : categoryName);
  };

  const handleListingClick = (id: string) => {
    incrementViews(id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Advertisement Banner */}
      <div className="container mx-auto p-4">
        <div className="bg-gray-200 rounded-lg p-8 text-center h-48 flex items-center justify-center">
          <span className="text-gray-600 text-2xl">Advertise Here</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16 h-64 mb-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Find What You Need</h1>
          <p className="text-xl">Browse local listings or post your own advertisement</p>
        </div>
      </div>

      {/* Main Content with Side Banners */}
      <div className="container mx-auto px-4 space-y-16">
        {/* Categories Grid */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {categories.map((category) => (
              <div 
                key={category.name} 
                className="relative group"
                ref={selectedCategory === category.name ? dropdownRef : null}
              >
                <div 
                  onClick={() => handleCategoryClick(category.name)}
                  className="w-full h-full flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 hover:bg-gray-50 transition-all duration-300 cursor-pointer"
                >
                  {CATEGORY_ICONS[category.path.slice(10)] && 
                    React.createElement(
                      CATEGORY_ICONS[category.path.slice(10)],
                      { className: "w-10 h-10 text-blue-600 mb-3 group-hover:text-purple-600 transition-colors duration-300" }
                    )
                  }
                  <span className="text-sm font-medium text-center text-gray-700 group-hover:text-purple-600 transition-colors duration-300">
                    {category.name}
                    {category.subcategories.length > 0 && 
                      <ChevronDown className={`w-4 h-4 ml-1 inline-block transition-transform duration-300 ${selectedCategory === category.name ? 'rotate-180' : ''}`} />
                    }
                  </span>
                </div>
                
                {/* Primary Dropdown */}
                {category.subcategories.length > 0 && selectedCategory === category.name && (
                  <div 
                    className="absolute z-50 w-48 left-0 top-full mt-2 transform transition-all duration-200 opacity-100"
                    role="menu"
                    aria-orientation="vertical"
                  >
                    <div className="bg-white rounded-lg shadow-lg py-2">
                      {category.subcategories.map((subcat, index) => (
                        <Link
                          key={index}
                          to={`${category.path}/${typeof subcat === 'string' ? subcat : subcat.name}`.toLowerCase().replace(/ /g, '-')}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                          role="menuitem"
                          tabIndex={-1}
                        >
                          {typeof subcat === 'string' ? subcat : subcat.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Featured Section */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-purple-600">Featured Items</h2>
            <Link to="/featured" className="text-purple-600 hover:text-purple-700 font-medium">
              View All
              <ChevronRight className="w-5 h-5 inline-block ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {featuredListings.slice(0, 3).map((item, index) => (
              <Link
                key={index}
                to={`/item/${item.id}`}
                onClick={() => handleListingClick(item.id)}
                className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-t-lg" />
                <div className="p-4">
                  <h3 className="text-lg font-medium text-purple-600 mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-2">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800">${item.price}</span>
                    <span className="text-sm text-gray-500">{item.location}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Middle Advertisement Banner */}
        <div className="mt-16 bg-gradient-to-r from-purple-500 to-blue-500 h-60 rounded-lg shadow-md">
          <div className="h-full flex flex-col items-center justify-center text-white space-y-4">
            <h2 className="text-2xl font-semibold">Advertise Here</h2>
            <p className="text-lg">Get your products noticed by our growing community</p>
            <Link to="/contact" className="mt-4 bg-white text-purple-600 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors duration-300">
              Contact Us
            </Link>
          </div>
        </div>

        {/* Hot Deals Section */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-orange-600">Hot Deals</h2>
            <Link to="/hot-deals" className="text-orange-600 hover:text-orange-700 font-medium">
              View All
              <ChevronRight className="w-5 h-5 inline-block ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {dealsListings.map((item, index) => (
              <Link
                key={index}
                to={`/item/${item.id}`}
                onClick={() => handleListingClick(item.id)}
                className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <div className="relative">
                  <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-t-lg" />
                  <div className="absolute top-2 right-2 bg-orange-600 text-white px-2 py-1 rounded-full text-sm font-medium">
                    {item.discount}% OFF
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-orange-600 mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-2">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-lg font-bold text-gray-800">${item.price}</span>
                      <span className="text-sm text-gray-500 ml-2 line-through">${Math.round(item.price * (1 + item.discount/100))}</span>
                    </div>
                    <span className="text-sm text-gray-500">{item.location}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
