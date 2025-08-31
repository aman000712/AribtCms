import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";

// Dropdown menu for actions
export const DropdownMenu = ({ service, isOpen, onClose, onEdit, onDelete, triggerRect }) => {
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

  if (!isOpen || !service) return null;

  const getPositionStyle = () => {
    if (!triggerRect) return { top: 0, left: 0 };
    const dropdownHeight = 132;
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
        onClick={() => { onEdit(service); onClose(); }}
        className="block w-full text-left px-4 py-2 hover:bg-green-50 text-gray-700 text-sm"
      >
        Edit
      </button>
      <button
        onClick={() => { onDelete(service.id); onClose(); }}
        className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 text-sm"
      >
        Delete
      </button>
      <button
        onClick={() => { navigate(`/serviceview/${service.id}`); onClose(); }}
        className="block w-full text-left px-4 py-2 hover:bg-green-50 text-green-700 text-sm"
      >
        View
      </button>
    </div>,
    document.body
  );
};

// Single service row
export const ServiceRow = ({ service, index, onActionClick }) => (
  <tr className="border-b hover:bg-green-50 transition relative cursor-pointer rounded-lg bg-white">
    <td className="px-4 py-3 font-medium text-gray-700">{index + 1}</td>
    <td className="px-4 py-3">
      <img
        src={service.image}
        alt={service.title}
        className="w-10 h-10 rounded-full object-cover shadow-sm"
      />
    </td>
    <td className="px-4 py-3 font-medium text-gray-800">{service.title}</td>
    <td className="px-4 py-3 truncate max-w-[300px] text-gray-600">{service.description}</td>
    <td className="px-4 py-3 relative text-right">
      <button
        onClick={(e) => onActionClick(e, service.id)}
        className="p-2 rounded-full hover:bg-green-50 transition text-gray-600"
      >
        ⋮
      </button>
    </td>
  </tr>
);

// Full services table
export const ServicesTable = ({ services, onActionClick }) => (
  <div className="border rounded-lg shadow-sm overflow-x-auto mb-4 bg-white">
    <table className="w-full text-sm text-left">
      <thead className="bg-green-200 text-gray-800 font-semibold text-sm">
        <tr>
          <th className="px-4 py-3">Index</th>
          <th className="px-4 py-3">Image</th>
          <th className="px-4 py-3">Title</th>
          <th className="px-4 py-3">Description</th>
          <th className="px-4 py-3 text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {services.length > 0 ? (
          services.map((s, index) => (
            <ServiceRow key={s.id} index={index} service={s} onActionClick={onActionClick} />
          ))
        ) : (
          <tr>
            <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
              No services found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

// Card view for service
export const ServiceCard = ({ service, onActionClick }) => (
  <div className="border bg-white hover:bg-green-50 transition cursor-pointer rounded-lg shadow-sm p-4 flex items-start gap-4 mb-2">
    <img
      src={service.image}
      alt={service.title}
      className="w-16 h-16 rounded-lg object-cover border border-green-200 shadow"
    />
    <div className="flex-1 min-w-0">
      <h3 className="font-medium text-gray-800 text-base truncate">{service.title}</h3>
      <p className="text-gray-600 text-sm line-clamp-2">{service.description}</p>
    </div>
    <button
      onClick={(e) => onActionClick(e, service.id)}
      className="p-2 rounded-full hover:bg-green-50 transition text-gray-600"
    >
      ⋮
    </button>
  </div>
);

// Grid view
export const ServicesGrid = ({ services, onActionClick }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {services.length > 0 ? (
      services.map((s) => (
        <ServiceCard key={s.id} service={s} onActionClick={onActionClick} />
      ))
    ) : (
      <div className="col-span-full text-center py-10 text-gray-400">
        No services found
      </div>
    )}
  </div>
);

// Header for services management
export const ServicesHeader = ({ onAddService, viewMode, onViewModeChange }) => (
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold text-gray-800">Services Management</h2>

    <div className="flex items-center gap-3">
      <div className="bg-gray-100 rounded-xl p-1 flex">
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium transition 
            ${viewMode === "table" ? "bg-white shadow text-blue-600" : "text-gray-600 hover:text-blue-600"}`}
          onClick={() => onViewModeChange("table")}
        >
          Table View
        </button>
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium transition 
            ${viewMode === "grid" ? "bg-white shadow text-blue-600" : "text-gray-600 hover:text-blue-600"}`}
          onClick={() => onViewModeChange("grid")}
        >
          Card View
        </button>
      </div>

      <button
        onClick={onAddService}
        className="bg-[#166a63] text-white px-5 py-2 rounded-xl hover:bg-[#11534e] shadow-sm transition"
      >
        Add Service
      </button>
    </div>
  </div>
);
