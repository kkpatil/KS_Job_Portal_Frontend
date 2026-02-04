import React, { useState, useEffect } from "react";
import {
  useCreateNewsMutation,
  useUpdateNewsMutation,
} from "../../../services/endpoints/newsBlogs"; // Your endpoints

const NewsBlogForm = ({ mode = "create", selectedData = null, onClose }) => {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    shortDescription: "",
    longDescription: "",
    image: null,
    publishedDate: "",
  });

  const [loading, setLoading] = useState(false);

  // ===== RTK Query Mutations =====
  const [createNews] = useCreateNewsMutation();
  const [updateNews] = useUpdateNewsMutation();

  // ===== Prefill form if edit =====
  useEffect(() => {
    if (mode === "edit" && selectedData) {
      setFormData({
        category: selectedData.category || "",
        title: selectedData.title || "",
        shortDescription: selectedData.shortDescription || "",
        longDescription: selectedData.longDescription || "",
        image: selectedData.image || null,
        publishedDate: selectedData.publishedDate
          ? new Date(selectedData.publishedDate).toISOString().split("T")[0]
          : "",
      });
    }

    if (mode === "create") {
      setFormData({
        category: "",
        title: "",
        shortDescription: "",
        longDescription: "",
        image: null,
        publishedDate: "",
      });
    }
  }, [mode, selectedData]);

  // ===== Handlers =====
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.category ||
      !formData.title ||
      !formData.shortDescription ||
      !formData.longDescription
    ) {
      alert("Please fill all required fields!");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append("category", formData.category);
      data.append("title", formData.title);
      data.append("shortDescription", formData.shortDescription);
      data.append("longDescription", formData.longDescription);
      if (formData.image instanceof File) data.append("image", formData.image);
      if (formData.publishedDate)
        data.append("publishedDate", formData.publishedDate);

      if (mode === "edit" && selectedData) {
        await updateNews({ id: selectedData._id, formData: data }).unwrap();
        alert("News updated successfully!");
      } else {
        await createNews(data).unwrap();
        alert("News created successfully!");
      }

      onClose(); // Close modal after success
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Category */}
      <div>
        <label className="block mb-1 font-semibold text-gray-700">
          Category*
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          required
        >
          <option value="">Select category</option>
          <option value="NEWS">NEWS</option>
          <option value="BLOG">BLOG</option>
        </select>
      </div>

      {/* Title */}
      <div>
        <label className="block mb-1 font-semibold text-gray-700">Title*</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter title"
          className="w-full px-4 py-3 border rounded-lg focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          required
        />
      </div>

      {/* Short Description */}
      <div>
        <label className="block mb-1 font-semibold text-gray-700">
          Short Description*
        </label>
        <textarea
          name="shortDescription"
          value={formData.shortDescription}
          onChange={handleChange}
          rows={3}
          placeholder="Enter short description"
          className="w-full px-4 py-3 border rounded-lg focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          required
        />
      </div>

      {/* Long Description */}
      <div>
        <label className="block mb-1 font-semibold text-gray-700">
          Long Description*
        </label>
        <textarea
          name="longDescription"
          value={formData.longDescription}
          onChange={handleChange}
          rows={6}
          placeholder="Enter long description"
          className="w-full px-4 py-3 border rounded-lg focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          required
        />
      </div>

      {/* Image */}
      <div>
        <label className="block mb-1 font-semibold text-gray-700">Image*</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {formData.image && !(formData.image instanceof File) && (
          <img
            src={formData.image}
            alt="preview"
            className="mt-2 h-28 w-auto rounded-md"
          />
        )}
      </div>

      {/* Published Date */}
      <div>
        <label className="block mb-1 font-semibold text-gray-700">
          Published Date
        </label>
        <input
          type="date"
          name="publishedDate"
          value={formData.publishedDate}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : mode === "edit" ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default NewsBlogForm;
