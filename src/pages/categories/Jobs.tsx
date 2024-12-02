import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Listing } from '../../types';
import ListingCard from '../../components/ListingCard';
import FilterSidebar from '../../components/FilterSidebar';
import { useState } from 'react';

const fetchJobListings = async (subcategory?: string): Promise<Listing[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          title: 'Senior Software Developer',
          description: 'Full-time position for experienced developer',
          price: 0,
          images: ['https://images.unsplash.com/photo-1498050108023-c5249f4df085'],
          location: 'Kingstown',
          category: 'jobs',
          subcategory: 'full-time',
          views: 200,
          contactInfo: 'careers@company.com',
          isOnSale: false,
          isFeatured: true
        },
        {
          id: '2',
          title: 'Marketing Intern',
          description: '6-month internship opportunity',
          price: 0,
          images: ['https://images.unsplash.com/photo-1557804506-669a67965ba0'],
          location: 'Arnos Vale',
          category: 'jobs',
          subcategory: 'internships',
          views: 150,
          contactInfo: 'hr@company.com',
          isOnSale: false,
          isFeatured: false
        }
      ].filter(listing => !subcategory || listing.subcategory === subcategory));
    }, 1000);
  });
};

export default function Jobs() {
  const { subcategory } = useParams();
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    condition: '',
    location: ''
  });

  const { data: listings, isLoading } = useQuery({
    queryKey: ['jobs', subcategory, filters],
    queryFn: () => fetchJobListings(subcategory)
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {subcategory ? `Jobs - ${subcategory.replace(/-/g, ' ')}` : 'Jobs'}
        </h1>
        <p className="text-gray-600">
          Browse {subcategory ? subcategory.replace(/-/g, ' ') : ''} job opportunities in St. Vincent and the Grenadines
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <FilterSidebar filters={filters} setFilters={setFilters} />
        
        <div className="flex-1">
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
