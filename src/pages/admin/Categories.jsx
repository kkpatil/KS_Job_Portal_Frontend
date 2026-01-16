import { useState } from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  PlusIcon,
  CheckCircleIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";

const dummyCategories = [
  {
    id: 1,
    name: "IT & Software",
    jobs: 124,
    status: "Active",
  },
  {
    id: 2,
    name: "Design & Creative",
    jobs: 48,
    status: "Active",
  },
  {
    id: 3,
    name: "Marketing",
    jobs: 62,
    status: "Disabled",
  },
  {
    id: 4,
    name: "Finance",
    jobs: 29,
    status: "Active",
  },
];

const statusColor = {
  Active: "bg-green-100 text-green-700",
  Disabled: "bg-red-100 text-red-700",
};

const Categories = () => {
  const [categories, setCategories] = useState(dummyCategories);
  const [search, setSearch] = useState("");

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = (id) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === id
          ? {
              ...cat,
              status: cat.status === "Active" ? "Disabled" : "Active",
            }
          : cat
      )
    );
  };

  const deleteCategory = (id) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  return (
    <div className="card">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold">Categories</h2>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search category"
            className="border px-4 py-2 rounded-lg text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button className="btn-secondary flex items-center gap-1">
            <PlusIcon className="w-4 h-4 " />
            Add Category
          </button>
        </div>
      </div>

      {/* CATEGORY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 table-auto">
        {filteredCategories.map((cat) => (
          <div
            key={cat.id}
            className=" rounded-xl p-5 shadow-md hover:shadow-md transition tabl"
          >
            {/* HEADER */}
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-lg">{cat.name}</h3>

              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[cat.status]}`}
              >
                {cat.status}
              </span>
            </div>

            {/* DETAILS */}
            <p className="text-sm text-gray-600 mb-4">
              Jobs under this category:{" "}
              <span className="font-medium">{cat.jobs}</span>
            </p>

            {/* ACTIONS */}
            <div className="flex justify-between items-center pt-3 border-t">
              <div className="flex gap-3">
                <button title="Edit">
                  <PencilSquareIcon className="w-5 h-5 text-green-600" />
                </button>

                <button
                  title="Delete"
                  onClick={() => deleteCategory(cat.id)}
                >
                  <TrashIcon className="w-5 h-5 text-red-600" />
                </button>
              </div>

              {cat.status === "Active" ? (
                <button
                  onClick={() => toggleStatus(cat.id)}
                  className="flex items-center gap-1 text-yellow-600 text-sm font-medium"
                >
                  <NoSymbolIcon className="w-4 h-4" />
                  Disable
                </button>
              ) : (
                <button
                  onClick={() => toggleStatus(cat.id)}
                  className="flex items-center gap-1 text-green-600 text-sm font-medium"
                >
                  <CheckCircleIcon className="w-4 h-4" />
                  Enable
                </button>
              )}
            </div>
          </div>
        ))}

        {filteredCategories.length === 0 && (
          <p className="text-gray-500 text-center col-span-full">
            No categories found
          </p>
        )}
      </div>
    </div>
  );
};

export default Categories;
