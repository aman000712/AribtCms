import React, { useState, useEffect } from "react";
import AddGallery from "../pageComponents/Gallery/AddGallery";

const Gallery = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("gallery")) || [];
    setGalleryItems(stored);
  }, []);

  const persistGallery = (list) => {
    setGalleryItems(list);
    localStorage.setItem("gallery", JSON.stringify(list));
  };

  const handleSaveGallery = (item) => {
    if (item.id && galleryItems.some((gItem) => gItem.id === item.id)) {
      const updated = galleryItems.map((gItem) =>
        gItem.id === item.id ? item : gItem
      );
      persistGallery(updated);
    } else {
      persistGallery([...galleryItems, { ...item, id: Date.now() }]);
    }
    setShowAddForm(false);
    setEditingItem(null);
  };

  const handleDelete = (id) => {
    persistGallery(galleryItems.filter((item) => item.id !== id));
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowAddForm(true);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Gallery</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-green-800 text-white px-5 py-3 rounded-xl hover:bg-green-700 shadow-sm transition"
        >
          Add New Item
        </button>
      </div>

      {galleryItems.length === 0 ? (
        <p className="text-gray-500 text-center py-16">No gallery items yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="bg-green-100 rounded-xl shadow-sm border border-gray-100 overflow-hidden relative hover:bg-green-50 transition cursor-pointer"
            >
              <img
                src={item.url}
                alt={item.category}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-4 flex justify-between items-center">
                <span className="px-3 py-1 inline-flex text-xs font-semibold rounded-full bg-teal-100 text-teal-800 capitalize">
                  {item.category}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 transition text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-2 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200 transition text-xs"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddForm && (
        <div className="bg-green-800 hover:bg-green-700">
          <AddGallery
            gallery={editingItem}
            onSave={handleSaveGallery}
            onCancel={() => {
              setShowAddForm(false);
              setEditingItem(null);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;
