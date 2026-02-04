import React, { useEffect, useState } from "react";
import {
  useCreateTestimonialMutation,
  useUpdateTestimonialMutation,
} from "../../../services/endpoints/testimonialApi";

const TestimonialForm = ({ mode = "create", selectedData = null, onClose }) => {
  const isEdit = mode === "edit";

  const [formData, setFormData] = useState({
    name: "",
    subText: "",
    title: "",
    description: "",
    rating: 5,
    avatar: null,
  });

  const [createTestimonial, { isLoading: creating }] =
    useCreateTestimonialMutation();

  const [updateTestimonial, { isLoading: updating }] =
    useUpdateTestimonialMutation();

  // ✅ PREFILL (FIXED & CLEAN)
  useEffect(() => {
    if (isEdit && selectedData) {
      setFormData({
        name: selectedData.name || "",
        subText: selectedData.subText || "",
        title: selectedData.title || "",
        description: selectedData.description || "",
        rating: selectedData.rating || 5,
        avatar: selectedData.avatar || null,
      });
    } else {
      setFormData({
        name: "",
        subText: "",
        title: "",
        description: "",
        rating: 5,
        avatar: null,
      });
    }
  }, [isEdit, selectedData]);

  // ===== HANDLERS =====
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      avatar: e.target.files[0],
    }));
  };

  // ===== SUBMIT =====
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("subText", formData.subText);
      payload.append("title", formData.title);
      payload.append("description", formData.description);
      payload.append("rating", formData.rating);

      console.log([...payload.entries()]);

      // ✅ avatar handling (perfect)
      if (formData.avatar instanceof File) {
        payload.append("avatar", formData.avatar);
      } else if (!isEdit) {
        alert("Avatar is required");
        return;
      }

      if (isEdit && selectedData) {
        await updateTestimonial({
          id: selectedData._id,
          formData: payload,
        }).unwrap();
        alert("Testimonial updated successfully");
      } else {
        console.log("create payload", payload);
        await createTestimonial(payload).unwrap();
        alert("Testimonial created successfully");
      }

      onClose?.();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow space-y-5"
    >
      <h2 className="text-xl font-semibold">
        {isEdit ? "Edit Testimonial" : "Add Testimonial"}
      </h2>

      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Person Name"
        className="w-full border px-4 py-2 rounded"
        required
      />

      <input
        name="subText"
        value={formData.subText}
        onChange={handleChange}
        placeholder="Role / Client Type"
        className="w-full border px-4 py-2 rounded"
        required
      />

      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full border px-4 py-2 rounded"
        required
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        rows={4}
        placeholder="Description"
        className="w-full border px-4 py-2 rounded"
        required
      />

      <select
        name="rating"
        value={formData.rating}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
      >
        {[5, 4, 3, 2, 1].map((r) => (
          <option key={r} value={r}>
            {r} Star
          </option>
        ))}
      </select>

      {/* EXISTING AVATAR */}
      {isEdit && typeof formData.avatar === "string" && (
        <img
          src={formData.avatar}
          alt="avatar"
          className="h-20 w-20 rounded-full object-cover"
        />
      )}

      <input type="file" accept="image/*" onChange={handleFileChange} />

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={creating || updating}
          className="px-6 py-2 bg-teal-600 text-white rounded"
        >
          {creating || updating
            ? "Saving..."
            : isEdit
              ? "Save Changes"
              : "Create"}
        </button>
      </div>
    </form>
  );
};

export default TestimonialForm;
