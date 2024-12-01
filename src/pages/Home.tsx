import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Car,
  Home as HomeIcon,
  Laptop,
  Sofa,
  Briefcase,
  Wrench,
  Gift,
  Shirt,
  Dumbbell,
  Baby,
  Calendar,
  Package,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const categories = [
  {
    name: 'Vehicles',
    icon: <Car />,
    path: '/category/vehicles',
    subcategories: ['For Sale', 'For Rent']
  },
  {
    name: 'Real Estate',
    icon: <HomeIcon />,
    path: '/category/real-estate',
    subcategories: ['Houses for Sale', 'Apartments for Rent', 'Commercial Properties', 'Land', 'Roommates']
  },
  {
    name: 'Electronics',
    icon: <Laptop />,
    path: '/category/electronics',
    subcategories: ['Computers', 'Smartphones', 'Tablets', 'Audio Equipment', 'Gaming Consoles', 'Accessories']
  },
  {
    name: 'Furniture',
    icon: <Sofa />,
    path: '/category/furniture',
    subcategories: ['Living Room', 'Bedroom', 'Kitchen', 'Office Furniture', 'Home Decor', 'Appliances']
  },
  {
    name: 'Jobs',
    icon: <Briefcase />,
    path: '/category/jobs',
    subcategories: ['Full-Time', 'Part-Time', 'Contract', 'Freelance', 'Internships', 'Industry-Specific Roles']
  },
  {
    name: 'Fashion',
    icon: <Shirt />,
    path: '/category/fashion',
    subcategories: ['Clothing', 'Shoes', 'Watches', 'Jewelry', 'Bags', 'Vintage & Collectibles']
  },
  {
    name: 'Events',
    icon: <Calendar />,
    path: '/category/events',
    subcategories: []
  },
  {
    name: 'Services',
    icon: <Wrench />,
    path: '/category/services',
    subcategories: ['Home Services', 'Professional Services', 'Tutoring', 'Event Services', 'Repair Services']
  },
  {
    name: 'Free',
    icon: <Gift />,
    path: '/category/free',
    subcategories: []
  },
  {
    name: 'Other',
    icon: <Package />,
    path: '/category/other',
    subcategories: ['Free Items', 'Collectibles', 'Hobbies', 'Art & Crafts']
  }
];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showCategories, setShowCategories] = useState(false);
  const [featuredListings] = React.useState([
    {
      id: '1',
      title: 'Toyota Corolla 2019',
      description: 'Well maintained, single owner',
      price: 45000,
      images: ['/cars/toyota-corolla.jpg'],
      location: 'Kingstown',
      category: 'vehicles',
      views: 120,
      contactInfo: 'contact@email.com',
      isOnSale: false,
      isFeatured: true
    },
    {
      id: '2',
      title: 'Luxury Apartment',
      description: 'Prime location, fully furnished',
      price: 299000,
      images: ['https://images.unsplash.com/photo-1497366216548-37526070297c'],
      location: 'Kingstown',
      category: 'real-estate',
      contactInfo: 'contact@email.com',
      views: 85,
      isOnSale: true,
      isFeatured: true
    },
    {
      id: '3',
      title: 'Beachfront Villa',
      description: 'Luxury 4-bedroom villa with private beach access',
      price: 850000,
      images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811'],
      location: 'Bequia',
      category: 'real-estate',
      contactInfo: 'contact@email.com',
      views: 100,
      isOnSale: false,
      isFeatured: true
    }
  ]);

  const [hotDeals] = React.useState([
    {
      id: '4',
      title: 'iPhone 13 Pro',
      description: 'Brand new, sealed in box',
      price: 2500,
      originalPrice: 3000,
      images: ['https://images.unsplash.com/photo-1632661674596-618d8b34d669'],
      location: 'Kingstown',
      category: 'electronics',
      discount: '17% OFF'
    },
    {
      id: '5',
      title: 'Gaming Laptop',
      description: 'RTX 3060, 16GB RAM',
      price: 3500,
      originalPrice: 4200,
      images: ['https://images.unsplash.com/photo-1605134513573-005b85795920'],
      location: 'Arnos Vale',
      category: 'electronics',
      discount: '16% OFF'
    },
    {
      id: '6',
      title: 'Dining Set',
      description: 'Solid wood, 6 chairs',
      price: 1200,
      originalPrice: 1500,
      images: ['https://images.unsplash.com/photo-1617104551722-3b2d51366400'],
      location: 'Calliaqua',
      category: 'furniture',
      discount: '20% OFF'
    },
    {
      id: '7',
      title: 'Mountain Bike',
      description: 'Like new condition',
      price: 800,
      originalPrice: 1000,
      images: ['https://images.unsplash.com/photo-1532298229144-0ec0c57515c7'],
      location: 'Mesopotamia',
      category: 'sports',
      discount: '20% OFF'
    },
    {
      id: '8',
      title: 'Smart TV 55"',
      description: '4K Ultra HD',
      price: 1800,
      originalPrice: 2200,
      images: ['https://images.unsplash.com/photo-1593784991095-a205069470b6'],
      location: 'Kingstown',
      category: 'electronics',
      discount: '18% OFF'
    },
    {
      id: '9',
      title: 'Office Chair',
      description: 'Ergonomic design',
      price: 400,
      originalPrice: 500,
      images: ['https://images.unsplash.com/photo-1505797149-35ebcb05a236'],
      location: 'Arnos Vale',
      category: 'furniture',
      discount: '20% OFF'
    },
    {
      id: '10',
      title: 'Coffee Machine',
      description: 'Professional grade',
      price: 600,
      originalPrice: 750,
      images: ['https://images.unsplash.com/photo-1517142089942-7fde63acd811'],
      location: 'Kingstown',
      category: 'appliances',
      discount: '20% OFF'
    },
    {
      id: '11',
      title: 'Wireless Headphones',
      description: 'Noise cancelling',
      price: 280,
      originalPrice: 350,
      images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e'],
      location: 'Calliaqua',
      category: 'electronics',
      discount: '20% OFF'
    }
  ]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-12 mb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">
              Welcome to Vincy Ads Marketplace
            </h1>
            <p className="text-xl mb-8">
              Your one-stop destination for buying and selling in St. Vincent and
              the Grenadines
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/post-ad"
                className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
              >
                Post an Ad
              </Link>
              <button
                onClick={() => setShowCategories(!showCategories)}
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Browse Categories
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      {showCategories && (
        <div className="container mx-auto px-4 mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-purple-600">Categories</h2>
            <div className="flex gap-2">
              <button
                onClick={() => scroll('left')}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="relative group">
            <div 
              ref={scrollContainerRef}
              className="flex flex-nowrap overflow-x-auto gap-2 pb-4 no-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {categories.map((category) => (
                <div key={category.name} className="flex-shrink-0 w-32">
                  <div 
                    className="relative hover:text-purple-600 transition-colors"
                    onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
                  >
                    <div className="block bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer text-center transform hover:-translate-y-1">
                      <div className="text-3xl mb-2 flex justify-center items-center text-current">
                        {category.icon}
                      </div>
                      <h3 className="text-sm font-semibold text-current">
                        {category.name}
                      </h3>
                    </div>
                    
                    {/* Subcategories Dropdown */}
                    {category.subcategories.length > 0 && selectedCategory === category.name && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-20 p-3 transform transition-all duration-300 opacity-100 translate-y-0">
                        <ul className="space-y-1.5">
                          {category.subcategories.map((sub) => (
                            <li key={sub}>
                              <Link 
                                to={`${category.path}/${sub.toLowerCase().replace(/ /g, '-')}`}
                                className="text-sm text-gray-600 hover:text-purple-600 block py-1.5 px-3 hover:bg-purple-50 rounded-md transition-all duration-200"
                              >
                                {sub}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Scroll Buttons */}
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-purple-600 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity -ml-4 z-10"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-purple-600 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity -mr-4 z-10"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Featured Listings */}
      <div className="container mx-auto px-4 mb-16">
        <h2 className="text-2xl font-bold text-purple-600 mb-8">
          Featured Listings
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {featuredListings.map((listing) => (
            <Link
              key={listing.id}
              to={`/listing/${listing.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={listing.images[0]}
                alt={listing.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  {listing.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {listing.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-purple-600">
                    ${listing.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500">
                    {listing.location}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Banner */}
      <div className="container mx-auto px-4 mb-16">
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 py-12 rounded-lg">
          <div className="max-w-7xl mx-auto px-4 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to sell?</h2>
            <p className="text-xl mb-6">List your items and reach thousands of buyers in St. Vincent and the Grenadines</p>
            <Link
              to="/post-ad"
              className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
            >
              Post an Ad
            </Link>
          </div>
        </div>
      </div>

      {/* Hot Deals */}
      <div className="container mx-auto px-4 mb-16">
        <h2 className="text-2xl font-bold text-orange-500 mb-8">
          Hot Deals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {hotDeals.slice(0, 8).map((deal) => (
            <Link
              key={deal.id}
              to={`/listing/${deal.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow relative"
            >
              <div className="absolute top-4 right-4 bg-orange-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
                {deal.discount}
              </div>
              <img
                src={deal.images[0]}
                alt={deal.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  {deal.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {deal.description}
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xl font-bold text-orange-500">
                      ${deal.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-400 line-through ml-2">
                      ${deal.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {deal.location}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
