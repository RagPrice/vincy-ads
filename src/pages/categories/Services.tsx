import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Listing } from '../../types';
import ListingCard from '../../components/ListingCard';
import FilterSidebar from '../../components/FilterSidebar';
import { useState } from 'react';

const fetchServiceListings = async (subcategory?: string): Promise<Listing[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          title: 'Professional House Cleaning',
          description: 'Experienced cleaning service, available weekly',
          price: 100,
          images: ['https://images.unsplash.com/photo-1581578731548-c64695cc6952'],
          location: 'Kingstown',
          category: 'services',
          subcategory: 'home-services',
          views: 85,
          contactInfo: 'contact@email.com',
          isOnSale: false,
          isFeatured: true
        },
        {
          id: '2',
          title: 'Wedding Photography',
          description: 'Professional photographer for your special day',
          price: 1500,
          images: ['https://images.unsplash.com/photo-1537633552985-df8429e8048b'],
          location: 'Island-wide',
          category: 'services',
          subcategory: 'event-services',
          views: 150,
          contactInfo: 'photo@email.com',
          isOnSale: false,
          isFeatured: true
        }
      ].filter(listing => !subcategory || listing.subcategory === subcategory));
    }, 1000);
  });
};

export default function Services() {
  const { subcategory } = useParams();
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    condition: '',
    location: ''
  });

  const { data: listings, isLoading } = useQuery({
    queryKey: ['services', subcategory, filters],
    queryFn: () => fetchServiceListings(subcategory)
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
          {subcategory ? `Services - ${subcategory.replace(/-/g, ' ')}` : 'Services'}
        </h1>
        <p className="text-gray-600">
          Browse {subcategory ? subcategory.replace(/-/g, ' ') : ''} services in St. Vincent and the Grenadines
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
