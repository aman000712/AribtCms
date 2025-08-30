import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const TeamSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  position: Yup.string().required("Position is required"),
  linkedin: Yup.string()
    .notRequired()
    .test("empty-or-url", "Must be a valid URL", (value) => {
      if (!value) return true;
      return Yup.string().url().isValidSync(value);
    }),
  image: Yup.mixed().nullable(),
});

const AddTeam = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [teamMembers, setTeamMembers] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editingMemberFromState = location.state?.teamMember;
  const editingMemberFromId = id
    ? teamMembers.find((member) => member.id === parseInt(id))
    : null;
  const editingMember = editingMemberFromState || editingMemberFromId;
  const isEdit = Boolean(editingMember);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("teamMembers")) || [];
      setTeamMembers(stored);
      if (editingMember?.image) setImagePreview(editingMember.image);
    } catch (error) {
      console.error("Error loading team members:", error);
      setTeamMembers([]);
    }
  }, [editingMember]);

  const persist = (list) => {
    try {
      localStorage.setItem("teamMembers", JSON.stringify(list));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  const saveTeamMember = async (values) => {
    setIsSubmitting(true);
    try {
      let updated;
      if (isEdit && editingMember) {
        updated = teamMembers.map((member) =>
          member.id === editingMember.id
            ? { ...member, ...values, image: imagePreview || member.image }
            : member
        );
      } else {
        const newItem = {
          ...values,
          id: Date.now(),
          image:
            imagePreview ||
            "https://via.placeholder.com/150x150.png?text=Team+Member",
        };
        updated = [...teamMembers, newItem];
      }

      setTeamMembers(updated);
      persist(updated);
      navigate("/team", { replace: true });
    } catch (error) {
      console.error("Error saving team member:", error);
      alert("Error saving team member.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File size too large. Please select an image under 5MB.");
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
    name: editingMember?.name || "",
    position: editingMember?.position || "",
    linkedin: editingMember?.linkedin || "",
    image: editingMember?.image || null,
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 p-6 pt-16">
      <div className="bg-white shadow-xl rounded-3xl w-full max-w-2xl p-10">
        <div className="mb-8 pb-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            {isEdit ? `Edit ${editingMember?.name}` : "Add New Team Member"}
          </h2>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={TeamSchema}
          onSubmit={saveTeamMember}
          enableReinitialize
        >
          {({ setFieldValue, values }) => (
            <Form className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Full Name *
                </label>
                <Field
                  name="name"
                  placeholder="Enter team member's name"
                  className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#166a63] shadow-sm transition"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Position/Role *
                </label>
                <Field
                  name="position"
                  placeholder="Enter position/role"
                  className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#166a63] shadow-sm transition"
                />
                <ErrorMessage
                  name="position"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  LinkedIn Profile URL
                </label>
                <Field
                  name="linkedin"
                  placeholder="https://linkedin.com/in/username"
                  className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#166a63] shadow-sm transition"
                />
                <ErrorMessage
                  name="linkedin"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Profile Image
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
                      <p className="text-gray-500">
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
                  {isSubmitting
                    ? "Saving..."
                    : isEdit
                    ? "Update Team Member"
                    : "Add Team Member"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddTeam;
