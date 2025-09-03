import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiCheck, FiX, FiPlus } from "react-icons/fi";

const DEFAULT_LOGO = { imageData: null };

const LogoManager = () => {
  const [logos, setLogos] = useState(() => {
    try {
      const saved = localStorage.getItem("footerLogos");
      return saved ? JSON.parse(saved) : [];
    } catch {
      localStorage.removeItem("footerLogos");
      return [];
    }
  });

  const [editIndex, setEditIndex] = useState(null);
  const [editLogo, setEditLogo] = useState(DEFAULT_LOGO);
  const [newLogo, setNewLogo] = useState(DEFAULT_LOGO);

  useEffect(() => {
    localStorage.setItem("footerLogos", JSON.stringify(logos));
  }, [logos]);

  const fileToBase64 = (file, target = "edit") => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (target === "edit") setEditLogo({ imageData: reader.result });
      else setNewLogo({ imageData: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (index) => {
    if (!editLogo.imageData) return;
    const updated = [...logos];
    updated[index] = editLogo;
    setLogos(updated);
    setEditIndex(null);
    setEditLogo(DEFAULT_LOGO);
  };

  const handleDelete = (index) => {
    setLogos(logos.filter((_, i) => i !== index));
    if (editIndex === index) {
      setEditIndex(null);
      setEditLogo(DEFAULT_LOGO);
    }
  };

  const handleAdd = () => {
    if (!newLogo.imageData) return;
    setLogos([...logos, newLogo]);
    setNewLogo(DEFAULT_LOGO);
  };

  return (
    <div className="py-10 px-6 bg-green-50 rounded-3xl max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-green-900 mb-6 text-center">
        Logo Manager
      </h2>

      <div className="grid grid-cols-3 gap-6">
        {logos.map((logo, index) => (
          <div
            key={index}
            className="relative bg-white rounded-2xl border border-gray-200 h-40 flex flex-col items-center justify-center p-2 shadow-sm hover:shadow-lg transition"
          >
            {editIndex === index ? (
              <div className="absolute inset-0 bg-white p-2 flex flex-col items-center justify-center gap-2 border border-green-200 rounded-2xl">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => fileToBase64(e.target.files[0], "edit")}
                  className="mb-2 text-sm"
                />
                {editLogo.imageData && (
                  <div className="w-full h-28 mb-2 overflow-hidden rounded-xl border border-green-300">
                    <img
                      src={editLogo.imageData}
                      alt="preview"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <div className="flex gap-2 mt-1">
                  <button
                    onClick={() => handleSave(index)}
                    className="px-3 py-1 bg-green-700 text-white rounded-lg hover:bg-green-800 flex items-center gap-1"
                  >
                    <FiCheck />
                  </button>
                  <button
                    onClick={() => { setEditIndex(null); setEditLogo(DEFAULT_LOGO); }}
                    className="px-3 py-1 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 flex items-center gap-1"
                  >
                    <FiX />
                  </button>
                </div>
              </div>
            ) : (
              <>
                {logo.imageData && (
                  <img
                    src={logo.imageData}
                    alt="Logo"
                    className="w-28 h-28 object-contain mb-2"
                  />
                )}
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => { setEditIndex(index); setEditLogo(logo); }}
                    className="px-2 py-1 bg-green-700 text-white rounded-lg hover:bg-green-800 flex items-center gap-1"
                  >
                    <FiEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="px-2 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-1"
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}

        {editIndex === null && (
          <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-gray-200 h-40 p-2 shadow-sm hover:shadow-md transition">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => fileToBase64(e.target.files[0], "new")}
              className="mb-2 text-sm"
            />
            {newLogo.imageData && (
              <div className="w-28 h-28 mb-2 overflow-hidden rounded-xl border border-green-300">
                <img
                  src={newLogo.imageData}
                  alt="preview"
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 flex items-center gap-1"
            >
              <FiPlus /> Add
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogoManager;
