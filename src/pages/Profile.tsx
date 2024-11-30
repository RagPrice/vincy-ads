import { useState } from 'react';

const Profile = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // This will be implemented with Firebase Authentication
  const mockUser = {
    name: 'John Doe',
    email: 'john@example.com',
    memberSince: new Date('2023-01-01'),
    listings: [
      {
        id: '1',
        title: '2020 Tesla Model 3',
        price: 35000,
        status: 'active',
        views: 1500,
        image: 'https://placeholder.com/150x150'
      },
      // Add more mock listings
    ]
  };

  const handleLogin = (provider: 'google' | 'facebook' | 'apple') => {
    // This will be implemented with Firebase Authentication
    console.log(`Logging in with ${provider}`);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Sign In
        </h1>

        <div className="space-y-4">
          <button
            onClick={() => handleLogin('google')}
            className="w-full flex items-center justify-center space-x-2 bg-white border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5"
            />
            <span>Continue with Google</span>
          </button>

          <button
            onClick={() => handleLogin('facebook')}
            className="w-full flex items-center justify-center space-x-2 bg-[#1877F2] text-white px-6 py-3 rounded-lg hover:bg-[#1864D9] transition-colors"
          >
            <span>Continue with Facebook</span>
          </button>

          <button
            onClick={() => handleLogin('apple')}
            className="w-full flex items-center justify-center space-x-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors"
          >
            <span>Continue with Apple</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800">{mockUser.name}</h1>
            <p className="text-gray-600">{mockUser.email}</p>
            <p className="text-sm text-gray-500">
              Member since {mockUser.memberSince.toLocaleDateString()}
            </p>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* User's Listings */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Your Listings</h2>
        <div className="space-y-4">
          {mockUser.listings.map((listing) => (
            <div
              key={listing.id}
              className="flex items-center space-x-4 p-4 border rounded-lg"
            >
              <img
                src={listing.image}
                alt={listing.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{listing.title}</h3>
                <p className="text-gray-600">${listing.price.toLocaleString()}</p>
                <p className="text-sm text-gray-500">{listing.views} views</p>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    listing.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {listing.status}
                </span>
                <button className="text-blue-500 hover:text-blue-600">Edit</button>
                <button className="text-red-500 hover:text-red-600">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
