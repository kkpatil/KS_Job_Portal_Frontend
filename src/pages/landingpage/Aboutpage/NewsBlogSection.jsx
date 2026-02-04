import React, { useState } from "react";
import { useGetNewsQuery } from "../../../services/endpoints/newsBlogs";
import NewsBlogPopup from "../Homepage/NewsBlogPopup ";

function NewsBlogSection() {
  // ⭐ Final pattern state
  const [selectedBlog, setSelectedBlog] = useState(null);

  // 🔥 GET ALL NEWS/BLOG API
  const { data: newsList = [], isLoading } = useGetNewsQuery();

  if (isLoading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">News and Blog</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Metus faucibus sed turpis lectus feugiat tincidunt.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {newsList.map((item) => (
            <div
              key={item._id}
              className="group animate-[fadeUp_0.9s_ease-out]"
            >
              <div className="relative rounded-2xl overflow-hidden mb-5">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-70 object-cover blur-[0.5px] transition-all duration-300 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 bg-[#309689] text-white text-xs px-4 py-1 rounded-full">
                  {item.category}
                </span>
              </div>

              <p className="text-gray-400 text-sm mb-2">
                {new Date(item.createdAt).toDateString()}
              </p>

              <h3 className="text-xl font-semibold mb-4 leading-snug">
                {item.title}
              </h3>

              {/* ⭐ SAME onClick for ALL */}
              <button
                onClick={() => setSelectedBlog(item)}
                className="text-[#309689] font-medium flex items-center gap-2 hover:gap-3 transition-all"
              >
                Read more <span>→</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ⭐ SINGLE POPUP */}
      {selectedBlog && (
        <NewsBlogPopup
          blogId={selectedBlog._id}
          onClose={() => setSelectedBlog(null)}
        />
      )}
    </section>
  );
}

export default NewsBlogSection;
