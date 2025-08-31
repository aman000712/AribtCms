import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";

const TestimonialDropdown = ({ testimonial, isOpen, onClose, onEdit, onDelete, triggerRect }) => {
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!isOpen || !testimonial) return null;

  const getPositionStyle = () => {
    if (!triggerRect) return { top: 0, left: 0 };
    const dropdownHeight = 132; // 3 options
    let top = triggerRect.bottom + window.scrollY;
    let left = triggerRect.right + window.scrollX - 144;
    if (triggerRect.bottom + dropdownHeight > window.innerHeight) {
      top = triggerRect.top + window.scrollY - dropdownHeight;
    }
    return { top, left };
  };

  return ReactDOM.createPortal(
    <div
      ref={dropdownRef}
      className="fixed w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden"
      style={getPositionStyle()}
    >
      
      <button
        onClick={() => { onEdit(testimonial); onClose(); }}
        className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm"
      >
        Edit
      </button>
      <button
        onClick={() => { onDelete(testimonial.id); onClose(); }}
        className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600 text-sm"
      >
        Delete
      </button>
      <button
        onClick={() => { navigate(`/testimonial/${testimonial.id}`); onClose(); }}
        className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-green-700 text-sm"
      >
        View
      </button>
    </div>,
    document.body
  );
};

export default TestimonialDropdown;
