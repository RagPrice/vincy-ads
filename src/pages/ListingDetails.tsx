import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Heart, Share2, Flag, MapPin, Calendar, Tag, Eye } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Listing } from '../types/auth';
import { formatDistanceToNow } from 'date-fns';

// Mock function to fetch listing details - replace with actual API call
const fetchListingDetails = async (id: string): Promise<Listing> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        title: 'Sample Listing',
        description: 'This is a detailed description of the listing.',
        price: 1000,
        category: 'electronics',
        subcategory: 'phones',
        condition: 'new',
        images: ['/placeholder.jpg', '/placeholder2.jpg'],
        location: {
          address: 'Kingstown, St. Vincent',
          coordinates: {
            lat: 13.1561,
            lng: -61.2279
          }
        },
        userId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'active',
        featured: true,
        views: 123,
        favorites: 45,
      });
    }, 1000);
  });
};

export default function ListingDetails() {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, login } = useAuth();

  const { data: listing, isLoading } = useQuery({
    queryKey: ['listing', id],
    queryFn: () => fetchListingDetails(id!),
  });

  const handleContact = () => {
    if (!isAuthenticated) {
      login();
      return;
    }
    // Implement contact functionality
  };

  const handleFavorite = () => {
    if (!isAuthenticated) {
      login();
      return;
    }
    // Implement favorite functionality
  };

  const handleShare = () => {
    navigator.share({
      title: listing?.title,
      text: listing?.description,
      url: window.location.href,
    }).catch(() => {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(window.location.href);
    });
  };

  const handleReport = () => {
    if (!isAuthenticated) {
      login();
      return;
    }
    // Implement report functionality
  };

  if (isLoading || !listing) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden">
            <img
              src={listing.images[0]}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {listing.images.map((image, index) => (
              <button
                key={index}
                className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden"
              >
                <img
                  src={image}
                  alt={`${listing.title} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Listing Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-blue-600">
                ${listing.price.toLocaleString()}
              </span>
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleFavorite}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <Heart className="w-6 h-6" />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <Share2 className="w-6 h-6" />
                </button>
                <button
                  onClick={handleReport}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <Flag className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2" />
              {listing.location.address}
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="w-5 h-5 mr-2" />
              Posted {formatDistanceToNow(new Date(listing.createdAt), { addSuffix: true })}
            </div>
            <div className="flex items-center text-gray-600">
              <Tag className="w-5 h-5 mr-2" />
              {listing.condition.charAt(0).toUpperCase() + listing.condition.slice(1)} condition
            </div>
            <div className="flex items-center text-gray-600">
              <Eye className="w-5 h-5 mr-2" />
              {listing.views} views
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-600 whitespace-pre-line">{listing.description}</p>
          </div>

          <button
            onClick={handleContact}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Contact Seller
          </button>
        </div>
      </div>
    </div>
  );
}
