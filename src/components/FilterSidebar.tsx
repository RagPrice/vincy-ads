interface FilterSidebarProps {
  filters: {
    minPrice: string;
    maxPrice: string;
    condition: string;
    location: string;
  };
  onFilterChange: (filters: {
    minPrice: string;
    maxPrice: string;
    condition: string;
    location: string;
  }) => void;
}

export default function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
  const conditions = ['new', 'like-new', 'good', 'fair', 'poor'];
  const locations = ['Kingstown', 'Arnos Vale', 'Calliaqua', 'Bequia', 'Mesopotamia'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFilterChange({
      ...filters,
      [name]: value,
    });
  };

  return (
    <div className="w-64 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price Range
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleInputChange}
              placeholder="Min"
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleInputChange}
              placeholder="Max"
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Condition
          </label>
          <select
            name="condition"
            value={filters.condition}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md text-sm"
          >
            <option value="">Any</option>
            {conditions.map((condition) => (
              <option key={condition} value={condition}>
                {condition.charAt(0).toUpperCase() + condition.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <select
            name="location"
            value={filters.location}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md text-sm"
          >
            <option value="">Any</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
