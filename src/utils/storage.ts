import { Listing } from '../types';

const LISTINGS_KEY = 'vincy_ads_listings';

export const saveListings = (listings: Listing[]): void => {
  localStorage.setItem(LISTINGS_KEY, JSON.stringify(listings));
};

export const getListings = (): Listing[] => {
  const listings = localStorage.getItem(LISTINGS_KEY);
  return listings ? JSON.parse(listings) : [];
};

export const addListing = (listing: Listing): void => {
  const listings = getListings();
  listings.push(listing);
  saveListings(listings);
};

export const getListingById = (id: string): Listing | null => {
  const listings = getListings();
  return listings.find(listing => listing.id === id) || null;
};

export const getListingsByCategory = (category: string): Listing[] => {
  const listings = getListings();
  return listings.filter(listing => listing.category === category);
};

export const getFeaturedListings = (): Listing[] => {
  const listings = getListings();
  return listings.slice(0, 6); // Return first 6 listings as featured
};

export const getHotDeals = (): Listing[] => {
  const listings = getListings();
  return listings
    .filter(listing => listing.isOnSale)
    .slice(0, 6); // Return first 6 hot deals
};

export const incrementViews = (id: string): Listing | null => {
  const listings = getListings();
  const listingIndex = listings.findIndex(listing => listing.id === id);
  
  if (listingIndex === -1) return null;
  
  const updatedListing = {
    ...listings[listingIndex],
    views: (listings[listingIndex].views || 0) + 1
  };
  
  listings[listingIndex] = updatedListing;
  saveListings(listings);
  
  return updatedListing;
};

export const searchListings = (query: string): Listing[] => {
  const listings = getListings();
  const searchTerm = query.toLowerCase();
  
  return listings.filter(listing => {
    return (
      listing.title.toLowerCase().includes(searchTerm) ||
      listing.description.toLowerCase().includes(searchTerm) ||
      listing.location.toLowerCase().includes(searchTerm)
    );
  });
};
