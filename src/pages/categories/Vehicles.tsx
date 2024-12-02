import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Listing } from '../../types';
import ListingCard from '../../components/ListingCard';
import FilterSidebar from '../../components/FilterSidebar';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../../theme/ThemeProvider';

const VEHICLE_SUBCATEGORIES = [
  { id: 'for-sale', name: 'For Sale' },
  { id: 'for-rent', name: 'For Rent' }
];

const fetchVehicleListings = async (subcategory?: string): Promise<Listing[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          title: 'Toyota Corolla 2019',
          description: 'Well maintained, single owner',
          price: 45000,
          images: ['https://images.unsplash.com/photo-1590362891991-f776e747a588'],
          location: 'Kingstown',
          category: 'vehicles',
          subcategory: 'for-sale',
          views: 120,
          contactInfo: 'contact@email.com',
          isOnSale: false,
          isFeatured: true
        },
        {
          id: '2',
          title: 'Honda Civic 2020',
          description: 'Low mileage, excellent condition',
          price: 52000,
          images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf'],
          location: 'Arnos Vale',
          category: 'vehicles',
          subcategory: 'for-sale',
          views: 95,
          contactInfo: 'contact@email.com',
          isOnSale: false,
          isFeatured: false
        },
        {
          id: '3',
          title: 'SUV for Rent',
          description: 'Available for daily or weekly rental',
          price: 150,
          images: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70'],
          location: 'Kingstown',
          category: 'vehicles',
          subcategory: 'for-rent',
          views: 80,
          contactInfo: 'rentals@email.com',
          isOnSale: false,
          isFeatured: true
        }
      ].filter(listing => !subcategory || listing.subcategory === subcategory));
    }, 1000);
  });
};

export default function Vehicles() {
  const { styles } = useTheme();
  const { subcategory } = useParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    condition: '',
    location: ''
  });

  const { data: listings, isLoading } = useQuery({
    queryKey: ['vehicles', subcategory, filters],
    queryFn: () => fetchVehicleListings(subcategory)
  });

  const currentSubcategory = VEHICLE_SUBCATEGORIES.find(
    sub => sub.id === subcategory
  );

  return (
    <div className={styles.container}>
      <div className="py-8">
        {/* Back Button and Title Section */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className={`${styles.button.base} ${styles.button.secondary} ${styles.button.sizes.sm} mb-4`}
          >
            <ChevronLeft className={styles.icon.sm} />
            <span>Back</span>
          </button>
          
          <h1 className={styles.heading.h1}>
            {subcategory ? `Vehicles - ${currentSubcategory?.name}` : 'Vehicles'}
          </h1>
          
          <p className={styles.text.body}>
            Browse {subcategory ? currentSubcategory?.name.toLowerCase() : ''} vehicles in St. Vincent and the Grenadines
          </p>

          {/* Subcategory Navigation */}
          {!subcategory && (
            <div className="flex flex-wrap gap-3 mt-6">
              {VEHICLE_SUBCATEGORIES.map(sub => (
                <Link
                  key={sub.id}
                  to={`/category/vehicles/${sub.id}`}
                  className={`${styles.button.base} ${styles.button.outline} ${styles.button.sizes.sm}`}
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {isLoading ? (
          <div className={styles.flex.center}>
            <div className={`${styles.animation.spin} h-12 w-12 border-t-2 border-b-2 border-purple-500 rounded-full`}></div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <FilterSidebar filters={filters} setFilters={setFilters} />
            
            <div className="flex-1">
              <div className={`${styles.grid.base} ${styles.grid.cols[3]}`}>
                {listings?.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
              
              {listings?.length === 0 && (
                <div className={`${styles.flex.center} py-12`}>
                  <div className="text-center">
                    <p className={styles.text.body}>No vehicles found</p>
                    <Link 
                      to="/category/vehicles" 
                      className={`${styles.button.base} ${styles.button.primary} ${styles.button.sizes.sm} mt-4`}
                    >
                      View all vehicles
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
