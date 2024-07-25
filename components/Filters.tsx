import React, { useState } from 'react';

interface FiltersProps {
  categories: string[];
  onSearch: (searchTerm: string) => void;
  onFilter: (filterType: string, value: string | number) => void;
}

const Filters: React.FC<FiltersProps> = ({ categories, onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    onFilter(name, value);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setSelectedCategory(category);
    onFilter('category', category);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4 bg-[#9CDBA6] rounded-lg shadow-lg dark:bg-gray-800">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search products..."
        className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#50B498] placeholder-gray-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:placeholder-gray-400"
      />
      <select
        name="category"
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#50B498] dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <select
        name="price"
        onChange={handleFilterChange}
        className="p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#50B498] dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
      >
        <option value="" hidden>
          Sort by price
        </option>
        <option value="asc">Low to High</option>
        <option value="desc">High to Low</option>
      </select>
      <select
        name="rating"
        onChange={handleFilterChange}
        className="p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#50B498] dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
      >
        <option value="" hidden>
          Sort by rating
        </option>
        <option value="asc">Low to High</option>
        <option value="desc">High to Low</option>
      </select>
      <select
        name="availability"
        onChange={handleFilterChange}
        className="p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#50B498] dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
      >
        <option value="" hidden>
          Sort by availability
        </option>
        <option value="inStock">In Stock</option>
        <option value="outOfStock">Out of Stock</option>
      </select>
    </div>
  );
};

export default Filters;
