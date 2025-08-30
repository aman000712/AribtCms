import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BlogView = () => {
  const { state } = useLocation();
  const blog = state?.blog;
  const navigate = useNavigate();

  if (!blog)
    return (
      <div className="p-6 text-center text-gray-500">Blog not found</div>
    );

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-green-700 hover:text-green-800 font-medium"
        >
          ← Back to Blogs
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full sm:w-40 h-28 sm:h-32 rounded-md object-cover flex-shrink-0"
          />
        )}
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">{blog.title}</h1>
          <p className="text-gray-500 text-sm">
            By {blog.author} on {blog.date}
          </p>
        </div>
      </div>

      <div className="text-gray-700 leading-relaxed space-y-4 break-words">
        {blog.content.split("\n").map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
      </div>
    </div>
  );
};

export default BlogView;
