import { useState } from "react";
import {
  EyeIcon,
  UsersIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

import PostJobModal from "../../components/employer/PostJobModal";
import Modal from "../../components/common/Modal";

import {
  useGetMyJobsQuery,
  useDeleteJobMutation,
} from "../../services/endpoints/jobApi";
import { toast } from "react-toastify";

const statusMap = {
  ACTIVE: "Active",
  PENDING: "Pending",
  CLOSED: "Closed",
  REJECTED: "Rejected",
  BLOCKED: "Blocked",
};

const statusColor = {
  ACTIVE: "bg-green-100 text-green-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  CLOSED: "bg-red-100 text-red-700",
  REJECTED: "bg-red-100 text-red-700",
  BLOCKED: "bg-gray-200 text-gray-700",
};

const MyJobs = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showPostJob, setShowPostJob] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const { data: myjobs = [], isLoading } = useGetMyJobsQuery();
  const [deleteJob, { isLoading: deleting }] = useDeleteJobMutation();

  const filteredJobs = myjobs.filter((job) => {
    const matchSearch = job.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "All" ||
      job.status === statusFilter.toUpperCase();

    return matchSearch && matchStatus;
  });

  const handleDelete = async () => {
    if (!selectedJob) return;

    try {
      await deleteJob(selectedJob._id).unwrap();
      setShowDeleteModal(false);
      setSelectedJob(null);
      toast.success("Job deleted successfully");
    } catch (err) {
      toast.error("Failed to delete job");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
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

      {/* FILTERS */}
      <div className="card flex gap-4">
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
          <option value="Blocked">Blocked</option>
        </select>
      </div>

      {/* JOB LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <div key={job._id} className="card">
            <div className="flex justify-between mb-3">
              <div>

              <h3 className="font-semibold text-lg">{job.title}</h3>
               <span>{job?.employer?.companyName}</span>
              </div>
             
              <span
                className={`px-3 py-1 rounded-full text-xs ${
                  statusColor[job.status] || "bg-gray-100 text-gray-700"
                }`}
              >
                {statusMap[job.status] || job.status}
              </span>
            </div>

            <div className="text-sm text-gray-600 space-y-1 mb-4">

              <p><b>Type:</b> {job.type}</p>
              <p><b>Location:</b> {job.location}</p>
              <p>
                <b>Applications:</b>{" "}
                {job.applicationsCount ?? 0}
              </p>
              <p>
                <b>Posted On:</b>{" "}
                {new Date(job.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex justify-between border-t pt-3">
              <div className="flex gap-3">
                <Link to={`/employer/jobs/${job._id}`}>
                  <EyeIcon className="w-5 h-5 text-blue-600" />
                </Link>

                <Link to={`/employer/jobs/${job._id}/applications`}>
                  <UsersIcon className="w-5 h-5 text-indigo-600" />
                </Link>
              </div>

              <button
                title="Delete Job"
                disabled={deleting}
                onClick={() => {
                  setSelectedJob(job);
                  setShowDeleteModal(true);
                }}
              >
                <TrashIcon className="w-6 h-6 text-red-600" />
              </button>
            </div>
          </div>
        ))}

        {filteredJobs.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No jobs found
          </p>
        )}
      </div>

      {showPostJob && (
        <PostJobModal onClose={() => setShowPostJob(false)} />
      )}

      {showDeleteModal && selectedJob && (
        <DeleteModal
          name={selectedJob.title}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          loading={deleting}
        />
      )}
    </div>
  );
};

const DeleteModal = ({ name, onClose, onConfirm, loading }) => (
  <Modal onClose={onClose}>
    <h3 className="text-lg font-semibold mb-3">Delete Job</h3>
    <p className="mb-6 text-sm">
      Are you sure you want to delete <b>{name}</b>?
    </p>

    <div className="flex justify-end gap-3">
      <button
        onClick={onClose}
        className="px-4 py-2 border rounded"
        disabled={loading}
      >
        Cancel
      </button>
      <button
        onClick={onConfirm}
        disabled={loading}
        className="btn-danger"
      >
        {loading ? "Deleting..." : "Delete"}
      </button>
    </div>
  </Modal>
);

export default MyJobs;
