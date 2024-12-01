import React from 'react';
import { Link } from 'react-router-dom';
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

const categories = [
  {
    id: 'vehicles',
    name: 'Vehicles',
    icon: Car,
    description: 'Cars, motorcycles, boats, and other vehicles',
    subcategories: ['Cars', 'Motorcycles', 'Boats', 'Other Vehicles']
  },
  {
    id: 'property',
    name: 'Property',
    icon: HomeIcon,
    description: 'Houses, apartments, land, and commercial properties',
    subcategories: ['Houses', 'Apartments', 'Land', 'Commercial']
  },
  {
    id: 'electronics',
    name: 'Electronics',
    icon: Laptop,
    description: 'Phones, computers, tablets, and other electronics',
    subcategories: ['Phones', 'Computers', 'TVs & Audio', 'Other Electronics']
  },
  {
    id: 'furniture',
    name: 'Furniture',
    icon: Sofa,
    description: 'Home and office furniture',
    subcategories: ['Living Room', 'Bedroom', 'Kitchen', 'Office']
  },
  {
    id: 'jobs',
    name: 'Jobs',
    icon: Briefcase,
    description: 'Job listings and employment opportunities',
    subcategories: ['Full-time', 'Part-time', 'Contract', 'Internship']
  },
  {
    id: 'services',
    name: 'Services',
    icon: Wrench,
    description: 'Professional and personal services',
    subcategories: ['Home Services', 'Professional', 'Personal', 'Other Services']
  },
  {
    id: 'fashion',
    name: 'Fashion',
    icon: ShoppingBag,
    description: 'Clothing, shoes, and accessories',
    subcategories: ['Clothing', 'Shoes', 'Accessories', 'Watches & Jewelry']
  },
  {
    id: 'other',
    name: 'Other',
    icon: Package,
    description: 'Other items and miscellaneous',
    subcategories: ['Sports & Leisure', 'Books & Media', 'Pets', 'Everything Else']
  }
];

const Categories: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{category.name}</h2>
                  <p className="text-sm text-gray-500 mt-1">{category.description}</p>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Subcategories:</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {category.subcategories.map((sub) => (
                    <li
                      key={sub}
                      className="text-sm text-gray-600 hover:text-blue-600"
                    >
                      {sub}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
