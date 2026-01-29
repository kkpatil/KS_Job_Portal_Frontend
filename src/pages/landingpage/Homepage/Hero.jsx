import { FaSearch, FaUserTie, FaBriefcase, FaBuilding } from "react-icons/fa";
function HeroSection() {
  return (
    <div>
      <section className="relative h-screen bg-black text-white py-32 overflow-hidden ">
        {/* Background Image */}
        <div
          className="
            absolute inset-0 bg-cover bg-center opacity-30 blur-sm
            scale-110 animate-[slowZoom_6s_ease-out_forwards]
          "
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d')",
          }}
        ></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          {/* Heading */}
          <h1
            className="
              text-3xl md:text-6xl mb-6 font-semibold
              animate-[fadeDown_0.9s_ease-out]
              transition-all duration-300
              hover:font-bold hover:scale-105 mt-20
            "
          >
            Find Your Dream Job Today
          </h1>

          {/* Subtitle */}
          <p
            className="
              text-lg md:text-mdl text-gray-300 mb-12
              animate-[fadeIn_1.2s_ease-out]
              transition-all duration-300
              hover:text-white
            "
          >
            Connecting Talent with Opportunity: Your Gateway to Career Success
          </p>

          {/* Search Box */}
          <div
            className="
              bg-white rounded-[14px] shadow-xl p-4
              flex flex-col md:flex-row gap-4
              max-w-4xl mx-auto
              animate-[slideUp_1s_ease-out]
              transition-all duration-300
              hover:shadow-2xl
            "
          >
            <input
              type="text"
              placeholder="Job title or company"
              className="
                flex-1 px-4 py-3 rounded text-black outline-none
                border border-transparent
                transition-all duration-300
                hover:border-[#309689] focus:border-[#309689]
                focus:shadow-[0_0_0_2px_rgba(48,150,137,0.3)]
              "
            />

            <select
              className="
                px-4 py-3 rounded text-black outline-none cursor-pointer
                border border-transparent
                transition-all duration-300
                hover:border-[#309689] focus:border-[#309689]
              "
            >
              <option>Select Location</option>
              <option>Mumbai</option>
              <option>Pune</option>
              <option>Bangalore</option>
            </select>

            <select
              className="
                px-4 py-3 rounded text-black outline-none cursor-pointer
                border border-transparent
                transition-all duration-300
                hover:border-[#309689] focus:border-[#309689]
              "
            >
              <option>Select Category</option>
              <option>IT</option>
              <option>Marketing</option>
              <option>Finance</option>
            </select>

            <button
              className="
                bg-[#309689] text-white px-6 py-3 rounded-[10px]
                flex items-center justify-center gap-2
                transition-all duration-300
                hover:bg-[#257a6f] hover:scale-110 hover:font-semibold
                active:scale-95
              "
            >
              <FaSearch />
              Search Job
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mt-20">
            {[
              { icon: <FaBriefcase />, label: "Jobs", value: "25,850" },
              { icon: <FaUserTie />, label: "Candidates", value: "10,250" },
              { icon: <FaBuilding />, label: "Companies", value: "18,500" },
            ].map((item, i) => (
              <div
                key={i}
                className="
                  flex flex-col items-center group
                  transition-all duration-300
                  hover:-translate-y-2
                "
              >
                <div className="text-3xl mb-3 text-gray-400 transition-all duration-300 group-hover:text-[#309689] group-hover:scale-110">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold transition-all duration-300 group-hover:scale-110">
                  {item.value}
                </h3>
                <p className="text-gray-300 mt-1 transition-all duration-300 group-hover:text-white">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HeroSection;
