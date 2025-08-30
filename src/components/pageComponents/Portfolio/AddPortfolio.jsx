import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import JoditEditor from "jodit-react";

const PortfolioSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  year: Yup.string().required("Year is required"),
  description: Yup.string().required("Description is required"),
  image: Yup.mixed().nullable(),
});

const AddPortfolio = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [portfolioList, setPortfolioList] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editingPortfolio = location.state?.item || null;
  const isEdit = Boolean(editingPortfolio);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("portfolio")) || [];
    setPortfolioList(stored);

    if (editingPortfolio?.image) {
      setImagePreview(editingPortfolio.image);
    }
  }, [editingPortfolio]);

  const persist = (list) => {
    localStorage.setItem("portfolio", JSON.stringify(list));
  };

  const savePortfolio = (values) => {
    setIsSubmitting(true);
    let updated;
    if (isEdit && editingPortfolio) {
      updated = portfolioList.map((p) =>
        p.id === editingPortfolio.id
          ? { ...p, ...values, image: imagePreview || p.image }
          : p
      );
    } else {
      const newItem = {
        ...values,
        id: Date.now(),
        image: imagePreview || "https://via.placeholder.com/150x100.png?text=Portfolio",
      };
      updated = [...portfolioList, newItem];
    }

    setPortfolioList(updated);
    persist(updated);
    setIsSubmitting(false);
    navigate("/portfolio", { replace: true });
  };

  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("File size too large. Max 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      setImagePreview(result);
      setFieldValue("image", result);
    };
    reader.readAsDataURL(file);
  };

  const initialValues = {
    title: editingPortfolio?.title || "",
    year: editingPortfolio?.year || "",
    description: editingPortfolio?.description || "",
    image: editingPortfolio?.image || null,
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 p-6 pt-16">
      <div className="bg-white shadow-xl rounded-3xl w-full max-w-2xl p-10 overflow-auto max-h-[90vh]">
        <div className="mb-8 pb-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            {isEdit ? "Edit Portfolio" : "Add New Portfolio"}
          </h2>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={PortfolioSchema}
          onSubmit={savePortfolio}
          enableReinitialize
        >
          {({ setFieldValue, values }) => (
            <Form className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Title *</label>
                <Field
                  name="title"
                  placeholder="Enter title"
                  className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#166a63] shadow-sm transition"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Year *</label>
                <Field
                  name="year"
                  placeholder="Enter year"
                  className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#166a63] shadow-sm transition"
                />
                <ErrorMessage
                  name="year"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Description *</label>
                <JoditEditor
                  value={values.description}
                  onChange={(newContent) => setFieldValue("description", newContent)}
                  config={{
                    readonly: false,
                    height: 200,
                    toolbarButtonSize: "small",
                    buttons: [
                      "bold",
                      "italic",
                      "underline",
                      "ul",
                      "ol",
                      "link",
                      "unlink",
                      "font",
                      "fontsize",
                      "brush",
                      "paragraph",
                      "source",
                    ],
                  }}
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Portfolio Image</label>
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
                      <p className="text-sm text-gray-600">Click to change image</p>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-gray-500">Click to upload or drag & drop</p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
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
                  {isSubmitting ? "Saving..." : isEdit ? "Update Portfolio" : "Add Portfolio"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddPortfolio;
