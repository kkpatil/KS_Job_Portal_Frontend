import { FaMapMarkerAlt, FaBookmark } from "react-icons/fa";
import { HiOutlineClock } from "react-icons/hi";
import { MdWork } from "react-icons/md";
import { useEffect, useState } from "react";
import {
  useGetCategoriesQuery,
  useGetJobLocationsQuery,
  useGetJobsForBoardQuery,
} from "../../../services/endpoints/jobApi";
import { Link } from "react-router-dom";

const timeAgo = (date) => {
  const diff = Math.floor((Date.now() - new Date(date)) / 60000);
  if (diff < 60) return `${diff} min ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)} hrs ago`;
  return `${Math.floor(diff / 1440)} days ago`;
};

const JobBoardMain = () => {
  const { data: jobLocations } = useGetJobLocationsQuery();
  console.log("job location", jobLocations);

  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [locationInput, setLocationInput] = useState("");

  const filteredLocations = jobLocations?.data?.filter((loc) =>
    loc.toLowerCase().includes(locationInput.toLowerCase()),
  );

  const [filters, setFilters] = useState({
    search: "",
    location: "",
    category: [],
    type: [],
    experience: [],
    posted: "",
  });

  const { data, isLoading } = useGetJobsForBoardQuery(filters);
  const { data: categories } = useGetCategoriesQuery();

  const jobs = data?.data || [];

  const hasFilters = Boolean(
    filters.search.trim() ||
    filters.location ||
    filters.category.length ||
    filters.type.length ||
    filters.experience.length ||
    filters.posted,
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8 ">
      <div className="bg-[#EBF5F4] rounded-xl shadow p-5 space-y-6 lg:sticky lg:top-24 h-fit ">
        <div>
          <h4 className="font-semibold mb-2">Search by Job Title</h4>
          <input
            type="text"
            value={filters.search}
            placeholder="Job title or company"
            className="w-full border rounded-md px-3 py-2 text-sm"
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>
        <div className="relative">
          <h4 className="font-semibold mb-2 text-gray-800">Location</h4>

          <div className="relative">
            {/* Location Icon */}
            <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-600 text-sm" />

            <input
              type="text"
              value={locationInput}
              placeholder="Search city (Delhi, Indore...)"
              className="
        w-full border rounded-lg pl-9 pr-3 py-2 text-sm
        focus:outline-none focus:ring-2 focus:ring-teal-500
        focus:border-teal-500 transition
      "
              onChange={(e) => {
                const value = e.target.value;
                setLocationInput(value);
                setShowLocationDropdown(value.length > 0);
              }}
            />
          </div>

          {/* DROPDOWN */}
          {showLocationDropdown && (
            <div
              className="
        absolute z-50 bg-white border rounded-lg mt-1 w-full
        max-h-52 overflow-auto shadow-lg
      "
            >
              {filteredLocations?.length > 0 ? (
                filteredLocations.map((loc, i) => (
                  <div
                    key={i}
                    className="
              px-4 py-2 text-sm cursor-pointer
              hover:bg-teal-50 flex items-center gap-2
            "
                    onMouseDown={() => {
                      setFilters((p) => ({ ...p, location: loc }));
                      setLocationInput(loc);
                      setShowLocationDropdown(false);
                    }}
                  >
                    <FaMapMarkerAlt className="text-teal-500 text-xs" />
                    <span className="text-gray-700">{loc}</span>
                  </div>
                ))
              ) : (
                <p className="px-4 py-2 text-sm text-gray-400">No city found</p>
              )}
            </div>
          )}
        </div>

        <div>
          <h4 className="font-semibold mb-3">Category</h4>
          {categories?.map((cat) => (
            <label
              key={cat._id}
              className="flex items-center gap-2 text-sm mb-2"
            >
              <input
                type="checkbox"
                checked={filters.category.includes(cat._id)}
                onChange={() =>
                  setFilters((p) => ({
                    ...p,
                    category: p.category.includes(cat._id)
                      ? p.category.filter((c) => c !== cat._id)
                      : [...p.category, cat._id],
                  }))
                }
              />
              {cat.name}
            </label>
          ))}
        </div>

        <div>
          <h4 className="font-semibold mb-3">Job Type</h4>
          {["Full Time", "Part Time", "Freelance"].map((item) => (
            <label key={item} className="flex items-center gap-2 text-sm mb-2">
              <input
                type="checkbox"
                checked={filters.type.includes(item)}
                onChange={() =>
                  setFilters((p) => ({
                    ...p,
                    type: p.type.includes(item)
                      ? p.type.filter((t) => t !== item)
                      : [...p.type, item],
                  }))
                }
              />
              {item}
            </label>
          ))}
        </div>

        {/* <div>
          <h4 className="font-semibold mb-3">Experience Level</h4>
          {["Fresher", "Intermidiate", "Expert"].map((item) => (
            <label key={item} className="flex items-center gap-2 text-sm mb-2">
              <input
                type="checkbox"
                onChange={() =>
                  setFilters((p) => ({
                    ...p,
                    experience: p.experience.includes(item)
                      ? p.experience.filter((e) => e !== item)
                      : [...p.experience, item],
                  }))
                }
              />
              {item}
            </label>
          ))}
        </div> */}

        <div>
          <h4 className="font-semibold mb-3">Date Posted</h4>
          {["Last 24 Hours", "Last 7 Days", "Last 30 Days"].map((item) => (
            <label key={item} className="flex items-center gap-2 text-sm mb-2">
              <input
                type="radio"
                name="posted"
                checked={filters.posted === item}
                onChange={() => setFilters({ ...filters, posted: item })}
              />
              {item}
            </label>
          ))}
        </div>

        {/* <button className="w-full bg-teal-600 text-white py-2 rounded-md text-sm">
          Apply Filter
        </button> */}
      </div>

      <div className="lg:col-span-3 space-y-4">
        <button
          disabled={!hasFilters}
          className={`btn-primary ${!hasFilters ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => {
            setFilters({
              search: "",
              location: "",
              category: [],
              type: [],
              experience: [],
              posted: "",
            });
            setLocationInput("");
            setShowLocationDropdown(false);
          }}
        >
          Clear All Filters
        </button>
        {isLoading && <p>Loading jobs...</p>}

        {!isLoading && jobs.length === 0 && <p>No jobs found</p>}

        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white rounded-xl shadow p-5 flex flex-col md:flex-row justify-between gap-4 hover:scale-105 transition cursor-pointer mb-6"
          >
            <div className="flex-1">
              <span className="text-xs text-teal-600 flex items-center gap-1">
                <HiOutlineClock /> {timeAgo(job.createdAt)}
              </span>

              <h3 className="font-semibold text-lg mt-1">{job.title}</h3>
              <p className="text-sm text-gray-700">{job.company}</p>

              <div className="flex flex-wrap gap-3 text-sm text-gray-500 mt-3">
                <span className="flex items-center gap-1">
                  <MdWork /> {job.category}
                </span>
                <span>{job.type}</span>
                <span className="font-semibold">{job.salary}</span>
                <span className="flex items-center gap-1">
                  <FaMapMarkerAlt /> {job.location}
                </span>
              </div>
            </div>

            <div className="flex md:flex-col gap-3 justify-end">
              {/* <FaBookmark className="text-gray-400" /> */}
              <Link
                to={`/job/${job?._id}`}
                className="bg-teal-600 text-white px-4 py-2 rounded-md text-sm"
              >
                Job Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobBoardMain;
