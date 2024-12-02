import React from 'react';
import { Link } from 'react-router-dom';

const Free = () => {
  const [freeItems] = React.useState([
    {
      id: '1',
      title: 'Used Books Collection',
      description: 'Collection of various used books in good condition',
      images: ['https://images.unsplash.com/photo-1524578271613-d550eacf6090'],
      location: 'Kingstown',
      postedDate: '2024-01-15'
    },
    {
      id: '2',
      title: 'Plant Cuttings',
      description: 'Various plant cuttings for gardening enthusiasts',
      images: ['https://images.unsplash.com/photo-1466692476868-aef1dfb1e735'],
      location: 'Calliaqua',
      postedDate: '2024-01-14'
    }
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Free Items</h1>
        <p className="text-gray-600 mt-2">Browse items that are being given away for free</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {freeItems.map((item) => (
          <Link
            key={item.id}
            to={`/listing/${item.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={item.images[0]}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                {item.description}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{item.location}</span>
                <span>Posted: {new Date(item.postedDate).toLocaleDateString()}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {freeItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No free items available at the moment.</p>
          <Link
            to="/post-ad"
            className="inline-block mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Post a Free Item
          </Link>
        </div>
      )}
    </div>
  );
};

export default Free;
