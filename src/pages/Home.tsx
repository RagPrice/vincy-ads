import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { incrementViews } from '../utils/storage';
import { Listing, CATEGORIES } from '../types';
import { getFeaturedListings, getHotDeals } from '../utils/storage';

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
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Find What You Need
          </h1>
          <p className="text-xl">
            Browse local listings or post your own advertisement
          </p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 mt-12 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id.toLowerCase()}`}
              className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md hover-lift hover:bg-blue-50 hover:scale-105 transform transition-all duration-200"
            >
              <span className="text-2xl mb-2 hover-float">{category.icon}</span>
              <span className="text-sm text-center font-medium text-gray-700 text-gradient-hover">{category.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Listings Section */}
      <section className="container mx-auto px-4 mt-12 mb-12">
        <h2 className="text-3xl font-bold text-purple-600 mb-6 text-gradient-hover">Featured Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedFeaturedListings.map((listing) => (
            <div key={listing.id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
              <Link 
                to={`/listing/${listing.id}`} 
                className="block"
                onClick={() => handleListingClick(listing.id, false)}
              >
                <div className="image-zoom h-48">
                  <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2 text-gradient-hover">{listing.title}</h3>
                  <p className="text-gray-600 mb-2">{listing.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-blue-600 hover-pulse">
                      ${listing.price}
                    </span>
                    <span className="text-sm text-gray-500">{listing.location}</span>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                      {listing.views} views
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Hot Deals Section */}
      <section className="container mx-auto px-4 mt-12 mb-12">
        <h2 className="text-3xl font-bold text-green-600 mb-6 text-gradient-hover">Hot Deals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedDealsListings.map((deal) => (
            <div key={deal.id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
              <Link 
                to={`/listing/${deal.id}`} 
                className="block"
                onClick={() => handleListingClick(deal.id, true)}
              >
                <div className="image-zoom h-48">
                  <img
                    src={deal.images[0]}
                    alt={deal.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2 text-gradient-hover">{deal.title}</h3>
                  <p className="text-gray-600 mb-2">{deal.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-green-600 hover-pulse">
                      ${deal.price}
                    </span>
                    <span className="text-sm text-gray-500">{deal.location}</span>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                      {deal.views} views
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
