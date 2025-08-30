import React, { useState, useRef, useEffect } from "react";
import { MoreVertical, Edit, Trash2 } from "lucide-react";

const PortfolioDropdown = ({ onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="p-2 rounded-full hover:bg-gray-100"
        onClick={() => setOpen((prev) => !prev)}
      >
        <MoreVertical size={18} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg z-10">
          <button
            onClick={() => {
              onEdit();
              setOpen(false);
            }}
            className="flex items-center gap-2 px-3 py-2 w-full text-left hover:bg-gray-100"
          >
            <Edit size={16} /> Edit
          </button>
          <button
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
            className="flex items-center gap-2 px-3 py-2 w-full text-left text-red-600 hover:bg-gray-100"
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PortfolioDropdown;
