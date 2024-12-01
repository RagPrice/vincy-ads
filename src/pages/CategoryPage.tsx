import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Listing } from '../types/auth';
import ListingCard from '../components/ListingCard';
import FilterSidebar from '../components/FilterSidebar';
import { useState } from 'react';

// Mock function to fetch listings - replace with actual API call
const fetchListings = async (categoryId: string, subcategoryId?: string): Promise<Listing[]> => {
  // This would be replaced with an actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          title: 'Sample Listing',
          description: 'This is a sample listing',
          price: 100,
          category: categoryId,
          subcategory: subcategoryId || '',
          condition: 'new',
          images: ['/placeholder.jpg'],
          location: {
            address: 'Kingstown, St. Vincent',
          },
          userId: '1',
          createdAt: new Date(),
          updatedAt: new Date(),
          status: 'active',
          featured: false,
          views: 0,
          favorites: 0,
        },
      ]);
    }, 1000);
  });
};

export default function CategoryPage() {
  const { categoryId, subcategoryId } = useParams();
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    condition: '',
    location: '',
  });

  const { data: listings, isLoading } = useQuery({
    queryKey: ['listings', categoryId, subcategoryId, filters],
    queryFn: () => fetchListings(categoryId!, subcategoryId),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex gap-6">
      <FilterSidebar filters={filters} onFilterChange={setFilters} />
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-6 capitalize">
          {subcategoryId || categoryId} Listings
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings?.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </div>
  );
}
