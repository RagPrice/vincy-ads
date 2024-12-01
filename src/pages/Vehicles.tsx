import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Listing } from '../types';
import { incrementViews } from '../utils/storage';
import BackButton from '../components/BackButton';

// Mock vehicle listings data
const mockVehicles: Listing[] = [
  {
    id: 'v1',
    title: '2020 Toyota Camry',
    description: 'Excellent condition, low mileage, one owner',
    price: 25000,
    images: ['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=800&q=80'],
    location: 'Kingstown',
    category: 'vehicles',
    contactInfo: 'Call 123-456-7890',
    isFeatured: false,
    views: 45
  },
  {
    id: 'v2',
    title: '2019 Honda CR-V',
    description: 'SUV with all the latest features, perfect family car',
    price: 28000,
    images: ['https://images.unsplash.com/photo-1568844293986-8d0400bd4745?auto=format&fit=crop&w=800&q=80'],
    location: 'Bequia',
    category: 'vehicles',
    contactInfo: 'Email: seller@example.com',
    isFeatured: true,
    views: 72
  },
  {
    id: 'v3',
    title: '2018 Ford F-150',
    description: 'Powerful pickup truck, great for work and leisure',
    price: 32000,
    images: ['https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80'],
    location: 'Mustique',
    category: 'vehicles',
    contactInfo: 'WhatsApp: +1234567890',
    isFeatured: false,
    views: 58
  }
];

const mockRentals: Listing[] = [
  {
    id: 'vr1',
    title: 'Toyota Yaris for Rent',
    description: 'Perfect for daily commute or short trips',
    price: 50, // per day
    images: ['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=800&q=80'],
    location: 'Kingstown',
    category: 'vehicles',
    contactInfo: 'Call 123-456-7890',
    isFeatured: false,
    views: 30
  },
  {
    id: 'vr2',
    title: 'Jeep Wrangler Rental',
    description: 'Perfect for island exploration and adventure',
    price: 75, // per day
    images: ['https://images.unsplash.com/photo-1568844293986-8d0400bd4745?auto=format&fit=crop&w=800&q=80'],
    location: 'Bequia',
    category: 'vehicles',
    contactInfo: 'Email: rentals@example.com',
    isFeatured: true,
    views: 45
  }
];

const Vehicles: React.FC = () => {
  const location = useLocation();
  const isRental = location.pathname.includes('/rent');
  const [vehicles, setVehicles] = useState<Listing[]>(isRental ? mockRentals : mockVehicles);

  const handleListingClick = (id: string) => {
    const updatedListing = incrementViews(id);
    if (!updatedListing) return;

    setVehicles(prevVehicles => 
      prevVehicles.map(vehicle => 
        vehicle.id === id ? updatedListing : vehicle
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-4">
        <BackButton />
      </div>

      {/* Top Advertisement Banner */}
      <div className="container mx-auto px-4 py-8">
        <div className="w-full bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-12 mb-8 text-center">
          <h2 className="text-2xl text-gray-600 font-semibold">Advertise Here</h2>
        </div>
      </div>

      {/* Page Title and Description */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Vehicles {isRental ? 'for Rent' : 'for Sale'}
          </h1>
          <p className="text-xl">
            Find your perfect ride in St. Vincent and the Grenadines
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Left Column - Square Ads */}
          <div className="hidden md:flex flex-col gap-8 w-64 flex-shrink-0">
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center aspect-square">
              <h3 className="text-lg text-gray-600 font-semibold">Advertise Here</h3>
            </div>
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center aspect-square">
              <h3 className="text-lg text-gray-600 font-semibold">Advertise Here</h3>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((vehicle) => (
                <Link
                  key={vehicle.id}
                  to={`/listing/${vehicle.id}`}
                  onClick={() => handleListingClick(vehicle.id)}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative h-48">
                    <img
                      src={vehicle.images[0]}
                      alt={vehicle.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2 text-blue-600">
                      {vehicle.title}
                    </h3>
                    <p className="text-gray-600 mb-2">{vehicle.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-600 font-bold">
                        ${vehicle.price.toLocaleString()}{isRental ? '/day' : ''}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {vehicle.views} views
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      {vehicle.location}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vehicles;
