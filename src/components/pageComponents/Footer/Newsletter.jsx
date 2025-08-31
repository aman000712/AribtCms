import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiCheck, FiX, FiPlus } from "react-icons/fi";

const Newsletter = () => {
  const [paragraph, setParagraph] = useState(() => {
    try {
      const saved = localStorage.getItem("footerNewsletter");
      return saved ? JSON.parse(saved) : "";
    } catch {
      localStorage.removeItem("footerNewsletter");
      return "";
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(paragraph);
  const [newParagraph, setNewParagraph] = useState("");

  useEffect(() => {
    localStorage.setItem("footerNewsletter", JSON.stringify(paragraph));
  }, [paragraph]);

  const handleSave = () => {
    if (!editValue.trim()) return;
    setParagraph(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(paragraph);
    setIsEditing(false);
  };

  const handleDelete = () => {
    setParagraph("");
    setEditValue("");
    setNewParagraph("");
  };

  const handleAdd = () => {
    if (!newParagraph.trim()) return;
    setParagraph(newParagraph);
    setEditValue(newParagraph);
    setNewParagraph("");
    setIsEditing(false);
  };

  return (
    <div className="bg-green-50 p-6 rounded-2xl shadow-md">
      <h2 className="font-bold text-xl mb-3 text-green-900">Newsletter</h2>

      {paragraph ? (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-xl shadow-sm bg-white transition-all">
          <textarea
            value={isEditing ? editValue : paragraph}
            onChange={(e) => setEditValue(e.target.value)}
            className="flex-1 px-3 py-2 border border-green-300 rounded-lg text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-green-700"
            rows={4}
            readOnly={!isEditing}
            autoFocus={isEditing}
          />

          <div className="flex flex-col gap-2 ml-4 mt-2 md:mt-0">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="p-2 rounded-lg text-green-700 hover:bg-green-100 transition"
                  title="Save"
                >
                  <FiCheck size={18} />
                </button>
                <button
                  onClick={handleCancel}
                  className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
                  title="Cancel"
                >
                  <FiX size={18} />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-green-700 hover:text-green-800 cursor-pointer transition p-2"
                  title="Edit"
                >
                  <FiEdit size={18} />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-2 rounded-lg text-red-600 hover:bg-red-100 transition"
                  title="Delete"
                >
                  <FiTrash2 size={18} />
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="flex gap-2 mt-3">
          <textarea
            placeholder="Enter newsletter content..."
            value={newParagraph}
            onChange={(e) => setNewParagraph(e.target.value)}
            className="flex-1 px-3 py-2 border border-green-300 rounded-lg text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-green-700"
            rows={4}
          />
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition flex items-center gap-1"
          >
            <FiPlus size={18} /> Add
          </button>
        </div>
      )}
    </div>
    
  );
};

export default Newsletter;
