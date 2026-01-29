import React from "react";

function NewsBlog() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-14">
          <div className="animate-[fadeDown_0.8s_ease-out]">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              News and Blog
            </h2>
            <p className="text-gray-500 max-w-xl">
              Metus faucibus sed turpis lectus feugiat tincidunt. Rhoncus sed
              tristique in dolor.
            </p>
          </div>

          <button className="text-[#309689] font-medium mt-4 md:mt-0 hover:underline">
            View all
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Card 1 */}
          <div className="group animate-[fadeUp_0.9s_ease-out]">
            <div className="relative rounded-2xl overflow-hidden mb-5">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
                alt="News"
                className="
                  w-full
                  h-[280px]
                  object-cover
                  blur-[2px]
                  transition-all
                  duration-300
                  group-hover:scale-105
                "
              />

              <span className="absolute top-4 left-4 bg-[#309689] text-white text-xs px-4 py-1 rounded-full">
                News
              </span>
            </div>

            <p className="text-gray-400 text-sm mb-2">30 March 2024</p>

            <h3 className="text-xl font-semibold mb-4 leading-snug">
              Revitalizing Workplace Morale: Innovative Tactics For Boosting
              Employee Engagement In 2024
            </h3>

            <button className="text-[#309689] font-medium flex items-center gap-2 hover:gap-3 transition-all">
              Read more <span>→</span>
            </button>
          </div>

          {/* Card 2 */}
          <div className="group animate-[fadeUp_1.1s_ease-out]">
            <div className="relative rounded-2xl overflow-hidden mb-5">
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
                alt="Blog"
                className="
                  w-full
                  h-[280px]
                  object-cover
                  blur-[2px]
                  transition-all
                  duration-300
                  group-hover:scale-105
                  
                "
              />

              <span className="absolute top-4 left-4 bg-[#309689] text-white text-xs px-4 py-1 rounded-full">
                Blog
              </span>
            </div>

            <p className="text-gray-400 text-sm mb-2">30 March 2024</p>

            <h3 className="text-xl font-semibold mb-4 leading-snug">
              How To Avoid The Top Six Most Common Job Interview Mistakes
            </h3>

            <button className="text-[#309689] font-medium flex items-center gap-2 hover:gap-3 transition-all">
              Read more <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewsBlog;
