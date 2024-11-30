import React from 'react';
import { Link } from 'react-router-dom';
import { incrementViews } from '../utils/storage';
import BackButton from '../components/BackButton';

const featuredListings = [
  {
    id: '1',
    title: 'Beachfront Villa in Bequia',
    description: 'Stunning 4-bedroom villa with private beach access',
    price: 850000,
    images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80'],
    location: 'Bequia',
    views: 245
  },
  {
    id: '2',
    title: '2023 Toyota Hilux',
    description: 'Brand new, fully loaded with all extras',
    price: 95000,
    images: ['https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=800&q=80'],
    location: 'Kingstown',
    views: 188
  },
  {
    id: '3',
    title: 'Commercial Space in Arnos Vale',
    description: 'Prime location near airport, perfect for retail',
    price: 450000,
    images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'],
    location: 'Arnos Vale',
    views: 156
  },
  {
    id: '4',
    title: 'Island Tours Business',
    description: 'Established tour company with boats and vehicles',
    price: 275000,
    images: ['https://images.unsplash.com/photo-1586500036065-8ea65c5c3011?auto=format&fit=crop&w=800&q=80'],
    location: 'Kingstown',
    views: 134
  },
  {
    id: '5',
    title: 'Luxury Yacht - 45ft',
    description: 'Well-maintained yacht, perfect for charters',
    price: 385000,
    images: ['https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=800&q=80'],
    location: 'Blue Lagoon',
    views: 198
  },
  {
    id: '6',
    title: 'Restaurant with Beach View',
    description: 'Fully equipped restaurant in tourist hotspot',
    price: 550000,
    images: ['https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'],
    location: 'Indian Bay',
    views: 167
  }
];

const FeaturedItems = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-4">
        <BackButton />
      </div>

      {/* Top Advertisement Banner */}
      <div className="w-full bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-12 mb-8 text-center">
        <h2 className="text-2xl text-gray-600 font-semibold">Advertise Here</h2>
      </div>

      <div className="flex gap-8">
        {/* Left Column - Square Ads */}
        <div className="hidden md:flex flex-col gap-8 w-64 flex-shrink-0">
          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center aspect-square">
            <h3 className="text-lg text-gray-600 font-semibold">Advertise Here</h3>
          </div>
          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center aspect-square">
            <h3 className="text-lg text-gray-600 font-semibold">Advertise Here</h3>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-8 text-purple-600">Featured Items</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredListings.map((listing) => (
              <Link
                key={listing.id}
                to={`/listing/${listing.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                onClick={() => incrementViews(listing.id)}
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
                  <div className="mt-2">
                    <span className="text-gray-500 text-sm">{listing.location}</span>
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

export default FeaturedItems;
