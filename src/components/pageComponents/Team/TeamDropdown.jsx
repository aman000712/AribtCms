import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";

const TeamDropdown = ({ teamMember, isOpen, onClose, onEdit, onDelete, triggerRect }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const getPositionStyle = () => {
    if (!triggerRect) return { top: 0, left: 0 };
    const dropdownHeight = 88;
    let top = triggerRect.bottom + window.scrollY;
    let left = triggerRect.right + window.scrollX - 144;

    if (triggerRect.bottom + dropdownHeight > window.innerHeight) {
      top = triggerRect.top + window.scrollY - dropdownHeight;
    }
    return { top, left };
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      ref={dropdownRef}
      className="fixed w-36 bg-white border rounded-lg shadow-md z-50 overflow-hidden"
      style={getPositionStyle()}
    >
      <button
        onClick={() => { onEdit(teamMember); onClose(); }}
        className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700"
      >
        Edit
      </button>
      <button
        onClick={() => { onDelete(teamMember.id); onClose(); }}
        className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600"
      >
        Delete
      </button>
    </div>,
    document.body
  );
};

export default TeamDropdown;
