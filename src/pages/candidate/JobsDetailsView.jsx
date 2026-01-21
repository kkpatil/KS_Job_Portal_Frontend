import { useParams, Link } from "react-router-dom";
import {
  MapPinIcon,
  BriefcaseIcon,
  CurrencyRupeeIcon,
  BookmarkIcon,
  PaperAirplaneIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import ApplyJobModal from "../../components/candidate/ApplyJobModal";

/* ================= DUMMY JOB DATA ================= */
const dummyJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechNova Pvt Ltd",
    location: "Remote",
    type: "Full Time",
    experience: "2-4 Years",
    salary: "₹6 – ₹10 LPA",
    description:
      "We are looking for a Frontend Developer skilled in React, Tailwind CSS, and modern UI practices.",
    skills: ["React", "JavaScript", "HTML", "CSS", "Tailwind"],
    postedOn: "12 Feb 2026",
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "CloudPeak",
    location: "Bangalore",
    type: "Part Time",
    experience: "3-6 Years",
    salary: "₹8 – ₹12 LPA",
    description:
      "Backend developer needed with strong Node.js, MongoDB, and API experience.",
    skills: ["Node.js", "MongoDB", "Express"],
    postedOn: "10 Feb 2026",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Bright Solutions",
    location: "Delhi",
    type: "Contract",
    experience: "1-2 Years",
    salary: "₹4 – ₹6 LPA",
    description:
      "We are hiring a UI/UX Designer skilled in Figma and Adobe XD.",
    skills: ["Figma", "Adobe XD"],
    postedOn: "08 Feb 2026",
  }
];

const JobDetailsView = () => {
  const { id } = useParams();
  const job = dummyJobs.find((j) => j.id === Number(id));

  const [saved, setSaved] = useState(false);
  const [showApply, setShowApply] = useState(false);
const [applied, setApplied] = useState(false);


  if (!job) {
    return (
      <div className="card text-center">
        <p className="text-gray-500">Job not found</p>
        <Link to="/candidate/jobs" className="text-indigo-600 underline">
          Back to Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* BACK */}
      <Link
        to="/candidate/jobs"
        className="flex items-center gap-1 text-sm text-gray-600 hover:text-black"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Back to Jobs
      </Link>

      {/* HEADER */}
      <div className="card flex flex-col md:flex-row md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{job.title}</h1>
          <p className="text-gray-500">{job.company}</p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-3">
            <span className="flex items-center gap-1">
              <MapPinIcon className="w-4 h-4" />
              {job.location}
            </span>
            <span className="flex items-center gap-1">
              <BriefcaseIcon className="w-4 h-4" />
              {job.type}
            </span>
            <span className="flex items-center gap-1">
              <CurrencyRupeeIcon className="w-4 h-4" />
              {job.salary}
            </span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3 h-12 mt-6 ">
          <button
            onClick={() => setSaved(!saved)}
            className={`px-4 py-2 rounded-lg border flex items-center gap-1 ${
              saved ? "text-indigo-600 border-indigo-600" : ""
            }`}
          >
            <BookmarkIcon className="w-4 h-4" />
            {saved ? "Saved" : "Save"}
          </button>

          <button
            onClick={() => setShowApply(true)}
            disabled={applied}
            className={`btn-primary flex items-center  gap-1 ${
              applied ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            <PaperAirplaneIcon className="w-4 h-4" />
            {applied ? "Applied" : "Apply Now"}
          </button>
        </div>
      </div>

      {/* DETAILS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="md:col-span-2 space-y-6">
          <div className="card">
            <h2 className="font-semibold mb-2">Job Description</h2>
            <p className="text-sm text-gray-600">
              {job.description}
            </p>
          </div>

          <div className="card">
            <h2 className="font-semibold mb-2">Required Skills</h2>
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

        {/* RIGHT */}
        <div className="card space-y-3 text-sm">
          <Detail label="Experience" value={job.experience} />
          <Detail label="Salary" value={job.salary} />
          <Detail label="Job Type" value={job.type} />
          <Detail label="Posted On" value={job.postedOn} />
        </div>
      </div>
      {showApply && (
  <ApplyJobModal
    jobTitle={job.title}
    onClose={() => setShowApply(false)}
    onApply={() => setApplied(true)}
  />
)}

    </div>
  );
};

/* ================= SMALL COMPONENT ================= */
const Detail = ({ label, value }) => (
  <div className="flex justify-between">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export default JobDetailsView;
