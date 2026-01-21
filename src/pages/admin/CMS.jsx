import { useState } from "react";
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
  CheckCircleIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";
import { ImCross } from "react-icons/im";

const initialContent = [
  { id: 1, title: "About Us", type: "Page", status: "Published", updatedAt: "14 Jan 2026" },
  { id: 2, title: "Privacy Policy", type: "Page", status: "Published", updatedAt: "10 Jan 2026" },
  { id: 3, title: "How to Apply for Jobs", type: "Blog", status: "Draft", updatedAt: "12 Jan 2026" },
  { id: 4, title: "Homepage Banner", type: "Banner", status: "Published", updatedAt: "08 Jan 2026" },
];

const statusColor = {
  Published: "bg-green-100 text-green-700",
  Draft: "bg-yellow-100 text-yellow-700",
};

const CMS = () => {
  const [contents, setContents] = useState(initialContent);
  const [filter, setFilter] = useState("All");

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [selected, setSelected] = useState(null);

  const filteredContent =
    filter === "All" ? contents : contents.filter((c) => c.type === filter);

  const addContent = (data) => {
    setContents((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...data,
        status: "Draft",
        updatedAt: new Date().toLocaleDateString(),
      },
    ]);
    setShowAdd(false);
  };

  const updateContent = (data) => {
    setContents((prev) =>
      prev.map((item) => (item.id === data.id ? data : item))
    );
    setShowEdit(false);
  };

  const deleteContent = () => {
    setContents((prev) => prev.filter((item) => item.id !== selected.id));
    setShowDelete(false);
  };

  const toggleStatus = (id) => {
    setContents((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "Published" ? "Draft" : "Published",
            }
          : item
      )
    );
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">CMS Management</h2>
        {/* <button
          onClick={() => setShowAdd(true)}
          className="btn-primary flex items-center gap-1"
        >
          <PlusIcon className="w-4 h-4" />
          Add Content
        </button> */}
      </div>

      {/* FILTER */}
      <div className="mb-6">
        <select
          className="border px-4 py-2 rounded-lg text-sm"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Page">Pages</option>
          <option value="Blog">Blogs</option>
          <option value="Banner">Banners</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3">Last Updated</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredContent.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{item.title}</td>
                <td className="px-4 py-3">{item.type}</td>

                <td className="px-4 py-3 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs ${statusColor[item.status]}`}>
                    {item.status}
                  </span>
                </td>

                <td className="px-4 py-3">{item.updatedAt}</td>

                <td className="px-4 py-3">
                  <div className="flex justify-center gap-3">
                    <button title="View">
                      <EyeIcon className="w-5 h-5 text-indigo-600" />
                    </button>

                    <button
                      title="Edit"
                      onClick={() => {
                        setSelected(item);
                        setShowEdit(true);
                      }}
                    >
                      <PencilSquareIcon className="w-5 h-5 text-blue-600" />
                    </button>

                    <button title="Toggle Status" onClick={() => toggleStatus(item.id)}>
                      {item.status === "Published" ? (
                        <NoSymbolIcon className="w-5 h-5 text-yellow-600" />
                      ) : (
                        <CheckCircleIcon className="w-5 h-5 text-green-600" />
                      )}
                    </button>

                    <button
                      title="Delete"
                      onClick={() => {
                        setSelected(item);
                        setShowDelete(true);
                      }}
                    >
                      <TrashIcon className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredContent.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No content found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showAdd && <CMSForm onClose={() => setShowAdd(false)} onSave={addContent} />}
      {showEdit && (
        <CMSForm
          edit
          data={selected}
          onClose={() => setShowEdit(false)}
          onSave={updateContent}
        />
      )}
      {showDelete && (
        <DeletePopup
          title={selected.title}
          onClose={() => setShowDelete(false)}
          onConfirm={deleteContent}
        />
      )}
    </div>
  );
};

const CMSForm = ({ onClose, onSave, edit, data }) => {
  const [form, setForm] = useState(
    data || { title: "", type: "Page", content: "" }
  );

  return (
    <Modal onClose={onClose}>
      <h3 className="text-lg font-semibold mb-4">
        {edit ? "Edit Content" : "Add Content"}
      </h3>

      <input
        className="w-full border px-4 py-2 rounded mb-3"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <select
        className="w-full border px-4 py-2 rounded mb-4"
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
        disabled
      >
        <option>Page</option>
        <option>Blog</option>
        <option>Banner</option>
      </select>

       <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
            Content
        </label>
        <textarea
          className="w-full border px-4 py-2 rounded h-32"
            placeholder="Content body..."
            value={form.content || ""}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
        ></textarea>
      </div>

      <div className="flex justify-end gap-3">
        <button onClick={onClose} className="px-4 py-2 border rounded">
          Cancel
        </button>
        <button
          onClick={() => onSave({ ...data, ...form })}
          className="btn-primary"
        >
          Save
        </button>
      </div>
    </Modal>
  );
};

const DeletePopup = ({ title, onClose, onConfirm }) => (
  <Modal onClose={onClose}>
    <h3 className="text-lg font-semibold mb-4">Delete Content</h3>
    <p className="mb-6 text-sm">
      Are you sure you want to delete <b>{title}</b>?
    </p>

    <div className="flex justify-end gap-3">
      <button onClick={onClose} className="px-4 py-2 border rounded">
        Cancel
      </button>
      <button onClick={onConfirm} className="btn-danger">
        Delete
      </button>
    </div>
  </Modal>
);

const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
      <button
        onClick={onClose}
        className="absolute top-3 right-4 text-gray-400"
      >
        <ImCross size={16} />
      </button>
      {children}
    </div>
  </div>
);

export default CMS;
