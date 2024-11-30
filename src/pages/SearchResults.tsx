import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Listing } from '../types';
import { searchListings } from '../utils/storage';
import ListingCard from '../components/ListingCard';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Listing[]>([]);

  useEffect(() => {
    if (query) {
      const searchResults = searchListings(query);
      setResults(searchResults);
    }
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Search Results for "{query}"
      </h1>
      
      {results.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No listings found for your search.</p>
          <p className="text-gray-500 mt-2">Try adjusting your search terms or browse our categories.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
