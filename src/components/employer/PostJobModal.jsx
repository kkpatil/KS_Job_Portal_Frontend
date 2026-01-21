import { useState } from "react";
import Modal from "../common/Modal";

const PostJobModal = ({ onClose, onSubmit }) => {
  const [job, setJob] = useState({
    title: "",
    type: "Full Time",
    location: "",
    experience: "",
    salary: "",
    category: "",
    description: "",
  });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!job.title || !job.location || !job.description) {
      alert("Please fill all required fields");
      return;
    }

    onSubmit({
      ...job,
      id: Date.now(),
      status: "Pending",
      applications: 0,
      postedOn: new Date().toLocaleDateString(),
    });

    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <h2 className="text-lg font-semibold mb-4">
        Post New Job
      </h2>

      <div className="space-y-4">
        <Input
          label="Job Title *"
          name="title"
          value={job.title}
          onChange={handleChange}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Job Type"
            name="type"
            value={job.type}
            onChange={handleChange}
            options={["Full Time", "Part Time", "Contract", "Internship"]}
          />

          <Input
            label="Location *"
            name="location"
            value={job.location}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Experience"
            name="experience"
            placeholder="e.g. 2-4 Years"
            value={job.experience}
            onChange={handleChange}
          />

          <Input
            label="Salary"
            name="salary"
            placeholder="e.g. ₹6 – ₹10 LPA"
            value={job.salary}
            onChange={handleChange}
          />
        </div>

        <Select
          label="Category"
          name="category"
          value={job.category}
          onChange={handleChange}
          options={[
            "IT & Software",
            "Design",
            "Marketing",
            "Finance",
            "Sales",
          ]}
        />

        <Textarea
          label="Job Description *"
          name="description"
          value={job.description}
          onChange={handleChange}
        />
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={onClose}
          className="px-4 py-2 border rounded-lg cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="btn-primary cursor-pointer"
        >
          Post Job
        </button>
      </div>
    </Modal>
  );
};

/* ================= REUSABLE INPUTS ================= */

const Input = ({
  label,
  name,
  value,
  onChange,
  placeholder = "",
}) => (
  <div>
    <label className="block text-sm mb-1 text-gray-600">
      {label}
    </label>
    <input
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className="w-full border px-4 py-2 rounded-lg text-sm"
    />
  </div>
);

const Select = ({
  label,
  name,
  value,
  onChange,
  options,
}) => (
  <div>
    <label className="block text-sm mb-1 text-gray-600">
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border px-4 py-2 rounded-lg text-sm"
    >
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const Textarea = ({
  label,
  name,
  value,
  onChange,
}) => (
  <div>
    <label className="block text-sm mb-1 text-gray-600">
      {label}
    </label>
    <textarea
      rows="4"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border px-4 py-2 rounded-lg text-sm"
    />
  </div>
);

export default PostJobModal;
