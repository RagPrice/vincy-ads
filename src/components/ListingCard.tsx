import { Link } from 'react-router-dom';
import { Listing } from '../types';

interface ListingCardProps {
  listing: Listing;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
      <Link to={`/listing/${listing.id}`} className="block">
        {listing.images && listing.images.length > 0 && (
          <div className="relative h-48">
            <img
              src={listing.images[0]}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
            {listing.isOnSale && (
              <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
                On Sale
              </span>
            )}
          </div>
        )}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{listing.title}</h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{listing.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-green-600">
              ${listing.price.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500">
              {listing.location}
            </span>
          </div>
          {listing.views !== undefined && (
            <div className="mt-2 text-sm text-gray-500">
              Views: {listing.views}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ListingCard;
