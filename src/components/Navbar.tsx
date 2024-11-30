import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-yellow-400' : 'text-white hover:text-yellow-200';
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold mr-8">
            Vincy Ads
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 mr-8">
            <Link to="/" className={`${isActive('/')} transition duration-200`}>
              Home
            </Link>
            <Link to="/about" className={`${isActive('/about')} transition duration-200`}>
              About
            </Link>
            <Link to="/contact" className={`${isActive('/contact')} transition duration-200`}>
              Contact
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1">
            <form onSubmit={handleSearch} className="flex max-w-xl">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search listings..."
                className="w-full px-4 py-2 rounded-l text-gray-800 focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-yellow-500 text-white rounded-r hover:bg-yellow-600 transition duration-200"
              >
                Search
              </button>
            </form>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 ml-8">
            <Link
              to="/post-ad"
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-200"
            >
              Post Ad
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 border border-white text-white rounded hover:bg-white hover:text-blue-600 transition duration-200"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
