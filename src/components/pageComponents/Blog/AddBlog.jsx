import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import JoditEditor from "jodit-react";

const BlogSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  content: Yup.string().required("Content is required"),
  image: Yup.mixed().nullable(),
});

const AddBlog = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editingBlog = location.state?.blog;
  const isEdit = Boolean(editingBlog);

  const [blogs, setBlogs] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const editor = useRef(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("blogs")) || [];
    setBlogs(stored);
    if (editingBlog?.image) setImagePreview(editingBlog.image);
  }, [editingBlog]);

  const persist = (list) => localStorage.setItem("blogs", JSON.stringify(list));

  const saveBlog = (values) => {
    setIsSubmitting(true);
    let updated;
    if (isEdit && editingBlog) {
      updated = blogs.map((b) =>
        b.id === editingBlog.id
          ? { ...b, ...values, image: imagePreview || b.image }
          : b
      );
    } else {
      const newBlog = {
        ...values,
        id: Date.now(),
        image: imagePreview || "https://via.placeholder.com/150x150.png?text=Blog",
        date: new Date().toISOString().slice(0, 10),
      };
      updated = [...blogs, newBlog];
    }

    setBlogs(updated);
    persist(updated);
    setIsSubmitting(false);
    navigate("/blog");
  };

  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setFieldValue("image", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const initialValues = {
    title: editingBlog?.title || "",
    author: editingBlog?.author || "",
    content: editingBlog?.content || "",
    image: editingBlog?.image || null,
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 p-6 pt-16">
      <div className="bg-white shadow-xl rounded-3xl w-full max-w-2xl p-10">
        <div className="mb-8 pb-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            {isEdit ? "Edit Blog" : "Add New Blog"}
          </h2>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={BlogSchema}
          onSubmit={saveBlog}
          enableReinitialize
        >
          {({ setFieldValue, values }) => (
            <Form className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Blog Title *
                </label>
                <Field
                  name="title"
                  placeholder="Enter blog title"
                  className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#166a63] shadow-sm transition"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Author *
                </label>
                <Field
                  name="author"
                  placeholder="Enter author name"
                  className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#166a63] shadow-sm transition"
                />
                <ErrorMessage
                  name="author"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Content *
                </label>
                <JoditEditor
                  ref={editor}
                  value={values.content}
                  tabIndex={1}
                  onBlur={(newContent) => setFieldValue("content", newContent)}
                  className="border rounded-xl p-2"
                />
                <ErrorMessage
                  name="content"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Blog Image
                </label>
                <div
                  className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-[#166a63] transition"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  {imagePreview ? (
                    <div className="text-center">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-48 h-32 object-cover rounded-lg mb-4 shadow-md mx-auto"
                      />
                      <p className="text-sm text-gray-600">
                        Click to change image
                      </p>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-gray-400 mx-auto mb-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-gray-500">Click to upload or drag & drop</p>
                      <p className="text-xs text-gray-400 mt-1">
                        PNG, JPG up to 5MB
                      </p>
                    </div>
                  )}

                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, setFieldValue)}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 shadow-sm transition font-medium"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-[#166a63] text-white rounded-xl hover:bg-[#11534e] shadow-md transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isEdit ? "Update Blog" : "Add Blog"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddBlog;
