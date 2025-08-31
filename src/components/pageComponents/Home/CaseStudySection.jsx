import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiEdit, FiTrash2, FiCheck, FiX, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

const CaseStudySchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  subtitle: Yup.string().required("Subtitle is required"),
  description: Yup.string().required("Description is required"),
  linkText: Yup.string(),
  linkUrl: Yup.string(),
});

const DEFAULT_CASE = {
  title: "",
  subtitle: "",
  description: "",
  linkText: "Read More",
  linkUrl: "/services",
};

const CaseStudySection = () => {
  const [caseStudies, setCaseStudies] = useState(() => {
    try {
      const saved = localStorage.getItem("caseStudies");
      return saved ? JSON.parse(saved) : [];
    } catch {
      localStorage.removeItem("caseStudies");
      return [];
    }
  });

  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("caseStudies", JSON.stringify(caseStudies));
  }, [caseStudies]);

  const handleDelete = (index) => {
    setCaseStudies(caseStudies.filter((_, i) => i !== index));
    if (editIndex === index) setEditIndex(null);
  };

  return (
    <div className="py-10 px-6 bg-green-100 rounded-3xl">
      <h2 className="text-3xl font-bold text-green-800 mb-8">Case Studies</h2>

      <div className="flex flex-col gap-6">
        {caseStudies.map((cs, index) =>
          editIndex === index ? (
            <Formik
              key={index}
              initialValues={cs}
              validationSchema={CaseStudySchema}
              onSubmit={(values) => {
                const updated = [...caseStudies];
                updated[index] = values;
                setCaseStudies(updated);
                setEditIndex(null);
              }}
            >
              {() => (
                <Form className="flex flex-col gap-2 p-4 bg-white rounded-xl shadow hover:shadow-md transition w-full">
                  <Field
                    name="title"
                    placeholder="Title"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm w-full"
                  />
                  <ErrorMessage name="title" component="div" className="text-red-500 text-xs" />

                  <Field
                    name="subtitle"
                    placeholder="Subtitle"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm w-full"
                  />
                  <ErrorMessage name="subtitle" component="div" className="text-red-500 text-xs" />

                  <Field
                    as="textarea"
                    name="description"
                    placeholder="Description"
                    rows={3}
                    className="px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-green-500 text-sm w-full"
                  />
                  <ErrorMessage name="description" component="div" className="text-red-500 text-xs" />

                  <Field
                    name="linkText"
                    placeholder="Link Text"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm w-full"
                  />
                  <Field
                    name="linkUrl"
                    placeholder="Link URL"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm w-full"
                  />

                  <div className="flex gap-2 mt-2">
                    <button
                      type="submit"
                      className="px-2 py-1 bg-green-700 text-white rounded-md flex items-center gap-1 text-sm hover:bg-green-800"
                    >
                      <FiCheck /> Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditIndex(null)}
                      className="px-2 py-1 bg-gray-200 text-gray-800 rounded-md flex items-center gap-1 text-sm hover:bg-gray-300"
                    >
                      <FiX /> Cancel
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          ) : (
            <div key={index} className="relative p-5 bg-white rounded-xl shadow hover:shadow-md transition w-full">
              {/* Optional Image with nice border */}
              {cs.image && (
                <img
                  src={cs.image}
                  alt={cs.title}
                  className="w-full rounded-xl border border-green-200 object-cover mb-4"
                />
              )}

              <h3 className="font-semibold text-lg text-green-800">{cs.title}</h3>
              <h4 className="font-medium text-gray-700 mt-1">{cs.subtitle}</h4>
              <p className="text-gray-600 mt-2 text-sm leading-relaxed">{cs.description}</p>

              {cs.linkUrl?.startsWith("http") ? (
                <a
                  href={cs.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 px-3 py-1 bg-green-700 text-white rounded-md hover:bg-green-800 text-sm transition"
                >
                  {cs.linkText || "Read More"}
                </a>
              ) : (
                <Link
                  to={cs.linkUrl || "/services"}
                  className="inline-block mt-3 px-3 py-1 bg-green-700 text-white rounded-md hover:bg-green-800 text-sm transition"
                >
                  {cs.linkText || "Read More"}
                </Link>
              )}

              <div className="absolute top-3 right-3 flex gap-1">
                <button
                  onClick={() => setEditIndex(index)}
                  className="text-green-700 hover:text-green-800 p-1"
                >
                  <FiEdit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-600 hover:text-red-700 p-1"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          )
        )}
      </div>

      {/* Add New */}
      <div className="mt-6">
        <Formik
          initialValues={DEFAULT_CASE}
          validationSchema={CaseStudySchema}
          onSubmit={(values, { resetForm }) => {
            setCaseStudies([...caseStudies, values]);
            resetForm();
          }}
        >
          {() => (
            <Form className="flex flex-col md:flex-row gap-2 w-full p-4 bg-white rounded-xl shadow hover:shadow-md transition">
              <Field
                name="title"
                placeholder="Title"
                className="px-3 py-2 border border-gray-300 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              />
              <Field
                name="subtitle"
                placeholder="Subtitle"
                className="px-3 py-2 border border-gray-300 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              />
              <Field
                name="description"
                placeholder="Description"
                className="px-3 py-2 border border-gray-300 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              />
              <Field
                name="linkText"
                placeholder="Link Text"
                className="px-3 py-2 border border-gray-300 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              />
              <Field
                name="linkUrl"
                placeholder="Link URL"
                className="px-3 py-2 border border-gray-300 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              />
              <button
                type="submit"
                className="px-3 py-1 bg-green-700 text-white rounded-md hover:bg-green-800 flex items-center gap-1 text-sm"
              >
                <FiPlus /> Add
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CaseStudySection;
