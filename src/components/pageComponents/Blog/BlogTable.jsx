import React from "react";

export const BlogTable = ({ blogs, onEdit, onDelete, onActionClick }) => (
  <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
    <table className="w-full text-sm text-left text-gray-600">
      <thead className="bg-green-100 text-gray-700 text-sm font-semibold">
        <tr>
          <th className="px-4 py-3">Image</th>
          <th className="px-4 py-3">Title</th>
          <th className="px-4 py-3">Author</th>
          <th className="px-4 py-3">Content</th>
          <th className="px-4 py-3">Date</th>
          <th className="px-4 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {blogs.length ? (
          blogs.map((b) => (
            <tr
              key={b.id}
              className="border-b bg-white hover:bg-green-50 transition cursor-pointer rounded-lg shadow-sm mb-1"
            >
              <td className="px-4 py-3">
                <img
                  src={b.image}
                  alt={b.title}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </td>
              <td className="px-4 py-3 font-medium text-gray-700">{b.title}</td>
              <td className="px-4 py-3 text-gray-500">{b.author}</td>
              <td className="px-4 py-3 max-w-xs overflow-hidden text-ellipsis">{b.content}</td>
              <td className="px-4 py-3 text-gray-400">{b.date}</td>
              <td className="px-4 py-3 relative">
                <button
                  onClick={(e) => onActionClick(e, b.id)}
                  className="p-2 rounded-full hover:bg-gray-100 transition"
                >
                  ⋮
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
              No blogs found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);
