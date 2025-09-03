import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";

export const BlogDropdownMenu = ({ blog, isOpen, onClose, onEdit, onDelete, triggerRect }) => {
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!isOpen || !blog) return null;

  const getPositionStyle = () => {
    if (!triggerRect) return { top: 0, left: 0 };
    const dropdownHeight = 132;
    let top = triggerRect.bottom + window.scrollY;
    let left = triggerRect.left + window.scrollX;
    if (triggerRect.bottom + dropdownHeight > window.innerHeight) {
      top = triggerRect.top + window.scrollY - dropdownHeight;
    }
    return { top, left };
  };

  return ReactDOM.createPortal(
    <div
      ref={dropdownRef}
      className="fixed w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden"
      style={getPositionStyle()}
    >
      <button
        onClick={() => { onEdit(blog); onClose(); }}
        className="block w-full text-left px-4 py-2 hover:bg-green-50 text-gray-700 text-sm"
      >
        Edit
      </button>
      <button
        onClick={() => { onDelete(blog.id); onClose(); }}
        className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 text-sm"
      >
        Delete
      </button>
      <button
        onClick={() => { navigate(`/blogview/${blog.id}`); onClose(); }}
        className="block w-full text-left px-4 py-2 hover:bg-green-50 text-green-700 text-sm"
      >
        View
      </button>
    </div>,
    document.body
  );
};

export const BlogRow = ({ blog, index, onActionClick }) => (
  <tr className="border-b bg-white hover:bg-green-50 transition relative cursor-pointer rounded-lg">
    <td className="px-4 py-3 font-medium text-gray-700">{index + 1}</td>
    <td className="px-4 py-3">
      <img
        src={blog.image}
        alt={blog.title}
        className="w-12 h-12 rounded-full object-cover shadow-sm"
      />
    </td>
    <td className="px-4 py-3 font-medium text-gray-700">{blog.title}</td>
    <td className="px-4 py-3 text-gray-500">{blog.author}</td>
    <td className="px-4 py-3 max-w-xs overflow-hidden whitespace-nowrap overflow-ellipsis">
      {blog.content.replace(/<[^>]*>?/gm, "").slice(0, 50)}...
    </td>
    <td className="px-4 py-3 text-gray-400">{blog.date}</td>
    <td className="px-4 py-3 relative text-right">
      <button
        onClick={(e) => onActionClick(e, blog.id)}
        className="p-2 rounded-full hover:bg-green-50 transition text-gray-600"
      >
        ⋮
      </button>
    </td>
  </tr>
);

export const BlogTable = ({ blogs, onActionClick }) => (
  <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm mb-4 bg-white">
    <table className="w-full text-sm text-left text-gray-600">
      <thead className="bg-green-200 text-gray-800 text-sm font-semibold">
        <tr>
          <th className="px-4 py-3">Index</th>
          <th className="px-4 py-3">Image</th>
          <th className="px-4 py-3">Title</th>
          <th className="px-4 py-3">Author</th>
          <th className="px-4 py-3">Content</th>
          <th className="px-4 py-3">Date</th>
          <th className="px-4 py-3 text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {blogs.length > 0 ? (
          blogs.map((b, index) => (
            <BlogRow key={b.id} blog={b} index={index} onActionClick={onActionClick} />
          ))
        ) : (
          <tr>
            <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
              No blogs found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);
