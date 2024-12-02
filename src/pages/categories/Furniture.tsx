import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Listing } from '../../types';
import ListingCard from '../../components/ListingCard';
import FilterSidebar from '../../components/FilterSidebar';
import { useState } from 'react';

const fetchFurnitureListings = async (subcategory?: string): Promise<Listing[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          title: 'Modern Sectional Sofa',
          description: 'L-shaped sofa with chaise, grey fabric',
          price: 2500,
          images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc'],
          location: 'Kingstown',
          category: 'furniture',
          subcategory: 'living-room',
          views: 120,
          contactInfo: 'contact@email.com',
          isOnSale: true,
          isFeatured: true
        },
        {
          id: '2',
          title: 'Office Desk with Chair',
          description: 'Modern workspace setup, perfect for home office',
          price: 800,
          images: ['https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd'],
          location: 'Arnos Vale',
          category: 'furniture',
          subcategory: 'office-furniture',
          views: 95,
          contactInfo: 'contact@email.com',
          isOnSale: false,
          isFeatured: true
        }
      ].filter(listing => !subcategory || listing.subcategory === subcategory));
    }, 1000);
  });
};

export default function Furniture() {
  const { subcategory } = useParams();
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    condition: '',
    location: ''
  });

  const { data: listings, isLoading } = useQuery({
    queryKey: ['furniture', subcategory, filters],
    queryFn: () => fetchFurnitureListings(subcategory)
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
          {subcategory ? `Furniture - ${subcategory.replace(/-/g, ' ')}` : 'Furniture'}
        </h1>
        <p className="text-gray-600">
          Browse {subcategory ? subcategory.replace(/-/g, ' ') : ''} furniture in St. Vincent and the Grenadines
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
