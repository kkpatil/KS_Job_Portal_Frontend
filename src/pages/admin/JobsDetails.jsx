import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  NoSymbolIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import {FaCheckCircle,} from "react-icons/fa"
import {
  useGetAllJobsQuery,
  useApproveJobMutation,
  useBlockJobMutation,
  useRejectJobMutation,
} from "../../services/endpoints/jobApi";
import Modal from "../../components/common/Modal";
import { toast } from "react-toastify";

const statusColor = {
  ACTIVE: "bg-green-100 text-green-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  BLOCKED: "bg-red-100 text-red-700",
  REJECTED: "bg-gray-200 text-gray-600",
};

const JobsDetails = () => {
  const { id } = useParams();

  const { data: jobsData = [], isLoading } = useGetAllJobsQuery();
  const [approveJob] = useApproveJobMutation();
  const [blockJob] = useBlockJobMutation();
  const [rejectJob] = useRejectJobMutation();

  const [actionType, setActionType] = useState(null); // "approve" | "reject" | "block"
  const [showModal, setShowModal] = useState(false);

  const openActionModal = (type) => {
    setActionType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setActionType(null);
  };

  const handleConfirmAction = async () => {
    try {
      if (actionType === "approve") {
        await approveJob(job._id).unwrap();
        toast.success("Job approved successfully");
      }
      if (actionType === "reject") {
        await rejectJob(job._id).unwrap();
        toast.success("Job rejected successfully");
      }
      if (actionType === "block") {
        await blockJob(job._id).unwrap();
        toast.success("Job blocked successfully");
      }

      closeModal();
    } catch (error) {
      toast.error("Failed to perform action");
      console.error("Action failed:", error);
      closeModal();
    }
  };

  const jobs = Array.isArray(jobsData) ? jobsData : [];
  const job = jobs.find((job) => job._id === id);

  if (isLoading) {
    return <div className="card text-center">Loading job...</div>;
  }

  if (!job) {
    return (
      <div className="card text-center">
        <p className="text-gray-500">Job not found</p>
        <Link to="/admin/jobs" className="text-indigo-600 underline">
          Go back
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* BACK */}
      <Link
        to="/admin/jobs"
        className="flex items-center gap-1 text-sm text-white w-fit border px-3 py-2 rounded-md bg-black/90 hover:bg-black"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Back to Jobs
      </Link>

      {/* HEADER */}
      <div className="card">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{job.title}</h1>
            <p className="text-gray-500">
              Employer: {job.employer?.name || "—"}
            </p>
          </div>

          <span
            className={`px-4 py-1 rounded-full text-sm font-medium ${
              statusColor[job.status]
            }`}
          >
            {job.status}
          </span>
        </div>
      </div>

      {/* DETAILS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT */}
        <div className="card space-y-3">
          <Detail label="Employer" value={job.employer?.name || "—"} />
          <Detail label="Employer Email" value={job.employer?.email || "—"} />
          <Detail label="Job Type" value={job.type} />
          <Detail label="Location" value={job.location} />
          <Detail label="Experience" value={job.experience} />
          <Detail label="Salary" value={job.salary} />
          <Detail
            label="Posted On"
            value={new Date(job.createdAt).toLocaleDateString()}
          />
        </div>

        {/* RIGHT */}
        <div className="card">
          <h3 className="font-semibold mb-2">Required Skills</h3>

          <div className="flex flex-wrap gap-2">
            {job.skills?.length > 0 ? (
              job.skills.map((skill) => (
                <span
                  key={skill._id}
                  className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700"
                >
                  {skill.name}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-500">No skills listed</span>
            )}
          </div>
        </div>
      </div>
      <div className="card space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Job Description</h3>

        <p className="text-sm text-gray-700 leading-relaxed">
          {job.description || "No description provided."}
        </p>
      </div>

      <div className="card space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Job Requirements
        </h3>

        {job.keyResponsibilities?.length > 0 ? (
          <ul className="space-y-3 ">
            {job?.keyResponsibilities.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-sm text-gray-700"
              >
                <FaCheckCircle size={18} className="text-indigo-600 mt-1 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 text-center">No requirements mentioned.</p>
        )}
      </div>

      <div className="card space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Professional Skills
        </h3>

        {job?.professionalSkills?.length > 0 ? (
          <ul className="space-y-3 ">
            {job.professionalSkills.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-sm text-gray-700"
              >
                <FaCheckCircle size={18} className="text-indigo-600 mt-1 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No skills listed.</p>
        )}
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3">
        {job.status === "PENDING" && (
          <>
            <button
              onClick={() => openActionModal("approve")}
              className="btn-primary flex items-center gap-1"
            >
              <CheckCircleIcon className="w-4 h-4" />
              Approve Job
            </button>

            <button
              onClick={() => openActionModal("reject")}
              className="btn-danger flex items-center gap-1"
            >
              <XCircleIcon className="w-4 h-4" />
              Reject Job
            </button>
          </>
        )}

        {job.status === "ACTIVE" && (
          <button
            onClick={() => openActionModal("block")}
            className="btn-danger flex items-center gap-1"
          >
            <NoSymbolIcon className="w-4 h-4" />
            Block Job
          </button>
        )}
      </div>

      {showModal && (
        <PopupModal
          title={
            actionType === "approve"
              ? "Approve Job"
              : actionType === "reject"
                ? "Reject Job"
                : "Block Job"
          }
          buttonText={
            actionType === "approve"
              ? "Approve"
              : actionType === "reject"
                ? "Reject"
                : "Block"
          }
          onConfirm={handleConfirmAction}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

const PopupModal = ({ title, buttonText, onConfirm, onClose }) => {
  return (
    <Modal title={title} onClose={onClose} maxWidth="max-w-sm">
      <p>Are you sure you want to {buttonText} this job?</p>
      <div className="flex justify-end gap-3 mt-4">
        <button onClick={onClose} className="px-4 py-2 border rounded">
          Cancel
        </button>
        <button onClick={onConfirm} className="btn-danger">
          {buttonText}
        </button>
      </div>
    </Modal>
  );
};

// SMALL COMPONENT
const Detail = ({ label, value }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export default JobsDetails;
