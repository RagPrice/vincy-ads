import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Listing } from '../../types';
import ListingCard from '../../components/ListingCard';
import FilterSidebar from '../../components/FilterSidebar';
import { useState } from 'react';

const fetchJobListings = async (): Promise<Listing[]> => {
  // This would be replaced with an actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          title: 'Senior Software Developer',
          description: 'Full-time position for experienced developer',
          price: 75000,
          images: ['/jobs/software-dev.jpg'],
          location: 'Kingstown',
          category: 'jobs',
          views: 300,
          contactInfo: 'careers@company.com',
          isOnSale: false,
          isFeatured: true
        },
        // Add more mock job listings
      ]);
    }, 1000);
  });
};

export default function Jobs() {
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    condition: '',
    location: ''
  });

  const { data: listings, isLoading } = useQuery({
    queryKey: ['jobs', filters],
    queryFn: fetchJobListings
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
          <h1 className="text-3xl font-bold mb-8">Jobs</h1>
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
