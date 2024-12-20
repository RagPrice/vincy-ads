import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Listing } from '../types';
import ListingCard from '../components/ListingCard';
import FilterSidebar from '../components/FilterSidebar';
import { useState } from 'react';

interface SearchFilters {
  minPrice: string;
  maxPrice: string;
  condition: string;
  location: string;
}

// Mock function to fetch search results - replace with actual API call
const searchListings = async (
  searchQuery: string,
  searchFilters: SearchFilters
): Promise<Listing[]> => {
  console.log('Searching with query:', searchQuery, 'and filters:', searchFilters);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          title: 'Sample Search Result',
          description: 'This is a sample search result',
          price: 100,
          category: 'electronics',
          images: ['/placeholder.jpg'],
          location: 'Kingstown',
          views: 0,
          contactInfo: 'contact@email.com',
          isOnSale: false,
          isFeatured: false
        },
      ]);
    }, 1000);
  });
};

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<SearchFilters>({
    minPrice: '',
    maxPrice: '',
    condition: '',
    location: ''
  });
  const query = searchParams.get('q') || '';

  const { data: listings, isLoading } = useQuery({
    queryKey: ['searchResults', query, filters],
    queryFn: () => searchListings(query, filters),
    enabled: !!query
  });

  if (!query) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Please enter a search term</p>
      </div>
    );
  }

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
        <h1 className="text-2xl font-bold mb-6">
          Search Results for "{query}"
        </h1>
        {listings?.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No results found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings?.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
