import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PortfolioSearch from "../pageComponents/Portfolio/PortfolioSearch";
import PortfolioPagination from "../pageComponents/Portfolio/PortfolioPagination";
import ReactDOM from "react-dom";

// Dropdown menu for portfolio actions
const DropdownMenu = ({ item, isOpen, onClose, onEdit, onDelete, triggerRect }) => {
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!isOpen || !item) return null;

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
        onClick={() => { onEdit(item); onClose(); }}
        className="block w-full text-left px-4 py-2 hover:bg-green-50 text-gray-700 text-sm"
      >
        Edit
      </button>
      <button
        onClick={() => { onDelete(item.id); onClose(); }}
        className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 text-sm"
      >
        Delete
      </button>
      <button
        onClick={() => { navigate(`/portfolioview/${item.id}`); onClose(); }}
        className="block w-full text-left px-4 py-2 hover:bg-green-50 text-green-700 text-sm"
      >
        View
      </button>
    </div>,
    document.body
  );
};

// Single portfolio row
const PortfolioRow = ({ item, index, onActionClick, onRowClick }) => (
  <tr
    className="border-b bg-white hover:bg-green-50 transition relative cursor-pointer rounded-lg"
    onClick={() => onRowClick(item)}
  >
    <td className="px-4 py-3 font-medium text-gray-700">{index + 1}</td>
    <td className="px-4 py-3">
      <img
        src={item.image}
        alt={item.title}
        className="w-10 h-10 rounded-full object-cover shadow-sm"
      />
    </td>
    <td className="px-4 py-3 font-medium text-gray-800">{item.title}</td>
    <td className="px-4 py-3">{item.year}</td>
    <td className="px-4 py-3 truncate max-w-[300px] text-gray-600">{item.description}</td>
    <td className="px-4 py-3 relative text-right">
      <button
        onClick={(e) => onActionClick(e, item.id)}
        className="p-2 rounded-full hover:bg-green-100 transition text-gray-600"
      >
        ⋮
      </button>
    </td>
  </tr>
);

// Portfolio table
const PortfolioTable = ({ portfolio, onActionClick, onRowClick }) => (
  <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm mb-4 bg-white">
    <table className="w-full text-sm text-left text-gray-600">
      <thead className="bg-green-200 text-gray-800 font-semibold text-sm">
        <tr>
          <th className="px-4 py-3">Index</th>
          <th className="px-4 py-3">Image</th>
          <th className="px-4 py-3">Title</th>
          <th className="px-4 py-3">Year</th>
          <th className="px-4 py-3">Description</th>
          <th className="px-4 py-3 text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {portfolio.length > 0 ? (
          portfolio.map((p, index) => (
            <PortfolioRow
              key={p.id}
              index={index}
              item={p}
              onActionClick={onActionClick}
              onRowClick={onRowClick}
            />
          ))
        ) : (
          <tr>
            <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
              No portfolios found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

// Portfolio header
const PortfolioHeader = ({ onAddPortfolio }) => (
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold text-gray-800">Portfolio Management</h2>
    <button
      onClick={onAddPortfolio}
      className="bg-green-800 text-white px-5 py-2 rounded-xl hover:bg-green-700 shadow-sm transition"
    >
      Add Portfolio
    </button>
  </div>
);

// Main Portfolio page
const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [actionOpen, setActionOpen] = useState(null);
  const [triggerRect, setTriggerRect] = useState(null);

  const navigate = useNavigate();
  const PAGE_SIZE = 5;

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("portfolio"));
    if (stored && Array.isArray(stored)) {
      setPortfolio(stored);
    } else {
      const defaults = [
        {
          id: 1,
          title: "Restaurant Website (Japan)",
          description: "Custom restaurant website with menu and reservation system.",
          category: "Web Design",
          year: 2023,
          image: "https://via.placeholder.com/80x80.png?text=Restaurant",
        },
        {
          id: 2,
          title: "Corporate Landing Page",
          description: "Professional landing page for a corporate business.",
          category: "UI/UX",
          year: 2024,
          image: "https://via.placeholder.com/80x80.png?text=Corporate",
        },
      ];
      setPortfolio(defaults);
      localStorage.setItem("portfolio", JSON.stringify(defaults));
    }
  }, []);

  const filteredPortfolio = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return portfolio;
    return portfolio.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    );
  }, [portfolio, search]);

  const totalPages = Math.max(Math.ceil(filteredPortfolio.length / PAGE_SIZE), 1);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedPortfolio = filteredPortfolio.slice(startIndex, startIndex + PAGE_SIZE);

  const savePortfolio = (updatedPortfolio) => {
    setPortfolio(updatedPortfolio);
    localStorage.setItem("portfolio", JSON.stringify(updatedPortfolio));
  };

  const handleAddPortfolio = () => navigate("/addportfolio");
  const handleEditPortfolio = (item) => navigate("/addportfolio", { state: { item } });
  const handleDeletePortfolio = (id) => {
    const updated = portfolio.filter((p) => p.id !== id);
    savePortfolio(updated);
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

  const handleRowClick = (item) => handleEditPortfolio(item);

  return (
    <div className="p-6 max-w-7xl mx-auto py-14">
      <PortfolioHeader onAddPortfolio={handleAddPortfolio} />
      <PortfolioSearch search={search} onSearchChange={setSearch} />
      <PortfolioTable
        portfolio={paginatedPortfolio}
        onActionClick={handleActionClick}
        onRowClick={handleRowClick}
      />
      <PortfolioPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      {actionOpen && (
        <DropdownMenu
          item={portfolio.find((p) => p.id === actionOpen)}
          isOpen={true}
          onClose={() => setActionOpen(null)}
          onEdit={handleEditPortfolio}
          onDelete={handleDeletePortfolio}
          triggerRect={triggerRect}
        />
      )}
    </div>
  );
};

export default Portfolio;
