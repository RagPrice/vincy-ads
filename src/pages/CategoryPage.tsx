import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Listing } from '../types';
import { getListings } from '../utils/storage';

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = () => {
      const allListings = getListings();
      let filteredListings: Listing[] = [];

      switch (categoryId) {
        case 'featured':
          filteredListings = allListings.slice(0, 12); // Show more items in category view
          break;
        case 'hot-deals':
          filteredListings = allListings.filter(listing => listing.isOnSale);
          break;
        default:
          filteredListings = allListings.filter(listing => listing.category === categoryId);
      }

      setListings(filteredListings);
      setLoading(false);
    };

    fetchListings();
  }, [categoryId]);

  const getCategoryTitle = () => {
    switch (categoryId) {
      case 'featured':
        return 'Featured Items';
      case 'hot-deals':
        return 'Hot Deals';
      case 'vehicles':
        return 'Vehicles';
      case 'real-estate':
        return 'Real Estate';
      case 'electronics':
        return 'Electronics';
      case 'furniture':
        return 'Furniture';
      case 'jobs':
        return 'Jobs';
      case 'services':
        return 'Services';
      default:
        return 'Category Items';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{getCategoryTitle()}</h1>
      
      {listings.length === 0 ? (
        <div className="text-center text-gray-600">
          No items found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <div key={listing.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <div className="h-48">
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{listing.title}</h3>
                <p className="text-gray-600 mb-2">{listing.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-blue-600">
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
                  {listing.isOnSale && (
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded">
                      Hot Deal
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
