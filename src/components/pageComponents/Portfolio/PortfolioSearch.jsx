import React from "react";
import { Search } from "lucide-react";

const PortfolioSearch = ({ search, onSearchChange }) => {
  const handleChange = (e) => {
    onSearchChange(e.target.value);
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="relative w-full sm:w-64 mb-5"
      onClick={handleClick} 
    >
      <input
        type="text"
        placeholder="Search portfolio..."
        value={search}
        onChange={handleChange}
        onClick={handleClick} 
        className="w-full border border-gray-300 rounded-xl pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
      />
      <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
    </div>
  );
};

export default PortfolioSearch;