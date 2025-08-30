import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:bg-green-50 transition cursor-pointer w-full max-w-sm">
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-48 object-cover rounded-t-xl"
        />
      )}

      <div className="p-4 flex flex-col">
        <h3 className="text-base font-semibold text-gray-800 mb-1 truncate">
          {blog.title}
        </h3>
        <p className="text-xs text-gray-500 mb-2">
          By {blog.author} • {blog.date}
        </p>
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {blog.content.replace(/<[^>]+>/g, "").slice(0, 80)}...
        </p>

        <div className="flex gap-2">
          <button
            onClick={() =>
              navigate(`/blogview/${blog.id}`, { state: { blog } })
            }
            className="px-2 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 text-xs transition"
          >
            View
          </button>
          <button
            onClick={() => navigate("/addblog", { state: { blog } })}
            className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 text-xs transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(blog.id)}
            className="px-2 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200 text-xs transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
