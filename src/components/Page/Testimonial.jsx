import React, { useState, useEffect } from "react";
import TestimonialTable from "../pageComponents/Testimonial/TestimonialTable";
import AddTestimonial from "../pageComponents/Testimonial/AddTestimonial";
import TestimonialPagination from "../pageComponents/Testimonial/TestimonialPagination";
import TestimonialDropdown from "../pageComponents/Testimonial/TestimonialDropdown";
import TestimonialView from "../pageComponents/Testimonial/TestimonialView";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const [actionOpen, setActionOpen] = useState(null);
  const [triggerRect, setTriggerRect] = useState(null);

  const [viewItem, setViewItem] = useState(null);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const testimonialsPerPage = 5;

  // Load testimonials from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("testimonials");
    if (stored) setTestimonials(JSON.parse(stored));
  }, []);

  const saveToStorage = (data) =>
    localStorage.setItem("testimonials", JSON.stringify(data));

  const handleSave = (testimonial) => {
    let updated;
    if (editItem) {
      updated = testimonials.map((t) =>
        t.id === editItem.id ? { ...testimonial, id: editItem.id } : t
      );
    } else {
      updated = [...testimonials, { ...testimonial, id: Date.now() }];
    }
    setTestimonials(updated);
    saveToStorage(updated);
    setShowForm(false);
    setEditItem(null);
  };

  const handleDelete = (id) => {
    const updated = testimonials.filter((t) => t.id !== id);
    setTestimonials(updated);
    saveToStorage(updated);
    setActionOpen(null);
  };

  const handleEdit = (testimonial) => {
    setEditItem(testimonial);
    setShowForm(true);
    setActionOpen(null);
  };

  const handleView = (testimonial) => {
    setViewItem(testimonial);
    setActionOpen(null);
  };

  const handleActionClick = (e, id) => {
    e.stopPropagation();
    const rect = e.target.getBoundingClientRect();
    setTriggerRect(rect);
    setActionOpen(actionOpen === id ? null : id);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      if (actionOpen) setActionOpen(null);
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [actionOpen]);

  // Filtered & paginated testimonials
  const filteredTestimonials = testimonials.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.designation.toLowerCase().includes(search.toLowerCase()) ||
      t.message.toLowerCase().includes(search.toLowerCase())
  );
  const indexOfLast = currentPage * testimonialsPerPage;
  const indexOfFirst = indexOfLast - testimonialsPerPage;
  const currentTestimonials = filteredTestimonials.slice(
    indexOfFirst,
    indexOfLast
  );
  const totalPages =
    Math.ceil(filteredTestimonials.length / testimonialsPerPage) || 1;

  // --- Render ---
  if (showForm) {
    // ONLY show Add/Edit form
    return (
      <AddTestimonial
        testimonial={editItem}
        onSave={handleSave}
        onCancel={() => {
          setShowForm(false);
          setEditItem(null);
        }}
      />
    );
  }

  // Default: table view
  return (
    <div className="py-16">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Testimonials</h1>
        <button
          onClick={() => {
            setEditItem(null);
            setShowForm(true);
          }}
          className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700"
        >
           Add Testimonial
        </button>
      </div>

      {/* Search */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search testimonials..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-2 w-72 focus:ring-2 focus:ring-[#166a63] outline-none"
        />
      </div>

      {/* Table */}
      <TestimonialTable
        testimonials={currentTestimonials}
        onActionClick={handleActionClick}
      />

      {/* Pagination */}
      <TestimonialPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {/* Dropdown */}
      {actionOpen && (
        <TestimonialDropdown
          testimonial={testimonials.find((t) => t.id === actionOpen)}
          isOpen={true}
          onClose={() => setActionOpen(null)}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
          triggerRect={triggerRect}
        />
      )}

      {/* View modal */}
      {viewItem && (
        <TestimonialView
          testimonial={viewItem}
          onClose={() => setViewItem(null)}
        />
      )}
    </div>
  );
};

export default Testimonials;
