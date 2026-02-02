import { useState, useMemo, useEffect, useRef } from "react";
import { FaSearch, FaUserTie, FaBriefcase, FaBuilding } from "react-icons/fa";
import { useSearchLandingJobsQuery } from "../../../services/endpoints/jobApi";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const [keyword, setKeyword] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const shouldSearch = keyword.trim().length >= 2;

  const searchArg = useMemo(() => ({ keyword }), [keyword]);

  const {
    data: jobs = [],
    isFetching,
    isUninitialized,
  } = useSearchLandingJobsQuery(searchArg, {
    skip: !shouldSearch,
  });

  /* =========================
     OUTSIDE CLICK CLOSE
  ========================= */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowDropdown(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* =========================
     KEYBOARD NAVIGATION
  ========================= */
  const handleKeyDown = (e) => {
    if (!showDropdown || jobs.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % jobs.length);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev <= 0 ? jobs.length - 1 : prev - 1));
    }

    if (e.key === "Enter" && activeIndex >= 0) {
      navigate(`/jobs/${jobs[activeIndex]._id}`);
      setShowDropdown(false);
    }

    if (e.key === "Escape") {
      setShowDropdown(false);
      setActiveIndex(-1);
    }
  };

  return (
    <section
      className="
    relative   min-h-screen 
    bg-black text-white
    py-24 sm:py-32
    overflow-hidden
  "
    >
      {/* Background */}
      <div
        id="banner"
        className=" absolute inset-0 bg-cover bg-center opacity-30 blur-sm scale-110 animate-[slowZoom_6s_ease-out_forwards]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <h1
          className=" text-3xl sm:text-4xl md:text-6xl
    mb-6 font-semibold
    mt-12 sm:mt-20 animate-[fadeDown_0.9s_ease-out] "
        >
          Find Your Dream Job Today
        </h1>

        <p className="text-base sm:text-lg text-gray-300 mb-10 sm:mb-12 animate-[fadeIn_1.2s_ease-out]">
          Connecting Talent with Opportunity
        </p>

        {/* SEARCH */}
        <div
          ref={containerRef}
          className="relative max-w-4xl mx-auto px-4 sm:px-0"
        >
          <div className="bg-white flex flex-col md:flex-row rounded-[14px] shadow-xl p-4  gap-3   animate-[slideUp_1s_ease-out]">
            <input
              type="text"
              placeholder="Job title or company"
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                setShowDropdown(true);
                setActiveIndex(-1);
              }}
              onKeyDown={handleKeyDown}
              className="flex-1 px-4 py-3 rounded text-black outline-none w-full text-sm sm:text-base"
            />

            <button
              type="button"
              className="bg-[#309689] cursor-pointer  text-white px-6 py-3 rounded-[10px] flex items-center justify-center w-full sm:w-auto gap-2 hover:bg-[#257a6f] hover:scale-105 transition"
            >
              <FaSearch />
              Search Job
            </button>
          </div>

          {/* DROPDOWN */}
          {showDropdown && shouldSearch && !isUninitialized && (
            <div
              className="
    absolute w-full bg-white text-black mt-2
    rounded-xl shadow-xl z-50
    max-h-[60vh] sm:max-h-[400px]
    overflow-y-auto
    animate-[fadeUp_0.35s_ease-out]
  "
            >
              {isFetching && (
                <div className="px-4 py-3 text-sm text-gray-500">
                  Searching jobs...
                </div>
              )}

              {!isFetching && jobs.length === 0 && (
                <div className="px-4 py-3 text-sm text-gray-500">
                  No jobs found
                </div>
              )}

              {jobs.map((job, index) => (
                <div
                  key={job._id}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => navigate(`/job/${job._id}`)}
                  className={`
                    px-4 py-3 sm:py-4
    cursor-pointer transition-all
    text-sm 
                    ${
                      activeIndex === index
                        ? "bg-[#e6f4f2]"
                        : "hover:bg-[#e6f4f2]"
                    }
                  `}
                >
                  <h4 className="font-semibold">{job.title}</h4>
                  <p className="text-sm text-gray-500">
                    {job.company} • {job.category} • {job.location}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 sm:mt-20">
          {[
            { icon: <FaBriefcase />, label: "Jobs", value: "25,850" },
            { icon: <FaUserTie />, label: "Candidates", value: "10,250" },
            { icon: <FaBuilding />, label: "Companies", value: "18,500" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center group transition-all duration-300 hover:-translate-y-2"
            >
              <div className="text-3xl sm:text-4xl mb-3 text-gray-400 group-hover:text-[#309689] group-hover:scale-110 transition">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold group-hover:scale-110 transition">
                {item.value}
              </h3>
              <p className="text-gray-300 mt-1 group-hover:text-white transition">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
