import { useState } from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  PlusIcon,
  CheckCircleIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";
import Modal from "../../components/common/Modal";

const dummyCategories = [
  { id: 1, name: "IT & Software", jobs: 124, status: "Active" },
  { id: 2, name: "Design & Creative", jobs: 48, status: "Active" },
  { id: 3, name: "Marketing", jobs: 62, status: "Disabled" },
  { id: 4, name: "Finance", jobs: 29, status: "Active" },
];

const statusColor = {
  Active: "bg-green-100 text-green-700",
  Disabled: "bg-red-100 text-red-700",
};

const Categories = () => {
  const [categories, setCategories] = useState(dummyCategories);
  const [search, setSearch] = useState("");

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [selected, setSelected] = useState(null);

  const addCategory = (data) => {
    setCategories((prev) => [
      ...prev,
      { ...data, id: Date.now(), jobs: 0, status: "Active" },
    ]);
    setShowAdd(false);
  };

  const updateCategory = (data) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === data.id ? data : cat)),
    );
    setShowEdit(false);
  };

  const deleteCategory = () => {
    setCategories((prev) => prev.filter((cat) => cat.id !== selected.id));
    setShowDelete(false);
  };

  const toggleStatus = (id) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === id
          ? {
              ...cat,
              status: cat.status === "Active" ? "Disabled" : "Active",
            }
          : cat,
      ),
    );
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="card">
      {/* header */}
      <div className="flex md:flex-row flex-col  justify-between items-start gap-6 mb-6">
        <h2 className="text-xl font-semibold">Categories</h2>

        <div className="flex gap-3  ">
          <input
            type="text"
            placeholder="Search category"
            className="border px-4 py-2 rounded-lg text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            onClick={() => setShowAdd(true)}
            className="btn-primary flex items-center gap-1 text-sm font-medium"
          >
            <PlusIcon className="w-4 h-4" />
            Add Category
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((cat) => (
          <div key={cat.id} className="rounded-xl p-5 shadow-md tabl">
            <div className="flex justify-between mb-3">
              <h3 className="font-semibold text-lg">{cat.name}</h3>
              <span
                className={`px-3 py-1 rounded-full text-xs ${statusColor[cat.status]}`}
              >
                {cat.status}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Jobs: <b>{cat.jobs}</b>
            </p>

            <div className="flex justify-between items-center border-t pt-3">
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelected(cat);
                    setShowEdit(true);
                  }}
                >
                  <PencilSquareIcon className="w-5 h-5 text-green-600" />
                </button>

                <button
                  onClick={() => {
                    setSelected(cat);
                    setShowDelete(true);
                  }}
                >
                  <TrashIcon className="w-5 h-5 text-red-600" />
                </button>
              </div>

              <button
                onClick={() => toggleStatus(cat.id)}
                className={`flex items-center gap-1 text-sm font-medium ${
                  cat.status === "Active" ? "text-yellow-600" : "text-green-600"
                }`}
              >
                {cat.status === "Active" ? (
                  <>
                    <NoSymbolIcon className="w-4 h-4" /> Disable
                  </>
                ) : (
                  <>
                    <CheckCircleIcon className="w-4 h-4" /> Enable
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* modals */}
      {showAdd && (
        <CategoryForm onClose={() => setShowAdd(false)} onSave={addCategory} />
      )}

      {showEdit && (
        <CategoryForm
          edit
          data={selected}
          onClose={() => setShowEdit(false)}
          onSave={updateCategory}
        />
      )}

      {showDelete && (
        <DeleteModal
          name={selected.name}
          onClose={() => setShowDelete(false)}
          onConfirm={deleteCategory}
        />
      )}
    </div>
  );
};

/* add edit form modal*/
const CategoryForm = ({ onClose, onSave, edit, data }) => {
  const [name, setName] = useState(data?.name || "");

  return (
    <Modal onClose={onClose}>
      <h3 className="text-lg font-semibold mb-4">
        {edit ? "Edit Category" : "Add Category"}
      </h3>

      <input
        className="w-full border px-4 py-2 rounded mb-4"
        placeholder="Category name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      

      <div className="flex justify-end gap-3">
        <button onClick={onClose} className="px-4 py-2 border rounded">
          Cancel
        </button>
        <button
          onClick={() => onSave({ ...data, name })}
          className="btn-primary"
        >
          Save
        </button>
      </div>
    </Modal>
  );
};

/*Delete modal*/
const DeleteModal = ({ name, onClose, onConfirm }) => (
  <Modal onClose={onClose}>
    <h3 className="text-lg font-semibold mb-3">Delete Category</h3>
    <p className="mb-6 text-sm">
      Are you sure you want to delete <b>{name}</b>?
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

export default Categories;
