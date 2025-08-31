import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiCheck, FiX } from "react-icons/fi";

const ContactField = ({ field, index, editingIndex, setEditingIndex, fields, setFields }) => {
  const [editValue, setEditValue] = useState(field.value);

  useEffect(() => {
    if (editingIndex === index) setEditValue(field.value);
  }, [editingIndex, field.value, index]);

  const handleSave = () => {
    if (!editValue.trim()) return;
    const updated = [...fields];
    updated[index].value = editValue;
    setFields(updated);
    setEditingIndex(null);
  };

  const handleDelete = () => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const updated = [...fields];
      updated[index].value = reader.result;
      setFields(updated);
      setEditingIndex(null);
    };
    reader.readAsDataURL(file);
  };

  const isImageField = field.key.toLowerCase().includes("image");

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-white rounded-xl shadow hover:bg-green-100 transition-shadow duration-200 gap-2">
      <div className="flex-1 w-full">
        <p className="font-semibold text-green-800">{field.key}</p>
        {editingIndex === index ? (
          isImageField ? (
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-2"
            />
          ) : (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
              autoFocus
            />
          )
        ) : isImageField && field.value ? (
          <img
            src={field.value}
            alt="field"
            className="w-48 h-28 object-cover rounded-lg mt-2"
          />
        ) : (
          <p className="text-gray-700 mt-1">{field.value}</p>
        )}
      </div>

      <div className="flex gap-3 mt-2 md:mt-0">
        {editingIndex === index && !isImageField ? (
          <>
            <button
              onClick={handleSave}
              className="p-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
              title="Save"
            >
              <FiCheck size={18} />
            </button>
            <button
              onClick={() => setEditingIndex(null)}
              className="p-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
              title="Cancel"
            >
              <FiX size={18} />
            </button>
          </>
        ) : (
          <>
            <FiEdit
              className="text-green-700 cursor-pointer hover:text-green-800 hover:scale-110 transition-transform"
              onClick={() => setEditingIndex(index)}
              title="Edit"
            />
            <FiTrash2
              className="text-red-600 cursor-pointer hover:scale-110 transition-transform"
              onClick={handleDelete}
              title="Delete"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ContactField;
