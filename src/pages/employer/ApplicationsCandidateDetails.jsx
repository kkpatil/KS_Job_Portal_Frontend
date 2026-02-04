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
  useHireApplicationMutation,
} from "../../services/endpoints/applicationsApi";
import { toast } from "react-toastify";

const statusColor = {
  NEW: "bg-blue-100 text-blue-700",
  SHORTLISTED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
  HIRED: "bg-emerald-100 text-emerald-700",
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
  const [hire, { isLoading: hiring }] = useHireApplicationMutation();

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
  const fullName =
    candidate?.firstName || candidate?.lastName
      ? `${candidate?.firstName || ""} ${candidate?.lastName || ""}`.trim()
      : candidate?.name || "Candidate";
  const resumeName =
    candidate?.resumeName ||
    (candidate?.resume ? candidate.resume.split("/").pop() : "Resume");

  const handleConfirm = async () => {
    try {
      if (action === "SHORTLIST") {
        await shortlist(_id).unwrap();
        toast.success("Candidate shortlisted successfully");
      
      }

      if (action === "REJECT") {
        await reject(_id).unwrap();
       
        toast.success("Candidate rejected successfully");
      }
      if (action === "HIRE") {
        await hire(_id).unwrap();
        toast.success("Candidate hired successfully");
      }
    }catch(error) {
      toast.error(error.data.message || "Failed to perform action");
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
          <h1 className="text-2xl font-bold">{fullName}</h1>
          <p className="text-gray-500">
            Applied for <b>{job.title}</b>
          </p>
        </div>

        <span
          className={`px-4 py-1 rounded-full text-sm ${
            statusColor[status] || "bg-gray-100 text-gray-700"
          }`}
        >
          {status}
        </span>
      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card space-y-3">
          <Detail label="First Name" value={candidate.firstName || "—"} />
          <Detail label="Last Name" value={candidate.lastName || "—"} />
          <Detail label="Email" value={candidate.email} />
          <Detail label="Phone" value={candidate.phone || "—"} />
          <Detail label="Current Role" value={candidate.currentRole || "—"} />
          <Detail label="Experience" value={candidate.experience || "—"} />
          <Detail
            label="Expected Salary"
            value={candidate.expectedSalary || "—"}
          />
          <Detail
            label="Preferred Location"
            value={candidate.preferredLocation || "—"}
          />
          <Detail
            label="Applied On"
            value={new Date(createdAt).toDateString()}
          />
        </div>

        <div className="card">
          <h3 className="font-semibold mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {candidate.skills?.length ? (
              candidate.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-xs bg-indigo-100 text-indigo-700"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-500">No skills</span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card space-y-3">
          <Detail label="Country" value={candidate.country || "—"} />
          <Detail label="State" value={candidate.state || "—"} />
          <Detail label="Zip Code" value={candidate.zipCode || "—"} />
          <Detail label="Address" value={candidate.address || "—"} />
        </div>

        <div className="card space-y-3">
          <Detail label="Notice Period" value={candidate.noticePeriod || "—"} />
          <Detail
            label="Employment Type"
            value={candidate.employmentType || "—"}
          />
          <Detail label="Availability" value={candidate.availability || "—"} />
          <Detail label="Relocate" value={candidate.relocate || "—"} />
          <Detail label="Preferred Shift" value={candidate.preferredShift || "—"} />
          <Detail
            label="Work Authorization"
            value={candidate.workAuthorization || "—"}
          />
        </div>
      </div>

      {(candidate.linkedin || candidate.github || candidate.portfolio) && (
        <div className="card space-y-3">
          <h3 className="font-semibold mb-2">Links</h3>
          <Detail label="LinkedIn" value={candidate.linkedin || "—"} />
          <Detail label="GitHub" value={candidate.github || "—"} />
          <Detail label="Portfolio" value={candidate.portfolio || "—"} />
        </div>
      )}

      {candidate.about && (
        <div className="card">
          <h3 className="font-semibold mb-2">About</h3>
          <p className="text-sm text-gray-600">{candidate.about}</p>
        </div>
      )}

      {/* RESUME */}
      <div className="card flex justify-between items-center">
        <div>
          <p className="font-medium">Resume</p>
          <p className="text-sm text-gray-500">
            {resumeName}
          </p>
        </div>

        <div className="flex gap-4">
          <a
            href={candidate?.resume || "#"}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary flex items-center gap-1"
          >
            <ViewfinderCircleIcon className="w-4 h-4" />
            View
          </a>

          <a
            href={`${API_URL}/api/applications/${_id}/resume`}
            className="btn-secondary flex items-center gap-1"
          >
            <DocumentArrowDownIcon className="w-4 h-4" />
            Download
          </a>
        </div>
      </div>

      {/* ACTIONS – ONLY WHEN NEW/SHORTLISTED */}
      {(status === "NEW" || status === "SHORTLISTED") && (
        <div className="flex justify-end gap-3">
          {status !== "SHORTLISTED" && (
            <button
              onClick={() => setAction("SHORTLIST")}
              disabled={shortlisting || rejecting || hiring}
              className="btn-primary flex items-center gap-1"
            >
              <CheckCircleIcon className="w-4 h-4" />
              Shortlist
            </button>
          )}

          {status !== "REJECTED" && (
            <button
              onClick={() => setAction("REJECT")}
              disabled={shortlisting || rejecting || hiring}
              className="btn-danger flex items-center gap-1"
            >
              <XCircleIcon className="w-4 h-4" />
              Reject
            </button>
          )}

          {status === "SHORTLISTED" && (
            <button
              onClick={() => setAction("HIRE")}
              disabled={shortlisting || rejecting || hiring}
              className="btn-secondary flex items-center gap-1"
            >
              <CheckCircleIcon className="w-4 h-4" />
              Hire
            </button>
          )}
        </div>
      )}

      {/* CONFIRM MODAL */}
      {action && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm space-y-4">
            <h3 className="text-lg font-semibold">
              {action === "REJECT"
                ? "Reject Candidate?"
                : action === "HIRE"
                  ? "Hire Candidate?"
                  : "Shortlist Candidate?"}
            </h3>

            <p className="text-sm text-gray-500">
              Are you sure you want to{" "}
              {action === "REJECT"
                ? "reject"
                : action === "HIRE"
                  ? "hire"
                  : "shortlist"}{" "}
              this candidate?
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
                  action === "REJECT"
                    ? "btn-danger"
                    : action === "HIRE"
                      ? "btn-secondary"
                      : "btn-primary"
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
