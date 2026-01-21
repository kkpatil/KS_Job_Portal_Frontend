import { useParams, Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  UsersIcon,
  PencilSquareIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import EditJobModal from "../../components/employer/EditJobModal";

/* ================= DUMMY DATA ================= */
const dummyJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    type: "Full Time",
    location: "Remote",
    experience: "2-4 Years",
    salary: "₹6 – ₹10 LPA",
    category: "IT & Software",
    status: "Active",
    applications: 28,
    postedOn: "12 Feb 2026",
    description:
      "We are looking for a skilled Frontend Developer with strong knowledge of React.js, Tailwind CSS, and modern UI development.",
    skills: ["React", "JavaScript", "HTML", "CSS", "Tailwind"],
  },
  {
    id: 2,
    title: "Backend Developer",
    type: "Part Time",
    location: "Bangalore",
    experience: "3-6 Years",
    salary: "₹8 – ₹12 LPA",
    category: "IT & Software",
    status: "Pending",
    applications: 14,
    postedOn: "08 Feb 2026",
    description:
      "Backend developer needed with strong Node.js, MongoDB and API experience.",
    skills: ["Node.js", "MongoDB", "Express"],
  },
];

const statusColor = {
  Active: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Closed: "bg-red-100 text-red-700",
};

const EmployerJobDetails = () => {
  const { id } = useParams();
  const job = dummyJobs.find((j) => j.id === Number(id));
  const [editModal,setEditModal] = useState(false);

  if (!job) {
    return (
      <div className="card text-center">
        <p className="text-gray-500">Job not found</p>
        <Link to="/employer/jobs" className="text-indigo-600 underline">
          Back to My Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* BACK */}
      <Link
        to="/employer/jobs"
        className="flex items-center gap-1 text-sm text-gray-600 hover:text-black"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Back to My Jobs
      </Link>

      {/* HEADER */}
      <div className="card flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{job.title}</h1>
          <p className="text-gray-500">
            {job.location} • {job.type}
          </p>
        </div>

        <span
          className={`px-4 py-1 rounded-full text-sm ${statusColor[job.status]}`}
        >
          {job.status}
        </span>
      </div>

      {/* DETAILS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT */}
        <div className="card space-y-3">
          <Detail label="Category" value={job.category} />
          <Detail label="Experience" value={job.experience} />
          <Detail label="Salary" value={job.salary} />
          <Detail label="Applications" value={job.applications} />
          <Detail label="Posted On" value={job.postedOn} />
        </div>

        {/* RIGHT */}
        <div className="card">
          <h3 className="font-semibold mb-2">Job Description</h3>
          <p className="text-sm text-gray-600 mb-4">
            {job.description}
          </p>

          <h3 className="font-semibold mb-2">Required Skills</h3>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, index) => (
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
        <button
          onClick={()=> setEditModal(true)}
          className="btn-secondary flex items-center gap-1"
        >
          <PencilSquareIcon className="w-4 h-4" />
          Edit Job
        </button>

        <Link
          to={`/employer/jobs/${job.id}/applications`}
          className="btn-primary flex items-center gap-1"
        >
          <UsersIcon className="w-4 h-4" />
          View Applications
        </Link>

        {job.status === "Active" && (
          <button className="btn-danger flex items-center gap-1">
            <NoSymbolIcon className="w-4 h-4" />
            Close Job
          </button>
        )}
      </div>
      {editModal && (
      <EditJobModal
        job={job}
        onClose={() => setEditModal(false)}
      />
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

export default EmployerJobDetails;
