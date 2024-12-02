import React from 'react';

interface FilterSidebarProps {
  filters: {
    minPrice: string;
    maxPrice: string;
    condition: string;
    location: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    minPrice: string;
    maxPrice: string;
    condition: string;
    location: string;
  }>>;
}

export default function FilterSidebar({ filters, setFilters }: FilterSidebarProps) {
  const conditions = ['New', 'Like New', 'Good', 'Fair', 'Poor'];
  const locations = ['Kingstown', 'Arnos Vale', 'Calliaqua', 'Mesopotamia', 'Georgetown'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full lg:w-64 bg-white p-6 rounded-lg shadow-md h-fit">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-3">Price Range</h3>
        <div className="flex gap-2">
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            placeholder="Min"
            className="w-full px-3 py-2 border rounded-md text-sm"
          />
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            placeholder="Max"
            className="w-full px-3 py-2 border rounded-md text-sm"
          />
        </div>
      </div>

      {/* Condition */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-3">Condition</h3>
        <select
          name="condition"
          value={filters.condition}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md text-sm"
        >
          <option value="">Any</option>
          {conditions.map(condition => (
            <option key={condition} value={condition.toLowerCase()}>
              {condition}
            </option>
          ))}
        </select>
      </div>

      {/* Location */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-3">Location</h3>
        <select
          name="location"
          value={filters.location}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md text-sm"
        >
          <option value="">Any</option>
          {locations.map(location => (
            <option key={location} value={location.toLowerCase()}>
              {location}
            </option>
          ))}
        </select>
      </div>

      {/* Reset Filters */}
      <button
        onClick={() => setFilters({
          minPrice: '',
          maxPrice: '',
          condition: '',
          location: ''
        })}
        className="w-full bg-gray-100 text-gray-600 py-2 rounded-md hover:bg-gray-200 transition-colors duration-200"
      >
        Reset Filters
      </button>
    </div>
  );
}
