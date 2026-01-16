import { useState } from "react";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  CheckCircleIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";

const dummyJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechNova Pvt Ltd",
    employer: "Rahul Sharma",
    type: "Full Time",
    location: "Remote",
    applications: 34,
    status: "Pending",
    postedOn: "10 Feb 2025",
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "CloudPeak",
    employer: "Neha Patel",
    type: "Part Time",
    location: "Bangalore",
    applications: 18,
    status: "Active",
    postedOn: "08 Feb 2025",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Bright Solutions",
    employer: "Amit Singh",
    type: "Contract",
    location: "Delhi",
    applications: 9,
    status: "Blocked",
    postedOn: "01 Feb 2025",
  },
];

const statusColor = {
  Active: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Blocked: "bg-red-100 text-red-700",
};

const Jobs = () => {
  const [jobs, setJobs] = useState(dummyJobs);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredJobs = jobs.filter((job) => {
    const matchSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "All" || job.status === statusFilter;

    return matchSearch && matchStatus;
  });

  const updateStatus = (id, status) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === id ? { ...job, status } : job
      )
    );
  };

  return (
    <div className="card">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold">Jobs</h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search job or company"
            className="border px-4 py-2 rounded-lg text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border px-4 py-2 rounded-lg text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Blocked">Blocked</option>
          </select>
        </div>
      </div>

  
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className=" rounded-xl p-5 bg-[#e7f5dc] shadow-sm hover:shadow-md shadow-gray-300 cursor-pointer transition"
          >
            {/* HEADER */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-lg">{job.title}</h3>
                <p className="text-sm text-gray-500">{job.company}</p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[job.status]}`}
              >
                {job.status}
              </span>
            </div>

            {/* DETAILS */}
            <div className="text-sm text-gray-600 space-y-1 mb-4">
              <p><b>Employer:</b> {job.employer}</p>
              <p><b>Type:</b> {job.type}</p>
              <p><b>Location:</b> {job.location}</p>
              <p><b>Applications:</b> {job.applications}</p>
              <p><b>Posted On:</b> {job.postedOn}</p>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-between items-center pt-3 border-t">
              <div className="flex gap-3">
                <button title="View">
                  <EyeIcon className="w-5 h-5 text-blue-600" />
                </button>
                <button title="Edit">
                  <PencilSquareIcon className="w-5 h-5 text-green-600" />
                </button>
                <button title="Delete">
                  <TrashIcon className="w-5 h-5 text-red-600" />
                </button>
              </div>

              {job.status !== "Active" ? (
                <button
                  onClick={() => updateStatus(job.id, "Active")}
                  className="flex items-center gap-1 text-green-600 text-sm font-medium"
                >
                  <CheckCircleIcon className="w-4 h-4" />
                  Approve
                </button>
              ) : (
                <button
                  onClick={() => updateStatus(job.id, "Blocked")}
                  className="flex items-center gap-1 text-yellow-600 text-sm font-medium"
                >
                  <NoSymbolIcon className="w-4 h-4" />
                  Block
                </button>
              )}
            </div>
          </div>
        ))}

        {filteredJobs.length === 0 && (
          <p className="text-gray-500 text-center col-span-full">
            No jobs found
          </p>
        )}
      </div>
    </div>
  );
};

export default Jobs;
