// ContactImages.jsx
import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

const ContactImages = () => {
  const [images, setImages] = useState(() => {
    const saved = localStorage.getItem("contactImages");
    return saved ? JSON.parse(saved) : [];
  });
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("contactImages", JSON.stringify(images));
  }, [images]);

  const handleFileChange = (e, index = null) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (index !== null) {
        const updated = [...images];
        updated[index].url = reader.result;
        setImages(updated);
        setEditingIndex(null);
      } else {
        setImages([...images, { id: Date.now(), url: reader.result }]);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-green-100 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-green-800">Manage Hero Images</h2>

      <div className="flex flex-wrap gap-4 mt-2 w-full justify-center">
        {images.map((img, index) => (
          <div
            key={img.id}
            className="relative w-40 h-24 rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg"
          >
            <img src={img.url} alt="hero" className="w-full h-full object-cover" />
            <div className="absolute top-1 right-1 flex gap-1">
              <label>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, index)}
                />
                <FiEdit className="text-amber-500 cursor-pointer" />
              </label>
              <FiTrash2
                className="text-red-500 cursor-pointer"
                onClick={() => handleDelete(index)}
              />
            </div>
          </div>
        ))}
      </div>

      <label className="flex items-center gap-1 px-4 py-2 bg-green-700 text-white rounded-lg cursor-pointer hover:bg-green-800 mt-2">
        <FiPlus /> Add Image
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileChange(e)}
        />
      </label>
    </div>
  );
};

export default ContactImages;
