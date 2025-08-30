import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";

export const DropdownMenu = ({ item, isOpen, onClose, onEdit, onDelete, triggerRect }) => {
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
        className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm"
      >
        Edit
      </button>
      <button
        onClick={() => { onDelete(item.id); onClose(); }}
        className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600 text-sm"
      >
        Delete
      </button>
      <button
        onClick={() => { navigate(`/portfolioview/${item.id}`); onClose(); }}
        className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-green-800 text-sm"
      >
        View
      </button>
    </div>,
    document.body
  );
};

export const PortfolioRow = ({ item, onActionClick }) => (
  <tr className="border-b hover:bg-green-50/70 transition relative">
    <td className="px-4 py-3">
      <img src={item.image} alt={item.title} className="w-10 h-10 rounded-full object-cover shadow-sm" />
    </td>
    <td className="px-4 py-3 font-medium text-gray-800">{item.title}</td>
    <td className="px-4 py-3">{item.year}</td>
    <td className="px-4 py-3 truncate max-w-[300px] text-gray-600">{item.description}</td>
    <td className="px-4 py-3 relative text-right">
      <button
        onClick={(e) => onActionClick(e, item.id)}
        className="p-2 rounded-full hover:bg-gray-100 transition text-gray-600"
      >
        ⋮
      </button>
    </td>
  </tr>
);

export const PortfolioTable = ({ portfolio, onActionClick }) => (
  <div className="border-b bg-white rounded-lg shadow-sm mb-4 overflow-x-auto hover:bg-green-50 transition">
    <table className="w-full text-sm text-left text-gray-600">
      <thead className="bg-green-100 text-gray-700 font-semibold text-sm">
        <tr>
          <th className="px-4 py-3">Image</th>
          <th className="px-4 py-3">Title</th>
          <th className="px-4 py-3">Year</th>
          <th className="px-4 py-3">Description</th>
          <th className="px-4 py-3 text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {portfolio.length > 0 ? (
          portfolio.map((p) => <PortfolioRow key={p.id} item={p} onActionClick={onActionClick} />)
        ) : (
          <tr>
            <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
              No portfolios found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export const PortfolioHeader = ({ onAddPortfolio }) => (
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold text-gray-800">Portfolio Management</h2>
    <button
      onClick={onAddPortfolio}
      className="bg-[#166a63] text-white px-5 py-2 rounded-xl hover:bg-[#11534e] shadow-sm transition"
    >
      Add Portfolio
    </button>
  </div>
);
