import { useState } from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  CheckCircleIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";
import Testimonial from "./cms/Testimonial";

import {
  useGetCMSContentsQuery,
  useCreateCMSMutation,
  useUpdateCMSMutation,
  useDeleteCMSMutation,
} from "../../services/endpoints/cmsApi";

import CMSForm from "../../components/common/CMSForm";
import Modal from "../../components/common/Modal";
import BlogNews from "./cms/BlogNews";
import { toast } from "react-toastify";

/* ================= CONSTANTS ================= */

const typeMap = {
  PAGE: "Page",
  BLOG: "Blog",
  BANNER: "Banner",
};

const statusMap = {
  ACTIVE: "Published",
  DRAFT: "Draft",
  INACTIVE: "Inactive",
};

const statusColor = {
  ACTIVE: "bg-green-100 text-green-700",
  DRAFT: "bg-yellow-100 text-yellow-700",
  INACTIVE: "bg-gray-100 text-gray-600",
};

/* ================= COMPONENT ================= */

const CMS = () => {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  /* ================= API ================= */

  const { data, isLoading } = useGetCMSContentsQuery(
    filter === "All" ? {} : { type: filter },
  );

  const [createCMS] = useCreateCMSMutation();
  const [updateCMS] = useUpdateCMSMutation();
  const [deleteCMS] = useDeleteCMSMutation();

  const contents = data?.data || [];

  /* ================= HANDLERS ================= */

  const handleSave = async (formData) => {
    if (formData._id) {
      const { _id, ...rest } = formData;
      await updateCMS({ id: _id, ...rest });
      toast.success("CMS updated successfully");
    } else {
      await createCMS(formData);
      toast.success("CMS created successfully");
    }

    setShowForm(false);
    setSelected(null);
  };

  const handleDelete = async () => {
   try {
     await deleteCMS(selected._id);
     toast.success("CMS deleted successfully");
     setShowDelete(false);
     setSelected(null);
   } catch (error) {
    toast.error("Failed to delete CMS");
   }
  };

  const toggleStatus = async (item) => {
   try {
     await updateCMS({
       id: item._id,
       status: item.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
     });
     toast.success("CMS status updated successfully");
   } catch (error) {
    toast.error("Failed to update CMS status");
   }
  };

  /* ================= UI ================= */

  return (
    <>
      <div className="card">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">CMS Management</h2>

          {/* <button
          className="btn-primary"
          onClick={() => {
            setSelected(null);
            setShowForm(true);
          }}
        >
          + Create CMS
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
            <option value="PAGE">Pages</option>
            <option value="BLOG">Blogs</option>
            <option value="BANNER">Banners</option>
          </select>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3">Updated</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan="6" className="text-center py-6">
                    Loading...
                  </td>
                </tr>
              )}

              {contents.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{item.title}</td>
                  <td className="px-4 py-3">{typeMap[item.type]}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">
                    {item.slug}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${statusColor[item.status]}`}
                    >
                      {statusMap[item.status]}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    {new Date(item.updatedAt).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-3">
                      <PencilSquareIcon
                        className="w-5 h-5 text-blue-600 cursor-pointer"
                        onClick={() => {
                          setSelected(item);
                          setShowForm(true);
                        }}
                      />

                      {item.status === "ACTIVE" ? (
                        <NoSymbolIcon
                          className="w-5 h-5 text-yellow-600 cursor-pointer"
                          onClick={() => toggleStatus(item)}
                        />
                      ) : (
                        <CheckCircleIcon
                          className="w-5 h-5 text-green-600 cursor-pointer"
                          onClick={() => toggleStatus(item)}
                        />
                      )}

                      <TrashIcon
                        className="w-5 h-5 text-red-600 cursor-pointer"
                        onClick={() => {
                          setSelected(item);
                          setShowDelete(true);
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}

              {!isLoading && contents.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No content found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* CREATE / EDIT MODAL */}
        {showForm && (
          <Modal onClose={() => setShowForm(false)}>
            <h3 className="text-lg font-semibold mb-4">
              {selected ? "Edit CMS" : "Create CMS"}
            </h3>

            <CMSForm
              key={selected?._id || "create"}
              initialData={selected}
              onSubmit={handleSave}
              onCancel={() => setShowForm(false)}
            />
          </Modal>
        )}

        {/* DELETE MODAL */}
        {showDelete && (
          <Modal onClose={() => setShowDelete(false)}>
            <h3 className="text-lg font-semibold mb-4">Delete Content</h3>

            <p className="mb-6 text-sm">
              Are you sure you want to delete <b>{selected?.title}</b>?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDelete(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button onClick={handleDelete} className="btn-danger">
                Delete
              </button>
            </div>
          </Modal>
        )}
      </div>
      <BlogNews />
      <Testimonial />
    </>
  );
};

export default CMS;
