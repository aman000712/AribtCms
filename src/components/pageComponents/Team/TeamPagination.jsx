import React from "react";

const TeamPagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-end items-center gap-1 mt-5">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 border rounded-lg ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
        }`}
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1 border rounded-lg transition ${
            p === currentPage ? "bg-[#166a63] text-white border-[#166a63]" : "hover:bg-gray-50"
          }`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 border rounded-lg ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default TeamPagination;