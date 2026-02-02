import { useState } from "react";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  CheckCircleIcon,
  NoSymbolIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Modal from "../../components/common/Modal";
import {
  useGetAllJobsQuery,
  useApproveJobMutation,
  useRejectJobMutation,
  useBlockJobMutation,
  useDeleteJobMutation,
  useUpdateJobMutation,
  useGetCategoriesQuery,
  useGetSkillsByCategoryQuery,
} from "../../services/endpoints/jobApi";

const statusColor = {
  ACTIVE: "bg-green-100 text-green-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  BLOCKED: "bg-red-100 text-red-700",
  REJECTED: "bg-gray-200 text-gray-600",
};

const Jobs = () => {
  const [actionModal, setActionModal] = useState({
    open: false,
    type: null, // "approve" | "reject" | "block"
    jobId: null,
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteJobId, setDeleteJobId] = useState(null);

  const { data: jobsData = [], isLoading, isError } = useGetAllJobsQuery();
  const [deleteJob] = useDeleteJobMutation();
  const jobs = Array.isArray(jobsData) ? jobsData : [];

  const [approveJob] = useApproveJobMutation();
  const [rejectJob] = useRejectJobMutation();
  const [blockJob] = useBlockJobMutation();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredJobs = jobs.filter((job) => {
    const matchSearch =
      job.title?.toLowerCase().includes(search.toLowerCase()) ||
      job.employer?.name?.toLowerCase().includes(search.toLowerCase());

    const matchStatus = statusFilter === "All" || job.status === statusFilter;

    return matchSearch && matchStatus;
  });

  const openActionModal = (type, jobId) => {
    setActionModal({
      open: true,
      type,
      jobId,
    });
  };

  const closeActionModal = () => {
    setActionModal({
      open: false,
      type: null,
      jobId: null,
    });
  };

  const handleConfirmAction = async () => {
    try {
      const { type, jobId } = actionModal;

      if (type === "approve") {
        await approveJob(jobId).unwrap();
      }

      if (type === "reject") {
        await rejectJob(jobId).unwrap();
      }

      if (type === "block") {
        await blockJob(jobId).unwrap();
      }

      closeActionModal();
    } catch (error) {
      console.error("Action failed", error);
      closeActionModal();
    }
  };

  return (
    <div className="card">
      {/* HEADER */}
      <div className="flex md:flex-row flex-col gap-3 justify-between mb-6">
        <h2 className="text-xl font-semibold">Jobs</h2>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search job or employer"
            className="border px-4 py-2 rounded-lg text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border px-4 py-2 rounded-lg text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="ACTIVE">Active</option>
            <option value="PENDING">Pending</option>
            <option value="BLOCKED">Blocked</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {isLoading && <p className="text-center py-6">Loading jobs...</p>}
      {isError && (
        <p className="text-center py-6 text-red-500">Failed to load jobs</p>
      )}

      {/* JOB CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredJobs.length === 0 && (
          <p className="text-center py-6 ">No jobs found</p>
        )}
        {filteredJobs.map((job) => (
          <div
            key={job._id}
            className="rounded-xl p-5 tabl shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between mb-3">
              <div>
                <h3 className="font-semibold">{job.title}</h3>
                <p className="text-sm text-gray-500">
                  {job.employer?.name || "—"}
                </p>
              </div>

              <span
                className={`px-3 py-2 rounded-md text-xs ${
                  statusColor[job.status]
                }`}
              >
                {job.status}
              </span>
            </div>

            <div className="text-sm text-gray-600 space-y-1 mb-4">
              <p>
                <b>Type:</b> {job.type}
              </p>
              <p>
                <b>Location:</b> {job.location}
              </p>
              <p>
                <b>Experience:</b> {job.experience}
              </p>
              <p>
                <b>Salary:</b> {job.salary}
              </p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex justify-between items-center border-t pt-3">
              <div className="flex gap-3">
                <Link to={`/admin/jobs/${job?._id}`}>
                  <EyeIcon className="w-5 h-5 text-blue-600" />
                </Link>

                <button
                  onClick={() => {
                    setSelectedJob(job);
                    setIsEditModalOpen(true);
                  }}
                >
                  <PencilSquareIcon className="w-5 h-5 text-green-600 cursor-pointer" />
                </button>

                <button
                  onClick={() => {
                    setDeleteJobId(job._id);
                    setIsDeleteModalOpen(true);
                  }}
                >
                  <TrashIcon className="w-5 h-5 text-red-600 cursor-pointer" />
                </button>
              </div>

              {/* STATUS BASED ACTIONS */}
              <div className="flex gap-2">
                {job.status === "PENDING" && (
                  <>
                    <button
                      onClick={() => openActionModal("approve", job._id)}
                      className="flex items-center gap-1 text-green-600 text-sm"
                    >
                      <CheckCircleIcon className="w-4 h-4" />
                      Approve
                    </button>

                    <button
                      onClick={() => openActionModal("reject", job._id)}
                      className="flex items-center gap-1 text-red-600 text-sm"
                    >
                      <XCircleIcon className="w-4 h-4" />
                      Reject
                    </button>
                  </>
                )}

                {job.status === "ACTIVE" && (
                  <button
                    onClick={() => openActionModal("block", job._id)}
                    className="flex items-center gap-1 text-yellow-600 text-sm"
                  >
                    <NoSymbolIcon className="w-4 h-4" />
                    Block
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {isDeleteModalOpen && (
        <Modal
         maxWidth="max-w-sm"
          title="Confirm Delete"
          onClose={() => setIsDeleteModalOpen(null)}
        >
          <p>Are you sure you want to delete this job?</p>
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={() => setIsDeleteModalOpen(null)}
              className="border p-2 rounded cursor-pointer scale-100 hover:scale-95 transition"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                await deleteJob(deleteJobId).unwrap();
                setIsDeleteModalOpen(null);
              }}
              className="btn-danger cursor-pointer scale-100 hover:scale-95 transition flex items-center gap-1"
            >
              Delete
            </button>
          </div>
        </Modal>
      )}

      {actionModal.open && (
        <Modal
          maxWidth="max-w-md"
          title={
            actionModal.type === "approve"
              ? "Approve Job"
              : actionModal.type === "reject"
                ? "Reject Job"
                : "Block Job"
          }
          onClose={closeActionModal}
        >
          <p className="text-sm text-gray-600">
            Are you sure you want to <b>{actionModal.type}</b> this job?
          </p>

          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={closeActionModal}
              className="border px-4 py-2 rounded"
            >
              Cancel
            </button>

            <button
              onClick={handleConfirmAction}
              className={`px-4 py-2 rounded text-white ${
                actionModal.type === "approve"
                  ? "bg-green-600"
                  : actionModal.type === "reject"
                    ? "bg-red-600"
                    : "bg-yellow-600"
              }`}
            >
              Confirm
            </button>
          </div>
        </Modal>
      )}

      {isEditModalOpen && selectedJob && (
        <EditJobModal
          job={selectedJob}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedJob(null);
          }}
        />
      )}
    </div>
  );
};
const ListInput = ({ label, values, onChange }) => {
  const [input, setInput] = useState("");

  const addItem = () => {
    if (!input.trim()) return;
    onChange([...values, input.trim()]);
    setInput("");
  };

  const removeItem = (index) => {
    onChange(values.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Add ${label}`}
          className="flex-1 border px-3 py-2 rounded text-sm"
        />
        <button
          type="button"
          onClick={addItem}
          className="px-4 py-2 btn-secondary text-white rounded text-sm"
        >
          Add
        </button>
      </div>

      {values.length > 0 && (
        <ul className="space-y-2">
          {values.map((item, i) => (
            <li
              key={i}
              className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded text-sm"
            >
              {item}
              <button
                type="button"
                onClick={() => removeItem(i)}
                className="text-red-500 font-bold"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const EditJobModal = ({ job, onClose }) => {
  const [selectedSkill, setSelectedSkill] = useState("");

  const [updateJob, { isLoading }] = useUpdateJobMutation();

  const [form, setForm] = useState({
    title: job.title || "",
    type: job.type || "",
    location: job.location || "",
    experience: job.experience || "",
    salary: job.salary || "",
    description: job.description || "",
    keyResponsibilities: job.keyResponsibilities || [],
    professionalSkills: job.professionalSkills || [],
    category: job.category?._id || job.category || "",
     skills: Array.isArray(job.skills)
    ? job.skills.map((s) => (typeof s === "string" ? s : s._id))
    : [],
  });

  const { data: categories = [] } = useGetCategoriesQuery();

  const { data: skillsData = [] } = useGetSkillsByCategoryQuery(form.category, {
    skip: !form.category,
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
  const newCategory = e.target.value;

  setForm((prev) => ({
    ...prev,
    category: newCategory,
    skills: prev.skills.filter((skillId) =>
      skillsData.some((s) => s._id === skillId)
    ),
  }));
};


  const handleAddSkill = () => {
    if (!selectedSkill) return;
    if (form.skills.includes(selectedSkill)) return;

    setForm({
      ...form,
      skills: [...form.skills, selectedSkill],
    });

    setSelectedSkill("");
  };

  const handleRemoveSkill = (id) => {
    setForm({
      ...form,
      skills: form.skills.filter((s) => s !== id),
    });
  };

  const handleSave = async () => {
    try {
      await updateJob({
        id: job._id,
        data: form,
      }).unwrap();

      alert("Job updated successfully");
      onClose();
    } catch (error) {
      console.error("Update job failed", error);
      alert("Failed to update job");
    }
  };

  return (
    <Modal title="Edit Job" onClose={onClose}>
      <div className="space-y-4 ">
        <label htmlFor="title">

         <span className="text-gray-500 ">Job Title</span>
         </label>
        <input
         id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Job Title"
          className="w-full border px-3 py-2 rounded"
        />

        <label htmlFor="type">
          <span className="text-gray-500 ">Job Type</span>
        </label>
        <input
        id="type"
          name="type"
          value={form.type}
          onChange={handleChange}
          placeholder="Job Type"
          className="w-full border px-3 py-2 rounded"
        />
        <label htmlFor="location">

         <span className="text-gray-500 ">Job location</span>
         </label>
        <input
         id="location"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border px-3 py-2 rounded"
        />

        <label htmlFor="experience">

         <span className="text-gray-500 ">Job Experience</span>
         </label>
        <input
          id="experience"
          name="experience"
          value={form.experience}
          onChange={handleChange}
          placeholder="Experience"
          className="w-full border px-3 py-2 rounded"
        />
         <label htmlFor="salary">
          <span className="text-gray-500">Salary</span>
         </label>
        <input
          id="salary"
          name="salary"
          value={form.salary}
          onChange={handleChange}
          placeholder="Salary"
          className="w-full border px-3 py-2 rounded"
        />
        <label htmlFor="category">
          <span className="text-gray-500">Category</span>
        </label>
        <select
          id="category"
          value={form.category}
          onChange={handleCategoryChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        {form.category && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Skills</label>

            <div className="flex gap-2">
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="flex-1 border px-3 py-2 rounded"
              >
                <option value="">Select skill</option>
                {skillsData.map((skill) => (
                  <option key={skill._id} value={skill._id}>
                    {skill.name}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2 btn-secondary text-white rounded"
              >
                Add
              </button>
            </div>

            {/* Selected Skills */}
            <div className="flex flex-wrap gap-2 mt-2">
              {form.skills.map((skillId) => {
                const skill = skillsData.find((s) => s._id === skillId);

                return (
                  <span
                    key={skillId}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {skill?.name || "Skill"}
                    <button
                      onClick={() => handleRemoveSkill(skillId)}
                      className="text-red-500 font-bold"
                    >
                      ×
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
        )}
        <label htmlFor="description">
          <span className="text-gray-500">Description</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Job Description"
          rows={4}
          className="w-full border px-3 py-2 rounded"
        />

       
        <ListInput
          label="Key Responsibilities"
          values={form.keyResponsibilities}
          onChange={(list) => setForm({ ...form, keyResponsibilities: list })}
        />

 
        <ListInput
          label="Professional Skills"
          values={form.professionalSkills}
          onChange={(list) => setForm({ ...form, professionalSkills: list })}
        />

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="border px-4 py-2 rounded">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="btn-primary disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Jobs;
