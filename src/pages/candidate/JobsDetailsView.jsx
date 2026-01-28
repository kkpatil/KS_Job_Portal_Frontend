import { useParams, Link } from "react-router-dom";
import {
  MapPinIcon,
  BriefcaseIcon,
  CurrencyRupeeIcon,
  BookmarkIcon,
  PaperAirplaneIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

import ApplyJobModal from "../../components/candidate/ApplyJobModal";
import { useGetJobByIdQuery } from "../../services/endpoints/jobApi";
import { useApplyJobMutation } from "../../services/endpoints/applicationsApi";
import { useToggleSaveJobMutation } from "../../services/endpoints/candidate/savedJobApi";

const JobDetailsView = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useGetJobByIdQuery(id);
  const [applyJob] = useApplyJobMutation();
  const [toggleSaveJob] = useToggleSaveJobMutation();

  const job = data;

  const [saved, setSaved] = useState(false);
  const [showApply, setShowApply] = useState(false);

  // ✅ sync saved state
  useEffect(() => {
    if (job?.isSaved) {
      setSaved(true);
    }
  }, [job]);

  // ✅ APPLY JOB
  const handleApply = async () => {
    try {
      await applyJob({
        jobId: id,
        companyId: job?.employer?._id,
      }).unwrap();

      setShowApply(false);
    } catch (err) {
      alert(err?.data?.message || "Failed to apply");
    }
  };

  // ✅ SAVE / UNSAVE JOB
  const handleSave = async () => {
    try {
      const res = await toggleSaveJob(id).unwrap();
      setSaved(res?.saved ?? !saved);
    } catch (err) {
      alert(err?.data?.message || "Failed to save job");
    }
  };

  /* ================= STATES ================= */

  if (isLoading) {
    return <div className="card text-center">Loading job...</div>;
  }

  if (error || !job) {
    return (
      <div className="card text-center">
        <p className="text-gray-500">Job not found</p>
        <Link to="/candidate/jobs" className="text-indigo-600 underline">
          Back to Jobs
        </Link>
      </div>
    );
  }

  const applied = job.isApplied; // ⭐ single source of truth

  return (
    <div className="space-y-6">
      {/* BACK */}
      <Link to="/candidate/jobs" className="flex items-center gap-1 text-sm">
        <ArrowLeftIcon className="w-4 h-4" />
        Back to Jobs
      </Link>

      {/* HEADER */}
      <div className="card flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{job.title}</h1>
          <p className="text-gray-500">{job?.employer.companyName}</p>

          <div className="flex gap-4 text-sm text-gray-600 mt-3">
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
            <a href={`mailto:${job.employer.contactEmail}`}  className="flex items-center gap-1 hover:underline text-blue-600">
              <PaperAirplaneIcon className="w-4 h-4" />
              {job.employer.contactEmail}
            </a>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3 h-12 mt-6">
          <button
            onClick={handleSave}
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
            className={`btn-primary flex items-center gap-1 ${
              applied ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            <PaperAirplaneIcon className="w-4 h-4" />
            {applied ? "Applied" : "Apply Now"}
          </button>
        </div>
      </div>

      {/* DETAILS */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="card">
            <h2 className="font-semibold mb-2">Job Description</h2>
            <p className="text-sm text-gray-600">{job.description}</p>
          </div>

          <div className="card">
            <h2 className="font-semibold mb-2">Required Skills</h2>
            <div className="flex flex-wrap gap-2">
              {job.skills?.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full text-xs bg-indigo-100 text-indigo-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="card space-y-3 text-sm">
          <Detail label="Experience" value={job.experience} />
          <Detail label="Salary" value={job.salary} />
          <Detail label="Job Type" value={job.type} />
          <Detail label="Posted On" value={job.createdAt?.slice(0, 10)} />
        </div>
      </div>

      {showApply && !applied && (
        <ApplyJobModal
          jobTitle={job.title}
          onClose={() => setShowApply(false)}
          onApply={handleApply}
        />
      )}
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div className="flex justify-between">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export default JobDetailsView;
