import { useState } from "react";
import RichTextEditor from "./RichTextEditor";
import { cmsSchemas } from "../../utils/cmsSchemas";

const CMSForm = ({ initialData, onSubmit, onCancel, showSlug = true }) => {
  const isEditMode = Boolean(initialData && initialData._id);
  const slug = initialData?.slug || "";
  const schema = cmsSchemas[slug];

  const [form, setForm] = useState(() => {
    if (initialData && initialData._id) {
      return {
        _id: initialData._id,
        title: initialData.title || "",
        slug: initialData.slug || "",
        type: initialData.type || "PAGE",
        status: initialData.status || "ACTIVE",
        content: initialData.content || {},
      };
    }

    return {
      _id: null,
      title: "",
      slug: "",
      type: "PAGE",
      status: "ACTIVE",
      content: {},
    };
  });

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
      content: form.content,
    });
  };

  if (isEditMode && !schema) {
    return (
      <p className="text-sm text-red-500">
        No CMS schema found for slug: <b>{slug}</b>
      </p>
    );
  }

  return (
    <div className="space-y-4 overflow-y-auto overflow-x-hidden">
      {/* TITLE */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          className="w-full border px-4 py-2 rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
      </div>

      {/* SLUG */}
      {showSlug && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Slug
          </label>
          <input
            className={`w-full border px-4 py-2 rounded ${
              isEditMode ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
            value={form.slug}
            readOnly={isEditMode}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
          />
        </div>
      )}

      {/* TYPE */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Type
        </label>
        <select
          className="w-full border px-4 py-2 rounded"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="PAGE">Page</option>
          <option value="BLOG">Blog</option>
          <option value="BANNER">Banner</option>
        </select>
      </div>

      {/* ================= DYNAMIC FIELDS ================= */}

      {/* HEADING */}
      {schema?.fields.includes("heading") && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Heading
          </label>
          <RichTextEditor
            value={form.content.heading || ""}
            onChange={(html) =>
              setForm({
                ...form,
                content: { ...form.content, heading: html },
              })
            }
          />
        </div>
      )}

      {/* DESCRIPTION */}
      {schema?.fields.includes("description") && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 mt-14">
            Description
          </label>
          <RichTextEditor
            value={form.content.description || ""}
            onChange={(html) =>
              setForm({
                ...form,
                content: { ...form.content, description: html },
              })
            }
          />
        </div>
      )}

      {/* IMAGE */}
      {schema?.fields.includes("image") && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 mt-14">
            Image URL
          </label>
          <input
            className="w-full border px-4 py-2 rounded"
            value={form.content.image || ""}
            onChange={(e) =>
              setForm({
                ...form,
                content: { ...form.content, image: e.target.value },
              })
            }
          />
        </div>
      )}
      {/* STEPS (How It Works) */}
      {/* STEPS */}
      {schema?.fields.includes("steps") && (
        <div className="mt-14 space-y-4  ">
          <div className="flex justify-between items-center ">
            <label className="text-sm font-medium text-gray-700">Steps</label>

            <button
              type="button"
              className="text-sm btn-secondary px-4 py-1 rounded-md"
              onClick={() =>
                setForm({
                  ...form,
                  content: {
                    ...form.content,
                    steps: [
                      ...(form.content.steps || []),
                      { icon: "", title: "", text: "" },
                    ],
                  },
                })
              }
            >
              + Add Step
            </button>
          </div>

          {(form.content.steps || []).map((step, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 pb-8 pt-8 space-y-3 relative "
            >
              {/* REMOVE */}
              <button
                type="button"
                className="absolute top-1 right-2 text-white bg-red-400 px-2 py-1 rounded-md  text-xs cursor-pointer"
                onClick={() => {
                  const updated = form.content.steps.filter(
                    (_, i) => i !== index,
                  );

                  setForm({
                    ...form,
                    content: { ...form.content, steps: updated },
                  });
                }}
              >
                Remove
              </button>

              {/* ICON */}
              <input
                className="w-full border px-3 py-2 rounded"
                placeholder="Icon (FaUser)"
                value={step.icon}
                onChange={(e) => {
                  const updated = form.content.steps.map((s, i) =>
                    i === index ? { ...s, icon: e.target.value } : s,
                  );

                  setForm({
                    ...form,
                    content: { ...form.content, steps: updated },
                  });
                }}
              />

              {/* TITLE */}
              <input
                className="w-full border px-3 py-2 rounded"
                placeholder="Step Title"
                value={step.title}
                onChange={(e) => {
                  const updated = form.content.steps.map((s, i) =>
                    i === index ? { ...s, title: e.target.value } : s,
                  );

                  setForm({
                    ...form,
                    content: { ...form.content, steps: updated },
                  });
                }}
              />

              {/* TEXT */}
              <RichTextEditor
                value={step.text || ""}
                onChange={(html) => {
                  const updated = form.content.steps.map((s, i) =>
                    i === index ? { ...s, text: html } : s,
                  );

                  setForm({
                    ...form,
                    content: { ...form.content, steps: updated },
                  });
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* FAQS */}
      {schema?.fields.includes("faqs") && (
        <div className="mt-14 space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">FAQs</label>

            <button
              type="button"
              className="text-sm text-blue-600"
              onClick={() =>
                setForm({
                  ...form,
                  content: {
                    ...form.content,
                    faqs: [
                      ...(form.content.faqs || []),
                      {
                        id: String(
                          (form.content.faqs?.length || 0) + 1,
                        ).padStart(2, "0"),
                        question: "",
                        answer: "",
                      },
                    ],
                  },
                })
              }
            >
              + Add FAQ
            </button>
          </div>

          {(form.content.faqs || []).map((faq, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 space-y-3 relative"
            >
              {/* REMOVE */}
              <button
                type="button"
                className="absolute top-2 right-2 text-red-500 text-xs"
                onClick={() => {
                  const updated = form.content.faqs.filter(
                    (_, i) => i !== index,
                  );

                  setForm({
                    ...form,
                    content: { ...form.content, faqs: updated },
                  });
                }}
              >
                Remove
              </button>

              {/* QUESTION */}
              <input
                className="w-full border px-3 py-2 rounded"
                placeholder="Question"
                value={faq.question}
                onChange={(e) => {
                  const updated = form.content.faqs.map((f, i) =>
                    i === index ? { ...f, question: e.target.value } : f,
                  );

                  setForm({
                    ...form,
                    content: { ...form.content, faqs: updated },
                  });
                }}
              />

              {/* ANSWER */}
              <RichTextEditor
                value={faq.answer || ""}
                onChange={(html) => {
                  const updated = form.content.faqs.map((f, i) =>
                    i === index ? { ...f, answer: html } : f,
                  );

                  setForm({
                    ...form,
                    content: { ...form.content, faqs: updated },
                  });
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* HTML (privacy policy etc) */}
      {schema?.fields.includes("html") && (
        <RichTextEditor
          value={form.content.html || ""}
          onChange={(html) =>
            setForm({
              ...form,
              content: { html },
            })
          }
        />
      )}

      {/* ACTIONS */}
      <div className="flex justify-end gap-3 pt-4 mt-8 border-t">
        <button onClick={onCancel} className="px-4 py-2 border rounded cursor-pointer hover:bg-red-50 transition hover:scale-102 ">
          Cancel
        </button>

        <button onClick={handleSave} className="btn-primary px-4 py-2">
          {isEditMode ? "Update" : "Save"}
        </button>
      </div>
    </div>
  );
};

export default CMSForm;
