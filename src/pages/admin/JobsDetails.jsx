import { useParams, Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";

const dummyJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechNova Pvt Ltd",
    employer: "Rahul Sharma",
    employerEmail: "rahul@technova.com",
    type: "Full Time",
    location: "Remote",
    experience: "2-4 Years",
    salary: "₹6 – ₹10 LPA",
    applications: 34,
    status: "Pending",
    postedOn: "10 Feb 2025",
    description:
      "We are looking for a skilled Frontend Developer with strong knowledge of React.js and modern UI frameworks.",
    skills: ["React", "JavaScript", "HTML", "CSS", "Tailwind"],
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "CloudPeak",
    employer: "Neha Patel",
    employerEmail: "neha@cloudpeak.com",
    type: "Part Time",
    location: "Bangalore",
    experience: "3-6 Years",
    salary: "₹8 – ₹12 LPA",
    applications: 18,
    status: "Active",
    postedOn: "08 Feb 2025",
    description:
      "Seeking a Backend Developer experienced in Node.js, MongoDB, and API development.",
    skills: ["Node.js", "MongoDB", "Express", "REST API"],
  },
];

const statusColor = {
  Active: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Blocked: "bg-red-100 text-red-700",
};

const JobsDetails = () => {
  const { id } = useParams();
  const job = dummyJobs.find((j) => j.id === Number(id));

  if (!job) {
    return (
      <div className="card text-center ">
        <p className="text-gray-500">Job not found</p>
        <Link to="/admin/jobs" className="text-indigo-600 underline">
          Go back
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* back */}
      <Link
        to="/admin/jobs"
        className="flex items-center gap-1 text-sm text-gray-100 hover:text-white w-fit border px-2 py-2 rounded-md bg-black/90 hover:bg-black/80 transition-all duration-300 hover:scale-102"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Back to Jobs
      </Link>

      {/* header */}
      <div className="card">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{job.title}</h1>
            <p className="text-gray-500">{job.company}</p>
          </div>

          <span
            className={`px-4 py-1 rounded-full text-sm font-medium ${statusColor[job.status]}`}
          >
            {job.status}
          </span>
        </div>
      </div>

      {/* details grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* left */}
        <div className="card space-y-3">
          <Detail label="Employer" value={job.employer} />
          <Detail label="Employer Email" value={job.employerEmail} />
          <Detail label="Job Type" value={job.type} />
          <Detail label="Location" value={job.location} />
          <Detail label="Experience" value={job.experience} />
          <Detail label="Salary" value={job.salary} />
          <Detail label="Applications" value={job.applications} />
          <Detail label="Posted On" value={job.postedOn} />
        </div>

        {/* right */}
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
                className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* actions */}
      <div className="flex justify-end gap-3">
        {job.status !== "Active" ? (
          <button className="btn-primary flex items-center gap-1 cursor-pointer">
            <CheckCircleIcon className="w-4 h-4" />
            Approve Job
          </button>
        ) : (
          <button className="btn-danger flex items-center gap-1 cursor-pointer">
            <NoSymbolIcon className="w-4 h-4" />
            Block Job
          </button>
        )}
      </div>
    </div>
  );
};

// small components 
const Detail = ({ label, value }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export default JobsDetails;
