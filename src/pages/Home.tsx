import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { incrementViews } from '../utils/storage';
import { Listing, CATEGORIES } from '../types';
import { getFeaturedListings, getHotDeals } from '../utils/storage';
import {
  Car,
  Home as HomeIcon,
  Laptop,
  Sofa,
  Briefcase,
  Wrench,
  ShoppingBag,
  Package
} from 'lucide-react';

const CATEGORY_ICONS = {
  'vehicles': Car,
  'property': HomeIcon,
  'electronics': Laptop,
  'furniture': Sofa,
  'jobs': Briefcase,
  'services': Wrench,
  'fashion': ShoppingBag,
  'others': Package
};

const mockFeatured = [
  {
    id: '1',
    title: 'Beautiful House for Sale',
    description: 'Spacious 3-bedroom house with modern amenities',
    price: 350000,
    images: ['https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80'],
    location: 'San Francisco, CA',
    contactInfo: 'Contact for details',
    isFeatured: true,
    views: 100
  },
  {
    id: '2',
    title: 'Luxury Penthouse',
    description: 'Downtown with amazing views',
    price: 1250000,
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'],
    location: 'Los Angeles, CA',
    contactInfo: 'Contact for details',
    isFeatured: true,
    views: 50
  },
  {
    id: '3',
    title: 'MacBook Pro M2',
    description: 'Brand new in box',
    price: 2499,
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'],
    location: 'New York, NY',
    contactInfo: 'Contact for details',
    isFeatured: true,
    views: 200
  }
];

const mockDeals = [
  {
    id: '1',
    title: 'MacBook Pro M1',
    description: 'Latest model, mint condition',
    price: 1299,
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'],
    location: 'Kingstown',
    contactInfo: 'Contact for details',
    category: 'deals',
    views: 150
  },
  {
    id: '2',
    title: 'iPhone 13 Pro',
    description: 'Unlocked, 256GB Storage',
    price: 899,
    images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'],
    location: 'Bequia',
    contactInfo: 'Contact for details',
    category: 'deals',
    views: 120
  },
  {
    id: '3',
    title: 'Sony PlayStation 5',
    description: 'Brand new, sealed box',
    price: 499,
    images: ['https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80'],
    location: 'Mesopotamia',
    contactInfo: 'Contact for details',
    category: 'deals',
    views: 180
  },
  {
    id: '4',
    title: 'DJI Mavic Air 2',
    description: '4K Drone with extras',
    price: 599,
    images: ['https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&w=800&q=80'],
    location: 'Calliaqua',
    contactInfo: 'Contact for details',
    category: 'deals',
    views: 220
  },
  {
    id: '5',
    title: 'Samsung 4K Smart TV',
    description: '55-inch QLED Display',
    price: 699,
    images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80'],
    location: 'Arnos Vale',
    contactInfo: 'Contact for details',
    category: 'deals',
    views: 250
  },
  {
    id: '6',
    title: 'Nintendo Switch OLED',
    description: 'With 2 games included',
    price: 299,
    images: ['https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=800&q=80'],
    location: 'Georgetown',
    contactInfo: 'Contact for details',
    category: 'deals',
    views: 280
  }
];

const Home: React.FC = () => {
  const [featuredListings, setFeaturedListings] = useState<Listing[]>([]);
  const [dealsListings, setDealsListings] = useState<Listing[]>([]);

  const handleListingClick = (id: string, isHotDeal: boolean) => {
    const updatedListing = incrementViews(id);
    if (!updatedListing) return;

    if (isHotDeal) {
      setDealsListings(prevListings => 
        prevListings.map(deal => 
          deal.id === id ? updatedListing : deal
        )
      );
    } else {
      setFeaturedListings(prevListings => 
        prevListings.map(listing => 
          listing.id === id ? updatedListing : listing
        )
      );
    }
  };

  useEffect(() => {
    setFeaturedListings(getFeaturedListings());
    setDealsListings(getHotDeals());
  }, []);

  const displayedFeaturedListings = featuredListings.length > 0 ? featuredListings : mockFeatured;
  const displayedDealsListings = dealsListings.length > 0 ? dealsListings : mockDeals;

  return (
    <div className="min-h-screen bg-gray-50">
      <div>
        {/* Top Advertisement Banner */}
        <div className="container mx-auto px-4 py-8">
          <div className="w-full bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-12 mb-8 text-center">
            <h2 className="text-2xl text-gray-600 font-semibold">Advertise Here</h2>
          </div>
        </div>

        {/* Categories Section */}
        <section className="container mx-auto px-4 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {CATEGORIES.map((category) => {
              const Icon = CATEGORY_ICONS[category.id as keyof typeof CATEGORY_ICONS];
              return (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Icon className="w-8 h-8 text-blue-600 mb-2" />
                  <span className="text-sm text-center font-medium text-gray-700 capitalize">
                    {category.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              Find What You Need
            </h1>
            <p className="text-xl">
              Browse local listings or post your own advertisement
            </p>
          </div>
        </section>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Left Column - Square Ads */}
          <div className="hidden md:flex flex-col gap-4 w-64">
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center aspect-square">
              <h3 className="text-lg text-gray-600 font-semibold">Advertise Here</h3>
            </div>
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center aspect-square">
              <h3 className="text-lg text-gray-600 font-semibold">Advertise Here</h3>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Featured Listings Section */}
            <section className="container mx-auto px-4 mt-12">
              <Link to="/featured" className="inline-block">
                <h2 className="text-2xl font-bold mb-6 text-purple-600 hover:text-purple-500 transition-colors duration-300">
                  Featured Items
                  <span className="ml-2 text-sm">&rarr;</span>
                </h2>
              </Link>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedFeaturedListings.map((listing) => (
                  <Link
                    key={listing.id}
                    to={`/listing/${listing.id}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    onClick={() => handleListingClick(listing.id, false)}
                  >
                    <div className="relative h-48">
                      <img
                        src={listing.images[0]}
                        alt={listing.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2 text-purple-600">{listing.title}</h3>
                      <p className="text-gray-600 mb-2">{listing.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-purple-600 font-bold">${listing.price.toLocaleString()}</span>
                        <span className="text-gray-500 text-sm">{listing.views} views</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Hot Deals Section */}
            <section className="container mx-auto px-4 mt-12 mb-12">
              <Link to="/hot-deals" className="inline-block">
                <h2 className="text-2xl font-bold mb-6 text-orange-600 hover:text-orange-500 transition-colors duration-300">
                  Hot Deals
                  <span className="ml-2 text-sm">&rarr;</span>
                </h2>
              </Link>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayedDealsListings.map((deal) => (
                  <Link
                    key={deal.id}
                    to={`/listing/${deal.id}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    onClick={() => handleListingClick(deal.id, true)}
                  >
                    <div className="relative h-40">
                      <img
                        src={deal.images[0]}
                        alt={deal.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2 text-orange-600">{deal.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{deal.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-orange-600 font-bold">${deal.price.toLocaleString()}</span>
                        <span className="text-gray-500 text-sm">{deal.views} views</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
