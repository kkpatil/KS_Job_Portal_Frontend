import { useState } from "react";
import RichTextEditor from "./RichTextEditor";

const CMSForm = ({ initialData, onSubmit, onCancel, showSlug = true }) => {
  const isEditMode = Boolean(initialData && initialData._id);

  // ✅ FIX: Initialize state directly from props (No useEffect needed)
  const [form, setForm] = useState(() => {
    if (initialData && initialData._id) {
      return {
        _id: initialData._id,
        title: initialData.title || "",
        slug: initialData.slug || "",
        type: initialData.type || "PAGE",
        // Flatten the nested content structure here
        content: initialData.content?.heading || "", 
        status: initialData.status || "ACTIVE",
      };
    }

    // Default "Create" State
    return {
      _id: null,
      title: "",
      slug: "",
      type: "PAGE",
      content: "",
      status: "ACTIVE",
    };
  });

  /* ================= SUBMIT ================= */
  const handleSave = () => {
    if (!form.slug) {
      alert("Slug is required");
      return;
    }

    onSubmit({
      _id: form._id,
      title: form.title,
      slug: form.slug,
      type: form.type,
      status: form.status,
      // Re-nest the content for the backend
      content: {
        heading: form.content,
      },
    });
  };

  return (
    <div className="space-y-4">
      {/* TITLE */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Enter title..."
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
      </div>

      {/* SLUG */}
      {showSlug && (
        <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
           <input
            className={`w-full border px-4 py-2 rounded ${
              isEditMode ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "focus:ring-2 focus:ring-blue-500"
            }`}
            placeholder="example-slug-name"
            value={form.slug}
            readOnly={isEditMode} // 🔒 Lock slug in edit mode
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            required
          />
        </div>
      )}

      {/* TYPE */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
        <select
          className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="PAGE">Page</option>
          <option value="BLOG">Blog</option>
          <option value="BANNER">Banner</option>
        </select>
      </div>

      {/* RICH EDITOR */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
        <RichTextEditor
          value={form.content}
          onChange={(html) => setForm({ ...form, content: html })}
        />
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3 pt-4 mt-8 border-t">
        <button
          onClick={onCancel}
          className="px-4 py-2 border rounded hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Cancel
        </button>

        <button
          onClick={handleSave}
          className="btn-primary text-white px-4 py-2  rounded hover:bg-blue-950 transition-colors"
        >
          {isEditMode ? "Update" : "Save"}
        </button>
      </div>
    </div>
  );
};

export default CMSForm;