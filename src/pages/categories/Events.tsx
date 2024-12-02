import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Listing } from '../../types';
import ListingCard from '../../components/ListingCard';
import FilterSidebar from '../../components/FilterSidebar';
import { useState } from 'react';

const fetchEventListings = async (subcategory?: string): Promise<Listing[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          title: 'Vincy Carnival 2024',
          description: 'Annual cultural festival with music and mas',
          price: 100,
          images: ['https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3'],
          location: 'Kingstown',
          category: 'events',
          subcategory: 'festivals',
          views: 500,
          contactInfo: 'events@email.com',
          isOnSale: false,
          isFeatured: true
        },
        {
          id: '2',
          title: 'Nine Mornings Festival',
          description: 'Traditional Christmas festival',
          price: 0,
          images: ['https://images.unsplash.com/photo-1513151233558-d860c5398176'],
          location: 'Island-wide',
          category: 'events',
          subcategory: 'cultural',
          views: 350,
          contactInfo: 'tourism@email.com',
          isOnSale: false,
          isFeatured: true
        }
      ].filter(listing => !subcategory || listing.subcategory === subcategory));
    }, 1000);
  });
};

export default function Events() {
  const { subcategory } = useParams();
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    condition: '',
    location: ''
  });

  const { data: listings, isLoading } = useQuery({
    queryKey: ['events', subcategory, filters],
    queryFn: () => fetchEventListings(subcategory)
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
          {subcategory ? `Events - ${subcategory.replace(/-/g, ' ')}` : 'Events'}
        </h1>
        <p className="text-gray-600">
          Browse {subcategory ? subcategory.replace(/-/g, ' ') : ''} events in St. Vincent and the Grenadines
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
