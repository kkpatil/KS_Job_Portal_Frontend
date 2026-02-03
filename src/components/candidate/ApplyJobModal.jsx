import { useState } from "react";
import Modal from "../../components/common/Modal";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

const ApplyJobModal = ({ jobTitle, onClose, onApply }) => {
  const [form, setForm] = useState({
    coverLetter: "",
    resume: null,
  });

  const handleFileChange = (e) => {
    setForm({ ...form, resume: e.target.files[0] });
  };

  const handleSubmit = () => {
    if (!form.resume) {
      toast.warning("Please upload your resume");
      return;
    }

    // dummy submit
    onApply({
      coverLetter: form.coverLetter,
      resume: form.resume.name,
      appliedOn: new Date().toLocaleDateString(),
    });

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

      {/* Resume Upload */}
      <div className="mb-4">
        <label className="block text-sm mb-1 text-gray-600">
          Upload Resume (PDF / DOC) *
        </label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />
        {form.resume && (
          <p className="text-xs text-green-600 mt-1">
            Selected: {form.resume.name}
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
          value={form.coverLetter}
          onChange={(e) =>
            setForm({ ...form, coverLetter: e.target.value })
          }
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
