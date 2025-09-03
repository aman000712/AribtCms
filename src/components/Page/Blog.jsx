import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FiGrid, FiList } from "react-icons/fi";

import ServicesSearch from "../pageComponents/Services/ServicesSearch";
import ServicesPagination from "../pageComponents/Services/ServicesPagination";
import { BlogTable } from "../pageComponents/Blog/BlogTable";
import BlogCard from "../pageComponents/Blog/BlogCard";
import BlogDropdown from "../pageComponents/Blog/BlogDropdown";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("table");
  const [actionOpen, setActionOpen] = useState(null);
  const [triggerRect, setTriggerRect] = useState(null);

  const navigate = useNavigate();
  const PAGE_SIZE = 6;

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("blogs"));
    if (stored && Array.isArray(stored)) setBlogs(stored);
    else {
      const defaults = [
        { id: 1, title: "First Blog Post", author: "Dikshya", content: "This is a sample content for the first blog.", image: "https://via.placeholder.com/150", date: "2025-08-29" },
        { id: 2, title: "Second Blog Post", author: "Rekha", content: "Another example content for the blog system.", image: "https://via.placeholder.com/150", date: "2025-08-28" },
      ];
      setBlogs(defaults);
      localStorage.setItem("blogs", JSON.stringify(defaults));
    }
  }, []);

  const filteredBlogs = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return blogs;
    return blogs.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.content.toLowerCase().includes(q)
    );
  }, [blogs, search]);

  const totalPages = Math.ceil(filteredBlogs.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedBlogs = filteredBlogs.slice(startIndex, startIndex + PAGE_SIZE);

  const saveBlogs = (updated) => {
    setBlogs(updated);
    localStorage.setItem("blogs", JSON.stringify(updated));
  };

  const handleAddBlog = () => navigate("/addblog");
  const handleEditBlog = (blog) => navigate("/addblog", { state: { blog } });
  const handleDeleteBlog = (id) => {
    const updated = blogs.filter((b) => b.id !== id);
    saveBlogs(updated);
    setActionOpen(null);
  };
  const handleUpdateBlog = (updatedBlog) => {
    const updated = blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b));
    saveBlogs(updated);
  };

  const handleActionClick = (e, id) => {
    e.stopPropagation();
    const rect = e.target.getBoundingClientRect();
    setTriggerRect(rect);
    setActionOpen(actionOpen === id ? null : id);
  };

  const handleViewBlog = (blog) => navigate(`/blogview/${blog.id}`, { state: { blog } });

  useEffect(() => {
    const handleClick = () => actionOpen && setActionOpen(null);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [actionOpen]);

  return (
    <div className="p-6 max-w-7xl mx-auto py-14">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blogs Management</h1>
        <div className="flex items-center gap-3">
          <div className="bg-gray-100 rounded-xl p-1 flex">
            <button
              className={`p-2 rounded-lg transition ${viewMode === "table" ? "bg-white shadow text-green-700" : "text-gray-600 hover:text-green-800"}`}
              onClick={() => setViewMode("table")}
              title="Table View"
            >
              <FiList size={20} />
            </button>
            <button
              className={`p-2 rounded-lg transition ${viewMode === "grid" ? "bg-white shadow text-green-700" : "text-gray-600 hover:text-green-800"}`}
              onClick={() => setViewMode("grid")}
              title="Card View"
            >
              <FiGrid size={20} />
            </button>
          </div>
          <button
            onClick={handleAddBlog}
            className="bg-green-800 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow transition"
          >
            Add Blog
          </button>
        </div>
      </div>

      <ServicesSearch search={search} onSearchChange={setSearch} />

      {viewMode === "table" ? (
        <BlogTable
          blogs={paginatedBlogs}
          onEdit={handleEditBlog}
          onDelete={handleDeleteBlog}
          onActionClick={handleActionClick}
          onView={handleViewBlog} 
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              onUpdate={handleUpdateBlog}
              onDelete={handleDeleteBlog}
              onView={handleViewBlog} 
            />
          ))}
        </div>
      )}

      <ServicesPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

      {actionOpen && (
        <BlogDropdown
          blog={blogs.find((b) => b.id === actionOpen)}
          isOpen={true}
          onClose={() => setActionOpen(null)}
          onEdit={handleEditBlog}
          onDelete={handleDeleteBlog}
          triggerRect={triggerRect}
        />
      )}
    </div>
  );
};

export default Blog;
