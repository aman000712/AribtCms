import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiCheck, FiX } from "react-icons/fi";

const QuickLinks = () => {
  const [links, setLinks] = useState(() => {
    try {
      const saved = localStorage.getItem("footerQuickLinks");
      return saved
        ? JSON.parse(saved)
        : [
            { key: "Home", value: "/" },
            { key: "Our Services", value: "/services" },
            { key: "Portfolio", value: "/portfolio" },
            { key: "Gallery", value: "/gallery" },
            { key: "Blog", value: "/blog" },
            { key: "Contact", value: "/contact" },
          ];
    } catch {
      localStorage.removeItem("footerQuickLinks");
      return [];
    }
  });

  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  useEffect(() => {
    localStorage.setItem("footerQuickLinks", JSON.stringify(links));
  }, [links]);

  const handleSave = (index) => {
    const updated = [...links];
    updated[index].value = editValue;
    setLinks(updated);
    setEditIndex(null);
    setEditValue("");
  };

  const handleDelete = (index) => setLinks(links.filter((_, i) => i !== index));
  const handleAdd = () => {
    if (!newKey.trim() || !newValue.trim()) return;
    setLinks([...links, { key: newKey, value: newValue }]);
    setNewKey("");
    setNewValue("");
  };

  return (
    <div className="bg-green-50 p-6 rounded-2xl shadow-md">
      <h2 className="font-bold text-xl mb-3 text-green-900">Quick Links</h2>

      {links.map((link, index) => (
        <div
          key={index}
          className="flex justify-between items-center bg-white p-3 rounded-lg mb-2 shadow-sm"
        >
          {editIndex === index ? (
            <>
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="flex-1 px-3 py-2 border border-green-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700"
                autoFocus
              />
              <div className="flex flex-col gap-2 ml-3">
                <button
                  onClick={() => handleSave(index)}
                  className="p-2 rounded-lg text-green-700 hover:bg-green-100 transition"
                  title="Save"
                >
                  <FiCheck size={18} />
                </button>
                <button
                  onClick={() => setEditIndex(null)}
                  className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
                  title="Cancel"
                >
                  <FiX size={18} />
                </button>
              </div>
            </>
          ) : (
            <>
              <span>{link.key}: {link.value}</span>
              <div className="flex flex-col gap-2 ml-3">
                <button
                  onClick={() => { setEditIndex(index); setEditValue(link.value); }}
                  className="text-green-700 hover:text-green-800 cursor-pointer transition p-2"
                  title="Edit"
                >
                  <FiEdit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="p-2 rounded-lg text-red-600 hover:bg-red-100 transition"
                  title="Delete"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </>
          )}
        </div>
      ))}

      <div className="flex gap-2 mt-3">
        <input
          type="text"
          placeholder="Link Name"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
          className="flex-1 px-3 py-2 border border-green-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700"
        />
        <input
          type="text"
          placeholder="URL"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          className="flex-1 px-3 py-2 border border-green-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default QuickLinks;
