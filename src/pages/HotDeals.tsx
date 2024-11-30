import { Link } from 'react-router-dom';
import { incrementViews } from '../utils/storage';

const hotDeals = [
  {
    id: '1',
    title: 'iPhone 14 Pro Max',
    description: '256GB, Mint condition, with warranty',
    price: 2499,
    images: ['https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?auto=format&fit=crop&w=800&q=80'],
    location: 'Kingstown',
    views: 312
  },
  {
    id: '2',
    title: 'MacBook Pro M2',
    description: '16GB RAM, 512GB SSD, Space Gray',
    price: 3299,
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'],
    location: 'Calliaqua',
    views: 278
  },
  {
    id: '3',
    title: 'PS5 Bundle',
    description: 'With 2 controllers and 3 games',
    price: 899,
    images: ['https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80'],
    location: 'Arnos Vale',
    views: 245
  },
  {
    id: '4',
    title: '4K Smart TV - 65"',
    description: 'Samsung QLED, HDR, WiFi enabled',
    price: 1899,
    images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80'],
    location: 'Kingstown',
    views: 198
  },
  {
    id: '5',
    title: 'DJI Mavic 3 Pro',
    description: 'With extra batteries and ND filters',
    price: 1599,
    images: ['https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=80'],
    location: 'Mesopotamia',
    views: 167
  },
  {
    id: '6',
    title: 'Canon EOS R6',
    description: 'With 24-70mm f/2.8 lens',
    price: 2799,
    images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'],
    location: 'Bequia',
    views: 223
  },
  {
    id: '7',
    title: 'Gaming PC Setup',
    description: 'RTX 4070, 32GB RAM, 2TB SSD',
    price: 2499,
    images: ['https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=800&q=80'],
    location: 'Kingstown',
    views: 289
  },
  {
    id: '8',
    title: 'iPad Pro 12.9"',
    description: 'M2 chip, 256GB, with Apple Pencil',
    price: 1299,
    images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80'],
    location: 'Villa',
    views: 178
  }
];

const HotDeals = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Banner Ad Placement */}
      <div className="w-full bg-orange-600 border-2 border-dashed border-orange-500 rounded-lg p-12 mb-8 text-center">
        <h2 className="text-2xl text-white font-semibold">Advertise Here</h2>
      </div>
      <h1 className="text-3xl font-bold mb-8 text-orange-600">Hot Deals</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {hotDeals.map((deal) => (
          <Link
            key={deal.id}
            to={`/listing/${deal.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            onClick={() => incrementViews(deal.id)}
          >
            <div className="relative h-40">
              <img
                src={deal.images[0]}
                alt={deal.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-orange-600">{deal.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{deal.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-orange-600 font-bold">${deal.price.toLocaleString()}</span>
                <span className="text-gray-500 text-sm">{deal.views} views</span>
              </div>
              <div className="mt-2">
                <span className="text-gray-500 text-sm">{deal.location}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HotDeals;
