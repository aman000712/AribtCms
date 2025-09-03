import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";

const BlogCard = ({ blog, onDelete }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition cursor-pointer w-full max-w-xs hover:shadow-lg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-36 object-cover rounded-t-xl"
        />
      )}

      <div className="p-3 flex flex-col relative">
        <h3 className="text-sm font-semibold text-gray-800 mb-1 truncate">
          {blog.title}
        </h3>
        <p className="text-xs text-gray-500 mb-1">
          By {blog.author} • {blog.date}
        </p>
        <p className="text-gray-600 text-xs line-clamp-2 mb-2">
          {blog.content.replace(/<[^>]+>/g, "").slice(0, 60)}...
        </p>

        {hovered && (
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              onClick={() =>
                navigate(`/blogview/${blog.id}`, { state: { blog } })
              }
              className="p-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition"
              title="View"
            >
              <FiEye size={16} />
            </button>
            <button
              onClick={() => navigate("/addblog", { state: { blog } })}
              className="p-1 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 transition"
              title="Edit"
            >
              <FiEdit size={16} />
            </button>
            <button
              onClick={() => onDelete(blog.id)}
              className="p-1 bg-red-100 text-red-800 rounded hover:bg-red-200 transition"
              title="Delete"
            >
              <FiTrash2 size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
