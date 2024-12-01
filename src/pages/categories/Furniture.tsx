import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Listing } from '../../types';
import ListingCard from '../../components/ListingCard';
import FilterSidebar from '../../components/FilterSidebar';
import { useState } from 'react';

const fetchFurnitureListings = async (): Promise<Listing[]> => {
  // This would be replaced with an actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          title: 'Modern Dining Set',
          description: '6-seater dining table with chairs',
          price: 1200,
          images: ['/furniture/dining-set.jpg'],
          location: 'Kingstown',
          category: 'furniture',
          views: 160,
          contactInfo: 'furniture@email.com',
          isOnSale: true,
          isFeatured: false
        },
        // Add more mock furniture listings
      ]);
    }, 1000);
  });
};

export default function Furniture() {
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    condition: '',
    location: ''
  });

  const { data: listings, isLoading } = useQuery({
    queryKey: ['furniture', filters],
    queryFn: fetchFurnitureListings
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-6">
        <FilterSidebar filters={filters} onFilterChange={setFilters} />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-8">Furniture & Home</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings?.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
