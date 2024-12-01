import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Listing } from '../types';

// Mock function to fetch listings - replace with actual API call
const fetchListings = async (category: string): Promise<Listing[]> => {
  // This would be replaced with an actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          title: 'Sample Listing',
          description: 'This is a sample listing',
          price: 100,
          category: category,
          images: ['/placeholder.jpg'],
          location: 'Kingstown',
          views: 0,
          contactInfo: 'contact@email.com',
          isOnSale: false,
          isFeatured: false
        },
      ]);
    }, 1000);
  });
};

export default function CategoryPage() {
  const { category } = useParams();

  const { data: listings, isLoading } = useQuery({
    queryKey: ['listings', category],
    queryFn: () => fetchListings(category || ''),
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-600">Loading listings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 capitalize">
        {category?.replace('-', ' ')} Listings
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {listings?.map((listing) => (
          <div
            key={listing.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={listing.images[0]}
              alt={listing.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                {listing.title}
              </h3>
              <p className="text-gray-600 text-sm mb-2">{listing.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-purple-600">
                  ${listing.price.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500">{listing.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
