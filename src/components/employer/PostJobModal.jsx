import { useState } from "react";
import Modal from "../common/Modal";
import {
  useCreateNewJobMutation,
  useGetCategoriesQuery,
  useGetSkillsByCategoryQuery,
} from "../../services/endpoints/jobApi";

const PostJobModal = ({ onClose }) => {
  const [createJob, { isLoading }] = useCreateNewJobMutation();
  const { data: categories = [] } = useGetCategoriesQuery();

  const [job, setJob] = useState({
    title: "",
    type: "Full Time",
    location: "",
    experience: "",
    salary: "",
    category: "",
    skills: [],
    description: "",
    keyResponsibilities: [],
    professionalSkills: [],
  });

  const [selectedSkill, setSelectedSkill] = useState("");

  const { data: skillsData = [], isFetching: skillsLoading } =
    useGetSkillsByCategoryQuery(job.category, {
      skip: !job.category,
    });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setJob({
      ...job,
      category: e.target.value,
      skills: [],
    });
    setSelectedSkill("");
  };

  const handleSkillSelect = (e) => {
    setSelectedSkill(e.target.value);
  };

  const handleAddSkill = () => {
    if (!selectedSkill) return;
    if (job.skills.includes(selectedSkill)) return;

    setJob({
      ...job,
      skills: [...job.skills, selectedSkill],
    });

    setSelectedSkill("");
  };

  const handleRemoveSkill = (id) => {
    setJob({
      ...job,
      skills: job.skills.filter((skillId) => skillId !== id),
    });
  };

  const handleSubmit = async () => {
    if (!job.title || !job.location || !job.category || !job.description) {
      alert("Please fill all required fields");
      return;
    }

    try {
      await createJob(job).unwrap();
      alert("Job posted successfully");
      onClose();
    } catch (err) {
      console.error(err);
      alert(err?.data?.message || "Failed to post job");
    }
  };

  return (
    <Modal onClose={onClose}>
      <h2 className="text-lg font-semibold mb-4">Post New Job</h2>

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
            options={[
              { _id: "Full Time", name: "Full Time" },
              { _id: "Part Time", name: "Part Time" },
              { _id: "Contract", name: "Contract" },
              { _id: "Internship", name: "Internship" },
            ]}
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
          label="Category *"
          name="category"
          value={job.category}
          onChange={handleCategoryChange}
          options={categories}
        />

        {job.category && (
          <div className="space-y-2">
            <label className="block text-sm text-gray-600">Skills</label>

            {skillsLoading ? (
              <p className="text-sm text-gray-500">Loading skills...</p>
            ) : (
              <div className="flex gap-2">
                <select
                  value={selectedSkill}
                  onChange={handleSkillSelect}
                  className="flex-1 border px-4 py-2 rounded-lg text-sm"
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
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
                >
                  Add
                </button>
              </div>
            )}

            {job.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {job.skills.map((skillId) => {
                  const skill = skillsData.find((s) => s._id === skillId);

                  return (
                    <span
                      key={skillId}
                      className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                    >
                      {skill?.name || "Skill"}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skillId)}
                        className="text-red-500 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        )}

        <Textarea
          label="Job Description *"
          name="description"
          value={job.description}
          onChange={handleChange}
        />
        <ListInput
          label="Key Responsibilities"
          values={job.keyResponsibilities}
          onChange={(list) => setJob({ ...job, keyResponsibilities: list })}
        />

        <ListInput
          label="Professional Skills"
          values={job.professionalSkills}
          onChange={(list) => setJob({ ...job, professionalSkills: list })}
        />
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button onClick={onClose} className="px-4 py-2 border rounded-lg">
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="btn-primary disabled:opacity-50"
        >
          {isLoading ? "Posting..." : "Post Job"}
        </button>
      </div>
    </Modal>
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
      <label className="block text-sm text-gray-600">{label}</label>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Add ${label}`}
          className="flex-1 border px-4 py-2 rounded-lg text-sm"
        />
        <button
          type="button"
          onClick={addItem}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
        >
          Add
        </button>
      </div>

      {values.length > 0 && (
        <ul className="space-y-2 mt-2">
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

const Input = ({ label, name, value, onChange, placeholder = "" }) => (
  <div>
    <label className="block text-sm mb-1 text-gray-600">{label}</label>
    <input
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className="w-full border px-4 py-2 rounded-lg text-sm"
    />
  </div>
);

const Select = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="block text-sm mb-1 text-gray-600">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border px-4 py-2 rounded-lg text-sm"
    >
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt._id} value={opt._id}>
          {opt.name}
        </option>
      ))}
    </select>
  </div>
);

const Textarea = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-sm mb-1 text-gray-600">{label}</label>
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
