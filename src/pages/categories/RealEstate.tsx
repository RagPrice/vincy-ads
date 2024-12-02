import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Listing } from '../../types';
import ListingCard from '../../components/ListingCard';
import FilterSidebar from '../../components/FilterSidebar';
import { useState } from 'react';

const fetchRealEstateListings = async (subcategory?: string): Promise<Listing[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          title: 'Modern Apartment in Kingstown',
          description: 'Newly renovated 2-bedroom apartment',
          price: 250000,
          images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'],
          location: 'Kingstown',
          category: 'real-estate',
          subcategory: 'for-sale',
          views: 150,
          contactInfo: 'contact@email.com',
          isOnSale: false,
          isFeatured: true
        },
        {
          id: '2',
          title: 'Commercial Space in Arnos Vale',
          description: 'Prime location commercial property',
          price: 450000,
          images: ['https://images.unsplash.com/photo-1497366216548-37526070297c'],
          location: 'Arnos Vale',
          category: 'real-estate',
          subcategory: 'commercial-properties',
          views: 120,
          contactInfo: 'contact@email.com',
          isOnSale: false,
          isFeatured: true
        }
      ].filter(listing => !subcategory || listing.subcategory === subcategory));
    }, 1000);
  });
};

export default function RealEstate() {
  const { subcategory } = useParams();
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    condition: '',
    location: ''
  });

  const { data: listings, isLoading } = useQuery({
    queryKey: ['real-estate', subcategory, filters],
    queryFn: () => fetchRealEstateListings(subcategory)
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
          {subcategory ? `Real Estate - ${subcategory.replace(/-/g, ' ')}` : 'Real Estate'}
        </h1>
        <p className="text-gray-600">
          Browse {subcategory ? subcategory.replace(/-/g, ' ') : ''} properties in St. Vincent and the Grenadines
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
