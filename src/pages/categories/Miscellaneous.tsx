import React from 'react';
import { Link } from 'react-router-dom';

const Miscellaneous = () => {
  const [items] = React.useState([
    {
      id: '1',
      title: 'Vintage Collection',
      description: 'Various collectible items in excellent condition',
      price: 150,
      images: ['https://images.unsplash.com/photo-1584727638096-042c45049ebe'],
      location: 'Kingstown',
      category: 'collectibles'
    },
    {
      id: '2',
      title: 'Art Supplies',
      description: 'Mixed art supplies for hobbyists',
      price: 75,
      images: ['https://images.unsplash.com/photo-1513364776144-60967b0f800f'],
      location: 'Calliaqua',
      category: 'art-crafts'
    }
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Miscellaneous Items</h1>
        <p className="text-gray-600 mt-2">Browse various items that don't fit in other categories</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
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
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-purple-600">
                  ${item.price}
                </span>
                <span className="text-sm text-gray-500">
                  {item.location}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No items available at the moment.</p>
          <Link
            to="/post-ad"
            className="inline-block mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Post an Item
          </Link>
        </div>
      )}
    </div>
  );
};

export default Miscellaneous;
