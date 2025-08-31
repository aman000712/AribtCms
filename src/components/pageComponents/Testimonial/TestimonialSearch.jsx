import React from "react";

const TestimonialSearch = ({ search, onSearchChange }) => {
  return (
    <div className="mb-5">
      <input
        type="text"
        placeholder="Search testimonials..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="border border-gray-300 rounded-xl px-4 py-2 w-72 focus:ring-2 focus:ring-[#166a63] outline-none"
      />
    </div>
  );
};

export default TestimonialSearch;
