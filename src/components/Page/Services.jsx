import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ServicesSearch from "../pageComponents/Services/ServicesSearch";
import ServicesPagination from "../pageComponents/Services/ServicesPagination";
import ReactDOM from "react-dom";

const DropdownMenu = ({ service, isOpen, onClose, onEdit, onDelete, triggerRect }) => {
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

const ServiceRow = ({ service, index, onActionClick }) => (
  <tr className="border-b bg-white hover:bg-green-50 transition relative cursor-pointer rounded-lg">
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
        className="p-2 rounded-full hover:bg-green-100 transition text-gray-600"
      >
        ⋮
      </button>
    </td>
  </tr>
);

const ServicesTable = ({ services, onActionClick }) => (
  <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm mb-4 bg-white">
    <table className="w-full text-sm text-left text-gray-600">
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
            <ServiceRow key={s.id} service={s} index={index} onActionClick={onActionClick} />
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

const Services = () => {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [actionOpen, setActionOpen] = useState(null);
  const [triggerRect, setTriggerRect] = useState(null);

  const navigate = useNavigate();
  const PAGE_SIZE = 5;

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("services"));
    if (stored && Array.isArray(stored)) {
      setServices(stored);
    } else {
      const defaults = [
        {
          id: 1,
          title: "Custom Web Design & Development",
          description: "Bespoke website creation tailored to your business.",
          category: "Web Development",
          image: "https://via.placeholder.com/80x80.png?text=Web",
        },
        {
          id: 2,
          title: "Advanced SEO & Digital Marketing",
          description: "Comprehensive strategies to improve your online presence.",
          category: "Marketing",
          image: "https://via.placeholder.com/80x80.png?text=SEO",
        },
      ];
      setServices(defaults);
      localStorage.setItem("services", JSON.stringify(defaults));
    }
  }, []);

  const filteredServices = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return services;
    return services.filter(
      (service) =>
        service.title.toLowerCase().includes(q) ||
        service.category.toLowerCase().includes(q) ||
        service.description.toLowerCase().includes(q)
    );
  }, [services, search]);

  const totalPages = Math.ceil(filteredServices.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedServices = filteredServices.slice(startIndex, startIndex + PAGE_SIZE);

  const saveServices = (updatedServices) => {
    setServices(updatedServices);
    localStorage.setItem("services", JSON.stringify(updatedServices));
  };

  const handleAddService = () => navigate("/addservice");
  const handleEditService = (service) => navigate("/addservice", { state: { service } });
  const handleDeleteService = (id) => {
    const updated = services.filter((s) => s.id !== id);
    saveServices(updated);
    setActionOpen(null);
  };

  const handleActionClick = (e, id) => {
    e.stopPropagation();
    const rect = e.target.getBoundingClientRect();
    setTriggerRect(rect);
    setActionOpen(actionOpen === id ? null : id);
  };

  useEffect(() => {
    const handleClick = () => actionOpen && setActionOpen(null);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [actionOpen]);

  return (
    <div className="p-6 max-w-7xl mx-auto py-14">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Services Management</h1>
        <button
          onClick={handleAddService}
          className="bg-green-800 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow transition"
        >
          Add Service
        </button>
      </div>

      <ServicesSearch search={search} onSearchChange={setSearch} />

      <ServicesTable
        services={paginatedServices}
        onActionClick={handleActionClick}
      />

      <ServicesPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {actionOpen && (
        <DropdownMenu
          service={services.find((s) => s.id === actionOpen)}
          isOpen={true}
          onClose={() => setActionOpen(null)}
          onEdit={handleEditService}
          onDelete={handleDeleteService}
          triggerRect={triggerRect}
        />
      )}
    </div>
  );
};

export default Services;
