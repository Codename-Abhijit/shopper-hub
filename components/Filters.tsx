import React, { useState } from 'react';
import debounce from 'lodash.debounce';

interface FiltersProps {
  onSearch: (searchTerm: string) => void;
  onFilter: (filterType: string, value: string | number) => void;
}

const Filters: React.FC<FiltersProps> = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = debounce((term: string) => {
    onSearch(term);
  }, 300);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    handleSearch(term);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    onFilter(name, value);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-[#9CDBA6] rounded-lg shadow-lg">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search products..."
        className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#50B498] placeholder-gray-500"
      />
      <select name="price" onChange={handleFilterChange} className="p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#50B498]">
        <option value="" hidden>Sort by price</option>
        <option value="asc">Low to High</option>
        <option value="desc">High to Low</option>
      </select>
      <select name="rating" onChange={handleFilterChange} className="p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#50B498]">
        <option value="" hidden>Sort by rating</option>
        <option value="asc">Low to High</option>
        <option value="desc">High to Low</option>
      </select>
      <select name="availability" onChange={handleFilterChange} className="p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#50B498]">
        <option value="" hidden>Sort by availability</option>
        <option value="inStock">In Stock</option>
        <option value="outOfStock">Out of Stock</option>
      </select>
    </div>
  );
};

export default Filters;
