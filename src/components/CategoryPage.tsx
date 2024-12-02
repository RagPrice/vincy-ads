import React from 'react';
import { useParams } from 'react-router-dom';

interface CategoryPageProps {
  category: string;
  subcategory?: string;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category, subcategory }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {subcategory ? subcategory.replace(/-/g, ' ') : category}
        </h1>
        <p className="text-gray-600">
          Browse {subcategory ? subcategory.replace(/-/g, ' ') : category} listings in St. Vincent and the Grenadines
        </p>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price Range
            </label>
            <select className="w-full border border-gray-300 rounded-md p-2">
              <option>Any Price</option>
              <option>Under $100</option>
              <option>$100 - $500</option>
              <option>$500 - $1000</option>
              <option>Over $1000</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <select className="w-full border border-gray-300 rounded-md p-2">
              <option>All Locations</option>
              <option>Kingstown</option>
              <option>Arnos Vale</option>
              <option>Calliaqua</option>
              <option>Bequia</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <select className="w-full border border-gray-300 rounded-md p-2">
              <option>Newest First</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Most Popular</option>
            </select>
          </div>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sample listing cards - replace with actual data */}
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Sample Listing {item}</h3>
              <p className="text-gray-600 text-sm mb-2">
                Sample description for this listing
              </p>
              <div className="flex justify-between items-center">
                <span className="text-purple-600 font-bold">$199.99</span>
                <span className="text-gray-500 text-sm">Kingstown</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <nav className="flex items-center space-x-2">
          <button className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 rounded bg-purple-600 text-white">1</button>
          <button className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-50">
            3
          </button>
          <button className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-50">
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

export default CategoryPage;
