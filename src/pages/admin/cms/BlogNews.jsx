import React, { useState } from "react";
import Modal from "../../../components/common/Modal";
import NewsBlogForm from "./NewsBlogForm";
import {
  useGetNewsQuery,
  useDeleteNewsMutation,
} from "../../../services/endpoints/newsBlogs"; // tumhare api endpoints ka import

const BlogNews = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  // ===== Fetch news/blogs =====
  const { data: newsBlogs, isLoading, isError } = useGetNewsQuery();

  // ===== Delete mutation =====
  const [deleteNews] = useDeleteNewsMutation();

  // ===== Handle Edit =====
  const handleEdit = (item) => {
    setSelectedData(item);
    setOpenModal(true);
  };

  // ===== Handle Delete =====
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this news/blog?")) {
      try {
        await deleteNews(id).unwrap();
        alert("Deleted successfully!");
      } catch (err) {
        console.error(err);
        alert("Delete failed!");
      }
    }
  };

  // ===== Handle modal close =====
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedData(null);
  };

  return (
    <div className="p-6 bg-white mt-5 shadow-xl rounded-xl">
      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">News & Blogs</h2>
        <button
          onClick={() => {
            setSelectedData(null);
            setOpenModal(true);
          }}
          className="px-5 py-2 bg-[#309689] text-white rounded-md hover:bg-black transition"
        >
          + Add News / Blog
        </button>
      </div>

      {/* ===== Loading/Error ===== */}
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading news/blogs!</p>}

      {/* ===== CARD GRID ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {newsBlogs?.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={item.image || "https://via.placeholder.com/400x200"}
              alt={item.title}
              className="h-40 w-full object-cover"
            />

            <div className="p-4">
              <span className="inline-block text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 mb-2">
                {item.category}
              </span>

              <h3 className="font-semibold text-lg text-gray-800">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                {item.shortDescription}
              </p>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  className="text-sm text-blue-600 hover:underline"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="text-sm text-red-500 hover:underline"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== MODAL ===== */}
      {openModal && (
        <Modal
          title={selectedData ? "Edit News / Blog" : "Create News / Blog"}
          onClose={handleCloseModal}
          maxWidth="max-w-3xl"
        >
          <NewsBlogForm
            mode={selectedData ? "edit" : "create"}
            selectedData={selectedData}
            onClose={handleCloseModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default BlogNews;
