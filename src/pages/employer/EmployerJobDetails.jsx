import { useParams, Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  UsersIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import {
  useCloseJobMutation,
  useGetJobByIdQuery,
} from "../../services/endpoints/jobApi";
import { toast } from "react-toastify";

const statusColor = {
  ACTIVE: "bg-green-100 text-green-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  CLOSED: "bg-red-100 text-red-700",
  REJECTED: "bg-red-200 text-red-600",
};

const EmployerJobDetails = () => {
  const { id } = useParams();
  const [showCloseModal, setShowCloseModal] = useState(false);

  const { data: job, isLoading } = useGetJobByIdQuery(id);
  console.log(job)

  if (isLoading) return <p>Loading...</p>;

  if (!job) {
    return (
      <div className="card text-center">
        <p className="text-gray-500">Job not found</p>
        <Link to={-1} className="text-indigo-600 underline">
          Back
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* BACK */}
      <Link
        to={-1}
        className="flex items-center gap-1 text-sm text-gray-600 hover:text-black"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Back
      </Link>

      {/* HEADER */}
      <div className="card flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{job?.title}</h1>
          <span className="text-gray-800 font-medium">{job?.employer?.companyName}</span>
          <p className="text-gray-500">
            {job?.location} • {job?.type}
          </p>
        </div>

        <span
          className={`px-4 py-1 rounded-full text-sm ${statusColor[job?.status]}`}
        >
          {job?.status}
        </span>
      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card space-y-3">
          <Detail label="Category" value={job?.category} />
          <Detail label="Experience" value={job?.experience} />
          <Detail label="Salary" value={job?.salary} />
          <Detail
            label="Applications"
            value={job?.applicationsCount ?? 0}
          />
          <Detail
            label="Posted On"
            value={new Date(job?.createdAt).toLocaleDateString()}
          />
        </div>

        <div className="card">
          <h3 className="font-semibold mb-2">Job Description</h3>
          <p className="text-sm text-gray-600 mb-4">
            {job?.description}
          </p>

          <h3 className="font-semibold mb-2">Required Skills</h3>
          <div className="flex flex-wrap gap-2">
            {job?.skills?.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-xs bg-indigo-100 text-indigo-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3">
        {job.status === "ACTIVE" && (
          <button
            onClick={() => setShowCloseModal(true)}
            className="btn-danger flex items-center gap-1"
          >
            <NoSymbolIcon className="w-4 h-4" />
            Close Job
          </button>
        )}

        <Link
          to={`/employer/jobs/${job?._id}/applications`}
          className="btn-primary flex items-center gap-1"
        >
          <UsersIcon className="w-4 h-4" />
          View Applications
        </Link>
      </div>

      {showCloseModal && (
        <CloseJobModal
          id={job?._id}
          onClose={() => setShowCloseModal(false)}
        />
      )}
    </div>
  );
};

const CloseJobModal = ({ id, onClose }) => {
  const [closeJob, { isLoading }] = useCloseJobMutation();

  const handleClose = async () => {
    try {
      await closeJob(id).unwrap();
      onClose();
      toast.success("Job closed successfully");
    } catch (error) {
      toast.error("Failed to close job");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <h2 className="text-lg font-bold mb-4">Close Job</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to close this job posting?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="btn-danger"
          >
            {isLoading ? "Closing..." : "Close Job"}
          </button>
        </div>
      </div>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export default EmployerJobDetails;
