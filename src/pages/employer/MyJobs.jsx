import { useState } from "react";
import {
  EyeIcon,
  PencilSquareIcon,
  UsersIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import PostJobModal from "../../components/employer/PostJobModal";
import EditJobModal from "../../components/employer/EditJobModal";

/* ================= DUMMY DATA ================= */
const dummyJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    type: "Full Time",
    location: "Remote",
    applications: 28,
    status: "Active",
    postedOn: "12 Feb 2026",
  },
  {
    id: 2,
    title: "Backend Developer",
    type: "Part Time",
    location: "Bangalore",
    applications: 14,
    status: "Pending",
    postedOn: "08 Feb 2026",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    type: "Contract",
    location: "Delhi",
    applications: 19,
    status: "Closed",
    postedOn: "05 Feb 2026",
  },
];

const statusColor = {
  Active: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Closed: "bg-red-100 text-red-700",
};

const MyJobs = () => {
  const [jobs, setJobs] = useState(dummyJobs);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showPostJob, setShowPostJob] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const filteredJobs = jobs.filter((job) => {
    const matchSearch = job.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "All" || job.status === statusFilter;

    return matchSearch && matchStatus;
  });

  const closeJob = (id) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === id ? { ...job, status: "Closed" } : job
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Jobs</h1>
          <p className="text-gray-500">
            Manage your posted jobs and applications
          </p>
        </div>

        <button
          onClick={() => setShowPostJob(true)}
          className="btn-primary"
        >
          + Post New Job
        </button>
      </div>

      <div className="card flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search job"
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
          <option value="Closed">Closed</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="card hover:shadow-md transition"
          >
            {/* HEADER */}
            <div className="flex justify-between mb-3">
              <h3 className="font-semibold text-lg">
                {job.title}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-xs ${statusColor[job.status]}`}
              >
                {job.status}
              </span>
            </div>

            {/* DETAILS */}
            <div className="text-sm text-gray-600 space-y-1 mb-4">
              <p><b>Type:</b> {job.type}</p>
              <p><b>Location:</b> {job.location}</p>
              <p><b>Applications:</b> {job.applications}</p>
              <p><b>Posted On:</b> {job.postedOn}</p>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-between items-center border-t pt-3">
              <div className="flex gap-3">
                <Link
                  to={`/employer/jobs/${job.id}`}
                  title="View Job"
                >
                  <EyeIcon className="w-5 h-5 text-blue-600" />
                </Link>

                <button
                  title="Edit Job"
                  onClick={()=> setShowEdit(true)}
                >
                  <PencilSquareIcon className="w-5 h-5 text-green-600" />
                </button>

                <Link
                  to={`/employer/jobs/${job.id}/applications`}
                  title="View Applications"
                >
                  <UsersIcon className="w-5 h-5 text-indigo-600" />
                </Link>
              </div>

              {job.status === "Active" && (
                <button
                  onClick={() => closeJob(job.id)}
                  className="flex items-center gap-1 text-red-600 text-sm font-medium"
                >
                  <NoSymbolIcon className="w-4 h-4" />
                  Close
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
      {showPostJob && (
        <PostJobModal
          onClose={() => setShowPostJob(false)}
          onSubmit={(newJob) =>
            setJobs((prev) => [...prev, newJob])
          }
        />
      )}
      
    
          {showEdit && (
        <EditJobModal
          job={jobs}
          onClose={() => setShowEdit(false)}
          onUpdate={(updatedJob) => setJobs(updatedJob)}
        />
      )}
        
    </div>
  );
};

export default MyJobs;
