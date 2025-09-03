// Contact.jsx
import React, { useState, useEffect } from "react";
import ContactField from "../pageComponents/Contact/ContactField";
import ContactImages from "../pageComponents/Contact/ContactImage";

const Contact = () => {
  const [fields, setFields] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("contactInfo"));
      return Array.isArray(saved)
        ? saved
        : [
            { key: "Heading", value: "Let's level up your brand, together" },
            { key: "Subheading", value: "You can reach us anytime via info@e-aribt.com" },
            { key: "EmailTitle", value: "Developer working on code" },
            { key: "Email", value: "info@e-aribt.com" },
            { key: "PhoneTitle", value: "Our friendly team is here to help" },
            { key: "Phone", value: "+977 9745432207, +977 9867024416" },
            { key: "Location", value: "Tinkune, Kalikapath, Butwal (Next to Dream International Hotel)" },
          ];
    } catch {
      return [];
    }
  });

  const [editingIndex, setEditingIndex] = useState(null);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  useEffect(() => {
    localStorage.setItem("contactInfo", JSON.stringify(fields));
  }, [fields]);

  const handleAdd = () => {
    if (!newKey.trim() || !newValue.trim()) return;
    setFields([...fields, { key: newKey, value: newValue }]);
    setNewKey("");
    setNewValue("");
  };

  return (
    <div className="bg-white min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-xl space-y-6">
        <h1 className="text-3xl font-bold text-center text-green-800 mb-6">
          Contact Info
        </h1>

        {/* Hero Image Management */}
        <ContactImages />

        {/* Text Fields */}
        <div className="space-y-4 mt-6">
          {fields.map((field, index) => (
            <ContactField
              key={index}
              field={field}
              index={index}
              editingIndex={editingIndex}
              setEditingIndex={setEditingIndex}
              fields={fields}
              setFields={setFields}
            />
          ))}
        </div>

        {/* Add new field */}
        <div className="flex flex-col md:flex-row gap-3 mt-6">
          <input
            type="text"
            placeholder="Field Name"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
          />
          <input
            type="text"
            placeholder="Field Value"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
          />
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
          >
            Add Field
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
