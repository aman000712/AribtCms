import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiCheck, FiX, FiPlus } from "react-icons/fi";

const DEFAULT_ITEM = {
  imageData: null,
  heading: "",
  subheading: "",
};

const PoweredBySection = () => {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem("poweredByItems");
      return saved
        ? JSON.parse(saved)
        : [
            {
              imageData: null,
              heading: "Powered by Abhyam Groups",
              subheading: "Leading innovation in tech and education",
            },
          ];
    } catch {
      localStorage.removeItem("poweredByItems");
      return [];
    }
  });

  const [editIndex, setEditIndex] = useState(null);
  const [editItem, setEditItem] = useState(DEFAULT_ITEM);
  const [newItem, setNewItem] = useState(DEFAULT_ITEM);

  useEffect(() => {
    localStorage.setItem("poweredByItems", JSON.stringify(items));
  }, [items]);

  const handleSave = (index) => {
    const updated = [...items];
    updated[index] = editItem;
    setItems(updated);
    setEditIndex(null);
    setEditItem(DEFAULT_ITEM);
  };

  const handleDelete = (index) => setItems(items.filter((_, i) => i !== index));

  const handleAdd = () => {
    if (!newItem.heading && !newItem.subheading && !newItem.imageData) return;
    setItems([...items, newItem]);
    setNewItem(DEFAULT_ITEM);
  };

  const fileToBase64 = (file, field, target = "edit") => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (target === "edit") setEditItem({ ...editItem, [field]: reader.result });
      else setNewItem({ ...newItem, [field]: reader.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="py-10 px-6 bg-green-100 rounded-3xl">
      <h2 className="text-2xl font-bold text-green-900 mb-6">Powered by Abhyam Groups</h2>

      <div className="flex flex-col gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="relative bg-white p-5 rounded-3xl shadow hover:shadow-lg flex flex-col items-center w-full"
          >
            {editIndex === index ? (
              <>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => fileToBase64(e.target.files[0], "imageData")}
                  className="mb-2 w-full"
                />
                {editItem.imageData && (
                  <div className="w-full h-48 mb-2 border-2 border-green-300 rounded-xl overflow-hidden">
                    <img
                      src={editItem.imageData}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <input
                  type="text"
                  value={editItem.heading}
                  placeholder="Heading"
                  onChange={(e) =>
                    setEditItem({ ...editItem, heading: e.target.value })
                  }
                  className="px-3 py-2 border border-green-300 rounded-lg mb-2 w-full"
                />
                <input
                  type="text"
                  value={editItem.subheading}
                  placeholder="Subheading"
                  onChange={(e) =>
                    setEditItem({ ...editItem, subheading: e.target.value })
                  }
                  className="px-3 py-2 border border-green-300 rounded-lg mb-2 w-full"
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleSave(index)}
                    className="px-3 py-1 bg-green-700 text-white rounded-lg flex items-center gap-1 hover:bg-green-800"
                  >
                    <FiCheck />
                  </button>
                  <button
                    onClick={() => setEditIndex(null)}
                    className="px-3 py-1 bg-gray-200 text-gray-800 rounded-lg flex items-center gap-1 hover:bg-gray-300"
                  >
                    <FiX />
                  </button>
                </div>
              </>
            ) : (
              <>
                {item.imageData && (
                  <div className="w-full h-48 mb-3 border-2 border-green-300 rounded-xl overflow-hidden">
                    <img
                      src={item.imageData}
                      alt={item.heading}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h3 className="text-lg font-bold text-green-900 text-center w-full">
                  {item.heading}
                </h3>
                <p className="text-gray-700 mt-1 text-center w-full">{item.subheading}</p>
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={() => {
                      setEditIndex(index);
                      setEditItem(item);
                    }}
                    className="text-green-700 hover:text-green-800 p-2"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Add New Item */}
      <div className="mt-6 flex flex-col md:flex-row gap-3">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => fileToBase64(e.target.files[0], "imageData", "new")}
          className="mb-2 md:mb-0"
        />
        {newItem.imageData && (
          <div className="w-24 h-24 border-2 border-green-300 rounded-xl overflow-hidden">
            <img
              src={newItem.imageData}
              alt="preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <input
          type="text"
          placeholder="Heading"
          value={newItem.heading}
          onChange={(e) => setNewItem({ ...newItem, heading: e.target.value })}
          className="px-3 py-2 border border-green-300 rounded-lg flex-1"
        />
        <input
          type="text"
          placeholder="Subheading"
          value={newItem.subheading}
          onChange={(e) =>
            setNewItem({ ...newItem, subheading: e.target.value })
          }
          className="px-3 py-2 border border-green-300 rounded-lg flex-1"
        />
        <button
          onClick={handleAdd}
          className="px-5 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 flex items-center gap-2"
        >
          <FiPlus /> Add
        </button>
      </div>
    </div>
  );
};

export default PoweredBySection;
