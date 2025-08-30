import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const GallerySchema = Yup.object().shape({
  category: Yup.string().required("Category is required"),
  url: Yup.string().required("Image is required"),
});

const AddGallery = ({ gallery, onSave, onCancel }) => {
  const [imagePreview, setImagePreview] = useState(null);
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
    <div className="w-full max-w-2xl shadow-xl rounded-3xl p-10 bg-white">
      <div className="text-center mb-8 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">
          {isEdit ? "Edit Media" : "Add New Media"}
        </h2>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={GallerySchema}
        onSubmit={(values) =>
          onSave({ ...gallery, ...values, id: gallery?.id || Date.now() })
        }
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
                className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-[#166a63] transition"
                onClick={() => document.getElementById("galleryImage").click()}
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-contain rounded-lg mx-auto mb-2"
                  />
                ) : (
                  <p className="text-gray-500">
                    Click to upload image (PNG, JPG up to 5MB)
                  </p>
                )}
                <input
                  type="file"
                  id="galleryImage"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, setFieldValue)}
                />
              </div>
              <ErrorMessage
                name="url"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="flex justify-end gap-4 mt-6 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 shadow-sm transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#166a63] text-white rounded-xl hover:bg-[#11534e] shadow-md transition"
              >
                {isEdit ? "Update" : "Add"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddGallery;
