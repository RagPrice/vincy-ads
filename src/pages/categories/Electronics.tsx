import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Listing } from '../../types';
import ListingCard from '../../components/ListingCard';
import FilterSidebar from '../../components/FilterSidebar';
import { useState } from 'react';

const fetchElectronicsListings = async (subcategory?: string): Promise<Listing[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          title: 'MacBook Pro M1',
          description: 'Like new condition, barely used',
          price: 2500,
          images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8'],
          location: 'Kingstown',
          category: 'electronics',
          subcategory: 'computers',
          views: 89,
          contactInfo: 'contact@email.com',
          isOnSale: false,
          isFeatured: true
        },
        {
          id: '2',
          title: 'iPhone 13 Pro',
          description: 'Unlocked, perfect condition',
          price: 1800,
          images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9'],
          location: 'Arnos Vale',
          category: 'electronics',
          subcategory: 'smartphones',
          views: 120,
          contactInfo: 'contact@email.com',
          isOnSale: true,
          isFeatured: false
        }
      ].filter(listing => !subcategory || listing.subcategory === subcategory));
    }, 1000);
  });
};

export default function Electronics() {
  const { subcategory } = useParams();
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    condition: '',
    location: ''
  });

  const { data: listings, isLoading } = useQuery({
    queryKey: ['electronics', subcategory, filters],
    queryFn: () => fetchElectronicsListings(subcategory)
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
          {subcategory ? `Electronics - ${subcategory.replace(/-/g, ' ')}` : 'Electronics'}
        </h1>
        <p className="text-gray-600">
          Browse {subcategory ? subcategory.replace(/-/g, ' ') : ''} electronics in St. Vincent and the Grenadines
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
