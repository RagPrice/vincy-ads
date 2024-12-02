import React, { useState, useRef, useEffect } from 'react';
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
  ChevronRight,
  Flame,
  ArrowRight
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
    subcategories: ['For Rent', 'For Sale', 'Commercial Properties', 'Land', 'Roommates']
  },
  {
    name: 'Electronics',
    icon: <Laptop />,
    path: '/category/electronics',
    subcategories: ['Computers', 'Smartphones', 'Tablets', 'Audio Equipment', 'Gaming Consoles', 'Accessories']
  },
  {
    name: 'Furniture & Home',
    icon: <Sofa />,
    path: '/category/furniture-home',
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
    name: 'Miscellaneous',
    icon: <Package />,
    path: '/category/miscellaneous',
    subcategories: ['Free Items', 'Collectibles', 'Hobbies', 'Art & Crafts']
  }
];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isDropdownHovered, setIsDropdownHovered] = useState(false);
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (document.body.contains(event.target as Node)) {
        setSelectedCategory(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Top Advertising Banner */}
      <div className="container mx-auto px-6 py-8">
        <div className="bg-gradient-to-r from-indigo-500 via-indigo-400 to-indigo-500 p-6 rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">Advertise with Us!</h3>
              <p className="text-white/90">Reach thousands of potential customers in St. Vincent</p>
            </div>
            <div className="flex gap-4">
              <a href="/advertise" className="bg-white text-indigo-600 px-6 py-2 rounded-lg hover:bg-indigo-50 transition-colors">
                Learn More
              </a>
              <a href="/contact" className="bg-indigo-700 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section with Categories */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-6">
            <h1 className="text-3xl font-bold mb-2">
              Welcome to Vincy Ads Marketplace
            </h1>
            <p className="text-lg">
              Your one-stop destination for buying and selling in St. Vincent and
              the Grenadines
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {categories.map((category) => (
              <Link 
                key={category.name}
                to={category.path}
                className="bg-white/10 backdrop-blur-sm p-4 rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105 group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="text-2xl mb-2 text-white group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-xs font-semibold text-white">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Listings */}
      <div className="container mx-auto px-6 py-16">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-purple-600">Featured Listings</h2>
            <Link to="/featured" className="text-purple-600 hover:text-purple-700 flex items-center gap-2 font-medium">
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredListings.map((listing) => (
              <div key={listing.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-102 hover:-translate-y-1">
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{listing.title}</h3>
                  <p className="text-gray-600 mb-4">{listing.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-600 font-bold">${listing.price}</span>
                    <span className="text-gray-500">{listing.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ad Banner */}
        <div className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 rounded-lg shadow-lg p-6 mb-16 transform transition-all duration-300 hover:scale-101">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Want to Sell Fast?</h3>
              <p className="text-gray-700">List your items and reach thousands of potential buyers today!</p>
            </div>
            <div className="flex gap-4">
              <Link to="/post-ad" className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                Post an Ad
              </Link>
              <Link to="/premium" className="bg-white text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                Go Premium
              </Link>
            </div>
          </div>
        </div>

        {/* Hot Deals */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-orange-500 flex items-center gap-2">
              <Flame className="w-6 h-6 text-orange-500" />
              Hot Deals
            </h2>
            <Link to="/hot-deals" className="text-orange-500 hover:text-orange-600 flex items-center gap-2 font-medium">
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {hotDeals.map((deal) => (
              <div key={deal.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-102 hover:-translate-y-1">
                <div className="relative overflow-hidden">
                  <img
                    src={deal.images[0]}
                    alt={deal.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm transform transition-transform duration-300 hover:scale-105">
                    {deal.discount}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{deal.title}</h3>
                  <p className="text-gray-600 mb-4">{deal.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-purple-600 font-bold">${deal.price}</span>
                      <span className="text-gray-400 line-through ml-2">${deal.originalPrice}</span>
                    </div>
                    <span className="text-gray-500">{deal.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
