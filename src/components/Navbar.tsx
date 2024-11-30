import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold">
            Vincy Ads
          </Link>

          <div className="flex-1 max-w-2xl mx-4">
            <form onSubmit={handleSearch} className="flex">
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

          <div className="flex items-center space-x-4">
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
