import React from 'react';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
  price: number;
  description: string;
}

const generateMockEvents = (): Event[] => {
  return Array.from({ length: 12 }, (_, i) => ({
    id: `event-${i + 1}`,
    title: `Event ${i + 1}`,
    date: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    location: 'Kingstown, St. Vincent',
    image: `https://source.unsplash.com/featured/600x600?event,festival,concert`,
    price: Math.floor(Math.random() * 100) + 20,
    description: 'Join us for this amazing event in St. Vincent and the Grenadines.',
  }));
};

const Events: React.FC = () => {
  const events = generateMockEvents();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="text-gray-500 text-sm">
            <ol className="list-none p-0 inline-flex">
              <li className="flex items-center">
                <a href="/" className="hover:text-purple-600">Home</a>
                <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                  <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/>
                </svg>
              </li>
              <li>
                <span className="text-purple-600">Events</span>
              </li>
            </ol>
          </nav>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Events</h1>
          <p className="text-gray-600 mt-2">
            Discover upcoming events in St. Vincent and the Grenadines
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event) => (
            <a
              key={event.id}
              href={`/event/${event.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <div className="relative aspect-square">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-xl font-semibold text-white mb-1">{event.title}</h3>
                  <div className="flex justify-between items-center text-white">
                    <span className="text-sm">{event.date}</span>
                    <span className="text-sm font-semibold">${event.price}</span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white">
                <div className="flex items-center text-gray-600">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm">{event.location}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
