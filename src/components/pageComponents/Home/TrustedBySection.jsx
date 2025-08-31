import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiCheck, FiX, FiPlus } from "react-icons/fi";

const TrustedBySection = () => {
  const [cards, setCards] = useState(() => {
    try {
      const saved = localStorage.getItem("trustedByCards");
      return saved
        ? JSON.parse(saved)
        : [
            "Akshar Collage Butwal",
            "Gastro Center Butwal",
            "Pranjal Consultancy",
            "Apex School",
            "Lopho Consultancy",
            "Amphlo",
            "Western Mega Collage",
            "Alpha Cafe",
          ];
    } catch {
      localStorage.removeItem("trustedByCards");
      return [];
    }
  });

  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [newCard, setNewCard] = useState("");

  useEffect(() => {
    localStorage.setItem("trustedByCards", JSON.stringify(cards));
  }, [cards]);

  const handleSave = () => {
    if (!editValue.trim()) return;
    const updated = [...cards];
    updated[editIndex] = editValue;
    setCards(updated);
    setEditIndex(null);
    setEditValue("");
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditValue("");
  };

  const handleDelete = (index) => setCards(cards.filter((_, i) => i !== index));
  const handleAdd = () => {
    if (!newCard.trim()) return;
    setCards([...cards, newCard]);
    setNewCard("");
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditValue(cards[index]);
  };

  return (
    <div className="bg-green-100 p-8 rounded-3xl shadow-lg">
      <h2 className="font-bold text-3xl mb-6 text-green-900">Trusted by the World Startups</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {cards.map((card, index) => (
          <div key={index} className="flex justify-between items-center bg-white p-4 rounded-xl shadow hover:shadow-md transition">
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="flex-1 px-3 py-2 border border-green-300 rounded-lg"
                  autoFocus
                />
                <div className="flex flex-col gap-2 ml-2">
                  <button onClick={handleSave} className="p-2 text-green-700 hover:bg-green-100 rounded-lg"><FiCheck /></button>
                  <button onClick={handleCancel} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"><FiX /></button>
                </div>
              </>
            ) : (
              <>
                <span className="text-gray-800 font-medium">{card}</span>
                <div className="flex flex-col gap-2 ml-2">
                  <button onClick={() => startEdit(index)} className="text-green-700 hover:text-green-800 p-2"><FiEdit /></button>
                  <button onClick={() => handleDelete(index)} className="p-2 text-red-600 hover:bg-red-100 rounded-lg"><FiTrash2 /></button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Add new card */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <input
          type="text"
          placeholder="Add new trusted startup"
          value={newCard}
          onChange={(e) => setNewCard(e.target.value)}
          className="flex-1 px-4 py-2 border border-green-300 rounded-lg"
        />
        <button onClick={handleAdd} className="px-5 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 flex items-center gap-2">
          <FiPlus /> Add
        </button>
      </div>
    </div>
  );
};

export default TrustedBySection;
