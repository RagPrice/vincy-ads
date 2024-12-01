import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Listing } from '../../types';

const generateMockListings = (category: string): Listing[] => {
  return Array.from({ length: 12 }, (_, i) => ({
    id: `${category}-${i + 1}`,
    title: `${category} Item ${i + 1}`,
    description: `This is a great ${category} item for sale`,
    price: Math.floor(Math.random() * 1000) + 100,
    images: [`https://source.unsplash.com/featured/600x400?${category}`],
    location: 'Kingstown, St. Vincent',
    category: category,
    views: Math.floor(Math.random() * 100),
    contactInfo: 'seller@email.com',
    isOnSale: Math.random() > 0.7,
    isFeatured: Math.random() > 0.8
  }));
};

const CategoryPage: React.FC = () => {
  const { category, subcategory } = useParams<{ category: string; subcategory?: string }>();
  const listings = generateMockListings(category || '');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="text-gray-500 text-sm">
            <ol className="list-none p-0 inline-flex">
              <li className="flex items-center">
                <Link to="/" className="hover:text-purple-600">Home</Link>
                <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                  <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/>
                </svg>
              </li>
              <li>
                <span className="capitalize text-purple-600">
                  {subcategory ? `${category} / ${subcategory}` : category}
                </span>
              </li>
            </ol>
          </nav>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 capitalize">
            {subcategory || category}
          </h1>
          <p className="text-gray-600 mt-2">
            Browse the latest {subcategory || category} listings in St. Vincent and the Grenadines
          </p>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {listings.map((listing) => (
            <a
              key={listing.id}
              href={`/listing/${listing.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <div className="relative aspect-video">
                <img 
                  src={listing.images[0]} 
                  alt={listing.title} 
                  className="w-full h-full object-cover"
                />
                {listing.isOnSale && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Sale
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-xl font-semibold text-white mb-1">{listing.title}</h3>
                  <div className="flex justify-between items-center text-white">
                    <span className="text-sm">{listing.location}</span>
                    <span className="text-sm font-semibold">${listing.price}</span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm line-clamp-2">{listing.description}</p>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-gray-500">{listing.views} views</span>
                  {listing.isFeatured && (
                    <span className="text-purple-600 font-semibold">Featured</span>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
