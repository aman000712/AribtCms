import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import ServicesSearch from "../pageComponents/Services/ServicesSearch";
import ServicesPagination from "../pageComponents/Services/ServicesPagination";
import { DropdownMenu, ServicesTable } from "../pageComponents/Services/ServiceTable";

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
  const paginatedServices = filteredServices.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  const saveServices = (updatedServices) => {
    setServices(updatedServices);
    localStorage.setItem("services", JSON.stringify(updatedServices));
  };

  const handleAddService = () => {
    navigate("/addservice");
  };

  const handleEditService = (service) => {
    navigate("/addservice", { state: { service } });
  };

  const handleDeleteService = (id) => {
    const updated = services.filter((service) => service.id !== id);
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
    const handleClick = () => {
      if (actionOpen) setActionOpen(null);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [actionOpen]);

  return (
    <div className="p-6 max-w-7xl mx-auto py-14">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Services Management</h1>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAddService}
            className="bg-green-800 hover:bg-green-800 text-white px-5 py-2 rounded-lg shadow transition"
          >
            Add Service
          </button>
        </div>
      </div>

      <ServicesSearch search={search} onSearchChange={setSearch} />

      <ServicesTable
        services={paginatedServices}
        onEdit={handleEditService}
        onDelete={handleDeleteService}
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
