import { useEffect, useState } from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  PlusIcon,
  CheckCircleIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";
import Modal from "../../components/common/Modal";
import {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../services/endpoints/categoryApi";
import { iconMap } from "../../utils/iconMap";

const statusColor = {
  ACTIVE: "bg-green-100 text-green-700",
  DISABLED: "bg-red-100 text-red-700",
};

const Categories = () => {
  const { data: categories = [], isLoading } = useGetAllCategoriesQuery();

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selected, setSelected] = useState(null);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleAdd = async (data) => {
    await createCategory(data).unwrap();
    setShowAdd(false);
  };

  const handleUpdate = async (data) => {
    await updateCategory({
      id: data._id,
      data,
    }).unwrap();
    setShowEdit(false);
  };

  const handleDelete = async () => {
    await deleteCategory(selected._id).unwrap();
    setShowDelete(false);
  };

  const toggleStatus = async (cat) => {
    await updateCategory({
      id: cat._id,
      data: {
        name: cat.name,
        icon: cat.icon,
        status: cat.status === "ACTIVE" ? "DISABLED" : "ACTIVE",
      },
    }).unwrap();
  };

  return (
    <div className="card">
      {/* HEADER */}
      <div className="flex md:flex-row flex-col justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold">Categories</h2>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search category"
            className="border px-4 py-2 rounded-lg text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            onClick={() => setShowAdd(true)}
            className="btn-primary flex items-center gap-1 text-sm"
          >
            <PlusIcon className="w-4 h-4" />
            Add Category
          </button>
        </div>
      </div>

      {isLoading && <p className="text-center py-6">Loading categories...</p>}

      {/* CATEGORY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((cat) => {
          const Icon = iconMap[cat.icon];

          return (
            <div key={cat._id} className="rounded-xl p-5 shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-3xl text-[#309689]">
                  {Icon && <Icon />}
                </div>
                <h3 className="font-semibold text-lg">{cat.name}</h3>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs ${statusColor[cat.status]}`}
              >
                {cat.status}
              </span>

              <div className="flex justify-between items-center border-t pt-3 mt-4">
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
                  onClick={() => toggleStatus(cat)}
                  className={`flex items-center gap-1 text-sm ${
                    cat.status === "ACTIVE"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {cat.status === "ACTIVE" ? (
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
          );
        })}
      </div>

      {showAdd && (
        <CategoryForm onClose={() => setShowAdd(false)} onSave={handleAdd} />
      )}

      {showEdit && selected && (
        <CategoryForm
          edit
          data={selected}
          onClose={() => setShowEdit(false)}
          onSave={handleUpdate}
        />
      )}

      {showDelete && selected && (
        <DeleteModal
          name={selected.name}
          onClose={() => setShowDelete(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

const CategoryForm = ({ onClose, onSave, edit, data }) => {
  const [name, setName] = useState(data?.name || "");
  const [icon, setIcon] = useState(data?.icon || "FaSeedling");
  const [iconSearch, setIconSearch] = useState("");

  const SelectedIcon = iconMap[icon];

  const filteredIcons = Object.keys(iconMap)
    .filter((key) => key.startsWith("Fa"))
    .filter((key) => key.toLowerCase().includes(iconSearch.toLowerCase()));

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

      <div className="mb-4">
        <label className="text-sm font-medium block mb-1">Category Icon</label>

        <input
          type="text"
          placeholder="Search icon (e.g. seed, bus, hotel)"
          className="border px-3 py-2 rounded w-full mb-2 text-sm"
          value={iconSearch}
          onChange={(e) => setIconSearch(e.target.value)}
        />

        <div className="flex gap-3">
          <select
            className="border px-3 py-2 rounded w-full "
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
          >
            {filteredIcons.map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>

          <div className="flex items-center justify-center w-14 h-14 border rounded text-3xl text-[#309689]">
            {SelectedIcon && <SelectedIcon />}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button onClick={onClose} className="px-4 py-2 border rounded">
          Cancel
        </button>
        <button
          onClick={() =>
            onSave(edit ? { ...data, name, icon } : { name, icon })
          }
          className="btn-primary"
        >
          Save
        </button>
      </div>
    </Modal>
  );
};

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
