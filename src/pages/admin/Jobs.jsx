import { useState } from "react";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  CheckCircleIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Modal from "../../components/common/Modal";


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

  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // filter jobs based on search and status
  const filteredJobs = jobs.filter((job) => {
    const matchSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "All" || job.status === statusFilter;

    return matchSearch && matchStatus;
  });

  // update job status
  const updateStatus = (id, status) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === id ? { ...job, status } : job
      )
    );
  };
  // edit job
  const updateJob = (data) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === data.id ? data : job))
    );
    setShowEdit(false);
  };

  //  delete job
  const deleteJob = () => {
    setJobs((prev) => prev.filter((job) => job.id !== selectedJob.id));
    setShowDelete(false);
  };

  return (
    <div className="card ">
      {/* header */}
      <div className="flex md:flex-row flex-col gap-3 md:gap-0 justify-between mb-6 ">
        <h2 className="text-xl font-semibold">Jobs</h2>

        <div className="flex gap-3">
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

      {/* job cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="rounded-xl p-5 tabl shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between mb-3">
              <div>
                <h3 className="font-semibold">{job.title}</h3>
                <p className="text-sm text-gray-500">{job.company}</p>
              </div>

              <span
                className={`px-3 py-3 rounded-md text-xs  ${statusColor[job.status]}`}
              >
                {job.status}
              </span>
            </div>

            <div className="text-sm text-gray-600 space-y-1 mb-4">
              <p><b>Employer:</b> {job.employer}</p>
              <p><b>Type:</b> {job.type}</p>
              <p><b>Location:</b> {job.location}</p>
              <p><b>Applications:</b> {job.applications}</p>
              <p><b>Posted:</b> {job.postedOn}</p>
            </div>

            <div className="flex justify-between items-center border-t pt-3">
              <div className="flex gap-3">
                <Link to={`/admin/jobs/${job.id}`} className="cursor-pointer">
                  <EyeIcon className="w-5 h-5 text-blue-600" />
                </Link>

                <button
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedJob(job);
                    setShowEdit(true);
                  }}
                >
                  <PencilSquareIcon className="w-5 h-5 text-green-600" />
                </button>

                <button
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedJob(job);
                    setShowDelete(true);
                  }}
                >
                  <TrashIcon className="w-5 h-5 text-red-600 " />
                </button>
              </div>

              {job.status !== "Active" ? (
                <button
                  onClick={() => updateStatus(job.id, "Active")}
                  className="flex items-center gap-1 text-green-600 text-sm cursor-pointer"
                >
                  <CheckCircleIcon className="w-4 h-4" />
                  Approve
                </button>
              ) : (
                <button
                  onClick={() => updateStatus(job.id, "Blocked")}
                  className="flex items-center gap-1 text-yellow-600 text-sm cursor-pointer" 
                >
                  <NoSymbolIcon className="w-4 h-4" />
                  Block
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* edit modal */}
      {showEdit && (
        <JobForm
          job={selectedJob}
          onClose={() => setShowEdit(false)}
          onSave={updateJob}
        />
      )}

      {/* delete modal */}
      {showDelete && (
        <DeleteModal
          title={selectedJob.title}
          onClose={() => setShowDelete(false)}
          onConfirm={deleteJob}
        />
      )}
    </div>
  );
};

// edit modal
const JobForm = ({ job, onClose, onSave }) => {
  const [form, setForm] = useState(job);

  return (
    <Modal onClose={onClose}>
      <h3 className="text-lg font-semibold mb-4">Edit Job</h3>

      <input
        className="w-full border px-4 py-2 rounded mb-3"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <input
        className="w-full border px-4 py-2 rounded mb-3"
        value={form.company}
        onChange={(e) => setForm({ ...form, company: e.target.value })}
      />

      <select
        className="w-full border px-4 py-2 rounded mb-4"
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
      >
        <option>Full Time</option>
        <option>Part Time</option>
        <option>Contract</option>
      </select>

      <div className="flex justify-end gap-3">
        <button onClick={onClose} className="px-4 py-2 border rounded">
          Cancel
        </button>
        <button onClick={() => onSave(form)} className="btn-primary">
          Save
        </button>
      </div>
    </Modal>
  );
};

// delete modal
const DeleteModal = ({ title, onClose, onConfirm }) => (
  <Modal onClose={onClose}>
    <h3 className="text-lg font-semibold mb-3">Delete Job</h3>
    <p className="mb-6 text-sm">
      Are you sure you want to delete <b>{title}</b>?
    </p>

    <div className="flex justify-end gap-3">
      <button onClick={onClose} className="px-4 py-2 border rounded">
        Cancel
      </button>
      <button onClick={onConfirm} className="btn-danger">
        Delete
      </button>
    </div>
  </Modal>
);

export default Jobs;
