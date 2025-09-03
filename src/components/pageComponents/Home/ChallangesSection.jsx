import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiEdit, FiTrash2, FiCheck, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ChallengesSchema = Yup.object().shape({
  heading: Yup.string().required("Heading is required"),
  subheading: Yup.string().required("Subheading is required"),
  description: Yup.string().required("Description is required"),
  button1: Yup.string(),
  button2: Yup.string(),
});

const DEFAULT_CHALLENGE = {
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
      !values.heading && !values.subheading && !values.description;
    const isDefault =
      values.button1 === "Let's Talk" && values.button2 === "Explore Services";

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
    setFieldTouched("heading", true);
    setFieldTouched("subheading", true);
    setFieldTouched("description", true);
  };

  return (
    <div className="p-4 bg-green-100 flex justify-center">
      <div className="w-[320px] min-h-[200px]">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-base font-semibold text-green-900">
            Challenges Section
          </h2>
          {data && !editing && (
            <div className="flex gap-1.5">
              <button
                onClick={() => setEditing(true)}
                className="p-1 text-green-700 rounded-md shadow-sm"
              >
                <FiEdit size={14} />
              </button>
              <button
                onClick={handleDelete}
                className="p-1 text-red-600 rounded-md shadow-sm"
              >
                <FiTrash2 size={14} />
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
            {({ values, resetForm, setFieldTouched }) => (
              <Form className="bg-green-50 border border-green-200 rounded-lg shadow-sm p-3 space-y-2 h-[180px] overflow-y-auto">
                {/* Text Fields */}
                {["heading", "subheading", "description", "button1", "button2"].map(
                  (field, idx) => (
                    <div key={idx}>
                      <Field
                        as={field === "description" ? "textarea" : "input"}
                        name={field}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        rows={field === "description" ? 2 : undefined}
                        className="w-full px-2 py-1 text-xs border border-green-300 rounded focus:ring-1 focus:ring-green-600"
                      />
                      {showValidation &&
                        field !== "button1" &&
                        field !== "button2" && (
                          <ErrorMessage
                            name={field}
                            component="div"
                            className="text-red-500 text-[10px] mt-0.5"
                          />
                        )}
                    </div>
                  )
                )}

                {/* Save & Cancel */}
                <div className="flex gap-2 pt-1">
                  <button
                    type="submit"
                    className="px-2.5 py-1 bg-green-700 text-white rounded text-xs flex items-center gap-1"
                  >
                    <FiCheck size={12} /> Save
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCancel(resetForm, values, setFieldTouched)}
                    className="px-2.5 py-1 bg-gray-200 text-gray-800 rounded text-xs flex items-center gap-1"
                  >
                    <FiX size={12} /> Cancel
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        ) : data ? (
          <div className="bg-green-50 border border-green-200 rounded-lg shadow-sm w-[320px] h-[180px] flex flex-col justify-center items-center text-center p-3">
            <h3 className="text-lg font-bold text-green-900">{data.heading}</h3>
            <p className="text-xs text-green-800">{data.subheading}</p>
            <p className="text-[11px] text-green-700">{data.description}</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => navigate("/contact")}
                className="px-2.5 py-1 bg-green-600 text-white rounded text-xs"
              >
                {data.button1}
              </button>
              <button
                onClick={() => navigate("/services")}
                className="px-2.5 py-1 border border-green-600 text-green-700 rounded text-xs"
              >
                {data.button2}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500 text-xs">
            No challenges section configured. Click the Edit button to create one.
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengesSection;
