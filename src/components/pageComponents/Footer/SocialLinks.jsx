import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiCheck, FiX, FiPlus } from "react-icons/fi";

const SocialLinks = () => {
  const [links, setLinks] = useState(() => {
    try {
      const saved = localStorage.getItem("footerSocial");
      return saved
        ? JSON.parse(saved)
        : [
            { key: "Facebook", value: "https://facebook.com" },
            { key: "Instagram", value: "https://instagram.com" },
            { key: "LinkedIn", value: "https://linkedin.com" },
          ];
    } catch {
      localStorage.removeItem("footerSocial");
      return [];
    }
  });

  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  useEffect(() => {
    localStorage.setItem("footerSocial", JSON.stringify(links));
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
    <div className=" p-4 rounded-xl shadow-sm max-w-xl mx-auto">
      <h2 className="font-bold text-lg mb-3 text-green-900 text-center">Social Links</h2>

      {links.map((link, index) => (
        <div
          key={index}
          className="flex justify-between items-center bg-white p-2 rounded-lg mb-2 shadow-sm text-sm"
        >
          {editIndex === index ? (
            <>
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="flex-1 px-2 py-1 border border-green-300 rounded text-gray-700 text-xs focus:outline-none focus:ring-1 focus:ring-green-700"
                autoFocus
              />
              <div className="flex gap-1 ml-2">
                <button
                  onClick={() => handleSave(index)}
                  className="p-1 rounded-lg text-green-700 hover:bg-green-100 transition"
                  title="Save"
                >
                  <FiCheck size={16} />
                </button>
                <button
                  onClick={() => setEditIndex(null)}
                  className="p-1 rounded-lg text-gray-600 hover:bg-gray-100 transition"
                  title="Cancel"
                >
                  <FiX size={16} />
                </button>
              </div>
            </>
          ) : (
            <>
              <span className="truncate">{link.key}: {link.value}</span>
              <div className="flex gap-1 ml-2">
                <button
                  onClick={() => { setEditIndex(index); setEditValue(link.value); }}
                  className="text-green-700 hover:text-green-800 p-1 transition"
                  title="Edit"
                >
                  <FiEdit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-600 hover:bg-red-100 p-1 rounded transition"
                  title="Delete"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </>
          )}
        </div>
      ))}

      <div className="flex gap-1 mt-2">
        <input
          type="text"
          placeholder="Social Name"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
          className="flex-1 px-2 py-1 border border-green-300 rounded text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-green-700"
        />
        <input
          type="text"
          placeholder="URL"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          className="flex-1 px-2 py-1 border border-green-300 rounded text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-green-700"
        />
        <button
          onClick={handleAdd}
          className="px-2 py-1 bg-green-700 text-white rounded hover:bg-green-800 transition flex items-center gap-1 text-xs"
        >
          <FiPlus size={16} /> Add
        </button>
      </div>
    </div>
  );
};

export default SocialLinks;
