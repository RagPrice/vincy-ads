import React from 'react';
import { Listing } from '../types';

const Browse = () => {
  const [listings] = React.useState<Listing[]>([
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
    // Add more mock listings as needed
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Browse Listings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={listing.images[0]}
              alt={listing.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                {listing.title}
              </h3>
              <p className="text-gray-600 text-sm mb-2">{listing.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-purple-600">
                  ${listing.price.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500">{listing.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Browse;
