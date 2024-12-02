import React from 'react';
import { Listing } from '../types';
import { Eye, MapPin, Tag } from 'lucide-react';

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="w-full h-full object-cover"
        />
        {listing.isFeatured && (
          <div className="absolute top-2 right-2 bg-purple-600 text-white px-2 py-1 rounded text-xs font-semibold">
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
          {listing.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {listing.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-purple-600">
            <Tag className="w-4 h-4 mr-1" />
            <span className="font-semibold">
              ${listing.price.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Eye className="w-4 h-4 mr-1" />
            <span>{listing.views} views</span>
          </div>
        </div>

        <div className="flex items-center text-gray-500 text-sm">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{listing.location}</span>
        </div>
      </div>

      {/* Action Button */}
      <div className="px-4 pb-4">
        <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200">
          View Details
        </button>
      </div>
    </div>
  );
}
