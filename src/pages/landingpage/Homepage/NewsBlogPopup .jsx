import React, { useEffect } from "react";
import { useGetNewsByIdQuery } from "../../../services/endpoints/newsBlogs";

const NewsBlogPopup = ({ blogId, onClose }) => {
  const { data, isLoading } = useGetNewsByIdQuery(blogId);

  useEffect(() => {
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, []);

  if (isLoading) return null;

  const blog = data?.data || data;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-6 overscroll-contain">
      {/* BACKDROP */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      {/* MODAL */}
      <div
        className="relative bg-white w-full max-w-3xl
                   h-[85vh] rounded-2xl shadow-2xl
                   flex flex-col z-10 overflow-y-auto overscroll-contain"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#309689 transparent",
        }}
      >
        {/* IMAGE */}
        <div className="h-48 sm:h-64 w-full overflow-hidden shrink-0">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* BODY */}
        <div className="flex flex-col flex-1 p-5 sm:p-8">
          {/* FIXED HEADER */}
          <div className="shrink-0">
            <h2 className="text-xl sm:text-3xl font-bold text-black mb-2">
              {blog.title}
            </h2>

            <p className="text-[#309689] font-medium mb-3">
              {blog.shortDescription}
            </p>

            <p className="text-xs sm:text-sm text-gray-400 mb-4">
              Published on · {new Date(blog.publishedDate).toDateString()}
            </p>
          </div>

          {/* ✅ SCROLLABLE CONTENT */}
          <div className="text-sm sm:text-base text-gray-700 leading-relaxed">
            {blog.longDescription}
          </div>

          {/* FIXED BUTTON */}
          <div className="pt-6 shrink-0 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-full border border-black
                         hover:bg-[#309689] hover:text-white transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsBlogPopup;
