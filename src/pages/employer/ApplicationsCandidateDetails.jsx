import { useParams, Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
  DocumentArrowDownIcon,
  ViewfinderCircleIcon,
} from "@heroicons/react/24/outline";

/* ================= DUMMY APPLICATION DATA ================= */
const dummyApplications = [
  {
    id: 1,
    candidate: "Amit Verma",
    email: "amit@gmail.com",
    phone: "+91 98765 43210",
    experience: "2 Years",
    skills: ["React", "JavaScript", "HTML", "CSS"],
    appliedOn: "15 Feb 2026",
    status: "New",
    jobTitle: "Frontend Developer",
    resume: "amit-verma-resume.pdf",
    coverLetter:
      "I am very interested in this role and have hands-on experience with React and modern frontend tools.",
  },
  {
    id: 2,
    candidate: "Neha Sharma",
    email: "neha@gmail.com",
    phone: "+91 91234 56789",
    experience: "3 Years",
    skills: ["Node.js", "MongoDB", "Express"],
    appliedOn: "14 Feb 2026",
    status: "Shortlisted",
    jobTitle: "Backend Developer",
    resume: "neha-sharma-resume.pdf",
    coverLetter:
      "I have strong backend experience and would love to contribute to your team.",
  },
];

const statusColor = {
  New: "bg-blue-100 text-blue-700",
  Shortlisted: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

const ApplicationsCandidateDetails = () => {
  const { id } = useParams();
  const application = dummyApplications.find(
    (app) => app.id === Number(id)
  );

  if (!application) {
    return (
      <div className="card text-center">
        <p className="text-gray-500">Application not found</p>
        <Link
          to={-1}
          className="text-indigo-600 underline"
        >
          Back
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      <Link
        to={-1}
        className="flex items-center gap-1 text-sm text-gray-100 hover:text-white btn-primary w-fit "
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Back
      </Link>

      {/* HEADER */}
      <div className="card flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">
            {application.candidate}
          </h1>
          <p className="text-gray-500">
            Applied for <b>{application.jobTitle}</b>
          </p>
        </div>

        <span
          className={`px-4 py-1 rounded-full text-sm ${statusColor[application.status]}`}
        >
          {application.status}
        </span>
      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT */}
        <div className="card space-y-3">
          <Detail label="Email" value={application.email} />
          <Detail label="Phone" value={application.phone} />
          <Detail label="Experience" value={application.experience} />
          <Detail label="Applied On" value={application.appliedOn} />
        </div>

        {/* RIGHT */}
        <div className="card">
          <h3 className="font-semibold mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {application.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-xs bg-indigo-100 text-indigo-700"
              >
                {skill}
              </span>
            ))}
          </div>

          <h3 className="font-semibold mb-2">
            Cover Letter
          </h3>
          <p className="text-sm text-gray-600">
            {application.coverLetter}
          </p>
        </div>
      </div>

      {/* RESUME */}
      <div className="card flex justify-between items-center">
        <div>
          <p className="font-medium">Resume</p>
          <p className="text-sm text-gray-500">
            {application.resume}
          </p>
        </div>
        <div className="flex gap-6">
 
        <button className="btn-secondary flex items-center gap-1 cursor-pointer">
          <ViewfinderCircleIcon className="w-4 h-4" />
          View
        </button>
        <button className="btn-secondary flex items-center gap-1 cursor-pointer">
          <DocumentArrowDownIcon className="w-4 h-4" />
          Download
        </button>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3">
        {application.status !== "Shortlisted" && (
          <button className="btn-primary flex items-center gap-1  cursor-pointer">
            <CheckCircleIcon className="w-4 h-4" />
            Shortlist
          </button>
        )}

        {application.status !== "Rejected" && (
          <button className="btn-danger flex items-center gap-1 cursor-pointer">
            <XCircleIcon className="w-4 h-4" />
            Reject
          </button>
        )}
      </div>
    </div>
  );
};

/* ================= SMALL COMPONENT ================= */
const Detail = ({ label, value }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export default ApplicationsCandidateDetails;
