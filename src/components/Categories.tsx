import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Car,
  Home as HomeIcon,
  Laptop,
  Sofa,
  Briefcase,
  Wrench,
  ShoppingBag,
  Package,
  ChevronDown
} from 'lucide-react';
import { CATEGORIES } from '../types';

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

const Categories = () => {
  const [showVehiclesDropdown, setShowVehiclesDropdown] = useState(false);
  const [showPropertyDropdown, setShowPropertyDropdown] = useState(false);

  const renderCategoryCard = (category: { id: string; name: string }) => {
    const Icon = CATEGORY_ICONS[category.id as keyof typeof CATEGORY_ICONS];
    
    if (category.id === 'vehicles') {
      return (
        <div className="relative" onMouseLeave={() => setShowVehiclesDropdown(false)}>
          <button
            onClick={() => setShowVehiclesDropdown(!showVehiclesDropdown)}
            className="w-full flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <Icon className="w-8 h-8 text-blue-600 mb-2" />
            <span className="text-sm text-center font-medium text-gray-700 capitalize flex items-center">
              {category.name}
              <ChevronDown className="w-4 h-4 ml-1" />
            </span>
          </button>
          {showVehiclesDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg">
              <Link
                to="/category/vehicles/sale"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                For Sale
              </Link>
              <Link
                to="/category/vehicles/rent"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                For Rent
              </Link>
            </div>
          )}
        </div>
      );
    }

    if (category.id === 'property') {
      return (
        <div className="relative" onMouseLeave={() => setShowPropertyDropdown(false)}>
          <button
            onClick={() => setShowPropertyDropdown(!showPropertyDropdown)}
            className="w-full flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <Icon className="w-8 h-8 text-blue-600 mb-2" />
            <span className="text-sm text-center font-medium text-gray-700 capitalize flex items-center">
              House/Apt
              <ChevronDown className="w-4 h-4 ml-1" />
            </span>
          </button>
          {showPropertyDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg">
              <Link
                to="/category/property/sale"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                For Sale
              </Link>
              <Link
                to="/category/property/rent"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                For Rent
              </Link>
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        to={`/category/${category.id}`}
        className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
      >
        <Icon className="w-8 h-8 text-blue-600 mb-2" />
        <span className="text-sm text-center font-medium text-gray-700 capitalize">
          {category.name}
        </span>
      </Link>
    );
  };

  return (
    <section className="container mx-auto px-4 mb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {CATEGORIES.map((category) => (
          <div key={category.id}>
            {renderCategoryCard(category)}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
