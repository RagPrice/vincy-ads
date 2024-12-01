import { Link } from 'react-router-dom';
import { Heart, Eye } from 'lucide-react';
import { Listing } from '../types/auth';
import { formatDistanceToNow } from 'date-fns';

interface ListingCardProps {
  listing: Listing;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  return (
    <Link
      to={`/listing/${listing.id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative h-48">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="w-full h-full object-cover"
        />
        {listing.featured && (
          <span className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-semibold">
            Featured
          </span>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 line-clamp-1">{listing.title}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{listing.description}</p>
        
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-bold text-blue-600">
            ${listing.price.toLocaleString()}
          </span>
          <span className="text-sm text-gray-500">
            {listing.location.address}
          </span>
        </div>
        
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              {listing.views}
            </span>
            <span className="flex items-center">
              <Heart className="w-4 h-4 mr-1" />
              {listing.favorites}
            </span>
          </div>
          <span>
            {formatDistanceToNow(new Date(listing.createdAt), { addSuffix: true })}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
