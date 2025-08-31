import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiEdit, FiTrash2, FiCheck, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ChallengesSchema = Yup.object().shape({
  imageData: Yup.string().required("Background image is required"),
  heading: Yup.string().required("Heading is required"),
  subheading: Yup.string().required("Subheading is required"),
  description: Yup.string().required("Description is required"),
  button1: Yup.string(),
  button2: Yup.string(),
});

const DEFAULT_CHALLENGE = {
  imageData: null,
  heading: "",
  subheading: "",
  description: "",
  button1: "Let's Talk",
  button2: "Explore Services",
};

const ChallengesSection = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem("challengesSection");
      return saved ? JSON.parse(saved) : null;
    } catch {
      localStorage.removeItem("challengesSection");
      return null;
    }
  });
  const [editing, setEditing] = useState(!data);
  const [showValidation, setShowValidation] = useState(false);

  useEffect(() => {
    if (data) localStorage.setItem("challengesSection", JSON.stringify(data));
  }, [data]);

  const handleSave = (values) => {
    setData(values);
    setEditing(false);
    setShowValidation(false);
  };

  const handleDelete = () => {
    localStorage.removeItem("challengesSection");
    setData(null);
    setEditing(true);
    setShowValidation(false);
  };

  const handleCancel = (resetForm, values, setFieldTouched) => {
    const isEmpty =
      !values.heading &&
      !values.subheading &&
      !values.description &&
      !values.imageData;
    const isDefault = values.button1 === "Let's Talk" && values.button2 === "Explore Services";

    if (isEmpty && isDefault) {
      if (data) setEditing(false);
      setShowValidation(false);
      return;
    }

    if (showValidation) {
      setShowValidation(false);
      if (data) setEditing(false);
      else resetForm();
      return;
    }

    setShowValidation(true);
    setFieldTouched("imageData", true);
    setFieldTouched("heading", true);
    setFieldTouched("subheading", true);
    setFieldTouched("description", true);
  };

  return (
    <div className="p-6 bg-green-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-green-900">Challenges Section</h2>
        {data && !editing && (
          <div className="flex gap-2">
            <button
              onClick={() => setEditing(true)}
              className="p-2 text-green-700 rounded-lg shadow-sm"
            >
              <FiEdit />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 text-red-600 rounded-lg shadow-sm"
            >
              <FiTrash2 />
            </button>
          </div>
        )}
      </div>

      {editing ? (
        <Formik
          initialValues={data || DEFAULT_CHALLENGE}
          validationSchema={ChallengesSchema}
          onSubmit={handleSave}
          enableReinitialize
        >
          {({ setFieldValue, values, resetForm, setFieldTouched }) => (
            <Form className="bg-white rounded-3xl shadow-md max-w-3xl mx-auto p-6 space-y-4 relative">
              {/* Side Dot */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-700 opacity-0 rounded-r-full"></div>

              {/* Image Upload */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Background Image *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setFieldValue("imageData", reader.result);
                      setFieldTouched("imageData", true);
                    };
                    reader.readAsDataURL(file);
                  }}
                  className="w-full border border-green-300 p-2 rounded-lg"
                />
                {values.imageData && (
                  <img
                    src={values.imageData}
                    alt="preview"
                    className="w-full h-48 object-cover rounded-xl mt-3"
                  />
                )}
                {showValidation && (
                  <ErrorMessage
                    name="imageData"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                )}
              </div>

              {/* Text Fields */}
              {["heading", "subheading", "description", "button1", "button2"].map((field, idx) => (
                <div key={idx}>
                  <Field
                    as={field === "description" ? "textarea" : "input"}
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    rows={field === "description" ? 3 : undefined}
                    className="w-full px-3 py-2 border border-green-300 rounded-lg focus:ring-1 focus:ring-green-700"
                  />
                  {showValidation && field !== "button1" && field !== "button2" && (
                    <ErrorMessage
                      name={field}
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  )}
                </div>
              ))}

              {/* Save & Cancel */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-800 text-white rounded-lg flex items-center gap-1 shadow-sm"
                >
                  <FiCheck /> Save
                </button>
                <button
                  type="button"
                  onClick={() => handleCancel(resetForm, values, setFieldTouched)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg flex items-center gap-1"
                >
                  <FiX /> Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      ) : data ? (
        <div
          className="relative rounded-3xl overflow-hidden max-w-3xl mx-auto
                     bg-gradient-to-r from-green-700 via-green-800 to-green-900
                     shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300"
        >
          {/* Side Dot */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 rounded-r-full"></div>

          {/* Image */}
          {data.imageData && (
            <img
              src={data.imageData}
              alt="background"
              className="w-full h-56 object-cover"
            />
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-6 space-y-2">
            <h3 className="text-3xl font-extrabold">{data.heading}</h3>
            <p className="text-lg opacity-90">{data.subheading}</p>
            <p className="max-w-3xl opacity-90">{data.description}</p>
            <div className="flex gap-3 mt-3">
              <button
                onClick={() => navigate("/contact")}
                className="px-4 py-2 bg-green-900 rounded-lg transition-all"
              >
                {data.button1}
              </button>
              <button
                onClick={() => navigate("/services")}
                className="px-4 py-2 border border-white text-white rounded-lg transition-all"
              >
                {data.button2}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No challenges section configured. Click the Edit button to create one.
        </div>
      )}
    </div>
  );
};

export default ChallengesSection;
