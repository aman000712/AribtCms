import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const GallerySchema = Yup.object().shape({
  category: Yup.string().required("Category is required"),
  url: Yup.string().required("Image is required"),
});

const AddGallery = ({ gallery, onSave, onCancel }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEdit = Boolean(gallery);

  useEffect(() => {
    if (gallery?.url) setImagePreview(gallery.url);
  }, [gallery]);

  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File too large. Max 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setFieldValue("url", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const initialValues = {
    category: gallery?.category || "",
    url: gallery?.url || "",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-95 p-6">
      <div className="bg-white shadow-xl rounded-3xl w-full max-w-2xl p-10 relative">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
        >
          &times;
        </button>

        <div className="mb-8 pb-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            {isEdit ? "Edit Gallery Item" : "Add New Gallery Item"}
          </h2>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={GallerySchema}
          onSubmit={async (values) => {
            setIsSubmitting(true);
            try {
              await onSave({
                ...gallery,
                ...values,
                id: gallery?.id || Date.now(),
                url: imagePreview,
              });
            } finally {
              setIsSubmitting(false);
            }
          }}
          enableReinitialize
        >
          {({ setFieldValue }) => (
            <Form className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Category *
                </label>
                <Field
                  as="select"
                  name="category"
                  className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#166a63] shadow-sm transition"
                >
                  <option value="">Select category</option>
                  <option value="projects">Projects</option>
                  <option value="teamworks">Teamworks</option>
                  <option value="tours">Tours</option>
                  <option value="sports">Sports</option>
                </Field>
                <ErrorMessage
                  name="category"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Image *
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
                        className="w-48 h-48 object-cover rounded-lg mb-4 shadow-md mx-auto"
                      />
                      <p className="text-sm text-gray-600">
                        Click to change image
                      </p>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-gray-500 text-sm">
                        Click to upload or drag & drop
                      </p>
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
                <ErrorMessage
                  name="url"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 shadow-sm transition font-medium"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-800 text-white rounded-xl hover:bg-green-700 shadow-md transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Saving..."
                    : isEdit
                    ? "Update Gallery Item"
                    : "Add Gallery Item"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddGallery;
