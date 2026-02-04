import { useState } from "react";
import Modal from "../../components/common/Modal";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

const ApplyJobModal = ({
  jobTitle,
  onClose,
  onApply,
  resumeName,
}) => {
  const [coverLetter, setCoverLetter] = useState("");

  const handleSubmit = () => {
    if (!resumeName) {
      toast.warning(
        "Please upload your resume in Profile first",
      );
      return;
    }

    onApply({ coverLetter });
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <h2 className="text-lg font-semibold mb-1">
        Apply for {jobTitle}
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Submit your resume and cover letter
      </p>

      {/* Resume (from Profile) */}
      <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
        <p className="text-xs uppercase tracking-wide text-gray-500">
          Resume (from Profile)
        </p>
        <p className="text-sm text-gray-800">
          {resumeName || "No resume uploaded yet"}
        </p>
        {!resumeName && (
          <p className="mt-1 text-xs text-red-600">
            Please upload your resume in Profile to apply.
          </p>
        )}
      </div>

      {/* Cover Letter */}
      <div className="mb-4">
        <label className="block text-sm mb-1 text-gray-600">
          Cover Letter (optional)
        </label>
        <textarea
          rows="4"
          placeholder="Write a short cover letter..."
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={onClose}
          className="px-4 py-2 border rounded-lg"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="btn-primary flex items-center gap-1"
        >
          <PaperAirplaneIcon className="w-4 h-4" />
          Apply Job
        </button>
      </div>
    </Modal>
  );
};

export default ApplyJobModal;
