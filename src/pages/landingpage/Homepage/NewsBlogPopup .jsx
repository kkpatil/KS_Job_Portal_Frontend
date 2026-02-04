import React from "react";
import { useGetNewsByIdQuery } from "../../../services/endpoints/newsBlogs";

const NewsBlogPopup = ({ blogId, onClose }) => {
  // 🔥 GET BY ID API
  const { data, isLoading } = useGetNewsByIdQuery(blogId);

  if (isLoading) return null;

  const blog = data?.data || data;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
      <div className="bg-white max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl">
        {/* IMAGE */}
        <div className="h-64 w-full overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* CONTENT */}
        <div className="p-8">
          <h2 className="text-3xl font-bold text-black mb-2">{blog.title}</h2>

          <p className="text-[#309689] font-medium mb-4">
            {blog.shortDescription}
          </p>

          <p className="text-sm text-gray-400 mb-6">
            Published on · {new Date(blog.publishedDate).toDateString()}
          </p>

          <p className="text-gray-700 leading-relaxed">
            {blog.longDescription}
          </p>

          <div className="mt-8 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-full border border-black hover:bg-[#309689] hover:text-white transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      <div className="absolute inset-0" onClick={onClose} />
    </div>
  );
};

export default NewsBlogPopup;
