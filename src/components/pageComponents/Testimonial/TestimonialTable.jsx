import React from "react";

const TestimonialTable = ({ testimonials, onActionClick }) => (
  <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm mb-4 bg-white">
    <table className="w-full text-sm text-left text-gray-600">
      <thead className="bg-green-200 text-gray-800 font-semibold text-sm">
        <tr>
          <th className="px-4 py-3">Index</th>
          <th className="px-4 py-3">Name</th>
          <th className="px-4 py-3">Designation</th>
          <th className="px-4 py-3">Message</th>
          <th className="px-4 py-3 text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {testimonials.length > 0 ? (
          testimonials.map((t, index) => (
            <tr
              key={t.id}
              className="border-b bg-white hover:bg-green-50 transition relative cursor-pointer rounded-lg"
            >
              <td className="px-4 py-3 font-medium text-gray-700">{index + 1}</td>
              <td className="px-4 py-3 font-medium text-gray-800">{t.name}</td>
              <td className="px-4 py-3 text-gray-600">{t.designation}</td>
              <td className="px-4 py-3 truncate max-w-[300px] text-gray-600">{t.message}</td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={(e) => onActionClick(e, t.id)}
                  className="p-2 rounded-full hover:bg-green-100 transition text-gray-600"
                >
                  ⋮
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
              No testimonials found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default TestimonialTable;
