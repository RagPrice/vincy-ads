import React from 'react';
import { useParams } from 'react-router-dom';
import { Listing } from '../../types';

// Mock data generator for listings
const generateMockListings = (category: string): Listing[] => {
  return Array.from({ length: 12 }, (_, i) => ({
    id: `${category}-${i + 1}`,
    title: `${category} Item ${i + 1}`,
    price: Math.floor(Math.random() * 1000) + 100,
    location: 'Kingstown, St. Vincent',
    image: `https://source.unsplash.com/featured/400x300?${category.toLowerCase()}`,
    description: `This is a great ${category.toLowerCase()} item available for purchase.`,
    views: Math.floor(Math.random() * 100),
    discount: Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 10 : undefined,
  }));
};

const CategoryPage: React.FC = () => {
  const { category, subcategory } = useParams<{ category: string; subcategory?: string }>();
  const decodedCategory = category ? decodeURIComponent(category) : '';
  const decodedSubcategory = subcategory ? decodeURIComponent(subcategory) : '';
  
  const listings = generateMockListings(decodedCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="text-gray-500 text-sm">
            <ol className="list-none p-0 inline-flex">
              <li className="flex items-center">
                <a href="/" className="hover:text-purple-600">Home</a>
                <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                  <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/>
                </svg>
              </li>
              <li className="flex items-center">
                <span className="text-purple-600">{decodedCategory}</span>
                {decodedSubcategory && (
                  <>
                    <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                      <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/>
                    </svg>
                    <span className="text-purple-600">{decodedSubcategory}</span>
                  </>
                )}
              </li>
            </ol>
          </nav>
        </div>

        {/* Category Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {decodedSubcategory || decodedCategory}
          </h1>
          <p className="text-gray-600 mt-2">
            Browse all listings in {decodedSubcategory ? `${decodedCategory} - ${decodedSubcategory}` : decodedCategory}
          </p>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {listings.map((item) => (
            <a
              key={item.id}
              href={`/item/${item.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <div className="relative">
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                {item.discount && (
                  <div className="absolute top-2 right-2 bg-orange-600 text-white px-2 py-1 rounded-full text-sm font-medium">
                    -{item.discount}%
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-purple-600 mb-2">{item.title}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-800">
                    ${item.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500">{item.location}</span>
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
