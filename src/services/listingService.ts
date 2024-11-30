import { Listing } from '../types';

const LISTINGS_STORAGE_KEY = 'classifiedAdsListings';

// Helper function to get listings from localStorage
const getListingsFromStorage = (): Listing[] => {
  const listingsStr = localStorage.getItem(LISTINGS_STORAGE_KEY);
  return listingsStr ? JSON.parse(listingsStr) : [];
};

// Helper function to save listings to localStorage
const saveListings = (listings: Listing[]): void => {
  localStorage.setItem(LISTINGS_STORAGE_KEY, JSON.stringify(listings));
};

// Get all listings
export const getAllListings = (): Listing[] => {
  return getListingsFromStorage();
};

// Get listings
export const getListings = (): Listing[] => {
  return getAllListings();
};

// Get featured listings
export const getFeaturedListings = (): Listing[] => {
  const listings = getListings();
  return listings
    .sort((a, b) => b.views - a.views)
    .slice(0, 6);
};

// Get hot deals listings
export const getHotDeals = (): Listing[] => {
  const listings = getListings();
  return listings
    .filter(listing => listing.isOnSale)
    .sort((a, b) => b.views - a.views)
    .slice(0, 6);
};

// Add a new listing
export const addListing = (listing: Listing): void => {
  const listings = getListings();
  const newListing = {
    ...listing,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    views: 0
  };
  listings.push(newListing);
  saveListings(listings);
};

// Get a listing by ID
export const getListingById = (id: string): Listing | undefined => {
  const listings = getAllListings();
  return listings.find(listing => listing.id === id);
};

// Get category listings
export const getCategoryListings = (category: string): Listing[] => {
  const listings = getAllListings();
  return listings.filter(listing => listing.category === category);
};

// Increment views
export const incrementViews = (id: string): void => {
  const listings = getAllListings();
  const listing = listings.find(l => l.id === id);
  if (listing) {
    listing.views += 1;
    saveListings(listings);
  }
};
