import { useParams, Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
  DocumentArrowDownIcon,
  ViewfinderCircleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import {
  useGetApplicationByIdQuery,
  useShortlistApplicationMutation,
  useRejectApplicationMutation,
} from "../../services/endpoints/applicationsApi";

const statusColor = {
  NEW: "bg-blue-100 text-blue-700",
  SHORTLISTED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
};

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const ApplicationsCandidateDetails = () => {
  const { id } = useParams();
  const [action, setAction] = useState(null);

  const { data, isLoading, isError } = useGetApplicationByIdQuery(id);

  const [shortlist, { isLoading: shortlisting }] =
    useShortlistApplicationMutation();
  const [reject, { isLoading: rejecting }] =
    useRejectApplicationMutation();

  if (isLoading) {
    return <div className="card text-center">Loading...</div>;
  }

  if (isError || !data?.success) {
    return (
      <div className="card text-center">
        <p className="text-gray-500">Application not found</p>
        <Link to={-1} className="text-indigo-600 underline">
          Back
        </Link>
      </div>
    );
  }

  const application = data.data;
  const { candidate, job, status, createdAt, _id } = application;

  const handleConfirm = async () => {
    try {
      if (action === "SHORTLIST") {
        await shortlist(_id).unwrap();
      }

      if (action === "REJECT") {
        await reject(_id).unwrap();
      }
    } finally {
      setAction(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* BACK */}
      <Link
        to={-1}
        className="flex items-center gap-1 text-sm text-gray-100 btn-primary w-fit"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Back
      </Link>

      {/* HEADER */}
      <div className="card flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{candidate.name}</h1>
          <p className="text-gray-500">
            Applied for <b>{job.title}</b>
          </p>
        </div>

        <span
          className={`px-4 py-1 rounded-full text-sm ${statusColor[status]}`}
        >
          {status}
        </span>
      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card space-y-3">
          <Detail label="Email" value={candidate.email} />
          <Detail label="Experience" value={candidate.experience || "—"} />
          <Detail
            label="Applied On"
            value={new Date(createdAt).toDateString()}
          />
        </div>

        <div className="card">
          <h3 className="font-semibold mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {candidate.skills?.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-xs bg-indigo-100 text-indigo-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* RESUME */}
      <div className="card flex justify-between items-center">
        <div>
          <p className="font-medium">Resume</p>
          <p className="text-sm text-gray-500">
            {candidate.resume?.split("/").pop()}
          </p>
        </div>

        <div className="flex gap-4">
          <a
            href={`${API_URL}/${candidate?.resume}`}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary flex items-center gap-1"
          >
            <ViewfinderCircleIcon className="w-4 h-4" />
            View
          </a>

          <a
            href={`${API_URL}/applications/${_id}/download`}
            className="btn-secondary flex items-center gap-1"
          >
            <DocumentArrowDownIcon className="w-4 h-4" />
            Download
          </a>
        </div>
      </div>

      {/* ACTIONS – ONLY WHEN NEW */}
      {status === "NEW" && (
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setAction("SHORTLIST")}
            disabled={shortlisting || rejecting}
            className="btn-primary flex items-center gap-1"
          >
            <CheckCircleIcon className="w-4 h-4" />
            Shortlist
          </button>

          <button
            onClick={() => setAction("REJECT")}
            disabled={shortlisting || rejecting}
            className="btn-danger flex items-center gap-1"
          >
            <XCircleIcon className="w-4 h-4" />
            Reject
          </button>
        </div>
      )}

      {/* CONFIRM MODAL */}
      {action && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm space-y-4">
            <h3 className="text-lg font-semibold">
              {action === "REJECT"
                ? "Reject Candidate?"
                : "Shortlist Candidate?"}
            </h3>

            <p className="text-sm text-gray-500">
              Are you sure you want to{" "}
              {action === "REJECT" ? "reject" : "shortlist"} this candidate?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setAction(null)}
                className="btn-secondary"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirm}
                className={
                  action === "REJECT" ? "btn-danger" : "btn-primary"
                }
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export default ApplicationsCandidateDetails;
