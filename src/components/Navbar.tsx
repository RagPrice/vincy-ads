import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Bell, User, Plus } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Categories', path: '/categories' },
    { name: 'Featured', path: '/featured' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-purple-600">VincyAds</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-purple-600'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full flex">
              <input
                type="text"
                placeholder="Search for anything..."
                className="w-full px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:border-purple-500"
              />
              <button className="px-6 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700 transition-colors flex items-center">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/post-ad"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Post Ad</span>
            </Link>
            <button className="p-2 text-gray-600 hover:text-purple-600">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-purple-600">
              <User className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-purple-600"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Search - Only visible on mobile */}
        <div className="md:hidden py-4">
          <div className="relative flex">
            <input
              type="text"
              placeholder="Search for anything..."
              className="w-full px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:border-purple-500"
            />
            <button className="px-6 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700 transition-colors flex items-center">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-4 py-2 text-sm ${
                  isActive(item.path)
                    ? 'text-purple-600 bg-purple-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-4">
              <Link
                to="/post-ad"
                className="block px-4 py-2 text-center bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors mb-4 flex items-center justify-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Post Ad</span>
              </Link>
              <div className="flex justify-center space-x-4">
                <button className="p-2 text-gray-600 hover:text-purple-600">
                  <Bell className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-purple-600">
                  <User className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
